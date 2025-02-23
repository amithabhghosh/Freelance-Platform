const Stripe = require("stripe");
const Proposal = require("../Models/ProposalModel");
const Job = require("../Models/JobModel");
const Payment = require("../Models/PaymentModel");
require("dotenv").config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhookHandler = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const { proposalId, jobId, freelancerId, clientId } = session.metadata;

        try {
            // Save Payment after confirmation
            const payment = new Payment({
                jobId,
                proposalId,
                freelancerId,
                clientId,
                amount: session.amount_total / 100, // Convert back to dollars
                stripeSessionId: session.id,
                status: "hold"
            });

            await payment.save();

            // Update job status
            await Job.findByIdAndUpdate(jobId, { status: "assigned" });

            // Update proposal status
            await Proposal.findByIdAndUpdate(proposalId, { status: "accepted" });

            console.log(`✅ Payment verified for job ${jobId} and proposal ${proposalId}`);
            res.status(200).json({ received: true });
        } catch (error) {
            console.error("Error updating payment status:", error);
            res.status(500).json({ error: "Payment verification failed" });
        }
    } else {
        res.status(400).json({ error: "Unhandled event type" });
    }
};

module.exports = { stripeWebhookHandler };
