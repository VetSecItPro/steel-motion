'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { slideInUp } from "@/lib/animations"

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Most projects launch in 4-12 weeks depending on scope. AI automation projects typically take 4-6 weeks. Custom software takes 8-12 weeks. We'll give you a timeline in your free strategy call.",
  },
  {
    question: "Do I own the code?",
    answer: "Yes, 100%. Every line of code, every design asset, every piece of documentation. No vendor lock-in, no proprietary frameworks. It's yours.",
  },
  {
    question: "How much does it cost?",
    answer: "Projects start at $2,500 for focused AI automation. Custom software ranges from $10,000-$50,000. Every project gets a fixed-price quote upfront — no hourly surprises.",
  },
  {
    question: "Do you work with businesses my size?",
    answer: "Yes. We work with small and mid-sized businesses across DFW — restaurants, dental offices, law firms, contractors, e-commerce, and more. If you have a process that's eating up time, we can probably automate it.",
  },
  {
    question: "What happens after the project launches?",
    answer: "Every project includes 30 days of post-launch support at no extra charge. After that, we offer optional monthly maintenance plans or you can maintain it yourself — we give you full documentation and training.",
  },
  {
    question: "What's the first step?",
    answer: "Book a free 30-minute strategy call. We'll talk about what's slowing your business down, whether AI or custom software can help, and give you a ballpark estimate. No pressure, no pitch — just an honest conversation.",
  },
]

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-sm-border-inverse/30 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-sm-surface-inverse-alt/30 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-sm-text-inverse pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-sm-accent-inverse flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden={true}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="px-6 pb-6 text-sm-text-inverse-muted leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-sm-surface-inverse">
      <div className="container mx-auto px-4">
        <motion.div {...slideInUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-sm-accent-inverse/10 text-sm-accent-inverse rounded-full px-4 py-2 text-sm font-medium mb-4">
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-sm-text-inverse">
            Common Questions
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              {...slideInUp}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
