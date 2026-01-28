import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SculpturalButton } from "@/components/ui/SculpturalButton";
import { Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully. We'll respond within 48 hours.");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/mwass_githinji?igsh=dDlyaGxiNXF5Mm4y",
      icon: Instagram,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/studio16art",
      icon: Twitter,
    },
    {
      name: "Email",
      href: "mailto:studio@mwassgithinji.com",
      icon: Mail,
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="section-sacred bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-metadata mb-6 animate-fade-in opacity-0 stagger-1">
              Get in Touch
            </p>
            <h1 className="text-foreground mb-8 animate-rise opacity-0 stagger-2">
              Contact
            </h1>
            <p className="text-xl text-foreground-muted font-light leading-relaxed animate-fade-in opacity-0 stagger-3">
              For acquisitions, commissions, exhibitions, or general
              inquiries—the studio welcomes your correspondence.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-sacred bg-background-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <div className="mb-8">
                <p className="text-metadata mb-4">Send a Message</p>
                <h2 className="text-foreground">Enquiry Form</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-metadata mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-colors engraved"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-metadata mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-colors engraved"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-metadata mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-colors resize-none engraved"
                    placeholder="Your message..."
                  />
                </div>

                <SculpturalButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </SculpturalButton>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-12">
              {/* Direct Contact */}
              <div>
                <p className="text-metadata mb-4">Direct Contact</p>
                <h2 className="text-foreground mb-8">
                  Studio Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="buttonized p-3 bg-muted">
                      <Mail size={20} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-metadata mb-1">Email</p>
                      <a
                        href="mailto:studio@mwassgithinji.com"
                        className="text-foreground hover:text-foreground-muted transition-colors"
                      >
                        studio@mwassgithinji.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="buttonized p-3 bg-muted">
                      <Phone size={20} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-metadata mb-1">Phone</p>
                      <a
                        href="tel:+254700000000"
                        className="text-foreground hover:text-foreground-muted transition-colors"
                      >
                        +254 797 227 376
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="buttonized p-3 bg-muted">
                      <MapPin size={20} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-metadata mb-1">
                        Studio Address
                      </p>
                      <p className="text-foreground">
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

              {/* Social */}
              <div>
                <p className="text-metadata mb-6">
                  Follow the Studio
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="buttonized p-4 bg-muted text-foreground-muted hover:text-foreground hover:bg-accent"
                      aria-label={social.name}
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Google Map */}
              <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-border">
                <iframe
                  title="Studio Location"
                  src="https://maps.google.com/maps?hl=en&q=Rungiri, Kiambu County&z=14&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
