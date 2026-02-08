import React from 'react'

export const About = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#097969] to-black opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(9,121,105,0.3),transparent_70%)] animate-pulse"></div>
        
        {/* Hero content */}
        <div className="relative z-10 text-center px-8 max-w-5xl">
          <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter uppercase bg-gradient-to-r from-white via-[#097969] to-white bg-clip-text text-transparent animate-[fadeIn_1s_ease-out]">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide animate-[fadeIn_1.5s_ease-out]">
            Where passion meets performance
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#097969] rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-[#097969] rounded-full animate-[scrollDown_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      {/* Story Timeline */}
      <div className="relative py-32 px-8">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#097969] via-[#097969] to-transparent hidden lg:block"></div>

        {/* Chapter 1: The Beginning */}
        <div className="max-w-7xl mx-auto mb-40 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:text-right lg:pr-20">
              <div className="inline-block mb-6">
                <span className="text-[#097969] text-sm font-bold tracking-widest uppercase border border-[#097969] px-4 py-2 rounded-full">
                  Chapter 01
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                It Started with a
                <span className="block text-[#097969]">Dream</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                In 2018, three fitness enthusiasts gathered in a small garage gym. We were tired of compromising—tired of equipment that broke down, apparel that didn't perform, and a market that didn't understand what real athletes needed.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                We decided to build something different. Something authentic. Something that would stand up to the intensity of real training, real sweat, real dedication.
              </p>
            </div>
            <div className="relative lg:pl-20">
              <div className="absolute -left-4 lg:left-16 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#097969] rounded-full border-4 border-black hidden lg:block"></div>
              <div className="bg-gradient-to-br from-[#097969]/20 to-transparent p-12 rounded-2xl border border-[#097969]/30 backdrop-blur-sm">
                <div className="text-8xl font-black text-[#097969]/20 mb-4">2018</div>
                <p className="text-white font-semibold text-xl">The year FitGear was born</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 2: The Journey */}
        <div className="max-w-7xl mx-auto mb-40 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2 lg:pl-20">
              <div className="inline-block mb-6">
                <span className="text-[#097969] text-sm font-bold tracking-widest uppercase border border-[#097969] px-4 py-2 rounded-full">
                  Chapter 02
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Built by
                <span className="block text-[#097969]">Athletes</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We didn't just design products—we lived them. Every resistance band was tested through thousands of reps. Every weight plate balanced to perfection. Every piece of apparel worn through brutal workouts until we got it right.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our team includes powerlifters, marathon runners, yogis, and CrossFit champions. We know what you need because we need it too.
              </p>
            </div>
            <div className="lg:order-1 relative lg:pr-20">
              <div className="absolute -right-4 lg:right-16 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#097969] rounded-full border-4 border-black hidden lg:block"></div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#097969] rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-black">10K+</span>
                    </div>
                    <p className="text-white font-semibold">Products Tested</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#097969] rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-black">500+</span>
                    </div>
                    <p className="text-white font-semibold">Athlete Partnerships</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#097969] rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-black">100%</span>
                    </div>
                    <p className="text-white font-semibold">Quality Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 3: The Mission */}
        <div className="max-w-7xl mx-auto mb-40 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:text-right lg:pr-20">
              <div className="inline-block mb-6">
                <span className="text-[#097969] text-sm font-bold tracking-widest uppercase border border-[#097969] px-4 py-2 rounded-full">
                  Chapter 03
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Our
                <span className="block text-[#097969]">Promise</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We're not here to sell you dreams. We're here to equip you with the tools to build them. Every product that leaves our warehouse has been engineered, tested, and perfected with one goal: to help you perform at your absolute best.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Whether you're a weekend warrior or a competitive athlete, FitGear stands behind you—through every rep, every mile, every drop of sweat.
              </p>
            </div>
            <div className="relative lg:pl-20">
              <div className="absolute -left-4 lg:left-16 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#097969] rounded-full border-4 border-black hidden lg:block"></div>
              <div className="relative">
                <div className="absolute inset-0 bg-[#097969] blur-3xl opacity-20 rounded-2xl"></div>
                <div className="relative bg-gradient-to-br from-[#097969] to-[#065951] p-12 rounded-2xl">
                  <h3 className="text-3xl font-black mb-6">Our Core Values</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">💪</span>
                      <div>
                        <p className="font-bold text-lg">Uncompromising Quality</p>
                        <p className="text-white/80">Built to last, designed to perform</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <p className="font-bold text-lg">Athlete-First Design</p>
                        <p className="text-white/80">Made by those who use it</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">🔥</span>
                      <div>
                        <p className="font-bold text-lg">Relentless Innovation</p>
                        <p className="text-white/80">Always pushing boundaries</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 4: The Future */}
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2 lg:pl-20">
              <div className="inline-block mb-6">
                <span className="text-[#097969] text-sm font-bold tracking-widest uppercase border border-[#097969] px-4 py-2 rounded-full">
                  Chapter 04
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Your Story
                <span className="block text-[#097969]">Starts Here</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                This isn't just our story—it's yours too. Every person who chooses FitGear becomes part of our community. A community built on dedication, perseverance, and the relentless pursuit of greatness.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We're not just selling equipment. We're building a movement. And we want you to be part of it.
              </p>
              <button className="bg-[#097969] hover:bg-[#0a9178] text-white font-bold py-4 px-10 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(9,121,105,0.5)]">
                Join the Movement
              </button>
            </div>
            <div className="lg:order-1 relative lg:pr-20">
              <div className="absolute -right-4 lg:right-16 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#097969] rounded-full border-4 border-black hidden lg:block"></div>
              <div className="relative h-96 rounded-2xl overflow-hidden border border-[#097969]/30">
                <div className="absolute inset-0 bg-gradient-to-br from-[#097969]/40 via-black/60 to-black/80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🏆</div>
                    <p className="text-2xl font-black uppercase tracking-wider">Your Journey</p>
                    <p className="text-lg text-gray-300 mt-2">Begins Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Footer */}
      <div className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#097969] to-black opacity-40"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Ready to Write Your
            <span className="block text-[#097969]">Success Story?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of athletes who trust FitGear to help them reach their peak performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-[#097969] hover:bg-[#0a9178] text-white font-bold py-4 px-10 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105">
              Shop Now
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full text-lg uppercase tracking-wider transition-all duration-300 border border-white/30">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scrollDown {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
      `}</style>
    </div>
  )
}