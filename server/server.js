import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import webhookHandler, { clerkWebhooks } from './controllers/webhooks.js';
import educatorRouter from './Routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import bodyParser from 'body-parser'; // ✅ added for raw parsing

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Apply raw body middleware ONLY for Clerk webhook
app.post('/clerk', bodyParser.raw({ type: '*/*' }), clerkWebhooks); // ✅ must come BEFORE express.json

// General Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => {
  res.send('API Working');
});

app.post('/api/webhooks', webhookHandler); // Stripe or other webhooks
app.use('/api/educator', educatorRouter);  // Educator-related routes

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
