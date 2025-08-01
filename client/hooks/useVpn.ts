import { useState, useEffect } from "react";
import { vpnService } from "@/services/vpnService";
import {
  VpnUser,
  VpnConfig,
  SubscriptionPlan,
  ServiceStats,
} from "@shared/vpn-api";

// Хук для управления данными пользователя VPN
export function useVpnUser() {
  const [user, setUser] = useState<VpnUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const telegramId = vpnService.getTelegramUserId();
      const userData = await vpnService.getUserInfo(telegramId);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = () => {
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, refreshUser };
}

// Хук для управления VPN конфигурацией
export function useVpnConfig() {
  const [config, setConfig] = useState<VpnConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      const telegramId = vpnService.getTelegramUserId();
      const configData = await vpnService.getVpnConfig(telegramId);
      setConfig(configData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка загрузки конфигурации",
      );
    } finally {
      setLoading(false);
    }
  };

  return { config, loading, error, fetchConfig };
}

// Хук для управления тарифными планами
export function useSubscriptionPlans() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setError(null);
        const data = await vpnService.getSubscriptionPlans();
        setPlans(data.plans);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки планов");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
}

// Хук для управления статистикой сервиса
export function useServiceStats() {
  const [stats, setStats] = useState<ServiceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setError(null);
        const statsData = await vpnService.getServiceStats();
        setStats(statsData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ошибка загрузки статистики",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

// Хук для действий с подпиской
export function useSubscriptionActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activateFreeTrial = async () => {
    try {
      setLoading(true);
      setError(null);
      const telegramId = vpnService.getTelegramUserId();
      const result = await vpnService.activateFreeTrial(telegramId);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Ошибка активации пробного периода";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const extendSubscription = async (planId: string) => {
    try {
      setLoading(true);
      setError(null);
      const telegramId = vpnService.getTelegramUserId();
      const result = await vpnService.extendSubscription(telegramId, planId);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ошибка продления подписки";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleAutoRenewal = async () => {
    try {
      setLoading(true);
      setError(null);
      const telegramId = vpnService.getTelegramUserId();
      const result = await vpnService.toggleAutoRenewal(telegramId);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ошибка изменения автопродления";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refreshSubscriptionStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const telegramId = vpnService.getTelegramUserId();
      const result = await vpnService.refreshSubscriptionStatus(telegramId);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ошибка обновления статуса";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    activateFreeTrial,
    extendSubscription,
    toggleAutoRenewal,
    refreshSubscriptionStatus,
  };
}

// Хук для работы с буфером обмена
export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      const success = await vpnService.copyToClipboard(text);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      return success;
    } catch (err) {
      console.error("Ошибка копирования:", err);
      return false;
    }
  };

  return { copied, copyToClipboard };
}

// Хук для Telegram WebApp интеграции
export function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (vpnService.isTelegramWebApp()) {
      const tg = vpnService.setupTelegramWebApp();
      setWebApp(tg);
      setIsReady(true);
    } else {
      // Для демо режима
      setIsReady(true);
    }
  }, []);

  return { webApp, isReady, isTelegramWebApp: vpnService.isTelegramWebApp() };
}
