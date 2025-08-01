import {
  VpnUser,
  VpnConfig,
  SubscriptionPlansResponse,
  ServiceStatsResponse,
  ActivateTrialRequest,
  ExtendSubscriptionRequest,
  ToggleAutoRenewalRequest,
  SubscriptionActionResponse,
} from "@shared/vpn-api";

// Класс для работы с VPN API
class VpnService {
  private baseUrl = "/api/vpn";

  // Получить информацию о пользователе
  async getUserInfo(telegramId: string): Promise<VpnUser> {
    const response = await fetch(`${this.baseUrl}/user/${telegramId}`);
    if (!response.ok) {
      throw new Error("Ошибка получения данных пользователя");
    }
    return response.json();
  }

  // Получить VPN конфигурацию
  async getVpnConfig(telegramId: string): Promise<VpnConfig> {
    const response = await fetch(`${this.baseUrl}/config/${telegramId}`);
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Подписка неактивна");
      }
      throw new Error("Ошибка получения VPN конфигурации");
    }
    return response.json();
  }

  // Получить тарифные планы
  async getSubscriptionPlans(): Promise<SubscriptionPlansResponse> {
    const response = await fetch(`${this.baseUrl}/plans`);
    if (!response.ok) {
      throw new Error("Ошибка получения тарифных планов");
    }
    return response.json();
  }

  // Получить статистику сервиса
  async getServiceStats(): Promise<ServiceStatsResponse> {
    const response = await fetch(`${this.baseUrl}/stats`);
    if (!response.ok) {
      throw new Error("Ошибка получения статистики");
    }
    return response.json();
  }

  // Активировать пробный период
  async activateFreeTrial(
    telegramId: string,
  ): Promise<SubscriptionActionResponse> {
    const response = await fetch(`${this.baseUrl}/trial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ telegramId } as ActivateTrialRequest),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Ошибка активации пробного периода");
    }
    return response.json();
  }

  // Продлить подписку
  async extendSubscription(
    telegramId: string,
    planId: string,
  ): Promise<SubscriptionActionResponse> {
    const response = await fetch(`${this.baseUrl}/extend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ telegramId, planId } as ExtendSubscriptionRequest),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Ошибка продления подписки");
    }
    return response.json();
  }

  // Переключить автопродление
  async toggleAutoRenewal(
    telegramId: string,
  ): Promise<SubscriptionActionResponse> {
    const response = await fetch(`${this.baseUrl}/auto-renewal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ telegramId } as ToggleAutoRenewalRequest),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Ошибка изменения автопродления");
    }
    return response.json();
  }

  // Обновить статус подписки
  async refreshSubscriptionStatus(
    telegramId: string,
  ): Promise<Partial<VpnUser>> {
    const response = await fetch(`${this.baseUrl}/refresh/${telegramId}`);
    if (!response.ok) {
      throw new Error("Ошибка обновления статуса подписки");
    }
    return response.json();
  }

  // Копировать в буфер обмена с feedback
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Ошибка копирования: ", err);
      return false;
    }
  }

  // Генерация QR-кода (заглушка - в реальности используется внешний API)
  generateQRCode(text: string): string {
    // В реальном приложении здесь будет настоящий QR генератор
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#f0f0f0"/>
        <text x="100" y="100" text-anchor="middle" fill="#666" font-size="14">
          QR Code
        </text>
        <text x="100" y="120" text-anchor="middle" fill="#666" font-size="12">
          ${text.substring(0, 20)}...
        </text>
      </svg>
    `)}`;
  }

  // Получить ID пользователя Telegram (для демо)
  getTelegramUserId(): string {
    // В реальном Telegram mini app это будет window.Telegram.WebApp.initDataUnsafe?.user?.id
    return "123456789"; // Мок ID для демо
  }

  // Проверить доступн��сть Telegram WebApp API
  isTelegramWebApp(): boolean {
    return typeof window !== "undefined" && !!(window as any).Telegram?.WebApp;
  }

  // Настроить Telegram WebApp (для реальной интеграции)
  setupTelegramWebApp() {
    if (this.isTelegramWebApp()) {
      const tg = (window as any).Telegram.WebApp;
      tg.ready();
      tg.expand();

      // Настроить цвета темы
      tg.setHeaderColor("#2481CC"); // telegram-blue
      tg.setBackgroundColor("#ffffff");

      return tg;
    }
    return null;
  }
}

// Экспорт singleton instance
export const vpnService = new VpnService();
export default VpnService;
