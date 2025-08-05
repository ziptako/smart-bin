'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Code, MessageSquare, Book, Users, ExternalLink } from 'lucide-react';

/**
 * 开发者社区组件
 * 提供GitHub仓库、API文档、SDK和社区入口
 */
export function DeveloperSection() {
  const t = useTranslations('HomePage');

  // GitHub仓库统计数据（模拟）
  const githubStats = {
    stars: 1247,
    forks: 89,
    issues: 12,
    contributors: 23,
  };

  // 开发资源
  const resources = [
    {
      title: 'REST API 文档',
      titleEn: 'REST API Documentation',
      description: '完整的API接口文档，支持实时监控、数据查询和设备控制',
      descriptionEn: 'Complete API documentation for real-time monitoring, data queries, and device control',
      icon: Book,
      url: 'https://docs.smart-bin.com/api',
      badge: 'v2.1',
    },
    {
      title: 'JavaScript SDK',
      titleEn: 'JavaScript SDK',
      description: '前端集成SDK，快速接入Smart Bin数据和功能',
      descriptionEn: 'Frontend integration SDK for quick Smart Bin data and feature integration',
      icon: Code,
      url: 'https://github.com/ziptako/smart-bin-js-sdk',
      badge: 'npm',
    },
    {
      title: 'Python SDK',
      titleEn: 'Python SDK',
      description: '后端服务SDK，支持数据分析和批量操作',
      descriptionEn: 'Backend service SDK supporting data analysis and batch operations',
      icon: Code,
      url: 'https://github.com/ziptako/smart-bin-python-sdk',
      badge: 'PyPI',
    },
  ];

  // 社区平台
  const communities = [
    {
      name: 'GitHub Discussions',
      description: '技术讨论、功能建议和问题反馈',
      descriptionEn: 'Technical discussions, feature requests, and issue feedback',
      icon: Github,
      url: 'https://github.com/ziptako/smart-bin/discussions',
      members: '500+',
    },
    {
      name: 'Discord 社区',
      description: '实时交流、开发支持和经验分享',
      descriptionEn: 'Real-time communication, development support, and experience sharing',
      icon: MessageSquare,
      url: 'https://discord.gg/smart-bin',
      members: '1.2k+',
    },
    {
      name: '开发者论坛',
      description: '深度技术讨论和最佳实践分享',
      descriptionEn: 'In-depth technical discussions and best practice sharing',
      icon: Users,
      url: 'https://forum.smart-bin.com',
      members: '800+',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Github className="h-8 w-8 text-gray-800 dark:text-gray-200" />
            <h2 className="text-3xl font-bold">{t('developer.title')}</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('developer.description')}</p>
        </div>

        {/* GitHub仓库卡片 */}
        <div className="mb-12">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Github className="h-8 w-8" />
                  <div>
                    <CardTitle className="text-xl">
                      <h3>ziptako/smart-bin</h3>
                    </CardTitle>
                    <CardDescription>{t('developer.github.description')}</CardDescription>
                  </div>
                </div>
                <Button
                  onClick={() => window.open('https://github.com/ziptako/smart-bin', '_blank')}
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  {t('developer.github.visit')}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* GitHub统计 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">⭐ {githubStats.stars}</div>
                  <div className="text-sm text-muted-foreground">{t('developer.github.stars')}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">🍴 {githubStats.forks}</div>
                  <div className="text-sm text-muted-foreground">{t('developer.github.forks')}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">🐛 {githubStats.issues}</div>
                  <div className="text-sm text-muted-foreground">{t('developer.github.issues')}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">👥 {githubStats.contributors}</div>
                  <div className="text-sm text-muted-foreground">{t('developer.github.contributors')}</div>
                </div>
              </div>

              {/* 快速链接 */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://github.com/ziptako/smart-bin/issues/new', '_blank')}
                >
                  {t('developer.github.reportIssue')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://github.com/ziptako/smart-bin/fork', '_blank')}
                >
                  {t('developer.github.fork')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open('https://github.com/ziptako/smart-bin/blob/main/CONTRIBUTING.md', '_blank')
                  }
                >
                  {t('developer.github.contribute')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 开发资源 */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8">{t('developer.resources.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                        <CardTitle className="text-lg">
                          <h4>{resource.title}</h4>
                        </CardTitle>
                      </div>
                      <Badge variant="secondary">{resource.badge}</Badge>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => window.open(resource.url, '_blank')}>
                      {t('developer.resources.access')}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 社区平台 */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8">{t('developer.community.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {communities.map((community, index) => {
              const IconComponent = community.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="h-6 w-6 text-green-600" />
                      <CardTitle className="text-lg">
                        <h4>{community.name}</h4>
                      </CardTitle>
                    </div>
                    <CardDescription>{community.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">
                        {t('developer.community.members')}: {community.members}
                      </span>
                    </div>
                    <Button className="w-full" onClick={() => window.open(community.url, '_blank')}>
                      {t('developer.community.join')}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeveloperSection;
