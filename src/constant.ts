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
  successfulSignin: {
    subject: "Successful Sign In",
    text: "Hello {{name}},\nYou've successfully signed in. Welcome back!",
    html: `<p>Hello {{name}},</p>
             <p>You've successfully signed in. Welcome back!</p>`,
  },
};

export { emailTemplates };
