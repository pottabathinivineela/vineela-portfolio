import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import StartupSection from "@/components/StartupSection";
import InternshipsSection from "@/components/InternshipsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
const Index = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleExplore = () => {
    setIsRevealed(true);
    setTimeout(() => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <Helmet>
        <title>Pottabathini Vineela | CS Engineering Student & Aspiring Software Developer</title>
        <meta
          name="description"
          content="Portfolio of Pottabathini Vineela - Computer Science Engineering Student at Malla Reddy Engineering College, Hyderabad. Aspiring Software & AI Developer with expertise in Java, Python, and Machine Learning."
        />
        <meta
          name="keywords"
          content="Pottabathini Vineela, Computer Science, Software Developer, AI Developer, Hyderabad, Portfolio, Java, Python, Machine Learning"
        />
        <meta property="og:title" content="Pottabathini Vineela | Portfolio" />
        <meta
          property="og:description"
          content="Computer Science Engineering Student | Aspiring Software & AI Developer"
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://vineela-portfolio.lovable.app" />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Hero Section - Always visible */}
        <HeroSection onExplore={handleExplore} isRevealed={isRevealed} />

        {/* Content sections - revealed after clicking "Explore More" */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Navigation />
              <AboutSection />
              <EducationSection />
              <SkillsSection />
              <ProjectShowcase />
              <StartupSection />
              <InternshipsSection />
              <CertificationsSection />
              <ContactSection />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Index;
