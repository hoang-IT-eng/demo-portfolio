import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Sparkles, Mail, MessageSquare, Briefcase } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '3D Modeling & Visualization',
    budget: '$5,000 - $10,000',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep state briefly, can be reset on close
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#121316] border border-[#252830] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-[#D7E2EA]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#8C9BA5] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                  Message Sent to Mina!
                </h3>
                <p className="text-sm text-[#8C9BA5] max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="text-white font-medium">{formData.name || 'there'}</span>. Mina will review your project brief and reply within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-white text-[#0C0C0C] font-semibold text-sm uppercase tracking-wider hover:bg-[#D7E2EA] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="space-y-1 mb-6">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B600A8]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Start a Project</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    Let&apos;s build something striking
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8C9BA5]">
                    Tell Mina about your concept, timeline, and vision.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#8C9BA5] mb-1.5">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full bg-[#0C0C0C] border border-[#252830] focus:border-[#B600A8] focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#4E5663] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#8C9BA5] mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@studio.com"
                        className="w-full bg-[#0C0C0C] border border-[#252830] focus:border-[#B600A8] focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#4E5663] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-[#8C9BA5] mb-1.5">
                        Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#0C0C0C] border border-[#252830] focus:border-[#B600A8] focus:outline-none rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white transition-colors"
                      >
                        <option value="3D Modeling">01 · 3D Modeling</option>
                        <option value="Rendering">02 · Photorealistic Rendering</option>
                        <option value="Motion Design">03 · Motion Design</option>
                        <option value="Branding">04 · Brand Systems</option>
                        <option value="Web Design">05 · Web Design & 3D WebGL</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-[#8C9BA5] mb-1.5">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#0C0C0C] border border-[#252830] focus:border-[#B600A8] focus:outline-none rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white transition-colors"
                      >
                        <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                        <option value="$25,000+">$25,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#8C9BA5] mb-1.5">
                      Project Details
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe what you want to create, visual inspiration, or milestone dates..."
                      className="w-full bg-[#0C0C0C] border border-[#252830] focus:border-[#B600A8] focus:outline-none rounded-xl p-3 text-sm text-white placeholder-[#4E5663] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 px-6 text-white font-medium uppercase tracking-widest text-xs sm:text-sm transition-transform active:scale-95 cursor-pointer"
                      style={{
                        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                        outline: '2px solid white',
                        outlineOffset: '-3px',
                      }}
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Project Inquiry</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
