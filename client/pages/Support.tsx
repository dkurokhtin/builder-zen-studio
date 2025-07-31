import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  Send,
  User,
  AlertCircle
} from "lucide-react";

export default function Support() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Telegram чат",
      description: "Быстрый ответ в течение 5 минут",
      action: "Написать в чат",
      link: "https://t.me/dkvpn_support",
      color: "bg-telegram-blue",
      available: true
    },
    {
      icon: Mail,
      title: "Email поддержка",
      description: "Ответ в течение 2-4 часов",
      action: "Отправить email",
      link: "mailto:support@dkbestvpn.com",
      color: "bg-green-500",
      available: true
    },
    {
      icon: Phone,
      title: "Телефон",
      description: "Только для срочных вопросов",
      action: "Позвонить",
      link: "tel:+79001234567",
      color: "bg-orange-500",
      available: false
    }
  ];

  const faqItems = [
    {
      question: "Как настроить VPN на Android?",
      answer: "Скачайте приложение v2rayNG из Google Play Store, затем скопируйте вашу VPN-ссылку из бота и импортируйте её в приложение. Подробная инструкция доступна в разделе 'Инструкции'."
    },
    {
      question: "Почему низкая скорость подключения?",
      answer: "Проверьте ваше интернет-соединение без VPN. Попробуйте переподключиться или перезапустить приложение. Если проблема с��храняется, свяжитесь с поддержкой."
    },
    {
      question: "Как продлить подписку?",
      answer: "Перейдите в раздел 'Подписка' в боте или mini app, выберите нужный тарифный план и оплатите любым удобным способом. Подписка активируется автоматически."
    },
    {
      question: "VPN не подключается, что делать?",
      answer: "1) Проверьте активность подписки 2) Убедитесь в правильности скопированной ссылки 3) Перезапустите приложение 4) Проверьте интернет-соединение 5) Обратитесь в поддержку."
    },
    {
      question: "Можно ли использовать на нескольких устройствах?",
      answer: "Да, одну подписку можно использовать на неограниченном количестве устройств. Просто используйте одну и ту же VPN-ссылку на всех ваших устройствах."
    },
    {
      question: "Как получить возврат ��редств?",
      answer: "Мы предоставляем возврат в течение 7 дней с момента покупки при технических проблемах. Обратитесь в поддержку с описанием проблемы."
    },
    {
      question: "Сохраняются ли логи активности?",
      answer: "Нет, мы следуем политике No-logs. Мы не сохраняем информацию о ваших посещённых сайтах, IP-адресах или любой другой активности в интернете."
    },
    {
      question: "В каких странах есть серверы?",
      answer: "У нас есть серверы в 15+ странах: Нидерланды, Германия, США, Канада, Япония, Сингапур, Великобритания, Франция и другие. Мы регулярно добавляем новые локации."
    }
  ];

  const quickActions = [
    {
      title: "Проблемы с подключением",
      description: "VPN не подключается или часто отключается",
      action: "Решить проблему",
      route: "/instructions"
    },
    {
      title: "Вопросы по оплате",
      description: "Проблемы с продлением или возвратом",
      action: "Написать в поддержку",
      route: "#contact"
    },
    {
      title: "Настройка устройств",
      description: "Помощь с установкой на разные платформы",
      action: "Посмотреть инструкции",
      route: "/instructions"
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
                <h1 className="font-semibold text-gray-900">Поддержка</h1>
                <p className="text-xs text-gray-500">Помощь 24/7</p>
              </div>
            </div>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
              <Clock className="w-3 h-3 mr-1" />
              Онлайн
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Support Status */}
        <Card className="bg-gradient-to-r from-telegram-blue to-green-500 text-white border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Мы всегда на связи!
            </CardTitle>
            <CardDescription className="text-white/80">
              Среднее время ответа: 5 минут
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
                  <Clock className="w-4 h-4" />
                </div>
                <span>24/7</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span>Быстро</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
                  <User className="w-4 h-4" />
                </div>
                <span>Лично</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">🚀 Быстрые действия</h2>
          {quickActions.map((action, index) => (
            <Card key={index} className="border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                  </div>
                  <Link to={action.route}>
                    <Button size="sm" variant="outline">
                      {action.action}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Methods */}
        <div className="space-y-3" id="contact">
          <h2 className="text-lg font-semibold text-gray-900">💬 Способы связи</h2>
          {supportChannels.map((channel, index) => (
            <Card key={index} className="border-gray-100">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${channel.color}`}>
                    <channel.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{channel.title}</h3>
                      {channel.available ? (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                          Доступно
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-500/10 text-gray-600 border-gray-500/20 text-xs">
                          Скоро
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{channel.description}</p>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={!channel.available}
                    asChild={channel.available}
                  >
                    {channel.available ? (
                      <a href={channel.link} target="_blank" rel="noopener noreferrer">
                        {channel.action}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    ) : (
                      channel.action
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">❓ Частые вопросы</h2>
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <Card key={index} className="border-gray-100">
                <CardContent className="p-0">
                  <button
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 pr-4">{item.question}</h3>
                      <HelpCircle className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                        selectedFaq === index ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </button>
                  {selectedFaq === index && (
                    <div className="px-4 pb-4">
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <Card className="bg-orange-500/10 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-orange-700">Срочная проблема?</div>
                <div className="text-sm text-orange-600 mt-1">
                  Если у вас критическая проблема с доступом, напишите нам в Telegram чат с пометкой "СРОЧНО" - мы ответим в течение 2 минут.
                </div>
                <Button size="sm" className="mt-3 bg-orange-500 hover:bg-orange-600 text-white" asChild>
                  <a href="https://t.me/dkvpn_support" target="_blank" rel="noopener noreferrer">
                    <Send className="w-3 h-3 mr-1" />
                    Срочная связь
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">📚 Полезные ссылки</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/instructions">
                📖 Подробные инструкции
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="https://dkurokhtin.github.io/vpn-docs" target="_blank" rel="noopener noreferrer">
                🌐 Документация на сайте
                <ExternalLink className="w-4 h-4 ml-auto" />
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📋 Политика конфиденциальности
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📝 Условия использования
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="h-6"></div>
    </div>
  );
}
