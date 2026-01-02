import { motion } from "framer-motion";
import { FileText, Users, Clock } from "lucide-react";
import { fadeInUp, slideInUp, staggerContainer, staggerItem, bounceInUp } from "../../../utils/animations";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-white py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <motion.p
            {...fadeInUp}
            className="text-sm tracking-widest text-slate-500 uppercase mb-4"
          >
            How it works
          </motion.p>

          <motion.h2
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl font-semibold text-slate-900"
          >
            Three steps to digital continuity
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-slate-600"
          >
            Building a plan takes intention, not hours. AfterUs guides you
            through a structured process designed for clarity and completeness.
          </motion.p>
        </div>

        {/* Steps */}
        <motion.div
          {...staggerContainer}
          className="space-y-16"
        >

          {/* Step 01 */}
          <motion.div
            {...staggerItem}
            whileHover={{ x: 10 }}
            className="grid grid-cols-[80px_1fr] gap-8 items-start transition-all"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <span className="text-5xl font-light text-indigo-500">01</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="mt-6 w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center"
              >
                <FileText className="text-indigo-600" />
              </motion.div>
            </motion.div>

            <motion.div
              whileHover={{
                boxShadow: "0 20px 40px rgba(99,102,241,0.15)",
              }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 transition-all"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                Define your digital assets
              </h3>
              <p className="mt-3 text-slate-600">
                Map out what matters: accounts, documents, files, and instructions.
                You're not uploading anything — just creating a structured record
                of what exists and where.
              </p>
            </motion.div>
          </motion.div>

          {/* Step 02 */}
          <motion.div
            {...staggerItem}
            whileHover={{ x: 10 }}
            className="grid grid-cols-[80px_1fr] gap-8 items-start transition-all"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="text-5xl font-light text-violet-500">02</span>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="mt-6 w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center"
              >
                <Users className="text-violet-600" />
              </motion.div>
            </motion.div>

            <motion.div
              whileHover={{
                boxShadow: "0 20px 40px rgba(147,51,234,0.15)",
              }}
              className="bg-violet-50 border border-violet-100 rounded-2xl p-8 transition-all"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                Assign trusted people
              </h3>
              <p className="mt-3 text-slate-600">
                Choose who should have access to what. Family, business partners,
                legal representatives — each with specific permissions tailored
                to their role and your intent.
              </p>
            </motion.div>
          </motion.div>

          {/* Step 03 */}
          <motion.div
            {...staggerItem}
            whileHover={{ x: 10 }}
            className="grid grid-cols-[80px_1fr] gap-8 items-start transition-all"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="flex flex-col items-center"
            >
              <span className="text-5xl font-light text-amber-500">03</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 0.5 }}
                className="mt-6 w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center"
              >
                <Clock className="text-amber-600" />
              </motion.div>
            </motion.div>

            <motion.div
              whileHover={{
                boxShadow: "0 20px 40px rgba(217,119,6,0.15)",
              }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-8 transition-all"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                Set conditions for access
              </h3>
              <p className="mt-3 text-slate-600">
                Define when and how access is granted. Time-based triggers,
                verification steps, multi-party consent — your plan activates
                exactly as you intend, never before.
              </p>
            </motion.div>
          </motion.div>

        </motion.div>

        {/* Footer note */}
        <motion.p
          {...slideInUp}
          transition={{ ...slideInUp.transition, delay: 0.5 }}
          className="mt-24 text-center text-slate-600 max-w-3xl mx-auto"
        >
          Once your plan is active, AfterUs continuously monitors the conditions
          you've set, ensuring everything works exactly as intended.
        </motion.p>

      </div>
    </section>
  );
}
