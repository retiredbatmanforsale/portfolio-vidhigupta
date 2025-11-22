import { Briefcase } from 'lucide-react';

export default function Timeline() {
  const experiences = [
    {
      title: 'Senior Technical Program Manager',
      company: 'Google',
      period: 'Nov 2023 – Present',
      description: 'Leading Engineering Productivity initiatives, building AI-powered systems to improve developer efficiency across Google products including Search, Ads, YouTube, and Android.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Technical Program Manager',
      company: 'Google',
      period: 'Sep 2021 – Oct 2023',
      description: 'Drove cross-functional technical programs, implementing scalable solutions and optimizing engineering workflows.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Senior Technical Program Manager',
      company: 'Amazon',
      period: 'Nov 2017 – Sep 2021',
      description: 'Led strategic technical programs, managed complex product lifecycles, and delivered high-impact features for Amazon services.',
      color: 'from-orange-400 to-orange-500'
    },
    {
      title: 'Technical Product & Program Manager',
      company: 'MphRx',
      period: 'Jul 2016 – Oct 2017',
      description: 'Managed global medical record delivery systems, driving healthcare technology innovation and cross-border product initiatives.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Technical Product & Program Manager',
      company: 'IgniteWorld',
      period: 'Apr 2015 – Mar 2016',
      description: 'Led product strategy and technical program execution, delivering the MyAirtel app - one of India\'s leading telecom applications.',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Software Engineering Lead',
      company: 'Microsoft',
      period: 'Dec 2013 – Apr 2015',
      description: 'Led software engineering teams, architected solutions, and drove technical excellence in product development.',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Senior Software Engineer',
      company: 'Pitney Bowes',
      period: 'Jul 2008 – Oct 2013',
      description: 'Developed enterprise software solutions, mentored junior engineers, and contributed to core product features.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Software Engineer',
      company: 'Newgen',
      period: 'Jul 2006 – Jun 2008',
      description: 'Started professional journey building software solutions and establishing foundation in enterprise application development.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center">
          Career Journey
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-16"></div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300 hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="md:ml-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border border-slate-200">
                  <div className="absolute left-8 top-8 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hidden md:flex -ml-4">
                    <Briefcase size={16} className="text-white" />
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${exp.color} rounded-lg flex items-center justify-center md:hidden`}>
                      <Briefcase size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-1">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-lg font-semibold text-blue-600">
                          {exp.company}
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-600">{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
