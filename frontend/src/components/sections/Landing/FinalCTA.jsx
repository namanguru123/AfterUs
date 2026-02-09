import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { fadeInUp, buttonHover, staggerContainer, staggerItem } from "../../../utils/animations";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Soft radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_65%)]" />

      {/* Animated background */}
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent rounded-full filter blur-3xl opacity-20"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Small label */}
        <motion.div
          {...fadeInUp}
          className="mb-6 flex items-center justify-center gap-2 text-sm font-medium text-accent"
        >
          <motion.span
            animate={{ rotate: [0, 20, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ⚡
          </motion.span>
          <span className="tracking-wide uppercase">
            Get started today
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
          className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl"
        >
          The best time to plan was yesterday.
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent"
          >
            The second best time is now.
          </motion.span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-600"
        >
          Building a digital continuity plan doesn't take long.
          But the peace of mind it provides — for you and the people
          you trust — is immeasurable.
        </motion.p>

        {/* Buttons */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            {...buttonHover}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-slate-800 active:scale-95"
          >
            Start your plan today
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.button>

          <motion.button
            {...buttonHover}
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50 active:scale-95"
          >
            Talk to our team
          </motion.button>
        </motion.div>

        {/* Trust points */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600"
        >
          {[
            "No credit card required",
            "14-day free trial",
            "Cancel anytime",
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.2, repeat: Infinity }}
              >
                <Check className="h-4 w-4 text-emerald-500" />
              </motion.span>
              <span>{item}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 50px rgba(99,102,241,0.2)",
            borderColor: "rgba(99,102,241,0.5)",
          }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="mt-20 rounded-2xl border border-light bg-light/60 p-10 text-center shadow-sm transition-all cursor-default"
        >
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-primary">
            "We built AfterUs because we believe responsible people
            deserve responsible tools. Digital continuity shouldn't
            be an afterthought — it should be as natural as any other
            form of planning for the people and things we care about."
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="h-10 w-10 rounded-full bg-accent"
            />
            <div className="text-left">
              <p className="font-medium text-primary">
                The AfterUs Team
              </p>
              <p className="text-sm text-secondary">
                Building for the long term
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
