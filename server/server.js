import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import webhookHandler, { clerkWebhooks } from './controllers/webhooks.js'; // ✅ fixed line
import educatorRouter from './Routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';

// Initialize Express
const app = express();

// Connect to DB and Cloudinary
await connectDB();
await connectCloudinary();

// Middlewares
app.use(express.json()); // Body parser
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});
app.post('/clerk', clerkWebhooks); // Clerk webhook
app.post('/api/webhooks', webhookHandler); // Generic webhook
app.use('/api/educator', educatorRouter); // Educator routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
