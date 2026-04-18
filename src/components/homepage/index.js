"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Animated counter hook
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, target, duration]);
  return count;
}

// Intersection observer hook
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

// Floating particle component
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-lime-400/10 animate-float"
          style={{
            width: `${Math.random() * 8 + 3}px`,
            height: `${Math.random() * 8 + 3}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${Math.random() * 4 + 4}s`,
          }}
        />
      ))}
    </div>
  );
}

// Testimonial data
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    avatar: "PS",
    color: "from-purple-500 to-purple-700",
    text: "This assessment opened my eyes to risks I never knew I had. The personalized recommendations were spot-on and helped me make real lifestyle changes.",
    rating: 5,
  },
  {
    name: "James O'Brien",
    role: "Marketing Director",
    avatar: "JO",
    color: "from-blue-500 to-blue-700",
    text: "I completed it during my lunch break. Simple, clear, and the results led me to finally get a check-up. My doctor found elevated cholesterol early.",
    rating: 5,
  },
  {
    name: "Anika Patel",
    role: "Teacher",
    avatar: "AP",
    color: "from-lime-500 to-lime-700",
    text: "I shared this with my entire family. My father discovered his diabetes risk was very high — catching it early made all the difference.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "Fitness Coach",
    avatar: "MC",
    color: "from-orange-500 to-orange-700",
    text: "Even as a health professional I found this incredibly comprehensive. The disease breakdowns and action steps are genuinely useful.",
    rating: 5,
  },
];

// FAQ data
const faqs = [
  {
    q: "Is the assessment completely free?",
    a: "Yes, 100% free. No subscriptions, no hidden fees, no credit card required. We believe everyone deserves access to health risk information.",
  },
  {
    q: "How accurate is the assessment?",
    a: "Our assessment is based on validated clinical scoring models used by health professionals. It's a screening tool, not a diagnosis — we always recommend following up with your doctor.",
  },
  {
    q: "Is my data kept private?",
    a: "Absolutely. Your health data is encrypted, never sold, and never shared with third parties. You can delete your data at any time.",
  },
  {
    q: "How long does it take to complete?",
    a: "Most people complete the full assessment in 10–15 minutes. There are no time limits — take as long as you need.",
  },
  {
    q: "Can I retake the assessment?",
    a: "Yes! We encourage taking it every 6–12 months so you can track improvements in your health risk profile over time.",
  },
  {
    q: "What do I do with my results?",
    a: "Your results come with personalized action steps. For any high-risk areas, we strongly recommend discussing your results with a healthcare professional.",
  },
];

// Blog posts
const blogPosts = [
  {
    tag: "Prevention",
    tagColor: "bg-lime-400/20 text-lime-400",
    title: "5 Simple Habits That Slash Your Heart Disease Risk by 40%",
    excerpt:
      "Research shows small daily changes compound into dramatic health outcomes. Here's what the science actually says.",
    readTime: "4 min read",
    date: "Apr 12, 2025",
  },
  {
    tag: "Diabetes",
    tagColor: "bg-blue-400/20 text-blue-400",
    title: "Pre-diabetes: The Silent Condition Affecting 96 Million Americans",
    excerpt:
      "Most people with pre-diabetes don't know they have it. Early detection can completely reverse the condition.",
    readTime: "6 min read",
    date: "Mar 28, 2025",
  },
  {
    tag: "Mental Health",
    tagColor: "bg-purple-400/20 text-purple-400",
    title: "Why Mental Health Belongs in Every Physical Health Assessment",
    excerpt:
      "The mind-body connection is more powerful than most people realise. Stress directly impacts 7 major disease pathways.",
    readTime: "5 min read",
    date: "Mar 15, 2025",
  },
];

const ArrowIcon = ({ className = "", color = "#113D3C" }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M13.9134 1.58557C13.9131 1.18807 13.7551 0.806921 13.474 0.525845C13.193 0.244769 12.8118 0.0867525 12.4143 0.086505L4.4134 0.0843842C4.01545 0.084384 3.6338 0.24247 3.3524 0.523865C3.07101 0.805259 2.91292 1.18691 2.91292 1.58486C2.91292 1.98282 3.07101 2.36447 3.3524 2.64586C3.6338 2.92726 4.01545 3.08535 4.4134 3.08535L8.79251 3.08605L0.636038 11.2425C0.354733 11.5238 0.1967 11.9054 0.196699 12.3032C0.196698 12.701 0.354734 13.0825 0.636038 13.3638C0.917343 13.6452 1.29887 13.8032 1.6967 13.8032C2.09452 13.8032 2.47605 13.6452 2.75736 13.3638L10.9138 5.20737L10.9138 9.58578C10.9138 9.78282 10.9526 9.97794 11.0281 10.16C11.1035 10.342 11.214 10.5074 11.3533 10.6468C11.4926 10.7861 11.6581 10.8966 11.8401 10.972C12.0222 11.0474 12.2173 11.0863 12.4143 11.0863C12.6114 11.0863 12.8065 11.0474 12.9885 10.972C13.1706 10.8966 13.336 10.7861 13.4753 10.6468C13.6146 10.5074 13.7252 10.342 13.8006 10.16C13.876 9.97794 13.9148 9.78282 13.9148 9.58578L13.9134 1.58557Z"
      fill={color}
    />
  </svg>
);

export default function HomePage() {
  const router = useRouter();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInView();
  const { ref: trustRef, inView: trustInView } = useInView();

  const users = useCountUp(50000, 2000, statsInView);
  const diseases = useCountUp(12, 1500, statsInView);
  const accuracy = useCountUp(94, 2000, statsInView);

  const trustUsers = useCountUp(50000, 2000, trustInView);
  const trustDoctors = useCountUp(2000, 2000, trustInView);
  const trustReviews = useCountUp(98, 2000, trustInView);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#113D3C] to-[#0A2625] overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.8; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.15); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          56% { transform: scale(1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float ease-in-out infinite; }
        .animate-fade-up { animation: fadeInUp 0.7s ease forwards; }
        .animate-fade-left { animation: fadeInLeft 0.7s ease forwards; }
        .animate-scale-in { animation: scaleIn 0.5s ease forwards; }
        .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .marquee-track { animation: marquee 30s linear infinite; }
        .hero-text-1 { animation: fadeInUp 0.8s ease 0.1s both; }
        .hero-text-2 { animation: fadeInUp 0.8s ease 0.3s both; }
        .hero-text-3 { animation: fadeInUp 0.8s ease 0.5s both; }
        .hero-text-4 { animation: fadeInUp 0.8s ease 0.7s both; }
        .hero-img { animation: scaleIn 1s ease 0.3s both; }
        .pulse-ring::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 9999px;
          border: 2px solid rgb(163 230 53 / 0.6);
          animation: pulse-ring 2s ease-out infinite;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #a3e635 0%, #facc15 25%, #a3e635 50%, #86efac 75%, #a3e635 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .section-animate { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .section-animate.in-view { opacity: 1; transform: translateY(0); }
        .progress-bar {
          width: 0%;
          transition: width 1.5s ease;
        }
        .progress-bar.animate { width: var(--target-width); }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.3s ease;
        }
        .faq-answer.open { max-height: 200px; }
        .glow-btn:hover { box-shadow: 0 0 30px rgba(163, 230, 53, 0.4); }
        .risk-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .nav-link::after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: #a3e635;
          transition: width 0.3s ease;
          margin-top: 2px;
        }
        .nav-link:hover::after { width: 100%; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <Particles />
        {/* Background rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-lime-400/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-lime-400/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-lime-400/3 rounded-full animate-spin-slow" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="hero-text-1 inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/30 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
                <span className="text-lime-400 text-sm font-medium">
                  Free • No account needed • Instant results
                </span>
              </div>

              <h1 className="hero-text-2 font-exo text-5xl lg:text-7xl font-bold leading-tight text-white">
                Know your <span className="shimmer-text px-1">Health</span>
                <br />
                Risks Today
              </h1>

              <p className="hero-text-3 font-exo text-lg lg:text-xl font-medium text-gray-300 max-w-xl leading-relaxed">
                Our clinically validated health risk assessment helps you
                understand your risk for 12+ major diseases — so you can act
                before it's too late.
              </p>

              <div className="hero-text-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => router.push("/assessment")}
                  className="glow-btn group relative bg-lime-400 text-[#113D3C] px-8 py-4 rounded-full font-exo font-bold text-lg hover:bg-lime-300 transition-all duration-300 flex items-center gap-3 pulse-ring"
                >
                  Start Free Assessment
                  <div className="w-10 h-10 bg-[#113D3C]/20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowIcon color="#113D3C" />
                  </div>
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("how-it-works")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors text-sm"
                >
                  <span className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-xs">
                    ▶
                  </span>
                  See how it works
                </button>
              </div>

              {/* Social proof bar */}
              <div className="hero-text-4 flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {["PS", "JO", "AP", "MC", "+"].map((initials, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#113D3C] flex items-center justify-center text-[10px] font-bold text-white"
                      style={{
                        background: [
                          "#7c3aed",
                          "#2563eb",
                          "#16a34a",
                          "#ea580c",
                          "#374151",
                        ][i],
                      }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="text-gray-300 text-sm">
                  <span className="text-white font-semibold">50,000+</span>{" "}
                  people assessed this month
                </span>
              </div>
            </div>

            {/* Right: Animated health card */}
            <div className="hero-img relative h-[560px] flex items-center justify-center">
              {/* Main image */}
              <div className="relative w-full h-full">
                <img
                  src="homebanner1.png"
                  alt="Health Assessment"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
                {/* Floating stat cards */}
                <div
                  className="absolute top-12 -left-4 lg:-left-12 bg-[#0A2625]/90 backdrop-blur border border-white/10 rounded-2xl p-4 shadow-2xl animate-float"
                  style={{ animationDelay: "0s", animationDuration: "5s" }}
                >
                  <div className="text-lime-400 text-2xl font-bold">94%</div>
                  <div className="text-gray-300 text-xs mt-1">
                    Accuracy Rate
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-4 bg-lime-400 rounded-full opacity-70"
                        style={{ height: `${[4, 6, 8, 6, 5][i] * 3}px` }}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className="absolute bottom-20 -right-4 lg:-right-8 bg-[#0A2625]/90 backdrop-blur border border-white/10 rounded-2xl p-4 shadow-2xl animate-float"
                  style={{ animationDelay: "2s", animationDuration: "6s" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                    <span className="text-gray-300 text-xs">Heart Risk</span>
                  </div>
                  <div className="w-32 bg-white/10 rounded-full h-2 mb-1">
                    <div className="w-[35%] bg-lime-400 h-2 rounded-full" />
                  </div>
                  <div className="text-white text-xs font-medium">
                    Low Risk — 35%
                  </div>
                </div>

                <div
                  className="absolute top-1/2 -right-2 lg:-right-6 bg-lime-400 rounded-2xl p-3 shadow-2xl animate-float"
                  style={{ animationDelay: "1s", animationDuration: "4.5s" }}
                >
                  <div className="text-[#113D3C] text-xs font-bold">12+</div>
                  <div className="text-[#113D3C] text-[10px]">Diseases</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-400 text-xs">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center pt-1">
            <div className="w-1 h-2 bg-lime-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Marquee trust bar */}
      <div className="bg-lime-400/5 border-y border-lime-400/10 py-4 overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap">
          {[...Array(2)].map((_, outer) => (
            <div key={outer} className="flex items-center gap-16 mr-16">
              {[
                "Clinically Validated",
                "HIPAA Compliant",
                "No Account Needed",
                "Instant Results",
                "100% Free",
                "Evidence-Based",
                "Doctor-Reviewed",
                "Privacy First",
                "12+ Diseases Screened",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-gray-400 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-lime-400 rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Animated Stats Section */}
      <section className="py-20" ref={statsRef} id="about">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                value: users,
                suffix: "+",
                label: "People Assessed",
                sublabel: "and counting every month",
                color: "text-lime-400",
              },
              {
                value: diseases,
                suffix: "+",
                label: "Diseases Screened",
                sublabel: "major health conditions",
                color: "text-blue-400",
              },
              {
                value: accuracy,
                suffix: "%",
                label: "Accuracy Rate",
                sublabel: "clinically validated",
                color: "text-yellow-400",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`text-center p-8 rounded-2xl bg-white/5 border border-white/10 card-hover ${statsInView ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div
                  className={`font-exo text-6xl font-bold ${stat.color} mb-2`}
                >
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-white text-xl font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-400 text-sm">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Take Assessment */}
      <section
        className="py-20 bg-gradient-to-b from-transparent to-[#0A2625]"
        id="how-it-works"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-lime-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
              Why It Matters
            </span>
            <h2 className="font-exo text-5xl lg:text-6xl font-bold text-white mb-4">
              Early detection{" "}
              <span className="bg-gradient-to-r from-lime-400 to-lime-500 px-3 py-1 inline-block">
                saves lives
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Chronic diseases develop silently. Most people discover them too
              late. Our assessment gives you a head start.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6">
              {[
                {
                  icon: "🔍",
                  color: "border-lime-500",
                  title: "Catch risks before symptoms appear",
                  desc: "80% of chronic diseases show no symptoms until advanced stages. Screening gives you the window to act.",
                  badge: "Most Important",
                },
                {
                  icon: "🎯",
                  color: "border-blue-400",
                  title: "Understand your personal disease risks",
                  desc: "Our assessment covers diabetes, heart disease, cancer, stroke, hypertension, and 7+ more conditions tailored to you.",
                  badge: "Comprehensive",
                },
                {
                  icon: "💡",
                  color: "border-yellow-400",
                  title: "Personalized, actionable insights",
                  desc: "Not generic advice — recommendations built around your specific health profile, age, lifestyle, and family history.",
                  badge: "Personalized",
                },
                {
                  icon: "📈",
                  color: "border-purple-400",
                  title: "Track improvements over time",
                  desc: "Retake the assessment every 6 months to measure progress. See your risk scores improve as you adopt healthier habits.",
                  badge: "Trackable",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`border-l-4 ${item.color} pl-6 py-4 group hover:pl-8 transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <span className="risk-badge bg-white/10 text-gray-300 text-[10px] hidden lg:inline-flex">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Right: Disease risk preview */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg">
                  Sample Risk Profile
                </h3>
                <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                  Illustrative example
                </span>
              </div>
              {[
                {
                  disease: "Heart Disease",
                  risk: 28,
                  level: "Low",
                  color: "bg-lime-400",
                  textColor: "text-lime-400",
                },
                {
                  disease: "Diabetes (Type 2)",
                  risk: 52,
                  level: "Moderate",
                  color: "bg-yellow-400",
                  textColor: "text-yellow-400",
                },
                {
                  disease: "Hypertension",
                  risk: 65,
                  level: "Elevated",
                  color: "bg-orange-400",
                  textColor: "text-orange-400",
                },
                {
                  disease: "Stroke",
                  risk: 19,
                  level: "Low",
                  color: "bg-lime-400",
                  textColor: "text-lime-400",
                },
                {
                  disease: "Kidney Disease",
                  risk: 33,
                  level: "Low",
                  color: "bg-lime-400",
                  textColor: "text-lime-400",
                },
                {
                  disease: "Cholesterol",
                  risk: 71,
                  level: "High",
                  color: "bg-red-400",
                  textColor: "text-red-400",
                },
              ].map((item, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300 text-sm">
                      {item.disease}
                    </span>
                    <span className={`text-sm font-semibold ${item.textColor}`}>
                      {item.level} · {item.risk}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${item.risk}%` }}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => router.push("/assessment")}
                className="w-full mt-6 bg-lime-400 text-[#113D3C] py-3 rounded-xl font-bold hover:bg-lime-300 transition-colors glow-btn"
              >
                Get Your Risk Profile →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-20" id="features">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-lime-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
              Features
            </span>
            <h2 className="font-exo text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-lime-400 to-lime-500 px-3 py-1 inline-block mr-2">
                Why
              </span>
              you'll love it
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Designed to make health awareness effortless, accessible, and
              actually useful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                bg: "from-green-700 to-green-900",
                accent: "bg-[#EFBB59]",
                icon: "⚡",
                title: "Quick and easy",
                desc: "Just 10–15 minutes to complete. No medical knowledge needed.",
                img: "https://tinyurl.com/ms7tp28k",
              },
              {
                bg: "from-[#406F6F] to-[#2d4f4f]",
                accent: "bg-[#8FCBCD]",
                icon: "🔬",
                title: "Comprehensive",
                desc: "12 major diseases assessed with clinical-grade scoring models.",
                img: "https://tinyurl.com/37szpwhm",
              },
              {
                bg: "from-[#A25900] to-[#7a4200]",
                accent: "bg-[#B27122]",
                icon: "✨",
                title: "Personalized",
                desc: "Insights built from your age, lifestyle, genetics, and history.",
                img: "https://tinyurl.com/2ch2pwsv",
              },
              {
                bg: "from-[#BFCE00] to-[#9aaa00]",
                accent: "bg-[#E8F44A]",
                icon: "📊",
                title: "Track progress",
                desc: "Retake every 6 months and watch your risk scores improve.",
                img: "https://tinyurl.com/3dwakyhs",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`relative bg-gradient-to-br ${card.bg} rounded-2xl p-6 shadow-2xl overflow-hidden group card-hover cursor-pointer`}
                onClick={() => router.push("/assessment")}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-white/80 mb-12 text-sm leading-relaxed">
                  {card.desc}
                </p>
                <div className="absolute bottom-14 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shadow-lg">
                  <ArrowIcon />
                </div>
                <div
                  className="absolute right-0 bottom-10 w-28 h-24 bg-cover opacity-90 rounded-tl-xl"
                  style={{ backgroundImage: `url(${card.img})` }}
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 h-10 ${card.accent}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — Enhanced */}
      <section className="py-20 bg-white/3" id="how-it-works-steps">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-lime-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
              Process
            </span>
            <h2 className="font-exo text-5xl lg:text-6xl font-bold text-white">
              How it{" "}
              <span className="bg-gradient-to-r from-lime-400 to-lime-500 px-3 py-1 inline-block">
                works
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div
              className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-lime-400/20 via-lime-400/60 to-lime-400/20 z-0"
              style={{ top: "40px", left: "16%", right: "16%" }}
            />

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  step: "1",
                  icon: "📝",
                  title: "Answer questions",
                  desc: "Complete a 40-question survey covering your health history, lifestyle habits, diet, exercise, and family background.",
                  detail: "~10 minutes",
                },
                {
                  step: "2",
                  icon: "🧠",
                  title: "AI analyses your data",
                  desc: "Our algorithm cross-references your answers against validated clinical risk models for each of the 12 diseases.",
                  detail: "Instant",
                },
                {
                  step: "3",
                  icon: "📋",
                  title: "Get your action plan",
                  desc: "Receive a full risk report with color-coded scores, detailed explanations, and prioritised lifestyle recommendations.",
                  detail: "Immediate results",
                },
              ].map((step, i) => (
                <div key={i} className="text-center group">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-lime-400 rounded-full flex items-center justify-center text-3xl font-bold text-[#113D3C] mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-lime-400/20">
                      {step.step}
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#113D3C] border border-lime-400/30 text-lime-400 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                      {step.detail}
                    </div>
                  </div>
                  <div className="text-3xl mb-3 mt-4">{step.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => router.push("/assessment")}
              className="glow-btn group bg-white text-[#113D3C] px-10 py-4 rounded-full font-exo font-bold text-lg hover:bg-lime-400 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl"
            >
              Begin Your Assessment
              <div className="w-10 h-10 bg-[#113D3C]/10 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowIcon />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Diseases We Screen */}
      <section className="py-20 bg-white/5" id="diseases">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-lime-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
              Coverage
            </span>
            <h2 className="font-exo text-5xl lg:text-6xl font-bold text-white mb-4">
              Diseases we{" "}
              <span className="bg-gradient-to-r from-lime-400 to-lime-500 px-3 py-1 inline-block">
                screen for
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive coverage of the 12 leading causes of preventable
              illness and death worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Heart Disease",
                icon: "❤️",
                prevalence: "1 in 4 deaths",
                color: "hover:border-red-400/50 hover:bg-red-400/5",
              },
              {
                name: "Diabetes",
                icon: "🩺",
                prevalence: "537M affected worldwide",
                color: "hover:border-blue-400/50 hover:bg-blue-400/5",
              },
              {
                name: "Stroke",
                icon: "🧠",
                prevalence: "3rd leading cause",
                color: "hover:border-purple-400/50 hover:bg-purple-400/5",
              },
              {
                name: "Cancer Risk",
                icon: "🎗️",
                prevalence: "Early detection = 90% survival",
                color: "hover:border-pink-400/50 hover:bg-pink-400/5",
              },
              {
                name: "Hypertension",
                icon: "💉",
                prevalence: "46% unaware they have it",
                color: "hover:border-orange-400/50 hover:bg-orange-400/5",
              },
              {
                name: "Obesity",
                icon: "⚖️",
                prevalence: "Links to 13 cancer types",
                color: "hover:border-yellow-400/50 hover:bg-yellow-400/5",
              },
              {
                name: "Kidney Disease",
                icon: "🫘",
                prevalence: "10% of global population",
                color: "hover:border-teal-400/50 hover:bg-teal-400/5",
              },
              {
                name: "Liver Disease",
                icon: "🫀",
                prevalence: "Often symptom-free",
                color: "hover:border-amber-400/50 hover:bg-amber-400/5",
              },
              {
                name: "Respiratory Issues",
                icon: "🫁",
                prevalence: "Affects 1B people",
                color: "hover:border-sky-400/50 hover:bg-sky-400/5",
              },
              {
                name: "Mental Health",
                icon: "🧘",
                prevalence: "1 in 8 globally",
                color: "hover:border-violet-400/50 hover:bg-violet-400/5",
              },
              {
                name: "Osteoporosis",
                icon: "🦴",
                prevalence: "200M affected worldwide",
                color: "hover:border-slate-400/50 hover:bg-slate-400/5",
              },
              {
                name: "High Cholesterol",
                icon: "💊",
                prevalence: "Affects 2.6B adults",
                color: "hover:border-lime-400/50 hover:bg-lime-400/5",
              },
            ].map((disease, i) => (
              <div
                key={i}
                className={`bg-white/5 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10 transition-all duration-300 cursor-pointer card-hover ${disease.color} group`}
                onClick={() => router.push("/assessment")}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {disease.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {disease.name}
                </h3>
                <p className="text-gray-400 text-xs">{disease.prevalence}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Social Proof */}
      <section className="py-20" ref={trustRef}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-lime-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
              Trusted By Many
            </span>
            <h2 className="font-exo text-5xl font-bold text-white">
              People trust <span className="shimmer-text">HealthCheck</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                value: trustUsers,
                suffix: "+",
                label: "Assessments Completed",
                icon: "👥",
              },
              {
                value: trustDoctors,
                suffix: "+",
                label: "Healthcare Professionals Endorse Us",
                icon: "🩺",
              },
              {
                value: trustReviews,
                suffix: "%",
                label: "Would Recommend to Family",
                icon: "⭐",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`text-center p-6 rounded-2xl bg-white/5 border border-white/10 ${trustInView ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-5xl font-bold text-lime-400 mb-2">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials Carousel */}
          <div className="relative overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`bg-white/5 border rounded-2xl p-6 transition-all duration-500 card-hover ${
                    i === activeTestimonial
                      ? "border-lime-400/50 bg-lime-400/5 scale-105"
                      : "border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        {t.name}
                      </div>
                      <div className="text-gray-400 text-xs">{t.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, s) => (
                      <span key={s} className="text-yellow-400 text-xs">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? "bg-lime-400 w-6" : "bg-white/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Health Blog */}
      {/* <section className="py-20 bg-white/3" id="blog">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-lime-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
                Health Insights
              </span>
              <h2 className="font-exo text-5xl font-bold text-white">
                Latest from the{" "}
                <span className="bg-gradient-to-r from-lime-400 to-lime-500 px-3 py-1 inline-block">
                  blog
                </span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors font-medium"
            >
              View all articles <ArrowIcon color="#a3e635" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <div
                key={i}
                className="group cursor-pointer card-hover bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-lime-400/30"
              >
                <div className="h-48 bg-gradient-to-br from-[#113D3C] to-[#1a5554] flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                    {["❤️", "🩺", "🧘"][i]}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`risk-badge ${post.tagColor}`}>
                      {post.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3 group-hover:text-lime-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-lime-400 text-sm font-medium group-hover:gap-3 transition-all">
                    Read article <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20" id="faq">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-lime-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
              FAQs
            </span>
            <h2 className="font-exo text-5xl font-bold text-white">
              Common{" "}
              <span className="bg-gradient-to-r from-lime-400 to-lime-500 px-3 py-1 inline-block">
                questions
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white/5 border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === i ? "border-lime-400/40" : "border-white/10"}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <span className="text-white font-semibold group-hover:text-lime-400 transition-colors pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`text-lime-400 text-xl transition-transform duration-300 flex-shrink-0 ${openFaq === i ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div className={`faq-answer ${openFaq === i ? "open" : ""}`}>
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-lime-500" />
        <Particles />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block bg-[#113D3C]/20 text-[#113D3C] text-sm font-semibold px-4 py-1 rounded-full mb-6">
              It's completely free
            </span>
            <h2 className="font-exo text-4xl lg:text-6xl font-bold text-[#113D3C] mb-6 leading-tight">
              Your health can't wait.
              <br />
              Start in 60 seconds.
            </h2>
            <p className="text-[#113D3C]/70 text-xl mb-10 max-w-xl mx-auto">
              Join 50,000+ people who've taken control of their health with our
              free, evidence-based assessment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push("/assessment")}
                className="group bg-[#113D3C] text-white px-12 py-5 rounded-full font-exo font-bold text-xl hover:bg-[#0A2625] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3"
              >
                Start Free Assessment
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowIcon color="white" />
                </div>
              </button>
              <div className="flex items-center gap-2 text-[#113D3C]/70 text-sm">
                <span>✓</span> No sign-up &nbsp;
                <span>✓</span> No credit card &nbsp;
                <span>✓</span> Instant results
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#061918] py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                  <span className="text-[#113D3C] font-bold text-sm">H+</span>
                </div>
                <span className="font-exo font-bold text-white text-xl">
                  HealthCheck
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-xs">
                Empowering individuals to take control of their health through
                evidence-based risk assessments and personalised action plans.
              </p>
              <div className="flex gap-3">
                {["📘", "🐦", "📷", "💼"].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-lime-400/20 hover:border-lime-400/30 transition-all duration-300"
                  >
                    <span className="text-base">{icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: [
                  "Start Assessment",
                  "How It Works",
                  "Disease Library",
                  "Track Progress",
                  "For Clinics",
                ],
              },
              {
                title: "Resources",
                links: [
                  "Health Blog",
                  "Prevention Guide",
                  "Disease Info",
                  "FAQ",
                  "Support",
                ],
              },
              {
                title: "Company",
                links: [
                  "About Us",
                  "Our Team",
                  "Careers",
                  "Privacy Policy",
                  "Terms of Service",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-lime-400 transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-bold text-lg mb-1">
                Weekly health insights, free
              </h4>
              <p className="text-gray-400 text-sm">
                Evidence-based tips delivered to your inbox every Monday
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/10 rounded-full px-5 py-3 text-white placeholder-gray-400 text-sm flex-1 md:w-64 focus:outline-none focus:border-lime-400/50"
              />
              <button
                className="bg-lime-400 text-[#113D3C] px-6 py-3 rounded-full font-bold text-sm hover:bg-lime-300 transition-colors whitespace-nowrap glow-btn"
                onClick={() => alert("Thanks! You're subscribed.")}
              >
                Subscribe →
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 HealthCheck Inc. All rights reserved. Not a substitute for
              medical advice.
            </p>
            <div className="flex gap-6 text-gray-400 text-sm">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Accessibility",
              ].map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="hover:text-lime-400 transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
