import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const {
      bookingId,
      tourName,
      tourDate,
      route,
      pickupLocation,
      customerName,
      customerPhone,
      customerEmail,
      seats,
      amount,
      paymentId,
      paymentStatus,
      travellers
    } = req.body || {};

    if (!bookingId || !tourName || !customerName) {
      return res.status(400).json({
        error: "Required booking information is missing"
      });
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 45
    });

    const chunks = [];

    doc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${bookingId}.pdf"`
      );

      res.status(200).send(pdfBuffer);
    });

    /* --------------------------------
       LOGO
    -------------------------------- */

    const logoPath = path.join(
      process.cwd(),
      "LOGO.png"
    );

    if (fs.existsSync(logoPath)) {
      doc.image(
        logoPath,
        45,
        35,
        {
          fit: [120, 70],
          align: "left"
        }
      );
    }

    /* --------------------------------
       HEADER
    -------------------------------- */

    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .text(
        "BOOKING CONFIRMED",
        190,
        45,
        {
          align: "right"
        }
      );

    doc
      .fontSize(11)
      .font("Helvetica")
      .text(
        "E-Ticket",
        190,
        70,
        {
          align: "right"
        }
      );

    doc.moveDown(4);

    /* --------------------------------
       BOOKING ID
    -------------------------------- */

    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .text("Booking ID");

    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text(bookingId);

    doc.moveDown(1);

    /* --------------------------------
       TOUR DETAILS
    -------------------------------- */

    sectionTitle(doc, "TOUR DETAILS");

    field(doc, "Tour Name", tourName);
    field(doc, "Tour Date", tourDate || "-");
    field(doc, "Route", route || "-");
    field(doc, "Pickup Location", pickupLocation || "-");

    doc.moveDown(0.8);

    /* --------------------------------
       CUSTOMER DETAILS
    -------------------------------- */

    sectionTitle(doc, "CUSTOMER DETAILS");

    field(doc, "Customer Name", customerName);
    field(doc, "Mobile", customerPhone || "-");
    field(doc, "Email", customerEmail || "-");
    field(doc, "Seats", String(seats || 1));

    doc.moveDown(0.8);

    /* --------------------------------
       TRAVELLERS
    -------------------------------- */

    sectionTitle(doc, "TRAVELLER DETAILS");

    if (Array.isArray(travellers) && travellers.length > 0) {
      travellers.forEach((traveller, index) => {
        doc
          .fontSize(10)
          .font("Helvetica-Bold")
          .text(`Traveller ${index + 1}`);

        doc
          .fontSize(10)
          .font("Helvetica")
          .text(
            `Name: ${traveller.name || "-"}   |   Age: ${
              traveller.age || "-"
            }   |   Gender: ${traveller.gender || "-"}`
          );

        doc.moveDown(0.4);
      });
    } else {
      doc
        .fontSize(10)
        .font("Helvetica")
        .text("Traveller details not available.");
    }

    doc.moveDown(0.8);

    /* --------------------------------
       PAYMENT DETAILS
    -------------------------------- */

    sectionTitle(doc, "PAYMENT DETAILS");

    field(
      doc,
      "Amount Paid",
      `₹${Number(amount || 0).toLocaleString("en-IN")}`
    );

    field(doc, "Payment ID", paymentId || "-");
    field(doc, "Payment Status", paymentStatus || "PAID");

    doc.moveDown(1);

    /* --------------------------------
       IMPORTANT INFORMATION
    -------------------------------- */

    sectionTitle(doc, "IMPORTANT INFORMATION");

    const instructions = [
      "Please carry this e-ticket during your journey.",
      "Please report at the pickup location before the scheduled departure time.",
      "Carry a valid government-issued photo ID.",
      "Booking once confirmed is subject to the applicable cancellation and refund policy.",
      "For assistance, contact Mauli Tours & Travels."
    ];

    instructions.forEach((item) => {
      doc
        .fontSize(9.5)
        .font("Helvetica")
        .text(`• ${item}`, {
          continued: false
        });

      doc.moveDown(0.25);
    });

    doc.moveDown(1);

    /* --------------------------------
       CONTACT
    -------------------------------- */

    sectionTitle(doc, "MAULI TOURS & TRAVELS");

    doc
      .fontSize(10)
      .font("Helvetica")
      .text("Phone: 9226718177")
      .text("Email: maulitoursandtravels2150@gmail.com")
      .text("Website: www.maulitoursandtravels.co.in");

    /* --------------------------------
       FOOTER
    -------------------------------- */

    const footerY = 770;

    doc
      .fontSize(9)
      .font("Helvetica")
      .text(
        "Thank you for choosing Mauli Tours & Travels.",
        45,
        footerY,
        {
          align: "center",
          width: 505
        }
      );

    doc.end();

  } catch (error) {
    console.error("PDF generation error:", error);

    return res.status(500).json({
      error: "Unable to generate e-ticket PDF"
    });
  }
}


/* ====================================
   HELPER FUNCTIONS
==================================== */

function sectionTitle(doc, title) {
  doc
    .fontSize(11)
    .font("Helvetica-Bold")
    .text(title);

  doc.moveDown(0.35);
}


function field(doc, label, value) {
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(`${label}: `, {
      continued: true
    });

  doc
    .font("Helvetica")
    .text(value);

  doc.moveDown(0.35);
}
