const Stripe = require("stripe");
const Proposal = require("../Models/ProposalModel");
const Client = require("../Models/ClientModel");
const Job = require("../Models/JobModel");
const Freelancer = require("../Models/FreelancerModel");
const Payment = require("../Models/PaymentModel"); // Ensure Payment Model is imported
require("dotenv").config();

const getCheckOutSession = async (req, res) => {
    try {
        const proposalId = req.params.proposalId;
        const clientId = req.user._id.toString();
        const { freelanceId } = req.body;

        const proposal = await Proposal.findById(proposalId);
        if (!proposal) return res.status(404).json({ success: false, message: "Proposal not found" });

        const client = await Client.findById(clientId);
        const job = await Job.findById(proposal.jobId);
        const freelancer = await Freelancer.findById(freelanceId);

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.FRONT_END_BASEURL}/checkout-success/${proposalId}`,
            cancel_url: `${process.env.FRONT_END_BASEURL}/payment_Cancelled/${proposalId}`,
            customer_email: client.email,
            client_reference_id: clientId,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: proposal.budget * 100,
                        product_data: {
                            name: job.title,
                            description: job.description
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                proposalId: proposalId.toString(),
                jobId: proposal.jobId.toString(),
                freelancerId: freelanceId.toString(),
                clientId: clientId.toString()
            }
        });

        // const payment = new Payment({
        //     jobId: proposal.jobId,
        //     proposalId,
        //     freelancerId:freelanceId,
        //     clientId,
        //     amount: proposal.budget,
        //     stripeSessionId: session.id
        // });

        // await payment.save();
        // console.log("Payment Saved in Database");
        console.log(session)
        res.json({ success: true, session });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getCheckOutSession };
