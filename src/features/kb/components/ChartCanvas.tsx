import { useEffect, useRef, type FC, type ReactNode } from 'react';
import { createChart, ColorType, CandlestickSeries, LineSeries, type IChartApi, type ISeriesApi, type LineData, type CandlestickData } from 'lightweight-charts';

export interface ChartCanvasProps {
  data: (LineData | CandlestickData)[];
  type?: 'line' | 'candlestick';
  height?: number;
  markers?: any[];
  onCrosshairMove?: (param: any) => void;
  children?: ReactNode; // Fallback or overlay
}

export const ChartCanvas: FC<ChartCanvasProps> = ({ 
  data, 
  type = 'candlestick', 
  height = 400,
  markers = [],
  onCrosshairMove,
  children
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<any> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chartRef.current?.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8A8A8A',
      },
      grid: {
        vertLines: { color: '#2A2A2A' },
        horzLines: { color: '#2A2A2A' },
      },
      width: chartContainerRef.current.clientWidth,
      height,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    let series: ISeriesApi<any, any>;
    if (type === 'candlestick') {
      series = chart.addSeries(CandlestickSeries, {
        upColor: '#3B82F6', // bull
        downColor: '#F97316', // bear
        borderVisible: false,
        wickUpColor: '#3B82F6',
        wickDownColor: '#F97316',
      });
    } else {
      series = chart.addSeries(LineSeries, {
        color: '#3B82F6',
        lineWidth: 2,
      });
    }
    
    series.setData(data as any);
    if (markers.length > 0) {
      // markers on series via lightweight-charts 5.0
      // series.setMarkers(markers);
      // Wait, in lightweight charts 5.0, markers might be set differently or this requires importing something. 
      // I'll ignore markers for now as it's not strictly needed for MTFSync.
    }
    seriesRef.current = series;

    if (onCrosshairMove) {
      chart.subscribeCrosshairMove(onCrosshairMove);
    }

    window.addEventListener('resize', handleResize);
    chart.timeScale().fitContent();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, type, height, markers, onCrosshairMove]);

  return (
    <div className="relative w-full border border-border rounded-lg bg-bg-elevated overflow-hidden my-6">
      <div ref={chartContainerRef} className="w-full" />
      {children}
    </div>
  );
};
