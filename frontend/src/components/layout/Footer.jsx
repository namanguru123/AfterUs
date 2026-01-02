import { Shield, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <Shield size={18} />
              </div>
              <span className="text-lg font-semibold">AfterUs</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Digital continuity infrastructure for responsible individuals.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Product
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#how-it-works" className="hover:text-white">How it works</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#security" className="hover:text-white">Security</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#blog" className="hover:text-white">Blog</a></li>
              <li><a href="#careers" className="hover:text-white">Careers</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#privacy" className="hover:text-white">Privacy</a></li>
              <li><a href="#terms" className="hover:text-white">Terms</a></li>
              <li><a href="#security" className="hover:text-white">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px w-full bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-slate-400">
            © 2025 AfterUs. Built with care for the long term.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Twitter"
              className="rounded-md p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="rounded-md p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
