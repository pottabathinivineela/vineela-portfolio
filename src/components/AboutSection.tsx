import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Lightbulb, Users, Target, Sparkles, Star } from "lucide-react";

// 3D Floating Particle
const FloatingParticle = ({ delay, size, x, y }: { delay: number; size: number; x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20"
    style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 4 + Math.random() * 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// 3D Card Component with tilt effect
const Card3D = ({ 
  children, 
  index, 
  isInView,
  className = "" 
}: { 
  children: React.ReactNode; 
  index: number; 
  isInView: boolean;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`perspective-1000 ${className}`}
    >
      <div className={`relative group h-full ${isHovered ? 'z-10' : 'z-0'}`}>
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        />
        
        {/* Card content */}
        <div className="relative glass-card p-6 text-center h-full overflow-hidden">
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0px, transparent 50%)`,
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

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Code2,
      title: "Technical Focus",
      description: "Software development, DSA, databases, AI, and cybersecurity",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Hackathon experience solving real-world challenges",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: Users,
      title: "Leadership",
      description: "Team leader in national and international hackathons",
      gradient: "from-pink-400 to-rose-500",
    },
    {
      icon: Target,
      title: "Driven Learner",
      description: "Passionate about building practical solutions",
      gradient: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1], 
            x: [0, 50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2], 
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.3} 
            size={4 + Math.random() * 6} 
            x={Math.random() * 100} 
            y={Math.random() * 100} 
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with 3D effect */}
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
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text-animated">Me</span>
          </h2>
          
          <motion.div 
            className="w-24 h-1 bg-primary-gradient mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content with 3D card effect */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="glass-card p-6 relative overflow-hidden group"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative corner */}
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"
              />
              
              <p className="text-lg text-muted-foreground leading-relaxed relative z-10">
                I'm a <span className="text-foreground font-medium">second-year B.Tech Computer Science Engineering</span> student 
                at Malla Reddy Engineering College for Women, Hyderabad, maintaining a{" "}
                <motion.span 
                  className="text-primary font-semibold inline-flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <Star className="w-4 h-4" />
                  CGPA of 9.55/10
                </motion.span>{" "}
                with a strong interest in software development, artificial intelligence, and problem solving. I have a solid foundation in Data Structures, DBMS, and Object-Oriented Programming, and I enjoy building real-world technology solutions. I am the{" "}
                <span className="text-foreground font-medium">Founder & Team Lead of SafeStreet AI</span>, a startup initiative focused on using technology for safer and smarter urban environments. My startup idea has gained recognition across multiple innovation platforms — selected for{" "}
                <span className="text-foreground font-medium">WE Hub Campuspreneur Cohort-1</span> (Government of Telangana), shortlisted for the{" "}
                <span className="text-foreground font-medium">Ground Reality 2026</span> mentorship program at BITS Pilani Hyderabad Campus, and shortlisted by the MRECW Entrepreneurship Development Cell in{" "}
                <span className="text-foreground font-medium">Startup Yatra</span>. Along with academics, I actively participate in hackathons, internships, and entrepreneurship programs, continuously improving my technical skills, leadership abilities, and problem-solving mindset.
              </p>
            </motion.div>
          </motion.div>

          {/* Highlights Grid with 3D Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <Card3D key={item.title} index={index} isInView={isInView}>
                {/* 3D Icon Container */}
                <motion.div 
                  className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.gradient} p-[1px] shadow-lg`}
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                    <motion.div
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <item.icon className="w-7 h-7 text-primary" />
                    </motion.div>
                  </div>
                </motion.div>
                
                <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Card3D>
            ))}
          </motion.div>
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

export default AboutSection;