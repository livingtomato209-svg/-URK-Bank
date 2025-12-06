
import React, { useState } from 'react';
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
  Play
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showRickRoll, setShowRickRoll] = useState(false);

  // Reviews Data
  const initialReviews = [
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

  const extraReviews = [
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

  const reviewsToDisplay = showAllReviews ? [...initialReviews, ...extraReviews] : initialReviews;

  // Team Data
  const teamMembers = [
    { 
      name: "FIKOL / NEGR", 
      role: "Генеральный Директор", 
      color: "bg-orange-600", 
      desc: "Молчание — золото.",
      fullDesc: "Легендарный физик-теоретик, который переквалифицировался в финансового тирана. Никогда не говорит ни слова, но один его взгляд заставляет акции падать. Управляет банком с помощью монтировки.",
      // Gordon Freeman placeholder
      img: "https://upload.wikimedia.org/wikipedia/en/a/a5/Gordon_Freeman.png" 
    },
    { 
      name: "Патрик", 
      role: "Слияния и Поглощения", 
      color: "bg-zinc-800", 
      desc: "Любит визитки.",
      fullDesc: "Его визитка имеет лучший шрифт, чем у вас. Занимается 'слияниями' конкурентов с асфальтом. Увлекается музыкой 80-х и уходом за кожей.",
      // Patrick Bateman
      img: "https://i.redd.it/77bvnk555ffc1.png" 
    },
    { 
      name: "Эллиот", 
      role: "Кибербезопасность", 
      color: "bg-black border border-white/20", 
      desc: "Никому не доверяет.",
      fullDesc: "Взломал наш банк, чтобы устроиться на работу. Теперь он взламывает клиентов, чтобы они не расслаблялись. Разговаривает с воображаемым другом о курсе биткоина.",
      // Elliot Alderson (Updated Link)
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpePG5yJFHhAvQVWyWB9zer83v0hZIyOafw&s"
    },
    { 
      name: "Сол", 
      role: "Юридический Отдел", 
      color: "bg-yellow-500 text-black", 
      desc: "Всё законно... почти.",
      fullDesc: "Знает, как превратить финансовую пирамиду в 'инновационный многоуровневый маркетинг'. Если вас посадили за наши кредиты — лучше звоните ему.",
      // Saul Goodman placeholder
      img: "https://upload.wikimedia.org/wikipedia/en/3/34/Jimmy_McGill_BCS_S3.png"
    },
    { 
      name: "Джесси", 
      role: "Логистика", 
      color: "bg-yellow-200 text-black", 
      desc: "Наука, бич!",
      fullDesc: "Отвечает за доставку наличных. Иногда наличные теряются, но он всегда находит оправдание. Любит магниты.",
      // Jesse Pinkman
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd8EkQv-38wHJr_xe-ZZGeoKhKZik_UUXOsA&s"
    },
    { 
      name: "Уолтер", 
      role: "Химик-Технолог", 
      color: "bg-green-700", 
      desc: "Варит лучший продукт.",
      fullDesc: "Мы сами не знаем, что он делает в банке. Но его 'синий лёд' (замороженные активы) пользуется огромным спросом. Не стучите в его дверь.",
      // Walter White placeholder
      img: "https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png"
    },
    { 
      name: "G-Man", 
      role: "Куратор", 
      color: "bg-blue-900", 
      desc: "Непредсказуемые последствия.",
      fullDesc: "Появляется раз в месяц, поправляет галстук и исчезает. Зарплату получает в антиматерии. Контролирует время обработки ваших транзакций.",
      // G-Man
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnTcbTVgWrITbJQFdU_x2AJCQWckUI8YcCFw&s"
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden relative font-sans scroll-smooth">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(#27272a 1px, transparent 1px), linear-gradient(90deg, #27272a 1px, transparent 1px)`, 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-panel border-b border-white/5 backdrop-blur-md bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 z-50">
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center transform -rotate-6 border-2 border-yellow-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <span className="font-mono font-black text-xl text-yellow-300">У</span>
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase font-mono text-cyan-500">УРК<span className="text-white">БАНК</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest text-zinc-400">
            {['Кошелек', 'Карты', 'Тарифы', 'Команда'].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-cyan-400 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2 bg-yellow-400 text-black font-black uppercase tracking-wider text-xs hover:bg-yellow-300 transition-colors skew-x-[-10deg] border border-yellow-200 shadow-lg">
              <span className="skew-x-[10deg] inline-block">Войти в Хаос</span>
            </button>
          </div>

          <button className="md:hidden text-white z-50 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-zinc-950 z-40 transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
             {['Кошелек', 'Карты', 'Тарифы', 'Команда'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                className="text-4xl font-black text-zinc-300 hover:text-cyan-400 uppercase tracking-tighter"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="mt-8 px-8 py-4 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm shadow-xl">
              Войти в Хаос
            </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="Кошелек" className="relative pt-32 pb-12 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-widest animate-pulse">
              <ShieldAlert className="w-3 h-3" />
              Осторожно: Высокие ставки
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase break-words">
              Банк <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Которого Вы Боитесь</span>
            </h1>
            
            <p className="text-zinc-400 text-base md:text-xl max-w-xl leading-relaxed border-l-2 border-yellow-500 pl-6">
              УРК БАНК — это не просто финансы. Это испытание воли. 
              Скачайте приложение и попробуйте найти кнопку "Выход". 
              Спойлер: её нет.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-cyan-600 text-white font-bold uppercase tracking-widest hover:bg-cyan-500 transition-all transform hover:-translate-y-1 shadow-[0_0_30px_-5px_rgba(8,145,178,0.6)]">
                Открыть Счёт (Рискнуть)
              </button>
              <button className="w-full sm:w-auto px-8 py-4 border border-zinc-700 text-zinc-300 font-bold uppercase tracking-widest hover:border-yellow-400 hover:text-yellow-400 transition-all">
                Читать Условия
              </button>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-8 pt-4 md:pt-8">
              {[
                { icon: Ghost, label: 'Призрачные Платежи' },
                { icon: TrendingDown, label: 'Отрицательный Рост' },
                { icon: Skull, label: 'Пожизненная Ипотека' }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-help bg-zinc-900/50 p-2 rounded-lg border border-transparent hover:border-zinc-700">
                  <feature.icon className="w-5 h-5 text-zinc-500" />
                  <span className="text-xs font-mono uppercase leading-tight">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center lg:justify-end perspective-[1000px] order-1 lg:order-2">
             {/* Abstract Decorative Elements */}
             <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-[80px] md:blur-[100px] animate-pulse"></div>

             {/* Phone Mockup (CSS Only) */}
             <div className="relative w-[260px] md:w-[300px] h-[520px] md:h-[600px] bg-zinc-950 rounded-[2.5rem] md:rounded-[3rem] border-4 md:border-8 border-zinc-800 shadow-2xl z-20 overflow-hidden transform rotate-y-[-10deg] rotate-x-[5deg] transition-transform hover:rotate-0 duration-500 border-r-zinc-700">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-6 bg-zinc-800 rounded-b-xl z-30"></div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-zinc-900 flex flex-col p-5 md:p-6 relative">
                  <div className="mt-8 flex justify-between items-center">
                    <span className="font-mono text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest">УРК Mobile</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                      <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 p-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-2 opacity-50">
                        <TrendingDown className="text-black w-8 h-8" />
                     </div>
                     <span className="text-black font-mono text-xs uppercase font-bold">Ваш Долг</span>
                     <div className="text-2xl md:text-3xl font-black text-black mt-1">$-9,999.99</div>
                     <div className="mt-4 flex gap-2">
                        <div className="px-3 py-1 bg-black/20 rounded-md text-black text-[10px] font-bold uppercase cursor-pointer hover:bg-black/30">Паника</div>
                        <div className="px-3 py-1 bg-black/10 rounded-md text-black text-[10px] font-bold uppercase cursor-pointer hover:bg-black/20">Бежать</div>
                     </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="p-3 md:p-4 bg-zinc-800/50 rounded-xl flex items-center justify-between border border-zinc-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400"><Briefcase size={14} /></div>
                        <div>
                          <div className="text-sm font-bold">Взятка Мэру</div>
                          <div className="text-[10px] text-zinc-500">Автоплатеж</div>
                        </div>
                      </div>
                      <span className="text-red-400 font-mono text-sm">-$500.00</span>
                    </div>
                    <div className="p-3 md:p-4 bg-zinc-800/50 rounded-xl flex items-center justify-between border border-zinc-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400"><Ghost size={14} /></div>
                        <div>
                          <div className="text-sm font-bold">Подписка на Ничто</div>
                          <div className="text-[10px] text-zinc-500">Ежесекундно</div>
                        </div>
                      </div>
                      <span className="text-red-400 font-mono text-sm">-$0.99</span>
                    </div>
                  </div>

                  {/* Annoying Notification */}
                  <div className="absolute bottom-10 left-4 right-4 bg-red-600 text-white p-3 rounded-lg text-xs font-bold shadow-2xl transform hover:scale-105 transition-transform cursor-pointer border border-red-400">
                    <div className="flex justify-between items-start">
                      <span>ВНИМАНИЕ! Ваш пароль слишком простой. Смените его на иероглифы.</span>
                      <X size={12} className="opacity-50" />
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Cards Collection Section */}
      <section id="Карты" className="py-16 md:py-24 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 md:mb-16 text-center">
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
             <div className="group relative perspective-[1000px] h-[220px] md:h-[280px]">
                <div className="absolute inset-0 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                <div className="relative h-full w-full max-w-[450px] mx-auto bg-gradient-to-br from-cyan-900 to-blue-950 rounded-2xl shadow-2xl border border-cyan-400/50 p-4 md:p-6 flex flex-col justify-between overflow-hidden transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-y-[5deg]">
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
                      <div className="text-lg md:text-xl font-mono text-cyan-100 tracking-widest drop-shadow-lg mb-2">1124 9056 2004 3333</div>
                      <div className="flex justify-between items-end">
                         <div className="text-yellow-300 font-mono text-xs md:text-sm uppercase">FIKOL / NEGR</div>
                         <div className="text-[10px] md:text-xs text-cyan-500 font-mono">VALID THRU: NEVER</div>
                      </div>
                   </div>
                </div>
             </div>

             {/* 2. SPACE CARD (ROCKET) */}
             <div className="group relative perspective-[1000px] h-[220px] md:h-[280px]">
                <div className="absolute inset-0 bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
                <div className="relative h-full w-full max-w-[450px] mx-auto bg-[#0a0a1a] rounded-2xl shadow-2xl border-2 border-blue-500/50 p-4 md:p-6 flex flex-col justify-between overflow-hidden transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-y-[-5deg]">
                   {/* Space Background */}
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
                   
                   {/* Rocket */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Rocket size={150} strokeWidth={1} className="md:w-[180px] md:h-[180px]" />
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
                      <div className="text-lg md:text-xl font-mono text-blue-50 tracking-widest drop-shadow-md mb-2">5570 1234 5678 9012</div>
                      <div className="text-blue-200 font-mono text-xs md:text-sm uppercase">JOHN DOE</div>
                   </div>
                </div>
             </div>

             {/* 3. NATURE CARD (TREE) */}
             <div className="group relative perspective-[1000px] h-[220px] md:h-[280px]">
                <div className="absolute inset-0 bg-green-500/10 blur-3xl group-hover:bg-green-500/20 transition-all duration-500"></div>
                <div className="relative h-full w-full max-w-[450px] mx-auto bg-green-950 rounded-2xl shadow-2xl border border-green-700 p-4 md:p-6 flex flex-col justify-between overflow-hidden transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-y-[5deg]">
                   {/* Vines SVG */}
                   <svg className="absolute inset-0 w-full h-full opacity-30 text-green-400" viewBox="0 0 400 250">
                      <path d="M0,0 Q50,50 0,100 Q50,150 0,250" fill="none" stroke="currentColor" strokeWidth="10" />
                      <path d="M400,0 Q350,50 400,100 Q350,150 400,250" fill="none" stroke="currentColor" strokeWidth="10" />
                      <path d="M0,250 Q200,200 400,250" fill="none" stroke="currentColor" strokeWidth="10" />
                   </svg>
                   
                   {/* Tree Rune Center */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-300 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                      <TreeDeciduous size={130} strokeWidth={1} className="md:w-[160px] md:h-[160px]" />
                      <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-spin-slow opacity-30 border-dashed"></div>
                   </div>

                   <div className="relative z-10 flex justify-between items-start">
                      <h3 className="text-xl md:text-2xl font-black text-green-100 tracking-widest uppercase font-mono shadow-black drop-shadow-lg">URK DRUID</h3>
                   </div>
                   
                   <div className="relative z-10 mt-auto text-center">
                      <div className="text-lg md:text-xl font-mono text-green-50 tracking-widest drop-shadow-md mb-2">3310 5676 9032 1088</div>
                      <div className="text-green-200 font-mono text-xs md:text-sm uppercase flex justify-between px-2 md:px-8">
                         <span>VALID: 09/26</span>
                         <span>JANE SMITH</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* 4. RUNE CARD (RED) */}
             <div className="group relative perspective-[1000px] h-[220px] md:h-[280px]">
                <div className="absolute inset-0 bg-red-500/10 blur-3xl group-hover:bg-red-500/20 transition-all duration-500"></div>
                <div className="relative h-full w-full max-w-[450px] mx-auto bg-[#1a0505] rounded-2xl shadow-2xl border border-red-900 p-4 md:p-6 flex flex-col justify-between overflow-hidden transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-y-[-5deg]">
                   {/* Magic Circle SVG */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 border border-red-600 rounded-full opacity-40 group-hover:rotate-90 transition-transform duration-[2000ms]"></div>
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-48 md:h-48 border-2 border-dashed border-orange-600 rounded-full opacity-40 animate-spin-slow"></div>
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Flame size={60} className="text-orange-500 opacity-20 md:w-[80px] md:h-[80px]" />
                   </div>

                   {/* Black Strip */}
                   <div className="absolute top-8 left-0 right-0 h-10 md:h-12 bg-black opacity-80 border-y border-red-900"></div>

                   <div className="relative z-10 mt-auto mb-2">
                      <div className="flex justify-between px-2 mb-2">
                          <div className="w-8 h-6 md:w-10 md:h-8 bg-zinc-200 rounded opacity-80"></div>
                          <Skull className="text-red-700 w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="text-lg md:text-xl font-mono text-red-50 tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-2">
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
      <section id="Тарифы" className="py-16 md:py-24 bg-black border-y border-zinc-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl md:text-6xl font-black mb-12 md:mb-16 uppercase text-white">
            Самые Ужасные <span className="text-red-500">Тарифы</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tariff 1 */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl relative hover:border-zinc-500 transition-colors group">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-zinc-700 px-4 py-1 rounded-full text-xs font-mono uppercase">Старт (Плохо)</div>
              <h3 className="text-2xl font-black text-center mb-4">Бомж-Пакет</h3>
              <div className="text-4xl font-black text-center mb-8 font-mono">0₽ <span className="text-sm font-normal text-zinc-500">/ вдох</span></div>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li className="flex gap-2"><X className="text-red-500 w-4 h-4 flex-shrink-0" /> <span>Нет поддержки</span></li>
                <li className="flex gap-2"><Lock className="text-red-500 w-4 h-4 flex-shrink-0" /> <span>Блокировка счёта раз в неделю</span></li>
                <li className="flex gap-2"><Eye className="text-green-500 w-4 h-4 flex-shrink-0" /> <span>Мы следим за вами</span></li>
              </ul>
              <button className="w-full mt-8 py-3 border border-zinc-600 text-white font-bold uppercase hover:bg-white hover:text-black transition-colors">Выбрать боль</button>
            </div>

            {/* Tariff 2 */}
            <div className="bg-zinc-900 border-2 border-yellow-500 p-6 md:p-8 rounded-2xl relative transform md:scale-105 shadow-[0_0_30px_-10px_rgba(234,179,8,0.3)] z-10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase">Хит (Ужасно)</div>
              <h3 className="text-2xl font-black text-center mb-4 text-yellow-500">Лох-Премиум</h3>
              <div className="text-4xl font-black text-center mb-8 font-mono">999₽ <span className="text-sm font-normal text-zinc-500">/ сек</span></div>
              <ul className="space-y-4 text-sm text-zinc-300">
                <li className="flex gap-2"><AlertTriangle className="text-yellow-500 w-4 h-4 flex-shrink-0" /> <span>Кредит без вашего ведома</span></li>
                <li className="flex gap-2"><AlertTriangle className="text-yellow-500 w-4 h-4 flex-shrink-0" /> <span>Личный хам-менеджер</span></li>
                <li className="flex gap-2"><AlertTriangle className="text-yellow-500 w-4 h-4 flex-shrink-0" /> <span>Смс с угрозами (бесплатно)</span></li>
              </ul>
              <button className="w-full mt-8 py-3 bg-yellow-500 text-black font-bold uppercase hover:bg-yellow-400 transition-colors shadow-lg">Стать жертвой</button>
            </div>

            {/* Tariff 3 (Rick Roll) */}
            <div className="bg-zinc-900 border border-purple-900 p-6 md:p-8 rounded-2xl relative hover:border-purple-600 transition-colors group cursor-pointer" onClick={() => setShowRickRoll(true)}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-900 px-4 py-1 rounded-full text-xs font-mono uppercase animate-pulse">VIP (Божественно)</div>
              <h3 className="text-2xl font-black text-center mb-4 text-purple-500">Бесконечное Счастье</h3>
              <div className="text-4xl font-black text-center mb-8 font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Бесплатно</div>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li className="flex gap-2"><Music className="text-purple-500 w-4 h-4 flex-shrink-0" /> <span>Вечная музыка</span></li>
                <li className="flex gap-2"><Play className="text-purple-500 w-4 h-4 flex-shrink-0" /> <span>Эксклюзивный контент</span></li>
                <li className="flex gap-2"><Zap className="text-purple-500 w-4 h-4 flex-shrink-0" /> <span>Вы никогда не откажетесь</span></li>
              </ul>
              <button className="w-full mt-8 py-3 border border-purple-900 text-purple-500 font-bold uppercase hover:bg-purple-900 hover:text-white transition-colors">
                Получить Всё
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rick Roll Modal */}
      {showRickRoll && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white z-50 p-2 bg-zinc-800 rounded-full" 
            onClick={() => setShowRickRoll(false)}
          >
            <X size={24} />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black shadow-2xl border border-zinc-800 rounded-2xl overflow-hidden relative">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/iik25wqIuFo?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-8 text-center animate-bounce">
            <h2 className="text-3xl md:text-5xl font-black text-purple-500 uppercase">Поздравляем!</h2>
            <p className="text-zinc-400 mt-2">Вы выбрали лучший тариф. Наслаждайтесь.</p>
          </div>
        </div>
      )}

      {/* Team Section */}
      <section id="Команда" className="py-16 md:py-24 bg-zinc-950 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-5xl font-black mb-12 md:mb-16 uppercase">
            Руководство <span className="text-purple-500">Банка</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
            {teamMembers.map((member, i) => (
               <div 
                 key={i} 
                 className="group relative flex flex-col items-center"
               >
                  <div className={`w-28 h-28 md:w-48 md:h-48 mx-auto ${member.color} rounded-full flex items-center justify-center mb-6 shadow-xl transform group-hover:scale-105 transition-transform duration-300 overflow-hidden border-4 border-zinc-800 group-hover:border-white cursor-pointer`} onClick={() => setSelectedMember(member)}>
                     {member.img ? (
                       <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                     ) : (
                       <User size={48} className="opacity-50 md:w-16 md:h-16" />
                     )}
                  </div>
                  <h3 className="font-bold text-base md:text-xl uppercase group-hover:text-purple-400 transition-colors">{member.name}</h3>
                  <div className="text-[10px] md:text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wide">{member.role}</div>
                  <p className="text-[10px] md:text-sm text-zinc-500 italic truncate px-2 mb-4 w-full">"{member.desc}"</p>
                  
                  <button 
                    onClick={() => setSelectedMember(member)}
                    className="mt-auto px-4 py-2 border border-zinc-700 text-zinc-300 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded"
                  >
                    Подробнее
                  </button>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setSelectedMember(null)}>
          <div className="bg-zinc-900 border border-zinc-700 max-w-lg w-full p-8 md:p-12 rounded-2xl relative shadow-2xl flex flex-col items-center text-center transform scale-100 transition-all" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-zinc-500 hover:text-white p-2" onClick={() => setSelectedMember(null)}>
              <X size={32} />
            </button>
            
            <div className={`w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden mb-8 border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]`}>
              {selectedMember.img ? (
                <img src={selectedMember.img} alt={selectedMember.name} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full ${selectedMember.color} flex items-center justify-center`}>
                   <User size={64} />
                </div>
              )}
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black uppercase mb-2 tracking-tight">{selectedMember.name}</h3>
            <div className="text-purple-400 font-mono text-sm md:text-base uppercase mb-8 tracking-widest border-b border-zinc-800 pb-4 w-full">{selectedMember.role}</div>
            
            <p className="text-zinc-300 leading-relaxed text-lg md:text-xl font-light">
              {selectedMember.fullDesc}
            </p>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-6 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-5xl font-black mb-12 md:mb-16">
            ЧТО ГОВОРЯТ <span className="text-cyan-400">ЖЕРТВЫ</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {reviewsToDisplay.map((review, i) => (
              <div key={i} className="bg-zinc-950 p-6 md:p-8 border border-zinc-800 relative hover:border-cyan-500 transition-colors group flex flex-col">
                 {/* Decorative Dots */}
                 <div className="flex gap-1 mb-6">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 </div>
                 
                 <p className="text-zinc-300 mb-8 leading-relaxed italic flex-grow text-sm md:text-base">"{review.text}"</p>
                 
                 <div className="flex items-center gap-4 mt-auto pt-4 border-t border-zinc-900">
                    <div className="w-10 h-10 flex-shrink-0 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-cyan-500 uppercase">
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
              className="px-8 py-3 border border-zinc-600 hover:border-white text-zinc-300 hover:text-white transition-all uppercase text-sm font-bold tracking-widest"
            >
               {showAllReviews ? "Свернуть Страдания" : "Ещё Больше Отзывов"}
            </button>
          </div>
        </div>
      </section>

      {/* Unique Commission Section */}
      <section className="py-16 md:py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-12 items-center">
           <div className="flex-1 w-full">
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-center md:text-left">Уникальная Комиссия</h2>
              <p className="text-blue-200 text-base md:text-lg mb-8 text-center md:text-left">
                Мы рады представить вам уникальное предложение по комиссиям, 
                специально подобранное для уничтожения вашего счёта.
              </p>
              <div className="space-y-4">
                 <div className="bg-white/10 p-4 rounded-lg flex justify-between items-center backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors cursor-help">
                    <span className="font-bold text-sm md:text-base">Комиссия за просмотр баланса</span>
                    <div className="text-xs md:text-sm font-mono opacity-70">100₽ / взгяд</div>
                 </div>
                 <div className="bg-white/10 p-4 rounded-lg flex justify-between items-center backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors cursor-help">
                    <span className="font-bold text-sm md:text-base">Комиссия за смену пароля</span>
                    <div className="text-xs md:text-sm font-mono opacity-70">500₽ + Душа</div>
                 </div>
                 <div className="bg-white/10 p-4 rounded-lg flex justify-between items-center backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors cursor-help">
                    <span className="font-bold text-sm md:text-base">Комиссия за существование</span>
                    <div className="text-xs md:text-sm font-mono opacity-70">Бесценно</div>
                 </div>
              </div>
           </div>
           
           <div className="flex-1 flex justify-center">
              <div className="w-56 h-56 md:w-64 md:h-64 bg-blue-800 rounded-full flex items-center justify-center relative animate-spin-slow">
                 <div className="absolute inset-0 border-4 border-dashed border-blue-400 rounded-full animate-[spin_10s_linear_infinite]"></div>
                 <div className="text-center transform -rotate-12">
                    <div className="text-5xl md:text-6xl font-black">146%</div>
                    <div className="text-lg md:text-xl font-mono uppercase">APR</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-cyan-900 rounded flex items-center justify-center font-mono font-bold text-cyan-400">У</div>
               <span className="font-bold text-zinc-500">УРК БАНК &copy; 2024</span>
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
