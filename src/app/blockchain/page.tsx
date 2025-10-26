

import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Fingerprint, Award } from 'lucide-react';
import BlockchainLogCreator from './components/blockchain-log-creator';

const blockchainImage = placeholderImages.find(p => p.id === 'blockchain-visualization');

export default function BlockchainPage() {
  return (
    <div>
        <section className="bg-secondary py-16 lg:py-24">
            <div className="container mx-auto px-4 text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Trust through Technology</h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
                    Learn how our blockchain-based system creates a fair, secure, and transparent trading environment for everyone.
                </p>
            </div>
        </section>

        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="font-headline text-3xl font-bold">What is Blockchain and Why Does It Matter?</h2>
                        <p className="mt-4 text-muted-foreground">
                            Blockchain is like a digital ledger that is shared among many computers. Once a transaction is recorded, it cannot be altered or deleted. This immutability is the key to building trust.
                        </p>
                        <ul className="mt-6 space-y-4">
                            <li className="flex items-start">
                                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground mr-4 mt-1">✓</span>
                                <span><strong>Transparency:</strong> All parties can view the transaction details, ensuring no hidden fees or unfair practices.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground mr-4 mt-1">✓</span>
                                <span><strong>Security:</strong> The decentralized nature of blockchain makes it extremely secure against fraud and tampering.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground mr-4 mt-1">✓</span>
                                <span><strong>Fair Payments:</strong> Smart contracts can automate payments, ensuring farmers are paid instantly and accurately.</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {blockchainImage && (
                            <Image 
                                src={blockchainImage.imageUrl} 
                                alt={blockchainImage.description} 
                                width={600} 
                                height={400} 
                                className="rounded-lg shadow-xl"
                                data-ai-hint={blockchainImage.imageHint}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 lg:py-24 bg-secondary">
            <div className="container mx-auto px-4">
                <h2 className="font-headline text-3xl font-bold text-center mb-12">Simulate a Transaction on AgriChain</h2>
                <BlockchainLogCreator />
            </div>
        </section>
    </div>
  )
}
