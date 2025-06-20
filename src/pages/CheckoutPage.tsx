import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';

import AppHeader from '@/components/layout/AppHeader';
import StandardFooter from '@/components/layout/StandardFooter';
import OrderProgressIndicator, { OrderStatus } from '@/components/OrderProgressIndicator';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner'; // Using sonner for toasts as per App.tsx

const addressSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  addressLine1: z.string().min(5, { message: "Address line 1 must be at least 5 characters." }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  postalCode: z.string().regex(/^\d{5,6}$/, { message: "Invalid postal code." }), // Common 5 or 6 digit postal codes
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
});

const paymentSchema = z.object({
  paymentMethod: z.enum(['cod', 'card', 'upi'], {
    required_error: "You need to select a payment type.",
  }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(), // Format MM/YY
  cardCVC: z.string().optional(), // 3 or 4 digits
  upiId: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === 'card') {
    if (!data.cardNumber || !/^\d{13,19}$/.test(data.cardNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cardNumber'],
        message: 'Invalid card number.',
      });
    }
    if (!data.cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cardExpiry'],
        message: 'Invalid expiry date (MM/YY).',
      });
    }
    if (!data.cardCVC || !/^\d{3,4}$/.test(data.cardCVC)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cardCVC'],
        message: 'Invalid CVC.',
      });
    }
  }
  if (data.paymentMethod === 'upi') {
    if (!data.upiId || !/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(data.upiId)) { // Basic UPI ID regex
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['upiId'],
        message: 'Invalid UPI ID.',
      });
    }
  }
});

const checkoutFormSchema = addressSchema.merge(paymentSchema);

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Placeholder cart items and totals
const placeholderCartItems = [
  { id: '1', name: 'Organic Bananas (Bunch)', price: 2.50, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60' },
  { id: '2', name: 'Almond Milk (1L)', price: 4.75, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1620189507195-68309c04c4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWxtb25kJTIwbWlsa3xlbnwwfHwwfHx8&auto=format&fit=crop&w=100&q=60' },
  { id: '3', name: 'Whole Wheat Bread', price: 3.20, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hvbGUlMjB3aGVhdCUyMGJyZWFkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60' },
];

const deliveryFee = 5.00;
const subtotal = placeholderCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const total = subtotal + deliveryFee;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
      paymentMethod: undefined, // To make radio group required
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
      upiId: "",
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  async function onSubmit(data: CheckoutFormValues) {
    console.log('Checkout form submitted:', data);
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)), // Simulate API call
      {
        loading: 'Processing your order...',
        success: () => {
          // In a real app, navigate to an order confirmation / status page
          // e.g., navigate(`/order-status/${orderId}`);
          // For now, redirect to home or show success here.
          navigate('/'); // Navigate to home page after successful order
          return `Order placed successfully! Your order ID is #${Math.floor(Math.random() * 100000)}.`;
        },
        error: 'Payment failed. Please try again.',
      }
    );
  }
  
  React.useEffect(() => {
    console.log('CheckoutPage loaded');
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppHeader />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Checkout</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Complete your order by providing your delivery and payment details.
          </p>

          {/* Order Progress Indicator - as per layout_info */}
          <div className="mb-10 max-w-3xl mx-auto">
            <OrderProgressIndicator currentStatus={'Order Placed' as OrderStatus} />
             {/* 'Order Placed' implies this is the final confirmation step */}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Left Column: Address & Payment */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Delivery Address</CardTitle>
                    <CardDescription>Enter where you'd like your order delivered.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="addressLine1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 1</FormLabel>
                          <FormControl><Textarea placeholder="123 Main St, Apartment 4B" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="addressLine2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 2 (Optional)</FormLabel>
                          <FormControl><Input placeholder="Near City Park" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl><Input placeholder="Springfield" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl><Input placeholder="12345" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl><Input type="tel" placeholder="+1 (555) 123-4567" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Payment Method</CardTitle>
                    <CardDescription>Choose your preferred payment method.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="cod" /></FormControl>
                                <FormLabel className="font-normal">Cash on Delivery (COD)</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="card" /></FormControl>
                                <FormLabel className="font-normal">Credit/Debit Card</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="upi" /></FormControl>
                                <FormLabel className="font-normal">UPI</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {paymentMethod === 'card' && (
                      <div className="mt-4 space-y-4 border-t pt-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="cardExpiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date (MM/YY)</FormLabel>
                                <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cardCVC"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl><Input placeholder="•••" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    {paymentMethod === 'upi' && (
                      <div className="mt-4 border-t pt-4">
                        <FormField
                          control={form.control}
                          name="upiId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>UPI ID</FormLabel>
                              <FormControl><Input placeholder="yourname@bank" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-24"> {/* Sticky for longer forms on large screens */}
                  <CardHeader>
                    <CardTitle className="text-xl">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {placeholderCartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center">
                                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3"/>
                                <div>
                                    <p className="font-medium text-gray-700 dark:text-gray-200">{item.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-medium text-gray-800 dark:text-gray-100">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        ))}
                    </div>
                    <Separator />
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Delivery Fee</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100">${deliveryFee.toFixed(2)}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-800 dark:text-gray-100">Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-3">
                    <Button type="submit" className="w-full text-lg py-3 h-auto" size="lg" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Processing..." : "Place Order"}
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/cart">Back to Cart</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <StandardFooter />
    </div>
  );
};

export default CheckoutPage;