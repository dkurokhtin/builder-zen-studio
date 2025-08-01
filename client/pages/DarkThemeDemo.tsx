import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import { 
  Shield, 
  Wifi, 
  Clock, 
  QrCode, 
  Smartphone, 
  Globe, 
  Zap,
  Lock,
  MessageCircle,
  CheckCircle,
  Copy,
  Moon
} from "lucide-react";

export default function DarkThemeDemo() {
  const { setTheme } = useTheme();

  // Принудительно устанавливаем темную тему при загрузке
  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  const vpnFeatures = [
    {
      icon: Shield,
      title: "Защита данных",
      description: "Без логов — ваша приватность под защитой",
      color: "bg-green-500"
    },
    {
      icon: Zap,
      title: "Высокая скорость",
      description: "До 1000 Мбит/с, безлимитный трафик",
      color: "bg-telegram-blue"
    },
    {
      icon: Globe,
      title: "Доступ ко всем сайтам",
      description: "YouTube без рекламы, обход блокировок",
      color: "bg-purple-500"
    },
    {
      icon: Lock,
      title: "Простая настройка",
      description: "Настройка за пару кликов на любом устройстве",
      color: "bg-orange-500"
    }
  ];

  const quickActions = [
    {
      icon: QrCode,
      title: "Получить VPN",
      description: "Ссылка и QR-код",
      route: "/config",
      color: "bg-telegram-blue"
    },
    {
      icon: Smartphone,
      title: "Инструкция",
      description: "Настройка устройств",
      route: "/instructions", 
      color: "bg-green-500"
    },
    {
      icon: Clock,
      title: "Подписка",
      description: "Управление и продление",
      route: "/subscription",
      color: "bg-purple-500"
    },
    {
      icon: MessageCircle,
      title: "Поддержка",
      description: "Живая помощь 24/7",
      route: "/support",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-telegram-blue/10 via-background to-green-500/10">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-telegram-blue rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">dkbestvpn</h1>
                <p className="text-xs text-muted-foreground">@dkvpn1_bot</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                Активна
              </Badge>
              <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                <Moon className="w-3 h-3 mr-1" />
                Темная тема
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-telegram-blue to-green-500 text-white border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-white/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-white/20 text-white">DK</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white">
                  👋 Добро пожаловать, Дмитрий!
                </CardTitle>
                <CardDescription className="text-white/80">
                  🟢 Ваша подписка активна ещё 7 дней
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">🔗 VPN-ссылка:</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 h-6 px-2"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
                <div className="text-xs text-white/70 font-mono break-all bg-black/20 rounded p-2">
                  vless://b6695ada-1234-5678-9abc-def012345678@your...
                </div>
              </div>
              <Link to="/config">
                <Button 
                  className="w-full bg-white text-telegram-blue hover:bg-white/90 font-medium"
                  size="lg"
                >
                  🔗 Получить VPN-ссылку
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.route}>
              <Card className="text-center p-4 border-border hover:shadow-md hover:bg-accent/50 transition-all cursor-pointer h-full">
                <div className="flex flex-col items-center space-y-2">
                  <div className={`p-3 rounded-xl ${action.color}`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-medium text-foreground">{action.title}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{action.description}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* VPN Features */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground mb-4">🚀 Преимущества VPN</h2>
          {vpnFeatures.map((feature, index) => (
            <Card key={index} className="border-border hover:bg-accent/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${feature.color}`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Support */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground">💻 Поддержка платформ</CardTitle>
            <CardDescription className="text-muted-foreground">Работает на всех устройствах</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { icon: "🤖", name: "Android" },
                { icon: "🍏", name: "iOS" },
                { icon: "💻", name: "Windows" },
                { icon: "🍎", name: "macOS" },
                { icon: "🐧", name: "Linux" },
                { icon: "🌐", name: "Router" }
              ].map((platform, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <div className="text-2xl">{platform.icon}</div>
                  <div className="text-xs text-muted-foreground">{platform.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="text-center p-4 border-border">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-2 bg-telegram-blue/10 rounded-full">
                <Wifi className="w-4 h-4 text-telegram-blue" />
              </div>
              <div className="text-lg font-bold text-foreground">12,584</div>
              <div className="text-xs text-muted-foreground leading-tight">Активных пользователей</div>
            </div>
          </Card>
          <Card className="text-center p-4 border-border">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-2 bg-green-500/10 rounded-full">
                <Shield className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-lg font-bold text-foreground">4.9</div>
              <div className="text-xs text-muted-foreground leading-tight">Рейтинг сервиса</div>
            </div>
          </Card>
        </div>

        {/* Dark Theme Info */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <div className="space-y-2">
              <div className="text-purple-400 font-semibold flex items-center justify-center">
                <Moon className="w-4 h-4 mr-2" />
                🌙 Темная тема активна!
              </div>
              <div className="text-sm text-muted-foreground">Стильный дизайн для использования в темное время суток</div>
              <Link to="/">
                <Button size="sm" variant="outline" className="border-purple-500/20 text-purple-400 hover:bg-purple-500/10">
                  Вернуться на главную
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around py-2">
            {[
              { id: "home", label: "Главная", icon: Shield, route: "/" },
              { id: "config", label: "VPN", icon: QrCode, route: "/config" },
              { id: "instructions", label: "Инструкции", icon: Smartphone, route: "/instructions" },
              { id: "subscription", label: "Подписка", icon: Clock, route: "/subscription" }
            ].map((tab) => (
              <Link
                key={tab.id}
                to={tab.route}
                className="flex flex-col items-center py-2 px-3 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              >
                <tab.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Padding for Fixed Nav */}
      <div className="h-20"></div>
    </div>
  );
}
