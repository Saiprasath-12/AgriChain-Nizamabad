'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating optimal crop plans based on historical data and market trends.
 *
 * - optimalCropPlanning - A function that generates an optimal crop plan.
 * - OptimalCropPlanningInput - The input type for the optimalCropPlanning function.
 * - OptimalCropPlanningOutput - The return type for the optimalCropPlanning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimalCropPlanningInputSchema = z.object({
  historicalData: z
    .string()
    .describe('Historical crop yield data, including crop type, planting date, harvest date, and yield quantity.'),
  marketTrends: z
    .string()
    .describe('Current market trends for various crops, including price fluctuations and demand.'),
  region: z.string().describe('The geographical region where the farm is located.'),
  soilType: z.string().describe('The type of soil available on the farm.'),
  availableResources: z
    .string()
    .describe('Information on available resources such as water, fertilizers, and labor.'),
});
export type OptimalCropPlanningInput = z.infer<typeof OptimalCropPlanningInputSchema>;

const OptimalCropPlanningOutputSchema = z.object({
  cropPlan: z.string().describe('The optimal crop plan for the next planting season.'),
  reasoning: z.string().describe('The AI reasoning behind the crop plan.'),
});
export type OptimalCropPlanningOutput = z.infer<typeof OptimalCropPlanningOutputSchema>;

export async function optimalCropPlanning(input: OptimalCropPlanningInput): Promise<OptimalCropPlanningOutput> {
  return optimalCropPlanningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimalCropPlanningPrompt',
  input: {schema: OptimalCropPlanningInputSchema},
  output: {schema: OptimalCropPlanningOutputSchema},
  prompt: `You are an AI crop planning expert.

  Based on the following data, generate an optimal crop plan for the next planting season. Explain the reasoning behind your plan.

  Historical Data: {{{historicalData}}}
  Market Trends: {{{marketTrends}}}
  Region: {{{region}}}
  Soil Type: {{{soilType}}}
  Available Resources: {{{availableResources}}}

  Format your output as a crop plan followed by a short paragraph describing your reasoning. Focus on crops suitable to the specified region and soil type. Prioritize crops with high market demand and that make efficient use of the available resources.

  Crop Plan:
  <Optimal Crop Plan>

  Reasoning:
  <Reasoning behind the plan>
  `,
});

const optimalCropPlanningFlow = ai.defineFlow(
  {
    name: 'optimalCropPlanningFlow',
    inputSchema: OptimalCropPlanningInputSchema,
    outputSchema: OptimalCropPlanningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
