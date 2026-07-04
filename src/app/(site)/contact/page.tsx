'use client';

import { useState } from 'react';
import { z } from 'zod';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import MagneticButton from '@/components/motion/MagneticButton';
import { Mail, Phone, MapPin, Send, Cpu, AlertTriangle, CheckCircle2 } from 'lucide-react';

const CONTACT_EMAIL = 'idealab@kongu.ac.in'; 
const CONTACT_PHONE = '+91 4294 226555'; 

// Zod Schema for robust client-side validation
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters long.'),
  rollNoDept: z.string().trim().min(3, 'Roll Number / Department identifier is required.'),
  purpose: z.string().trim().min(10, 'Please specify your purpose in at least 10 characters.'),

});

type FormDataType = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    rollNoDept: '',
    purpose: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error inline as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);

      const firstErrorKey = Object.keys(fieldErrors)[0];
      const element = document.getElementById(`field-${firstErrorKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setSubmitting(false);
      return;
    }

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });
    } catch {
      // API error is non-blocking — mailto still works
    }

    const emailSubject = `${formData.name} - KEC Idea Lab`;
    const emailBody = `Name: ${formData.name}\nRoll No / Dept: ${formData.rollNoDept}\n${formData.purpose}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    setSubmitSuccess(true);
    setSubmitting(false);
    window.location.href = mailtoUrl;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      rollNoDept: '',
      purpose: '',
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  return (
    <div id="contact-page-container" className="min-h-screen bg-bg text-text py-16 sm:py-24 relative overflow-hidden">
      {/* Decorative ambient blurred shapes */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <ScrollReveal direction="up">
            <span className="label text-accent block mb-1">
              Connect & Co-create
            </span>
            <h1>
              Contact Us
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08}>
            <p className="body-text">
              Have a question, enquiry, or want to collaborate? Send us a message and we&apos;ll get back to you.
            </p>
          </ScrollReveal>
        </div>

        {/* Main Grid: Form + Info Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right">
              <Card id="contact-form-card" className="p-6 sm:p-8 border border-border bg-bg-elevated/10 shadow-xl shadow-accent/5 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                  <div>
                    <h2>Send an Enquiry</h2>
                    <p className="text-text-secondary text-xs">Fill in your details and we&apos;ll get back to you</p>
                  </div>
                  <Badge variant="primary" className="text-[10px] font-mono tracking-wider">
                    Client-Validated
                  </Badge>
                </div>

                {submitSuccess ? (
                  <div className="bg-success/10 border border-success/20 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
                    <div className="inline-block bg-success/20 p-4 rounded-full text-success shadow-lg shadow-success/10">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-text">Email Pre-Filled Successfully!</h3>
                      <p className="body-text text-xs sm:text-sm max-w-md mx-auto">
                        Your device&apos;s mail client was triggered. If it did not open, click the button below to retry or compose manually to <code className="text-accent font-mono text-xs">{CONTACT_EMAIL}</code>.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <Button variant="primary" size="sm" onClick={handleSubmit}>
                        Retry Email Launch
                      </Button>
                      <Button variant="outline" size="sm" onClick={resetForm}>
                        New Enquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div id="field-name" className="space-y-1.5">
                      <label className="block text-xs font-semibold text-text-secondary">
                        Full Name <span className="text-accent font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Adithyan S"
                        className={`w-full bg-bg border ${
                          errors.name ? 'border-rose-500/80 focus:border-rose-500' : 'border-border focus:border-accent'
                        } rounded-lg px-3.5 py-2 text-sm text-text placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors font-sans`}
                      />
                      {errors.name && (
                        <p className="text-rose-500 text-[11px] font-mono flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 shrink-0" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Roll No / Dept */}
                    <div id="field-rollNoDept" className="space-y-1.5">
                      <label className="block text-xs font-semibold text-text-secondary">
                        Roll Number / Department / Organization <span className="text-accent font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        name="rollNoDept"
                        value={formData.rollNoDept}
                        onChange={handleChange}
                        placeholder="e.g. 21MCR001 - B.E. Mechatronics or ABC Corp"
                        className={`w-full bg-bg border ${
                          errors.rollNoDept ? 'border-rose-500/80 focus:border-rose-500' : 'border-border focus:border-accent'
                        } rounded-lg px-3.5 py-2 text-sm text-text placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors font-sans`}
                      />
                      {errors.rollNoDept && (
                        <p className="text-rose-500 text-[11px] font-mono flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 shrink-0" /> {errors.rollNoDept}
                        </p>
                      )}
                    </div>

                    {/* Purpose */}
                    <div id="field-purpose" className="space-y-1.5">
                      <label className="block text-xs font-semibold text-text-secondary">
                        Purpose / Enquiry Details <span className="text-accent font-bold">*</span>
                      </label>
                      <textarea
                        name="purpose"
                        rows={4}
                        value={formData.purpose}
                        onChange={handleChange}
                        placeholder="Tell us about your enquiry, project, or reason for reaching out..."
                        className={`w-full bg-bg border ${
                          errors.purpose ? 'border-rose-500/80 focus:border-rose-500' : 'border-border focus:border-accent'
                        } rounded-lg px-3.5 py-2 text-sm text-text placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors resize-none`}
                      />
                      {errors.purpose && (
                        <p className="text-rose-500 text-[11px] font-mono flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 shrink-0" /> {errors.purpose}
                        </p>
                      )}
                    </div>

                    {/* Student Expectations Note */}
                    <div className="bg-accent-3/5 border border-accent-3/20 rounded-xl p-4 flex gap-3 items-start">
                      <Cpu className="h-5 w-5 text-accent-3 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-text">Email Dispatch</p>
                        <p className="text-[11px] text-text-secondary leading-normal font-sans">
                          Your device&apos;s default email application will open pre-filled with your details. Review and send from your mail client.
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <MagneticButton className="w-full">
                      <Button type="submit" variant="primary" fullWidth className="gap-2 font-mono uppercase tracking-wider text-xs font-bold h-11 shadow-lg shadow-accent/25">
                        <Send className="h-4 w-4 text-accent-2" />
                        Launch Mail Application
                      </Button>
                    </MagneticButton>
                  </form>
                )}
              </Card>
            </ScrollReveal>
          </div>

          {/* Info Block Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Laboratory Location Card */}
            <ScrollReveal direction="left">
              <Card id="contact-info-card" className="p-6 border border-border bg-bg-elevated/10 space-y-6">
                <h2 className="border-b border-border pb-3">
                  Laboratory Info
                </h2>

                {/* Partner logo strip */}
                <div className="flex items-center justify-center gap-4 pb-4 flex-wrap border-b border-border/40">
                  {[
                    { src: '/AICTE.png', alt: 'AICTE' },
                    { src: '/KEC_new2.png', alt: 'KEC' },
                    { src: '/IDEALab.png', alt: 'IDEA Lab' },
                    { src: '/IIC.png', alt: 'IIC' },
                    { src: '/EMDC.png', alt: 'EMDC' },
                    { src: '/TBI.png', alt: 'TBI' },
                  ].map((logo) => (
                    <div key={logo.alt} className="relative h-14 w-auto opacity-70 hover:opacity-100 transition-opacity">
                      <img src={logo.src} alt={logo.alt} className="h-full w-auto object-contain" />
                    </div>
                  ))}
                </div>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex gap-4 items-start">
                    <div className="bg-accent-3/10 p-2.5 rounded-lg text-accent-3 shrink-0 mt-1 border border-accent-3/10">
                      <MapPin className="h-5 w-5 animate-pulse" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="label text-text-secondary font-bold">Address</h3>
                      <p className="body-text text-xs sm:text-sm">
                        AICTE-KEC Idea Lab, <br />
                        Kongu Engineering College, <br />
                        Perundurai, Erode - 638060, <br />
                        Tamil Nadu, India.
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 items-start">
                    <div className="bg-accent/10 p-2.5 rounded-lg text-accent shrink-0 mt-1 border border-accent/10">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="label text-text-secondary font-bold">Phone</h3>
                      <p className="text-text text-xs sm:text-sm font-mono">
                        {CONTACT_PHONE}
                      </p>
                      <p className="text-[10px] text-text-secondary">Available: Mon - Sat (9:00 AM to 5:00 PM)</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 items-start">
                    <div className="bg-accent-2/10 p-2.5 rounded-lg text-accent-2 shrink-0 mt-1 border border-accent-2/10">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="label text-text-secondary font-bold">Primary Email</h3>
                      <p className="text-text text-xs sm:text-sm font-mono">
                        {CONTACT_EMAIL}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            {/* Google Maps Embed iframe */}
            <ScrollReveal direction="left" delay={0.08}>
              <Card id="maps-embed-card" className="p-0 overflow-hidden border border-border bg-bg-elevated/10 shadow-xl shadow-accent/5 group">
                <div className="p-4 border-b border-border bg-bg/40">
                  <h3 className="label text-text-secondary font-bold flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-accent" />
                    Campus Location
                  </h3>
                </div>
                <div className="relative w-full h-72 bg-bg">
                  <iframe
                    title="Kongu Engineering College Map Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.583271790697!2d77.6074218!3d11.2737666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96d47eb3b1633%3A0xe1083416e5346067!2sKongu%20Engineering%20College!5e0!3m2!1sen!2sin!4v1625624896740!5m2!1sen!2sin"
                    className="w-full h-full border-0 filter grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
