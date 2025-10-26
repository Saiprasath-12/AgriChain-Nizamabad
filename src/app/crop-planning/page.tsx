import PlanningForm from "./components/planning-form";

export default function CropPlanningPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight font-headline">AI-Powered Crop Planning</h1>
          <p className="text-muted-foreground">
            Get an optimal crop plan for the next planting season. Our AI analyzes historical data, market trends, and your farm's conditions to provide the best recommendations.
          </p>
        </div>
        <div className="mt-8">
          <PlanningForm />
        </div>
      </div>
    </div>
  );
}
