import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, Cloud, Cpu, Sparkles, BookOpen, Users, Lightbulb } from "lucide-react";

// 3D Floating Cube Component
const FloatingCube = ({ delay, size, className }: { delay: number; size: number; className?: string }) => (
  <motion.div
    className={`absolute ${className}`}
    style={{
      width: size,
      height: size,
      transformStyle: "preserve-3d",
    }}
    animate={{
      rotateX: [0, 360],
      rotateY: [0, 360],
      y: [0, -20, 0],
    }}
    transition={{
      rotateX: { duration: 8, repeat: Infinity, ease: "linear", delay },
      rotateY: { duration: 12, repeat: Infinity, ease: "linear", delay },
      y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay },
    }}
  >
    <div
      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm"
      style={{ transform: "translateZ(10px)" }}
    />
    <div
      className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20"
      style={{ transform: "rotateY(90deg) translateZ(10px)" }}
    />
  </motion.div>
);

// 3D Card with tilt effect
const InternshipCard = ({ internship, index, isInView }: { internship: any; index: number; isInView: boolean }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) translateZ(20px)`
          : "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)",
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
      }}
      className="relative group"
    >
      {/* Glow Effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${internship.gradientColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
      />

      <div className="relative glass-card p-6 md:p-8 overflow-hidden h-full">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${internship.accentColor} 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
            animate={{ backgroundPosition: ["0px 0px", "30px 30px"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Company Badge */}
        <motion.div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${internship.badgeGradient} text-white text-xs font-medium mb-4`}
          whileHover={{ scale: 1.05 }}
          style={{ transform: "translateZ(30px)" }}
        >
          <internship.icon className="w-4 h-4" />
          {internship.type}
        </motion.div>

        {/* Duration */}
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground mb-3"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          {internship.duration}
        </motion.div>

        {/* Title */}
        <motion.h3
          className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors"
          style={{ transform: "translateZ(25px)" }}
        >
          {internship.title}
        </motion.h3>

        {/* Organization */}
        <motion.p
          className="text-muted-foreground text-sm mb-4"
          style={{ transform: "translateZ(20px)" }}
        >
          {internship.organization}
        </motion.p>

        {/* Collaboration Badges */}
        {internship.collaborators && (
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            style={{ transform: "translateZ(15px)" }}
          >
            {internship.collaborators.map((collab: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-secondary border border-border text-muted-foreground"
              >
                {collab}
              </span>
            ))}
          </motion.div>
        )}

        {/* Highlights */}
        <motion.div
          className="space-y-3"
          style={{ transform: "translateZ(10px)" }}
        >
          {internship.highlights.map((highlight: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.3 + i * 0.1 }}
              className="flex items-start gap-3 group/item"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${internship.iconGradient} flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform`}>
                <highlight.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors pt-1">
                {highlight.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Corner Decoration */}
        <motion.div
          className="absolute -bottom-4 -right-4 w-24 h-24 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transform: "translateZ(-10px)" }}
        >
          <div className={`w-full h-full rounded-full bg-gradient-to-br ${internship.gradientColor}`} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const InternshipsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const internships = [
    {
      title: "AI + Sustainability Virtual Internship",
      organization: "1M1B (One Million for One Billion)",
      collaborators: ["IBM SkillsBuild", "AICTE"],
      duration: "December 2025 – January 2026",
      type: "Virtual Internship",
      icon: Cloud,
      gradientColor: "from-emerald-500/30 to-cyan-500/30",
      badgeGradient: "from-emerald-500 to-cyan-500",
      iconGradient: "from-emerald-500/80 to-cyan-500/80",
      accentColor: "hsl(var(--primary))",
      highlights: [
        { icon: Cpu, text: "Learning AI applications for sustainability-focused challenges" },
        { icon: Lightbulb, text: "Gained exposure to ethical AI and real-world AI use cases aligned with global sustainability goals" },
        { icon: BookOpen, text: "Participated in structured LMS modules, expert-led sessions, and guided activities" },
      ],
    },
    {
      title: "Microsoft Elevate – 4-Week Virtual Internship",
      organization: "AICTE",
      collaborators: ["Microsoft"],
      duration: "December 2025 – January 2026",
      type: "Virtual Internship",
      icon: Sparkles,
      gradientColor: "from-blue-500/30 to-purple-500/30",
      badgeGradient: "from-blue-500 to-purple-500",
      iconGradient: "from-blue-500/80 to-purple-500/80",
      accentColor: "hsl(var(--accent))",
      highlights: [
        { icon: Users, text: "Completed Microsoft-powered internship through official LMS platform" },
        { icon: Cpu, text: "Developing foundational knowledge in modern digital and AI-enabled technologies" },
        { icon: Lightbulb, text: "Learned industry-relevant skills for professional development" },
      ],
    },
  ];

  return (
    <section id="internships" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating 3D Cubes */}
        <FloatingCube delay={0} size={40} className="top-20 left-[10%]" />
        <FloatingCube delay={1} size={30} className="top-40 right-[15%]" />
        <FloatingCube delay={2} size={25} className="bottom-32 left-[20%]" />
        <FloatingCube delay={1.5} size={35} className="bottom-20 right-[10%]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          </motion.div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Internships</span>
          </h2>
          <div className="w-24 h-1 bg-primary-gradient mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Hands-on experience with industry-leading organizations
          </p>
        </motion.div>

        {/* Internship Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {internships.map((internship, index) => (
            <InternshipCard
              key={internship.title}
              internship={internship}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <motion.div
            className="w-3 h-3 rounded-full bg-primary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default InternshipsSection;