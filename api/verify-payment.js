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
                error: "Missing payment verification details"
            });
        }


        // =========================
        // RAZORPAY SECRET
        // =========================

        const keySecret =
            process.env.RAZORPAY_KEY_SECRET;


        if (!keySecret) {
            return res.status(500).json({
                success: false,
                error: "Razorpay secret is not configured"
            });
        }


        // =========================
        // CREATE RAZORPAY SIGNATURE
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
                error: "Payment verification failed"
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
                error: "Payment verification failed"
            });
        }


        // =========================
        // FIND TOUR CODE
        // =========================

        let tourCode = "TOUR";

        if (typeof tourName === "string") {

            const name =
                tourName.toLowerCase();

            if (name.includes("shivneri")) {
                tourCode = "SHIV";
            }
            else if (name.includes("raigad")) {
                tourCode = "RAI";
            }
            else if (name.includes("lonavala")) {
                tourCode = "LON";
            }
            else if (name.includes("mahabaleshwar")) {
                tourCode = "MAH";
            }
            else if (name.includes("shirdi")) {
                tourCode = "SHI";
            }
            else if (name.includes("matheran")) {
                tourCode = "MAT";
            }
            else if (name.includes("goa")) {
                tourCode = "GOA";
            }
        }


        // =========================
        // GET YEAR + MONTH
        // =========================

        let bookingMonth = "000000";

        if (typeof tourDate === "string") {

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
        // SUPABASE CONFIGURATION
        // =========================

        const supabaseUrl =
            process.env.SUPABASE_URL;

        const supabaseSecret =
            process.env.SUPABASE_SECRET_KEY;


        if (
            !supabaseUrl ||
            !supabaseSecret
        ) {
            return res.status(500).json({
                success: false,
                error:
                    "Supabase configuration is missing"
            });
        }


        // =========================
        // CHECK IF PAYMENT ALREADY
        // EXISTS
        // =========================

        const existingResponse =
            await fetch(
                `${supabaseUrl}/rest/v1/bookings` +
                `?select=booking_id` +
                `&razorpay_payment_id=eq.${encodeURIComponent(razorpay_payment_id)}` +
                `&limit=1`,
                {
                    method: "GET",

                    headers: {
                        "apikey":
                            supabaseSecret,

                        "Authorization":
                            `Bearer ${supabaseSecret}`
                    }
                }
            );


        if (existingResponse.ok) {

            const existingBookings =
                await existingResponse.json();

            if (
                Array.isArray(existingBookings) &&
                existingBookings.length > 0
            ) {

                return res.status(200).json({

                    success: true,

                    message:
                        "Payment already verified",

                    bookingId:
                        existingBookings[0].booking_id,

                    orderId:
                        razorpay_order_id,

                    paymentId:
                        razorpay_payment_id,

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
            }
        }


        // =========================
        // CREATE BOOKING IN SUPABASE
        // =========================

        const bookingResponse =
            await fetch(
                `${supabaseUrl}/rest/v1/rpc/create_booking`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "apikey":
                            supabaseSecret,

                        "Authorization":
                            `Bearer ${supabaseSecret}`
                    },

                    body: JSON.stringify({

                        p_tour_code:
                            tourCode,

                        p_booking_month:
                            bookingMonth,

                        p_tour_name:
                            tourName || "",

                        p_tour_date:
                            tourDate || "",

                        p_seats:
                            Number(seats) || 1,

                        p_pickup_location:
                            pickupLocation || "",

                        p_customer_name:
                            customerName || "",

                        p_customer_email:
                            customerEmail || null,

                        p_customer_phone:
                            customerPhone || "",

                        p_amount:
                            Number(amount) || 0,

                        p_razorpay_order_id:
                            razorpay_order_id,

                        p_razorpay_payment_id:
                            razorpay_payment_id,

                        p_travellers:
                            Array.isArray(travellers)
                                ? travellers
                                : []
                    })
                }
            );


        // =========================
        // CHECK SUPABASE RESPONSE
        // =========================

        if (!bookingResponse.ok) {

            const errorText =
                await bookingResponse.text();

            console.error(
                "Supabase booking error:",
                errorText
            );

            return res.status(500).json({
                success: false,
                error:
                    "Payment verified, but booking could not be saved"
            });
        }


        const bookingData =
            await bookingResponse.json();


        // =========================
        // GET BOOKING ID
        // =========================

        if (
            !Array.isArray(bookingData) ||
            !bookingData[0] ||
            !bookingData[0].booking_id
        ) {

            console.error(
                "Invalid Supabase booking response:",
                bookingData
            );

            return res.status(500).json({
                success: false,
                error:
                    "Booking ID could not be generated"
            });
        }


        const bookingId =
            bookingData[0].booking_id;


        // =========================
        // SUCCESS
        // =========================

        return res.status(200).json({

            success: true,

            message:
                "Payment verified and booking created successfully",

            bookingId:
                bookingId,

            orderId:
                razorpay_order_id,

            paymentId:
                razorpay_payment_id,

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
