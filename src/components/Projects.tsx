import { Smartphone, Cpu, HeartPulse, ExternalLink } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      icon: Cpu,
      title: 'Engineering Productivity @ Google',
      company: 'Google',
      description: 'Leading the development of AI-enabled developer tooling and automation systems that improve efficiency across Google\'s flagship products including Search, Ads, YouTube, and Android. Implementing ML-powered solutions to optimize engineering workflows at scale.',
      technologies: ['AI/ML', 'Developer Tools', 'Automation', 'Cloud Infrastructure'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Smartphone,
      title: 'MyAirtel App',
      company: 'IgniteWorld',
      description: 'End-to-end delivery of one of India\'s top telecommunications applications. Led product strategy, technical implementation, and launch of features serving millions of users nationwide.',
      technologies: ['Mobile Development', 'Product Management', 'User Experience', 'Scale'],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: HeartPulse,
      title: 'Healthcare Tech Platform',
      company: 'MphRx',
      description: 'Architected and delivered global medical record delivery systems, enabling secure cross-border healthcare data exchange. Drove innovation in healthcare technology with focus on compliance and data security.',
      technologies: ['Healthcare IT', 'Data Security', 'Global Systems', 'Compliance'],
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center">
          Featured Projects
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-16"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group border border-slate-200"
            >
              <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>

              <div className="p-8">
                <div className={`w-14 h-14 bg-gradient-to-br ${project.color} rounded-lg flex items-center justify-center mb-4`}>
                  <project.icon size={28} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {project.title}
                </h3>

                <div className="text-blue-600 font-semibold mb-4">
                  {project.company}
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
