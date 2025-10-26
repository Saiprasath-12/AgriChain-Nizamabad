
'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { useEffect, useState } from 'react';

const initialChartData = [
  { month: 'January', price: 7800 },
  { month: 'February', price: 8100 },
  { month: 'March', price: 8000 },
  { month: 'April', price: 8250 },
  { month: 'May', price: 8500 },
  { month: 'June', price: 8400 },
];

const chartConfig = {
  price: {
    label: 'Price (INR/quintal)',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function MarketChart() {
  const [liveData, setLiveData] = useState(initialChartData);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prevData => {
        const lastPrice = prevData[prevData.length - 1].price;
        const change = (Math.random() - 0.5) * 100;
        const newPrice = Math.round(lastPrice + change);
        const newDataPoint = { month: 'Live', price: newPrice };
        // keep the last 5 points + new one
        return [...prevData.slice(-5), newDataPoint];
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">7-Day Price Trend</CardTitle>
          <CardDescription>Live turmeric price fluctuations in the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart
              data={liveData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
               <YAxis
                tickFormatter={(value) => `INR ${value / 1000}k`}
                domain={['dataMin - 200', 'dataMax + 200']}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="price"
                type="natural"
                stroke="var(--color-price)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Monthly Average Prices</CardTitle>
          <CardDescription>Average prices for the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart data={initialChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
               <YAxis tickFormatter={(value) => `INR ${value / 1000}k`} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="price" fill="var(--color-price)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
