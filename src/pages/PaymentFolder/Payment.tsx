import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, CreditCard, CheckCircle } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);

  const cartItems = [
    { id: 1, name: "Diamond Studded Wristwatch", price: 4599, quantity: 1 },
    { id: 2, name: "Leather Wallet", price: 299, quantity: 1 },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Payment successful!", {
        description: "Your order has been placed successfully.",
      });

      // Redirect to a success page
      navigate("/payment-success");
    } catch (error) {
      toast.error("Payment failed", {
        description:
          "There was an error processing your payment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>
                      Select your preferred payment method
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="space-y-4 mb-6"
                      >
                        <div className="flex items-center space-x-2 rounded-lg border p-4">
                          <RadioGroupItem
                            value="credit-card"
                            id="credit-card"
                          />
                          <Label
                            htmlFor="credit-card"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 mr-2" />
                              <span>Credit / Debit Card</span>
                            </div>
                          </Label>
                          <div className="flex space-x-1">
                            <div className="w-10 h-6 bg-blue-600 rounded"></div>
                            <div className="w-10 h-6 bg-red-500 rounded"></div>
                            <div className="w-10 h-6 bg-gray-800 rounded"></div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 rounded-lg border p-4">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label
                            htmlFor="paypal"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center">
                              <div className="mr-2 text-blue-600 font-bold">
                                PayPal
                              </div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>

                      {paymentMethod === "credit-card" && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-name">Cardholder Name</Label>
                            <Input
                              id="card-name"
                              placeholder="Name as it appears on card"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiration Date</Label>
                              <Input id="expiry" placeholder="MM/YY" required />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" required />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">
                          Billing Address
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="first-name">First Name</Label>
                              <Input id="first-name" required />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="last-name">Last Name</Label>
                              <Input id="last-name" required />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="address">Street Address</Label>
                            <Input id="address" required />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input id="city" required />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="state">State</Label>
                              <Input id="state" required />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="zip">ZIP Code</Label>
                              <Input id="zip" required />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="btn-luxury mt-8 w-full"
                        disabled={isProcessing}
                      >
                        {isProcessing
                          ? "Processing..."
                          : `Complete Payment $${total.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}`}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p>
                            {item.name}{" "}
                            <span className="text-sm text-luxury-gray">
                              x{item.quantity}
                            </span>
                          </p>
                        </div>
                        <div>${item.price.toLocaleString()}</div>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-500">Free</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>
                        $
                        {tax.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>
                        $
                        {total.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-secondary/30 p-4 flex items-center justify-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Secure checkout powered by Stripe</span>
                  </CardFooter>
                </Card>

                <div className="mt-4 bg-secondary/30 p-4 rounded-lg text-sm">
                  <p className="mb-2">
                    <span className="font-medium">Free Shipping</span> on all
                    orders over $500
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Free Returns</span> within 30
                    days
                  </p>
                  <p>
                    <span className="font-medium">Secure Payment</span> with
                    256-bit SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Payment;
