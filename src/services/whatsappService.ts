// src/services/whatsappService.ts

export type WhatsAppContext = {
  type: 'studio-appointment' | 'artwork-inquiry' | 'general';
  artworkTitle?: string;
  artworkYear?: number;
  artworkSeries?: string;
  prefillMessage?: string;
  fromStudio?: boolean;
  fromExhibition?: boolean;
};

class WhatsAppService {
  private context: WhatsAppContext | null = null;
  private formOpenCallback: ((context: WhatsAppContext) => void) | null = null;

  // Set the context for the next WhatsApp message
  setContext(context: WhatsAppContext) {
    this.context = context;
    
    // Store in localStorage for persistence
    if (context.type === 'artwork-inquiry') {
      const message = `Hello Mwass, I'm interested in "${context.artworkTitle}" (${context.artworkYear})${context.artworkSeries ? ` from the ${context.artworkSeries} Series` : ''}.`;
      localStorage.setItem('artworkChatMessage', message);
      
      localStorage.setItem('artworkChatContext', JSON.stringify({
        title: context.artworkTitle,
        year: context.artworkYear,
        series: context.artworkSeries
      }));
      
      // Clear studio context to prevent conflicts
      localStorage.removeItem('studioChatMessage');
    } else {
      const message = context.prefillMessage || 
                     (context.type === 'studio-appointment' 
                       ? "Hello Mwass, I'd like to book an appointment to visit Studio 1.6." 
                       : "Hello Mwass, I'm reaching out regarding Studio 1.6.");
      
      localStorage.setItem('studioChatMessage', message);
      
      // Clear artwork context to prevent conflicts
      localStorage.removeItem('artworkChatMessage');
      localStorage.removeItem('artworkChatContext');
    }
    
    // Dispatch global event to open FloatingChat
    window.dispatchEvent(new CustomEvent('open-floating-chat'));
  }

  // Get the current context
  getContext(): WhatsAppContext | null {
    return this.context;
  }

  // Clear the context
  clearContext() {
    this.context = null;
    localStorage.removeItem('artworkChatMessage');
    localStorage.removeItem('artworkChatContext');
    localStorage.removeItem('studioChatMessage');
  }

  // Generate WhatsApp message based on context
  generateWhatsAppMessage(): string {
    const storedMessage = localStorage.getItem('artworkChatMessage');
    const studioMessage = localStorage.getItem('studioChatMessage');
    
    if (storedMessage) return storedMessage;
    if (studioMessage) return studioMessage;
    return "Hello Mwass, I'm reaching out regarding Studio 1.6.";
  }

  // Open WhatsApp directly
  openWhatsAppDirectly(customMessage?: string) {
    const phoneNumber = "254724049148";
    const message = customMessage || this.generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, "")}?text=${encodedMessage}`;

    this.clearContext();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  // Register callback to open FloatingChat form with context
  onFormOpen(callback: (context: WhatsAppContext) => void) {
    this.formOpenCallback = callback;
  }

  // Trigger FloatingChat form to open with context
  triggerFormOpen(context: WhatsAppContext) {
    this.setContext(context);
    
    if (this.formOpenCallback) {
      this.formOpenCallback(context);
    } else {
      // Fallback to global event
      setTimeout(() => {
        const chatButton = document.querySelector('.chat-button') as HTMLElement;
        if (chatButton) {
          chatButton.click();
        }
      }, 50);
    }
  }

  // Method for buttons to use - MAIN ENTRY POINT
  handleWhatsAppClick(context: WhatsAppContext) {
    this.triggerFormOpen(context);
  }
}

// Export a singleton instance
export const whatsappService = new WhatsAppService();