/**
 * CSR Theme Provider Component - 客户端渲染主题提供者组件
 * Client-Side Rendered Theme Provider Component
 *
 * 此组件在客户端渲染，为应用提供主题切换功能
 * This component is client-side rendered and provides theme switching functionality for the app
 */
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
