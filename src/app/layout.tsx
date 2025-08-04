interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * 根布局组件
 * 处理根路径访问，重定向到默认语言版本
 */
export default function RootLayout({ children }: RootLayoutProps) {
  // 这个layout只是为了处理根路径重定向
  // 实际的布局在 [locale]/layout.tsx 中
  return children;
}
