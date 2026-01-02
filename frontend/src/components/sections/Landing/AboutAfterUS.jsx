import { motion } from "framer-motion";
import { Shield, Database, Key } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem, hoverScale } from "../../../utils/animations";

export default function AboutAfterUs() {
  return (
    <section id="about" className="bg-slate-50 py-28 px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl text-center">
        {/* Eyebrow */}
        <motion.p
          {...fadeInUp}
          className="mb-4 text-xs font-medium tracking-widest text-slate-500 uppercase"
        >
          WHAT AFTERUS IS
        </motion.p>

        {/* Heading */}
        <motion.h2
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
          className="text-4xl font-semibold text-slate-900 md:text-[42px]"
        >
          A digital continuity system,
           not a storage solution
        </motion.h2>

        {/* Subheading */}
        <motion.p
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-slate-600"
        >
          AfterUs is infrastructure for responsibility. It's a system that
          ensures the right people can access the right information at the right
          time — based on conditions you define.
        </motion.p>

        {/* Cards */}
        <motion.div
          {...staggerContainer}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {/* Card 1 */}
          <motion.div
            {...staggerItem}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            className="rounded-2xl bg-white p-8 text-left shadow-sm ring-1 ring-slate-200 transition-all cursor-pointer"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100"
            >
              <Shield className="h-6 w-6 text-slate-700" />
            </motion.div>
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              NOT a password manager
            </h3>
            <p className="text-slate-600">
              We don't store your passwords. We help you plan who should have
              access to them.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            {...staggerItem}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            className="rounded-2xl bg-white p-8 text-left shadow-sm ring-1 ring-slate-200 transition-all cursor-pointer"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100"
            >
              <Database className="h-6 w-6 text-slate-700" />
            </motion.div>
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              NOT a vault
            </h3>
            <p className="text-slate-600">
              We don't hold your files. We organize instructions for accessing
              what already exists.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            {...staggerItem}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            className="rounded-2xl bg-white p-8 text-left shadow-sm ring-1 ring-slate-200 transition-all cursor-pointer"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100"
            >
              <Key className="h-6 w-6 text-slate-700" />
            </motion.div>
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              NOT a banking app
            </h3>
            <p className="text-slate-600">
              We don't touch your money. We help trusted people know where to
              find what matters.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Quote Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(99,102,241,0.15)" }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        className="mt-14 rounded-2xl border border-slate-200 px-8 py-6 shadow-sm text-center bg-gradient-to-br from-white via-blue-50 to-slate-100 mx-auto transition-all"
        style={{ width: "75%", marginTop: "4rem" }}
      >
        <h3 className="mb-3 text-lg font-semibold text-slate-900">
          Instead, AfterUs is a planning layer
        </h3>

        <p className="text-base leading-relaxed text-slate-700">
          Think of it as a bridge between the digital life you've built and the people who will need to manage it <br /> on your behalf. It's about consent, clarity, and continuity.
        </p>
      </motion.div>
    </section>
  );
}
