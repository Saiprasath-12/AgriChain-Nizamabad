'use server';

/**
 * @fileOverview AI-powered price forecasts for turmeric.
 *
 * - getMarketPriceForecast - A function that provides price forecasts for turmeric.
 * - MarketPriceForecastInput - The input type for the getMarketPriceForecast function.
 * - MarketPriceForecastOutput - The return type for the getMarketPriceForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarketPriceForecastInputSchema = z.object({
  crop: z.string().describe('The crop for which to forecast the price, e.g., turmeric.'),
  region: z.string().describe('The region for which to forecast the price, e.g., Nizamabad.'),
  timeHorizon: z
    .string()
    .describe(
      'The time horizon for the forecast, e.g., next day, next week, next month.'
    ),
});
export type MarketPriceForecastInput = z.infer<typeof MarketPriceForecastInputSchema>;

const MarketPriceForecastOutputSchema = z.object({
  forecast: z.string().describe('The predicted price for the specified crop and region.'),
  confidence: z
    .number()
    .describe('A measure of the confidence in the forecast, from 0 to 1.'),
  rationale: z
    .string()
    .describe('The rationale behind the price forecast, explaining the factors considered.'),
});
export type MarketPriceForecastOutput = z.infer<typeof MarketPriceForecastOutputSchema>;

export async function getMarketPriceForecast(
  input: MarketPriceForecastInput
): Promise<MarketPriceForecastOutput> {
  return marketPriceForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketPriceForecastPrompt',
  input: {schema: MarketPriceForecastInputSchema},
  output: {schema: MarketPriceForecastOutputSchema},
  prompt: `You are an AI assistant that provides price forecasts for agricultural crops.

  Given the following input, provide a price forecast, a confidence level, and a rationale.

  Crop: {{{crop}}}
  Region: {{{region}}}
  Time Horizon: {{{timeHorizon}}}

  Format your output as a JSON object:
  {
    "forecast": "The predicted price",
    "confidence": 0.8,
    "rationale": "Explanation of factors considered"
  }`,
});

const marketPriceForecastFlow = ai.defineFlow(
  {
    name: 'marketPriceForecastFlow',
    inputSchema: MarketPriceForecastInputSchema,
    outputSchema: MarketPriceForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
