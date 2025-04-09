import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Fine, Vehicle } from '../models/index.js';

// Initialize Razorpay with your key_id and key_secret
let razorpay;
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
} catch (error) {
  console.warn('Razorpay initialization failed. Payment features will be disabled.');
}

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { fineId, phoneNumber } = req.body;

    // Get fine details
    const fine = await Fine.findByPk(fineId, {
      include: [
        {
          model: Vehicle,
          attributes: ['registrationNumber', 'ownerName', 'phoneNumber']
        }
      ]
    });

    if (!fine) {
      return res.status(404).json({ message: 'Fine not found' });
    }

    if (fine.status !== 'pending') {
      return res.status(400).json({ message: 'Fine is not pending' });
    }

    // Verify phone number matches the registered vehicle
    if (fine.Vehicle.phoneNumber !== phoneNumber) {
      return res.status(403).json({ message: 'Phone number does not match the registered vehicle' });
    }

    // Create order
    const options = {
      amount: fine.amount * 100, // Convert to paise
      currency: 'INR',
      receipt: fine.id.toString(),
      notes: {
        fineId: fine.id,
        vehicleId: fine.vehicleId
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      redirectUrl: `${process.env.FRONTEND_URL}/payment-success`
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating payment order' });
  }
};

// Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      fineId
    } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Update fine status
    const fine = await Fine.findByPk(fineId);
    if (!fine) {
      return res.status(404).json({ message: 'Fine not found' });
    }

    await fine.update({
      status: 'paid',
      paymentId: razorpay_payment_id,
      paymentDate: new Date()
    });

    res.json({
      message: 'Payment successful',
      redirectUrl: `${process.env.FRONTEND_URL}/payment-success`
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
};
