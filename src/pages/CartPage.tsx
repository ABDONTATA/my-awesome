import React from "react";
import { useCart } from "../Contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CartPage: React.FC = () => {
  const {
    items,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderCartItemImage = (item: CartItem) => (
    <div className="w-20 h-20 bg-gray-800 rounded flex items-center justify-center text-gray-400 overflow-hidden">
      {item.image ? (
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-sm text-gray-500">No Image</span>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 text-gray-200 font-sans bg-gray-900 min-h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-semibold mb-8 border-b border-gray-700 pb-4">
        🛒 Your Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-gray-800 rounded-lg mt-6 shadow-inner">
          <p className="text-lg text-gray-400">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="mb-10 rounded-lg overflow-hidden divide-y divide-gray-700 shadow-md bg-gray-800">
            {items.map((item) => (
              <div
                key={item.id}
                className="px-6 py-5 flex justify-between items-center"
              >
                <div className="flex items-center gap-6">
                  {renderCartItemImage(item)}
                  <div>
                    <h3 className="text-lg font-medium text-white">{item.name}</h3>
                    <p className="text-gray-400 text-sm">${item.price.toFixed(2)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity === 1}
                        className="px-2 py-1 border border-gray-600 text-gray-300 rounded hover:bg-gray-700 disabled:opacity-40"
                      >
                        −
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 border border-gray-600 text-gray-300 rounded hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                    <p className="mt-2 text-white font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 border border-red-500 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg text-white font-semibold">Order Summary</h3>
              <h3 className="text-xl text-white font-bold">${total.toFixed(2)}</h3>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={clearCart}
                className="text-red-400 border border-red-500 px-5 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
              >
                Clear Cart
              </button>
              <Link
                to="/payment"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
