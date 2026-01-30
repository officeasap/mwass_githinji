// src/services/api.ts
export interface VerifyRequest {
  adminPass: string;
}

export interface VerifyResponse {
  success: boolean;
  message?: string;
}

// SIMPLE CLIENT-SIDE VALIDATION FOR VITE
// In production, you'd call a real backend API
export const verifyAdminPassword = async (adminPass: string): Promise<VerifyResponse> => {
  try {
    // Get password from environment variable (Vite uses import.meta.env)
    const expectedPass = import.meta.env.VITE_ADMIN_PASS || 'M1GiQ';
    
    // Validate input
    if (!adminPass || adminPass.length !== 5) {
      return { 
        success: false, 
        message: 'Admin password must be 5 characters' 
      };
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check password
    if (adminPass === expectedPass) {
      return { 
        success: true, 
        message: 'Password verified successfully' 
      };
    }
    
    return { 
      success: false, 
      message: 'Invalid admin password' 
    };
  } catch (error) {
    console.error('Verification error:', error);
    return { 
      success: false, 
      message: 'Verification failed. Please try again.' 
    };
  }
};