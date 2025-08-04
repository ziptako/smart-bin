# 国际化 (i18n) 使用指南

本项目已集成 `next-intl` 库，支持多语言功能。

## 支持的语言

- 英文 (en) - 默认语言
- 中文 (zh)

## 项目结构

```
src/
├── i18n/
│   ├── request.ts      # next-intl 请求配置
│   ├── routing.ts      # 路由和语言配置
│   └── navigation.ts   # 国际化导航工具
├── middleware.ts       # 处理语言路由的中间件
├── app/
│   ├── [locale]/       # 带语言参数的页面
│   │   ├── layout.tsx  # 国际化布局
│   │   ├── page.tsx    # 首页
│   │   └── about/
│   │       └── page.tsx # 关于页面
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 根页面（重定向到默认语言）
├── components/
│   └── LanguageSwitcher.tsx # 语言切换组件
messages/
├── en.json             # 英文翻译
└── zh.json             # 中文翻译
```

## 如何使用

### 1. 在组件中使用翻译

```tsx
import {useTranslations} from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('HomePage');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### 2. 创建国际化链接

```tsx
import {Link} from '../i18n/navigation';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">{t('home')}</Link>
      <Link href="/about">{t('about')}</Link>
    </nav>
  );
}
```

### 3. 添加新的翻译

在 `messages/en.json` 和 `messages/zh.json` 中添加新的翻译键值对：

```json
{
  "NewSection": {
    "title": "New Title",
    "description": "New Description"
  }
}
```

### 4. 添加新语言

1. 在 `src/i18n/routing.ts` 中添加新语言到 `locales` 数组
2. 创建对应的翻译文件 `messages/{locale}.json`
3. 更新语言切换器组件

## URL 结构

- `/` - 自动重定向到 `/en`
- `/en` - 英文首页
- `/zh` - 中文首页
- `/en/about` - 英文关于页面
- `/zh/about` - 中文关于页面

## 开发服务器

运行开发服务器：

```bash
pnpm dev
```

访问 http://localhost:3000 查看应用，系统会自动重定向到默认语言版本。

## 功能特性

- ✅ 自动语言检测和重定向
- ✅ URL 路径本地化
- ✅ 语言切换器组件
- ✅ 类型安全的翻译
- ✅ 服务端渲染支持
- ✅ 中间件处理路由

## 注意事项

1. 所有页面都需要放在 `[locale]` 文件夹下
2. 使用 `next-intl` 提供的 `Link` 组件而不是 Next.js 原生的 `Link`
3. 翻译文件使用嵌套结构组织，便于管理
4. 语言切换会保持当前页面路径