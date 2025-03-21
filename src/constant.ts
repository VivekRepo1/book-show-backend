const emailTemplates = {
  signupOtp: {
    subject: "Your Sign Up OTP",
    text: "Hi {{name}},\nYour sign up OTP is: {{otp}}. Please use it to verify your account.",
    html: `<p>Hi {{name}},</p>
             <p>Your sign up OTP is: <strong>{{otp}}</strong>. Please use it to verify your account.</p>`,
  },
  forgotOtp: {
    subject: "Password Reset OTP",
    text: "Hello {{name}},\nUse the following OTP to reset your password: {{otp}}.",
    html: `<p>Hello {{name}},</p>
             <p>Use the following OTP to reset your password: <strong>{{otp}}</strong>.</p>`,
  },
  successfulBooking: {
    subject: "Your Tickets for the {{event}} are Confirmed",
    text: "Dear {{name}},\n\nWe are pleased to inform you that your tickets for the {{event}} have been successfully booked.\n\nWe look forward to welcoming you to the event and sharing exciting opportunities in the world of e-commerce.\n\nBest regards,\n{{platformProvider}}",
    html: `<p>Dear {{name}},</p>
           <p>We are pleased to inform you that your tickets for the <strong>{{event}}</strong> have been successfully booked.</p>
           <p>We look forward to welcoming you to the event.</p>
           <p>Best regards,<br/>{{platformProvider}}</p>`,
  }
};

export { emailTemplates };
