import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, BadgeCheck, Star, Cloud, Code, GraduationCap, Trophy, Sparkles } from "lucide-react";

// 3D Certificate Card
const CertCard3D = ({ 
  cert, 
  index, 
  isInView 
}: { 
  cert: any; 
  index: number; 
  isInView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${cert.featured ? "lg:col-span-2" : ""}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative group h-full"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"
        />

        <div className={`relative glass-card p-5 h-full overflow-hidden ${
          cert.featured ? "border-primary/30" : ""
        }`}>
          {/* Featured badge */}
          {cert.featured && (
            <motion.div
              className="absolute top-0 right-0 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium flex items-center gap-1"
              animate={{ boxShadow: ["0 0 10px hsl(var(--primary)/0.3)", "0 0 20px hsl(var(--primary)/0.5)", "0 0 10px hsl(var(--primary)/0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-3 h-3" />
              Featured
            </motion.div>
          )}

          {/* Background pattern */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 20%, hsl(var(--primary)) 0px, transparent 50%)`,
            }}
          />

          <div className="flex items-start gap-4 relative z-10" style={{ transform: "translateZ(20px)" }}>
            {/* 3D Icon */}
            <motion.div
              className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors relative"
              whileHover={{ rotateY: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <cert.icon className="w-6 h-6 text-primary" />
              
              {/* Icon glow */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-xl blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-semibold text-foreground text-sm mb-1 truncate group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              {cert.subtitle && (
                <p className="text-primary text-xs font-medium mb-1">{cert.subtitle}</p>
              )}
              <p className="text-muted-foreground text-xs">{cert.issuer}</p>
              {cert.year && (
                <span className="text-xs text-accent">{cert.year}</span>
              )}
            </div>
          </div>

          {/* Corner decoration */}
          <motion.div
            className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-primary/5 group-hover:scale-150 transition-transform duration-500"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const certifications = [
    {
      title: "Oracle Certified Professional",
      subtitle: "Oracle Cloud Database Services",
      issuer: "Oracle University",
      year: "2025",
      icon: Cloud,
      featured: true,
    },
    {
      title: "Young Turks 2025",
      subtitle: "95.88 Percentile",
      issuer: "Naukri Campus",
      icon: Star,
      featured: true,
    },
    {
      title: "C Essentials 1 & 2, C Advanced",
      issuer: "Cisco Networking Academy",
      icon: Code,
    },
    {
      title: "Python Essentials 1 & 2",
      issuer: "Cisco Networking Academy",
      icon: Code,
    },
    {
      title: "Problem Solving, Python, Java, SQL",
      subtitle: "Basic Certifications",
      issuer: "HackerRank",
      icon: BadgeCheck,
    },
    {
      title: "30 Days DSA Bootcamp",
      issuer: "Unstop",
      icon: GraduationCap,
    },
    {
      title: "Generative AI for Educators",
      subtitle: "Score: 100%",
      issuer: "Google for Education",
      icon: Award,
    },
    {
      title: "Gemini Certified Student",
      issuer: "Google for Education",
      icon: Award,
    },
  ];

  const achievements = [
    "95.88 Percentile in Naukri Campus Young Turks 2025",
    "Oracle Certified Professional (2025)",
    "Team Leader in national and international hackathons",
    "Consistent academic excellence with CGPA 9.55/10",
  ];

  return (
    <section id="certifications" className="section-padding relative bg-secondary/30 overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2], 
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating decorative elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
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
            className="inline-flex items-center gap-3 mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          </motion.div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Certifications & <span className="gradient-text-animated">Achievements</span>
          </h2>
          
          <motion.div 
            className="w-24 h-1 bg-primary-gradient mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {certifications.map((cert, index) => (
            <CertCard3D
              key={cert.title}
              cert={cert}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Achievements with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="perspective-1000"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="glass-card p-8 relative overflow-hidden group">
            {/* Background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 100%" }}
            />

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-6 h-6 text-primary" />
              </motion.div>
              Key Achievements
            </h3>

            <div className="grid md:grid-cols-2 gap-4 relative z-10">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all group/item cursor-default"
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Star className="w-4 h-4 text-primary" />
                  </motion.div>
                  <p className="text-muted-foreground text-sm group-hover/item:text-foreground transition-colors">
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

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

export default CertificationsSection;