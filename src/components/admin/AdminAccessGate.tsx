// src/components/admin/AdminAccessGate.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Shield, Mail, Phone, MapPin, ArrowLeft, Unlock, Key } from 'lucide-react';

interface AdminAccessGateProps {
  onAccessGranted: () => void;
}

const AdminAccessGate: React.FC<AdminAccessGateProps> = ({ onAccessGranted }) => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const otpInputRef = useRef<HTMLInputElement>(null);

  // Environment variables for display only
  const OTP_LENGTH = parseInt(import.meta.env.VITE_ADMIN_OTP_LENGTH || '8');
  const EXAMPLE_OTP = import.meta.env.VITE_WHATSAPP_EXAMPLE_OTP || 'ABC123XY';
  const EXAMPLE_PASS = import.meta.env.VITE_WHATSAPP_EXAMPLE_PASS || 'iQM9G';

  useEffect(() => {
    if (showOtpInput && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [showOtpInput]);

  const handleRequestOtp = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Import the service dynamically
      const { adminOtpService } = await import('@/services/adminOtpService');
      const success = await adminOtpService.sendOtp();
      
      if (success) {
        setShowOtpInput(true);
        setSuccess('✅ OTP sent to WhatsApp! Check your messages.');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    // Validate inputs
    if (otp.length !== OTP_LENGTH) {
      setError(`OTP must be exactly ${OTP_LENGTH} characters`);
      return;
    }

    if (adminPass.length !== 5) {
      setError('Admin password must be 5 characters');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Import the service
      const { adminOtpService } = await import('@/services/adminOtpService');
      const isValid = await adminOtpService.verifyAccess(otp.toUpperCase(), adminPass);
      
      if (isValid) {
        setSuccess('🔓 Access granted! Redirecting to admin panel...');
        
        // Call the callback to grant access
        setTimeout(() => {
          onAccessGranted();
        }, 1500);
      } else {
        setError('❌ Invalid credentials. Please try again.');
        setAdminPass('');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && showOtpInput) {
      handleVerifyOtp();
    }
  };

  const resetForm = () => {
    setShowOtpInput(false);
    setOtp('');
    setAdminPass('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">STUDIO INFORM</h2>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">studio@mwas.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">+254 724 0499</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Studio 1.6, Rungiri, Kiambogo, Kenya</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Dual-Layer Access</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Enter both credentials</p>
          </div>

          {!showOtpInput ? (
            <div className="space-y-6">
              <button
                onClick={handleRequestOtp}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    Request OTP via WhatsApp
                  </>
                )}
              </button>

              {/* WhatsApp Example */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span>📱</span>
                  <span>WhatsApp Example:</span>
                </p>
                <div className="font-mono text-sm bg-gray-900 text-gray-100 dark:bg-black dark:text-gray-300 p-3 rounded">
                  <div className="mb-1">{EXAMPLE_OTP}*****</div>
                  <div className="text-gray-400 dark:text-gray-500 text-xs space-y-1">
                    <div>OTP: <span className="text-green-400 dark:text-green-300">{EXAMPLE_OTP}</span></div>
                    <div>Pass: <span className="text-green-400 dark:text-green-300">{EXAMPLE_PASS}</span></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  Actual password is loaded securely from server environment
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={resetForm}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Request
              </button>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    OTP ({OTP_LENGTH} characters)
                  </label>
                  <input
                    ref={otpInputRef}
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, OTP_LENGTH))}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter OTP from WhatsApp"
                    className="w-full px-4 py-3 text-base text-center font-mono bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    First {OTP_LENGTH} chars from WhatsApp message
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Admin Pass (5 characters)
                  </label>
                  <input
                    type="password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value.slice(0, 5))}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter ***** passcode"
                    maxLength={5}
                    className="w-full px-4 py-3 text-base text-center font-mono bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Represents the ***** in WhatsApp message
                  </p>
                </div>
              </div>

              {/* Messages */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
                </div>
              )}
              
              {success && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-green-400 text-center">{success}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          {showOtpInput ? (
            <div className="flex gap-3">
              <button
                onClick={resetForm}
                className="flex-1 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={otp.length !== OTP_LENGTH || adminPass.length !== 5 || isLoading}
                className="flex-1 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    Access Admin
                  </>
                )}
              </button>
            </div>
          ) : (
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Secure access via WhatsApp OTP + Admin Password
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAccessGate; // <-- FIXED: Added default export