const Stripe = require("stripe");
const Proposal = require("../Models/ProposalModel");
const Client = require("../Models/ClientModel");
const Job = require("../Models/JobModel");
const Freelancer = require("../Models/FreelancerModel");
const Payment = require("../Models/PaymentModel");

require("dotenv").config();

const getCheckOutSession = async (req, res) => {
    try {
        const proposalId = req.params.proposalId;
        const clientId = req.user._id.toString();

    
        const proposal = await Proposal.findById(proposalId);
        if (!proposal) return res.status(404).json({ success: false, message: "Proposal not found" });

        const client = await Client.findById(clientId);
        const job = await Job.findById(proposal.jobId);
        const freelanceId = proposal.freelancerId.toString(); 
const jobId=proposal.jobId
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const customer = await stripe.customers.create({
            email: client.email,
            name: client.name,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.FRONT_END_BASEURL}/checkout-success/${proposalId}`,
            cancel_url: `${process.env.FRONT_END_BASEURL}/payment_Cancelled/${proposalId}`,
            customer: customer.id,
            client_reference_id: clientId,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: proposal.budget * 100,
                        product_data: {
                            name: job.title,
                            description: job.description,
                        },
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                proposalId: proposalId.toString(),
                jobId: proposal.jobId.toString(),
                freelancerId: freelanceId.toString(),
                clientId: clientId.toString(),
            },
        });

        
    //     const payment = new Payment({
    //         jobId: proposal.jobId,
    //         proposalId,
    //         freelancerId:freelanceId,
    //         clientId,
    //         amount: proposal.budget, 
    //         stripeSessionId: session.id,
    //         status: "hold",
    //     });

    //     await payment.save();

    // await Job.findByIdAndUpdate(jobId, { status: "assigned" },{new:true});

           
    //         await Proposal.findByIdAndUpdate(proposalId, { status: "accepted",startTime: new Date()},{new:true});

    //          await Proposal.updateMany(
    //             { jobId: jobId, _id: { $ne: proposalId } }, 
    //             { $set: { status: "rejected" } } 
    //         ); 
    

        res.json({ success: true, session });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = { getCheckOutSession };
