import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Fingerprint,
  Lock,
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "../../../utils/animations";

export default function PrivacySecurity() {
  return (
    <section id="security" className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-28 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-secondary rounded-full filter blur-3xl opacity-20"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          {...fadeInUp}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.p
            className="uppercase tracking-widest text-sm text-slate-400 mb-4"
          >
            Privacy & Security
          </motion.p>
          <motion.h2
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className="text-4xl font-semibold mb-6"
          >
            Built on principles, not promises
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="text-slate-300 text-lg"
          >
            Security isn't a feature we added. It's the foundation of how AfterUs works.
            These aren't marketing claims — they're architectural decisions.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          {...staggerContainer}
          className="grid md:grid-cols-2 gap-8 mt-20"
        >
          
          {/* Card 1 */}
          <motion.div
            {...staggerItem}
            whileHover={{
              y: -10,
              boxShadow: "0 0 30px rgba(99,102,241,0.3)",
              borderColor: "rgba(99,102,241,0.5)",
            }}
            className="rounded-2xl bg-slate-800/60 border border-slate-700 p-8 transition-all cursor-pointer backdrop-blur"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-700 mb-6"
            >
              <Shield className="text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">
              End-to-end encryption
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Your plan is encrypted on your device before it ever reaches our servers.
              We can't read it. No one can — except the people you authorize under
              the conditions you set.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            {...staggerItem}
            whileHover={{
              y: -10,
              boxShadow: "0 0 30px rgba(99,102,241,0.3)",
              borderColor: "rgba(99,102,241,0.5)",
            }}
            className="rounded-2xl bg-slate-800/60 border border-slate-700 p-8 transition-all cursor-pointer backdrop-blur"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-700 mb-6"
            >
              <Eye className="text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">
              Zero-knowledge architecture
            </h3>
            <p className="text-slate-300 leading-relaxed">
              We don't know what you're protecting or who you've designated.
              Our infrastructure is designed to facilitate your plan without
              accessing its contents.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            {...staggerItem}
            whileHover={{
              y: -10,
              boxShadow: "0 0 30px rgba(99,102,241,0.3)",
              borderColor: "rgba(99,102,241,0.5)",
            }}
            className="rounded-2xl bg-slate-800/60 border border-slate-700 p-8 transition-all cursor-pointer backdrop-blur"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-700 mb-6"
            >
              <Fingerprint className="text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">
              Consent-first access
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Access is never automatic. Every trigger requires verification.
              Every handoff is logged. Trusted people can only act within
              permissions you explicitly grant.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            {...staggerItem}
            whileHover={{
              y: -10,
              boxShadow: "0 0 30px rgba(99,102,241,0.3)",
              borderColor: "rgba(99,102,241,0.5)",
            }}
            className="rounded-2xl bg-slate-800/60 border border-slate-700 p-8 transition-all cursor-pointer backdrop-blur"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-700 mb-6"
            >
              <Lock className="text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">
              Tamper-evident records
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Any change to your plan — whether by you or a condition being met —
              is cryptographically recorded. Full audit trail, always.
            </p>
          </motion.div>

        </motion.div>

        {/* Bottom Trust Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="mt-16 rounded-2xl bg-slate-800/60 border border-slate-700 p-8 text-center max-w-4xl mx-auto transition-all backdrop-blur"
        >
          <p className="text-slate-200 text-lg leading-relaxed">
            We don't collect personal information. We don't sell data.
            We don't have access to your plan's contents.
            <br />
            <span className="text-slate-300">
              AfterUs exists to serve your intent — not monetize your trust.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
