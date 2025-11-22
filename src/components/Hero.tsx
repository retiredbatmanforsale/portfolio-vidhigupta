import { Mail, Linkedin, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-6 py-20">
      <div className="max-w-5xl w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
            VG
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Vidhi Gupta
            </h1>
            <h2 className="text-2xl md:text-3xl text-blue-600 font-semibold mb-6">
              Senior Technical Program Manager
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Driving AI-powered engineering excellence at Google. 15+ years of experience
              in technology leadership, product development, and scaling innovation across
              global tech companies.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin size={20} className="text-blue-600" />
                <span>Gurugram, India</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/vidhigupta8/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Linkedin size={20} />
                <span>Connect on LinkedIn</span>
              </a>
              <a
                href="mailto:vidhigupta8@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-all border-2 border-slate-200 shadow-lg hover:shadow-xl"
              >
                <Mail size={20} />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
