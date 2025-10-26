
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Box, Hash, Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// A simple (and insecure) hash function for demonstration purposes
const simpleHash = async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const formSchema = z.object({
  farmerName: z.string().min(1, 'Farmer name is required.'),
  buyerName: z.string().min(1, 'Buyer name is required.'),
  quantity: z.coerce.number().positive('Quantity must be a positive number.'),
  price: z.coerce.number().positive('Price must be a positive number.'),
});

type FormValues = z.infer<typeof formSchema>;

type Block = {
  version: number;
  timestamp: string;
  data: FormValues;
  previousHash: string;
  hash: string;
};

export default function BlockchainLogCreator() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmerName: 'Ramesh K.',
      buyerName: 'Local Spices Inc.',
      quantity: 100,
      price: 8500,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
        const previousHash = blocks.length > 0 ? blocks[blocks.length - 1].hash : '0'.repeat(64);
        const blockData = {
            version: blocks.length + 1,
            timestamp: new Date().toISOString(),
            data: values,
            previousHash,
        };
        const hash = await simpleHash(JSON.stringify(blockData));
        
        const newBlock: Block = { ...blockData, hash };

        setBlocks(prevBlocks => [...prevBlocks, newBlock]);
        toast({
            title: 'Block Created!',
            description: `Block #${newBlock.version} has been added to the chain.`,
        });
        form.reset({
            farmerName: '',
            buyerName: '',
            quantity: 0,
            price: 0,
        });
    } catch (error) {
        console.error("Failed to create block", error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to create a new block.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Plus />Create New Transaction Block</CardTitle>
            <CardDescription>Enter the transaction details to create a new block and add it to the blockchain.</CardDescription>
            </CardHeader>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="farmerName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Farmer Name</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="buyerName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Buyer Name</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity (quintals)</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price (INR/quintal)</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding to Chain...</> : 'Create Block'}
                </Button>
                </CardFooter>
            </form>
            </Form>
        </Card>
      
      <div className="space-y-4">
        <h3 className="font-headline text-xl font-bold text-center">Live Blockchain Ledger</h3>
        {blocks.length === 0 ? (
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg h-full flex items-center justify-center">
            <p>Your created transaction blocks will appear here.</p>
          </div>
        ) : (
            <div className="space-y-4 h-[500px] overflow-y-auto pr-4">
                {[...blocks].reverse().map((block) => (
                    <Card key={block.hash} className="bg-background/70">
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center justify-between text-lg">
                                <span><Box className="inline mr-2" />Block #{block.version}</span>
                                <span className="text-sm font-mono text-muted-foreground">{new Date(block.timestamp).toLocaleTimeString()}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm font-mono break-all">
                            <div>
                                <p className="font-semibold text-muted-foreground text-xs">Data</p>
                                <p className="text-xs">{`Farmer: ${block.data.farmerName}, Buyer: ${block.data.buyerName}, Qty: ${block.data.quantity}q, Price: INR ${block.data.price}`}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-muted-foreground text-xs flex items-center gap-1"><Hash className="h-3 w-3" />Hash</p>
                                <p className="text-primary text-xs">{block.hash}</p>
                            </div>
                             <div>
                                <p className="font-semibold text-muted-foreground text-xs flex items-center gap-1"><Hash className="h-3 w-3" />Previous Hash</p>
                                <p className="text-muted-foreground text-xs">{block.previousHash}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
