/**
 * Map Controls Component - 地图控制组件
 * Map Controls Component
 *
 * 提供地图交互控制功能，包括图层切换、过滤器、缩放等
 * Provides map interaction controls including layer switching, filters, zoom, etc.
 */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  EyeOff,
  MapPin,
} from 'lucide-react';

interface MapControlsProps {
  onLayerChange: (layer: string) => void;
  onFilterChange: (filter: string) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onToggleBinVisibility: () => void;
  onToggleRouteVisibility: () => void;
  onToggleTrafficVisibility: () => void;
}

export function MapControls({
  onLayerChange,
  onFilterChange,
  onZoomIn,
  onZoomOut,
  onReset,
  onToggleBinVisibility,
  onToggleRouteVisibility,
  onToggleTrafficVisibility,
}: MapControlsProps) {
  const [activeLayer, setActiveLayer] = useState('satellite');
  const [activeFilter, setActiveFilter] = useState('all');
  const [binVisible, setBinVisible] = useState(true);
  const [routeVisible, setRouteVisible] = useState(true);
  const [trafficVisible, setTrafficVisible] = useState(false);

  const layers = [
    { id: 'satellite', name: '卫星图', icon: Eye },
    { id: 'street', name: '街道图', icon: MapPin },
    { id: 'terrain', name: '地形图', icon: Target },
  ];

  const filters = [
    { id: 'all', name: '全部', count: 20 },
    { id: 'urgent', name: '紧急', count: 3 },
    { id: 'medium', name: '中等', count: 5 },
    { id: 'normal', name: '正常', count: 12 },
  ];

  const handleLayerChange = (layerId: string) => {
    setActiveLayer(layerId);
    onLayerChange(layerId);
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  const handleToggleBinVisibility = () => {
    setBinVisible(!binVisible);
    onToggleBinVisibility();
  };

  const handleToggleRouteVisibility = () => {
    setRouteVisible(!routeVisible);
    onToggleRouteVisibility();
  };

  const handleToggleTrafficVisibility = () => {
    setTrafficVisible(!trafficVisible);
    onToggleTrafficVisibility();
  };

  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
      {/* 图层控制 */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">图层</div>
        <div className="space-y-1">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <Button
                key={layer.id}
                size="sm"
                variant={activeLayer === layer.id ? 'default' : 'outline'}
                className="w-full justify-start text-xs h-8"
                onClick={() => handleLayerChange(layer.id)}
              >
                <Icon className="h-3 w-3 mr-1" />
                {layer.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* 过滤器控制 */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">过滤器</div>
        <div className="space-y-1">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              size="sm"
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              className="w-full justify-between text-xs h-8"
              onClick={() => handleFilterChange(filter.id)}
            >
              <span>{filter.name}</span>
              <Badge variant="secondary" className="text-xs">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* 显示控制 */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">显示</div>
        <div className="space-y-1">
          <Button
            size="sm"
            variant={binVisible ? 'default' : 'outline'}
            className="w-full justify-start text-xs h-8"
            onClick={handleToggleBinVisibility}
          >
            {binVisible ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
            垃圾桶
          </Button>
          <Button
            size="sm"
            variant={routeVisible ? 'default' : 'outline'}
            className="w-full justify-start text-xs h-8"
            onClick={handleToggleRouteVisibility}
          >
            {routeVisible ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
            路线
          </Button>
          <Button
            size="sm"
            variant={trafficVisible ? 'default' : 'outline'}
            className="w-full justify-start text-xs h-8"
            onClick={handleToggleTrafficVisibility}
          >
            {trafficVisible ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
            交通
          </Button>
        </div>
      </div>

      {/* 缩放控制 */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">缩放</div>
        <div className="space-y-1">
          <Button size="sm" variant="outline" className="w-full h-8" onClick={onZoomIn}>
            <ZoomIn className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="outline" className="w-full h-8" onClick={onZoomOut}>
            <ZoomOut className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="outline" className="w-full h-8" onClick={onReset}>
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
} 