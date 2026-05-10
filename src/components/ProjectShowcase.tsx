import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Shield, Brain, MapPin, X, Target, Lightbulb, Code, Rocket, 
  Zap, Eye, Lock, Globe, AlertTriangle, CheckCircle, Users,
  Layers, Cpu, TrendingUp, Award, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  hackathon: string;
  role: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  shortDesc: string;
  problem: {
    statement: string;
    points: string[];
  };
  solution: {
    description: string;
    features: { icon: React.ElementType; title: string; desc: string }[];
  };
  innovation: { title: string; desc: string }[];
  techStack: { name: string; category: string }[];
  methodology?: string[];
  impact: string[];
  futureScope: string[];
}

const projects: Project[] = [
  {
    id: "phishguard",
    title: "PhishGuard",
    subtitle: "AI-Powered Phishing Detection System",
    hackathon: "Idea Hack 1.0",
    role: "Team Leader",
    icon: Shield,
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    glowColor: "rgba(20, 184, 166, 0.4)",
    shortDesc: "Real-time phishing detection with dynamic safety scoring",
    problem: {
      statement: "Phishing attacks are rapidly increasing and target students and professionals through fake websites, emails, and SMS messages.",
      points: [
        "Lack of real-time phishing detection tools",
        "Evolving phishing techniques bypass traditional filters",
        "Limited and outdated security datasets",
        "Users can't understand why a link is dangerous"
      ]
    },
    solution: {
      description: "PhishGuard is an AI-powered real-time phishing detection system that scans URLs, emails, and messages instantly to protect users.",
      features: [
        { icon: Zap, title: "Instant Scanning", desc: "Real-time analysis of URLs, emails & messages" },
        { icon: Brain, title: "ML & NLP Detection", desc: "Detects malicious patterns using advanced AI" },
        { icon: TrendingUp, title: "Safety Score", desc: "Dynamic 0-100% safety scoring system" },
        { icon: AlertTriangle, title: "Visual Alerts", desc: "Clear warnings with threat explanations" }
      ]
    },
    innovation: [
      { title: "Multi-Modal Analysis", desc: "Analyzes both URL structure and website text content simultaneously" },
      { title: "NLP Content Analysis", desc: "Detects urgency signals like 'Urgent', 'Suspend', 'Verify Now'" },
      { title: "Dynamic Safety Scoring", desc: "Green (Safe) → Yellow (Suspicious) → Red (Phishing)" },
      { title: "Zero-Day Protection", desc: "Detects previously unseen phishing sites" },
      { title: "Client-Side Privacy", desc: "User browsing data never leaves the device" }
    ],
    techStack: [
      { name: "Python", category: "Language" },
      { name: "Machine Learning", category: "AI" },
      { name: "NLP", category: "AI" },
      { name: "TensorFlow", category: "Framework" },
      { name: "Scikit-learn", category: "Framework" },
      { name: "Flask", category: "Backend" }
    ],
    impact: [
      "Prevents credential theft and account takeovers",
      "Blocks malicious downloads before execution",
      "Educates users through real-time explanations",
      "Reduces financial and data-loss risks"
    ],
    futureScope: [
      "Detect phishing in images, videos, and voice",
      "Deepfake detection using Computer Vision & Audio Forensics",
      "Browser extension & mobile app integration",
      "Enterprise-grade API for organizations"
    ]
  },
  {
    id: "xaid",
    title: "XAID",
    subtitle: "Explainable AI for Misinformation Detection",
    hackathon: "International Hackathon",
    role: "Team Leader",
    icon: Brain,
    color: "from-purple-500 via-violet-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.4)",
    shortDesc: "Transparent AI moderation with explainable decisions",
    problem: {
      statement: "Social media platforms are flooded with misinformation, and traditional AI moderation systems act as black boxes.",
      points: [
        "Users don't understand why content is flagged",
        "Bias and unfair moderation can occur",
        "Lack of transparency reduces trust in AI",
        "No accountability for AI decisions"
      ]
    },
    solution: {
      description: "XAID is an AI-based moderation system that detects misinformation and clearly explains why content is flagged.",
      features: [
        { icon: Eye, title: "Transparent Decisions", desc: "Clear explanations for every AI decision" },
        { icon: Brain, title: "BERT-based NLP", desc: "State-of-the-art language understanding" },
        { icon: CheckCircle, title: "Ethical AI", desc: "Bias detection and fairness evaluation" },
        { icon: Users, title: "User Dashboard", desc: "Interactive interface for content analysis" }
      ]
    },
    innovation: [
      { title: "Word-Level Importance", desc: "Highlights exactly which words triggered the decision" },
      { title: "SHAP/LIME Integration", desc: "Industry-standard explainability frameworks" },
      { title: "Fairness Metrics", desc: "Built-in bias detection using Fairlearn" },
      { title: "Interactive Visualization", desc: "Visual representation of AI reasoning" }
    ],
    techStack: [
      { name: "Python", category: "Language" },
      { name: "BERT", category: "Model" },
      { name: "TensorFlow", category: "Framework" },
      { name: "PyTorch", category: "Framework" },
      { name: "SHAP", category: "Explainability" },
      { name: "LIME", category: "Explainability" },
      { name: "Fairlearn", category: "Ethics" },
      { name: "Streamlit", category: "Frontend" }
    ],
    methodology: [
      "Data collection (real & fake news datasets)",
      "Text preprocessing & tokenization",
      "BERT model fine-tuning",
      "Explainability layer implementation",
      "Bias and fairness evaluation",
      "Interactive dashboard development"
    ],
    impact: [
      "Improves trust in AI moderation systems",
      "Reduces spread of misinformation on platforms",
      "Promotes ethical AI usage and accountability",
      "Enhances transparency for users and platforms"
    ],
    futureScope: [
      "Multi-language misinformation detection",
      "Real-time social media integration",
      "Cross-platform content analysis API",
      "Community-driven fact-checking integration"
    ]
  },
  {
    id: "tourmate",
    title: "TourMate",
    subtitle: "Smart Tourist Safety Monitoring System",
    hackathon: "Smart India Hackathon 2025",
    role: "Participant",
    icon: MapPin,
    color: "from-orange-500 via-amber-500 to-yellow-500",
    glowColor: "rgba(249, 115, 22, 0.4)",
    shortDesc: "AI-enabled tourist safety with blockchain identity",
    problem: {
      statement: "Tourists face safety risks due to inadequate real-time monitoring and coordination between authorities.",
      points: [
        "Lack of real-time location monitoring",
        "Delayed emergency response systems",
        "Poor coordination between authorities",
        "No secure digital identity system for tourists"
      ]
    },
    solution: {
      description: "TourMate is an AI-enabled tourist safety platform with real-time tracking, geo-fencing, and blockchain-based identity.",
      features: [
        { icon: MapPin, title: "Real-time Tracking", desc: "Live location monitoring for tourist safety" },
        { icon: Lock, title: "Blockchain Identity", desc: "Secure digital tourist identity management" },
        { icon: Cpu, title: "AI Incident Detection", desc: "Automated threat detection and alerts" },
        { icon: Globe, title: "Multi-language", desc: "Support for international tourists" }
      ]
    },
    innovation: [
      { title: "Geo-fencing Alerts", desc: "Automatic warnings when entering unsafe zones" },
      { title: "IoT Integration", desc: "Wearables and smart bands for elderly tourists" },
      { title: "Authority Dashboard", desc: "Real-time police and emergency coordination" },
      { title: "Modular Architecture", desc: "Scalable system for city-wide deployment" }
    ],
    techStack: [
      { name: "Python", category: "Language" },
      { name: "Machine Learning", category: "AI" },
      { name: "Blockchain", category: "Security" },
      { name: "IoT", category: "Hardware" },
      { name: "React", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "MongoDB", category: "Database" }
    ],
    impact: [
      "Faster emergency response times",
      "Improved tourist confidence and safety",
      "Better evidence logging for incidents",
      "Data-driven policing and resource allocation",
      "Boost to tourism ecosystem and economy"
    ],
    futureScope: [
      "Nationwide deployment across tourist destinations",
      "Integration with smart city infrastructure",
      "Predictive safety analytics using historical data",
      "AR-based navigation and safety guidance"
    ]
  }
];

// Floating particle component
const FloatingParticle = ({ delay, duration, size, x, y }: { delay: number; duration: number; size: number; x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20"
    style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -30, 0],
      x: [0, 10, 0],
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// 3D Card Component with mouse tracking
const Card3D = ({ project, index, onClick, isInView }: { project: Project; index: number; onClick: () => void; isInView: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });
  const translateZ = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    translateZ.set(50);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    translateZ.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        className="relative cursor-pointer group"
      >
        {/* Glow effect behind card */}
        <motion.div
          className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ background: `radial-gradient(circle at center, ${project.glowColor}, transparent 70%)` }}
        />

        {/* Main card */}
        <div className="relative glass-card p-6 h-full overflow-hidden border border-border/50 group-hover:border-primary/30 transition-colors duration-500">
          {/* Animated gradient overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          />

          {/* Floating orbs inside card */}
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-xl group-hover:scale-150 transition-transform duration-700" />

          <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(40px)" }}>
            {/* Icon with 3D effect */}
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-5 shadow-lg`}
              style={{ transform: "translateZ(60px)" }}
              whileHover={{ scale: 1.1, rotateZ: 5 }}
            >
              <project.icon className="w-8 h-8 text-white" />
            </motion.div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3" style={{ transform: "translateZ(30px)" }}>
              <motion.span
                className="px-2.5 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                {project.hackathon}
              </motion.span>
              {project.role === "Team Leader" && (
                <motion.span
                  className="px-2.5 py-1 text-xs font-semibold bg-accent/20 text-accent rounded-full backdrop-blur-sm flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-3 h-3" />
                  {project.role}
                </motion.span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-heading text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {project.subtitle}
            </p>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-5 flex-grow line-clamp-2">
              {project.shortDesc}
            </p>

            {/* Tech badges with stagger animation */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.slice(0, 4).map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.2 + i * 0.1 + 0.5 }}
                  className="px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground font-medium"
                >
                  {tech.name}
                </motion.span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground font-medium">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* CTA with animated arrow */}
            <div className="flex items-center gap-2 text-primary font-medium pt-4 border-t border-border/50">
              <span className="text-sm">Explore Project</span>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center"
              >
                <span className="text-lg">→</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="section-padding relative overflow-hidden bg-secondary/20" ref={ref}>
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingParticle delay={0} duration={6} size={8} x={10} y={20} />
          <FloatingParticle delay={1} duration={8} size={12} x={85} y={30} />
          <FloatingParticle delay={2} duration={7} size={6} x={50} y={70} />
          <FloatingParticle delay={0.5} duration={9} size={10} x={25} y={80} />
          <FloatingParticle delay={1.5} duration={5} size={8} x={75} y={60} />
          
          {/* Large gradient orbs */}
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header with 3D effect */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -20 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-block mb-4"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                <Rocket className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">Projects & Hackathons</span>
            </h2>
            
            <motion.div 
              className="w-32 h-1.5 bg-primary-gradient mx-auto rounded-full mb-6"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Innovative solutions built through collaborative development and competitive hackathons
            </p>
          </motion.div>

          {/* Project Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card3D
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
          >
            {/* Animated background for modal */}
            <div className="fixed inset-0 pointer-events-none">
              <motion.div
                className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20`}
                style={{ background: `linear-gradient(to right, ${selectedProject.glowColor}, transparent)` }}
                animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 15, repeat: Infinity }}
              />
              <motion.div
                className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20`}
                style={{ background: `linear-gradient(to left, ${selectedProject.glowColor}, transparent)` }}
                animate={{ scale: [1.3, 1, 1.3], rotate: [0, -90, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 100, rotateX: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-4xl relative my-auto border border-border/50"
            >
              {/* Gradient border effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${selectedProject.color} opacity-10`} />

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 bg-background/50 hover:bg-background/80 backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="relative p-6 md:p-8 lg:p-10">
                {/* Header with 3D icon */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col md:flex-row md:items-start gap-5 mb-10"
                >
                  <motion.div
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${selectedProject.color} flex items-center justify-center shrink-0 shadow-2xl`}
                    animate={{ rotateY: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <selectedProject.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </motion.div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="px-3 py-1.5 text-sm font-medium bg-primary/20 text-primary rounded-full"
                      >
                        {selectedProject.hackathon}
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="px-3 py-1.5 text-sm font-medium bg-accent/20 text-accent rounded-full flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        {selectedProject.role}
                      </motion.span>
                    </div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2"
                    >
                      {selectedProject.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg text-muted-foreground"
                    >
                      {selectedProject.subtitle}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Content Sections with staggered animations */}
                <div className="space-y-8">
                  {/* Problem Statement */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative bg-destructive/5 rounded-2xl p-6 border border-destructive/20 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-full blur-3xl" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <AlertTriangle className="w-6 h-6 text-destructive" />
                        </motion.div>
                        <h4 className="font-heading text-xl font-bold text-foreground">Problem Statement</h4>
                      </div>
                      <p className="text-muted-foreground mb-4">{selectedProject.problem.statement}</p>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {selectedProject.problem.points.map((point, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-start gap-2 text-sm text-muted-foreground bg-background/50 rounded-lg p-3"
                          >
                            <span className="text-destructive font-bold">✗</span>
                            {point}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Proposed Solution */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                      >
                        <Lightbulb className="w-6 h-6 text-primary" />
                      </motion.div>
                      <h4 className="font-heading text-xl font-bold text-foreground">Proposed Solution</h4>
                    </div>
                    <p className="text-muted-foreground mb-5">{selectedProject.solution.description}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedProject.solution.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          whileHover={{ scale: 1.03, y: -5 }}
                          className="glass-card p-4 flex items-start gap-3 border border-border/50"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedProject.color} flex items-center justify-center shrink-0`}>
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-foreground">{feature.title}</h5>
                            <p className="text-xs text-muted-foreground">{feature.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Innovation & Core Features */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="w-6 h-6 text-accent" />
                      </motion.div>
                      <h4 className="font-heading text-xl font-bold text-foreground">Innovation & Core Features</h4>
                    </div>
                    <div className="grid gap-3">
                      {selectedProject.innovation.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.08 }}
                          whileHover={{ scale: 1.02, x: 10 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/10 backdrop-blur-sm"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          </motion.div>
                          <div>
                            <span className="font-semibold text-foreground">{item.title}</span>
                            <span className="text-muted-foreground"> — {item.desc}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Methodology Timeline */}
                  {selectedProject.methodology && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Layers className="w-6 h-6 text-primary" />
                        </motion.div>
                        <h4 className="font-heading text-xl font-bold text-foreground">Methodology</h4>
                      </div>
                      <div className="relative pl-6">
                        <motion.div
                          className="absolute left-2 top-0 bottom-0 w-1 rounded-full"
                          style={{ background: `linear-gradient(to bottom, ${selectedProject.glowColor}, transparent)` }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                        <div className="space-y-4">
                          {selectedProject.methodology.map((step, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + i * 0.1 }}
                              className="flex items-center gap-4"
                            >
                              <motion.div
                                className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedProject.color} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-lg`}
                                whileHover={{ scale: 1.2 }}
                              >
                                {i + 1}
                              </motion.div>
                              <span className="text-muted-foreground bg-background/50 rounded-lg px-4 py-2 flex-grow">{step}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tech Stack with animated badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <Code className="w-6 h-6 text-primary" />
                      </motion.div>
                      <h4 className="font-heading text-xl font-bold text-foreground">Technology Stack</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech, i) => (
                        <motion.span
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ delay: 0.6 + i * 0.05, type: "spring" }}
                          whileHover={{ scale: 1.1, y: -3 }}
                          className={`px-4 py-2 text-sm rounded-xl bg-gradient-to-br ${selectedProject.color} bg-opacity-10 text-foreground font-medium border border-primary/20 shadow-sm`}
                        >
                          {tech.name}
                          <span className="text-xs text-muted-foreground ml-1.5">({tech.category})</span>
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Impact & Future Scope */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="relative bg-primary/5 rounded-2xl p-6 border border-primary/20 overflow-hidden"
                    >
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Award className="w-5 h-5 text-primary" />
                          </motion.div>
                          <h4 className="font-heading text-lg font-bold text-foreground">Impact</h4>
                        </div>
                        <ul className="space-y-2">
                          {selectedProject.impact.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + i * 0.05 }}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="relative bg-accent/5 rounded-2xl p-6 border border-accent/20 overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Rocket className="w-5 h-5 text-accent" />
                          </motion.div>
                          <h4 className="font-heading text-lg font-bold text-foreground">Future Scope</h4>
                        </div>
                        <ul className="space-y-2">
                          {selectedProject.futureScope.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + i * 0.05 }}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <TrendingUp className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Close Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-10 flex justify-center"
                >
                  <Button
                    onClick={() => setSelectedProject(null)}
                    className={`bg-gradient-to-r ${selectedProject.color} text-white hover:opacity-90 px-8 py-6 text-lg rounded-xl shadow-lg`}
                  >
                    Close Project
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectShowcase;
