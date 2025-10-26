import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketChart from "./components/market-chart";
import PriceForecast from "./components/price-forecast";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Live Market Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time turmeric prices from Nizamabad market and AI-powered forecasts.
        </p>
      </div>

      <Tabs defaultValue="trends" className="mt-8">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="trends">Price Trends</TabsTrigger>
          <TabsTrigger value="forecast">AI Price Forecast</TabsTrigger>
        </TabsList>
        <TabsContent value="trends" className="mt-6">
          <MarketChart />
        </TabsContent>
        <TabsContent value="forecast" className="mt-6">
          <PriceForecast />
        </TabsContent>
      </Tabs>
    </div>
  );
}
