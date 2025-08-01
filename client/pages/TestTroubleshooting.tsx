import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  HelpCircle,
  AlertTriangle,
  Zap,
  Shield
} from "lucide-react";

export default function TestTroubleshooting() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const troubleshooting = [
    {
      id: "connection",
      problem: "Не удается подключиться к VPN",
      severity: "high",
      icon: "🔴",
      symptoms: [
        "VPN показывает ошибку при подключении",
        "Бесконечная загрузка при попытке соединения",
        "Приложение зависает на этапе подключения"
      ],
      solutions: [
        {
          step: "Проверьте статус подписки",
          description: "Убедитесь, что ваша подписка активна в разделе 'Подписка'",
          action: "checkSubscription"
        },
        {
          step: "Обновите VPN-ссылку",
          description: "Получите новую конфигурацию в разделе 'VPN'",
          action: "refreshConfig"
        },
        {
          step: "Проверьте интернет-соединение",
          description: "Убедитесь, что интернет работает без VPN",
          action: null
        },
        {
          step: "Перезапустите приложение",
          description: "Полностью закройте и откройте VPN-приложение заново",
          action: null
        }
      ]
    },
    {
      id: "speed",
      problem: "Низкая скорость соединения",
      severity: "medium",
      icon: "🟡",
      symptoms: [
        "Медленная загрузка сайтов",
        "Видео буферизуется или не загружается",
        "Высокий пинг в играх или видеозвонках"
      ],
      solutions: [
        {
          step: "Проверьте скорость без VPN",
          description: "Отключите VPN и измерьте скорость интернета",
          action: null
        },
        {
          step: "Попробуйте другой сервер",
          description: "Наши серверы в Нидерландах обычно самые быстрые",
          action: null
        },
        {
          step: "Измените протокол подключения",
          description: "�� настройках приложения попробуйте другой протокол",
          action: null
        }
      ]
    },
    {
      id: "blocked",
      problem: "VPN заблокирован провайдером",
      severity: "high",
      icon: "🚫",
      symptoms: [
        "VPN подключается, но сайты не открываются",
        "Только некоторые сайты работают через VPN",
        "Периодические отключения VPN"
      ],
      solutions: [
        {
          step: "Попробуйте другой порт",
          description: "Используйте альтернативные порты (80, 8080, 2087)",
          action: null
        },
        {
          step: "Смените протокол",
          description: "Попробуйте VLESS через WebSocket или другие протоколы",
          action: null
        },
        {
          step: "Используйте обфускацию",
          description: "Включите маскировку трафика в настройках приложения",
          action: null
        },
        {
          step: "Обратитесь в поддержку",
          description: "Мы предоставим специальную конфигурацию для вашего региона",
          action: "contactSupport"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-telegram-blue/5 via-white to-green-500/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/instructions">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-semibold text-foreground">Решение проблем</h1>
                <p className="text-xs text-muted-foreground">Диагностика VPN</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Introduction */}
        <Card className="bg-gradient-to-r from-telegram-blue to-green-500 text-white border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center">
              🔧 Диагностика проблем
            </CardTitle>
            <CardDescription className="text-white/80">
              Пошаговые решения для быстрого устранения неполадок
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Advanced Troubleshooting */}
        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">🔧 Диагностика и решение проблем</CardTitle>
            <CardDescription>
              Пошаговые инструкции для решения типичных проблем
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {troubleshooting.map((issue, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{issue.icon}</span>
                      <div>
                        <h3 className="font-medium text-foreground">{issue.problem}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            className={`text-xs ${
                              issue.severity === 'high' 
                                ? 'bg-red-500/10 text-red-600 border-red-500/20' 
                                : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                            }`}
                          >
                            {issue.severity === 'high' ? 'Критично' : 'Средне'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <HelpCircle className={`w-4 h-4 text-gray-400 transition-transform ${
                      selectedFaq === index ? 'rotate-180' : ''
                    }`} />
                  </div>
                </button>
                
                {selectedFaq === index && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    {/* Symptoms */}
                    <div className="mt-4">
                      <h4 className="font-medium text-foreground mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                        Симптомы:
                      </h4>
                      <ul className="space-y-1">
                        {issue.symptoms.map((symptom, sIndex) => (
                          <li key={sIndex} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solutions */}
                    <div className="mt-4">
                      <h4 className="font-medium text-foreground mb-3 flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-green-500" />
                        Пошаговое решение:
                      </h4>
                      <div className="space-y-3">
                        {issue.solutions.map((solution, sIndex) => (
                          <div key={sIndex} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-telegram-blue rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                                {sIndex + 1}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-foreground">{solution.step}</div>
                                <div className="text-sm text-muted-foreground mt-1">{solution.description}</div>
                                {solution.action && (
                                  <div className="mt-2">
                                    {solution.action === 'checkSubscription' && (
                                      <Link to="/subscription">
                                        <Button size="sm" variant="outline" className="text-xs">
                                          Проверить подписку
                                        </Button>
                                      </Link>
                                    )}
                                    {solution.action === 'refreshConfig' && (
                                      <Link to="/config">
                                        <Button size="sm" variant="outline" className="text-xs">
                                          Обновить конфигурацию
                                        </Button>
                                      </Link>
                                    )}
                                    {solution.action === 'contactSupport' && (
                                      <Link to="/support">
                                        <Button size="sm" className="text-xs bg-telegram-blue hover:bg-telegram-blue-dark">
                                          Связаться с поддержкой
                                        </Button>
                                      </Link>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick test */}
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <div className="font-medium text-blue-700">Быстрая проверка</div>
                          <div className="text-blue-600 mt-1">
                            {issue.id === 'connection' && 'Попробуйте переподключиться к VPN после выполнения шагов'}
                            {issue.id === 'speed' && 'Проведите тест скорости на speedtest.net с включенным VPN'}
                            {issue.id === 'blocked' && 'Проверьте доступность заблокированных сайтов после изменений'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
