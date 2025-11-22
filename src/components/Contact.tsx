import { Mail, Linkedin, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Let's Connect
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>

        <p className="text-xl text-slate-300 mb-12 leading-relaxed">
          Interested in discussing technology leadership, program management, or collaboration opportunities?
          I'd love to hear from you.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
          <a
            href="https://www.linkedin.com/in/vidhigupta8/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            <Linkedin size={24} />
            <span>Connect on LinkedIn</span>
          </a>

          <a
            href="mailto:vidhigupta8@gmail.com"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-lg transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            <Mail size={24} />
            <span>Send an Email</span>
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-700">
          <p className="text-slate-400">
            © 2025 Vidhi Gupta. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
