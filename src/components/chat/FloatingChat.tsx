// src/components/chat/FloatingChat.tsx
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';
import { whatsappService, WhatsAppContext } from '@/services/whatsappService';

// Smart WhatsApp Service for Studio 1.6
class StudioWhatsAppService {
  private static instance: StudioWhatsAppService;
  
  static getInstance(): StudioWhatsAppService {
    if (!StudioWhatsAppService.instance) {
      StudioWhatsAppService.instance = new StudioWhatsAppService();
    }
    return StudioWhatsAppService.instance;
  }

  // Studio 1.6 WhatsApp Number
  private readonly phoneNumber = '254724049148'; // Studio 1.6 number - UPDATE THIS

  // SMART WhatsApp deep link that works on all devices
  openWhatsAppDirectly(message: string): void {
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp deep link URLs
    const whatsappAppUrl = `whatsapp://send?phone=${this.phoneNumber}&text=${encodedMessage}`;
    const whatsappWebUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    
    // Detect device type
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // MOBILE DEVICE - Try to open WhatsApp app directly
      console.log('📱 Mobile device detected - attempting to open WhatsApp app');
      
      // Method 1: Create timeout to detect if WhatsApp opened
      let whatsappOpened = false;
      
      // Store original location
      const originalLocation = window.location.href;
      
      // Try to open WhatsApp directly
      window.location.href = whatsappAppUrl;
      
      // Set a timeout to check if we're still on the same page
      setTimeout(() => {
        if (window.location.href === originalLocation && !whatsappOpened) {
          console.log('❌ WhatsApp app not detected, falling back to web');
          // WhatsApp not installed - open web version
          window.open(whatsappWebUrl, '_blank', 'noopener,noreferrer');
        }
      }, 500);
      
      // Method 2: Create invisible iframe as backup
      setTimeout(() => {
        try {
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.style.visibility = 'hidden';
          iframe.src = whatsappAppUrl;
          
          iframe.onload = () => {
            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 1000);
          };
          
          document.body.appendChild(iframe);
        } catch (error) {
          console.log('Iframe method failed, using web fallback');
          window.open(whatsappWebUrl, '_blank', 'noopener,noreferrer');
        }
      }, 100);
      
    } else {
      // DESKTOP DEVICE - Always open WhatsApp Web
      console.log('💻 Desktop device detected - opening WhatsApp Web');
      window.open(whatsappWebUrl, '_blank', 'noopener,noreferrer');
    }
  }

  // For users without WhatsApp - open download page
  openWhatsAppDownload(): void {
    const whatsappDownloadUrl = 'https://www.whatsapp.com/download';
    window.open(whatsappDownloadUrl, '_blank', 'noopener,noreferrer');
  }

  // Check if WhatsApp might be installed (mobile detection)
  isLikelyMobileWithWhatsApp(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }
}

const studioWhatsAppService = StudioWhatsAppService.getInstance();

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [context, setContext] = useState<WhatsAppContext | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check device type on mount
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    
    const handleGlobalOpen = () => {
      const currentContext = whatsappService.getContext();
      setContext(currentContext);
      
      const newMessage = whatsappService.generateWhatsAppMessage();
      setMessage(newMessage);
      setIsOpen(true);
    };

    window.addEventListener('open-floating-chat', handleGlobalOpen);

    whatsappService.onFormOpen((ctx: WhatsAppContext) => {
      setContext(ctx);
      const newMessage = whatsappService.generateWhatsAppMessage();
      setMessage(newMessage);
      setIsOpen(true);
    });

    return () => {
      window.removeEventListener('open-floating-chat', handleGlobalOpen);
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      studioWhatsAppService.openWhatsAppDirectly(message);
      setIsOpen(false);
      setMessage('');
      setContext(null);
    }
  };

  // New: Alternative send method with WhatsApp detection
  const handleSmartSend = () => {
    if (!message.trim()) return;
    
    if (isMobile) {
      // On mobile - try to open WhatsApp directly
      studioWhatsAppService.openWhatsAppDirectly(message);
    } else {
      // On desktop - open WhatsApp Web
      studioWhatsAppService.openWhatsAppDirectly(message);
    }
    
    setIsOpen(false);
    setMessage('');
    setContext(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    whatsappService.clearContext();
    setContext(null);
    setMessage('');
  };

  // Prefill message handlers
  const handleAcquisition = () => {
    const msg = "Hello Mwass, I'm interested in acquiring artwork from Studio 1.6.";
    setMessage(msg);
  };

  const handleCommission = () => {
    const msg = "Hello Mwass, I'm interested in commissioning a new artwork.";
    setMessage(msg);
  };

  const handleGeneral = () => {
    const msg = "Hello Mwass, I have a general inquiry about Studio 1.6.";
    setMessage(msg);
  };

  // WhatsApp download for users without it
  const handleDownloadWhatsApp = () => {
    studioWhatsAppService.openWhatsAppDownload();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="chat-button fixed bottom-8 right-8 z-50 p-5 rounded-2xl bg-background border border-border shadow-deep hover:shadow-cathedral transition-all duration-300 group"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        <MessageCircle className="w-7 h-7 text-foreground group-hover:scale-110 transition-transform" />
      </button>

      {/* Chat Window - FIXED with scroll and proper sizing */}
      {isOpen && (
        <div className="chat-window fixed bottom-28 right-8 z-50 w-[420px] max-w-[calc(100vw-4rem)] max-h-[75vh] rounded-2xl bg-card border border-border shadow-cathedral animate-rise overflow-hidden flex flex-col">
          {/* Header - With Artist Image */}
          <div className="p-6 border-b border-border flex-shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* Artist Image Placeholder */}
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-border shadow-deep flex-shrink-0">
                  <img 
                    src="/images/mwasschat.png" 
                    alt="Mwass Githinji" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-light tracking-tight text-foreground">Studio 1.6</h2>
                  <h3 className="text-lg font-medium text-foreground-muted mt-0.5">MWASS GITHINJI</h3>
                  <p className="text-sm text-foreground-subtle mt-2 leading-relaxed">
                    For acquisitions, commissions, exhibitions, or general inquiries—connect with Studio 1.6 directly on WhatsApp.
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-muted rounded-xl transition-colors ml-2 flex-shrink-0"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-foreground-muted" />
              </button>
            </div>
          </div>

          {/* Context Display */}
          {context && context.type === 'artwork-inquiry' && (
            <div className="px-6 py-4 bg-primary/5 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-foreground-muted">Inquiring about:</span>
                <span className="text-sm font-medium text-foreground">
                  {context.artworkTitle} ({context.artworkYear})
                </span>
              </div>
            </div>
          )}

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-6 scroll-down">
            {/* Textarea */}
            <div className="mb-6">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="textbox-deep w-full min-h-[120px] p-4 placeholder:text-foreground-subtle resize-none focus:outline-none"
                placeholder="Type your message..."
              />
            </div>

            {/* SMART Send Button with Device Detection */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleSmartSend}
                disabled={!message.trim()}
                className="btn-tall w-full py-4 text-foreground hover:lift-up disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 text-lg font-medium"
              >
                <Send className="w-6 h-6" />
                {isMobile ? '📱 CHAT ON WHATSAPP' : '💻 OPEN WHATSAPP WEB'}
                <ChevronRight className="w-5 h-5 opacity-70" />
              </button>
              
              {/* WhatsApp Download for New Users */}
              <button
                onClick={handleDownloadWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-muted/30 text-foreground-muted hover:bg-muted/50 transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <span className="text-xs">Don't have WhatsApp?</span>
                <span className="font-medium text-foreground">Download Here</span>
              </button>
            </div>

            {/* Quick Links */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-foreground-muted mb-4 uppercase tracking-widest">
                QUICK LINKS
              </h4>
              <div className="space-y-3">
                <button
                  onClick={handleAcquisition}
                  className="btn-tall w-full py-4 px-6 text-left hover:lift-up transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="font-medium text-foreground">ACQUISITIONS</span>
                  <ChevronRight className="w-4 h-4 text-foreground-muted group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleCommission}
                  className="btn-tall w-full py-4 px-6 text-left hover:lift-up transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="font-medium text-foreground">COMMISSIONS</span>
                  <ChevronRight className="w-4 h-4 text-foreground-muted group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleGeneral}
                  className="btn-tall w-full py-4 px-6 text-left hover:lift-up transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="font-medium text-foreground">INQUIRY</span>
                  <ChevronRight className="w-4 h-4 text-foreground-muted group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Footer Info */}
            <div className="pt-6 border-t border-border">
              <p className="text-xs text-center text-foreground-subtle">
                {isMobile ? '📱 Opens WhatsApp directly on your phone' : '💻 Opens WhatsApp Web in new tab'}
              </p>
              <p className="text-xs text-center text-foreground-subtle mt-1">
                {isMobile ? 'Message opens directly in WhatsApp app' : 'Requires WhatsApp Web or desktop app'}
              </p>
              <div className="mt-2 flex items-center justify-center gap-4 text-[10px] text-foreground-muted">
                <span>Studio 1.6 WhatsApp</span>
                <span>•</span>
                <span>24-hour response</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
