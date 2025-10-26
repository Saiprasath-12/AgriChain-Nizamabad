import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div>
        <section className="bg-secondary py-16 lg:py-24">
            <div className="container mx-auto px-4 text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Join Us or Get in Touch</h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
                    Whether you're a farmer looking to join our cooperative or a buyer interested in fair-trade turmeric, we'd love to hear from you.
                </p>
            </div>
        </section>

        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Farmer Registration</CardTitle>
                            <CardDescription>Fill out this form to get started with AgriChain.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4" suppressHydrationWarning>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="Enter your full name" suppressHydrationWarning />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" placeholder="Enter your phone number" suppressHydrationWarning />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="village">Village/Town</Label>
                                    <Input id="village" placeholder="Enter your village or town" suppressHydrationWarning />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message (Optional)</Label>
                                    <Textarea id="message" placeholder="Any questions you have..." suppressHydrationWarning />
                                </div>
                                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" suppressHydrationWarning>Submit Registration</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                     <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
                     <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold">Cooperative Address</h3>
                            <p className="text-muted-foreground">AgriChain Cooperative Society, Near Market Yard, Nizamabad, Telangana, 503001</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <Phone className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold">WhatsApp & Phone</h3>
                            <p className="text-muted-foreground">+91 98765 43210</p>
                        </div>
                     </div>
                      <div className="flex items-start gap-4">
                        <Mail className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <p className="text-muted-foreground">contact@agrichain.dev</p>
                        </div>
                     </div>
                </div>
            </div>
        </section>
    </div>
  )
}
