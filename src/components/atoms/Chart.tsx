/** トレーニングボリュームのチャートを表示する
 *
 */

"use client";

import * as React from "react";
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
 * @param data には後でvolumeが入る
 * @param label には後でexercise_nameが入る
 */
interface SeriesData {
  data: number[];
  label: string;
  lineStyle?: { stroke: string }; // 線のスタイルを追加
}

/**
 * @param xLabels には後でcompleted_atが入る
 */
interface ChartProps {
  seriesData: SeriesData[];
  xLabels: string[];
}

const Chart: React.FC<ChartProps> = ({ seriesData, xLabels }) => {
  // seriesDataが空の場合のエラーチェック
  if (seriesData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <LineChart
        width={600}
        height={400}
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
  );
};

export default Chart;
