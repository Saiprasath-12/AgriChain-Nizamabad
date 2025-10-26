import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Target, Eye, Handshake } from 'lucide-react';

const aboutImage = placeholderImages.find(p => p.id === 'about-us-market');

export default function AboutPage() {
  return (
    <div>
      <section className="bg-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">About AgriChain</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
            Building a transparent and sustainable agricultural ecosystem for the farmers of Nizamabad.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl font-bold">The Challenge for Turmeric Farmers</h2>
              <p className="mt-4 text-muted-foreground">
                Nizamabad, India’s Turmeric Capital, faces persistent issues that limit farmer prosperity. A lack of real-time market data, heavy dependence on middlemen, and inefficient logistics create an environment of uncertainty. This results in unstable income and poor bargaining power for the hardworking farmers who are the backbone of this industry.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-destructive text-destructive-foreground mr-4 mt-1">
                    &times;
                  </span>
                  <span><strong>Unfair Pricing:</strong> Farmers often sell their produce without knowing the day's actual market rate.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-destructive text-destructive-foreground mr-4 mt-1">
                    &times;
                  </span>
                  <span><strong>Information Gaps:</strong> Limited access to digital tools and data keeps farmers a step behind.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-destructive text-destructive-foreground mr-4 mt-1">
                    &times;
                  </span>
                 <span><strong>High Dependency:</strong> Middlemen often control pricing and logistics, reducing the farmer's share of the profit.</span>
                </li>
              </ul>
            </div>
            <div>
                {aboutImage && (
                    <Image 
                        src={aboutImage.imageUrl} 
                        alt={aboutImage.description} 
                        width={600} 
                        height={400} 
                        className="rounded-lg shadow-xl"
                        data-ai-hint={aboutImage.imageHint}
                    />
                )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
           <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl font-bold">Our Solution: Technology for Empowerment</h2>
                <p className="mt-4 text-muted-foreground">
                AgriChain is a tech-enabled management system offering real-time dashboards, blockchain traceability, and cooperative-based trade systems to empower turmeric farmers.
                </p>
          </div>
           <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
             <div className="p-6">
                <Target className="h-12 w-12 text-primary mx-auto"/>
                <h3 className="font-headline text-xl font-semibold mt-4">Our Mission</h3>
                <p className="mt-2 text-muted-foreground">To create a digital bridge that transforms Nizamabad’s turmeric farmers into smart entrepreneurs thriving in India’s digital agri-economy.</p>
             </div>
             <div className="p-6">
                <Eye className="h-12 w-12 text-primary mx-auto"/>
                <h3 className="font-headline text-xl font-semibold mt-4">Our Vision</h3>
                <p className="mt-2 text-muted-foreground">To build a fair, transparent, and efficient agricultural supply chain, powered by technology and driven by community. </p>
             </div>
             <div className="p-6">
                <Handshake className="h-12 w-12 text-primary mx-auto"/>
                <h3 className="font-headline text-xl font-semibold mt-4">Our Values</h3>
                <p className="mt-2 text-muted-foreground">We are committed to farmer prosperity, technological inclusivity, and unwavering trust through transparent practices.</p>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
