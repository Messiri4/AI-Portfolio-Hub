import { useRoute } from "wouter";
import { useProject } from "@/hooks/use-portfolio";
import { Navbar } from "@/components/Navbar";
import { TechBadge } from "@/components/TechBadge";
import { ArrowLeft, Github, ExternalLink, Calendar, Layers, Activity } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const [match, params] = useRoute("/project/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-primary font-mono">
        LOADING_DATA...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background gap-4">
        <h1 className="text-2xl font-bold text-destructive font-display">ERROR 404</h1>
        <p className="text-muted-foreground">Project data not found.</p>
        <Link href="/#projects">
          <button className="px-4 py-2 bg-secondary rounded hover:bg-secondary/80 transition-colors text-sm font-mono">
            RETURN_HOME
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <Link href="/#projects">
            <a className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-mono group">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              BACK_TO_INDEX
            </a>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="border-b border-white/10 pb-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                    {project.title}
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-foreground"
                      title="View Source"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <TechBadge key={tech} variant="accent">{tech}</TechBadge>
                ))}
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2 space-y-12">
                
                <section>
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    <Layers className="h-5 w-5" />
                    <h2 className="text-lg font-mono font-bold uppercase tracking-wider">Problem Statement</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p className="whitespace-pre-line leading-relaxed">{project.problemStatement}</p>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    <Activity className="h-5 w-5" />
                    <h2 className="text-lg font-mono font-bold uppercase tracking-wider">Methodology & Architecture</h2>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-6 border border-white/5">
                     <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{project.methodology}</p>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                    </div>
                    <h2 className="text-lg font-mono font-bold uppercase tracking-wider">Outcomes & Metrics</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-foreground">
                    <p className="whitespace-pre-line leading-relaxed">{project.outcome}</p>
                  </div>
                </section>

              </div>

              {/* Sidebar Metadata */}
              <div className="space-y-6">
                <div className="rounded-xl border border-white/10 bg-card p-6">
                  <h3 className="text-sm font-mono font-bold text-muted-foreground uppercase mb-4">Project Metadata</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-foreground">Created: {new Date(project.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="h-px bg-white/5 my-4" />
                    
                    <div>
                      <span className="text-xs text-muted-foreground mb-2 block font-mono">PRIMARY STACK</span>
                      <ul className="space-y-2">
                        {project.techStack.slice(0, 4).map(tech => (
                          <li key={tech} className="text-sm flex items-center gap-2">
                            <span className="h-1 w-1 bg-primary rounded-full" />
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual Placeholder if Image URL exists */}
            {project.imageUrl && (
              <div className="rounded-xl overflow-hidden border border-white/10 bg-secondary/20 aspect-video relative group">
                {/* HTML Comment for Image */}
                {/* project detail visualization generic technical */}
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
            )}
            
          </motion.div>
        </div>
      </main>
    </div>
  );
}
