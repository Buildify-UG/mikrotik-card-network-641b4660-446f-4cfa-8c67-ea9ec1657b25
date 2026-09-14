import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, Wifi, Clock, Download, Upload, History, Gift, Phone, MessageSquare, Play, Coffee } from 'lucide-react';
import { toast } from 'sonner';

interface CardData {
  number: string;
  balance: number;
  downloadUsed: number;
  uploadUsed: number;
  timeUsed: number;
  timeRemaining: number;
  category: string;
  date: string;
}

interface CardHistory {
  number: string;
  category: string;
  date: string;
}

const Index = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentCard, setCurrentCard] = useState<CardData | null>(null);
  const [cardHistory, setCardHistory] = useState<CardHistory[]>([
    { number: '1234-5678-9012', category: 'Premium', date: '2024-01-15' },
    { number: '1234-5678-9011', category: 'Standard', date: '2024-01-14' },
  ]);
  const [hasPendingDebt, setHasPendingDebt] = useState(false);
  const [usedLoanService, setUsedLoanService] = useState(false);

  const handleCardLogin = () => {
    if (!cardNumber.trim()) {
      toast.error('الرجاء إدخال رقم الكرت');
      return;
    }

    if (hasPendingDebt && !cardNumber.includes('100')) {
      toast.error('الرجاء تسديد كرت السلفة الذي عليك أولاً ثم قم بأدخال كرت اخر لاستخدام الشبكة');
      return;
    }

    // محاكاة بيانات الكرت
    const mockCard: CardData = {
      number: cardNumber,
      balance: 45.5,
      downloadUsed: 2.3,
      uploadUsed: 0.8,
      timeUsed: 245,
      timeRemaining: 755,
      category: cardNumber.includes('100') ? 'سلفة' : 'Premium',
      date: new Date().toLocaleDateString('ar-SA'),
    };

    setCurrentCard(mockCard);
    setIsLoggedIn(true);

    // تحديث السجل
    const newHistory: CardHistory = {
      number: cardNumber,
      category: mockCard.category,
      date: mockCard.date,
    };
    setCardHistory([newHistory, ...cardHistory.slice(0, 19)]);

    // فحص الجائزة (كل 5 كروت)
    if (cardHistory.length % 5 === 4) {
      setTimeout(() => {
        toast.success('مبروك لقد حصلت على كرت مجاناً هدية من شبكة سما', {
          duration: 5000,
        });
      }, 500);
    }

    // إذا كان كرت السلفة، تحديث الحالة
    if (cardNumber.includes('100')) {
      setHasPendingDebt(false);
      setUsedLoanService(false);
      toast.success('تم تسديد السلفة بنجاح');
    }

    setCardNumber('');
  };

  const handleLoanService = () => {
    if (usedLoanService) {
      toast.error('لديك سلفة قيد الانتظار. الرجاء تسديدها أولاً');
      return;
    }

    setHasPendingDebt(true);
    setUsedLoanService(true);
    toast.success('تم توليد كرت سلفة 100 ريال. الرجاء استخدامه قبل إدخال كرت آخر');
  };

  const handleContactWhatsApp = () => {
    window.open('https://wa.me/966501234567?text=مرحباً، أحتاج إلى مساعدة', '_blank');
  };

  const handleContactSMS = () => {
    window.open('sms:+966501234567?body=مرحباً، أحتاج إلى مساعدة', '_blank');
  };

  const handleLounge = () => {
    toast.info('جاري فتح صفحة الاستراحة...');
  };

  const handleLiveStream = () => {
    toast.info('جاري فتح البث المباشر...');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-full">
                <Wifi className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">شبكة سما</CardTitle>
            <CardDescription>تطبيق إدارة كروت الشبكة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم الكرت</label>
              <Input
                placeholder="أدخل رقم الكرت"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCardLogin()}
                dir="rtl"
              />
            </div>
            <Button
              onClick={handleCardLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              تسجيل الدخول
            </Button>
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground text-center mb-3">آخر الكروت المستخدمة</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {cardHistory.map((card, idx) => (
                  <div key={idx} className="p-2 bg-muted rounded text-sm text-right">
                    <div className="font-mono">{card.number}</div>
                    <div className="text-xs text-muted-foreground">{card.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* رأس الصفحة */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">شبكة سما</h1>
            <p className="text-muted-foreground">{currentCard?.number}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setIsLoggedIn(false);
              setCurrentCard(null);
            }}
          >
            تسجيل خروج
          </Button>
        </div>

        {/* تنبيه السلفة */}
        {hasPendingDebt && (
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="pt-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <div className="text-right">
                <p className="font-semibold text-destructive">سلفة قيد الانتظار</p>
                <p className="text-sm text-muted-foreground">الرجاء تسديد كرت السلفة 100 ريال أولاً</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* بيانات الكرت الرئيسية */}
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-white">بيانات الكرت</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 p-4 rounded-lg backdrop-blur">
                <p className="text-sm text-white/80">الرصيد المتبقي</p>
                <p className="text-2xl font-bold">{currentCard?.balance} جيجا</p>
              </div>
              <div className="bg-white/20 p-4 rounded-lg backdrop-blur">
                <p className="text-sm text-white/80">الوقت المتبقي</p>
                <p className="text-2xl font-bold">{currentCard?.timeRemaining} دقيقة</p>
              </div>
              <div className="bg-white/20 p-4 rounded-lg backdrop-blur">
                <p className="text-sm text-white/80">مستهلك (تنزيل/رفع)</p>
                <p className="text-lg font-bold">{currentCard?.downloadUsed}/{currentCard?.uploadUsed} جيجا</p>
              </div>
              <div className="bg-white/20 p-4 rounded-lg backdrop-blur">
                <p className="text-sm text-white/80">الوقت المستهلك</p>
                <p className="text-lg font-bold">{currentCard?.timeUsed} دقيقة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* الخدمات */}
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services">الخدمات</TabsTrigger>
            <TabsTrigger value="history">السجل</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-3">
            <Button
              onClick={handleLoanService}
              disabled={usedLoanService}
              variant="outline"
              className="w-full justify-start text-right gap-3 h-auto p-4"
            >
              <Gift className="w-5 h-5 flex-shrink-0" />
              <div className="text-right">
                <p className="font-semibold">سلفني كرت</p>
                <p className="text-xs text-muted-foreground">كرت 100 ريال مجاني</p>
              </div>
            </Button>

            <Button
              onClick={handleContactWhatsApp}
              variant="outline"
              className="w-full justify-start text-right gap-3 h-auto p-4"
            >
              <MessageSquare className="w-5 h-5 flex-shrink-0 text-green-500" />
              <div className="text-right">
                <p className="font-semibold">راسل الدعم</p>
                <p className="text-xs text-muted-foreground">عبر واتس آب</p>
              </div>
            </Button>

            <Button
              onClick={handleContactSMS}
              variant="outline"
              className="w-full justify-start text-right gap-3 h-auto p-4"
            >
              <Phone className="w-5 h-5 flex-shrink-0 text-blue-500" />
              <div className="text-right">
                <p className="font-semibold">تواصل معنا</p>
                <p className="text-xs text-muted-foreground">عبر رسائل SMS</p>
              </div>
            </Button>

            <Button
              onClick={handleLounge}
              variant="outline"
              className="w-full justify-start text-right gap-3 h-auto p-4"
            >
              <Coffee className="w-5 h-5 flex-shrink-0 text-amber-600" />
              <div className="text-right">
                <p className="font-semibold">دخول الاستراحة</p>
                <p className="text-xs text-muted-foreground">منطقة الاسترخاء</p>
              </div>
            </Button>

            <Button
              onClick={handleLiveStream}
              variant="outline"
              className="w-full justify-start text-right gap-3 h-auto p-4"
            >
              <Play className="w-5 h-5 flex-shrink-0 text-red-500" />
              <div className="text-right">
                <p className="font-semibold">البث المباشر</p>
                <p className="text-xs text-muted-foreground">شاهد البث الحي</p>
              </div>
            </Button>
          </TabsContent>

          <TabsContent value="history" className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="w-5 h-5" />
                  آخر 20 كرت مستخدم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {cardHistory.map((card, idx) => (
                    <div key={idx} className="p-3 bg-muted rounded flex justify-between items-center text-right">
                      <div>
                        <p className="font-mono font-semibold">{card.number}</p>
                        <p className="text-xs text-muted-foreground">{card.date}</p>
                      </div>
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        {card.category}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
