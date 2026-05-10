import emailjs from '@emailjs/browser';
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, MapPin, Send, Download, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "pottabathinivineela@gmail.com",
      href: "mailto:pottabathinivineela@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "vineela-pottabathini",
      href: "https://www.linkedin.com/in/vineela-pottabathini",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "pottabathinivineela",
      href: "https://github.com/pottabathinivineela",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hyderabad, Telangana, India",
      href: null,
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_hfc8u27',
        'template_mr20tch',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        '2cdfw2vwE-00RSlPv'
      );

      toast({
        title: "Message Sent!",
        description: "Your message has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>

          <div className="w-24 h-1 bg-primary-gradient mx-auto rounded-full" />

          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Let's connect and discuss opportunities
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">

              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-4 p-4 glass-card-hover group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>

                        <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 glass-card">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>

                        <p className="text-foreground font-medium">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

            </div>

            {/* Resume Button */}
            <Button
              asChild
              size="lg"
              className="w-full bg-primary-gradient hover:opacity-90 transition-all duration-300"
            >
              <a
                href="/Vineela_Pottabathini_Resume.pdf"
                download
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Right Side Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card p-8"
          >

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Name
                </label>

                <Input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>

                <Input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>

                <Textarea
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-primary-gradient hover:opacity-90 transition-all duration-300"
              >
                <Send className="mr-2 h-5 w-5" />

                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;

