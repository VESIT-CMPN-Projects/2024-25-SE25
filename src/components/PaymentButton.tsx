import React from 'react';
import { Button } from './ui/button';
import { createPaymentOrder, getRazorpayKey, verifyPayment } from '../services/api';

interface PaymentButtonProps {
  fineId: string;
  amount: number;
  onSuccess: () => void;
  onError: (error: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  fineId,
  amount,
  onSuccess,
  onError,
}) => {
  const handlePayment = async () => {
    try {
      // Create order
      const order = await createPaymentOrder(fineId);

      // Initialize Razorpay options
      const options = {
        key: getRazorpayKey(),
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'Vehicle Fine Management',
        description: `Payment for Fine ID: ${fineId}`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // Verify payment
            await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              fineId,
            });
            onSuccess();
          } catch (error) {
            onError(error);
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#2563eb',
        },
      };

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      Pay Fine
    </Button>
  );
};
