import { Award, TrendingUp, Users, Zap } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: TrendingUp,
      title: '15+ Years',
      description: 'Experience in software engineering, product management, and program leadership'
    },
    {
      icon: Zap,
      title: 'AI-Powered Innovation',
      description: 'Building systems that improve developer efficiency across Google products'
    },
    {
      icon: Users,
      title: 'Global Impact',
      description: 'Led initiatives at Google, Amazon, Microsoft affecting millions of users'
    },
    {
      icon: Award,
      title: 'Technical Excellence',
      description: 'Expert in AI/ML, cloud platforms, and engineering productivity'
    }
  ];

  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center">
          About Me
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>

        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            As a Senior Technical Program Manager at Google, I lead critical initiatives within the
            Engineering Productivity team, developing AI-powered systems that enhance developer
            efficiency across flagship products including Search, Ads, YouTube, and Android.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            My career spans over 15 years of progressive growth through leadership roles at world-class
            technology companies. From my early days as a Software Engineer to my current position
            driving strategic technical programs at Google, I've consistently delivered scalable
            solutions that transform how teams build and ship products.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            I specialize in bridging technical complexity with strategic execution, leading
            cross-functional teams, and fostering innovation through data-driven decision making
            and AI-enabled automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <item.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
