import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Download, 
  ExternalLink,
  PlayCircle,
  CheckCircle,
  Smartphone,
  Laptop,
  Wifi
} from "lucide-react";

export default function Instructions() {
  const [activeStep, setActiveStep] = useState(0);

  const platforms = [
    {
      id: "android",
      name: "Android",
      icon: "🤖",
      color: "bg-green-500",
      apps: [
        { name: "v2rayNG", recommended: true, link: "https://play.google.com/store/apps/details?id=com.v2ray.ang" },
        { name: "Nekoray", recommended: false, link: "https://github.com/MatsuriDayo/nekoray/releases" }
      ],
      steps: [
        "Скачайте приложение v2rayNG из Google Play",
        "Откройте приложение и нажмите '+' в правом верхнем углу",
        "Выберите 'Импорт конфигурации из буфера обмена'",
        "Скопируйте VPN-ссылку и вставьте в приложение",
        "Нажмите на конфигурацию и выберите 'Подключиться'"
      ]
    },
    {
      id: "ios",
      name: "iOS",
      icon: "🍏", 
      color: "bg-blue-500",
      apps: [
        { name: "FoXray", recommended: true, link: "https://apps.apple.com/app/foxray/id6448898396" },
        { name: "Streisand", recommended: false, link: "https://apps.apple.com/app/streisand/id6450534064" }
      ],
      steps: [
        "Установите FoXray из App Store",
        "Откройте приложение и нажмите '+' или 'Add'",
        "Выберите 'Import from Clipboard' или 'Импорт из буфера'",
        "Скопируйте VPN-ссылку из бота",
        "Нажмите на серверную конфигурацию для подключения"
      ]
    },
    {
      id: "windows",
      name: "Windows",
      icon: "💻",
      color: "bg-blue-600",
      apps: [
        { name: "v2rayN", recommended: true, link: "https://github.com/2dust/v2rayN/releases" },
        { name: "Nekoray", recommended: false, link: "https://github.com/MatsuriDayo/nekoray/releases" }
      ],
      steps: [
        "Скачайте v2rayN с GitHub (файл v2rayN-Core.zip)",
        "Распакуйте архив и запустите v2rayN.exe",
        "Кликните правой кнопкой на значок в трее",
        "Выберите 'Добавить сервер' → 'Импорт ссылки из буфера обмена'",
        "Скопируйте VPN-ссылку и нажмите OK, затем 'Подключиться'"
      ]
    },
    {
      id: "macos",
      name: "macOS", 
      icon: "🍎",
      color: "bg-gray-700",
      apps: [
        { name: "FoXray", recommended: true, link: "https://apps.apple.com/app/foxray/id6448898396" },
        { name: "V2rayU", recommended: false, link: "https://github.com/yanue/V2rayU/releases" }
      ],
      steps: [
        "Установите FoXray из Mac App Store",
        "Откройте приложение и нажмите '+' для добавления сервера",
        "Выберите 'Import from Clipboard'",
        "Скопируйте VPN-ссылку из Telegram бота",
        "Выберите сервер и нажмите кнопку подключения"
      ]
    },
    {
      id: "linux",
      name: "Linux",
      icon: "🐧",
      color: "bg-yellow-600",
      apps: [
        { name: "Nekoray", recommended: true, link: "https://github.com/MatsuriDayo/nekoray/releases" },
        { name: "v2ray-core", recommended: false, link: "https://github.com/v2fly/v2ray-core/releases" }
      ],
      steps: [
        "Скачайте Nekoray AppImage с GitHub",
        "Сделайте файл исполняемым: chmod +x nekoray-*.AppImage",
        "Запустите приложение: ./nekoray-*.AppImage",
        "Нажмите 'Add' и выберите 'Import from clipboard'",
        "Вставьте VPN-ссылку и нажмите 'Start'"
      ]
    }
  ];

  const troubleshooting = [
    {
      problem: "Не удается подключиться",
      solution: "Проверьте, ак��ивна ли подписка. Попробуйте переподключиться к интернету.",
      icon: "🔧"
    },
    {
      problem: "Низкая скорость",
      solution: "Попробуйте переключиться на другой сервер или проверьте загрузку сети.",
      icon: "⚡"
    },
    {
      problem: "Приложение не запускается",
      solution: "Перезагрузите устройство и попробуйте снова. Проверьте версию приложения.",
      icon: "🔄"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-telegram-blue/5 via-white to-green-500/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-semibold text-foreground">Инструкции</h1>
                <p className="text-xs text-gray-500">Настройка VPN на устройствах</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Quick Start Card */}
        <Card className="bg-gradient-to-r from-telegram-blue to-green-500 text-white border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center">
              <PlayCircle className="w-5 h-5 mr-2" />
              Быстрый старт
            </CardTitle>
            <CardDescription className="text-white/80">
              Настройка займёт всего 2-3 минуты
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
                  <Download className="w-4 h-4" />
                </div>
                <span>Скачать</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
                  <Wifi className="w-4 h-4" />
                </div>
                <span>Настроить</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span>Готово</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Selection */}
        <Tabs defaultValue="android" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="android" className="text-xs">📱 Мобильные</TabsTrigger>
            <TabsTrigger value="windows" className="text-xs">💻 Компьютер</TabsTrigger>
            <TabsTrigger value="other" className="text-xs">📖 Другие</TabsTrigger>
          </TabsList>

          <TabsContent value="android" className="space-y-4">
            {platforms.filter(p => ["android", "ios"].includes(p.id)).map((platform) => (
              <Card key={platform.id} className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center">
                    <span className="text-2xl mr-3">{platform.icon}</span>
                    Инструкция для {platform.name}
                  </CardTitle>
                  <CardDescription>
                    Пошаговая настройка VPN на {platform.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Recommended Apps */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Рекомендуемые приложения:</h4>
                    <div className="space-y-2">
                      {platform.apps.map((app, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{app.name}</span>
                            {app.recommended && (
                              <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                                Рекомендуется
                              </Badge>
                            )}
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <a href={app.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Шаги настройки:</h4>
                    <div className="space-y-2">
                      {platform.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3 p-2">
                          <div className="w-6 h-6 bg-telegram-blue rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="text-sm text-foreground pt-1">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to="/config">
                    <Button className="w-full bg-telegram-blue hover:bg-telegram-blue-dark">
                      Получить VPN-ссылку
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="windows" className="space-y-4">
            {platforms.filter(p => ["windows", "macos", "linux"].includes(p.id)).map((platform) => (
              <Card key={platform.id} className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center">
                    <span className="text-2xl mr-3">{platform.icon}</span>
                    Инструкция для {platform.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Recommended Apps */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Рекомендуемые приложения:</h4>
                    <div className="space-y-2">
                      {platform.apps.map((app, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{app.name}</span>
                            {app.recommended && (
                              <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                                Рекомендуется
                              </Badge>
                            )}
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <a href={app.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Шаги настройки:</h4>
                    <div className="space-y-2">
                      {platform.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3 p-2">
                          <div className="w-6 h-6 bg-telegram-blue rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="text-sm text-foreground pt-1">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to="/config">
                    <Button className="w-full bg-telegram-blue hover:bg-telegram-blue-dark">
                      Получить VPN-ссылку
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="other" className="space-y-4">
            {/* Additional Platforms */}
            <Card className="border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">📡 Другие устройства</CardTitle>
                <CardDescription>
                  Дополнит��льные инструкции и ссылки
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://dkurokhtin.github.io/vpn-docs/#/android" target="_blank" rel="noopener noreferrer">
                    🤖 Подробная инструкция для Android
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://dkurokhtin.github.io/vpn-docs/#/ios" target="_blank" rel="noopener noreferrer">
                    🍏 Подробная инструкция для iPhone
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🌐 Настройка роутера
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📺 Smart TV и приставки
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Troubleshooting */}
        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">🔧 Реш��ние проблем</CardTitle>
            <CardDescription>
              Частые вопросы и их решения
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {troubleshooting.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div className="font-medium text-foreground">{item.problem}</div>
                    <div className="text-sm text-muted-foreground mt-1">{item.solution}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Support Card */}
        <Card className="border-gray-100">
          <CardContent className="p-4 text-center">
            <div className="space-y-3">
              <div className="text-muted-foreground">Все еще нужна помощь?</div>
              <Link to="/support">
                <Button className="w-full bg-telegram-blue hover:bg-telegram-blue-dark">
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
