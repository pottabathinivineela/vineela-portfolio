import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Rocket, Award, MapPin, Brain, Sparkles, ChevronRight, RotateCcw, Mail } from "lucide-react";

import wehubEmail from "@/assets/wehub-email.jpeg";
import bitsEmail from "@/assets/bits-email.jpeg";
import mrecwEmail from "@/assets/mrecw-email.jpeg";

const FloatingCube = ({ delay, size, x, y }: { delay: number; size: number; x: number; y: number }) => (
  <motion.div
    className="absolute border border-primary/20 rounded-lg"
    style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
    animate={{
      rotateX: [0, 360],
      rotateY: [0, 360],
      y: [0, -30, 0],
      opacity: [0.1, 0.3, 0.1],
    }}
    transition={{
      duration: 8 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// 3D Flip Card that shows email proof on back
const FlipCard = ({
  children,
  emailImage,
  emailSubject,
  index,
  isInView,
}: {
  children: React.ReactNode;
  emailImage: string;
  emailSubject: string;
  index: number;
  isInView: boolean;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="perspective-1000 cursor-pointer h-[320px] md:h-[300px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative group h-full">
            <motion.div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            <div className="relative glass-card p-6 md:p-8 h-full overflow-hidden flex flex-col">
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 70%, hsl(var(--primary)) 0px, transparent 50%)`,
                }}
              />
              {children}
              {/* Flip hint */}
              <div className="mt-auto pt-3 flex items-center gap-2 text-xs text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity">
                <RotateCcw className="w-3 h-3" />
                <span>Click to see proof</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Face - Email Proof */}
        <div
          className="absolute inset-0 rotate-y-180"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="relative group h-full">
            <motion.div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/30 to-primary/30 opacity-50 blur-xl" />
            <div className="relative glass-card h-full overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-card/80">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground truncate">{emailSubject}</span>
                <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                  <RotateCcw className="w-3 h-3" />
                  <span>Flip back</span>
                </div>
              </div>
              {/* Email screenshot */}
              <div className="flex-1 overflow-hidden">
                <img
                  src={emailImage}
                  alt={`Email proof: ${emailSubject}`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Verified badge */}
              <div className="absolute bottom-3 right-3">
                <motion.div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400">Verified</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TiltCard = ({
  children,
  index,
  isInView,
}: {
  children: React.ReactNode;
  index: number;
  isInView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000"
    >
      <div className={`relative group ${isHovered ? "z-10" : "z-0"}`}>
        <motion.div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
        <div className="relative glass-card p-6 md:p-8 h-full overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 70%, hsl(var(--primary)) 0px, transparent 50%)`,
            }}
            animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {children}
        </div>
      </div>
    </motion.div>
  );
};

const milestones = [
  {
    icon: Award,
    title: "WE Hub Campuspreneur Cohort-1",
    description:
      "Selected for a startup development program supported by the Government of Telangana. Out of 112 teams from across the state, successfully cleared all selection rounds.",
    gradient: "from-violet-400 to-purple-600",
    emailImage: wehubEmail,
    emailSubject: "WE HUB: Congratulations! Campuspreneur Cohort - 1",
  },
  {
    icon: MapPin,
    title: "Ground Reality 2026 — BITS Pilani",
    description:
      "Shortlisted for the Mentorship Phase organized by Entrepreneurship Cell, BITS Pilani Hyderabad Campus as part of Launchpad 2026.",
    gradient: "from-cyan-400 to-blue-500",
    emailImage: bitsEmail,
    emailSubject: "Ground Reality 2026 | Mentorship Phase | BITS Pilani",
  },
  {
    icon: Sparkles,
    title: "Startup Yatra — MRECW EDC",
    description:
      "Shortlisted by the MRECW Entrepreneurship Development Cell, recognizing the innovation potential of the idea.",
    gradient: "from-amber-400 to-orange-500",
    emailImage: mrecwEmail,
    emailSubject: "MRECW- Startup Yatra - Result",
  },
];

const StartupSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="startup" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.4, 1], x: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], y: [0, -60, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        {[...Array(8)].map((_, i) => (
          <FloatingCube
            key={i}
            delay={i * 0.5}
            size={12 + Math.random() * 16}
            x={Math.random() * 100}
            y={Math.random() * 100}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -20 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Rocket className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Startup <span className="gradient-text-animated">Experience</span>
          </h2>
          <motion.div
            className="w-24 h-1 bg-primary-gradient mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Hero Card — SafeStreet AI */}
        <TiltCard index={0} isInView={isInView}>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-[1px] shadow-lg flex-shrink-0"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
            </motion.div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Founder & Team Lead — SafeStreet AI
                </h3>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
                  2026 – Present
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Leading the development of SafeStreet AI, a technology-driven solution aimed at improving public safety and smart city monitoring.
              </p>
            </div>
          </div>
        </TiltCard>

        {/* Milestone Flip Cards with Email Proofs */}
        <div className="mt-8 mb-6">
          <motion.p
            className="text-center text-sm text-muted-foreground mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <RotateCcw className="w-3 h-3 text-primary" />
              Click any card to see the official email proof
            </span>
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {milestones.map((item, index) => (
            <FlipCard
              key={item.title}
              emailImage={item.emailImage}
              emailSubject={item.emailSubject}
              index={index + 1}
              isInView={isInView}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-[1px] shadow-lg flex-shrink-0`}
                    whileHover={{ rotateY: 180, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                  </motion.div>
                  <h3 className="font-heading font-semibold text-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground flex-1">{item.description}</p>
              </div>
            </FlipCard>
          ))}
        </div>

        {/* AI-Based Product Development card */}
        <div className="mt-6">
          <TiltCard index={5} isInView={isInView}>
            <div className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 p-[1px] shadow-lg flex-shrink-0"
                whileHover={{ rotateY: 180, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
              </motion.div>
              <div className="relative z-10">
                <h3 className="font-heading font-semibold text-foreground mb-1 flex items-center gap-1 group-hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                  AI-Based Product Development
                </h3>
                <p className="text-sm text-muted-foreground">
                  Working on AI-based solutions, product development, and startup strategy while collaborating with mentors and entrepreneurship programs.
                </p>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <motion.div
            className="w-3 h-3 rounded-full bg-primary"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default StartupSection;
