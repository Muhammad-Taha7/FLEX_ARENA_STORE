import React, { useState, useEffect, useRef } from "react";
import Carousel from "../Components/Carasoul";
import { Products } from "../Components/Products";
import { Dumbbell, Users, Trophy, Clock, Star, ArrowRight, CheckCircle } from "lucide-react";

export const Home = () => {
  const images = [
    "https://png.pngtree.com/thumb_back/fh260/background/20220314/pngtree-exercise-equipment-in-the-gym-image_1051349.jpg",
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
      description: "Latest gym equipment from top brands worldwide"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Expert Trainers",
      description: "Certified professionals to guide your fitness journey"
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "Proven Results",
      description: "Join 10,000+ members who achieved their goals"
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "24/7 Access",
      description: "Train anytime that fits your schedule"
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
    { number: 10000, label: "Active Members", suffix: "+" },
    { number: 50, label: "Expert Trainers", suffix: "+" },
    { number: 15, label: "Years Experience", suffix: "+" },
    { number: 98, label: "Success Rate", suffix: "%" }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Fitness Enthusiast",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "Best gym in the city! The trainers are professional and equipment is top-notch. Lost 15kg in 6 months!"
    },
    {
      name: "Priya Patel",
      role: "Working Professional",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "Flexible timings and amazing atmosphere. The personal training sessions really helped me achieve my goals."
    },
    {
      name: "Amit Kumar",
      role: "Athlete",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      rating: 5,
      text: "Professional setup with everything you need. The coaches understand sports-specific training perfectly."
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
      popular: false
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
      popular: true
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
      popular: false
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
    <div className="w-full mt-[5rem] scroll-smooth">
      {/* Hero Carousel */}
      <Carousel 
        images={images} 
        slidesContent={slidesContent}
        autoSlide={true} 
        interval={4000} 
      />

      {/* Stats Section with Animated Counters */}
      <section className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-transform duration-300">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </h3>
                <p className="text-green-100 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We provide everything you need to transform your fitness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 group transform hover:-translate-y-2"
              >
                <div className="bg-emerald-500/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="bg-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Membership Plans
            </h2>
            <p className="text-slate-400 text-lg">
              Choose the perfect plan for your fitness goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipPlans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-slate-900 rounded-2xl p-8 border-2 ${
                  plan.popular 
                    ? 'border-emerald-500 shadow-xl shadow-emerald-500/20 scale-105' 
                    : 'border-slate-700'
                } hover:border-emerald-500 transition-all duration-300 relative transform hover:-translate-y-2`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-emerald-500">
                      {plan.price}
                    </span>
                    <span className="text-slate-400 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/50'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-emerald-500'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* Testimonials */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our Members Say
            </h2>
            <p className="text-slate-400 text-lg">
              Real stories from real people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-slate-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Join our community today and start your fitness journey with expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group transform hover:scale-105">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105">
              Schedule Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};