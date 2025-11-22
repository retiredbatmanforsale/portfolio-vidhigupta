import { Brain, Cloud, Users, BarChart, Workflow, Shield } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      skills: ['AI-Powered Systems', 'Machine Learning', 'Data Analytics', 'Automation']
    },
    {
      icon: Cloud,
      title: 'Technical Expertise',
      skills: ['Cloud Platforms', 'Product Lifecycle Management', 'Engineering Productivity', 'Software Architecture']
    },
    {
      icon: Users,
      title: 'Leadership',
      skills: ['Cross-functional Collaboration', 'Team Leadership', 'Stakeholder Management', 'Mentorship']
    },
    {
      icon: BarChart,
      title: 'Strategic Planning',
      skills: ['Program Management', 'Technical Strategy', 'OKR Development', 'Resource Planning']
    },
    {
      icon: Workflow,
      title: 'Methodologies',
      skills: ['Agile & Scrum', 'DevOps Practices', 'Continuous Improvement', 'Process Optimization']
    },
    {
      icon: Shield,
      title: 'Engineering Excellence',
      skills: ['Quality Assurance', 'Performance Optimization', 'Scalable Systems', 'Best Practices']
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center">
          Skills & Expertise
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-16"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <category.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="flex items-center gap-2 text-slate-700"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
