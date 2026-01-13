// HPI 1.6-V
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Calendar, MapPin, Users, Trophy, Clock, Target, Cpu, Zap, Code, ChevronRight, Terminal, Activity, Gift, Utensils, QrCode, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CircuitBackground from '@/components/CircuitBackground';
import { BaseCrudService } from '@/integrations';
import { HackathonEvents } from '@/entities';
import { Image } from '@/components/ui/image';

// --- Types ---
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

// --- Components ---

// Mandatory AnimatedElement for scroll reveals (Intersection Observer)
const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Add a small delay via style if needed, or just let CSS handle the transition
        setTimeout(() => {
            element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`${className || ''} animate-reveal`}>{children}</div>;
};

// Custom Hook for Mouse Parallax
const useMouseParallax = (stiffness = 150, damping = 20) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness, damping });
  const mouseY = useSpring(y, { stiffness, damping });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPos = (clientX - left) / width - 0.5;
    const yPos = (clientY - top) / height - 0.5;
    x.set(xPos);
    y.set(yPos);
  }

  return { mouseX, mouseY, handleMouseMove };
};

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [eventData, setEventData] = useState<HackathonEvents | null>(null);
  const [loading, setLoading] = useState(true);

  // Preserve original fetching logic
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const { items } = await BaseCrudService.getAll<HackathonEvents>('hackathonevents');
        if (items && items.length > 0) {
          setEventData(items[0]);
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  // --- Motion & Scroll Hooks ---
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.2], ['0%', '-100%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  
  // Parallax for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // --- Render ---
  return (
    <div className="min-h-screen bg-background text-foreground overflow-clip selection:bg-primary selection:text-background font-paragraph">
      {/* Global Styles for Custom Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

        .animate-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .circuit-grid {
          background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .retro-title {
          font-family: 'Righteous', sans-serif;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          text-shadow: 
            3px 3px 0px rgba(255, 140, 0, 0.6),
            6px 6px 0px rgba(255, 140, 0, 0.3);
        }
      `}</style>

      <CircuitBackground />
      
      {/* Fixed Header Wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
        <Header />
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Layer */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background z-10" />
          <Image
            src="https://static.wixstatic.com/media/2836f6_40bd3ef9c84a4942ba72f7339b31cbb7~mv2.png?id=hero-bg"
            alt="Hackathon Circuit Background"
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-[120rem] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <AnimatedElement className="mb-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-secondary/50 bg-secondary/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-sm font-mono text-secondary tracking-widest uppercase">Event Concluded</span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={200} className="mb-2">
            <h2 className="text-lg md:text-xl font-heading tracking-[0.5em] text-foreground/60 uppercase">
              Tech Vision Skills Academy Presents
            </h2>
          </AnimatedElement>

          <AnimatedElement delay={400} className="relative">
            <h1 
              className="text-[15vw] md:text-[12rem] leading-[0.8] font-black text-primary select-none retro-title"
            >
              FUSION
            </h1>
            <div className="absolute -top-10 -right-10 w-32 h-32 border-t-2 border-r-2 border-secondary/50 rounded-tr-3xl hidden md:block" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 border-b-2 border-l-2 border-primary/50 rounded-bl-3xl hidden md:block" />
          </AnimatedElement>

          <AnimatedElement delay={600} className="mt-8 max-w-2xl">
            <p className="text-xl md:text-2xl text-primary font-light tracking-wide">
              24-HOUR HACKATHON
            </p>
            <p className="mt-4 text-2xl md:text-3xl text-secondary font-bold tracking-wide">
              9<sup>TH</sup> - 10<sup>TH</sup> OCTOBER
            </p>
            {!loading && eventData && (
              <p className="mt-6 text-foreground/80 text-lg leading-relaxed">
                {eventData.eventDescription}
              </p>
            )}
          </AnimatedElement>

          <AnimatedElement delay={800} className="mt-12 flex flex-wrap gap-6 justify-center">
            <a href="https://www.fusion2025.in" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-foreground/10 border border-foreground/30 text-foreground/60 font-heading tracking-wider transition-all duration-300 overflow-hidden cursor-not-allowed opacity-60">
              <span className="relative z-10 flex items-center gap-2">
                REGISTRATION CLOSED <ChevronRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-foreground/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <button className="group relative px-8 py-4 bg-primary/10 hover:bg-primary/20 border border-primary/50 text-primary font-heading tracking-wider transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                VIEW GALLERY <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </AnimatedElement>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-xs font-mono text-primary/50 uppercase tracking-widest">Scroll to Initialize</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />
        </motion.div>
      </section>

      {/* MARQUEE SECTION */}
      <div className="relative w-full bg-primary/5 border-y border-primary/10 overflow-hidden py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(10).fill("INNOVATION • CODE • FUTURE • DISRUPT • BUILD • ").map((text, i) => (
            <span key={i} className="text-4xl font-heading font-bold text-primary/20 mx-4 select-none">
              {text}
            </span>
          ))}
        </div>
        <style>{`
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* DATA TELEMETRY (STATS) SECTION */}
      <section className="relative py-32 w-full max-w-[120rem] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              label: "Prize Pool", 
              value: "₹2,00,000+",
              icon: Trophy,
              color: "text-secondary"
            },
            { 
              label: "Registration Fee", 
              value: "₹1,000/-",
              icon: DollarSign,
              color: "text-primary"
            },
            { 
              label: "Max Team Size", 
              value: "4 Members",
              icon: Users,
              color: "text-secondary"
            },
            { 
              label: "Lunch Included", 
              value: "Yes",
              icon: Utensils,
              color: "text-primary"
            }
          ].map((stat, index) => (
            <AnimatedElement key={index} delay={index * 100} className="h-full">
              <div className="group relative h-full p-8 bg-background/40 backdrop-blur-sm border border-white/5 hover:border-primary/50 transition-colors duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                  <stat.icon className={`w-12 h-12 ${stat.color}`} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <span className="text-sm font-mono text-foreground/50 uppercase tracking-wider mb-4">{stat.label}</span>
                  <span className={`text-3xl md:text-4xl font-heading font-bold ${stat.color} group-hover:scale-105 transition-transform duration-300 origin-left`}>
                    {stat.value}
                  </span>
                </div>
                {/* Decorative Corner */}
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </AnimatedElement>
          ))}
        </div>
      </section>

      {/* PRIZES & REWARDS SECTION */}
      <section className="relative py-24 w-full overflow-hidden">
        <div className="absolute inset-0 circuit-grid opacity-20 pointer-events-none" />
        
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Sticky Title */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <AnimatedElement>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] w-12 bg-secondary" />
                    <span className="text-secondary font-mono uppercase tracking-widest">Rewards</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-tight">
                    PRIZES & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">PERKS</span>
                  </h2>
                  <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                    Win amazing prizes and exclusive rewards. Top teams get recognition, cash prizes, and exciting gadgets!
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    {['₹2,00,000+ Prize Pool', 'Free Trip to Malvan (2 Teams)', '20,000 Worth Gadgets', 'Lunch & Refreshments'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-foreground/80">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="font-mono text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedElement>
              </div>
            </div>

            {/* Right Column: Visual Modules */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <AnimatedElement delay={200}>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                  <Image
                    src="https://static.wixstatic.com/media/2836f6_4364c6d6ad5c457ba691793ee7a8129a~mv2.jpeg?id=fusion-poster"
                    alt="FUSION 2025 Hackathon Poster"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 p-8 z-20">
                    <h3 className="text-2xl font-heading text-white mb-2">FUSION 2025</h3>
                    <p className="text-sm text-foreground/70 max-w-md">24-Hour Innovation Challenge</p>
                  </div>
                </div>
              </AnimatedElement>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatedElement delay={300}>
                  <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-primary/50 transition-colors h-full">
                    <Gift className="w-10 h-10 text-primary mb-6" />
                    <h4 className="text-xl font-heading text-white mb-3">Gadget Rewards</h4>
                    <p className="text-sm text-foreground/60">Win gadgets worth ₹20,000 for top-performing teams.</p>
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={400}>
                  <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-secondary/50 transition-colors h-full">
                    <MapPin className="w-10 h-10 text-secondary mb-6" />
                    <h4 className="text-xl font-heading text-white mb-3">Malvan Trip</h4>
                    <p className="text-sm text-foreground/60">Free trip to Malvan for 2 winning teams with all expenses covered.</p>
                  </div>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT HIGHLIGHTS / TIMELINE */}
      <section className="relative py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <AnimatedElement className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">SYSTEM LOGS</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto" />
          </AnimatedElement>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />

            <div className="space-y-24">
              {[
                { title: "Opening Ceremony", time: "09:00 AM", desc: "The challenge begins. Problem statements released.", icon: Terminal },
                { title: "Mentorship Round", time: "02:00 PM", desc: "Industry experts guide teams on architecture and feasibility.", icon: Users },
                { title: "Midnight Coding", time: "12:00 AM", desc: "Pizza, caffeine, and peak productivity hours.", icon: Code },
                { title: "Final Pitch", time: "09:00 AM", desc: "24 hours up. Teams present their solutions to the jury.", icon: Trophy }
              ].map((item, index) => (
                <AnimatedElement key={index} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  {/* Content Side */}
                  <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="inline-block p-2 bg-primary/10 rounded mb-4 md:hidden">
                      <span className="font-mono text-primary">{item.time}</span>
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-foreground/60 text-lg">{item.desc}</p>
                  </div>

                  {/* Center Icon */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Time Side (Desktop) */}
                  <div className={`flex-1 hidden md:block ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                    <span className="font-mono text-xl text-primary/80 tracking-widest">{item.time}</span>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <AnimatedElement>
              <h2 className="text-5xl md:text-7xl font-heading font-bold text-white">
                VISUAL <span className="text-transparent bg-stroke-text text-stroke-primary">DATABASE</span>
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <button className="px-8 py-3 border border-white/20 hover:bg-white/5 hover:border-white/50 transition-all text-white font-mono uppercase tracking-wider flex items-center gap-2">
                Access Full Archive <ChevronRight className="w-4 h-4" />
              </button>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[60vh]">
            <AnimatedElement className="md:col-span-2 h-full relative group overflow-hidden rounded-lg">
              <Image
                src="https://static.wixstatic.com/media/2836f6_40bd3ef9c84a4942ba72f7339b31cbb7~mv2.png?id=gallery-main"
                alt="Hackathon Main Event"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div>
                  <span className="text-primary font-mono text-sm mb-2 block">File: IMG_001.raw</span>
                  <h3 className="text-2xl font-heading text-white">Main Arena</h3>
                </div>
              </div>
            </AnimatedElement>
            
            <div className="flex flex-col gap-4 h-full">
              <AnimatedElement delay={200} className="flex-1 relative group overflow-hidden rounded-lg">
                <Image
                  src="https://static.wixstatic.com/media/2836f6_40bd3ef9c84a4942ba72f7339b31cbb7~mv2.png?id=gallery-side-1"
                  alt="Coding Session"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                 <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
              </AnimatedElement>
              <AnimatedElement delay={300} className="flex-1 relative group overflow-hidden rounded-lg">
                <Image
                  src="https://static.wixstatic.com/media/2836f6_40bd3ef9c84a4942ba72f7339b31cbb7~mv2.png?id=gallery-side-2"
                  alt="Prize Distribution"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-secondary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INFO SECTION */}
      <section className="relative py-24 bg-background/50 border-t border-white/5">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <AnimatedElement className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">QUICK INFO</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto" />
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedElement delay={0}>
              <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-primary/50 transition-colors h-full">
                <QrCode className="w-10 h-10 text-primary mb-6" />
                <h4 className="text-lg font-heading text-white mb-3">Registration</h4>
                <p className="text-sm text-foreground/60 mb-4">Scan QR code or visit www.fusion2025.in</p>
                <p className="text-xs font-mono text-primary">Fee: ₹1,000/-</p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-secondary/50 transition-colors h-full">
                <Users className="w-10 h-10 text-secondary mb-6" />
                <h4 className="text-lg font-heading text-white mb-3">Team Details</h4>
                <p className="text-sm text-foreground/60 mb-4">Max 4 members per team</p>
                <p className="text-xs font-mono text-secondary">Lunch included!</p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-primary/50 transition-colors h-full">
                <Calendar className="w-10 h-10 text-primary mb-6" />
                <h4 className="text-lg font-heading text-white mb-3">Dates</h4>
                <p className="text-sm text-foreground/60">9<sup>th</sup> - 10<sup>th</sup> October</p>
                <p className="text-xs font-mono text-primary mt-2">24 Hours Non-Stop</p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-secondary/50 transition-colors h-full">
                <Trophy className="w-10 h-10 text-secondary mb-6" />
                <h4 className="text-lg font-heading text-white mb-3">Prizes</h4>
                <p className="text-sm text-foreground/60 mb-2">₹2,00,000+ Pool</p>
                <p className="text-xs font-mono text-secondary">+ Gadgets & Trip</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="relative py-24 bg-background border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <AnimatedElement>
            <div className="mb-8 inline-block px-6 py-3 bg-secondary/10 border border-secondary/50 rounded-lg">
              <p className="text-secondary font-mono font-bold tracking-widest uppercase">Event Concluded</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              THANK YOU FOR JOINING FUSION 2025
            </h2>
            <p className="text-xl text-foreground/60 mb-4">
              Thank you for being part of an incredible 24-hour hackathon experience. We hope you created amazing innovations and made lasting connections!
            </p>
            <p className="text-lg text-foreground/50 mb-10 font-mono">
              📱 +91 9167904386 | 📧 contact@fusion2025.in
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <a href="/gallery" className="px-10 py-4 bg-primary text-background font-bold font-heading tracking-wider hover:bg-primary/90 transition-colors">
                VIEW EVENT GALLERY
              </a>
              <a href="https://www.instagram.com/iic_ecelisknisb" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-secondary/10 border border-secondary/50 text-secondary font-bold font-heading tracking-wider hover:bg-secondary/20 transition-colors">
                FOLLOW FOR UPDATES
              </a>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}