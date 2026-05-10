import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Code, Brain, Rocket } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface HeroSectionProps {
  onExplore: () => void;
  isRevealed: boolean;
}

// 3D Floating Orb Component
const FloatingOrb = ({ 
  size, 
  color, 
  delay, 
  duration, 
  x, 
  y 
}: { 
  size: number; 
  color: string; 
  delay: number; 
  duration: number; 
  x: string; 
  y: string; 
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
      filter: "blur(1px)",
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// 3D Rotating Icon Component
const RotatingIcon = ({ 
  Icon, 
  delay, 
  duration, 
  x, 
  y, 
  size 
}: { 
  Icon: React.ElementType; 
  delay: number; 
  duration: number; 
  x: string; 
  y: string; 
  size: number;
}) => (
  <motion.div
    className="absolute"
    style={{ left: x, top: y, transformStyle: "preserve-3d" }}
    animate={{
      y: [0, -20, 0],
      rotateY: [0, 360],
      rotateZ: [0, 10, 0],
    }}
    transition={{
      y: { duration, delay, repeat: Infinity, ease: "easeInOut" },
      rotateY: { duration: duration * 2, delay, repeat: Infinity, ease: "linear" },
      rotateZ: { duration: duration * 1.5, delay, repeat: Infinity, ease: "easeInOut" },
    }}
  >
    <div className="p-3 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10">
      <Icon className="text-primary" style={{ width: size, height: size }} />
    </div>
  </motion.div>
);

// Particle System
const Particle = ({ index }: { index: number }) => {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 5 + Math.random() * 5;
  const randomSize = 2 + Math.random() * 4;

  return (
    <motion.div
      className="absolute rounded-full bg-primary/40"
      style={{
        width: randomSize,
        height: randomSize,
        left: `${randomX}%`,
        bottom: "-5%",
      }}
      animate={{
        y: [0, -1000],
        x: [0, (Math.random() - 0.5) * 200],
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
};

// Typing Animation Text
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayedText}
      {displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-primary"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// 3D Morphing Shape
const MorphingShape = () => (
  <motion.div
    className="absolute w-96 h-96 opacity-20"
    style={{
      background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
      filter: "blur(60px)",
    }}
    animate={{
      borderRadius: [
        "60% 40% 30% 70% / 60% 30% 70% 40%",
        "30% 60% 70% 40% / 50% 60% 30% 60%",
        "60% 40% 30% 70% / 60% 30% 70% 40%",
      ],
      rotate: [0, 180, 360],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const HeroSection = ({ onExplore, isRevealed }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = (e.clientX - rect.left) / rect.width - 0.5;
    const centerY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(centerX);
    mouseY.set(centerY);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 aurora-bg opacity-50" />
      
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Morphing Shapes */}
        <div className="absolute top-1/4 left-1/4">
          <MorphingShape />
        </div>
        <div className="absolute bottom-1/4 right-1/4">
          <MorphingShape />
        </div>

        {/* Floating Orbs */}
        <FloatingOrb size={120} color="hsl(var(--primary) / 0.3)" delay={0} duration={8} x="10%" y="20%" />
        <FloatingOrb size={80} color="hsl(var(--accent) / 0.25)" delay={1} duration={10} x="80%" y="15%" />
        <FloatingOrb size={100} color="hsl(var(--neon-purple) / 0.2)" delay={2} duration={9} x="70%" y="60%" />
        <FloatingOrb size={60} color="hsl(var(--primary) / 0.35)" delay={0.5} duration={7} x="15%" y="70%" />
        <FloatingOrb size={90} color="hsl(var(--accent) / 0.3)" delay={1.5} duration={11} x="50%" y="80%" />

        {/* Rotating Icons */}
        <RotatingIcon Icon={Code} delay={0} duration={4} x="8%" y="35%" size={20} />
        <RotatingIcon Icon={Brain} delay={1} duration={5} x="88%" y="40%" size={22} />
        <RotatingIcon Icon={Rocket} delay={0.5} duration={4.5} x="85%" y="75%" size={18} />
        <RotatingIcon Icon={Sparkles} delay={1.5} duration={5.5} x="12%" y="80%" size={20} />

        {/* Particle System */}
        {[...Array(20)].map((_, i) => (
          <Particle key={i} index={i} />
        ))}

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial Gradient Spotlight */}
        <motion.div
          className="absolute w-[800px] h-[800px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm text-muted-foreground">Welcome to my portfolio</span>
          </motion.div>

          <motion.h1
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ transform: "translateZ(50px)" }}
          >
            <span className="block text-foreground">Pottabathini</span>
            <motion.span 
              className="block mt-2"
              style={{ transform: "translateZ(80px)" }}
            >
              <span className="gradient-text-animated glow-text">Vineela</span>
            </motion.span>
          </motion.h1>

          <motion.div
            className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ transform: "translateZ(30px)" }}
          >
            <TypewriterText 
              text="Computer Science Engineering Student | Aspiring Software & AI Developer" 
              delay={800}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ transform: "translateZ(40px)" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="hero"
                size="xl"
                onClick={onExplore}
                className="group relative overflow-hidden"
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Explore More
                  <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        {isRevealed && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center backdrop-blur-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-3 bg-gradient-to-b from-primary to-accent rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;