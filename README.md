# AYLKART marketplace starter

Responsive Node.js storefront starter with categories, search, sorting, cart, demo checkout, and a browser-only product manager. It includes sample listings and uses an illustrative design preview at `public/images/aylkart-design-preview.png`.

## Run on Windows
1. Install Node.js 18 or newer.
2. Extract this ZIP.
3. Open Command Prompt in the `aylkart` folder.
4. Run `npm install` (no third-party packages are required) and `npm start`.
5. Visit `http://localhost:3000`.

## Deploy to Render
- Create/connect a Node Web Service to this repository.
- Build command: `npm install`
- Start command: `npm start`
- Render assigns `PORT` automatically.

## Important limitations before public launch
- The admin/product manager is a **prototype** with no authentication. Product changes are saved only in the current browser's localStorage, not shared with other visitors and not stored on the server.
- Cart is stored in the browser. Checkout is demo-only; it does not create a server-side order or collect payment.
- The product catalogue contains sample entries and externally hosted illustrative images. Confirm source prices, stock, supplier permissions, image rights, shipping, taxes, and product details before listing products.
- A production marketplace needs server-side admin authentication, a database, order persistence, inventory management, secure payment-provider integration with server-side verification/webhooks, privacy/terms/returns pages, and operational monitoring.
- Never put payment secret keys in frontend JavaScript or commit `.env` files. `.env.example` contains no secrets.

## Price rule
The product manager calculates `selling price = source price + markup`, with markup defaulting to ₹100. This is a markup, not guaranteed net profit.
