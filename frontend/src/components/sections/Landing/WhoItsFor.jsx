import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "../../../utils/animations";

export default function WhoItsFor() {
  return (
    <section className="bg-white py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          {...fadeInUp}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.p
            className="uppercase tracking-widest text-sm text-slate-500 mb-4"
          >
            Who it's for
          </motion.p>
          <motion.h2
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className="text-4xl font-semibold text-slate-900 mb-6"
          >
            Designed for responsible individuals
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            AfterUs isn't for everyone. It's for people who recognize that
            digital responsibility is part of being a thoughtful human
            in the modern world.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          {...staggerContainer}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          
          {/* Card 1 */}
          <motion.div
            {...staggerItem}
            whileHover={{
              y: -15,
              boxShadow: "0 25px 50px rgba(99,102,241,0.15)",
              borderColor: "rgba(99,102,241,0.5)",
            }}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm transition-all cursor-pointer"
          >
            <motion.div
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-12 h-1 rounded-full bg-indigo-500 mb-6"
            />
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Professionals with complex digital lives
            </h3>
            <p className="text-slate-600 leading-relaxed">
              If you manage business accounts, client relationships,
              or creative work that others would need to access or wind down,
              AfterUs helps you plan for continuity without compromise.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            {...staggerItem}
            whileHover={{
              y: -15,
              boxShadow: "0 25px 50px rgba(99,102,241,0.15)",
              borderColor: "rgba(99,102,241,0.5)",
            }}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm transition-all cursor-pointer"
          >
            <motion.div
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-12 h-1 rounded-full bg-indigo-500 mb-6"
            />
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Families with shared responsibilities
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Whether it's shared finances, children's accounts,
              or elderly parents' information, AfterUs ensures the
              right family members can step in when needed.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            {...staggerItem}
            whileHover={{
              y: -15,
              boxShadow: "0 25px 50px rgba(99,102,241,0.15)",
              borderColor: "rgba(99,102,241,0.5)",
            }}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm transition-all cursor-pointer"
          >
            <motion.div
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="w-12 h-1 rounded-full bg-indigo-500 mb-6"
            />
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Anyone who thinks long-term
            </h3>
            <p className="text-slate-600 leading-relaxed">
              You plan for your health, your finances, your career.
              AfterUs is for people who recognize that digital continuity
              deserves the same level of intentional planning.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
