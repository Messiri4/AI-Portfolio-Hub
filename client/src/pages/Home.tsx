import { useEffect } from "react";
import { useProjects, useSkills, useSendMessage } from "@/hooks/use-portfolio";
import { Navbar } from "@/components/Navbar";
import { NetworkBackground } from "@/components/NetworkBackground";
import { TechBadge } from "@/components/TechBadge";
import { motion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type InsertMessage } from "@shared/routes";
import { ArrowRight, Download, Mail, Github, Linkedin, Terminal, Cpu, Database } from "lucide-react";
import { Link } from "wouter";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(api.contact.submit.input),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertMessage) => {
    sendMessage(data, {
      onSuccess: () => form.reset()
    });
  };

  // Scroll animations
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>) || {};

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <NetworkBackground />
        
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-8 font-mono backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              SYSTEMS_ONLINE
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Engineering <span className="text-gradient-pink-blue">Intelligence</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Specializing in artificial intelligence, distributed systems, and scalable software architectures. 
              Bridging the gap between theoretical research and production engineering.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#projects"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg gradient-pink-blue px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                View Technical Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              
              <a 
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />
          </div>
        </motion.div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="py-24 md:py-32 relative border-t border-white/5 bg-background/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="text-primary h-6 w-6" />
                <h2 className="font-display text-3xl font-bold text-foreground">Core Competencies</h2>
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                I am a software engineer with a strong foundation in computer science and applied mathematics. 
                My work focuses on building robust AI systems that solve real-world problems with efficiency and precision.
              </p>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Rather than chasing hype, I prioritize fundamental engineering principles: modularity, scalability, and maintainability.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Cpu, label: "Machine Learning", desc: "PyTorch, TensorFlow, Scikit-learn" },
                  { icon: Database, label: "Data Engineering", desc: "SQL, ETL Pipelines, Vector DBs" },
                  { icon: Terminal, label: "Backend Systems", desc: "Node.js, Python, Go, Docker" },
                  { icon: Activity, label: "Optimization", desc: "Algorithms, latency reduction" }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg bg-secondary/20 border border-white/5">
                    <item.icon className="h-5 w-5 text-primary mb-2" />
                    <h3 className="font-bold text-foreground text-sm mb-1">{item.label}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Abstract decorative element for "About" */}
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-background to-secondary/20 border border-white/10 p-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-grid-bg opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                
                {/* Simulated Terminal Window */}
                <div className="absolute inset-4 bg-black/80 rounded-lg border border-white/10 p-4 font-mono text-xs md:text-sm text-green-400 overflow-hidden shadow-2xl">
                  <div className="flex gap-1.5 mb-4 border-b border-white/10 pb-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="space-y-2 opacity-90">
                    <p><span className="text-blue-400">user@dev:~$</span> ./init_profile.sh</p>
                    <p className="text-white">Loading modules...</p>
                    <p> [OK] Computer Science Fundamentals</p>
                    <p> [OK] Applied Linear Algebra</p>
                    <p> [OK] Neural Architecture Search</p>
                    <p> [OK] Distributed Computing</p>
                    <p className="text-white">Compiling experience...</p>
                    <div className="h-1 w-full bg-white/20 rounded mt-2">
                      <div className="h-full bg-green-500 w-[85%]" />
                    </div>
                    <p className="mt-4"><span className="text-blue-400">user@dev:~$</span> cat mission.txt</p>
                    <p className="text-white">To build intelligent systems that extend human capability through rigorous engineering.</p>
                    <span className="inline-block w-2 h-4 bg-green-400 animate-pulse align-middle" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================== PROJECTS SECTION ==================== */}
      <section id="projects" className="py-24 bg-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Selected Projects</h2>
            <div className="h-1 w-20 bg-primary rounded" />
          </div>

          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 rounded-2xl bg-secondary/20 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                >
                  <Link href={`/project/${project.id}`}>
                    <div className="group h-full relative flex flex-col rounded-2xl border border-white/5 bg-card p-1 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
                      
                      {/* Image Area */}
                      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-secondary/30">
                        {project.imageUrl ? (
                          <>
                           {/* HTML Comment for Image Replacement */}
                           {/* project thumbnail technical diagram */}
                           <img 
                            src={project.imageUrl} 
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                           />
                          </>
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-grid-bg">
                            <Cpu className="h-10 w-10 text-primary/40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
                      </div>

                      {/* Content Area */}
                      <div className="flex flex-1 flex-col p-5">
                        <div className="mb-4">
                          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                            {project.shortDescription}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.slice(0, 3).map(tech => (
                              <TechBadge key={tech}>{tech}</TechBadge>
                            ))}
                            {project.techStack.length > 3 && (
                              <TechBadge variant="outline">+{project.techStack.length - 3}</TechBadge>
                            )}
                          </div>
                          
                          <div className="flex items-center text-xs font-mono font-bold text-primary uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                            Analyze Case Study <ArrowRight className="ml-2 h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section id="skills" className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Technical Proficiency</h2>
            <div className="h-1 w-20 bg-primary rounded" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {Object.entries(skillsByCategory).map(([category, items], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-card/50 rounded-2xl p-6 border border-white/5"
              >
                <h3 className="font-mono text-lg font-bold text-primary mb-6 uppercase tracking-wider border-b border-white/5 pb-2">
                  {category}
                </h3>
                
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={items}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontFamily: 'monospace' }}
                        width={100}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      />
                      <Bar dataKey="proficiency" radius={[0, 4, 4, 0]} barSize={20}>
                        {items.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="hsl(var(--primary))" fillOpacity={0.6 + (entry.proficiency || 50)/200} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="py-24 bg-gradient-to-b from-background to-secondary/10 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Initialize Communication</h2>
            <p className="text-muted-foreground">
              Available for collaboration on complex AI initiatives and system architecture challenges.
            </p>
          </div>

          <div className="bg-card border border-white/10 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase text-muted-foreground">Identifier / Name</label>
                  <input
                    {...form.register("name")}
                    className="w-full rounded-lg bg-secondary/30 border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase text-muted-foreground">Return Address / Email</label>
                  <input
                    {...form.register("email")}
                    className="w-full rounded-lg bg-secondary/30 border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase text-muted-foreground">Payload / Message</label>
                <textarea
                  {...form.register("message")}
                  rows={5}
                  className="w-full rounded-lg bg-secondary/30 border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Describe the problem space..."
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full rounded-lg bg-primary py-4 font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    Execute Transmission <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-12 flex justify-center gap-8 text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors"><Github className="h-6 w-6" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Linkedin className="h-6 w-6" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Mail className="h-6 w-6" /></a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-muted-foreground font-mono border-t border-white/5">
        <p>SYSTEM STATUS: OPERATIONAL // © {new Date().getFullYear()} DEV.AI</p>
      </footer>
    </div>
  );
}

// Icon helper import for 'Activity' used in About section
function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
