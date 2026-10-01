async function startRazorpayPayment({
    amount,
    tourName,
    tourDate,
    seats,
    pickupLocation,
    customerName,
    customerEmail,
    customerPhone,
    travellers,
    onSuccess,
    onFailure
}) {

    try {

        // =========================
        // 1. CREATE RAZORPAY ORDER
        // =========================

        const orderResponse =
            await fetch("/api/create-order", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    amount:
                        Math.round(amount * 100),

                    tourName:
                        tourName,

                    tourDate:
                        tourDate,

                    seats:
                        seats,

                    pickupLocation:
                        pickupLocation,

                    customerName:
                        customerName,

                    customerEmail:
                        customerEmail,

                    customerPhone:
                        customerPhone,

                    travellers:
                        travellers,

                    receipt:
                        `booking_${Date.now()}`

                })

            });


        const orderData =
            await orderResponse.json();


        if (!orderResponse.ok) {

            throw new Error(
                orderData.error ||
                "Unable to create payment order"
            );

        }


        // =========================
        // 2. OPEN RAZORPAY CHECKOUT
        // =========================

        const options = {

            key:
                orderData.keyId,

            amount:
                orderData.amount,

            currency:
                orderData.currency,

            name:
                "Mauli Tours & Travels",

            description:
                tourName,

            order_id:
                orderData.orderId,


            prefill: {

                name:
                    customerName || "",

                email:
                    customerEmail || "",

                contact:
                    customerPhone || ""

            },


            theme: {

                color:
                    "#1f8f4d"

            },


            // =========================
            // 3. PAYMENT RESPONSE
            // =========================

            handler:
                async function (response) {

                    try {

                        // =========================
                        // 4. VERIFY PAYMENT
                        // =========================

                        const verifyResponse =
                            await fetch(
                                "/api/verify-payment",
                                {

                                    method:
                                        "POST",

                                    headers: {

                                        "Content-Type":
                                            "application/json"

                                    },

                                    body:
                                        JSON.stringify({

                                            razorpay_order_id:
                                                response
                                                    .razorpay_order_id,

                                            razorpay_payment_id:
                                                response
                                                    .razorpay_payment_id,

                                            razorpay_signature:
                                                response
                                                    .razorpay_signature,


                                            // Booking information
                                            tourName:
                                                tourName,

                                            tourDate:
                                                tourDate,

                                            seats:
                                                seats,

                                            pickupLocation:
                                                pickupLocation,

                                            customerName:
                                                customerName,

                                            customerEmail:
                                                customerEmail,

                                            customerPhone:
                                                customerPhone,

                                            travellers:
                                                travellers,

                                            amount:
                                                amount

                                        })

                                }

                            );


                        const verifyData =
                            await verifyResponse
                                .json();


                        if (
                            !verifyResponse.ok ||
                            !verifyData.success
                        ) {

                            throw new Error(

                                verifyData.error ||
                                "Payment verification failed"

                            );

                        }


                        // =========================
                        // 5. SUCCESS
                        // =========================

                        if (
                            typeof onSuccess ===
                            "function"
                        ) {

                            onSuccess({

                                bookingId:
                                    verifyData.bookingId,

                                orderId:
                                    response
                                        .razorpay_order_id,

                                paymentId:
                                    response
                                        .razorpay_payment_id,

                                tourName:
                                    tourName,

                                tourDate:
                                    tourDate,

                                seats:
                                    seats,

                                pickupLocation:
                                    pickupLocation,

                                customerName:
                                    customerName,

                                customerEmail:
                                    customerEmail,

                                customerPhone:
                                    customerPhone,

                                travellers:
                                    travellers,

                                amount:
                                    amount

                            });

                        }


                    } catch (error) {

                        console.error(
                            "Payment verification error:",
                            error
                        );


                        if (
                            typeof onFailure ===
                            "function"
                        ) {

                            onFailure(

                                error.message ||
                                "Payment verification failed."

                            );

                        }

                    }

                },


            // =========================
            // PAYMENT WINDOW CLOSED
            // =========================

            modal: {

                ondismiss:
                    function () {

                        if (
                            typeof onFailure ===
                            "function"
                        ) {

                            onFailure(
                                "Payment window was closed."
                            );

                        }

                    }

            }

        };


        // =========================
        // CREATE RAZORPAY INSTANCE
        // =========================

        const razorpay =
            new Razorpay(options);


        // =========================
        // PAYMENT FAILED
        // =========================

        razorpay.on(
            "payment.failed",
            function (response) {

                if (
                    typeof onFailure ===
                    "function"
                ) {

                    onFailure(

                        response.error?.description ||
                        "Payment failed."

                    );

                }

            }
        );


        // =========================
        // OPEN CHECKOUT
        // =========================

        razorpay.open();


    } catch (error) {

        console.error(
            "Razorpay payment error:",
            error
        );


        if (
            typeof onFailure ===
            "function"
        ) {

            onFailure(

                error.message ||
                "Unable to start payment."

            );

        }

    }

}
