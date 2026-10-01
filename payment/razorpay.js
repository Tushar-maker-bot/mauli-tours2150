async function startRazorpayPayment({
    amount,
    tourName,
    tourDate,
    route,
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


                        // =====================================
                        // 5. PAYMENT VERIFIED + BOOKING SAVED
                        // =====================================

                        const bookingId =
                            verifyData.bookingId;


                        // =====================================
                        // 6. GENERATE PDF E-TICKET
                        // =====================================

                        let ticketGenerated = false;

                        try {

                            const ticketResponse =
                                await fetch(
                                    "/api/generate-ticket",
                                    {

                                        method:
                                            "POST",

                                        headers: {

                                            "Content-Type":
                                                "application/json"

                                        },

                                        body:
                                            JSON.stringify({

                                                bookingId:
                                                    bookingId,

                                                tourName:
                                                    tourName,

                                                tourDate:
                                                    tourDate,

                                                route:
                                                    route || "-",

                                                pickupLocation:
                                                    pickupLocation,

                                                customerName:
                                                    customerName,

                                                customerPhone:
                                                    customerPhone,

                                                customerEmail:
                                                    customerEmail,

                                                seats:
                                                    seats,

                                                amount:
                                                    amount,

                                                paymentId:
                                                    response
                                                        .razorpay_payment_id,

                                                paymentStatus:
                                                    "PAID",

                                                travellers:
                                                    travellers

                                            })

                                    }

                                );


                            if (!ticketResponse.ok) {

                                const ticketError =
                                    await ticketResponse.text();

                                console.error(
                                    "PDF generation failed:",
                                    ticketError
                                );

                            } else {

                                // =====================================
                                // GET PDF BLOB
                                // =====================================

                                const pdfBlob =
                                    await ticketResponse.blob();


                                // =====================================
                                // SEND PDF BY EMAIL
                                // =====================================

                                if (customerEmail) {

                                    try {

                                        const pdfBase64 =
                                            await blobToBase64(
                                                pdfBlob
                                            );


                                        const emailResponse =
                                            await fetch(
                                                "/api/send-ticket-email",
                                                {

                                                    method:
                                                        "POST",

                                                    headers: {

                                                        "Content-Type":
                                                            "application/json"

                                                    },

                                                    body:
                                                        JSON.stringify({

                                                            customerEmail:
                                                                customerEmail,

                                                            customerName:
                                                                customerName,

                                                            bookingId:
                                                                bookingId,

                                                            tourName:
                                                                tourName,

                                                            tourDate:
                                                                tourDate,

                                                            pdfBase64:
                                                                pdfBase64

                                                        })

                                                }
                                            );


                                        const emailData =
                                            await emailResponse.json();


                                        if (!emailResponse.ok) {

                                            console.error(
                                                "Ticket email failed:",
                                                emailData
                                            );

                                        } else {

                                            console.log(
                                                "Ticket email sent successfully:",
                                                emailData
                                            );

                                        }


                                    } catch (emailError) {

                                        console.error(
                                            "Ticket email error:",
                                            emailError
                                        );

                                    }

                                }


                                // =====================================
                                // DOWNLOAD PDF
                                // =====================================

                                const pdfUrl =
                                    URL.createObjectURL(
                                        pdfBlob
                                    );


                                const downloadLink =
                                    document.createElement("a");


                                downloadLink.href =
                                    pdfUrl;


                                downloadLink.download =
                                    `${bookingId}.pdf`;


                                document.body.appendChild(
                                    downloadLink
                                );


                                downloadLink.click();


                                downloadLink.remove();


                                setTimeout(
                                    function () {

                                        URL.revokeObjectURL(
                                            pdfUrl
                                        );

                                    },
                                    1000
                                );


                                ticketGenerated = true;

                            }


                        } catch (pdfError) {

                            console.error(
                                "PDF ticket error:",
                                pdfError
                            );

                        }


                        // =========================
                        // 7. SUCCESS
                        // =========================

                        if (
                            typeof onSuccess ===
                            "function"
                        ) {

                            onSuccess({

                                bookingId:
                                    bookingId,

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

                                route:
                                    route || "-",

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
                                    amount,

                                ticketGenerated:
                                    ticketGenerated

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


// =====================================
// CONVERT PDF BLOB TO BASE64
// =====================================

function blobToBase64(blob) {

    return new Promise((resolve, reject) => {

        const reader =
            new FileReader();


        reader.onloadend =
            function () {

                const result =
                    reader.result;

                const base64 =
                    result.split(",")[1];

                resolve(base64);

            };


        reader.onerror =
            reject;


        reader.readAsDataURL(blob);

    });

}
