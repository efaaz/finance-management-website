import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive line chart";

// Updated chartData with total_income and total_spending fields
const chartData = [
  { date: "2024-04-01", total_income: 350, total_spending: 180 },
  { date: "2024-04-02", total_income: 400, total_spending: 210 },
  { date: "2024-04-03", total_income: 380, total_spending: 200 },
  { date: "2024-04-04", total_income: 450, total_spending: 240 },
  { date: "2024-04-05", total_income: 420, total_spending: 270 },
  // Add additional data as needed
];

const chartConfig = {
  total_income: { label: "Total Income", color: "hsl(var(--chart-1))" },
  total_spending: { label: "Total Spending", color: "hsl(var(--chart-2))" },
};

function LineCharts() {
  const [activeChart, setActiveChart] = React.useState("total_income");

  const total = React.useMemo(() => {
    return chartData.reduce(
      (acc, curr) => {
        acc.total_income += curr.total_income;
        acc.total_spending += curr.total_spending;
        return acc;
      },
      { total_income: 0, total_spending: 0 }
    );
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Month Breakdown</CardTitle>
          <CardDescription>
            Showing total income and spending for the current month
          </CardDescription>
        </div>
        <div className="flex">
          {["total_income", "total_spending"].map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs font-semibold text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                ${total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default LineCharts;
