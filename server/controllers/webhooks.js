import { Webhook } from "svix";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

// 📨 Named export: the actual Clerk webhook logic
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook signature
    whook.verify(
      JSON.stringify(req.body),
      {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      }
    );

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };

        await User.create(userData);
        return res.json({ success: true });
      }

      case "user.updated": {
        const updateData = {
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, updateData);
        return res.json({ success: true });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({ success: true });
      }

      default:
        return res.status(400).json({
          success: false,
          message: "Unhandled event type",
        });
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Default export (used if you do: import webhookHandler from './webhooks.js')
export default function webhookHandler(req, res) {
  res.status(200).send("Webhook received");
}
