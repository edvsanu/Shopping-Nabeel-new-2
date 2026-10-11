require('dotenv').config();
const express = require('express');
const path = require('path');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const keyId = process.env.RAZORPAY_KEY_ID || '';
const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
const razorpayReady = keyId.startsWith('rzp_') && keySecret.length > 10 && !keyId.includes('REPLACE_ME') && !keySecret.includes('REPLACE_ME');
const razorpay = razorpayReady ? new Razorpay({ key_id: keyId, key_secret: keySecret }) : null;

app.get('/api/config', (_req, res) => {
  res.json({ paymentConfigured: Boolean(razorpay), keyId: razorpay ? keyId : null, whatsappNumber: process.env.WHATSAPP_NUMBER || '' });
});

app.post('/api/create-order', async (req, res) => {
  if (!razorpay) return res.status(503).json({ error: 'Online payment is not configured yet. Add Razorpay test keys to your .env file first.' });
  const amount = Number(req.body?.amount);
  if (!Number.isInteger(amount) || amount < 100 || amount > 10000000) {
    return res.status(400).json({ error: 'Invalid order amount. Amount must be between ₹1 and ₹100,000 in paise.' });
  }
  try {
    const order = await razorpay.orders.create({ amount, currency: 'INR', receipt: `ns_${Date.now()}` });
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId });
  } catch (err) {
    console.error('Razorpay order error:', err.message);
    res.status(502).json({ error: 'Could not create payment order. Check your Razorpay keys and account status.' });
  }
});

app.post('/api/verify-payment', (req, res) => {
  if (!razorpay) return res.status(503).json({ error: 'Online payment is not configured.' });
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) return res.status(400).json({ error: 'Missing payment verification fields.' });
  const expected = crypto.createHmac('sha256', keySecret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
  const a = Buffer.from(expected, 'hex');
  const b = Buffer.from(String(razorpay_signature), 'hex');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(400).json({ verified: false, error: 'Payment signature verification failed.' });
  res.json({ verified: true, paymentId: razorpay_payment_id });
});

app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Nabeel Shopping is running on http://localhost:${port}`));
