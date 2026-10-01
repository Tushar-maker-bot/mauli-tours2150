export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const {
      amount,
      receipt,
      tourName,
      tourDate,
      seats
    } = req.body;

    if (!amount) {
      return res.status(400).json({
        error: "Amount is required"
      });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return res.status(500).json({
        error: "Razorpay environment variables are missing"
      });
    }

    const auth = Buffer.from(
      `${keyId}:${keySecret}`
    ).toString("base64");

    const orderData = {
      amount: Number(amount),
      currency: "INR",
      receipt: receipt || `booking_${Date.now()}`,
      notes: {
        tour_name: tourName || "",
        tour_date: tourDate || "",
        seats: String(seats || "")
      }
    };

    const response = await fetch(
      "https://api.razorpay.com/v1/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`
        },
        body: JSON.stringify(orderData)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data.error?.description ||
          "Unable to create Razorpay order"
      });
    }

    return res.status(200).json({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      keyId: keyId
    });

  } catch (error) {
    console.error("Razorpay order error:", error);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
}
