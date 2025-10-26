
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, ArrowRight } from "lucide-react";

const impactData = [
    { metric: "Market Transparency", before: "Low", after: "High" },
    { metric: "Pricing", before: "Unfair", after: "Transparent & Fair" },
    { metric: "Farmer Income", before: "Fluctuating (Avg. INR 45,000)", after: "Stable (Avg. INR 60,000)" },
    { metric: "Middlemen Dependency", before: "80%", after: "20%" },
    { metric: "Digital Inclusion", before: "15%", after: "80%" },
    { metric: "Trust in Trade", before: "Minimal", after: "Strong" },
    { metric: "Time to Payment", before: "Weeks", after: "Instant" },
];

const futureEnhancements = [
    { title: "UPI Smart Payments", description: "Seamless and secure payment integration." },
    { title: "AI Yield Prediction", description: "Forecast crop yields and get pest alerts." },
    { title: "IoT Quality Tracking", description: "Use sensors for real-time turmeric quality analysis." },
    { title: "Multi-Crop Expansion", description: "Expanding our platform to other crops and regions." },
];

export default function ImpactPage() {
  return (
    <div>
      <section className="bg-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Impact & Future</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
            Measuring success by the prosperity of our farmers and planning for a more connected future.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center mb-8">Measurable Outcomes</h2>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%]">Metric</TableHead>
                            <TableHead>Before AgriChain</TableHead>
                            <TableHead className="text-right text-primary">After AgriChain</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {impactData.map((item) => (
                            <TableRow key={item.metric}>
                                <TableCell className="font-medium">{item.metric}</TableCell>
                                <TableCell className="text-muted-foreground">{item.before}</TableCell>
                                <TableCell className="text-right font-semibold text-primary flex items-center justify-end gap-2">
                                    <CheckCircle2 className="h-5 w-5" />
                                    {item.after}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center mb-8">The Road Ahead</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {futureEnhancements.map((item) => (
                    <Card key={item.title}>
                        <CardHeader>
                            <CardTitle className="font-headline">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
