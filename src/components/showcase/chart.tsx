import { getHexString, useColorStore } from "@/store/colorStore";
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
  const color = useColorStore();

  const config = {
    line1: {
      color: getHexString(color.color1),
    },
  };

  return (
    <div
      className="min-w-53 max-w-96 w-full p-2 border rounded-lg"
      style={{
        backgroundColor: getHexString(color.color2),
        borderColor: getHexString(color.color1),
      }}
    >
      <ChartContainer config={config}>
        <LineChart data={lineData}>
          <XAxis
            dataKey="name"
            stroke={getHexString(color.color1)}
            tick={{ fill: getHexString(color.color1) }}
          />
          <YAxis
            stroke={getHexString(color.color1)}
            tick={{ fill: getHexString(color.color1) }}
          />
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={2}
            stroke={getHexString(color.color1)}
            dot={{
              fill: getHexString(color.color2),
              stroke: getHexString(color.color1),
              strokeWidth: 2,
            }}
          />
          <ChartTooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                style={{
                  backgroundColor: getHexString(color.color2),
                  borderColor: getHexString(color.color1),
                  color: getHexString(color.color1),
                }}
              />
            )}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export const ChartComponent2 = () => {
  const color = useColorStore();

  const config = {
    bar1: {
      color: getHexString(color.color1),
    },
  };

  return (
    <div
      className="min-w-53 max-w-96 w-full p-2 border rounded-lg"
      style={{
        backgroundColor: getHexString(color.color2),
        borderColor: getHexString(color.color1),
      }}
    >
      <ChartContainer config={config}>
        <BarChart data={barData}>
          <XAxis
            dataKey="name"
            stroke={getHexString(color.color1)}
            tick={{ fill: getHexString(color.color1) }}
          />
          <YAxis
            stroke={getHexString(color.color1)}
            tick={{ fill: getHexString(color.color1) }}
          />
          <Bar
            dataKey="value"
            fill={getHexString(color.color1)}
            stroke={getHexString(color.color1)}
            strokeWidth={1}
          />
          <ChartTooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                style={{
                  backgroundColor: getHexString(color.color2),
                  borderColor: getHexString(color.color1),
                  color: getHexString(color.color1),
                }}
              />
            )}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export const ChartComponent3 = () => {
  const color = useColorStore();

  const config = {
    area1: {
      color: getHexString(color.color1),
    },
  };

  return (
    <div
      className="min-w-53 max-w-96 w-full p-2 border rounded-lg"
      style={{
        backgroundColor: getHexString(color.color2),
        borderColor: getHexString(color.color1),
      }}
    >
      <ChartContainer config={config}>
        <AreaChart data={areaData}>
          <XAxis
            dataKey="name"
            stroke={getHexString(color.color1)}
            tick={{ fill: getHexString(color.color1) }}
          />
          <YAxis
            stroke={getHexString(color.color1)}
            tick={{ fill: getHexString(color.color1) }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={getHexString(color.color1)}
            fill={getHexString(color.color1)}
            fillOpacity={0.3}
          />
          <ChartTooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                style={{
                  backgroundColor: getHexString(color.color2),
                  borderColor: getHexString(color.color1),
                  color: getHexString(color.color1),
                }}
              />
            )}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export const ChartComponent4 = () => {
  const color = useColorStore();

  const config = {
    line1: {
      color: getHexString(color.color1),
    },
    line2: {
      color: getHexString(color.color2),
    },
  };

  return (
    <div
      className="min-w-53 max-w-96 w-full p-2 border rounded-lg"
      style={{
        backgroundColor: getHexString(color.color2),
        borderColor: getHexString(color.color1),
      }}
    >
      <ChartContainer config={config}>
        <LineChart data={multiLineData}>
          <XAxis
            dataKey="name"
            stroke={getHexString(color.color1)}
            tick={{ fill: getHexString(color.color1) }}
          />
          <YAxis
            stroke={getHexString(color.color1)}
            tick={{ fill: getHexString(color.color1) }}
          />
          <Line
            type="monotone"
            dataKey="value1"
            strokeWidth={2}
            stroke={getHexString(color.color1)}
            dot={{
              fill: getHexString(color.color2),
              stroke: getHexString(color.color1),
              strokeWidth: 2,
            }}
          />
          <Line
            type="monotone"
            dataKey="value2"
            strokeWidth={2}
            stroke={getHexString(color.color1)}
            dot={{
              fill: getHexString(color.color1),
              stroke: getHexString(color.color2),
              strokeWidth: 2,
            }}
          />
          <ChartTooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                style={{
                  backgroundColor: getHexString(color.color2),
                  borderColor: getHexString(color.color1),
                  color: getHexString(color.color1),
                }}
              />
            )}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};
