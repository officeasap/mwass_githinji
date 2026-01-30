// pages/Studio.tsx
import { Mail, Phone, MapPin, Calendar, Building, Compass, Users, ArrowRight, Sparkles, Instagram, Key, Unlock, X } from "lucide-react";
import { whatsappService } from "@/services/whatsappService";
import { adminOtpService } from '@/services/adminOtpService';
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
// SculpturalButton import removed since it's not being used


export default function Studio() {
  const [showAdminOtp, setShowAdminOtp] = useState(false);
  const [adminOtp, setAdminOtp] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [otpStatus, setOtpStatus] = useState<'idle' | 'sent' | 'verifying' | 'success' | 'error'>('idle');
  const [otpError, setOtpError] = useState('');

  const handleOpenChat = () => {
    whatsappService.handleWhatsAppClick({
      type: 'studio-appointment'
    });
  };

  const handleExhibitionChat = () => {
    whatsappService.handleWhatsAppClick({
      type: 'general',
      prefillMessage: "Hello Mwass, I'd like to book a private viewing of 'Echoes of the Savannah' exhibition at Studio 1.6."
    });
  };

  const handleGeneralChat = () => {
    whatsappService.handleWhatsAppClick({
      type: 'general',
      prefillMessage: "Hello Mwass, I'd like to get in touch with Studio 1.6."
    });
  };

  useEffect(() => {
    if (adminOtpService.isAccessGranted()) {
      window.location.href = '/admin/art-studio';
    }
  }, []);

  const handleAdminOtpRequest = async () => {
    setOtpStatus('sent');
    setOtpError('');
    
    try {
      await adminOtpService.sendOtp();
      setShowAdminOtp(true);
      setOtpStatus('idle');
    } catch (error) {
      setOtpStatus('error');
      setOtpError('Failed to send OTP. Please try again.');
    }
  };

  const handleOtpVerify = async () => {
    if (adminOtp.length !== 8) {
      setOtpError('OTP must be 8 characters');
      return;
    }
    
    if (!adminPass) {
      setOtpError('Admin pass required');
      return;
    }

    setOtpStatus('verifying');
    
    try {
      const isValid = await adminOtpService.verifyAccess(adminOtp, adminPass);
      
      if (isValid) {
        setOtpStatus('success');
        setTimeout(() => {
          window.location.href = '/admin/art-studio';
        }, 1000);
      } else {
        setOtpStatus('error');
        setOtpError('Invalid OTP or Admin Pass');
        setAdminOtp('');
        setAdminPass('');
      }
    } catch (error) {
      setOtpStatus('error');
      setOtpError('Verification failed. Please try again.');
      setAdminOtp('');
      setAdminPass('');
    }
  };

  const handleOtpKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleOtpVerify();
    }
    const key = e.key.toUpperCase();
    if (!/^[A-Z0-9]$/.test(key) && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
    }
  };

  return (
    <Layout>
      <section className="section-sacred bg-background pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 animate-fade-in opacity-0 stagger-1">
              <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 border border-border shadow-[0_8px_32px rgba(0,0,0,0.3)] backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary">
                  THE CREATIVE SPACE
                </span>
              </div>
            </div>

            <div className="mb-12 animate-rise opacity-0 stagger-2">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
                <span className="text-[#02abec]">Studio</span>
                <br />
                <span className="text-[#02abec] pl-24 md:pl-32 relative">
                  <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 h-2 w-2 rounded-full bg-primary/50"></span>
                  1.6
                </span>
              </h1>
            </div>

            <div className="max-w-3xl mb-16 animate-fade-in opacity-0 stagger-3">
              <p className="text-xl text-foreground-muted leading-relaxed font-light">
                Located in the heart of Nairobi's creative district, Studio 1.6 is a sanctuary where 
                artistic concepts evolve into tangible experiences through disciplined practice and 
                experimental methodology.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-8 animate-fade-in opacity-0 stagger-4">
              <div className="px-6 py-3 rounded-full bg-background border border-border shadow-[0_4px_16px rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                <MapPin className="h-4 w-4 text-foreground-muted" />
                <span className="text-sm font-medium text-foreground">Nairobi Creative District</span>
              </div>
              
              <button
                onClick={handleOpenChat}
                className="px-6 py-3 rounded-full bg-background border border-border shadow-[0_4px_16px rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 cursor-pointer hover:border-primary hover:bg-primary/5 group"
              >
                <Calendar className="h-4 w-4 text-foreground-muted group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  By Appointment
                </span>
              </button>
              
              <div className="px-6 py-3 rounded-full bg-background border border-border shadow-[0_4px_16px rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                <Users className="h-4 w-4 text-foreground-muted" />
                <span className="text-sm font-medium text-foreground">Est. 2023</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sacred bg-background-secondary py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Creative Laboratory",
                description: "A 160-square-meter loft with north-facing windows providing consistent natural light for optimal color perception.",
                icon: Building,
                color: "from-primary/10 to-primary/5"
              },
              {
                title: "Flexible Architecture",
                description: "Movable partitions allow transformation between working studio, viewing room, and exhibition space.",
                icon: Compass,
                color: "from-secondary/10 to-secondary/5"
              },
              {
                title: "Artist Residencies",
                description: "Quarterly residency programs for emerging African artists with mentorship and exhibition opportunities.",
                icon: Users,
                color: "from-accent/10 to-accent/5"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className={`bg-gradient-to-br ${feature.color} border border-border rounded-3xl p-8 shadow-[0_16px_48px rgba(0,0,0,0.25)] hover:shadow-[0_32px_64px rgba(0,0,0,0.35)] hover:-translate-y-2 transition-all duration-500 animate-fade-in opacity-0`}
                style={{ animationDelay: `${(index + 1) * 0.2}s` }}
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-background border border-border shadow-[inset_0_2px_8px rgba(255,255,255,0.1),0_4px_16px rgba(0,0,0,0.3)]">
                    <feature.icon className="h-8 w-8 text-foreground" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-foreground-muted leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sacred bg-background py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-border rounded-4xl p-8 md:p-12 shadow-[0_32px_64px rgba(0,0,0,0.3)] hover:shadow-[0_48px_96px rgba(0,0,0,0.4)] transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8">
                  <p className="text-metadata mb-4">Studio Exhibition</p>
                  <h2 className="text-foreground text-3xl md:text-4xl font-bold mb-6">
                    Current Exhibition
                  </h2>
                </div>

                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-4 text-primary">"Echoes of the Savannah"</h3>
                  <p className="text-foreground-muted leading-relaxed font-light mb-8">
                    A collection exploring the intersection of traditional African motifs with 
                    contemporary abstraction. This exhibition showcases works created entirely 
                    within Studio 1.6, highlighting our material research and spatial methodology.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                    <a
                      href="/exhibitions"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-[#05a7ef] text-white text-sm uppercase tracking-widest font-medium hover:bg-[#05a7ef]/90 transition-all shadow-[0_8px_32px rgba(5,167,239,0.3)] hover:shadow-[0_16px_48px rgba(5,167,239,0.4)] rounded-xl"
                    >
                      View Exhibition Details
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                    
                    <button
                      onClick={handleExhibitionChat}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-background border border-border text-foreground text-sm uppercase tracking-widest font-medium hover:bg-accent hover:border-primary transition-all rounded-xl"
                    >
                      Book a Private Viewing
                      <Calendar className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_48px rgba(0,0,0,0.4)]">
                  <img 
                    src="/images/artworks/exhibition1_hsslzy_odgzn8.jpg"
                    alt="Echoes of the Savannah Exhibition"
                    className="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 border-2 border-border/30 rounded-3xl pointer-events-none"></div>
                  
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-full text-sm font-bold tracking-wider shadow-[0_8px_24px rgba(0,0,0,0.4)] flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    ON VIEW
                  </div>
                </div>
                
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-black/20 rounded-full blur-md"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sacred bg-background-secondary py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="mb-8">
                <p className="text-metadata mb-4">Send a Message</p>
                <h2 className="text-foreground text-2xl md:text-3xl font-bold">Studio Correspondence</h2>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-metadata mb-2">NAME</label>
                  <input 
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-6 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-colors rounded-xl shadow-[inset_0_2px_4px rgba(0,0,0,0.1)]"
                  />
                </div>

                <div>
                  <label className="block text-metadata mb-2">EMAIL</label>
                  <input 
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-colors rounded-xl shadow-[inset_0_2px_4px rgba(0,0,0,0.1)]"
                  />
                </div>

                <div>
                  <label className="block text-metadata mb-2">MESSAGE</label>
                  <textarea 
                    placeholder="Your message..."
                    rows={6}
                    className="w-full px-6 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-colors rounded-xl shadow-[inset_0_2px_4px rgba(0,0,0,0.1)] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-[#05a7ef] text-white rounded-xl hover:bg-[#05a7ef]/90 transition-colors font-medium shadow-[0_8px_32px rgba(5,167,239,0.3)] hover:shadow-[0_16px_48px rgba(5,167,239,0.4)]"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-12">
              <div>
                <p className="text-metadata mb-4">Direct Contact</p>
                <h2 className="text-foreground text-2xl md:text-3xl font-bold mb-8">
                  Studio Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-muted rounded-xl shadow-[0_4px_16px rgba(0,0,0,0.15)]">
                      <Mail size={24} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-metadata mb-1">EMAIL</p>
                      <a
                        href="mailto:studio@mwassgithinji.com"
                        className="text-foreground hover:text-foreground-muted transition-colors text-lg"
                      >
                        studio@mwassgithinji.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-muted rounded-xl shadow-[0_4px_16px rgba(0,0,0,0.15)]">
                      <Phone size={24} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-metadata mb-1">PHONE / WHATSAPP</p>
                      <button
                        onClick={handleGeneralChat}
                        className="text-foreground hover:text-foreground-muted transition-colors text-lg text-left"
                      >
                        +254 724 049 148
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-muted rounded-xl shadow-[0_4px_16px rgba(0,0,0,0.15)]">
                      <MapPin size={24} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-metadata mb-1">STUDIO ADDRESS</p>
                      <p className="text-foreground text-lg">
                        Studio 1.6
                        <br />
                        Rungiri, Kiambu County
                        <br />
                        Kenya
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-metadata mb-6">Follow the Studio</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/mwass_githinji?igsh=dDlyaGxiNXF5Mm4y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-muted text-foreground-muted hover:text-foreground hover:bg-accent rounded-xl shadow-[0_4px_16px rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px rgba(0,0,0,0.25)] transition-all flex items-center gap-3"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                  
                  <button
                    onClick={handleAdminOtpRequest}
                    disabled={otpStatus === 'sent' || otpStatus === 'verifying'}
                    className="p-4 bg-muted text-foreground-muted hover:text-foreground hover:bg-accent rounded-xl shadow-[0_4px_16px rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px rgba(0,0,0,0.25)] transition-all flex items-center justify-center group relative"
                    title="Studio Admin Access"
                  >
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#05a7ef] animate-pulse group-hover:scale-150 transition-transform"></div>
                    
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-foreground-muted group-hover:text-[#05a7ef] transition-colors"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    
                    {(otpStatus === 'sent' || otpStatus === 'verifying') && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-[#05a7ef] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-border shadow-[0_8px_32px rgba(0,0,0,0.25)]">
                <iframe
                  title="Studio Location"
                  src="https://maps.google.com/maps?hl=en&q=Rungiri, Kiambu County&z=14&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  Studio Location
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showAdminOtp && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-cathedral overflow-hidden">
            <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center">
                    <Key className="w-5 h-5 text-[#05a7ef]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Dual-Layer Access</h3>
                    <p className="text-sm text-foreground-muted">Enter both credentials</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAdminOtp(false);
                    setAdminOtp('');
                    setAdminPass('');
                    setOtpError('');
                    setOtpStatus('idle');
                  }}
                  className="p-2 hover:bg-muted rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-foreground-muted" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground-muted mb-2">
                  OTP (8 characters)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={adminOtp}
                    onChange={(e) => setAdminOtp(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8))}
                    onKeyDown={handleOtpKeyPress}
                    placeholder="Enter OTP from WhatsApp"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05a7ef] text-foreground font-mono tracking-widest"
                    autoFocus
                  />
                  {adminOtp && (
                    <button
                      onClick={() => setAdminOtp('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded"
                    >
                      <X className="w-4 h-4 text-foreground-muted" />
                    </button>
                  )}
                </div>
                <div className="mt-1 text-xs text-foreground-subtle">
                  First 8 chars from WhatsApp message
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-muted mb-2">
                  Admin Pass (5 characters)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value.slice(0, 5))}
                    onKeyDown={handleOtpKeyPress}
                    placeholder="Enter ***** passcode"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05a7ef] text-foreground font-mono tracking-widest"
                  />
                  {adminPass && (
                    <button
                      onClick={() => setAdminPass('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded"
                    >
                      <X className="w-4 h-4 text-foreground-muted" />
                    </button>
                  )}
                </div>
                <div className="mt-1 text-xs text-foreground-subtle flex items-center gap-1">
                  <span>Represents the </span>
                  <code className="px-1 py-0.5 bg-muted rounded">*****</code>
                  <span> in WhatsApp message</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/20 border border-border">
                <p className="text-xs text-foreground-muted mb-2">📱 WhatsApp Example:</p>
                <div className="font-mono text-sm bg-background p-3 rounded-lg border border-border">
                  <div className="text-[#05a7ef]">ABC123XY*****</div>
                  <div className="flex justify-between text-xs mt-2">
                    <span>OTP: <span className="text-foreground">ABC123XY</span></span>
                    <span>Pass: <span className="text-foreground">iQM9G</span></span>
                  </div>
                </div>
              </div>

              {otpError && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive-foreground text-center">{otpError}</p>
                </div>
              )}
              
              {otpStatus === 'success' && (
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-sm text-primary-foreground text-center flex items-center justify-center gap-2">
                    <Unlock className="w-4 h-4" />
                    Access granted! Redirecting...
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAdminOtp(false);
                    setAdminOtp('');
                    setAdminPass('');
                    setOtpError('');
                    setOtpStatus('idle');
                  }}
                  className="flex-1 py-3 rounded-xl border border-border text-foreground hover:bg-muted transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOtpVerify}
                  disabled={adminOtp.length !== 8 || !adminPass || otpStatus === 'verifying'}
                  className="flex-1 py-3 rounded-xl bg-[#05a7ef] text-white hover:bg-[#05a7ef]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-medium shadow-deep"
                >
                  {otpStatus === 'verifying' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Unlock className="w-5 h-5" />
                      Access Admin
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border bg-background/50">
              <p className="text-xs text-center text-foreground-subtle">
                🔒 Dual-Layer Security • OTP + Admin Pass Required
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}