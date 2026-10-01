async function startRazorpayPayment({
    amount,
    tourName,
    tourDate,
    seats,
    customerName,
    customerEmail,
    customerPhone,
    onSuccess,
    onFailure
}) {
    try {
        // 1. Create Razorpay order on server
        const orderResponse = await fetch("/api/create-order.js", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: Math.round(amount * 100),
                tourName: tourName,
                tourDate: tourDate,
                seats: seats,
                receipt: `booking_${Date.now()}`
            })
        });

        const orderData = await orderResponse.json();

        if (!orderResponse.ok) {
            throw new Error(
                orderData.error ||
                "Unable to create payment order"
            );
        }

        // 2. Open Razorpay checkout
        const options = {
            key: orderData.keyId,
            amount: orderData.amount,
            currency: orderData.currency,

            name: "Mauli Tours & Travels",
            description: tourName,

            order_id: orderData.orderId,

            prefill: {
                name: customerName || "",
                email: customerEmail || "",
                contact: customerPhone || ""
            },

            theme: {
                color: "#1f8f4d"
            },

            handler: async function (response) {

                // 3. Verify payment on server
                const verifyResponse = await fetch(
                    "/api/verify-payment.js",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            razorpay_order_id:
                                response.razorpay_order_id,

                            razorpay_payment_id:
                                response.razorpay_payment_id,

                            razorpay_signature:
                                response.razorpay_signature
                        })
                    }
                );

                const verifyData =
                    await verifyResponse.json();

                if (!verifyResponse.ok ||
                    !verifyData.success) {

                    throw new Error(
                        verifyData.error ||
                        "Payment verification failed"
                    );
                }

                // 4. Payment successfully verified
                if (typeof onSuccess === "function") {
                    onSuccess({
                        orderId:
                            response.razorpay_order_id,

                        paymentId:
                            response.razorpay_payment_id,

                        tourName: tourName,
                        tourDate: tourDate,
                        seats: seats,
                        amount: amount
                    });
                }
            },

            modal: {
                ondismiss: function () {
                    if (typeof onFailure === "function") {
                        onFailure(
                            "Payment window was closed."
                        );
                    }
                }
            }
        };

        const razorpay =
            new Razorpay(options);

        razorpay.on(
            "payment.failed",
            function (response) {

                if (typeof onFailure === "function") {
                    onFailure(
                        response.error?.description ||
                        "Payment failed."
                    );
                }
            }
        );

        razorpay.open();

    } catch (error) {

        console.error(
            "Razorpay payment error:",
            error
        );

        if (typeof onFailure === "function") {
            onFailure(
                error.message ||
                "Unable to start payment."
            );
        }
    }
}
