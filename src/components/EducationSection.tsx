import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, Award, Star, BookOpen, Code, Cpu } from "lucide-react";

// 3D Floating Element Component
const FloatingElement = ({ delay, duration, children, className }: { delay: number; duration: number; children: React.ReactNode; className?: string }) => (
  <motion.div
    animate={{
      y: [0, -15, 0],
      rotateY: [0, 180, 360],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// 3D Orbit Ring Component
const OrbitRing = ({ size, duration, delay, children }: { size: number; duration: number; delay: number; children?: React.ReactNode }) => (
  <motion.div
    className="absolute rounded-full border border-primary/20"
    style={{ width: size, height: size }}
    animate={{ rotate: 360 }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
  >
    {children}
  </motion.div>
);

// 3D Current Status Visualization
const CurrentStatusVisualization = () => {
  const icons = [
    { Icon: Code, color: "text-cyan-400", label: "Coding" },
    { Icon: BookOpen, color: "text-emerald-400", label: "Learning" },
    { Icon: Cpu, color: "text-purple-400", label: "Building" },
  ];

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Central Graduation Cap */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ 
          rotateY: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative">
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-primary/30 rounded-full blur-xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 80, height: 80, marginLeft: -10, marginTop: -10 }}
          />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-2xl relative z-10">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
      </motion.div>

      {/* Orbit Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <OrbitRing size={140} duration={6} delay={0}>
          <motion.div 
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-500/80 flex items-center justify-center shadow-lg shadow-cyan-500/30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Code className="w-3 h-3 text-white" />
          </motion.div>
        </OrbitRing>

        <OrbitRing size={200} duration={10} delay={0.5}>
          <motion.div 
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-emerald-500/80 flex items-center justify-center shadow-lg shadow-emerald-500/30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            <BookOpen className="w-3 h-3 text-white" />
          </motion.div>
        </OrbitRing>

        <OrbitRing size={240} duration={14} delay={1}>
          <motion.div 
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-purple-500/80 flex items-center justify-center shadow-lg shadow-purple-500/30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          >
            <Cpu className="w-3 h-3 text-white" />
          </motion.div>
        </OrbitRing>
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/40"
          style={{
            left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
            top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Progress Arc */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <motion.circle
          cx="128"
          cy="128"
          r="118"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="740"
          initial={{ strokeDashoffset: 740 }}
          animate={{ strokeDashoffset: 185 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const education = [
    {
      degree: "B.Tech – Computer Science Engineering",
      institution: "Malla Reddy Engineering College for Women, Hyderabad",
      period: "2024 – 2028",
      status: "Currently pursuing 2nd year",
      score: "CGPA: 9.55 / 10",
      icon: GraduationCap,
      highlight: true,
      progress: 25,
    },
    {
      degree: "Intermediate (Class XII)",
      institution: "Sri Chaitanya Junior Kalasala",
      period: "2022 – 2024",
      score: "Percentage: 93%",
      icon: Award,
      highlight: false,
      progress: 100,
    },
    {
      degree: "Secondary School (SSC)",
      institution: "Krishnaveni Talent School",
      period: "2022",
      score: "CGPA: 10 / 10",
      icon: Star,
      highlight: false,
      progress: 100,
    },
  ];

  return (
    <section id="education" className="section-padding relative bg-secondary/30 overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="w-24 h-1 bg-primary-gradient mx-auto rounded-full" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Visualization for Current Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <CurrentStatusVisualization />
              
              {/* Status Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-center mt-8"
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    Currently Pursuing B.Tech CSE
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mt-3">
                  2nd Year • Expected Graduation: 2028
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Education Cards */}
          <div className="order-1 lg:order-2 space-y-6">
            {education.map((item, index) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: hoveredCard === index ? "translateZ(20px)" : "translateZ(0)",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`glass-card p-6 relative overflow-hidden group ${
                    item.highlight ? "border-primary/30 shadow-lg shadow-primary/10" : ""
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {item.highlight && (
                    <>
                      {/* Animated Current Badge */}
                      <motion.div
                        className="absolute top-0 right-0 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs px-4 py-1.5 rounded-bl-lg font-medium"
                        animate={{ 
                          boxShadow: ["0 0 10px hsl(var(--primary)/0.5)", "0 0 20px hsl(var(--primary)/0.8)", "0 0 10px hsl(var(--primary)/0.5)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="flex items-center gap-1.5">
                          <motion.span
                            className="w-2 h-2 rounded-full bg-white/80"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          In Progress
                        </span>
                      </motion.div>

                      {/* Progress Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${item.progress}%` } : {}}
                          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="flex items-start gap-4">
                    {/* 3D Icon */}
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 relative"
                      whileHover={{ rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <motion.div
                        animate={item.highlight ? { 
                          rotateY: [0, 360],
                        } : {}}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <item.icon className="w-7 h-7 text-primary" />
                      </motion.div>
                      
                      {/* Glow effect for current */}
                      {item.highlight && (
                        <motion.div
                          className="absolute inset-0 bg-primary/20 rounded-xl blur-lg"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs text-muted-foreground font-medium px-2 py-0.5 rounded-full bg-secondary">
                          {item.period}
                        </span>
                      </div>

                      <h3 className="font-heading text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.degree}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">{item.institution}</p>
                      
                      {item.status && (
                        <motion.p 
                          className="text-sm text-accent mb-2 flex items-center gap-2"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {item.status}
                        </motion.p>
                      )}
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                        <Star className="w-4 h-4" />
                        {item.score}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;