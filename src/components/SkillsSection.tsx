import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code, Database, Globe, Wrench, Users, Sparkles, Zap } from "lucide-react";

// 3D Floating Cube
const FloatingCube = ({ delay, size, x, y, color }: { delay: number; size: number; x: string; y: string; color: string }) => (
  <motion.div
    className="absolute"
    style={{ left: x, top: y, transformStyle: "preserve-3d" }}
    animate={{
      rotateX: [0, 360],
      rotateY: [0, 360],
      y: [0, -20, 0],
    }}
    transition={{
      rotateX: { duration: 10, repeat: Infinity, ease: "linear", delay },
      rotateY: { duration: 15, repeat: Infinity, ease: "linear", delay },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
    }}
  >
    <div
      className={`w-${size} h-${size} rounded-lg border border-primary/20 backdrop-blur-sm`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color} 0%, transparent 100%)`,
      }}
    />
  </motion.div>
);

// 3D Skill Card Component
const SkillCard3D = ({ 
  category, 
  index, 
  isInView 
}: { 
  category: any; 
  index: number; 
  isInView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

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
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative group"
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r ${category.color}`}
          style={{ opacity: isHovered ? 0.3 : 0 }}
        />

        {/* Card */}
        <div className="relative glass-card p-6 overflow-hidden h-full">
          {/* Animated gradient border */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl p-[1px] bg-gradient-to-r ${category.color}`}>
            <div className="w-full h-full bg-card rounded-2xl" />
          </div>

          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
            animate={isHovered ? { backgroundPosition: ["0px 0px", "20px 20px"] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Content with 3D transform */}
          <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
            {/* 3D Icon */}
            <motion.div 
              className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} p-[2px] mb-5 shadow-lg group-hover:shadow-xl transition-shadow`}
              whileHover={{ rotateY: 180, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                <motion.div
                  animate={isHovered ? { rotateY: [0, 360] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <category.icon className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
            </motion.div>

            <h3 className="font-heading text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
              {category.title}
            </h3>

            {/* Skill tags with stagger animation */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill: string, i: number) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: "hsl(var(--primary) / 0.2)",
                    color: "hsl(var(--foreground))"
                  }}
                  className="px-3 py-1.5 text-sm rounded-lg bg-secondary text-muted-foreground transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Corner decoration */}
          <motion.div
            className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-700`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Programming",
      icon: Code,
      skills: ["C", "Python", "Java"],
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Core Concepts",
      icon: Database,
      skills: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS"],
      color: "from-emerald-400 to-teal-500",
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["MySQL"],
      color: "from-orange-400 to-amber-500",
    },
    {
      title: "Web Basics",
      icon: Globe,
      skills: ["HTML", "CSS"],
      color: "from-pink-400 to-rose-500",
    },
    {
      title: "Tools & Platforms",
      icon: Wrench,
      skills: ["Oracle Cloud", "Cisco Networking Academy", "VS Code"],
      color: "from-violet-400 to-purple-500",
    },
    {
      title: "Soft Skills",
      icon: Users,
      skills: ["Leadership", "Communication", "Teamwork", "Time Management"],
      color: "from-primary to-accent",
    },
  ];

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1], 
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2], 
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating cubes */}
        <FloatingCube delay={0} size={40} x="5%" y="20%" color="hsl(var(--primary) / 0.2)" />
        <FloatingCube delay={1} size={30} x="90%" y="30%" color="hsl(var(--accent) / 0.2)" />
        <FloatingCube delay={2} size={25} x="85%" y="70%" color="hsl(var(--primary) / 0.15)" />
        <FloatingCube delay={1.5} size={35} x="10%" y="75%" color="hsl(var(--accent) / 0.15)" />
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
              <Zap className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          </motion.div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text-animated">Skills</span>
          </h2>
          
          <motion.div 
            className="w-24 h-1 bg-primary-gradient mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard3D
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
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
            className="flex items-center gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
