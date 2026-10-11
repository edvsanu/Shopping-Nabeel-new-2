# Nabeel Shopping — starter ecommerce website

A responsive fashion marketplace starter for Kerala customers. Includes a sample product catalogue, category filters, search, persistent cart, customer checkout form, and an optional Razorpay Checkout integration path.

## Recommended platform and budget

For a ₹0–₹5,000 starting budget, this custom starter can be tested locally and deployed to a Node.js host with a free/low-cost tier if available. A managed platform such as Shopify is simpler but usually costs more after trials/promotions. WooCommerce can be economical but needs WordPress hosting and maintenance. Confirm current pricing before choosing a provider.

## Run locally

1. Install Node.js 18 or newer.
2. Extract this folder.
3. In the folder, run `npm install`.
4. Copy `.env.example` to `.env`.
5. Run `npm start`.
6. Open `http://localhost:3000`.

Without Razorpay keys, the site intentionally stays in demo checkout mode. No money is taken.

## Enable Razorpay test checkout

1. Create/verify a merchant account with Razorpay and check business eligibility for India.
2. From the Razorpay dashboard, generate **test-mode** API keys.
3. Put the key ID and secret into `.env` as `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
4. Restart the server and test a complete payment with Razorpay's test tools.
5. Only switch to live keys after merchant verification, domain/deployment, policy pages, delivery pricing, and end-to-end testing are complete.

Never put `RAZORPAY_KEY_SECRET` in frontend JavaScript or publish `.env`.

## Before accepting real orders/payments

This is a starter, not a production-ready store. It currently uses sample product listings/images/prices, a sample ₹60 delivery charge, and does not persist orders to a database or automatically notify the shop. Before launch:

- Replace sample products, prices, stock, descriptions, and images with supplier-approved real data.
- Confirm supplier/reseller terms, customer-direct shipping, cancellations, returns, and refunds.
- Confirm delivery fees, serviceable PIN codes, order fulfilment and COD availability.
- Add a database and admin/order management, secure payment webhooks, email/SMS notifications, inventory handling, and refund handling.
- Add real business contact details, shipping policy, returns/refunds policy, privacy policy, terms, and required tax/business information.
- Check current Indian tax, consumer-protection, and payment-provider requirements for your business setup, especially if operating from outside India.
- Add spam protection/rate limits and operational monitoring before public launch.

## WhatsApp contact

Set `WHATSAPP_NUMBER` in `.env` if you later add a WhatsApp order/contact link. Use digits with country code and no plus sign.
