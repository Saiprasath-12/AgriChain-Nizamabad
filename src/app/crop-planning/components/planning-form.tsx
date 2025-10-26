
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Bot } from 'lucide-react';

import {
  optimalCropPlanning,
  type OptimalCropPlanningOutput,
} from '@/ai/flows/optimal-crop-planning';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  region: z.string().min(1, 'Region is required.'),
  soilType: z.string().min(1, 'Soil type is required.'),
  historicalData: z.string().min(1, 'Please provide some historical data.'),
  marketTrends: z.string().min(1, 'Please provide some market trends.'),
  availableResources: z.string().min(1, 'Please list available resources.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function PlanningForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimalCropPlanningOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: 'Nizamabad',
      soilType: 'Black soil',
      historicalData: 'Last season: Turmeric, Yield: 80 quintals/acre. Previous: Paddy, Yield: 25 bags/acre.',
      marketTrends: 'Turmeric prices are high. Cotton demand is increasing. Local demand for vegetables is stable.',
      availableResources: 'Borewell water, 2 laborers, 1 tractor, organic fertilizers available.',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    try {
      const plan = await optimalCropPlanning(values);
      setResult(plan);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate crop plan. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline">Generate Your Crop Plan</CardTitle>
        <CardDescription>
          Fill in the details below. The more information you provide, the better the recommendation.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Input {...field} suppressHydrationWarning />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soilType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil Type</FormLabel>
                    <FormControl>
                      <Input {...field} suppressHydrationWarning />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="historicalData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Data</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Last year crop, yield, etc." {...field} suppressHydrationWarning />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketTrends"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Market Trends</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., High demand for turmeric, low prices for maize..." {...field} suppressHydrationWarning />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availableResources"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Resources</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Water availability, labor, machinery..." {...field} suppressHydrationWarning />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit" disabled={isLoading} suppressHydrationWarning>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                'Generate Optimal Plan'
              )}
            </Button>
            {result && (
              <Card className="w-full bg-secondary">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <Bot /> Recommended Crop Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 prose prose-sm max-w-none">
                    <h3 className="font-headline">Optimal Crop Plan</h3>
                    <p>{result.cropPlan}</p>
                    <h3 className="font-headline">Reasoning</h3>
                    <p>{result.reasoning}</p>
                </CardContent>
              </Card>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
