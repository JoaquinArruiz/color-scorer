import { usePreviewColors } from "@/hooks/usePreviewColors";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Bar,
  Area,
  BarChart,
  AreaChart,
} from "recharts";

const lineData = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 180 },
  { name: "Mar", value: 150 },
  { name: "Apr", value: 250 },
  { name: "May", value: 300 },
  { name: "Jun", value: 280 },
];

const barData = [
  { name: "Red", value: 85 },
  { name: "Blue", value: 65 },
  { name: "Green", value: 45 },
  { name: "Yellow", value: 30 },
  { name: "Purple", value: 25 },
  { name: "Orange", value: 20 },
];

const areaData = [
  { name: "Q1", value: 1200 },
  { name: "Q2", value: 2100 },
  { name: "Q3", value: 1800 },
  { name: "Q4", value: 2400 },
];

const multiLineData = [
  { name: "Mon", value1: 2400, value2: 1800 },
  { name: "Tue", value1: 1398, value2: 2200 },
  { name: "Wed", value1: 3200, value2: 2800 },
  { name: "Thu", value1: 2800, value2: 3300 },
  { name: "Fri", value1: 3500, value2: 2900 },
];

export const ChartComponent1 = () => {
  const { text, bg } = usePreviewColors();

  const config = {
    line1: {
      color: text,
    },
  };

  return (
    <div
      className="min-w-53 max-w-96 w-full p-2 border rounded-lg"
      style={{
        backgroundColor: bg,
        borderColor: text,
      }}
    >
      <ChartContainer config={config}>
        <LineChart data={lineData}>
          <XAxis
            dataKey="name"
            stroke={text}
            tick={{ fill: text }}
          />
          <YAxis
            stroke={text}
            tick={{ fill: text }}
          />
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={2}
            stroke={text}
            dot={{
              fill: bg,
              stroke: text,
              strokeWidth: 2,
            }}
          />
          <ChartTooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                style={{
                  backgroundColor: bg,
                  borderColor: text,
                  color: text,
                }}
                className="bg-black/90"
              />
            )}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export const ChartComponent2 = () => {
  const { text, bg } = usePreviewColors();

  const config = {
    bar1: {
      color: text,
    },
  };

  return (
    <div
      className="min-w-53 max-w-96 w-full p-2 border rounded-lg"
      style={{
        backgroundColor: bg,
        borderColor: text,
      }}
    >
      <ChartContainer config={config}>
        <BarChart data={barData}>
          <XAxis
            dataKey="name"
            stroke={text}
            tick={{ fill: text }}
          />
          <YAxis
            stroke={text}
            tick={{ fill: text }}
          />
          <Bar
            dataKey="value"
            fill={text}
            stroke={text}
            strokeWidth={1}
          />
          <ChartTooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                style={{
                  backgroundColor: bg,
                  borderColor: text,
                  color: text,
                }}
                className="bg-black/90"
              />
            )}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export const ChartComponent3 = () => {
  const { text, bg } = usePreviewColors();

  const config = {
    area1: {
      color: text,
    },
  };

  return (
    <div
      className="min-w-53 max-w-96 w-full p-2 border rounded-lg"
      style={{
        backgroundColor: bg,
        borderColor: text,
      }}
    >
      <ChartContainer config={config}>
        <AreaChart data={areaData}>
          <XAxis
            dataKey="name"
            stroke={text}
            tick={{ fill: text }}
          />
          <YAxis
            stroke={text}
            tick={{ fill: text }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={text}
            fill={text}
            fillOpacity={0.3}
          />
          <ChartTooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                style={{
                  backgroundColor: bg,
                  borderColor: text,
                  color: text,
                }}
                className="bg-black/90"
              />
            )}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export const ChartComponent4 = () => {
  const { text, bg } = usePreviewColors();

  const config = {
    line1: {
      color: text,
    },
    line2: {
      color: bg,
    },
  };

  return (
    <div
      className="min-w-53 max-w-96 w-full p-2 border rounded-lg"
      style={{
        backgroundColor: bg,
        borderColor: text,
      }}
    >
      <ChartContainer config={config}>
        <LineChart data={multiLineData}>
          <XAxis
            dataKey="name"
            stroke={text}
            tick={{ fill: text }}
          />
          <YAxis
            stroke={text}
            tick={{ fill: text }}
          />
          <Line
            type="monotone"
            dataKey="value1"
            strokeWidth={2}
            stroke={text}
            dot={{
              fill: bg,
              stroke: text,
              strokeWidth: 2,
            }}
          />
          <Line
            type="monotone"
            dataKey="value2"
            strokeWidth={2}
            stroke={text}
            dot={{
              fill: text,
              stroke: bg,
              strokeWidth: 2,
            }}
          />
          <ChartTooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                style={{
                  borderColor: text,
                }}
                className="bg-black/90"
              />
            )}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};
