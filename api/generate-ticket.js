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


    // ==========================================
    // VALIDATION
    // ==========================================

    if (!bookingId || !tourName || !customerName) {
      return res.status(400).json({
        error: "Required booking information is missing"
      });
    }


    // ==========================================
    // CREATE PDF
    // ==========================================

    const doc = new PDFDocument({
      size: "A4",
      margin: 40
    });

    const chunks = [];

    doc.on("data", chunk => {
      chunks.push(chunk);
    });


    doc.on("end", () => {

      const pdfBuffer = Buffer.concat(chunks);

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `inline; filename="${bookingId}.pdf"`
      );

      res.status(200).send(pdfBuffer);

    });


    // ==========================================
    // COLORS
    // ==========================================

    const green = "#1f8f4d";
    const dark = "#17351f";
    const lightGreen = "#eef8f1";
    const gray = "#666666";
    const lightGray = "#eeeeee";


    // ==========================================
    // LOGO
    // ==========================================

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
          fit: [125, 75]
        }
      );

    }


    // ==========================================
    // HEADER
    // ==========================================

    doc
      .fillColor(green)
      .fontSize(21)
      .font("Helvetica-Bold")
      .text(
        "BOOKING CONFIRMED",
        185,
        42,
        {
          width: 365,
          align: "right"
        }
      );


    doc
      .fillColor(gray)
      .fontSize(10)
      .font("Helvetica")
      .text(
        "E-TICKET",
        185,
        68,
        {
          width: 365,
          align: "right"
        }
      );


    // Header line
    doc
      .moveTo(40, 120)
      .lineTo(555, 120)
      .lineWidth(2)
      .strokeColor(green)
      .stroke();


    // ==========================================
    // BOOKING ID BOX
    // ==========================================

    doc
      .roundedRect(
        40,
        135,
        515,
        65,
        8
      )
      .fillColor(lightGreen)
      .fill();


    doc
      .fillColor(gray)
      .fontSize(9)
      .font("Helvetica-Bold")
      .text(
        "BOOKING ID",
        58,
        148
      );


    doc
      .fillColor(dark)
      .fontSize(17)
      .font("Helvetica-Bold")
      .text(
        bookingId,
        58,
        164
      );


    doc
      .fillColor(green)
      .fontSize(9)
      .font("Helvetica-Bold")
      .text(
        "PAID",
        470,
        158,
        {
          width: 60,
          align: "right"
        }
      );


    // ==========================================
    // TOUR DETAILS
    // ==========================================

    sectionTitle(
      doc,
      "TOUR DETAILS",
      220,
      green
    );


    detailRow(
      doc,
      "Tour Name",
      tourName,
      250
    );

    detailRow(
      doc,
      "Tour Date",
      tourDate || "-",
      275
    );

    detailRow(
      doc,
      "Route",
      route || "-",
      300
    );

    detailRow(
      doc,
      "Pickup Location",
      pickupLocation || "-",
      325
    );


    // ==========================================
    // CUSTOMER DETAILS
    // ==========================================

    sectionTitle(
      doc,
      "CUSTOMER DETAILS",
      365,
      green
    );


    detailRow(
      doc,
      "Customer Name",
      customerName,
      395
    );

    detailRow(
      doc,
      "Mobile",
      customerPhone || "-",
      420
    );

    detailRow(
      doc,
      "Email",
      customerEmail || "-",
      445
    );

    detailRow(
      doc,
      "Number of Seats",
      String(seats || 1),
      470
    );


    // ==========================================
    // TRAVELLER DETAILS
    // ==========================================

    sectionTitle(
      doc,
      "TRAVELLER DETAILS",
      505,
      green
    );


    const tableTop = 530;

    // Table header
    doc
      .rect(
        40,
        tableTop,
        515,
        25
      )
      .fillColor(green)
      .fill();


    doc
      .fillColor("#ffffff")
      .fontSize(9)
      .font("Helvetica-Bold")
      .text(
        "TRAVELLER",
        50,
        tableTop + 8
      );

    doc.text(
      "NAME",
      165,
      tableTop + 8
    );

    doc.text(
      "AGE",
      385,
      tableTop + 8
    );

    doc.text(
      "GENDER",
      440,
      tableTop + 8
    );


    let currentY = tableTop + 25;


    if (
      Array.isArray(travellers) &&
      travellers.length > 0
    ) {

      travellers.forEach(
        (traveller, index) => {

          // New page if necessary
          if (currentY > 690) {

            doc.addPage();

            currentY = 50;

          }


          if (index % 2 === 0) {

            doc
              .rect(
                40,
                currentY,
                515,
                28
              )
              .fillColor("#f7faf8")
              .fill();

          }


          doc
            .fillColor(dark)
            .fontSize(9)
            .font("Helvetica")
            .text(
              `Traveller ${index + 1}`,
              50,
              currentY + 9
            );


          doc.text(
            traveller.name || "-",
            165,
            currentY + 9,
            {
              width: 205
            }
          );


          doc.text(
            String(
              traveller.age || "-"
            ),
            385,
            currentY + 9
          );


          doc.text(
            traveller.gender || "-",
            440,
            currentY + 9
          );


          currentY += 28;

        }
      );

    } else {

      doc
        .fillColor(gray)
        .fontSize(9)
        .font("Helvetica")
        .text(
          "Traveller details not available.",
          50,
          currentY + 9
        );

      currentY += 28;

    }


    // ==========================================
    // PAYMENT DETAILS
    // ==========================================

    if (currentY > 680) {

      doc.addPage();

      currentY = 50;

    } else {

      currentY += 25;

    }


    sectionTitle(
      doc,
      "PAYMENT DETAILS",
      currentY,
      green
    );

    currentY += 30;


    detailRow(
      doc,
      "Amount Paid",
      `₹${Number(
        amount || 0
      ).toLocaleString("en-IN")}`,
      currentY
    );

    currentY += 25;


    detailRow(
      doc,
      "Payment ID",
      paymentId || "-",
      currentY
    );

    currentY += 25;


    detailRow(
      doc,
      "Payment Status",
      paymentStatus || "PAID",
      currentY
    );


    // ==========================================
    // IMPORTANT INFORMATION
    // ==========================================

    currentY += 45;


    sectionTitle(
      doc,
      "IMPORTANT INFORMATION",
      currentY,
      green
    );

    currentY += 28;


    const instructions = [

      "Please carry this e-ticket during your journey.",

      "Please report at the pickup location before the scheduled departure time.",

      "Carry a valid government-issued photo ID.",

      "Please follow the tour coordinator's instructions during the trip.",

      "Cancellation and refund are subject to the applicable booking policy."

    ];


    instructions.forEach(
      instruction => {

        if (currentY > 735) {

          doc.addPage();

          currentY = 50;

        }


        doc
          .fillColor(dark)
          .fontSize(9)
          .font("Helvetica")
          .text(
            `• ${instruction}`,
            50,
            currentY,
            {
              width: 490
            }
          );


        currentY += 19;

      }
    );


    // ==========================================
    // CONTACT FOOTER
    // ==========================================

    if (currentY > 720) {

      doc.addPage();

      currentY = 50;

    } else {

      currentY += 20;

    }


    doc
      .moveTo(40, currentY)
      .lineTo(555, currentY)
      .lineWidth(1)
      .strokeColor(lightGray)
      .stroke();


    currentY += 18;


    doc
      .fillColor(green)
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(
        "MAULI TOURS & TRAVELS",
        40,
        currentY
      );


    currentY += 19;


    doc
      .fillColor(gray)
      .fontSize(8.5)
      .font("Helvetica")
      .text(
        "Phone: 9226718177",
        40,
        currentY
      );

    doc.text(
      "Email: maulitoursandtravels2150@gmail.com",
      40,
      currentY + 14
    );

    doc.text(
      "Website: www.maulitoursandtravels.co.in",
      40,
      currentY + 28
    );


    // ==========================================
    // FINAL MESSAGE
    // ==========================================

    doc
      .fillColor(green)
      .fontSize(9)
      .font("Helvetica-Bold")
      .text(
        "Thank you for choosing Mauli Tours & Travels.",
        40,
        770,
        {
          width: 515,
          align: "center"
        }
      );


    // ==========================================
    // FINISH PDF
    // ==========================================

    doc.end();


  } catch (error) {

    console.error(
      "PDF generation error:",
      error
    );


    return res.status(500).json({
      error:
        "Unable to generate e-ticket PDF"
    });

  }

}


/* ==========================================
   SECTION TITLE
========================================== */

function sectionTitle(
  doc,
  title,
  y,
  color
) {

  doc
    .fillColor(color)
    .fontSize(11)
    .font("Helvetica-Bold")
    .text(
      title,
      40,
      y
    );


  doc
    .moveTo(40, y + 17)
    .lineTo(555, y + 17)
    .lineWidth(0.8)
    .strokeColor("#d9e8dd")
    .stroke();

}


/* ==========================================
   DETAIL ROW
========================================== */

function detailRow(
  doc,
  label,
  value,
  y
) {

  doc
    .fillColor("#666666")
    .fontSize(9)
    .font("Helvetica-Bold")
    .text(
      `${label}:`,
      50,
      y
    );


  doc
    .fillColor("#17351f")
    .fontSize(9.5)
    .font("Helvetica")
    .text(
      value,
      165,
      y,
      {
        width: 375
      }
    );

}
