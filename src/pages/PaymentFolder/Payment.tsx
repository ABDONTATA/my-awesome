import { useEffect, useState } from "react";
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
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { CheckCircle, CreditCard, ShoppingBag } from "lucide-react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useAuth } from "@/Contexts/AuthProvider";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/Contexts/CartContext";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      fontFamily: "sans-serif",
      "::placeholder": { color: "#a0aec0" },
    },
    invalid: { color: "#fa755a" },
  },
};

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { accessToken, isAuthenticated } = useAuth()!;

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [cardName, setCardName] = useState("");

  const { getCartProductsList } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchCart = async () => {
        const data = await getCartProductsList();
        setCartItems(data);
      };
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  const subtotal = (cartItems ?? []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded.");
      return;
    }

    if (
      !street.trim() ||
      !city.trim() ||
      !country.trim() ||
      !postalCode.trim() ||
      !state.trim() ||
      !cardName.trim()
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card details not found.");
      return;
    }

    setIsProcessing(true);
    let addressId = null;
    let orderId: number = null;

    try {
      const response = await fetch(
        "http://localhost:8080/api/payment/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            amount: Math.round(total * 100),
            currency: "usd",
          }),
        }
      );
      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardName,
              address: {
                line1: street,
                city: city,
                state: state,
                country: country,
                postal_code: postalCode,
              },
            },
          },
        }
      );

      if (error) {
        toast.error(`Payment failed: ${error.message}`);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        /// request dyal l address
        try {
          const response = await fetch(
            "http://localhost:8080/api/address/add",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              credentials: "include",
              body: JSON.stringify({
                street,
                city,
                state,
                country,
                postalCode,
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            addressId = data;
          } else {
            toast.error("Failed to save address.");
            return;
          }
        } catch (error: any) {
          console.log(error);
        }

        ///// request dyal l'order
        try {
          const response = await fetch("http://localhost:8080/api/order/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
            body: JSON.stringify({
              amount: Math.round(total * 100),
              currency: "usd",
              shippingMethodId: 1,
              addressId: addressId,
              items: cartItems,
            }),
          });

          orderId = await response.json();
        } catch (error: any) {
          console.log(error);
        }
        /// request dyal l payment
        try {
          const response = await fetch(
            "http://localhost:8080/api/payment/add",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              credentials: "include",
              body: JSON.stringify({
                paymentIntentId: paymentIntent.id,
                orderId: orderId,
              }),
            }
          );
        } catch (error: any) {
          console.log(error);
        }

        toast.success("Payment successful!");
        navigate(`/payment-success/${orderId}`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
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
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <RadioGroupItem
                            value="credit-card"
                            id="credit-card"
                          />
                          <Label
                            htmlFor="credit-card"
                            className="flex-1 cursor-pointer flex items-center"
                          >
                            <CreditCard className="h-5 w-5 mr-2" />
                            Credit / Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-4 rounded-md opacity-50 cursor-not-allowed">
                          <RadioGroupItem value="paypal" id="paypal" disabled />
                          <Label
                            htmlFor="paypal"
                            className="flex-1 cursor-not-allowed"
                          >
                            PayPal (Coming Soon)
                          </Label>
                        </div>
                      </RadioGroup>

                      {paymentMethod === "credit-card" && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="card-name">Cardholder Name</Label>
                            <Input
                              id="card-name"
                              placeholder="Name on card"
                              required
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                            />
                          </div>

                          <div>
                            <Label>Card Details</Label>
                            <div className="p-3 border rounded-md bg-white">
                              <CardElement options={CARD_ELEMENT_OPTIONS} />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t mt-6 space-y-4">
                        <h3 className="text-lg font-medium">Billing Address</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Street</Label>
                            <Input
                              required
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>City</Label>
                            <Input
                              required
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <Label>State</Label>
                            <Input
                              required
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Postal Code</Label>
                            <Input
                              required
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Country</Label>
                            <Input
                              required
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full mt-6"
                      >
                        {isProcessing ? "Processing..." : "Pay Now"}
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
                      <div
                        key={item.productId}
                        className="flex justify-between"
                      >
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

                <div className="mt-4 bg-secondary/10 p-4 rounded text-sm text-muted-foreground">
                  <p>
                    By clicking &quot;Complete Payment&quot; you agree to our{" "}
                    <a href="/terms" className="underline hover:text-primary">
                      terms of service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="underline hover:text-primary">
                      privacy policy
                    </a>
                    .
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
