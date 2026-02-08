import React, { useState, useEffect, useRef } from "react";
import Carousel from "../Components/Carasoul";
import { Products } from "../Components/Products";
import { Dumbbell, Users, Trophy, Clock, Star, ArrowRight, CheckCircle, Zap, Award, Target, TrendingUp } from "lucide-react";

export const Home = () => {
  const images = [
    "https://media.istockphoto.com/id/515238274/photo/modern-and-big-gym.jpg?s=612x612&w=0&k=20&c=E0sTLMBF5zUX5204SUwwCNf2vcRoAYp5CS60c2LvSKk=",
    "https://gymleco.com/cdn/shop/files/A7S00848-1-1-scaled.jpg?v=1734000777&width=2560",
    "https://images.unsplash.com/photo-1649847727298-27a50354bd46?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
    "https://c1.wallpaperflare.com/preview/828/253/109/barbell-exercise-fitness-man-indoor-poster.jpg"
  ];

  const slidesContent = [
    {
      title: "Transform Your Body",
      subtitle: "Fitness Revolution",
      description: "Experience state-of-the-art equipment and personalized training programs",
      ctaText: "Join Now",
      ctaLink: "/membership"
    },
    {
      title: "Premium Gym Equipment",
      subtitle: "Quality & Performance",
      description: "Train with the best tools designed for professional athletes",
      ctaText: "Explore Equipment",
      ctaLink: "/equipment"
    },
    {
      title: "Expert Trainers",
      subtitle: "Personal Guidance",
      description: "Get guidance from certified trainers with years of experience",
      ctaText: "Meet Our Trainers",
      ctaLink: "/trainers"
    },
    {
      title: "Achieve Your Goals",
      subtitle: "Results Driven",
      description: "Join thousands who have transformed their lives with us",
      ctaText: "Start Journey",
      ctaLink: "/start"
    }
  ];

  const features = [
    {
      icon: <Dumbbell className="w-10 h-10" />,
      title: "Modern Equipment",
      description: "Latest gym equipment from top brands worldwide",
      gradient: "from-[#097969] to-[#0a9178]"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Expert Trainers",
      description: "Certified professionals to guide your fitness journey",
      gradient: "from-[#0a9178] to-[#097969]"
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "Proven Results",
      description: "Join 10,000+ members who achieved their goals",
      gradient: "from-[#097969] to-[#065951]"
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "24/7 Access",
      description: "Train anytime that fits your schedule",
      gradient: "from-[#065951] to-[#097969]"
    }
  ];

  // Animated Counter Component
  const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.3 }
      );

      if (counterRef.current) {
        observer.observe(counterRef.current);
      }

      return () => {
        if (counterRef.current) {
          observer.unobserve(counterRef.current);
        }
      };
    }, []);

    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      const endValue = parseInt(end);
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
          setCount(Math.floor(endValue * progress));
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return (
      <span ref={counterRef}>
        {count}{suffix}
      </span>
    );
  };

  const stats = [
    { number: 10000, label: "Active Members", suffix: "+", icon: <Users className="w-8 h-8" /> },
    { number: 50, label: "Expert Trainers", suffix: "+", icon: <Award className="w-8 h-8" /> },
    { number: 15, label: "Years Experience", suffix: "+", icon: <Trophy className="w-8 h-8" /> },
    { number: 98, label: "Success Rate", suffix: "%", icon: <Target className="w-8 h-8" /> }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Fitness Enthusiast",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "Best gym in the city! The trainers are professional and equipment is top-notch. Lost 15kg in 6 months!",
      achievement: "Lost 15kg"
    },
    {
      name: "Priya Patel",
      role: "Working Professional",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "Flexible timings and amazing atmosphere. The personal training sessions really helped me achieve my goals.",
      achievement: "Gained Strength"
    },
    {
      name: "Amit Kumar",
      role: "Athlete",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      rating: 5,
      text: "Professional setup with everything you need. The coaches understand sports-specific training perfectly.",
      achievement: "Built Muscle"
    }
  ];

  const membershipPlans = [
    {
      name: "Basic",
      price: "₹999",
      period: "/month",
      features: [
        "Access to gym equipment",
        "Locker facility",
        "Basic workout plan",
        "Nutrition guidance"
      ],
      popular: false,
      color: "white"
    },
    {
      name: "Premium",
      price: "₹1999",
      period: "/month",
      features: [
        "All Basic features",
        "Personal trainer (4 sessions)",
        "Customized diet plan",
        "Group classes access",
        "Steam & Sauna"
      ],
      popular: true,
      color: "#097969"
    },
    {
      name: "Elite",
      price: "₹3999",
      period: "/month",
      features: [
        "All Premium features",
        "Unlimited personal training",
        "Sports nutrition supplements",
        "Body composition analysis",
        "Priority equipment access",
        "Guest passes (2/month)"
      ],
      popular: false,
      color: "white"
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Energy Boost",
      description: "Feel more energized throughout the day"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Progressive Growth",
      description: "Track your improvement week by week"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expert Support",
      description: "Get guidance from certified professionals"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Goal Achievement",
      description: "Reach your fitness targets faster"
    }
  ];

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="w-full mt-[5rem] scroll-smooth bg-black">
      {/* Hero Carousel */}
      <div className="relative">
        <Carousel 
          images={images} 
          slidesContent={slidesContent}
          autoSlide={true} 
          interval={4000} 
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </div>

      {/* Stats Section with Animated Counters - REDESIGNED */}
      <section className="relative bg-black py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#097969] rounded-full blur-[150px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#097969] rounded-full blur-[150px] opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Performance in <span className="text-[#097969]">Numbers</span>
            </h2>
            <p className="text-gray-400 text-lg">Real impact, real results</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#097969]/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(9,121,105,0.3)]"
                style={{animationDelay: `${index * 100}ms`}}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#097969]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className="text-[#097969] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  
                  {/* Number */}
                  <h3 className="text-5xl md:text-6xl font-black text-white mb-2 bg-gradient-to-r from-white to-[#097969] bg-clip-text text-transparent">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </h3>
                  
                  {/* Label */}
                  <p className="text-gray-400 text-sm md:text-base font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - REDESIGNED */}
      <section className="bg-gradient-to-b from-black via-[#0a1a17] to-black py-24 relative overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(9,121,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(9,121,105,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#097969] text-sm font-bold tracking-widest uppercase mb-4 block">Our Advantages</span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Why Choose <span className="text-[#097969]">FitGear?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              We provide everything you need to transform your fitness journey with cutting-edge facilities and expert guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-[#097969] transition-all duration-500 transform hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(9,121,105,0.4)]"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative">
                  {/* Icon container with gradient */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 text-white shadow-lg group-hover:shadow-[0_0_30px_rgba(9,121,105,0.6)] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {feature.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-[#097969] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#097969] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - NEW */}
      <section className="bg-black py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#097969] to-[#065951] rounded-3xl p-12 md:p-16 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                  Transform Your Life Today
                </h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                  Experience the benefits that come with a dedicated fitness routine
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-white/70 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans - REDESIGNED */}
      <section className="bg-gradient-to-b from-black to-[#0a1a17] py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(9,121,105,0.1),transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#097969] text-sm font-bold tracking-widest uppercase mb-4 block">Pricing Plans</span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Choose Your <span className="text-[#097969]">Path</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Select the perfect membership plan that fits your fitness goals and lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative rounded-3xl overflow-hidden transform transition-all duration-500 ${
                  plan.popular 
                    ? 'scale-105 md:scale-110 shadow-[0_0_60px_rgba(9,121,105,0.5)] z-10' 
                    : 'hover:scale-105 hover:shadow-[0_0_40px_rgba(9,121,105,0.3)]'
                }`}
              >
                {/* Background */}
                <div className={`absolute inset-0 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-[#097969] via-[#0a9178] to-[#065951]' 
                    : 'bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm'
                }`}></div>

                {/* Border glow effect */}
                <div className={`absolute inset-0 ${
                  plan.popular 
                    ? 'border-2 border-white/20' 
                    : 'border border-white/10 hover:border-[#097969]/50'
                } rounded-3xl transition-all duration-500`}></div>

                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-white text-black px-6 py-2 rounded-full text-sm font-black uppercase tracking-wider shadow-lg flex items-center gap-2">
                      <Star className="w-4 h-4 fill-[#097969] text-[#097969]" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="relative p-8 md:p-10">
                  {/* Plan name */}
                  <h3 className={`text-3xl font-black mb-2 ${plan.popular ? 'text-white' : 'text-white'}`}>
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className={`text-6xl font-black ${plan.popular ? 'text-white' : 'text-[#097969]'}`}>
                        {plan.price}
                      </span>
                      <span className={`text-lg ml-2 ${plan.popular ? 'text-white/70' : 'text-gray-400'}`}>
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full ${
                          plan.popular ? 'bg-white/20' : 'bg-[#097969]/20'
                        } flex items-center justify-center mt-0.5`}>
                          <CheckCircle className={`w-4 h-4 ${plan.popular ? 'text-white' : 'text-[#097969]'}`} />
                        </div>
                        <span className={`${plan.popular ? 'text-white/90' : 'text-gray-300'} leading-relaxed`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-white text-[#097969] hover:bg-white/90 shadow-lg hover:shadow-2xl'
                      : 'bg-[#097969] text-white hover:bg-[#0a9178] shadow-lg hover:shadow-[0_0_30px_rgba(9,121,105,0.5)]'
                  }`}>
                    Get Started
                  </button>
                </div>

                {/* Decorative corner element */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px]"></div>
                )}
              </div>
            ))}
          </div>

          {/* Additional info */}
          <div className="text-center mt-12">
            <p className="text-gray-400">
              All plans include free orientation session and nutrition consultation
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials - REDESIGNED */}
      <section className="bg-black py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-[#097969]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#097969]/5 rounded-full blur-[150px]"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#097969] text-sm font-bold tracking-widest uppercase mb-4 block">Success Stories</span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Real People, <span className="text-[#097969]">Real Results</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hear from our members who transformed their lives with FitGear
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-[#097969]/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(9,121,105,0.3)]"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Quote decoration */}
                <div className="absolute top-6 right-6 text-[#097969]/20 text-6xl font-bold">"</div>

                {/* Profile */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-[#097969]"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#097969] rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Achievement badge */}
                <div className="inline-block bg-[#097969]/20 border border-[#097969]/30 rounded-full px-4 py-1 mb-4">
                  <span className="text-[#097969] text-sm font-bold">{testimonial.achievement}</span>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#097969] text-[#097969]" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 leading-relaxed italic relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#097969]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - REDESIGNED */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#097969] via-[#0a9178] to-[#065951]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        </div>

        {/* Floating shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 text-white text-sm font-bold uppercase tracking-wider mb-6">
              Limited Time Offer
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            Ready to Transform<br />Your Life?
          </h2>
          
          <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join our community today and start your fitness journey with expert guidance, premium equipment, and proven results
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-white text-[#097969] px-10 py-5 rounded-xl font-black text-lg hover:bg-white/90 transition-all duration-300 shadow-2xl flex items-center gap-3 transform hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]">
              Start Free Trial
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              Schedule Tour
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};