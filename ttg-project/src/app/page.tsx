

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header/Header';
import { Video, Users, Shield, Zap, Globe, HeadphonesIcon } from 'lucide-react';
import Link from "next/link";
import ModalDialog from '@/components/LoginModal/LoginModalWrapper'


export default function MainPage() {

  const onClose = () =>{

  }

  const features = [
    {
      icon: Video,
      title: '고화질 화상회의',
      description: '4K 화질과 crystal clear 음성으로 실제처럼 생생한 회의 경험을 제공합니다.'
    },
    {
      icon: Users,
      title: '무제한 참가자',
      description: '소규모 팀 미팅부터 대규모 웨비나까지, 참가자 수 제한 없이 진행하세요.'
    },
    {
      icon: Shield,
      title: '엔터프라이즈 보안',
      description: '종단간 암호화와 고급 보안 기능으로 안전한 회의 환경을 보장합니다.'
    },
    {
      icon: Zap,
      title: '실시간 협업',
      description: '화면 공유, 화이트보드, 실시간 채팅으로 효율적인 협업이 가능합니다.'
    },
    {
      icon: Globe,
      title: '가상 환경',
      description: '다양한 가상 배경과 3D 회의실에서 몰입감 있는 회의를 경험하세요.'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 지원',
      description: '언제든지 필요할 때 전문 지원팀이 도움을 드립니다.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl mb-6 text-foreground">
              미래의 회의를 <br/>
              <span className="text-primary">지금 경험하세요</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              VirtuMeet와 함께 어디서나 생생한 가상환경에서 팀과 연결하고,
              협업하고, 성과를 창출하세요. 차세대 화상회의 플랫폼입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                무료로 시작하기
              </Button>
              <ModalDialog/>
              <Link href="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  로그인하기
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl mb-4 text-foreground">
              왜 VirtuMeet을 선택해야 할까요?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              최신 기술과 직관적인 인터페이스로 회의의 새로운 경험을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary mb-4"/>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl mb-6 text-foreground">
            지금 바로 시작해보세요
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            5분 만에 설정을 완료하고 팀과 함께 혁신적인 회의 경험을 시작하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              무료 체험 시작
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              데모 예약하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}