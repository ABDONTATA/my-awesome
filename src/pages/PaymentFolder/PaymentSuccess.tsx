import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Package, ShoppingBag } from "lucide-react";
import { useAuth } from "@/Contexts/AuthProvider";

interface OrderItem {
  id: number;
  productName: string;
  price: number;
}

interface OrderData {
  orderNumber: string;
  createdAt: string;
  userEmail: string;
  totalAmount: number;
  paymentMethod: string;
  shippingMethod: string;
  items: OrderItem[];
}

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState<OrderData>();
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth()!;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/order/get/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch order details");

        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="text-center pt-32">Loading...</div>;
  }

  if (!orderData) {
    return <div className="text-center pt-32">Order not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-4 mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Payment Successful!
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-8">
              <CardHeader className="bg-secondary/30">
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                      Order Number
                    </h3>
                    <p className="font-mono">{orderData.orderNumber}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                      Date
                    </h3>
                    <p>{new Date(orderData.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                      Email
                    </h3>
                    <p>{orderData.userEmail}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                      Total
                    </h3>
                    <p>${orderData.totalAmount}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                      Payment Method
                    </h3>
                    <p>{orderData.paymentMethod}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                      Shipping
                    </h3>
                    <p>{orderData.shippingMethod}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-4">
                    {orderData.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-secondary/50 rounded flex items-center justify-center">
                            <ShoppingBag className="h-5 w-5" />
                          </div>
                          <span>{item.productName}</span>
                        </div>
                        <div>${item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 bg-secondary/30 p-6">
                <div className="text-sm text-center w-full">
                  <p>
                    A confirmation email has been sent to{" "}
                    <span className="font-semibold">{orderData.userEmail}</span>
                  </p>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Button asChild className="btn-luxury">
              <Link to="/">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/settings">View Order History</Link>
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PaymentSuccess;
