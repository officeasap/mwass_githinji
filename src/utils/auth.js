// utils/auth.js or similar
export function validateAdminAccess(otpInput, passInput) {
  const actualAdminPass = process.env.ADMIN_PASS || "M1GiQ"; // Fallback to "M1GiQ"
  const otpLength = parseInt(process.env.ADMIN_OTP_LENGTH) || 8; // Fallback to 8
  
  // Validate OTP length
  if (otpInput.length !== otpLength) {
    return {
      isValid: false,
      message: `OTP must be exactly ${otpLength} characters`
    };
  }
  
  // Validate admin password
  if (passInput !== actualAdminPass) {
    return {
      isValid: false,
      message: "Invalid admin password"
    };
  }
  
  // If both validations pass
  return {
    isValid: true,
    message: "Access granted"
  };
}