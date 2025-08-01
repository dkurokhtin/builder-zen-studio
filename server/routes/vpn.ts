import { RequestHandler } from "express";

// Интерфейсы для типизации данных VPN
export interface VpnUser {
  telegramId: string;
  username?: string;
  firstName?: string;
  subscriptionActive: boolean;
  subscriptionEnd: string;
  xrayUuid?: string;
  vpnLink?: string;
  createdAt: string;
  lastLogin?: string;
  planType: "free_trial" | "monthly" | "quarterly" | "semi_annual" | "annual";
  autoRenewal: boolean;
}

export interface VpnConfig {
  vpnLink: string;
  qrCode: string;
  serverInfo: {
    location: string;
    ping: string;
    speed: string;
    load: string;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  discount?: string;
  popular: boolean;
  durationDays: number;
}

// Мок данные (в реальности это будет MongoDB с Mongoose)
const mockUsers: VpnUser[] = [
  {
    telegramId: "123456789",
    username: "dmitry_k",
    firstName: "Дмитрий",
    subscriptionActive: true,
    subscriptionEnd: "2024-01-15",
    xrayUuid: "b6695ada-1234-5678-9abc-def012345678",
    vpnLink:
      "vless://b6695ada-1234-5678-9abc-def012345678@your.vpn.host:443?encryption=none&security=tls&sni=your.vpn.host&type=ws&host=your.vpn.host&path=%2Fws#dkbestvpn",
    createdAt: "2023-12-15T10:30:00Z",
    lastLogin: "2024-01-08T15:45:00Z",
    planType: "monthly",
    autoRenewal: false,
  },
];

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "monthly",
    name: "1 месяц",
    price: "299 ₽",
    period: "месяц",
    popular: false,
    durationDays: 30,
  },
  {
    id: "quarterly",
    name: "3 месяца",
    price: "799 ₽",
    originalPrice: "897 ₽",
    period: "3 месяца",
    discount: "Скидка 11%",
    popular: true,
    durationDays: 90,
  },
  {
    id: "semi_annual",
    name: "6 месяцев",
    price: "1499 ₽",
    originalPrice: "1794 ₽",
    period: "6 месяцев",
    discount: "Скидка 16%",
    popular: false,
    durationDays: 180,
  },
  {
    id: "annual",
    name: "12 месяцев",
    price: "2799 ₽",
    originalPrice: "3588 ₽",
    period: "год",
    discount: "Скидка 22%",
    popular: false,
    durationDays: 365,
  },
];

// Получить информацию о пользователе
export const getUserInfo: RequestHandler = (req, res) => {
  const { telegramId } = req.params;

  const user = mockUsers.find((u) => u.telegramId === telegramId);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
      message: "Пользователь не найден",
    });
  }

  // Рассчитать дни до окончания подписки
  const endDate = new Date(user.subscriptionEnd);
  const now = new Date();
  const daysLeft = Math.max(
    0,
    Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
  );

  const response = {
    ...user,
    daysLeft,
    totalDays:
      subscriptionPlans.find((p) => p.id === user.planType)?.durationDays || 30,
  };

  res.json(response);
};

// Получить VPN конфигурацию
export const getVpnConfig: RequestHandler = (req, res) => {
  const { telegramId } = req.params;

  const user = mockUsers.find((u) => u.telegramId === telegramId);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
      message: "Пользователь не найден",
    });
  }

  if (!user.subscriptionActive) {
    return res.status(403).json({
      error: "Subscription inactive",
      message: "Подписка неактивна",
    });
  }

  const config: VpnConfig = {
    vpnLink: user.vpnLink || "",
    qrCode:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAHBUlEQVR42u...", // Мок QR
    serverInfo: {
      location: "Нидерланды",
      ping: "23ms",
      speed: "1000 Мбит/с",
      load: "12%",
    },
  };

  res.json(config);
};

// Получить доступные тарифные планы
export const getSubscriptionPlans: RequestHandler = (req, res) => {
  res.json({ plans: subscriptionPlans });
};

// Активировать пробный период
export const activateFreeTrial: RequestHandler = (req, res) => {
  const { telegramId } = req.body;

  const user = mockUsers.find((u) => u.telegramId === telegramId);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
      message: "Пользователь не найден",
    });
  }

  // Проверить, был ли уже использован пробный период
  if (user.planType === "free_trial") {
    return res.status(400).json({
      error: "Trial already used",
      message: "Пробный период уже был использован",
    });
  }

  // Активировать пробный период на 7 дней
  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 7);

  user.subscriptionActive = true;
  user.subscriptionEnd = trialEnd.toISOString().split("T")[0];
  user.planType = "free_trial";

  res.json({
    success: true,
    message: "Пробный период активирован на 7 дней",
    subscriptionEnd: user.subscriptionEnd,
  });
};

// Продлить подписку
export const extendSubscription: RequestHandler = (req, res) => {
  const { telegramId, planId } = req.body;

  const user = mockUsers.find((u) => u.telegramId === telegramId);
  const plan = subscriptionPlans.find((p) => p.id === planId);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
      message: "Пользователь не найден",
    });
  }

  if (!plan) {
    return res.status(400).json({
      error: "Invalid plan",
      message: "Неверный тарифный план",
    });
  }

  // Рассчитать новую дату окончания
  const currentEnd = user.subscriptionActive
    ? new Date(user.subscriptionEnd)
    : new Date();
  const newEnd = new Date(
    currentEnd.getTime() + plan.durationDays * 24 * 60 * 60 * 1000,
  );

  user.subscriptionActive = true;
  user.subscriptionEnd = newEnd.toISOString().split("T")[0];
  user.planType = planId as VpnUser["planType"];

  res.json({
    success: true,
    message: `Подписка продлена до ${user.subscriptionEnd}`,
    subscriptionEnd: user.subscriptionEnd,
    plan: plan.name,
  });
};

// Переключить автопродление
export const toggleAutoRenewal: RequestHandler = (req, res) => {
  const { telegramId } = req.body;

  const user = mockUsers.find((u) => u.telegramId === telegramId);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
      message: "Пользователь не найден",
    });
  }

  user.autoRenewal = !user.autoRenewal;

  res.json({
    success: true,
    autoRenewal: user.autoRenewal,
    message: `Автопродление ${user.autoRenewal ? "включено" : "отключено"}`,
  });
};

// Обновить статус подписки
export const refreshSubscriptionStatus: RequestHandler = (req, res) => {
  const { telegramId } = req.params;

  const user = mockUsers.find((u) => u.telegramId === telegramId);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
      message: "Пользователь не найден",
    });
  }

  // Проверить, не истекла ли подписка
  const endDate = new Date(user.subscriptionEnd);
  const now = new Date();

  if (endDate <= now && user.subscriptionActive) {
    user.subscriptionActive = false;
  }

  const daysLeft = Math.max(
    0,
    Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
  );

  res.json({
    subscriptionActive: user.subscriptionActive,
    daysLeft,
    subscriptionEnd: user.subscriptionEnd,
    message: user.subscriptionActive ? "Подписка активна" : "Подписка истекла",
  });
};

// Получить статистику сервиса
export const getServiceStats: RequestHandler = (req, res) => {
  const stats = {
    totalUsers: "12,584",
    activeUsers: "8,432",
    rating: "4.9",
    uptime: "99.9%",
    serversCount: 15,
    countriesCount: 12,
  };

  res.json(stats);
};
