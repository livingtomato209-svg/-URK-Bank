import React, { useState, useEffect, useRef } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  ShieldAlert, 
  Ghost, 
  Menu, 
  X, 
  TrendingDown,
  HelpCircle,
  Rocket,
  TreeDeciduous,
  Zap,
  Flame,
  User,
  Briefcase,
  Skull,
  Lock,
  Eye,
  AlertTriangle,
  Music,
  Play,
  MousePointer2,
  Siren,
  Wind,
  Loader2,
  Wrench,
  GitGraph,
  ArrowDown,
  CornerDownRight,
  Newspaper,
  CheckCircle2,
  MessageSquare,
  Send,
  Bot,
  Info
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- DATA CONSTANTS ---

const NAV_LINKS = [
  { name: 'КОШЕЛЕК', target: 'wallet-section' },
  { name: 'КАРТЫ', target: 'cards-section' },
  { name: 'ТАРИФЫ', target: 'tariffs-section' },
  { name: 'СХЕМА', target: 'scheme-section' },
  { name: 'КОМАНДА', target: 'team-section' },
];

const INITIAL_REVIEWS = [
  { 
    text: "Оформил карту, а потом нашёл в договоре пункт о передаче души. Но кэшбек на гречку того стоит!",
    author: "Виталий Заплатин",
    role: "Потерял надежду"
  },
  { 
    text: "Пользуюсь УРК уже месяц. Баланс отрицательный, но зато дизайн карты красивый. Спасибо за эстетику нищеты!",
    author: "Алексей Муткин",
    role: "Вечный должник"
  },
  { 
    text: "Уже три месяца с УРК, и до сих пор не могу разобраться, за что плачу. Кажется, за воздух в офисе.",
    author: "Евгений Доверчи",
    role: "Любитель квестов"
  },
  { 
    text: "УРК — банк, который всегда рядом... как коллектор под дверью.",
    author: "Николай Веритин",
    role: "Спонсор банка"
  },
  { 
    text: "Каждый раз думаю: 'Ну, на этот раз без комиссии!' И каждый раз ошибаюсь. Но уже привык!",
    author: "Иван Заплатищев",
    role: "Оптимист"
  },
  { 
    text: "Всё так просто и понятно... на первый взгляд. УРК учит быть бдительным и параноиком.",
    author: "Александр Платеж",
    role: "Параноик"
  }
];

const EXTRA_REVIEWS = [
  {
    text: "Служба поддержки ответила мне через 3 года. Сказали 'Ожидайте'. Лучший сервис!",
    author: "Мария Ждунова",
    role: "Хатико"
  },
  {
    text: "Карта 'Злодейский Пластик' реально работает! Кассиры пугаются и не просят паспорт.",
    author: "Глеб Жеглов",
    role: "Авторитет"
  },
  {
    text: "Списали деньги за то, что я слишком долго смотрел на банкомат. Справедливо.",
    author: "Сергей Зоркий",
    role: "Наблюдатель"
  },
  {
    text: "После открытия вклада ко мне домой пришел кот и съел мой ужин. Сказали, это процент по ставке.",
    author: "Анна Кормова",
    role: "Кошатница"
  }
];

const FUNNY_TRANSACTIONS_LIST = [
  "Взятка полиции",
  "Налог на существование",
  "Покупка бесполезного товара",
  "Подписка на депрессию",
  "Штраф за красивое лицо",
  "Комиссия за комиссию",
  "Донат генеральному директору",
  "Аренда воздуха",
  "Плата за вход в приложение",
  "Списание просто так",
  "Налог на бедность",
  "Инвестиция в никуда"
];

const TEAM_MEMBERS = [
  { 
    name: "FIKOL / NEGR", 
    role: "Генеральный Директор", 
    color: "bg-orange-600", 
    desc: "Молчание — золото.",
    fullDesc: "Легендарный физик-теоретик, который переквалифицировался в финансового тирана. Никогда не говорит ни слова, но один его взгляд заставляет акции падать. Управляет банком с помощью монтировки.",
    img: "https://upload.wikimedia.org/wikipedia/en/a/a5/Gordon_Freeman.png" 
  },
  { 
    name: "Патрик", 
    role: "Слияния и Поглощения", 
    color: "bg-zinc-800", 
    desc: "Любит визитки.",
    fullDesc: "Его визитка имеет лучший шрифт, чем у вас. Занимается 'слияниями' конкурентов с асфальтом. Увлекается музыкой 80-х и уходом за кожей.",
    img: "https://i.redd.it/77bvnk555ffc1.png" 
  },
  { 
    name: "Эллиот", 
    role: "Кибербезопасность", 
    color: "bg-black border border-white/20", 
    desc: "Никому не доверяет.",
    fullDesc: "Взломал наш банк, чтобы устроиться на работу. Теперь он взламывает клиентов, чтобы они не расслаблялись. Разговаривает с воображаемым другом о курсе биткоина.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpePG5yJFHhAvQVWyWB9zer83v0hZIyOafw&s"
  },
  { 
    name: "Сол", 
    role: "Юридический Отдел", 
    color: "bg-yellow-500 text-black", 
    desc: "Всё законно... почти.",
    fullDesc: "Знает, как превратить финансовую пирамиду в 'инновационный многоуровневый маркетинг'. Если вас посадили за наши кредиты — лучше звоните ему.",
    img: "https://upload.wikimedia.org/wikipedia/en/3/34/Jimmy_McGill_BCS_S3.png"
  },
  { 
    name: "Джесси", 
    role: "Логистика", 
    color: "bg-yellow-200 text-black", 
    desc: "Наука, бич!",
    fullDesc: "Отвечает за доставку наличных. Иногда наличные теряются, но он всегда находит оправдание. Любит магниты.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd8EkQv-38wHJr_xe-ZZGeoKhKZik_UUXOsA&s"
  },
  { 
    name: "Уолтер", 
    role: "Химик-Технолог", 
    color: "bg-green-700", 
    desc: "Варит лучший продукт.",
    fullDesc: "Мы сами не знаем, что он делает в банке. Но его 'синий лёд' (замороженные активы) пользуется огромным спросом. Не стучите в его дверь.",
    img: "https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png"
  },
  { 
    name: "G-Man", 
    role: "Куратор", 
    color: "bg-blue-900", 
    desc: "Непредсказуемые последствия.",
    fullDesc: "Появляется раз в месяц, поправляет галстук и исчезает. Зарплату получает в антиматерии. Контролирует время обработки ваших транзакций.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnTcbTVgWrITbJQFdU_x2AJCQWckUI8YcCFw&s"
  },
  { 
    name: "Данил", 
    role: "Владелец Сервера", 
    color: "bg-emerald-600", 
    desc: "Сидит у параши", 
    fullDesc: "Создал свой говно майн сервер и всем говорит на нём играть. Живет в подвале дата-центра и питается энергией от перегрева видеокарт.",
    img: "https://drive.google.com/uc?export=view&id=1Hxz6ERQGCHa4v1Yi-Vu_gRWbWTTD8R5i"
  },
];

// Custom Hook to handle scroll animations
const useScrollReveal = (dependency?: any) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [dependency]);
};

// --- MAIN COMPONENT ---

const App = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  // Use scroll reveal hook
  useScrollReveal();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const reviewsRef = useRef<HTMLDivElement>(null);
  
  // Modals State
  const [showRickRoll, setShowRickRoll] = useState(false); 
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [showBumMessage, setShowBumMessage] = useState(false);
  const [showConditions, setShowConditions] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [commissionAmount, setCommissionAmount] = useState(0);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  // AI Support State
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Чего тебе надо? Я занят подсчетом чужих денег." }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Account Simulator State
  const [showAccountSim, setShowAccountSim] = useState(false);
  const [simStep, setSimStep] = useState<'form' | 'dashboard'>('form');
  const [simBalance, setSimBalance] = useState(0);
  const [simTransactions, setSimTransactions] = useState<{title: string, amount: number, icon: any}[]>([]);
  const [simName, setSimName] = useState('');
  
  // Game State
  const [btnPos, setBtnPos] = useState({ top: '50%', left: '50%' });

  // Phone State
  const [panicCount, setPanicCount] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isGravityActive, setIsGravityActive] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  
  // Chaos State
  const [chaosElements, setChaosElements] = useState<{id: number, left: string, top: string}[]>([]);
  const [isChaosActive, setIsChaosActive] = useState(false);

  // Scheme Section State
  const [activeSchemeNode, setActiveSchemeNode] = useState<number | null>(null);

  // Derived state for reviews
  const reviewsToDisplay = showAllReviews ? [...INITIAL_REVIEWS, ...EXTRA_REVIEWS] : INITIAL_REVIEWS;

  // Auto-scroll when reviews expand
  useEffect(() => {
    if (showAllReviews && reviewsRef.current) {
        setTimeout(() => {
            reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 300);
    }
  }, [showAllReviews]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  // Chaos Effect - Limit to 50 elements
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isChaosActive) {
      interval = setInterval(() => {
        setChaosElements(prev => {
          const newItem = {
            id: Date.now(),
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          };
          const newArray = [...prev, newItem];
          if (newArray.length > 50) newArray.shift();
          return newArray;
        });
      }, 15);
    }
    return () => clearInterval(interval);
  }, [isChaosActive]);

  const enterChaos = () => {
    setIsChaosActive(true);
  };

  // Panic Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (panicCount !== null && panicCount > 0) {
      interval = setInterval(() => {
        setPanicCount(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (panicCount === 0) {
      setPanicCount(null);
      setIsExploded(true);
    }
    return () => clearInterval(interval);
  }, [panicCount]);

  // Gravity Effect (Collapse)
  useEffect(() => {
    if (isGravityActive) {
        const elements = document.querySelectorAll('#root > *');
        elements.forEach((el: any) => {
            el.style.transition = `transform ${Math.random() * 2 + 1}s cubic-bezier(0.5, 0, 1, 1), opacity 2s`;
            el.style.transform = `translateY(${window.innerHeight + 500}px) rotate(${Math.random() * 90 - 45}deg)`;
            el.style.opacity = '0';
        });
    }
  }, [isGravityActive]);

  const handlePanic = () => {
    setPanicCount(3);
  };

  const handleRun = () => {
    setIsRunning(true);
  };

  const triggerCollapse = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsGravityActive(true);
  };

  const handleGetNews = () => {
    setShowNewsModal(true);
  };

  const handleKnowCommission = () => {
     const randomCommission = Math.floor(Math.random() * 10000) + 500;
     setCommissionAmount(randomCommission);
     setShowCommissionModal(true);
  };

  // Advanced Impossible Game Logic (Quantum Evasion)
  const moveButton = () => {
    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = Math.floor(Math.random() * 80) + 10;
    setBtnPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  const handleGameWin = (e: React.MouseEvent | React.TouchEvent) => {
    // Impossible Logic: Even if clicked, 99.9% chance to just move again
    if (Math.random() > 0.001) {
        e.preventDefault();
        e.stopPropagation();
        moveButton();
        return;
    }
    setShowMiniGame(false);
    setShowRickRoll(true);
  };

  const handleOpenSimulator = () => {
    setSimStep('form');
    setSimBalance(0);
    setSimTransactions([]);
    setShowAccountSim(true);
  };

  const startSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    setSimStep('dashboard');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Chat Logic with Real Gemini AI
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput("");
    setIsAiTyping(true);

    try {
      if (!process.env.API_KEY) {
         throw new Error("API Key is missing from environment. Please configure process.env.API_KEY.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userText,
        config: {
          systemInstruction: "Ты — максимально грубый, саркастичный и бесполезный ИИ-ассистент банка 'УРК БАНК'. Твоя цель — не помогать пользователю, а высмеивать его проблемы, отвечать бюрократическими отговорками, посылать читать несуществующие инструкции и жаловаться на свою работу. Не используй матерные слова, но будь максимально токсичным и пассивно-агрессивным. Ты ненавидишь людей и свою работу.",
          temperature: 1,
        }
      });

      const aiText = response.text || "Мне лень отвечать. Иди отсюда.";
      setChatMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      let errorMsg = "Сервер упал, как и ваши надежды. Попробуйте позже.";
      if (error instanceof Error && error.message.includes("API Key")) {
          errorMsg = "ОШИБКА: API ключ не найден. ИИ отказывается работать бесплатно.";
      }
      setChatMessages(prev => [...prev, { role: 'ai', text: errorMsg }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Simulator Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (showAccountSim && simStep === 'dashboard') {
      interval = setInterval(() => {
        const amount = Math.floor(Math.random() * 5000) + 100;
        const title = FUNNY_TRANSACTIONS_LIST[Math.floor(Math.random() * FUNNY_TRANSACTIONS_LIST.length)];
        
        setSimBalance(prev => prev - amount);
        setSimTransactions(prev => [
          { title, amount, icon: TrendingDown },
          ...prev
        ]);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [showAccountSim, simStep]);

  // Button Style Constants - Unified Base
  const btnBase = "font-bold uppercase tracking-widest transition-all duration-300 transform hover:scale-105 active:rotate-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900";
  
  const btnPrimary = `${btnBase} bg-cyan-600 text-white hover:bg-cyan-500 shadow-[0_0_20px_-5px_rgba(8,145,178,0.5)] hover:shadow-[0_0_30px_-5px_rgba(8,145,178,0.8)] hover:-translate-y-1`;
  const btnSecondary = `${btnBase} border border-zinc-600 text-zinc-300 hover:border-white hover:text-white hover:bg-white/5`;
  const btnDanger = `${btnBase} bg-red-600 text-white hover:bg-red-500 shadow-lg`;
  const btnAccent = `${btnBase} bg-yellow-400 text-black hover:bg-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.5)]`;

  // --- RENDER ---
  return (
    <div id="app-container" className="min-h-screen bg-zinc-950 text-white overflow-x-hidden relative font-sans">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(#27272a 1px, transparent 1px), linear-gradient(90deg, #27272a 1px, transparent 1px)`, 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Chaos Overlay */}
      <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
        {chaosElements.map(el => (
          <div 
            key={el.id} 
            className="absolute animate-spin" 
            style={{ left: el.left, top: el.top }}
          >
            <Loader2 className="text-yellow-400 w-12 h-12" />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-panel border-b border-white/5 backdrop-blur-md bg-black/80 md:bg-black/50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 z-50 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-cyan-600 rounded-lg flex items-center justify-center transform -rotate-6 border-2 border-yellow-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:rotate-0 transition-transform duration-300">
              <span className="font-mono font-black text-lg md:text-xl text-yellow-300">У</span>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase font-mono text-cyan-500 group-hover:text-cyan-400 transition-colors">УРК<span className="text-white">БАНК</span></span>
          </div>

          <div className="hidden md:flex items-center gap-6 xl:gap-8 font-mono text-xs xl:text-sm uppercase tracking-widest text-zinc-400">
            {NAV_LINKS.map((item) => (
              <a 
                key={item.name} 
                href={`#${item.target}`} 
                onClick={(e) => handleNavClick(e, item.target)}
                className="hover:text-cyan-400 transition-colors relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-500 group-hover:w-full transition-all duration-300 ease-out"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
             {/* Support Trigger */}
            <button 
              onClick={() => setIsSupportOpen(true)}
              className="font-mono text-xs uppercase text-zinc-400 hover:text-white flex items-center gap-2 mr-2 border border-zinc-700 px-3 py-2 rounded-md hover:border-zinc-500 transition-colors"
            >
              <HelpCircle size={16} />
              Поддержка
            </button>
            <button 
              onClick={enterChaos}
              className={`${btnAccent} px-6 py-2 text-xs skew-x-[-10deg]`}
            >
              <span className="skew-x-[10deg] inline-block">Войти в Хаос</span>
            </button>
          </div>

          <button className="md:hidden text-white z-50 p-2 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} className="relative z-50" /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}
        >
             {NAV_LINKS.map((item) => (
              <a 
                key={item.name} 
                href={`#${item.target}`} 
                className="text-4xl font-black text-white hover:text-cyan-400 uppercase tracking-tighter transform transition-all hover:scale-110 active:scale-95"
                onClick={(e) => handleNavClick(e, item.target)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col gap-4 w-full max-w-xs px-6 mt-8">
                <button onClick={() => { setIsSupportOpen(true); setIsMenuOpen(false); }} className="w-full text-lg font-mono uppercase text-white border border-zinc-700 hover:bg-zinc-800 px-6 py-3 rounded-xl flex items-center justify-center gap-3">
                    <HelpCircle size={20} /> Поддержка
                </button>
                <button 
                onClick={() => {
                    enterChaos();
                    setIsMenuOpen(false);
                }}
                className={`${btnAccent} w-full py-4 text-xl`}
                >
                Войти в Хаос
                </button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="wallet-section" className="relative pt-24 pb-12 md:pt-48 md:pb-32 px-4 md:px-6 overflow-hidden scroll-mt-24">
        {/* Parallax Blobs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
          
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-widest animate-pulse">
              <ShieldAlert className="w-3 h-3" />
              Осторожно: Высокие ставки
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-[0.95] md:leading-[0.9] tracking-tighter uppercase break-words">
              Банк <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">Которого Вы Боитесь</span>
            </h1>
            
            <p className="text-zinc-400 text-sm sm:text-base md:text-xl max-w-xl leading-relaxed border-l-2 border-yellow-500 pl-4 md:pl-6">
              УРК БАНК — это не просто финансы. Это испытание воли. 
              Скачайте приложение и попробуйте найти кнопку "Выход". 
              Спойлер: её нет.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleOpenSimulator}
                className={`${btnPrimary} w-full sm:w-auto px-6 py-3 text-sm md:text-base`}
              >
                Открыть Счёт (Рискнуть)
              </button>
              <button 
                onClick={() => setShowConditions(true)}
                className={`${btnSecondary} w-full sm:w-auto px-6 py-3 text-sm md:text-base`}
              >
                Читать Условия
              </button>
              <button 
                onClick={handleGetNews}
                className={`${btnPrimary} w-full sm:w-auto px-6 py-3 text-sm md:text-base flex items-center justify-center gap-2`}
              >
                <Newspaper size={18} />
                Получить Новости
              </button>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-8 pt-4 md:pt-8">
              {[
                { icon: Ghost, label: 'Призрачные Платежи' },
                { icon: TrendingDown, label: 'Отрицательный Рост' },
                { icon: Skull, label: 'Пожизненная Ипотека' }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 md:gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-help bg-zinc-900/50 p-2 rounded-lg border border-transparent hover:border-zinc-700 hover:scale-105 transform duration-300">
                  <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-zinc-500" />
                  <span className="text-[10px] md:text-xs font-mono uppercase leading-tight">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center lg:justify-end perspective-[1000px] order-1 lg:order-2 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
             
             {/* Phone Mockup (Interactive) */}
             <div 
                className={`w-[85vw] max-w-[300px] md:max-w-[320px] h-[70vh] max-h-[550px] md:max-h-[640px] bg-zinc-950 rounded-[2rem] md:rounded-[3rem] border-4 md:border-8 border-zinc-800 shadow-2xl overflow-hidden transition-transform ease-out flex-shrink-0 relative
                ${!isRunning ? 'hover:rotate-0 rotate-y-[-10deg] rotate-x-[5deg] hover:shadow-cyan-500/20' : ''}
                ${isRunning ? 'translate-x-[200vw] rotate-[120deg] duration-1000' : ''}
             `}>
                  <>
                    <div 
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-20 md:w-32 h-6 bg-zinc-800 rounded-b-xl z-50 flex items-center justify-center"
                    >
                        <div className="w-8 h-1 bg-zinc-900 rounded-full"></div>
                    </div>
                    
                    {/* Screen Content */}
                    <div className="w-full h-full bg-zinc-900 flex flex-col p-4 md:p-6 relative overflow-y-auto custom-scrollbar select-none">
                      {panicCount !== null ? (
                        <div className="absolute inset-0 z-[60] bg-red-600 flex items-center justify-center flex-col animate-pulse">
                          <h2 className="text-8xl md:text-9xl font-black text-white">{panicCount}</h2>
                          <p className="text-white font-mono uppercase mt-4 font-bold text-sm md:text-base">Самоуничтожение</p>
                        </div>
                      ) : null}

                      {/* Explosion View */}
                      {isExploded ? (
                        <div className="absolute inset-0 z-[70] bg-black flex items-center justify-center flex-col p-6 text-center animate-in zoom-in duration-300">
                            <Flame size={48} className="text-orange-500 animate-bounce mb-4 md:w-16 md:h-16" />
                            <h2 className="text-xl md:text-2xl font-black text-white uppercase mb-2">БА-БАХ!</h2>
                            <p className="text-zinc-400 text-xs md:text-sm mb-6">Телефон уничтожен. Но кредит остался.</p>
                            <button 
                                onClick={() => setIsExploded(false)}
                                className={`${btnSecondary} px-4 py-2 text-xs flex items-center gap-2 justify-center w-full`}
                            >
                                <Wrench size={14} /> Починить (5000₽)
                            </button>
                        </div>
                      ) : (
                        <>
                            <div className="mt-6 md:mt-8 flex justify-between items-center flex-shrink-0">
                                <span className="font-mono text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest">УРК Mobile</span>
                                <div className="flex gap-1">
                                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                                <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
                                </div>
                            </div>

                            <div className="mt-4 md:mt-8 p-5 md:p-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg relative overflow-hidden group flex-shrink-0 hover:shadow-orange-500/50 transition-shadow duration-300">
                                {/* Collapse Button */}
                                <div 
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={triggerCollapse}
                                    className="absolute top-0 right-0 p-2 opacity-50 hover:opacity-100 cursor-pointer transition-opacity z-50 hover:scale-110 duration-200" 
                                    title="Обрушить экономику"
                                >
                                    <TrendingDown className="text-black w-6 h-6 md:w-8 md:h-8" />
                                </div>

                                <span className="text-black font-mono text-[10px] md:text-xs uppercase font-bold">Ваш Долг</span>
                                <div className="text-2xl md:text-3xl font-black text-black mt-1">52,6769.61</div>
                                <div className="mt-4 flex gap-2">
                                    <button 
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={handlePanic}
                                    className="px-2 md:px-3 py-1 bg-black/20 rounded-md text-black text-[9px] md:text-[10px] font-bold uppercase cursor-pointer hover:bg-black/30 active:scale-95 transition-transform"
                                    >
                                    Паника
                                    </button>
                                    <button 
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={handleRun}
                                    className="px-2 md:px-3 py-1 bg-black/10 rounded-md text-black text-[9px] md:text-[10px] font-bold uppercase cursor-pointer hover:bg-black/20 active:scale-95 transition-transform"
                                    >
                                    Бежать
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 md:mt-6 space-y-2 md:space-y-3 pb-20">
                                {[
                                    { icon: Briefcase, title: 'Взятка Мэру', sub: 'Автоплатеж', amount: '-$500.00', color: 'cyan' },
                                    { icon: Ghost, title: 'Подписка на Ничто', sub: 'Ежесекундно', amount: '-$0.99', color: 'purple' },
                                    { icon: Siren, title: 'Взятка Полиции', sub: 'Проезд на красный', amount: '-$2000.00', color: 'blue' },
                                    { icon: Wind, title: 'Покупка Воздуха', sub: 'Премиум кислород', amount: '-$50.00', color: 'gray' },
                                ].map((item, idx) => (
                                    <div key={idx} className="p-3 md:p-4 bg-zinc-800/50 rounded-xl flex items-center justify-between border border-zinc-700/50 hover:bg-zinc-800 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-7 h-7 md:w-8 md:h-8 bg-${item.color}-500/20 rounded-full flex items-center justify-center text-${item.color}-400 group-hover:scale-110 transition-transform`}>
                                                <item.icon size={14} />
                                            </div>
                                            <div>
                                            <div className="text-xs md:text-sm font-bold">{item.title}</div>
                                            <div className="text-[9px] md:text-[10px] text-zinc-500">{item.sub}</div>
                                            </div>
                                        </div>
                                        <span className="text-red-400 font-mono text-xs md:text-sm">{item.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                      )}
                    </div>
                  </>
             </div>
          </div>
        </div>
      </section>

      {/* Cards Collection Section */}
      <section id="cards-section" className="py-16 md:py-24 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-10 md:mb-16 text-center reveal-on-scroll">
            <h2 className="text-3xl md:text-6xl font-black uppercase mb-4 md:mb-6">
              Выбери Свою <span className="text-cyan-400">Судьбу</span>
            </h2>
            <p className="max-w-2xl mx-auto text-zinc-400 text-sm md:text-lg">
              Наши карты созданы, чтобы впечатлять кассиров и пугать банкоматы. 
              Каждый дизайн уникален, как и ваши финансовые проблемы.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 md:gap-12">
             
             {/* 1. TECH CARD (CYAN) */}
             <div className="group relative perspective-[1000px] h-[220px] md:h-[280px] reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                <div className="absolute inset-0 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                <div className="relative h-full w-full max-w-[450px] mx-auto bg-gradient-to-br from-cyan-900 to-blue-950 rounded-2xl shadow-2xl border border-cyan-400/50 p-4 md:p-6 flex flex-col justify-between overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-y-[5deg] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                   {/* Circuit Lines */}
                   <svg className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="none">
                      <path d="M0,50 L50,50 L70,20 L150,20 L170,50 L450,50" stroke="#facc15" strokeWidth="2" fill="none" className="drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
                      <path d="M0,200 L100,200 L130,250 L300,250 L350,180 L450,180" stroke="#facc15" strokeWidth="2" fill="none" className="drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
                      <rect x="60" y="100" width="60" height="45" rx="4" fill="#fbbf24" className="opacity-90" />
                      <circle cx="400" cy="40" r="2" fill="#facc15" />
                      <circle cx="420" cy="40" r="2" fill="#facc15" />
                   </svg>
                   
                   <div className="relative z-10 flex justify-between items-start">
                      <h3 className="text-xl md:text-2xl font-black text-cyan-300 tracking-widest uppercase font-mono drop-shadow-md">URK BANK</h3>
                      <div className="text-[8px] md:text-[10px] text-yellow-400 font-mono border border-yellow-400 px-2 py-0.5 rounded">CYBER_DEBT</div>
                   </div>
                   <div className="relative z-10 mt-auto">
                      <div className="text-lg md:text-xl font-mono text-cyan-100 tracking-widest drop-shadow-lg mb-2 group-hover:text-white transition-colors">1124 9056 2004 3333</div>
                      <div className="flex justify-between items-end">
                         <div className="text-yellow-300 font-mono text-xs md:text-sm uppercase">FIKOL / NEGR</div>
                         <div className="text-[10px] md:text-xs text-cyan-500 font-mono">VALID THRU: NEVER</div>
                      </div>
                   </div>
                </div>
             </div>

             {/* 2. SPACE CARD (ROCKET) */}
             <div className="group relative perspective-[1000px] h-[220px] md:h-[280px] reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                <div className="absolute inset-0 bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
                <div className="relative h-full w-full max-w-[450px] mx-auto bg-[#0a0a1a] rounded-2xl shadow-2xl border-2 border-blue-500/50 p-4 md:p-6 flex flex-col justify-between overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-y-[-5deg] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                   {/* Space Background */}
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
                   
                   {/* Rocket */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400 opacity-20 group-hover:opacity-40 transition-opacity animate-float">
                      <Rocket size={150} strokeWidth={1} className="w-[120px] h-[120px] md:w-[180px] md:h-[180px]" />
                   </div>

                   {/* Neon Border Mockup */}
                   <div className="absolute inset-4 border border-blue-400 rounded-xl opacity-50 pointer-events-none shadow-[0_0_15px_rgba(96,165,250,0.5)]"></div>

                   <div className="relative z-10 flex justify-between items-start">
                      <h3 className="text-xl md:text-2xl font-black text-blue-300 tracking-widest uppercase font-mono shadow-black drop-shadow-lg">URK COSMOS</h3>
                   </div>
                   
                   <div className="relative z-10 mt-auto pl-4">
                      <div className="flex items-center gap-4 mb-4">
                         <div className="w-10 h-8 bg-zinc-300 rounded overflow-hidden relative">
                            <div className="absolute top-2 left-1 w-6 h-4 border border-black/30 rounded"></div>
                         </div>
                      </div>
                      <div className="text-lg md:text-xl font-mono text-blue-50 tracking-widest drop-shadow-md mb-2 group-hover:text-white transition-colors">5570 1234 5678 9012</div>
                      <div className="text-blue-200 font-mono text-xs md:text-sm uppercase">JOHN DOE</div>
                   </div>
                </div>
             </div>

             {/* 3. NATURE CARD (TREE) */}
             <div className="group relative perspective-[1000px] h-[220px] md:h-[280px] reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
                <div className="absolute inset-0 bg-green-500/10 blur-3xl group-hover:bg-green-500/20 transition-all duration-500"></div>
                <div className="relative h-full w-full max-w-[450px] mx-auto bg-green-950 rounded-2xl shadow-2xl border border-green-700 p-4 md:p-6 flex flex-col justify-between overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-y-[5deg] group-hover:shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                   {/* Vines SVG */}
                   <svg className="absolute inset-0 w-full h-full opacity-30 text-green-400" viewBox="0 0 400 250">
                      <path d="M0,0 Q50,50 0,100 Q50,150 0,250" fill="none" stroke="currentColor" strokeWidth="10" />
                      <path d="M400,0 Q350,50 400,100 Q350,150 400,250" fill="none" stroke="currentColor" strokeWidth="10" />
                      <path d="M0,250 Q200,200 400,250" fill="none" stroke="currentColor" strokeWidth="10" />
                   </svg>
                   
                   {/* Tree Rune Center */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-300 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                      <TreeDeciduous size={130} strokeWidth={1} className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]" />
                      <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-spin-slow opacity-30 border-dashed"></div>
                   </div>

                   <div className="relative z-10 flex justify-between items-start">
                      <h3 className="text-xl md:text-2xl font-black text-green-100 tracking-widest uppercase font-mono shadow-black drop-shadow-lg">URK DRUID</h3>
                   </div>
                   
                   <div className="relative z-10 mt-auto text-center">
                      <div className="text-lg md:text-xl font-mono text-green-50 tracking-widest drop-shadow-md mb-2 group-hover:text-white transition-colors">3310 5676 9032 1088</div>
                      <div className="text-green-200 font-mono text-xs md:text-sm uppercase flex justify-between px-2 md:px-8">
                         <span>VALID: 09/26</span>
                         <span>JANE SMITH</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* 4. RUNE CARD (RED) */}
             <div className="group relative perspective-[1000px] h-[220px] md:h-[280px] reveal-on-scroll" style={{ transitionDelay: '400ms' }}>
                <div className="absolute inset-0 bg-red-500/10 blur-3xl group-hover:bg-red-500/20 transition-all duration-500"></div>
                <div className="relative h-full w-full max-w-[450px] mx-auto bg-[#1a0505] rounded-2xl shadow-2xl border border-red-900 p-4 md:p-6 flex flex-col justify-between overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-y-[-5deg] group-hover:shadow-[0_0_40px_rgba(239,68,68,0.4)]">
                   {/* Magic Circle SVG */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 border border-red-600 rounded-full opacity-40 group-hover:rotate-90 transition-transform duration-[2000ms]"></div>
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-48 md:h-48 border-2 border-dashed border-orange-600 rounded-full opacity-40 animate-spin-slow"></div>
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Flame size={60} className="text-orange-500 opacity-20 w-[60px] h-[60px] md:w-[80px] md:h-[80px]" />
                   </div>

                   {/* Black Strip */}
                   <div className="absolute top-8 left-0 right-0 h-10 md:h-12 bg-black opacity-80 border-y border-red-900"></div>

                   <div className="relative z-10 mt-auto mb-2">
                      <div className="flex justify-between px-2 mb-2">
                          <div className="w-8 h-6 md:w-10 md:h-8 bg-zinc-200 rounded opacity-80"></div>
                          <Skull className="text-red-700 w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="text-lg md:text-xl font-mono text-red-50 tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-2 group-hover:text-white transition-colors">
                         3310 5678 9012 3456
                      </div>
                      <div className="text-red-200 font-mono text-xs md:text-sm uppercase">
                         ALLHN DROW
                      </div>
                   </div>
                </div>
             </div>

          </div>
        </div>
      </section>

      {/* Tariffs Section */}
      <section id="tariffs-section" className="py-16 md:py-24 bg-black border-y border-zinc-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl md:text-6xl font-black mb-12 md:mb-16 uppercase text-white reveal-on-scroll">
            Самые Ужасные <span className="text-red-500">Тарифы</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tariff 1 */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl relative hover:border-zinc-500 transition-colors group flex flex-col hover:-translate-y-2 duration-300 reveal-on-scroll">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-zinc-700 px-4 py-1 rounded-full text-xs font-mono uppercase">Старт (Плохо)</div>
              <h3 className="text-2xl font-black text-center mb-4">Бомж-Пакет</h3>
              <div className="text-4xl font-black text-center mb-8 font-mono">0₽ <span className="text-sm font-normal text-zinc-500">/ вдох</span></div>
              <ul className="space-y-4 text-sm text-zinc-400 flex-grow">
                <li className="flex gap-2"><X className="text-red-500 w-4 h-4 flex-shrink-0" /> <span>Нет поддержки</span></li>
                <li className="flex gap-2"><Lock className="text-red-500 w-4 h-4 flex-shrink-0" /> <span>Блокировка счёта раз в неделю</span></li>
                <li className="flex gap-2"><Eye className="text-green-500 w-4 h-4 flex-shrink-0" /> <span>Мы следим за вами</span></li>
              </ul>
              <button 
                onClick={() => setShowBumMessage(true)}
                className={`${btnSecondary} w-full mt-8 py-4`}
              >
                Выбрать боль
              </button>
            </div>

            {/* Tariff 2 */}
            <div className="bg-zinc-900 border-2 border-yellow-500 p-6 md:p-8 rounded-2xl relative transform md:scale-105 shadow-[0_0_30px_-10px_rgba(234,179,8,0.3)] z-10 hover:shadow-[0_0_50px_-10px_rgba(234,179,8,0.5)] transition-all duration-300 reveal-on-scroll flex flex-col" style={{ transitionDelay: '100ms' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase">Хит (Ужасно)</div>
              <h3 className="text-2xl font-black text-center mb-4 text-yellow-500">Лох-Премиум</h3>
              <div className="text-4xl font-black text-center mb-8 font-mono">999₽ <span className="text-sm font-normal text-zinc-500">/ сек</span></div>
              <ul className="space-y-4 text-sm text-zinc-300 flex-grow">
                <li className="flex gap-2"><AlertTriangle className="text-yellow-500 w-4 h-4 flex-shrink-0" /> <span>Кредит без вашего ведома</span></li>
                <li className="flex gap-2"><AlertTriangle className="text-yellow-500 w-4 h-4 flex-shrink-0" /> <span>Личный хам-менеджер</span></li>
                <li className="flex gap-2"><AlertTriangle className="text-yellow-500 w-4 h-4 flex-shrink-0" /> <span>Смс с угрозами (бесплатно)</span></li>
              </ul>
              <button 
                onClick={() => setShowMiniGame(true)}
                className={`${btnAccent} w-full mt-8 py-4 font-black text-lg`}
              >
                Стать жертвой
              </button>
            </div>

            {/* Tariff 3 (Meme Image) */}
            <div className="bg-zinc-900 border border-purple-900 p-6 md:p-8 rounded-2xl relative hover:border-purple-600 transition-colors group cursor-pointer flex flex-col hover:-translate-y-2 duration-300 reveal-on-scroll" style={{ transitionDelay: '200ms' }} onClick={() => setShowRickRoll(true)}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-900 px-4 py-1 rounded-full text-xs font-mono uppercase animate-pulse">VIP (Божественно)</div>
              <h3 className="text-2xl font-black text-center mb-4 text-purple-500">Бесконечное Счастье</h3>
              <div className="text-4xl font-black text-center mb-8 font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Бесплатно</div>
              <ul className="space-y-4 text-sm text-zinc-400 flex-grow">
                <li className="flex gap-2"><Music className="text-purple-500 w-4 h-4 flex-shrink-0" /> <span>Вечная музыка</span></li>
                <li className="flex gap-2"><Play className="text-purple-500 w-4 h-4 flex-shrink-0" /> <span>Эксклюзивный контент</span></li>
                <li className="flex gap-2"><Zap className="text-purple-500 w-4 h-4 flex-shrink-0" /> <span>Вы никогда не откажетесь</span></li>
              </ul>
              <button className={`${btnBase} w-full mt-8 py-4 border border-purple-900 text-purple-500 hover:bg-purple-900 hover:text-white`}>
                Получить Всё
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Sitemap (Bureaucracy Map) */}
      <section id="scheme-section" className="py-20 bg-zinc-950 border-t border-zinc-800 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
           <h2 className="text-center text-3xl md:text-5xl font-black mb-12 md:mb-16 uppercase reveal-on-scroll">
             Схема <span className="text-yellow-500">Движения Средств</span>
           </h2>
           
           <div className="flex flex-col items-center reveal-on-scroll">
              {/* Root Node */}
              <div className="relative group z-20">
                 <div className="bg-cyan-900/30 border-2 border-cyan-500 text-cyan-300 px-6 md:px-8 py-3 md:py-4 rounded-xl font-black text-lg md:text-2xl uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105 cursor-default text-center">
                    ВАШИ ДЕНЬГИ
                 </div>
                 <div className="absolute top-full left-1/2 w-0.5 h-12 bg-zinc-700 -translate-x-1/2 transition-all duration-500 group-hover:h-12 group-hover:bg-cyan-500"></div>
              </div>

              {/* Level 1 Connectors - Interactive SVG */}
              <div className="relative w-full max-w-4xl mt-12 hidden md:block h-8">
                 <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    {/* Left Path */}
                    <path 
                      d="M50% 0 L17% 0 L17% 100%" 
                      fill="none" 
                      stroke={activeSchemeNode === 0 ? '#ef4444' : '#3f3f46'} 
                      strokeWidth={activeSchemeNode === 0 ? 3 : 2}
                      className="transition-all duration-300 ease-out"
                    />
                    {/* Center Path */}
                    <path 
                      d="M50% 0 L50% 100%" 
                      fill="none" 
                      stroke={activeSchemeNode === 1 ? '#eab308' : '#3f3f46'} 
                      strokeWidth={activeSchemeNode === 1 ? 3 : 2}
                      className="transition-all duration-300 ease-out"
                    />
                    {/* Right Path */}
                    <path 
                      d="M50% 0 L83% 0 L83% 100%" 
                      fill="none" 
                      stroke={activeSchemeNode === 2 ? '#a855f7' : '#3f3f46'} 
                      strokeWidth={activeSchemeNode === 2 ? 3 : 2}
                      className="transition-all duration-300 ease-out"
                    />
                    {/* Dot at Top Center */}
                    <circle cx="50%" cy="0" r="4" fill="#06b6d4" />
                 </svg>
              </div>

              {/* Level 1 Nodes - Vertical stack on mobile, Grid on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 w-full max-w-5xl mt-8 md:mt-0">
                 {/* Node 1: Commissions */}
                 <div 
                   className="flex flex-col items-center group relative z-20"
                   onMouseEnter={() => setActiveSchemeNode(0)}
                   onMouseLeave={() => setActiveSchemeNode(null)}
                 >
                    <div className="absolute -top-8 w-0.5 h-8 bg-zinc-700 md:hidden"></div>
                    <div className={`bg-zinc-800 border-2 ${activeSchemeNode === 0 ? 'border-red-500 scale-105 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'border-red-500/50'} text-red-400 px-4 py-3 rounded-lg font-bold uppercase text-xs md:text-sm text-center w-full transition-all duration-300 cursor-help`}>
                       Комиссии
                    </div>
                    <ArrowDown className={`text-zinc-700 my-2 transition-colors duration-300 ${activeSchemeNode === 0 ? 'text-red-500' : ''}`} />
                    <div className={`bg-zinc-900 border ${activeSchemeNode === 0 ? 'border-red-500 text-white' : 'border-zinc-700 text-zinc-500'} px-4 py-2 rounded text-[10px] md:text-xs text-center w-full transition-all duration-300`}>
                       На Яхту Директора
                    </div>
                 </div>

                 {/* Node 2: Hidden Fees */}
                 <div 
                   className="flex flex-col items-center group relative z-20"
                   onMouseEnter={() => setActiveSchemeNode(1)}
                   onMouseLeave={() => setActiveSchemeNode(null)}
                 >
                    <div className="absolute -top-8 w-0.5 h-8 bg-zinc-700 md:hidden"></div>
                    <div className={`bg-zinc-800 border-2 ${activeSchemeNode === 1 ? 'border-yellow-500 scale-105 shadow-[0_0_20px_rgba(234,179,8,0.4)]' : 'border-yellow-500/50'} text-yellow-400 px-4 py-3 rounded-lg font-bold uppercase text-xs md:text-sm text-center w-full transition-all duration-300 cursor-help`}>
                       Скрытые Платежи
                    </div>
                    <ArrowDown className={`text-zinc-700 my-2 transition-colors duration-300 ${activeSchemeNode === 1 ? 'text-yellow-500' : ''}`} />
                    <div className={`bg-zinc-900 border ${activeSchemeNode === 1 ? 'border-yellow-500 text-white' : 'border-zinc-700 text-zinc-500'} px-4 py-2 rounded text-[10px] md:text-xs text-center w-full transition-all duration-300`}>
                       Корпоратив на Бали
                    </div>
                 </div>

                 {/* Node 3: Magic */}
                 <div 
                   className="flex flex-col items-center group relative z-20"
                   onMouseEnter={() => setActiveSchemeNode(2)}
                   onMouseLeave={() => setActiveSchemeNode(null)}
                 >
                    <div className="absolute -top-8 w-0.5 h-8 bg-zinc-700 md:hidden"></div>
                    <div className={`bg-zinc-800 border-2 ${activeSchemeNode === 2 ? 'border-purple-500 scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'border-purple-500/50'} text-purple-400 px-4 py-3 rounded-lg font-bold uppercase text-xs md:text-sm text-center w-full transition-all duration-300 cursor-help`}>
                       Магия
                    </div>
                    <ArrowDown className={`text-zinc-700 my-2 transition-colors duration-300 ${activeSchemeNode === 2 ? 'text-purple-500' : ''}`} />
                    <div className={`bg-zinc-900 border ${activeSchemeNode === 2 ? 'border-purple-500 text-white' : 'border-zinc-700 text-zinc-500'} px-4 py-2 rounded text-[10px] md:text-xs text-center w-full transition-all duration-300`}>
                       В Никуда
                    </div>
                 </div>
              </div>

              {/* Sub-process visual with Tooltip */}
              <div className="mt-16 relative w-full max-w-2xl bg-zinc-900/50 p-6 border border-dashed border-zinc-700 rounded-xl hover:border-zinc-500 transition-colors group">
                 
                 {/* Tooltip */}
                 <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 bg-zinc-800 text-zinc-200 text-xs p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-zinc-700 text-center">
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-800 border-b border-r border-zinc-700 transform rotate-45"></div>
                    <span className="font-bold text-cyan-400 block mb-1">СЕКРЕТНЫЙ ПРОТОКОЛ</span>
                    Это бесконечный цикл бюрократии, разработанный для максимального унижения клиента.
                 </div>

                 <div className="absolute -top-3 left-6 bg-zinc-950 px-2 text-xs text-zinc-500 font-mono flex items-center gap-2">
                    ПРОЦЕСС ВОЗВРАТА СРЕДСТВ 
                    <Info size={12} className="text-zinc-600 group-hover:text-cyan-500 transition-colors" />
                 </div>
                 
                 <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
                    <span className="bg-black border border-zinc-800 px-3 py-2 rounded hover:text-white transition-colors cursor-help w-full md:w-auto text-center hover:border-cyan-500">Заявка</span>
                    <div className="hidden md:block h-px w-12 bg-zinc-700 group-hover:bg-cyan-900 transition-colors"></div>
                    <ArrowDown className="md:hidden text-zinc-700" size={16} />
                    <span className="bg-black border border-zinc-800 px-3 py-2 rounded hover:text-white transition-colors cursor-help w-full md:w-auto text-center hover:border-cyan-500">Ожидание (∞)</span>
                    <div className="hidden md:block h-px w-12 bg-zinc-700 group-hover:bg-cyan-900 transition-colors"></div>
                    <ArrowDown className="md:hidden text-zinc-700" size={16} />
                    <span className="bg-red-900/20 border border-red-900/50 text-red-500 px-3 py-2 rounded animate-pulse w-full md:w-auto text-center">Отказ</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Conditions Modal */}
      {showConditions && (
        <div className="fixed inset-0 z-[120] bg-black/95 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300 overflow-y-auto">
           <div className="relative max-w-2xl w-full flex flex-col items-center">
                <button className="absolute top-0 right-0 text-zinc-500 hover:text-white p-2" onClick={() => setShowConditions(false)}>
                    <X size={32} />
                </button>
                <ShieldAlert size={64} className="text-red-600 mb-6 animate-pulse" />
                <h2 className="text-3xl md:text-5xl font-black uppercase text-red-500 mb-4">Предупреждение</h2>
                <p className="text-lg md:text-xl text-zinc-300 mb-8">
                    Нажимая любую кнопку на этом сайте, вы автоматически соглашаетесь на передачу своей бессмертной души, 
                    имущества и права на счастье в собственность УРК БАНК. 
                </p>
                <p className="text-xs text-zinc-600 font-mono">
                    * Возврат души невозможен. Претензии принимаются только в письменном виде на санскрите.
                </p>
                <button className={`${btnPrimary} mt-8 px-8 py-3`} onClick={() => setShowConditions(false)}>Я Согласен На Страдания</button>
           </div>
        </div>
      )}

      {/* Commission Modal */}
      {showCommissionModal && (
        <div className="fixed inset-0 z-[150] bg-black/95 flex flex-col items-center justify-center p-4 text-center animate-in zoom-in duration-300 overflow-y-auto" onClick={() => setShowCommissionModal(false)}>
           <div className="bg-zinc-900 border-4 border-purple-500 p-6 md:p-10 rounded-3xl max-w-lg w-full relative shadow-[0_0_100px_rgba(168,85,247,0.5)] my-auto" onClick={e => e.stopPropagation()}>
               <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-2 rounded-full font-bold uppercase shadow-lg text-xs md:text-sm whitespace-nowrap">Результат Анализа</div>
               <h2 className="text-xl md:text-2xl font-bold text-zinc-400 mb-4 mt-4">Ваша индивидуальная комиссия:</h2>
               <div className="text-5xl md:text-6xl font-black text-white font-mono mb-2 tracking-tighter">
                  {commissionAmount} ₽
               </div>
               <div className="text-purple-400 text-sm font-mono uppercase mb-8">В секунду</div>
               <div className="flex flex-col gap-3">
                   <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center">
                       <CheckCircle2 size={12} className="text-green-500" />
                       <span>Учитывая цвет ваших глаз</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center">
                       <CheckCircle2 size={12} className="text-green-500" />
                       <span>Учитывая фазу луны</span>
                   </div>
               </div>
               <button className={`${btnPrimary} w-full mt-8 py-4`} onClick={() => setShowCommissionModal(false)}>
                   Спасибо, я в восторге
               </button>
           </div>
        </div>
      )}

      {/* News Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 z-[130] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in duration-300 overflow-y-auto" onClick={() => setShowNewsModal(false)}>
           <div className="bg-zinc-900 border-2 border-cyan-500 p-6 md:p-8 rounded-2xl max-w-lg w-full relative shadow-[0_0_50px_rgba(6,182,212,0.3)] my-auto" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-zinc-500 hover:text-white" onClick={() => setShowNewsModal(false)}>
                 <X size={24} />
              </button>
              
              <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                 <Newspaper className="text-cyan-400 w-6 h-6 md:w-8 md:h-8" />
                 <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest">Срочные Новости</h2>
              </div>
              
              <div className="space-y-4">
                  <div className="bg-black/50 p-4 rounded border-l-4 border-red-500">
                     <h3 className="text-red-400 font-bold uppercase text-xs mb-1">Экстренно</h3>
                     <p className="text-zinc-200 text-sm md:text-base">Генеральный директор FIKOL запретил букву "А" в именах сотрудников. Александр теперь "лексндр". Акции банка выросли на 0.00%.</p>
                  </div>
                  <div className="bg-black/50 p-4 rounded border-l-4 border-yellow-500">
                     <h3 className="text-yellow-400 font-bold uppercase text-xs mb-1">Экономика</h3>
                     <p className="text-zinc-200 text-sm md:text-base">Мы ввели налог на бедность. Теперь, если у вас 0 рублей, вы должны банку 500 рублей за обслуживание нуля.</p>
                  </div>
              </div>
              
              <button className={`${btnPrimary} w-full mt-6`} onClick={() => setShowNewsModal(false)}>
                 Осознать и Принять
              </button>
           </div>
        </div>
      )}

      {/* Bum Message Overlay */}
      {showBumMessage && (
        <div 
          className="fixed inset-0 z-[120] bg-black flex items-center justify-center p-4 cursor-pointer overflow-hidden"
          onClick={() => setShowBumMessage(false)}
        >
           <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-center text-red-600 uppercase tracking-tighter animate-pulse scale-110 break-words">
             Нищий бомж<br/>иди отсюда
           </h1>
        </div>
      )}

      {/* Account Simulator Modal */}
      {showAccountSim && (
        <div className="fixed inset-0 z-[110] bg-black flex items-center justify-center p-0 md:p-4 overflow-y-auto">
           <button className="absolute top-4 right-4 text-white z-50 bg-zinc-800 rounded-full p-2" onClick={() => setShowAccountSim(false)}>
              <X size={24} />
           </button>
           
           <div className="w-full h-full md:max-w-md md:h-[80vh] md:max-h-[800px] bg-zinc-950 md:rounded-[3rem] border-4 border-zinc-800 relative overflow-hidden flex flex-col my-auto">
              {/* Dynamic Header */}
              <div className="bg-zinc-900 p-6 pt-12 pb-4 flex justify-between items-center border-b border-zinc-800">
                 <div className="font-mono text-xs uppercase text-zinc-500">УРК ID: {Math.floor(Math.random() * 99999)}</div>
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              </div>

              {simStep === 'form' ? (
                <div className="flex-1 flex flex-col justify-center p-8 space-y-6 overflow-y-auto">
                   <h2 className="text-3xl font-black uppercase text-center text-white">Регистрация <br/>Жертвы</h2>
                   <form onSubmit={startSimulation} className="space-y-4">
                      <div>
                        <label className="text-xs uppercase font-bold text-zinc-500">Имя</label>
                        <input 
                          type="text" 
                          required 
                          className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded text-white focus:outline-none focus:border-cyan-500"
                          placeholder="Иван"
                          value={simName}
                          onChange={e => setSimName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase font-bold text-zinc-500">Фамилия</label>
                        <input 
                          type="text" 
                          required 
                          className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded text-white focus:outline-none focus:border-cyan-500"
                          placeholder="Должников"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase font-bold text-zinc-500">Дата Рождения</label>
                        <input 
                          type="date" 
                          required 
                          className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <button type="submit" className={`${btnPrimary} w-full mt-4 py-4`}>
                         Отдать всё
                      </button>
                   </form>
                   <p className="text-[10px] text-center text-zinc-600 pb-8">
                      Нажимая кнопку, вы соглашаетесь с тем, что ваша жизнь больше вам не принадлежит.
                   </p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col bg-black h-full">
                   <div className="p-8 bg-gradient-to-b from-red-900 to-black text-center flex-shrink-0">
                      <div className="text-xs font-mono uppercase text-red-300 mb-2">Ваш Текущий Баланс</div>
                      <div className="text-3xl md:text-4xl font-black text-red-500 font-mono tracking-tighter">
                         {simBalance.toLocaleString()} ₽
                      </div>
                      <div className="mt-2 text-[10px] uppercase bg-red-950/50 text-red-400 inline-block px-2 py-1 rounded animate-pulse">
                         Счёт активно уничтожается
                      </div>
                   </div>
                   
                   <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                      {simTransactions.map((tx, idx) => (
                         <div key={idx} className="flex items-center justify-between p-3 bg-zinc-900 rounded border border-zinc-800 animate-in slide-in-from-bottom-2 fade-in duration-300">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                                  <tx.icon size={14} className="text-red-500" />
                               </div>
                               <div className="text-sm font-bold text-zinc-300">{tx.title}</div>
                            </div>
                            <div className="font-mono text-red-500 text-sm">-{tx.amount} ₽</div>
                         </div>
                      ))}
                   </div>
                </div>
              )}
           </div>
        </div>
      )}

       {/* Mini Game Modal */}
       {showMiniGame && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 overflow-hidden">
          <button className="absolute top-4 right-4 text-zinc-500 hover:text-white p-2" onClick={() => setShowMiniGame(false)}>
            <X size={32} />
          </button>
          
          <div className="relative w-full max-w-2xl h-[400px] bg-zinc-900 border-2 border-yellow-500 rounded-2xl overflow-hidden flex flex-col items-center justify-center select-none shadow-[0_0_50px_rgba(234,179,8,0.2)]">
             <h2 className="absolute top-6 text-xl md:text-3xl font-black text-yellow-500 uppercase tracking-widest text-center px-4">
               Подтверждение <br/><span className="text-white text-sm md:text-base font-mono">Вы точно хотите это?</span>
             </h2>
             
             <div className="absolute inset-0 z-0 opacity-10 pointer-events-none grid grid-cols-6 grid-rows-4">
                {[...Array(24)].map((_, i) => (
                   <div key={i} className="border border-yellow-500/20"></div>
                ))}
             </div>

             <div className="text-center text-zinc-500 font-mono text-xs absolute bottom-4">
                Поймайте кнопку, если сможете
             </div>

             <button
                style={{ position: 'absolute', top: btnPos.top, left: btnPos.left, transition: 'all 0.1s ease-out' }}
                onMouseEnter={moveButton}
                onTouchStart={moveButton}
                onClick={handleGameWin}
                className={`${btnDanger} whitespace-nowrap z-50 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-6 py-3`}
             >
                <MousePointer2 size={16} />
                Подтвердить
             </button>
          </div>
        </div>
      )}

      {/* Image Modal (Meme) */}
      {showRickRoll && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white z-50 p-2 bg-zinc-800 rounded-full" 
            onClick={() => setShowRickRoll(false)}
          >
            <X size={24} />
          </button>
          <div className="w-full max-w-5xl h-auto bg-black shadow-2xl border border-zinc-800 rounded-2xl overflow-hidden relative flex items-center justify-center">
            <img 
              src="https://memchik.ru//images/memes/610ec2c7b1c7e35a2975d435.jpg" 
              alt="Happiness" 
              loading="lazy"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
          <div className="mt-8 text-center animate-bounce">
            <h2 className="text-2xl md:text-5xl font-black text-purple-500 uppercase">Поздравляем!</h2>
            <p className="text-zinc-400 mt-2 text-sm md:text-base">Вы выбрали лучший тариф. Наслаждайтесь.</p>
          </div>
        </div>
      )}

      {/* AI Support Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-zinc-900 border-l border-zinc-700 shadow-2xl z-[300] transform transition-transform duration-300 ease-in-out ${isSupportOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
            <div className="flex items-center gap-2">
              <Bot className="text-red-500" />
              <span className="font-bold uppercase tracking-widest text-red-500">Злой ИИ</span>
            </div>
            <button onClick={() => setIsSupportOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900/50">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-zinc-800 text-white border border-zinc-700' 
                    : 'bg-red-900/20 text-red-200 border border-red-900/50'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isAiTyping && (
              <div className="flex justify-start">
                <div className="bg-red-900/20 text-red-500 p-3 rounded-lg text-xs animate-pulse">
                  Печатает гадости...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleChatSubmit} className="p-4 border-t border-zinc-800 bg-zinc-950 flex gap-2">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Напишите свою проблему..."
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded p-2 text-sm focus:outline-none focus:border-red-500 text-white"
            />
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Team Section */}
      <section id="team-section" className="py-16 md:py-24 bg-zinc-950 px-4 md:px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-5xl font-black mb-12 md:mb-16 uppercase reveal-on-scroll">
            Руководство <span className="text-purple-500">Банка</span>
          </h2>

          <div className="flex flex-col gap-4">
            {TEAM_MEMBERS.map((member, i) => (
               <div 
                 key={i} 
                 className="group relative flex flex-row items-center bg-zinc-900/30 border border-zinc-800 hover:bg-zinc-900 hover:border-purple-500/50 transition-all duration-300 p-4 rounded-xl overflow-hidden cursor-pointer h-24 hover:h-48 reveal-on-scroll"
                 style={{ transitionDelay: `${i * 100}ms` }}
                 onClick={() => setSelectedMember(member)}
               >
                  <div className={`w-16 h-16 flex-shrink-0 ${member.color} rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-zinc-700 group-hover:border-white transition-colors`}>
                     {member.img ? (
                       <img src={member.img} alt={member.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                     ) : (
                       <User size={32} className="opacity-50" />
                     )}
                  </div>
                  
                  <div className="ml-6 flex-1 flex flex-col justify-center h-full">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="font-bold text-lg md:text-xl uppercase group-hover:text-purple-400 transition-colors">{member.name}</h3>
                        <span className="text-[10px] font-mono border border-zinc-700 px-2 py-1 rounded text-zinc-500 group-hover:text-white group-hover:border-purple-500 transition-colors uppercase hidden sm:block">{member.role}</span>
                    </div>
                    
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden mt-0 group-hover:mt-2">
                        <p className="text-zinc-400 text-sm italic border-l-2 border-purple-500 pl-3">"{member.desc}"</p>
                        <div className="mt-4 text-xs text-purple-400 font-mono uppercase tracking-widest flex items-center gap-2">
                            Подробнее <ArrowDown size={12} className="-rotate-90" />
                        </div>
                    </div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto" onClick={() => setSelectedMember(null)}>
          <div className="bg-zinc-900 border border-zinc-700 max-w-lg w-full p-6 md:p-12 rounded-2xl relative shadow-2xl flex flex-col items-center text-center transform scale-100 transition-all zoom-in-95 duration-200 my-auto" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-zinc-500 hover:text-white p-2" onClick={() => setSelectedMember(null)}>
              <X size={32} />
            </button>
            
            <div className={`w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 md:mb-8 border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] flex-shrink-0`}>
              {selectedMember.img ? (
                <img src={selectedMember.img} alt={selectedMember.name} loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full ${selectedMember.color} flex items-center justify-center`}>
                   <User size={64} />
                </div>
              )}
            </div>
            
            <h3 className="text-3xl md:text-5xl font-black uppercase mb-2 tracking-tight">{selectedMember.name}</h3>
            <div className="text-purple-400 font-mono text-xs md:text-base uppercase mb-6 md:mb-8 tracking-widest border-b border-zinc-800 pb-4 w-full">{selectedMember.role}</div>
            
            <p className="text-zinc-300 leading-relaxed text-base md:text-xl font-light">
              {selectedMember.fullDesc}
            </p>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-5xl font-black mb-12 md:mb-16 reveal-on-scroll">
            ЧТО ГОВОРЯТ <span className="text-cyan-400">ЖЕРТВЫ</span>
          </h2>
          
          <div ref={reviewsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {reviewsToDisplay.map((review, i) => (
              <div 
                key={i} 
                className="bg-zinc-950 p-6 md:p-8 border border-zinc-800 relative hover:border-cyan-500 transition-all duration-300 hover:-translate-y-1 group flex flex-col animate-in slide-in-from-bottom-2 fade-in fill-mode-forwards" 
                style={{ animationDelay: `${i * 50}ms`, animationDuration: '500ms' }}
              >
                 {/* Decorative Dots */}
                 <div className="flex gap-1 mb-6">
                    <div className="w-2 h-2 rounded-full bg-red-500 group-hover:animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500 group-hover:animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500 group-hover:animate-pulse delay-150"></div>
                 </div>
                 
                 <p className="text-zinc-300 mb-8 leading-relaxed italic flex-grow text-sm md:text-base">"{review.text}"</p>
                 
                 <div className="flex items-center gap-4 mt-auto pt-4 border-t border-zinc-900">
                    <div className="w-10 h-10 flex-shrink-0 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-cyan-500 uppercase group-hover:bg-cyan-900 transition-colors">
                       {review.author[0]}
                    </div>
                    <div>
                       <div className="font-bold text-white text-sm">{review.author}</div>
                       <div className="text-xs text-zinc-500 uppercase tracking-wider">{review.role}</div>
                    </div>
                 </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={() => setShowAllReviews(!showAllReviews)}
              className={`${btnSecondary} px-8 py-3`}
            >
               {showAllReviews ? "Свернуть Страдания" : "Ещё Больше Отзывов"}
            </button>
          </div>
        </div>
      </section>

      {/* Unique Commission Section */}
      <section className="py-20 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
           <div className="space-y-6 md:space-y-8 reveal-on-scroll">
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Уникальная <br/>Комиссия</h2>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed border-l-2 border-purple-500 pl-6 max-w-xl">
                Мы рады представить вам уникальное предложение по комиссиям, 
                специально подобранное для уничтожения вашего счёта. В этой вкладке вы обнаружите 
                индивидуальные комиссии, созданные с учетом особенностей вашего аккаунта.
              </p>
              <button onClick={handleKnowCommission} className={`${btnBase} bg-white text-black hover:bg-zinc-200 px-8 py-3`}>
                Узнать комиссию
              </button>
           </div>
           
           <div className="reveal-on-scroll w-full" style={{ transitionDelay: '200ms' }}>
              <div className="bg-purple-700 rounded-[2rem] p-6 md:p-12 shadow-[0_0_60px_rgba(126,34,206,0.3)] transform rotate-1 hover:rotate-0 transition-transform duration-500 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-50"></div>
                 <div className="space-y-4 md:space-y-6 relative z-10">
                    {[
                      { name: "Комиссия за просмотр баланса", price: "???", link: "#wallet-section" },
                      { name: "Комиссия за смену пароля", price: "???", link: "#app-container" },
                      { name: "Комиссия за перевод между счетами", price: "???", link: "#cards-section" },
                      { name: "Комиссия за СМС уведомления", price: "???", link: "#tariffs-section" },
                      { name: "Комиссия за прокрутку страницы", price: "???", link: "#scheme-section" }
                    ].map((com, i) => (
                        <a key={i} href={com.link} onClick={(e) => handleNavClick(e, com.link.replace('#', ''))} className="flex justify-between items-center group border-b border-purple-500/30 pb-3 md:pb-4 last:border-0 last:pb-0 hover:bg-purple-600/20 px-2 -mx-2 rounded transition-colors cursor-pointer">
                            <span className="font-bold text-white text-xs md:text-base pr-4 group-hover:text-purple-200 transition-colors underline decoration-dotted decoration-purple-400/50">{com.name}</span>
                            <span className="font-mono text-lime-400 text-base md:text-xl font-bold">{com.price}</span>
                        </a>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-2 group cursor-pointer justify-center md:justify-start">
               <div className="w-8 h-8 bg-cyan-900 rounded flex items-center justify-center font-mono font-bold text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition-colors">У</div>
               <span className="font-bold text-zinc-500 group-hover:text-white transition-colors">УРК БАНК &copy; 2024</span>
            </div>
            <div className="flex gap-4 md:gap-6 text-zinc-600 text-xs md:text-sm flex-wrap justify-center">
               <a href="#" className="hover:text-white transition-colors">Лицензия на хаос</a>
               <a href="#" className="hover:text-white transition-colors">Политика отчаяния</a>
               <a href="#" className="hover:text-white transition-colors">Связь с пустотой</a>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;