// Интерфейсы для VPN API, используемые как на клиенте, так и на сервере

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
  daysLeft?: number;
  totalDays?: number;
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

export interface ServiceStats {
  totalUsers: string;
  activeUsers: string;
  rating: string;
  uptime: string;
  serversCount: number;
  countriesCount: number;
}

// API Response типы
export interface ApiResponse<T = any> {
  success?: boolean;
  error?: string;
  message?: string;
  data?: T;
}

export interface UserInfoResponse extends VpnUser {}

export interface VpnConfigResponse extends VpnConfig {}

export interface SubscriptionPlansResponse {
  plans: SubscriptionPlan[];
}

export interface ServiceStatsResponse extends ServiceStats {}

export interface SubscriptionActionResponse {
  success: boolean;
  message: string;
  subscriptionEnd?: string;
  plan?: string;
  autoRenewal?: boolean;
}

// Request типы
export interface ActivateTrialRequest {
  telegramId: string;
}

export interface ExtendSubscriptionRequest {
  telegramId: string;
  planId: string;
}

export interface ToggleAutoRenewalRequest {
  telegramId: string;
}
