/** トレーニングボリュームのチャートを表示する
 *  トレーニングデータを視覚化するための折れ線グラフを提供します。
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    text: {
      primary: "#EAEAEA", // プライマリーテキストの色
    },
  },
});

/**
 * データの型定義。
 * @param data 数値データの配列。各エクササイズのトレーニングボリュームを示す。
 * @param label エクササイズの名前。グラフに表示されるラベル。
 */
interface SeriesData {
  data: number[];
  label: string;
  lineStyle?: { stroke: string }; // 線のスタイルを追加
}

/**
 * グラフコンポーネントのプロパティ。
 * @param xLabels 日付またはトレーニング完了時のタイムスタンプを示すラベルの配列。
 * @param seriesData 複数のエクササイズのデータを格納する配列。
 */
interface ChartProps {
  seriesData: SeriesData[];
  xLabels: string[];
}

const Chart: React.FC<ChartProps> = ({ seriesData, xLabels }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 600,
    height: 400,
  });

  // ウィンドウサイズの変更の際にチャートのサイズを変更する
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        setChartSize({
          width: chartRef.current.offsetWidth,
          height: chartRef.current.offsetHeight,
        });
      }
    };

    // 初回サイズ設定
    handleResize();

    // ResizeObserverの設定・チャートの親要素のサイズ変更を監視。
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    // クリーンアップ
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // seriesDataが空の場合のエラーチェック
  if (seriesData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div ref={chartRef} className="w-full h-64 md:h-96">
      <ThemeProvider theme={theme}>
        <LineChart
          width={chartSize.width}
          height={chartSize.height}
          series={seriesData.map((series) => ({
            data: series.data,
            label: series.label,
            lineStyle: series.lineStyle || { stroke: "#F30067" }, // デフォルトの線色
          }))}
          xAxis={[
            {
              scaleType: "point",
              data: xLabels,
            },
          ]}
        />
      </ThemeProvider>
    </div>
  );
};

export default Chart;
