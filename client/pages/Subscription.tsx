import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Calendar,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  Gift,
  Zap,
  RefreshCw
} from "lucide-react";

export default function Subscription() {
  // Мок данные подписки (в реальности получаем с API)
  const subscriptionData = {
    isActive: true,
    plan: "Premium",
    daysLeft: 7,
    subscriptionEnd: "2024-01-15",
    autoRenewal: false,
    hasFreeTrial: false,
    totalDays: 30,
    price: "299 ₽/месяц"
  };

  const plans = [
    {
      name: "1 месяц",
      price: "299 ₽",
      period: "месяц",
      discount: null,
      popular: false
    },
    {
      name: "3 месяца",
      price: "799 ₽",
      originalPrice: "897 ₽",
      period: "3 месяца",
      discount: "Скидка 11%",
      popular: true
    },
    {
      name: "6 месяцев",
      price: "1499 ₽",
      originalPrice: "1794 ₽",
      period: "6 месяцев",
      discount: "Скидка 16%",
      popular: false
    },
    {
      name: "12 месяцев",
      price: "2799 ₽",
      originalPrice: "3588 ₽",
      period: "год",
      discount: "Скидка 22%",
      popular: false
    }
  ];

  const features = [
    "🚀 Скорость до 1000 Мбит/с",
    "🌍 Серверы �� 15+ странах",
    "📱 Поддержка всех устройств",
    "🔒 Без логов и анонимность",
    "⚡ Безлимитный трафик",
    "🛡️ 24/7 поддержка"
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
                <h1 className="font-semibold text-foreground">Подписка</h1>
                <p className="text-xs text-gray-500">Управление и продление</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Current Status */}
        <Card className={`border-0 shadow-lg ${subscriptionData.isActive 
          ? 'bg-gradient-to-r from-green-500 to-telegram-blue text-white' 
          : 'bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20'
        }`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className={`flex items-center ${subscriptionData.isActive ? 'text-white' : 'text-red-600'}`}>
                  {subscriptionData.isActive ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
                  {subscriptionData.isActive ? 'Подписка активна' : 'Подписка истекла'}
                </CardTitle>
                <CardDescription className={subscriptionData.isActive ? 'text-white/80' : 'text-gray-600'}>
                  {subscriptionData.isActive 
                    ? `Осталось ${subscriptionData.daysLeft} дней из ${subscriptionData.totalDays}`
                    : 'Продлите для продолжения использования'
                  }
                </CardDescription>
              </div>
              <Badge className={subscriptionData.isActive ? 'bg-white/20 text-white border-white/30' : 'bg-red-500/20 text-red-600 border-red-500/30'}>
                {subscriptionData.plan}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {subscriptionData.isActive && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-white/90">
                  <span>Истекает:</span>
                  <span>{subscriptionData.subscriptionEnd}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{ width: `${(subscriptionData.daysLeft / subscriptionData.totalDays) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Free Trial Banner */}
        {!subscriptionData.hasFreeTrial && (
          <Card className="bg-gradient-to-r from-green-500/10 to-telegram-blue/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 rounded-full">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-green-600">🆓 Бесплатный пробный период</div>
                  <div className="text-sm text-gray-600">7 дней полного доступа для новых пользователей</div>
                </div>
              </div>
              <Button className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white">
                Активировать пробный период
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Subscription Plans */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">💳 Тарифные планы</h2>
          
          <div className="space-y-3">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`border cursor-pointer transition-all hover:shadow-md ${
                  plan.popular 
                    ? 'border-telegram-blue bg-telegram-blue/5' 
                    : 'border-gray-200 hover:border-telegram-blue/50'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-foreground">{plan.name}</span>
                        {plan.popular && (
                          <Badge className="bg-telegram-blue text-white">Популярный</Badge>
                        )}
                        {plan.discount && (
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                            {plan.discount}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-lg font-bold text-foreground">{plan.price}</span>
                        {plan.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{plan.originalPrice}</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">за {plan.period}</div>
                    </div>
                    <Button 
                      size="sm"
                      className={plan.popular ? 'bg-telegram-blue hover:bg-telegram-blue-dark' : ''}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Выбрать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">⭐ Что включено</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">💳 Способы оплаты</CardTitle>
            <CardDescription>Выберите удобный способ оплаты</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="w-4 h-4 mr-3" />
              Банковская карта
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Zap className="w-4 h-4 mr-3" />
              СБП (Система быстрых платежей)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📱 Telegram Stars
            </Button>
            <Button variant="outline" className="w-full justify-start">
              💰 Криптовалюта
            </Button>
          </CardContent>
        </Card>

        {/* Auto Renewal */}
        {subscriptionData.isActive && (
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center">
                <RefreshCw className="w-5 h-5 mr-2" />
                Автопродление
              </CardTitle>
              <CardDescription>
                {subscriptionData.autoRenewal 
                  ? 'Подписка будет продлена автоматически'
                  : 'Автопродление отключено'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant={subscriptionData.autoRenewal ? "destructive" : "default"} 
                className="w-full"
              >
                {subscriptionData.autoRenewal ? 'Отключить автопродление' : 'Включить автопродление'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Help */}
        <Card className="border-gray-100">
          <CardContent className="p-4 text-center">
            <div className="space-y-3">
              <div className="text-gray-600">Нужна помощь с оплатой?</div>
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
