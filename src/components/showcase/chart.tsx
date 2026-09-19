import { usePreviewColors } from "@/hooks/usePreviewColors";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Line, LineChart, XAxis, YAxis, Bar, BarChart } from "recharts";

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
          <XAxis dataKey="name" stroke={text} tick={{ fill: text }} />
          <YAxis stroke={text} tick={{ fill: text }} />
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
          <XAxis dataKey="name" stroke={text} tick={{ fill: text }} />
          <YAxis stroke={text} tick={{ fill: text }} />
          <Bar dataKey="value" fill={text} stroke={text} strokeWidth={1} />
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
