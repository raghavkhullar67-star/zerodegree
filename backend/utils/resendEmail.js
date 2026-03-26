import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

export const sendAdminOrderNotification = async (order, user) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is missing in environment variables');
    return;
  }
  const resend = new Resend(apiKey);
  const adminEmail = process.env.ADMIN_EMAIL || 'raghavkhullar67@gmail.com';

  const orderItemsHtml = order.orderItems.map(item => `
    <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #edf2f7;">
      <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; margin-right: 15px;">
      <div style="flex: 1;">
        <h4 style="margin: 0; font-size: 14px; color: #2d3748;">${item.title}</h4>
        <p style="margin: 0; font-size: 12px; color: #718096;">Qty: ${item.quantity} × ₹${item.price}</p>
      </div>
      <div style="font-weight: 600; color: #2d3748;">₹${item.quantity * item.price}</div>
    </div>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f7fafc; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; }
          .header { background: #1a202c; color: #ffffff; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; letter-spacing: 1px; }
          .content { padding: 30px; }
          .order-status { display: inline-block; padding: 4px 12px; border-radius: 20px; background: #ebf8ff; color: #2b6cb0; font-size: 12px; font-weight: 600; margin-bottom: 20px; }
          .section-title { font-size: 16px; font-weight: 700; color: #4a5568; text-transform: uppercase; margin-bottom: 15px; border-bottom: 2px solid #edf2f7; padding-bottom: 8px; }
          .address-box { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #edf2f7; font-size: 14px; }
          .total-section { margin-top: 25px; padding-top: 20px; border-top: 2px solid #edf2f7; }
          .total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
          .grand-total { font-size: 20px; font-weight: 800; color: #2d3748; }
          .footer { background: #f7fafc; padding: 20px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ZERO DEGREE</h1>
            <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">New Order Received! 🚀</p>
          </div>
          
          <div class="content">
            <div class="order-status">Order ID: #${order._id.toString().slice(-8).toUpperCase()}</div>
            
            <p style="font-size: 16px; margin-bottom: 25px;">Hello Admin, a new order has been placed by <strong>${user.name}</strong> (${user.email}).</p>
            
            <div class="section-title">Order Summary</div>
            ${orderItemsHtml}
            
            <div class="total-section">
              <div class="total-row">
                <span style="color: #718096;">Payment Method:</span>
                <span style="font-weight: 600;">${order.paymentMethod}</span>
              </div>
              <div class="total-row" style="margin-top: 15px;">
                <span style="font-size: 18px; font-weight: 600; color: #4a5568;">Total Revenue:</span>
                <span class="grand-total">₹${order.totalPrice}</span>
              </div>
            </div>

            <div style="margin-top: 35px;">
              <div class="section-title">Shipping Details</div>
              <div class="address-box">
                <strong>${order.shippingAddress.fullName}</strong><br>
                ${order.shippingAddress.houseNo}, ${order.shippingAddress.city}<br>
                ${order.shippingAddress.state} - ${order.shippingAddress.pincode}<br>
                Phone: ${order.shippingAddress.phone}
              </div>
            </div>

            <a href="https://newzerodegree.netlify.app/admin/orders/${order._id}" style="display: block; width: 100%; text-align: center; background: #3182ce; color: white; padding: 14px 0; border-radius: 8px; text-decoration: none; font-weight: 700; margin-top: 30px; box-sizing: border-box;">View Order in Dashboard</a>
          </div>
          
          <div class="footer">
            &copy; ${new Date().getFullYear()} Zero Degree. All rights reserved.<br>
            Managed via Resend API
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const data = await resend.emails.send({
      from: 'Zero Degree <onboarding@resend.dev>', // Resend verified domain should be used in production
      to: adminEmail,
      subject: `New Hot Order! 🔥 - #${order._id.toString().slice(-8).toUpperCase()} - ₹${order.totalPrice}`,
      html: html,
    });
    console.log('Admin notification sent:', data);
    return data;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
  }
};
