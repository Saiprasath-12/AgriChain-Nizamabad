'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, TrendingUp } from 'lucide-react';

import {
  getMarketPriceForecast,
  type MarketPriceForecastOutput,
} from '@/ai/flows/market-price-forecasting';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  crop: z.string().min(1, 'Crop is required.'),
  region: z.string().min(1, 'Region is required.'),
  timeHorizon: z.string().min(1, 'Time horizon is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function PriceForecast() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MarketPriceForecastOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crop: 'Turmeric',
      region: 'Nizamabad',
      timeHorizon: 'next week',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    try {
      const forecast = await getMarketPriceForecast(values);
      setResult(forecast);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get price forecast. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Get Price Forecast</CardTitle>
          <CardDescription>
            Use our AI model to predict future market prices for your crop.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="crop"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Turmeric" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Nizamabad" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeHorizon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Horizon</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time horizon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="next day">Next Day</SelectItem>
                        <SelectItem value="next week">Next Week</SelectItem>
                        <SelectItem value="next month">Next Month</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Forecasting...
                  </>
                ) : (
                  'Get Forecast'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <div className="flex items-center justify-center">
        {isLoading ? (
          <div className="text-center text-muted-foreground">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4">Our AI is analyzing market data...</p>
          </div>
        ) : result ? (
          <Card className="w-full bg-accent text-accent-foreground border-accent-foreground">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <TrendingUp />
                AI Forecast Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm">Predicted Price</p>
                <p className="text-3xl font-bold font-headline">{result.forecast}</p>
              </div>
              <div>
                <p className="text-sm">Confidence</p>
                <p className="text-xl font-bold">{Math.round(result.confidence * 100)}%</p>
              </div>
               <div>
                <p className="text-sm">Rationale</p>
                <p className="text-base">{result.rationale}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            <p>Your forecast results will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
