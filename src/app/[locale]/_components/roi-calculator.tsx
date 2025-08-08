/**
 * CSR ROI Calculator Component (Dynamic Import) - 客户端渲染投资回报率计算器组件（动态导入）
 * Client-Side Rendered ROI Calculator Component (Dynamic Import)
 *
 * 此组件通过动态导入在客户端渲染，从SSG页面中分离出来，提供交互式计算功能
 * This component is dynamically imported and client-side rendered, separated from SSG page to provide interactive calculation
 * 帮助决策者计算Smart Bin投资回报率和环保效益
 * Helps decision makers calculate Smart Bin ROI and environmental benefits
 */
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, Leaf } from 'lucide-react';
export function ROICalculator() {
  const t = useTranslations('HomePage');

  // 计算器输入参数
  const [inputs, setInputs] = useState({
    binCount: 100,
    currentFrequency: 7, // 每周清运次数
    laborCost: 200, // 每次清运人力成本（元）
    fuelCost: 50, // 每次清运燃料成本（元）
    deviceCost: 2000, // 单个设备成本（元）
    platformCost: 50, // 每月平台订阅费（元/桶）
  });

  const [showResults, setShowResults] = useState(false);

  // 计算ROI结果
  const calculateROI = () => {
    // 当前年成本
    const currentWeeklyCost = inputs.binCount * inputs.currentFrequency * (inputs.laborCost + inputs.fuelCost);
    const currentYearlyCost = currentWeeklyCost * 52;

    // Smart Bin后成本（减少32%清运次数）
    const optimizedFrequency = inputs.currentFrequency * 0.68;
    const optimizedWeeklyCost = inputs.binCount * optimizedFrequency * (inputs.laborCost + inputs.fuelCost);
    const optimizedYearlyCost = optimizedWeeklyCost * 52;

    // 年节省费用
    const yearlySavings = currentYearlyCost - optimizedYearlyCost;

    // 初始投资
    const initialInvestment = inputs.binCount * inputs.deviceCost + inputs.binCount * inputs.platformCost * 12;

    // 回本时间（年）
    const paybackPeriod = initialInvestment / yearlySavings;

    // 碳减排计算（每次清运约产生5kg CO2）
    const currentCO2 = (inputs.binCount * inputs.currentFrequency * 52 * 5) / 1000; // 吨/年
    const optimizedCO2 = (inputs.binCount * optimizedFrequency * 52 * 5) / 1000;
    const co2Reduction = currentCO2 - optimizedCO2;

    return {
      yearlySavings: Math.round(yearlySavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Reduction: Math.round(co2Reduction * 10) / 10,
      currentYearlyCost: Math.round(currentYearlyCost),
      optimizedYearlyCost: Math.round(optimizedYearlyCost),
    };
  };

  const results = showResults ? calculateROI() : null;

  const handleInputChange = (field: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">{t('roi.title')}</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('roi.description')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* 输入参数 */}
          <Card>
            <CardHeader>
              <CardTitle>
                <h3>{t('roi.inputs.title')}</h3>
              </CardTitle>
              <CardDescription>{t('roi.inputs.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="binCount">{t('roi.inputs.binCount')}</Label>
                  <Input
                    id="binCount"
                    type="number"
                    value={inputs.binCount}
                    onChange={(e) => handleInputChange('binCount', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">{t('roi.inputs.frequency')}</Label>
                  <Input
                    id="frequency"
                    type="number"
                    value={inputs.currentFrequency}
                    onChange={(e) => handleInputChange('currentFrequency', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="laborCost">{t('roi.inputs.laborCost')}</Label>
                  <Input
                    id="laborCost"
                    type="number"
                    value={inputs.laborCost}
                    onChange={(e) => handleInputChange('laborCost', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="fuelCost">{t('roi.inputs.fuelCost')}</Label>
                  <Input
                    id="fuelCost"
                    type="number"
                    value={inputs.fuelCost}
                    onChange={(e) => handleInputChange('fuelCost', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deviceCost">{t('roi.inputs.deviceCost')}</Label>
                  <Input
                    id="deviceCost"
                    type="number"
                    value={inputs.deviceCost}
                    onChange={(e) => handleInputChange('deviceCost', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="platformCost">{t('roi.inputs.platformCost')}</Label>
                  <Input
                    id="platformCost"
                    type="number"
                    value={inputs.platformCost}
                    onChange={(e) => handleInputChange('platformCost', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <Button onClick={handleCalculate} className="w-full" size="lg">
                <Calculator className="mr-2 h-4 w-4" />
                {t('roi.calculate')}
              </Button>
            </CardContent>
          </Card>

          {/* 计算结果 */}
          <Card>
            <CardHeader>
              <CardTitle>
                <h3>{t('roi.results.title')}</h3>
              </CardTitle>
              <CardDescription>{t('roi.results.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              {showResults && results ? (
                <div className="space-y-6">
                  {/* 投资回报 */}
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800 dark:text-green-200">{t('roi.results.payback')}</h4>
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {results.paybackPeriod} {t('roi.results.years')}
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">{t('roi.results.paybackDesc')}</p>
                  </div>

                  {/* 年节省费用 */}
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">{t('roi.results.savings')}</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      ¥{results.yearlySavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      {t('roi.results.from')} ¥{results.currentYearlyCost.toLocaleString()}
                      {t('roi.results.to')} ¥{results.optimizedYearlyCost.toLocaleString()}
                    </div>
                  </div>

                  {/* 碳减排 */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="h-5 w-5 text-emerald-600" />
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">
                        {t('roi.results.carbon')}
                      </h4>
                    </div>
                    <div className="text-2xl font-bold text-emerald-600 mb-1">
                      {results.co2Reduction} {t('roi.results.tons')}
                    </div>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">{t('roi.results.carbonDesc')}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{t('roi.results.placeholder')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ROICalculator;
