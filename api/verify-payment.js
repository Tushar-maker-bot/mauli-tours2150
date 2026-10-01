import crypto from "crypto";

export default async function handler(req, res) {

    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;


        // Check required values
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                error:
                    "Missing payment verification details"
            });
        }


        // Get Razorpay secret from Vercel Environment Variables
        const keySecret =
            process.env.RAZORPAY_KEY_SECRET;


        if (!keySecret) {
            return res.status(500).json({
                success: false,
                error:
                    "Razorpay secret is not configured"
            });
        }


        // Razorpay signature message
        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;


        // Generate expected signature
        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    keySecret
                )
                .update(body)
                .digest("hex");


        // Convert signatures to buffers
        const expectedBuffer =
            Buffer.from(
                expectedSignature,
                "utf8"
            );

        const receivedBuffer =
            Buffer.from(
                razorpay_signature,
                "utf8"
            );


        // Check length before timingSafeEqual
        if (
            expectedBuffer.length !==
            receivedBuffer.length
        ) {

            return res.status(400).json({
                success: false,
                error:
                    "Payment verification failed"
            });

        }


        // Secure signature comparison
        const isValid =
            crypto.timingSafeEqual(
                expectedBuffer,
                receivedBuffer
            );


        // Invalid signature
        if (!isValid) {

            return res.status(400).json({
                success: false,
                error:
                    "Payment verification failed"
            });

        }


        // Payment successfully verified
        return res.status(200).json({

            success: true,

            message:
                "Payment verified successfully",

            paymentId:
                razorpay_payment_id,

            orderId:
                razorpay_order_id

        });


    } catch (error) {

        console.error(
            "Payment verification error:",
            error
        );


        return res.status(500).json({

            success: false,

            error:
                "Internal server error"

        });

    }

}
