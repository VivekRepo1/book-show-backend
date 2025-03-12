const generateOtp = async (digits: number): Promise<string> => {
  const numbers = "0123456789";
  let otp = "";
  for (let i = 0; i < digits; i++) {
    otp += numbers[Math.floor(Math.random() * numbers.length)];
  }
  return otp;
};

export { generateOtp };
