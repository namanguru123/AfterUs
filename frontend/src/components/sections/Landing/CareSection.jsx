import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { slideInUp } from "../../../utils/animations";

export default function CareSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-8xl mx-auto px-6">
        
        <motion.div
          {...slideInUp}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 30px 80px rgba(99,102,241,0.2)",
          }}
          className="
            rounded-3xl 
            bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950
            px-10 py-20
            text-center
            shadow-xl
            relative
            overflow-hidden
            transition-all
            cursor-pointer
          "
        >
          {/* Animated background elements */}
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-20"
          />

          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-20 -left-20 w-40 h-40 border border-indigo-400 rounded-full opacity-20"
          />

          <div className="relative z-10">
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex justify-center mb-6"
            >
              <Heart className="w-12 h-12 text-red-400" fill="currentColor" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="text-3xl font-semibold text-white mb-6"
            >
              This is infrastructure for care
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              If you've ever worried about what would happen to your digital life
              if you couldn't manage it yourself, AfterUs was built for you.
            </motion.p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
