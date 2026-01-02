import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "../../../utils/animations";

export default function ProblemSection() {
  return (
    <section className="relative bg-white py-28 px-6 align-center text-center overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 20% 50%, rgba(99,102,241,0.1) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />
      <div className="mx-auto max-w-4xl relative z-10">
        {/* Eyebrow */}
        <motion.div
          {...fadeInUp}
          className="mb-6 flex items-center gap-2 text-xs font-medium tracking-widest text-slate-500 uppercase text-center justify-center"
        >
          <span className="text-sm">ⓘ</span>
          THE MODERN PROBLEM
        </motion.div>

        {/* Title */}
        <motion.h2
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
          className="mb-10 text-4xl font-semibold leading-tight text-slate-900 md:text-[42px]"
        >
          Our lives are digital. Our plans are not.
        </motion.h2>

        {/* Content */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="space-y-6 text-[17px] leading-relaxed text-slate-600 text-left"
        >
          <p>
            We carefully plan for our physical assets — wills, trusts, power of
            attorney. But what about the digital infrastructure we depend on
            every day?
          </p>

          <p>
            Your family photos in the cloud. Business accounts. Financial
            records. Health information. Creative work. The logins, the access
            codes, the two-factor devices.
          </p>

          <p>
            When something happens to you — an accident, a medical emergency, or
            simply the passage of time — the people who need access won’t have
            it. Not because you didn’t trust them, but because you never had a
            way to plan for it responsibly.
          </p>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          {...scaleIn}
          transition={{ ...scaleIn.transition, delay: 0.3 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          className="mt-14 rounded-2xl border border-slate-200 bg-slate-50/80 px-8 py-6 shadow-sm backdrop-blur hover:shadow-lg hover:border-indigo-300 transition-colors cursor-default"
        >
          <p className="text-base leading-relaxed text-slate-700">
            "Digital continuity isn't about passwords. It's about responsibility,
            consent, and ensuring the people you trust can act on your behalf
            when you can't."
          </p>
        </motion.div>
      </div>
    </section>
  );
}