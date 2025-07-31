import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageCircle, Star, TrendingUp, Zap, Shield } from "lucide-react";

export default function Index() {
  const [activeTab, setActiveTab] = useState("home");

  const features = [
    {
      icon: Users,
      title: "Сообщество",
      description: "Подключайтесь к активному сообществу пользователей",
      color: "bg-telegram-blue"
    },
    {
      icon: MessageCircle,
      title: "Чаты",
      description: "Удобное общение прямо в Telegram",
      color: "bg-telegram-green"
    },
    {
      icon: Star,
      title: "Рейтинг",
      description: "Система рейтингов и достижений",
      color: "bg-yellow-500"
    },
    {
      icon: TrendingUp,
      title: "Аналитика",
      description: "Отслеживайте свой прогресс",
      color: "bg-purple-500"
    }
  ];

  const stats = [
    { label: "Активных пользователей", value: "12,584", icon: Users },
    { label: "Сообщений сегодня", value: "45,231", icon: MessageCircle },
    { label: "Рейтинг приложения", value: "4.9", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-telegram-blue/5 via-white to-telegram-blue/10">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-telegram-blue rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Mini App</h1>
                <p className="text-xs text-gray-500">Telegram Bot</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-telegram-green/10 text-telegram-green border-telegram-green/20">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-telegram-blue to-telegram-blue-dark text-white border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-white/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-white/20 text-white">DK</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white">Добро пожаловать!</CardTitle>
                <CardDescription className="text-white/80">
                  Дмитрий, готовы начать?
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              className="w-full bg-white text-telegram-blue hover:bg-white/90 font-medium"
              size="lg"
            >
              Начать использование
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-4 border-gray-100">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-telegram-blue/10 rounded-full">
                  <stat.icon className="w-4 h-4 text-telegram-blue" />
                </div>
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Возможности</h2>
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${feature.color}`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            className="w-full bg-telegram-blue hover:bg-telegram-blue-dark text-white font-medium"
            size="lg"
          >
            Открыть основное приложение
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-telegram-blue text-telegram-blue hover:bg-telegram-blue/5"
            size="lg"
          >
            Настройки
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around py-2">
            {[
              { id: "home", label: "Главная", icon: Users },
              { id: "messages", label: "Сообщения", icon: MessageCircle },
              { id: "stats", label: "Статистика", icon: TrendingUp },
              { id: "profile", label: "Профиль", icon: Star }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? "text-telegram-blue bg-telegram-blue/10" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Padding for Fixed Nav */}
      <div className="h-20"></div>
    </div>
  );
}
