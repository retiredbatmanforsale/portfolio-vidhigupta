import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center">
          Education
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-16"></div>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-lg p-8 md:p-10 border border-slate-200">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <GraduationCap size={32} className="text-white" />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Bachelor of Computer Science
              </h3>

              <div className="text-xl text-blue-600 font-semibold mb-4">
                Punjab University
              </div>

              <div className="flex flex-wrap gap-6 text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-blue-600" />
                  <span>2002 – 2006</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-blue-600" />
                  <span>Punjab, India</span>
                </div>
              </div>

              <p className="mt-6 text-slate-700 leading-relaxed">
                Built a strong foundation in computer science fundamentals, software engineering
                principles, and problem-solving methodologies that have driven my 15+ year career
                in technology leadership.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
