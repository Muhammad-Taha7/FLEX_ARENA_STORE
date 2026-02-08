import React, { useState } from 'react'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // ✅ FIXED: Firebase Realtime Database URL - MUST end with .json
      const firebaseURL = 'https://flex-arena-gym-store-default-rtdb.firebaseio.com/contacts.json'
      
      const response = await fetch(firebaseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          status: 'new'
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000)
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#097969] to-black opacity-60"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#097969] rounded-full blur-[120px] opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#097969] rounded-full blur-[150px] opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 text-center px-8 max-w-5xl">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase">
            Get In <span className="text-[#097969]">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
            We're here to help you achieve your fitness goals
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Side - Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Let's Start a
                <span className="block text-[#097969]">Conversation</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Whether you have questions about our products, need support, or want to partner with us, our team is ready to help. Drop us a message and we'll get back to you within 24 hours.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Email */}
              <div className="group relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#097969]/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#097969] to-[#065951] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_30px_rgba(9,121,105,0.4)] transition-all duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Email Us</h3>
                    <p className="text-gray-400 mb-2">Send us an email anytime</p>
                    <a href="mailto:support@fitgear.com" className="text-[#097969] font-semibold hover:underline">
                      support@fitgear.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="group relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#097969]/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#097969] to-[#065951] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_30px_rgba(9,121,105,0.4)] transition-all duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Call Us</h3>
                    <p className="text-gray-400 mb-2">Mon-Fri from 8am to 6pm</p>
                    <a href="tel:+1234567890" className="text-[#097969] font-semibold hover:underline">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="group relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#097969]/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#097969] to-[#065951] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_30px_rgba(9,121,105,0.4)] transition-all duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Visit Us</h3>
                    <p className="text-gray-400 mb-2">Come say hello at our HQ</p>
                    <p className="text-[#097969] font-semibold">
                      123 Fitness Street, Gym City<br />
                      CA 90210, United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Our Journey</h3>
              <div className="flex gap-4">
                {[
                  { icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', label: 'Twitter' },
                  { icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', label: 'Facebook' },
                  { icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 2h9a5.5 5.5 0 015.5 5.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z', label: 'Instagram' }
                ].map((social, idx) => (
                  <button
                    key={idx}
                    className="w-12 h-12 bg-white/5 hover:bg-[#097969] rounded-xl flex items-center justify-center border border-white/10 hover:border-[#097969] transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="relative">
            {/* Glow effect behind form */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#097969]/20 to-[#097969]/5 rounded-3xl blur-2xl"></div>
            
            <form onSubmit={handleSubmit} className="relative bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-10 rounded-3xl border border-white/20 backdrop-blur-sm">
              <h3 className="text-3xl font-black mb-8">Send Us a Message</h3>
              
              {/* Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#097969] focus:ring-2 focus:ring-[#097969]/50 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#097969] focus:ring-2 focus:ring-[#097969]/50 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-bold mb-2 text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#097969] focus:ring-2 focus:ring-[#097969]/50 transition-all duration-300"
                  placeholder="+1 (234) 567-890"
                />
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-bold mb-2 text-gray-300">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#097969] focus:ring-2 focus:ring-[#097969]/50 transition-all duration-300"
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-bold mb-2 text-gray-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#097969] focus:ring-2 focus:ring-[#097969]/50 transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-[#097969] to-[#0a9178] hover:from-[#0a9178] hover:to-[#097969] text-white font-bold py-4 px-8 rounded-xl text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(9,121,105,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  isSubmitting ? 'animate-pulse' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-6 p-4 bg-[#097969]/20 border border-[#097969] rounded-xl flex items-start gap-3 animate-[fadeIn_0.3s_ease-out]">
                  <svg className="w-6 h-6 text-[#097969] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-bold text-[#097969]">Message Sent Successfully!</p>
                    <p className="text-sm text-gray-300 mt-1">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-xl flex items-start gap-3 animate-[fadeIn_0.3s_ease-out]">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-bold text-red-500">Oops! Something went wrong.</p>
                    <p className="text-sm text-gray-300 mt-1">Please try again or contact us directly.</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative py-20 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#097969]/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Find Us on the <span className="text-[#097969]">Map</span>
            </h2>
            <p className="text-gray-400 text-lg">Visit our headquarters and experience FitGear in person</p>
          </div>
          
          <div className="relative h-96 rounded-3xl overflow-hidden border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#097969]/20 via-black/40 to-black/60 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-[#097969]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-xl font-bold mb-2">123 Fitness Street, Gym City</p>
                <p className="text-gray-400">CA 90210, United States</p>
                <button className="mt-6 bg-[#097969] hover:bg-[#0a9178] text-white font-bold py-3 px-8 rounded-full transition-all duration-300">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}