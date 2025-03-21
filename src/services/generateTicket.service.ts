import { createCanvas, loadImage } from 'canvas';
import qr from 'qr-image';

const generateQRCode = (text: string) => {
  const qrSvg = qr.imageSync(text, { type: 'png', margin: 1 });
  return loadImage(Buffer.from(qrSvg));
};

export const generateEventTicketBuffer = async (data: any) => {
  const canvas = createCanvas(600, 900);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#f9f9f9';
  ctx.fillRect(0, 0, 600, 900);

  // Title
  ctx.fillStyle = '#333';
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(data.title, 300, 80);

  // Event Details
  ctx.font = '18px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#555';
  ctx.fillText(`📅 ${data.date}`, 50, 150);
  ctx.fillText(`⏰ ${data.time}`, 50, 190);
  ctx.fillText(`📍 ${data.venue}`, 50, 230);

  // User Details
  ctx.fillText(`Name: ${data.name}`, 50, 280);
  ctx.fillText(`Mobile number: ${data.mobile}`, 50, 320);
  ctx.fillText(`Number of Tickets: ${data.tickets}`, 50, 360);
  ctx.fillText(`Total Amount: ₹${data.amount}`, 50, 400);

  // Generate and Draw QR Code
  const qrCode = await generateQRCode(data.qrData);
  ctx.drawImage(qrCode, 230, 450, 150, 150);

  // Return Buffer
  return canvas.toBuffer('image/png');
};

// const sendMailWithAttachment = async (data, recipientMail) => {
//   try {
//     const ticketBuffer = await generateEventTicketBuffer(data);

//     await transporter.sendMail({
//       from: `"Book Show 🎟️" <${process.env.EMAIL_ADDRESS}>`,
//       to: recipientMail,
//       subject: `Your Ticket for ${data.title}`,
//       text: `Hello ${data.name},\n\nYour ticket is attached. See you at the event!\n`,
//       attachments: [
//         {
//           filename: 'event-ticket.png',
//           content: ticketBuffer,
//         },
//       ],
//     });

//     console.log('Email sent with ticket attachment');
//   } catch (error) {
//     console.error('Error sending mail:', error);
//   }
// };

// Example Data
// const eventData = {
//   title: 'Opportunities in E-commerce',
//   date: '21th Dec, 2024',
//   time: '10:00 AM',
//   venue: 'Ch. Ranbir Singh Auditorium, GJU, Hisar',
//   name: 'Md Rizwan',
//   mobile: '9876543456',
//   tickets: '1',
//   amount: '499',
//   qrData: 'https://bookshow.online/ticket/12345',
// };

// // Send the mail
// sendMailWithAttachment(eventData, 'recipient@example.com');
