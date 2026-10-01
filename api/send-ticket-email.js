export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const {
      customerEmail,
      customerName,
      bookingId,
      tourName,
      tourDate,
      pdfBase64
    } = req.body || {};

    // -----------------------------------------
    // VALIDATION
    // -----------------------------------------

    if (
      !customerEmail ||
      !customerName ||
      !bookingId ||
      !tourName ||
      !pdfBase64
    ) {
      return res.status(400).json({
        error: "Required email information is missing"
      });
    }

    // -----------------------------------------
    // RESEND API KEY
    // -----------------------------------------

    const apiKey =
      process.env.RESEND_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "RESEND_API_KEY is missing"
      });
    }

    // -----------------------------------------
    // SEND EMAIL
    // -----------------------------------------

    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },

        body: JSON.stringify({

          from:
  "Mauli Tours & Travels <booking@maulitoursandtravels.co.in>",
          to: [
            customerEmail
          ],

          subject:
            `Booking Confirmed - ${bookingId}`,

          html: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              padding: 25px;
              color: #17351f;
            ">

              <h2 style="
                color: #1f8f4d;
                margin-bottom: 5px;
              ">
                Booking Confirmed 🎉
              </h2>

              <p>
                Dear ${customerName},
              </p>

              <p>
                Your booking with
                <strong>Mauli Tours & Travels</strong>
                has been successfully confirmed.
              </p>

              <div style="
                background: #eef8f1;
                padding: 18px;
                border-radius: 8px;
                margin: 20px 0;
              ">

                <p style="margin: 6px 0;">
                  <strong>Booking ID:</strong>
                  ${bookingId}
                </p>

                <p style="margin: 6px 0;">
                  <strong>Tour:</strong>
                  ${tourName}
                </p>

                <p style="margin: 6px 0;">
                  <strong>Date:</strong>
                  ${tourDate || "-"}
                </p>

              </div>

              <p>
                Your <strong>e-ticket PDF</strong>
                is attached to this email.
              </p>

              <p>
                Please keep the e-ticket safely and
                carry it during your journey.
              </p>

              <p style="
                margin-top: 30px;
                color: #666;
              ">
                Thank you for choosing
                <strong>Mauli Tours & Travels.</strong>
              </p>

              <hr style="
                border: none;
                border-top: 1px solid #ddd;
                margin: 25px 0;
              ">

              <p style="
                font-size: 13px;
                color: #666;
              ">
                Phone: 9226718177<br>
                Email: maulitoursandtravels2150@gmail.com<br>
                Website: www.maulitoursandtravels.co.in
              </p>

            </div>
          `,

          attachments: [
            {
              filename:
                `${bookingId}.pdf`,

              content:
                pdfBase64,

              content_type:
                "application/pdf"
            }
          ]

        })
      }
    );

    const data =
      await response.json();

    // -----------------------------------------
    // RESEND ERROR
    // -----------------------------------------

    if (!response.ok) {

      console.error(
        "Resend error:",
        data
      );

      return res.status(response.status).json({
        error:
          data.message ||
          "Unable to send email"
      });

    }

    // -----------------------------------------
    // SUCCESS
    // -----------------------------------------

    return res.status(200).json({

      success: true,

      message:
        "Ticket email sent successfully",

      emailId:
        data.id

    });

  } catch (error) {

    console.error(
      "Email sending error:",
      error
    );

    return res.status(500).json({
      error:
        "Internal server error"
    });

  }

}
