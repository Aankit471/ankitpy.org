"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, MessageCircle, Phone, Mail, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const FAQS = [
  { q: 'How do I book a service?', a: 'Go to Home, tap a service category, select a provider, and confirm your booking in 3 easy steps.' },
  { q: 'How are providers verified?', a: 'All providers go through ID verification (Aadhaar/PAN) and skill assessment before being listed on Fixoo.' },
  { q: 'What if I need to cancel?', a: 'You can cancel for free up to 1 hour before the scheduled time. Go to Bookings and tap your booking to cancel.' },
  { q: 'How do I pay?', a: 'We accept UPI, Credit/Debit Cards, COD, and Fixoo Wallet. Choose your preferred method at checkout.' },
  { q: 'What is the emergency booking?', a: 'Emergency booking guarantees a provider arrives within 30 minutes. Available 24/7.' },
];

export default function Support() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.subject || !form.message) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="px-5 pt-14 pb-4 bg-gradient-to-b from-black to-[#050505]">
        <button onClick={() => router.back()} className="glass p-2 rounded-xl mb-4 border border-white/10">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-sm text-zinc-400 mt-0.5">We're here 24/7 for you</p>
      </div>

      <div className="px-5 pb-8 space-y-5">
        {/* Contact Options */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: MessageCircle, label: 'Live Chat', sub: 'Instant' },
            { icon: Phone, label: 'Call Us', sub: '1800-FIXOO' },
            { icon: Mail, label: 'Email', sub: '24hr reply' },
          ].map(({ icon: Icon, label, sub }) => (
            <button key={label} className="glass rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-red-500/10 border border-white/5 transition-all">
              <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-red-500" />
              </div>
              <p className="font-semibold text-xs">{label}</p>
              <p className="text-xs text-zinc-400">{sub}</p>
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div>
          <h2 className="font-bold mb-3">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <motion.div key={i} className="glass rounded-2xl overflow-hidden border border-white/5">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-sm pr-3">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-red-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-4">
                    <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Complaint Form */}
        <div>
          <h2 className="font-bold mb-3">Submit a Complaint</h2>
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass border border-white/5 rounded-2xl p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="font-bold">Complaint Received!</p>
              <p className="text-sm text-zinc-400 mt-1">We'll respond within 2 hours.</p>
            </motion.div>
          ) : (
            <div className="glass border border-white/5 rounded-2xl p-4 space-y-3">
              <input
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                placeholder="Subject"
                className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50"
              />
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Describe your issue..."
                className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50 h-28 resize-none"
              />
              <button
                onClick={handleSubmit}
                disabled={!form.subject || !form.message}
                className="w-full btn-luxury font-bold py-4 rounded-xl text-sm disabled:opacity-40"
              >
                Submit Complaint
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
