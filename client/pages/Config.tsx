import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  ArrowLeft,
  Copy, 
  QrCode, 
  Download,
  Share,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";

export default function Config() {
  const [showFullLink, setShowFullLink] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Мок данные VPN конфигурации (в реальности получаем с API)
  const vpnConfig = {
    isActive: true,
    daysLeft: 7,
    vpnLink: "vless://b6695ada-1234-5678-9abc-def012345678@your.vpn.host:443?encryption=none&security=tls&sni=your.vpn.host&type=ws&host=your.vpn.host&path=%2Fws#dkbestvpn",
    qrCodeData: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAHBUlEQVR42u...", // Base64 QR код
    serverInfo: {
      location: "Нидерланды",
      ping: "23ms",
      speed: "1000 Мбит/с",
      load: "12%"
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(vpnConfig.vpnLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка копирования: ', err);
    }
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = vpnConfig.qrCodeData;
    link.download = 'dkbestvpn-qr.png';
    link.click();
  };

  const shareConfig = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'dkbestvpn Configuration',
          text: 'VPN конфигурация dkbestvpn',
          url: vpnConfig.vpnLink,
        });
      } catch (err) {
        console.log('Ошибка шеринга:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-telegram-blue/5 via-background to-green-500/5 dark:from-telegram-blue/10 dark:via-background dark:to-green-500/10">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-semibold text-foreground">VPN Конфигурация</h1>
                <p className="text-xs text-muted-foreground">dkbestvpn</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className={`${vpnConfig.isActive ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-red-500/10 text-red-600 border-red-500/20'}`}
              >
                {vpnConfig.isActive ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                {vpnConfig.isActive ? 'Активна' : 'Истекла'}
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {vpnConfig.isActive ? (
          <>
            {/* Status Card */}
            <Card className="bg-gradient-to-r from-green-500 to-telegram-blue text-white border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Подписка активна
                </CardTitle>
                <CardDescription className="text-white/80">
                  Осталось {vpnConfig.daysLeft} дней
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold">{vpnConfig.serverInfo.ping}</div>
                    <div className="text-xs text-white/70">Пинг</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">{vpnConfig.serverInfo.speed}</div>
                    <div className="text-xs text-white/70">Скорость</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Card */}
            <Card className="border-gray-100">
              <CardHeader className="text-center">
                <CardTitle className="text-lg text-foreground flex items-center justify-center">
                  <QrCode className="w-5 h-5 mr-2" />
                  QR-код для подключения
                </CardTitle>
                <CardDescription>
                  Отсканируйте камерой в VPN приложении
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-white p-4 rounded-xl border inline-block">
                  {/* Здесь должен быть наст���������� QR код, се��час placeholder */}
                  <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-muted-foreground" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button 
                    onClick={downloadQR}
                    variant="outline" 
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Скачать QR-код
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* VPN Link Card */}
            <Card className="border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">🔗 VPN-ссылка</CardTitle>
                <CardDescription>
                  Скопируйте ссылку для ручной настройки
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Ссылка конфигурации:</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setShowFullLink(!showFullLink)}
                      className="h-6 px-2"
                    >
                      {showFullLink ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </Button>
                  </div>
                  <div className="font-mono text-sm bg-white rounded border p-2 break-all">
                    {showFullLink 
                      ? vpnConfig.vpnLink 
                      : `${vpnConfig.vpnLink.substring(0, 50)}...`
                    }
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={copyToClipboard}
                    className="w-full"
                    variant={copied ? "secondary" : "default"}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Скопировано!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Копировать
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={shareConfig}
                    variant="outline"
                    className="w-full"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Поделиться
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Server Info */}
            <Card className="border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">📍 Информация о сервере</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{vpnConfig.serverInfo.location}</div>
                    <div className="text-xs text-muted-foreground">��окация</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{vpnConfig.serverInfo.load}</div>
                    <div className="text-xs text-muted-foreground">Загрузка</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions Quick Links */}
            <Card className="border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">📖 Быстрые инструкции</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/instructions">
                  <Button variant="outline" className="w-full justify-start">
                    🤖 Инструкция для Android
                  </Button>
                </Link>
                <Link to="/instructions">
                  <Button variant="outline" className="w-full justify-start">
                    🍏 Инструкция для iPhone
                  </Button>
                </Link>
                <Link to="/instructions">
                  <Button variant="outline" className="w-full justify-start">
                    💻 Инструкция для компьютера
                  </Button>
                </Link>
              </CardContent>
            </Card>

          </>
        ) : (
          /* Inactive Subscription */
          <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
            <CardHeader className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-red-600">Подписка истекла</CardTitle>
              <CardDescription>
                Продлите подписку для получения доступа к VPN
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Link to="/subscription">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  Продлить подписку
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Обновить статус
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Support Link */}
        <Card className="border-gray-100">
          <CardContent className="p-4 text-center">
            <div className="space-y-2">
              <div className="text-muted-foreground">Нужна помощь с настройкой?</div>
              <Link to="/support">
                <Button variant="outline" size="sm">
                  💬 Связаться с поддержкой
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="h-6"></div>
    </div>
  );
}
