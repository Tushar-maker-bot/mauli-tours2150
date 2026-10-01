import crypto from "crypto";

export default async function handler(req, res) {

    // =========================
    // ONLY ALLOW POST
    // =========================

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            error: "Method not allowed"
        });
    }


    try {

        // =========================
        // GET PAYMENT + BOOKING DATA
        // =========================

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,

            tourName,
            tourDate,
            seats,
            pickupLocation,

            customerName,
            customerEmail,
            customerPhone,

            travellers,
            amount
        } = req.body;


        // =========================
        // CHECK PAYMENT DETAILS
        // =========================

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


        // =========================
        // GET RAZORPAY SECRET
        // =========================

        const keySecret =
            process.env.RAZORPAY_KEY_SECRET;


        if (!keySecret) {

            return res.status(500).json({
                success: false,
                error:
                    "Razorpay secret is not configured"
            });

        }


        // =========================
        // CREATE SIGNATURE
        // =========================

        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;


        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    keySecret
                )
                .update(body)
                .digest("hex");


        // =========================
        // SECURE SIGNATURE CHECK
        // =========================

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


        const isValid =
            crypto.timingSafeEqual(
                expectedBuffer,
                receivedBuffer
            );


        if (!isValid) {

            return res.status(400).json({
                success: false,
                error:
                    "Payment verification failed"
            });

        }


        // =========================
        // CREATE BOOKING ID
        // =========================

        let tourCode = "TOUR";

        if (
            typeof tourName === "string"
        ) {

            const name =
                tourName.toLowerCase();

            if (
                name.includes("shivneri")
            ) {
                tourCode = "SHIV";
            }

            else if (
                name.includes("raigad")
            ) {
                tourCode = "RAI";
            }

            else if (
                name.includes("lonavala")
            ) {
                tourCode = "LON";
            }

            else if (
                name.includes("mahabaleshwar")
            ) {
                tourCode = "MAH";
            }

            else if (
                name.includes("shirdi")
            ) {
                tourCode = "SHI";
            }

            else if (
                name.includes("matheran")
            ) {
                tourCode = "MAT";
            }

            else if (
                name.includes("goa")
            ) {
                tourCode = "GOA";
            }

        }


        // =========================
        // GET YEAR + MONTH
        // =========================

        let bookingMonth =
            "000000";

        if (
            typeof tourDate === "string"
        ) {

            const dateMatch =
                tourDate.match(
                    /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/
                );

            if (dateMatch) {

                const monthName =
                    dateMatch[2].toLowerCase();

                const year =
                    dateMatch[3];

                const months = {
                    january: "01",
                    february: "02",
                    march: "03",
                    april: "04",
                    may: "05",
                    june: "06",
                    july: "07",
                    august: "08",
                    september: "09",
                    october: "10",
                    november: "11",
                    december: "12"
                };

                const month =
                    months[monthName] || "00";

                bookingMonth =
                    `${year}${month}`;

            }

        }


        // =========================
        // UNIQUE BOOKING NUMBER
        // =========================

        /*
         * Razorpay payment ID contains
         * a unique identifier.
         *
         * We use the last 4 characters
         * to create a unique booking
         * reference for now.
         */

        const uniquePart =
            razorpay_payment_id
                .replace(/[^a-zA-Z0-9]/g, "")
                .slice(-4)
                .toUpperCase();


        const bookingId =
            `MTAT-${tourCode}-${bookingMonth}-${uniquePart}`;


        // =========================
        // PAYMENT VERIFIED
        // =========================

        return res.status(200).json({

            success: true,

            message:
                "Payment verified successfully",

            bookingId:

                bookingId,

            orderId:
                razorpay_order_id,

            paymentId:
                razorpay_payment_id,

            // Booking information

            tourName:
                tourName || "",

            tourDate:
                tourDate || "",

            seats:
                seats || 0,

            pickupLocation:
                pickupLocation || "",

            customerName:
                customerName || "",

            customerEmail:
                customerEmail || "",

            customerPhone:
                customerPhone || "",

            travellers:
                travellers || [],

            amount:
                amount || 0

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
