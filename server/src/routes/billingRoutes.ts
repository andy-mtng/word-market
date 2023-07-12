// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

import express from "express";
// import { createCheckoutSession } from "../controllers/billingController";
// import requireAuth from "../utils/requireAuth";
const router = express.Router();
const domain = "http://localhost:3000";

router.post("/", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: "price_1NSsyKAFrg5bGStJFQF7tH9N",
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: `${domain}?success=true`,
        cancel_url: `${domain}?canceled=true`
    });

    res.redirect(303, session.url);
});

export default router;
