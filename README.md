# Zero Degree - Full Stack E-Commerce Platform

Zero Degree is a modern, responsive, and feature-rich e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). It offers a seamless shopping experience with secure authentication, cart management, and payment integration.

## 🚀 Features

### Frontend
- **React 19 & Vite:** Lightning-fast frontend performance and development experience.
- **Redux Toolkit:** Efficient global state management for cart, user authentication, and products.
- **Tailwind CSS v4:** Modern, utility-first styling with premium responsive design.
- **Dark/Light Mode:** Global theme support for an enhanced user experience.
- **Google OAuth 2.0:** Secure login using Google accounts.
- **Stripe Integration:** Secure and reliable payment processing checkout.
- **Admin Dashboard:** Manage products, orders, and view all users with ease.

### Backend
- **Node.js & Express:** Robust RESTful API architecture.
- **MongoDB & Mongoose:** Scalable NoSQL database with flexible schemas.
- **JWT & Bcryptjs:** Secure user authentication and password hashing.
- **Cloudinary & Multer:** Efficient media and image upload management.
- **Nodemailer:** Automated email notifications (e.g., order confirmations).
- **Payment Gateways:** Integrated with both Stripe and Razorpay for versatile payment options.

## 🛠️ Tech Stack

**Client:** React, React Router DOM, Redux Toolkit, Tailwind CSS, Vite, Axios
**Server:** Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary, Multer
**Integrations:** Google OAuth, Stripe, Razorpay, Nodemailer

## 💻 Running Locally

### Prerequisites
Make sure you have Node.js and MongoDB installed on your locally or use a MongoDB Atlas URI.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/zero-degree.git
cd zero-degree
```

### 2. Install Dependencies

**For Backend:**
```bash
cd backend
npm install
```

**For Frontend:**
```bash
cd frontend
npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend` directory and add the following variables:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
DEFAULT_VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email support via Nodemailer
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

Create a `.env` file in the `frontend` directory for Vite specific variables:
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 4. Start the Application

Start the backend server:
```bash
cd backend
npm run dev
```

Start the frontend development server:
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend strictly runs API requests typically on `http://localhost:5000` via proxy setup.

## 🚀 Deployment

### Deploying Frontend to Netlify
1. Create an account on [Netlify](https://www.netlify.com/).
2. Create a `_redirects` file in the `frontend/public` directory with the following content to handle React Router:
   `/* /index.html 200`
3. Push your code to GitHub (once Git is installed).
4. On Netlify, click **Add new site** -> **Import an existing project** and select your GitHub repository.
5. Configure the build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
6. Add all frontend environment variables from your `.env` file into Netlify's **Environment variables** section.
7. Click **Deploy site**.

*(Note: Ensure your backend is deployed separately on a service like Render, Heroku, or Railway, and update the frontend's API URLs to point to your live backend).*

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is licensed under the ISC License.
