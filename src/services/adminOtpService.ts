// src/services/adminOtpService.ts
import { verifyAdminPassword } from './api';

class AdminOtpService {
  private readonly OTP_DURATION = 5 * 60 * 1000; // 5 minutes
  private readonly SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
  private readonly PERSISTENCE_KEY = 'studio_admin_access';
  
  async sendOtp(): Promise<boolean> {
    try {
      const otp = this.generateOtp();
      const maskedPass = '*****';
      
      // Store OTP
      localStorage.setItem('admin_otp', otp);
      localStorage.setItem('admin_otp_expiry', (Date.now() + this.OTP_DURATION).toString());
      
      // WhatsApp message
      const message = `🔐 STUDIO 1.6 ADMIN ACCESS\n\nCode: ${otp}${maskedPass}\n\nValid for 5 minutes`;
      this.openWhatsAppDirectly(message);
      
      return true;
    } catch (error) {
      console.error('Failed to send OTP:', error);
      return false;
    }
  }

  async verifyAccess(otp: string, adminPass: string): Promise<boolean> {
    try {
      // Validate OTP format
      if (!otp || otp.length !== 8) {
        return false;
      }

      // Check OTP expiry
      const storedOtp = localStorage.getItem('admin_otp');
      const storedExpiry = localStorage.getItem('admin_otp_expiry');
      
      if (!storedOtp || !storedExpiry) {
        return false;
      }

      const expiryTime = parseInt(storedExpiry);
      if (Date.now() > expiryTime) {
        this.clearOtp();
        return false;
      }

      // Check OTP match
      if (otp.toUpperCase() !== storedOtp) {
        return false;
      }

      // Verify password
      const result = await verifyAdminPassword(adminPass);
      
      if (result.success) {
        // Create session
        const sessionData = {
          granted: true,
          expiry: Date.now() + this.SESSION_DURATION,
          lastActivity: Date.now(),
          createdAt: Date.now()
        };
        
        localStorage.setItem(this.PERSISTENCE_KEY, JSON.stringify(sessionData));
        localStorage.setItem('admin_last_login', Date.now().toString());
        this.clearOtp();
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Verification error:', error);
      return false;
    }
  }

  isAccessGranted(): boolean {
    try {
      const sessionStr = localStorage.getItem(this.PERSISTENCE_KEY);
      if (!sessionStr) return false;

      const session = JSON.parse(sessionStr);
      
      // Check expiry
      if (Date.now() > session.expiry) {
        this.revokeAccess();
        return false;
      }

      // Auto-extend session on activity
      if (Date.now() - session.lastActivity < 60000) { // 1 minute
        session.lastActivity = Date.now();
        localStorage.setItem(this.PERSISTENCE_KEY, JSON.stringify(session));
      }

      return session.granted === true;
    } catch (error) {
      console.error('Access check error:', error);
      return false;
    }
  }

  updateLastActivity(): void {
    if (this.isAccessGranted()) {
      const sessionStr = localStorage.getItem(this.PERSISTENCE_KEY);
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        session.lastActivity = Date.now();
        localStorage.setItem(this.PERSISTENCE_KEY, JSON.stringify(session));
      }
    }
  }

  revokeAccess(): void {
    localStorage.removeItem(this.PERSISTENCE_KEY);
    localStorage.removeItem('admin_last_login');
    this.clearOtp();
  }

  private clearOtp(): void {
    localStorage.removeItem('admin_otp');
    localStorage.removeItem('admin_otp_expiry');
  }

  private generateOtp(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let otp = '';
    for (let i = 0; i < 8; i++) {
      otp += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return otp;
  }

  private openWhatsAppDirectly(message: string): void {
    const phoneNumber = '+2547240499';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }
}

export const adminOtpService = new AdminOtpService();