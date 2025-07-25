import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth, signIn, logout } from './database/firebaseResources';
import { onAuthStateChanged } from 'firebase/auth';
import { motion } from 'framer-motion';
import { 
  Pill, 
  Calendar, 
  Users, 
  Heart, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  MessageCircle
} from 'lucide-react';
import DashboardPreview from './components/DashboardPreview';

// Language context
const LanguageContext = createContext();

// Language content
const content = {
  en: {
    hero: {
      title: "We're here to",
      titleHighlight: "take care of you",
      subtitle: "TeCuido makes caregiving simple, smart, and stress-free.",
      cta: "Let’s Get You Set Up"
    },
    features: {
      title: "Everything you need to care",
      subtitle: "Powerful tools designed with love and understanding",
      medication: {
        title: "Medication Management",
        description: "Never miss a dose with smart reminders and easy tracking for all medications."
      },
      appointments: {
        title: "Appointment Reminders",
        description: "Stay on top of all appointments with gentle notifications and calendar sync."
      },
      family: {
        title: "Family Collaboration",
        description: "Keep everyone in the loop with shared updates and coordinated care plans."
      }
    },
    howItWorks: {
      title: "How TeCuido works",
      subtitle: "We've simplified caregiving into three simple steps that work together seamlessly.",
      step1: {
        title: "Set up your care profile",
        description: "Add medications, appointments, and care preferences in minutes."
      },
      step2: {
        title: "Invite family members",
        description: "Connect with loved ones to share updates and coordinate care."
      },
      step3: {
        title: "Stay organized together",
        description: "Receive gentle reminders and keep everyone informed automatically."
      },
      mockup: {
        title: "Morning Medications",
        subtitle: "2 medications due",
        med1: "Blood pressure medication",
        med2: "Vitamin D supplement"
      }
    },
    testimonial: {
      quote: "TeCuido helped my mom never miss her meds it changed everything.",
      author: "Maria Rodriguez, Family Caregiver"
    },
    cta: {
      title: "Start taking care of what matters most",
      subtitle: "Join thousands of families who trust TeCuido to help them care for their loved ones.",
      button: "Sign in with Google"
    },
    footer: {
      tagline: "Made with love for caregivers everywhere."
    },
    dashboard: {
      title: "Welcome to TeCuido",
      welcome: "Welcome back",
      careSummary: "Your Care Summary",
      activeMeds: "Active Medications",
      upcomingAppts: "Upcoming Appointments",
      signOut: "Sign Out",
      loading: "Loading your care dashboard..."
    },
    app: {
      loading: "Loading TeCuido..."
    }
  },
  es: {
    hero: {
      title: "Estamos aquí para",
      titleHighlight: "cuidarte",
      subtitle: "TeCuido hace que el cuidado sea simple, inteligente y sin estrés.",
      cta: "Comenzar"
    },
    features: {
      title: "Todo lo que necesitas para cuidar",
      subtitle: "Herramientas poderosas diseñadas con amor y comprensión",
      medication: {
        title: "Organizador de Medicinas",
        description: "Nunca te pierdas una dosis con recordatorios inteligentes y seguimiento fácil de todos los medicamentos."
      },
      appointments: {
        title: "Recordatorios de Citas",
        description: "Mantente al día con todas las citas con notificaciones suaves y sincronización de calendario."
      },
      family: {
        title: "Colaboración Familiar",
        description: "Mantén a todos informados con actualizaciones compartidas y planes de cuidado coordinados."
      }
    },
    howItWorks: {
      title: "Cómo funciona TeCuido",
      subtitle: "Hemos simplificado el cuidado en tres pasos simples que funcionan juntos sin problemas.",
      step1: {
        title: "Configura tu perfil de cuidado",
        description: "Agrega medicamentos, citas y preferencias de cuidado en minutos."
      },
      step2: {
        title: "Invita a miembros de la familia",
        description: "Conéctate con seres queridos para compartir actualizaciones y coordinar el cuidado."
      },
      step3: {
        title: "Mantente organizado juntos",
        description: "Recibe recordatorios suaves y mantén a todos informados automáticamente."
      },
      mockup: {
        title: "Medicamentos de la Mañana",
        subtitle: "2 medicamentos pendientes",
        med1: "Medicamento para la presión arterial",
        med2: "Suplemento de vitamina D"
      }
    },
    testimonial: {
      quote: "TeCuido ayudó a mi mamá a nunca perderse sus medicamentos cambió todo.",
      author: "María Rodríguez, Cuidadora Familiar"
    },
    cta: {
      title: "Comienza a cuidar lo que más importa",
      subtitle: "Únete a miles de familias que confían en TeCuido para ayudarlos a cuidar a sus seres queridos.",
      button: "Iniciar sesión con Google"
    },
    footer: {
      tagline: "Hecho con amor para cuidadores en todas partes."
    },
    dashboard: {
      title: "Bienvenido a TeCuido",
      welcome: "Bienvenido de vuelta",
      careSummary: "Tu Resumen de Cuidado",
      activeMeds: "Medicamentos Activos",
      upcomingAppts: "Citas Próximas",
      signOut: "Cerrar Sesión",
      loading: "Cargando tu panel de cuidado..."
    },
    app: {
      loading: "Cargando TeCuido..."
    }
  }
};

// Language toggle component
function LanguageToggle() {
  const { language, setLanguage } = useContext(LanguageContext);
  
  return (
    <motion.button
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
      <Globe className="w-5 h-5 text-rose-400" />
    </motion.button>
  );
}

// Modern, caring homepage component
function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useContext(LanguageContext);
  const t = content[language];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen font-sans bg-bg-base text-text-main transition-colors">
      <LanguageToggle />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 md:py-32 overflow-hidden bg-[#0f172a]">
        {/* Ambient Glow + Dust + Floating Feature Icons */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Teal radial glow */}
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="block w-72 h-72 md:w-96 md:h-96 bg-gradient-radial from-[#2dd4bf]/20 to-transparent rounded-full blur-2xl animate-ping-slower"></span>
          </div>
          {/* Floating Feature Icons and Animations (no dust) */}
          <style>{`
            @keyframes float-slow {
              0%, 100% { transform: translateY(0) }
              50% { transform: translateY(-18px) }
            }
            @keyframes float-slower {
              0%, 100% { transform: translateY(0) }
              50% { transform: translateY(-28px) }
            }
            @keyframes float-slowest {
              0%, 100% { transform: translateY(0) }
              50% { transform: translateY(-12px) }
            }
            .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
            .animate-float-slower { animation: float-slower 10s ease-in-out infinite; }
            .animate-float-slowest { animation: float-slowest 13s ease-in-out infinite; }
          `}</style>
        </div>

        {/* Responsive hero content and dashboard preview */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Hero text content */}
          <motion.div 
            className="text-center lg:text-left flex-1 flex flex-col items-center lg:items-start justify-center"
            style={{ minHeight: '420px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {/* IoT Connection Row */}
            <div className="relative flex flex-col items-center justify-center mb-8 w-full">
              {/* heart + pulse wrapper */}
              <div className="relative flex items-center justify-center w-full">
                {/* Pink pulse, centered on the heart */}
                <span
                  className="pulse-heartbeat absolute top-1/2 left-1/2 w-40 h-40 md:w-48 md:h-48 
                            rounded-full bg-rose-400/30 blur-xl
                            transform -translate-x-1/2 -translate-y-1/2"
                />
                {/* Main heart with heartbeat animation */}
                <Heart className="heart-beat relative z-20 w-16 h-16 text-rose-400 mx-auto" />
              </div>

              {/* Animated EKG Line, with extra margin to avoid touching the heart */}
              <svg
                className="mt-10 w-64 h-10 md:w-96 md:h-12 mx-auto animate-ekg"
                viewBox="0 0 400 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 0 8px #2dd4bf88)' }}
              >
                <path
                  d="M0 20 H60 L70 30 L80 10 L90 30 L100 20 H150 L170 20 L180 35 L190 5 L200 35 L210 20 H400"
                  stroke="#2dd4bf"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  opacity="0.8"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-400"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-dasharray"
                    from="20,400"
                    to="20,400"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
              <style>{`
                .animate-ekg path {
                  stroke-dasharray: 20, 400;
                  stroke-dashoffset: 0;
                  animation: ekg-move 2.5s linear infinite;
                }
                @keyframes ekg-move {
                  0% { stroke-dashoffset: 0; }
                  100% { stroke-dashoffset: -400; }
                }
              `}</style>
            </div>

            {/* Headline */}
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              variants={fadeInUp}
            >
              {t.hero.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#99f6e4] via-[#2dd4bf] to-[#14b8a6]">
                {t.hero.titleHighlight}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              variants={fadeInUp}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.button
              onClick={signIn}
              className="hero-cta-btn"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 80 }}
              whileHover={{ y: -2, scale: 1.03 }}
            >
              {t.hero.cta} <ArrowRight className="inline-block w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>

          {/* Dashboard Preview on the right */}
          <div className="mt-12 lg:mt-0 flex-shrink-0 w-full max-w-full lg:max-w-[360px] xl:max-w-[400px]">
            <DashboardPreview />
          </div>
        </div>

        {/* Smooth Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1440 320" className="w-full h-24">
            <path
              fill="#0f172a"
              d="M0,160L80,149.3C160,139,320,117,480,122.7C640,128,800,160,960,170.7C1120,181,1280,171,1360,165.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-extrabold text-white mb-4">
              {t.features.title}
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {/* Medication Management */}
            <div className="feature-calm-card min-w-[0] w-full max-w-[340px]">
              <div className="feature-icon-calm bg-teal-100">
                <Pill className="w-9 h-9 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 mt-2">
                {t.features.medication.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {t.features.medication.description}
              </p>
            </div>
            {/* Appointment Reminders */}
            <div className="feature-calm-card min-w-[0] w-full max-w-[340px]">
              <div className="feature-icon-calm bg-rose-100">
                <Calendar className="w-9 h-9 text-rose-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 mt-2">
                {t.features.appointments.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {t.features.appointments.description}
              </p>
            </div>
            {/* Family Collaboration */}
            <div className="feature-calm-card min-w-[0] w-full max-w-[340px]">
              <div className="feature-icon-calm bg-amber-100">
                <Users className="w-9 h-9 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 mt-2">
                {t.features.family.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {t.features.family.description}
              </p>
            </div>
            {/* Smart Chat Support */}
            <div className="feature-calm-card min-w-[0] w-full max-w-[340px]">
              <div className="feature-icon-calm bg-blue-100">
                <MessageCircle className="w-9 h-9 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 mt-2">
                Smart Chat Support
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Ask questions, get reminders, and receive real-time help from our caregiving assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-bold text-text-main dark:text-text-main-dark mb-6">
                {t.howItWorks.title}
              </h2>
              <p className="text-xl text-text-muted dark:text-text-muted-dark mb-8 leading-relaxed">
                {t.howItWorks.subtitle}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 dark:from-teal-300 dark:via-teal-500 dark:to-teal-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-main dark:text-text-main-dark mb-2">{t.howItWorks.step1.title}</h3>
                    <p className="text-text-muted dark:text-text-muted-dark">{t.howItWorks.step1.description}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 dark:from-teal-300 dark:via-teal-500 dark:to-teal-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-main dark:text-text-main-dark mb-2">{t.howItWorks.step2.title}</h3>
                    <p className="text-text-muted dark:text-text-muted-dark">{t.howItWorks.step2.description}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 dark:from-teal-300 dark:via-teal-500 dark:to-teal-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-main dark:text-text-main-dark mb-2">{t.howItWorks.step3.title}</h3>
                    <p className="text-text-muted dark:text-text-muted-dark">{t.howItWorks.step3.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div className="bg-[#0f172a] rounded-3xl p-8 shadow-2xl border border-[#334155]">
                <div className="space-y-4">
                  {/* Browser window dots */}
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-rose-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-orange-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                  </div>

                  {/* Inner content card */}
                  <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 shadow-md border border-slate-700">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <Heart className="w-7 h-7 text-rose-400" />
                      <div>
                        <h4 className="font-semibold text-white">{t.howItWorks.mockup.title}</h4>
                        <p className="text-sm text-slate-400">{t.howItWorks.mockup.subtitle}</p>
                      </div>
                    </div>

                    {/* Medication List */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-600">
                        <CheckCircle className="w-5 h-5 text-teal-400" />
                        <span className="text-sm text-white">{t.howItWorks.mockup.med1}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-600">
                        <CheckCircle className="w-5 h-5 text-teal-400" />
                        <span className="text-sm text-white">{t.howItWorks.mockup.med2}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium text-text-main dark:text-text-main-dark mb-8 leading-relaxed">
              "{t.testimonial.quote}"
            </blockquote>
            <p className="text-lg text-text-muted dark:text-text-muted-dark">{t.testimonial.author}</p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-text-main dark:text-text-main-dark mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-text-muted dark:text-text-muted-dark mb-8 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>
            <motion.button
              onClick={signIn}
              className="group bg-primary dark:bg-primary-dark text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="w-5 h-5" />
              {t.cta.button}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-bg-base dark:bg-bg-base-dark border-t border-border dark:border-border-dark">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Heart className="w-6 h-6 text-rose-400" />
              <span className="text-xl font-bold text-text-main dark:text-text-main-dark">TeCuido</span>
            </div>
            <div className="flex gap-8 text-sm text-text-muted dark:text-text-muted-dark">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-border dark:border-border-dark">
            <p className="text-sm text-text-muted dark:text-text-muted-dark">
              © 2024 TeCuido. {language === 'en' ? 'Made with love for caregivers everywhere.' : 'Hecho con amor para cuidadores en todas partes.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Modern, caring dashboard component
function Dashboard() {
  const user = auth.currentUser;
  const { language } = useContext(LanguageContext);
  const t = content[language].dashboard;

  if (!user) {
    return (
      <div className="loading">
        <h1>{t.loading}</h1>
      </div>
    );
  }

  return (
    <div className="dashboard-container font-sans bg-bg-base dark:bg-bg-base-dark text-text-main dark:text-text-main-dark">
      <LanguageToggle />
      <div className="dashboard-card bg-card dark:bg-card-dark border border-border dark:border-border-dark">
        <div className="flex items-center justify-center mb-6">
          <Heart className="w-8 h-8 text-accent dark:text-accent-dark mr-3" />
          <h1 className="text-3xl font-bold text-text-main dark:text-text-main-dark">{t.title}</h1>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <img 
            src={user.photoURL} 
            alt="Profile" 
            className="profile-img border-primary dark:border-primary-dark"
          />
        </div>
        
        <h2 className="text-2xl font-semibold text-text-main dark:text-text-main-dark mb-2">
          {t.welcome}, {user.displayName}!
        </h2>
        <p className="text-text-muted dark:text-text-muted-dark mb-6">{user.email}</p>
        
        <div className="bg-muted dark:bg-muted-dark rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-text-main dark:text-text-main-dark mb-3">
            {t.careSummary}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-card dark:bg-card-dark rounded-lg p-3">
              <div className="text-2xl font-bold text-primary dark:text-primary-dark">3</div>
              <div className="text-sm text-text-muted dark:text-text-muted-dark">{t.activeMeds}</div>
            </div>
            <div className="bg-card dark:bg-card-dark rounded-lg p-3">
              <div className="text-2xl font-bold text-secondary dark:text-secondary-dark">2</div>
              <div className="text-sm text-text-muted dark:text-text-muted-dark">{t.upcomingAppts}</div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="btn bg-primary dark:bg-primary-dark text-white"
        >
          {t.signOut}
        </button>
      </div>
    </div>
  );
}

// A simple component to protect routes
function RequireAuth({ user, children }) {
  if (user === null) {
    // Redirect them to the / page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they
    // log in, which is a nicer user experience.
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in
  const [language, setLanguage] = useState('en'); // Default to English

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Show a loading indicator while checking auth status
  if (user === undefined) {
    return (
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div className="loading">
          <div className="text-center">
            <Heart className="w-12 h-12 text-rose-400 mx-auto mb-4 animate-pulse" />
            <h1 className="text-xl font-semibold text-text-main dark:text-text-main-dark">
              {content[language].app.loading}
            </h1>
          </div>
        </div>
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth user={user}>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </LanguageContext.Provider>
  );
}
