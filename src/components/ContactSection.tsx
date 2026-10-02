import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      alert('Please fill out all fields (Name, Email, Subject, and Message).');
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    };

    setSubmittedData(payload);
    setSubmitted(true);

    // Construct standard mailto link to send data directly to mutaalabdul89@gmail.com
    const emailSubject = encodeURIComponent(`[A.M Accessories Inquiry] ${payload.subject}`);
    const emailBody = encodeURIComponent(
      `Customer Name: ${payload.name}\n` +
      `Customer Email: ${payload.email}\n` +
      `Subject: ${payload.subject}\n\n` +
      `Message:\n${payload.message}\n\n` +
      `-- Sent from A.M Accessories Website Contact Form --`
    );

    const mailtoUrl = `mailto:${BUSINESS_INFO.email}?subject=${emailSubject}&body=${emailBody}`;

    // Trigger the email client
    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.log('Mailto triggered', err);
    }
  };

  const handleSendViaWhatsApp = () => {
    if (!submittedData) return;
    const msg = `Salam A.M Accessories!
Name: ${submittedData.name}
Email: ${submittedData.email}
Subject: ${submittedData.subject}
Message: ${submittedData.message}`;
    const url = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-sky-50/60 border-t border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 border border-sky-200 px-3 py-1 rounded-full mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
            Get In Touch
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact A.M Accessories
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Have questions about a mobile charger, earbuds warranty, or nationwide parcel delivery?
            Send us a message or chat with our Karachi support team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Business Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-sky-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Official Business Information
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-sky-100 text-sky-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Store Location</div>
                    <div className="text-slate-600 mt-0.5">{BUSINESS_INFO.location}</div>
                    <div className="text-[11px] text-sky-700 font-medium mt-0.5">
                      Dispatching daily across Sindh, Punjab, KPK & Balochistan
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Call Support</div>
                    <a
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="text-slate-700 hover:text-sky-600 font-semibold transition-colors block mt-0.5"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                    <div className="text-[11px] text-slate-500">10:00 AM - 10:00 PM (PKT)</div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">WhatsApp Direct Chat</div>
                    <a
                      href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline transition-colors block mt-0.5 font-bold"
                    >
                      {BUSINESS_INFO.whatsapp}
                    </a>
                    <div className="text-[11px] text-slate-500">Fastest response for order tracking</div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Direct Email</div>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-slate-700 hover:text-sky-600 font-semibold transition-colors block mt-0.5"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                    <div className="text-[11px] text-slate-500">
                      Form submissions sent straight to this inbox
                    </div>
                  </div>
                </div>
              </div>

              {/* Service guarantee */}
              <div className="pt-4 border-t border-sky-100 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>Prompt Response Guarantee</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  We review every customer inquiry thoroughly. Whether you need bulk order pricing or assistance setting up your smartwatch, our team is at your service.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-sky-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Send Us a Direct Message
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Form submissions are dispatched immediately to{' '}
                    <strong className="text-sky-700">{BUSINESS_INFO.email}</strong>
                  </p>
                </div>
                <span className="p-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-600">
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>

              {submitted && submittedData ? (
                <div className="space-y-4 p-5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                    <span>Inquiry Successfully Prepared & Sent!</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Thank you, <strong>{submittedData.name}</strong>. Your message with subject{' '}
                    <em>"{submittedData.subject}"</em> has been transmitted to{' '}
                    <strong className="text-sky-700">{BUSINESS_INFO.email}</strong>.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2.5">
                    <a
                      href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
                        submittedData.subject
                      )}&body=${encodeURIComponent(
                        `From: ${submittedData.name} (${submittedData.email})\n\n${submittedData.message}`
                      )}`}
                      className="px-4 py-2 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in Email App</span>
                    </a>

                    <button
                      onClick={handleSendViaWhatsApp}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Also Send on WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setSubject('');
                        setMessage('');
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Asad Rehman"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-sky-50/50 border border-sky-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-sky-50/50 border border-sky-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Inquiry regarding Power Bank 20,000mAh or Bulk Order"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-sky-50/50 border border-sky-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your questions or order inquiries here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-sky-50/50 border border-sky-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer shadow-md shadow-sky-500/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message to {BUSINESS_INFO.email}</span>
                    </button>
                    <span className="text-[11px] text-slate-500 text-center sm:text-right font-medium">
                      Direct recipient: {BUSINESS_INFO.email}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
