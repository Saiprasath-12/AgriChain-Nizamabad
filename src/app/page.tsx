import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  TrendingUp,
  Warehouse,
  ShieldCheck,
  BarChart,
  Network,
  Mic,
  Tractor,
  Lightbulb,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderImages } from '@/lib/placeholder-images';

const impactStats = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    value: '10,000+',
    label: 'Farmers Impacted',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    value: '25%',
    label: 'Avg. Income Rise',
  },
  {
    icon: <Warehouse className="h-8 w-8 text-primary" />,
    value: '50+',
    label: 'Markets Connected',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    value: '100%',
    label: 'Transparent Trades',
  },
];

const features = [
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: 'Real-Time Market Dashboard',
    description: 'Live mandi prices and AI-powered forecasts for turmeric to make informed selling decisions.',
  },
  {
    icon: <Network className="h-10 w-10 text-primary" />,
    title: 'Blockchain Fair Trade',
    description: 'Secure, transparent transactions ensuring fair payments and traceability from farm to buyer.',
  },
  {
    icon: <Mic className="h-10 w-10 text-primary" />,
    title: 'Voice & Vernacular Interface',
    description: 'Easy-to-use voice commands in Telugu and Hindi, making technology accessible to all.',
  },
  {
    icon: <Tractor className="h-10 w-10 text-primary" />,
    title: 'Smart Logistics',
    description: 'Optimize procurement and track your produce delivery in real-time.',
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: 'Data-Driven Crop Planning',
    description: 'Get AI-powered recommendations for optimal crop planning based on market data.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Digital Cooperative Hub',
    description: 'Connect directly with buyers and other farmers, fostering a strong community.',
  },
];

const testimonials = [
  {
    name: 'Ramesh Kumar',
    location: 'Nizamabad',
    image: placeholderImages.find(p => p.id === 'farmer-testimonial-1')?.imageUrl,
    imageHint: placeholderImages.find(p => p.id === 'farmer-testimonial-1')?.imageHint,
    quote:
      'AgriChain changed my life. I get fair prices for my turmeric now, and the voice feature is so easy to use. My income has increased by 30%!',
  },
  {
    name: 'Sunita Bai',
    location: 'Armoor',
    image: placeholderImages.find(p => p.id === 'farmer-testimonial-2')?.imageUrl,
    imageHint: placeholderImages.find(p => p.id === 'farmer-testimonial-2')?.imageHint,
    quote:
      'The blockchain system gives me peace of mind. I know the payment is secure and transparent. It feels good to be in control.',
  },
  {
    name: 'Anil Yadav',
    location: 'Bodhan',
    image: placeholderImages.find(p => p.id === 'farmer-testimonial-3')?.imageUrl,
    imageHint: placeholderImages.find(p => p.id === 'farmer-testimonial-3')?.imageHint,
    quote:
      "Planning my next crop is no longer guesswork. The AI suggestions are accurate and have helped me maximize my yield and profits.",
  },
];

const heroImage = placeholderImages.find(p => p.id === 'hero-turmeric-field');

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-20 max-w-4xl px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">
            Empowering Nizamabad’s Turmeric Farmers with Market Transparency
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Get fair prices, transparent trades, and data-driven insights. Join the digital revolution in agriculture.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">Join Cooperative</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section id="impact" className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                {stat.icon}
                <p className="text-3xl lg:text-4xl font-bold font-headline mt-2 text-primary">
                  {stat.value}
                </p>
                <p className="text-sm lg:text-base text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">A New Era of Farming</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              AgriChain provides a complete ecosystem of tools designed for the modern farmer.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-accent">
                <CardHeader>
                  <div className="mx-auto bg-secondary rounded-full p-4 w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Voices from the Field</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Hear what our farmer partners have to say about their journey with AgriChain.
            </p>
          </div>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto mt-12"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardContent className="flex flex-col items-center text-center p-6">
                        <Avatar className="w-20 h-20 mb-4 border-2 border-primary">
                           {testimonial.image && <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.imageHint}/>}
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                        <p className="font-bold font-headline mt-4">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Transform Your Farming?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of farmers who are getting better prices and building a secure future with AgriChain.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">Get Started Today</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
