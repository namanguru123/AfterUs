import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import "./hero.css"
import { FileText, Users, Clock, CircleArrowRight } from "lucide-react";
import { fadeInUp, buttonHover } from "../../../utils/animations";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const words = ["digital life", "digital assets", "legacy"]
  const currentWord = words[wordIndex]

  useEffect(() => {
    let charIndex = 0
    let timeout

    const typeCharacter = () => {
      if (charIndex < currentWord.length) {
        setDisplayedText(currentWord.slice(0, charIndex + 1))
        charIndex++
        timeout = setTimeout(typeCharacter, 80)
      } else {
        timeout = setTimeout(() => {
          setDisplayedText("")
          setWordIndex((prev) => (prev + 1) % words.length)
        }, 2500)
      }
    }

    timeout = setTimeout(typeCharacter, 100)
    return () => clearTimeout(timeout)
  }, [wordIndex])

  return (
    <section className="hero-section relative from-white via-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 left-20 w-80 h-80 bg-indigo-400 rounded-full filter blur-3xl opacity-20"
      />

      <div className="relative z-10">
        {/* LEFT */}
        <div>
        
          <motion.h1
            {...fadeInUp}
            className="hero-title max-w-2xl"
          >
            Plan what happens to your
            <br />
            <span className="animated-word">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="cursor"
              />
            </span>
            <br />
            — even when you can't.
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="hero-description max-w-xl mt-8"
          >
            AfterUs is a digital continuity system that ensures trusted people
            can access what they need, when it matters most — based on
            conditions you define today. Not a vault. Not a password manager.
            A thoughtful plan for digital responsibility.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
            className="mt-10 flex items-center gap-6"
          >
            <motion.button
              {...buttonHover}
              className="btn-primary"
              aria-label="Create your plan"
            >
              Create your plan 
            </motion.button>

            <motion.button
              {...buttonHover}
              className="btn-secondary"
              aria-label="See how it works"
            >
               See how it works
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.25 }}
          className="hero-trust-row"
        >
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="trust-item"
          >
            <span className="trust-dot"></span>
            <span>End-to-end encrypted</span>
          </motion.div>

          <motion.div
            animate={{ x: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="trust-item"
          >
            <span className="trust-dot"></span>
            <span>Zero-knowledge architecture</span>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <div className="flex justify-end self-end mt-5">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 30px rgba(99,102,241,0.1)",
                "0 0 60px rgba(99,102,241,0.3)",
                "0 0 30px rgba(99,102,241,0.1)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hero-glow"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="hero-card"
            role="region"
            aria-label="Example dashboard preview"
          >
            <div className="space-y-4">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="mini-card"
              >
                <div>
                  
                  <h4><FileText  color="#4f46e5"/>Digital Assets</h4>
                  <p>Documents, accounts, and important files</p>
                </div>
                <span>12 items</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                className="mini-card"
              >
                <div>
                   
                  <h4><Users  color="#4f46e5"/>Trusted People</h4>
                  <p>Who can access what, and when</p>
                </div>
                <span>3 people</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
                className="mini-card"
              >
                <div>
                    
                 
                  <h4><Clock  color="#e5e546ff" />Conditions</h4>
                  <p>When and how access is granted</p>
                </div>
                <span>5 rules</span>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="card-cta mt-6"
              role="button"
              tabIndex={0}
            >
              <div className="card-cta-inner">
                <span>Plan active and monitored </span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="card-cta-arrow"
                />
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <CircleArrowRight className="ml-2" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
