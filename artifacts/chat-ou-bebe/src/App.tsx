import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RefreshCcw, Home } from 'lucide-react';
import Confetti from './components/Confetti';

const CATEGORIES = {
  chatBebe: {
    id: 'chat-bebe',
    title: 'Chat ou Bébé ?',
    subtitle: 'Félins ou humains ?',
    emoji: '🐱👶',
    optionA: { label: 'Chat', emoji: '🐱', key: 'chat' as const },
    optionB: { label: 'Bébé', emoji: '👶', key: 'bebe' as const },
    folder: 'chat-bebe',
    questions: [
      { file: 'sound_01.mp3', answer: 'chat', hint: "Ce miaulement plaintif comme un 'mama'..." },
      { file: 'sound_02.mp3', answer: 'bebe', hint: "Ce cri fin et aigu..." },
      { file: 'sound_03.mp3', answer: 'chat', hint: "Ce hurlement de nuit déchirant..." },
      { file: 'sound_04.mp3', answer: 'bebe', hint: "Ces roucoulements si doux..." },
      { file: 'sound_05.mp3', answer: 'chat', hint: "Ce petit miaulement si fragile..." },
      { file: 'sound_06.mp3', answer: 'bebe', hint: "Ces gémissements plaintifs..." },
      { file: 'sound_07.mp3', answer: 'chat', hint: "Ces trilles staccato rapides..." },
      { file: 'sound_08.mp3', answer: 'bebe', hint: "Ces petits rires perlés..." },
      { file: 'sound_09.mp3', answer: 'chat', hint: "Ces miaulements répétés et exigeants..." },
      { file: 'sound_10.mp3', answer: 'bebe', hint: "Ces 'maaaaa' insistants..." },
      { file: 'sound_11.mp3', answer: 'chat', hint: "Ce grattage discret à la porte..." },
      { file: 'sound_12.mp3', answer: 'bebe', hint: "Ces babillages consonantiques..." },
      { file: 'sound_13.mp3', answer: 'chat', hint: "Ce 'nooon' miaoulé..." },
      { file: 'sound_14.mp3', answer: 'bebe', hint: "Ce cri bref et surpris..." },
      { file: 'sound_15.mp3', answer: 'chat', hint: "Ces cliquetis excités face à la fenêtre..." },
      { file: 'sound_16.mp3', answer: 'bebe', hint: "Ces vocalises mélodieuses..." },
      { file: 'sound_17.mp3', answer: 'chat', hint: "Ce mrrrp de bienvenue..." },
      { file: 'sound_18.mp3', answer: 'bebe', hint: "Ces plaintes de faim répétées..." },
      { file: 'sound_19.mp3', answer: 'chat', hint: "Ces appels désespérés à son humain..." },
      { file: 'sound_20.mp3', answer: 'bebe', hint: "Ces cris de joie stridents..." },
      { file: 'sound_21.mp3', answer: 'chat', hint: "Ce hurlement nocturne dramatique..." },
      { file: 'sound_22.mp3', answer: 'bebe', hint: "Ce fredonnement satisfait..." },
      { file: 'sound_23.mp3', answer: 'chat', hint: "Ce tout petit miaou interrogatif..." },
      { file: 'sound_24.mp3', answer: 'bebe', hint: "Ces pleurs rythmés..." },
      { file: 'sound_25.mp3', answer: 'chat', hint: "Ces miaous pour réveiller le maître..." },
      { file: 'sound_26.mp3', answer: 'bebe', hint: "Ces sons interrogatifs montants..." },
      { file: 'sound_27.mp3', answer: 'chat', hint: "Cette plainte interminable et plaintive..." },
      { file: 'sound_28.mp3', answer: 'bebe', hint: "Ce cri de protestation unique..." },
      { file: 'sound_29.mp3', answer: 'chat', hint: "Ce claquement de dents devant une proie..." },
      { file: 'sound_30.mp3', answer: 'bebe', hint: "Ces rires aigus et perlés..." },
      { file: 'sound_31.mp3', answer: 'chat', hint: "Ce hurlement chez le vétérinaire..." },
      { file: 'sound_32.mp3', answer: 'bebe', hint: "Ces pleurs endormis..." },
      { file: 'sound_33.mp3', answer: 'chat', hint: "Ces miaous réclamant la gamelle..." },
      { file: 'sound_34.mp3', answer: 'bebe', hint: "Ces petits bruits de nez..." },
      { file: 'sound_35.mp3', answer: 'chat', hint: "Ce grognement mécontent..." },
      { file: 'sound_36.mp3', answer: 'bebe', hint: "Ce cri de surprise soudain..." },
      { file: 'sound_37.mp3', answer: 'chat', hint: "Ce tout mini miaou à peine audible..." },
      { file: 'sound_38.mp3', answer: 'bebe', hint: "Ces petits bruits de tétée..." },
      { file: 'sound_39.mp3', answer: 'chat', hint: "Ces miaous autoritaires et insistants..." },
      { file: 'sound_40.mp3', answer: 'bebe', hint: "Ces plaintes d'impatience..." },
      { file: 'sound_41.mp3', answer: 'chat', hint: "Ce ronron-miaou hybride satisfait..." },
      { file: 'sound_42.mp3', answer: 'bebe', hint: "Ces explorations vocales mélodieuses..." },
      { file: 'sound_43.mp3', answer: 'chat', hint: "Ce sifflement qui monte en cri..." },
      { file: 'sound_44.mp3', answer: 'bebe', hint: "Ces gémissements doux et répétés..." },
      { file: 'sound_45.mp3', answer: 'chat', hint: "Ce miaou en chuchotement..." },
      { file: 'sound_46.mp3', answer: 'bebe', hint: "Ces sons d'excitation en staccato..." },
      { file: 'sound_47.mp3', answer: 'chat', hint: "Ces mew-mew-mew rapides en rafale..." },
      { file: 'sound_48.mp3', answer: 'bebe', hint: "Ce pleur long et soutenu..." },
      { file: 'sound_49.mp3', answer: 'chat', hint: "Ce miaou solitaire et mélancolique..." },
      { file: 'sound_50.mp3', answer: 'bebe', hint: "Ces pétarades labiales espiègle..." },
    ],
  },
  ronflementMoteur: {
    id: 'ronflement-moteur',
    title: 'Ronflement ou Moteur ?',
    subtitle: 'Mécanique ou humain ?',
    emoji: '😴🔧',
    optionA: { label: 'Ronflement', emoji: '😴', key: 'ronflement' as const },
    optionB: { label: 'Moteur', emoji: '🔧', key: 'moteur' as const },
    folder: 'ronflement-moteur',
    questions: [
      { file: 'sound_01.mp3', answer: 'ronflement', hint: "Ce ronronnement humain profond et régulier..." },
      { file: 'sound_02.mp3', answer: 'moteur', hint: "Ce grondement mécanique qui tourne en régime..." },
      { file: 'sound_03.mp3', answer: 'ronflement', hint: "Cette respiration saccadée et hoquetante..." },
      { file: 'sound_04.mp3', answer: 'moteur', hint: "Ce pétaradement rythmé qui se stabilise..." },
      { file: 'sound_05.mp3', answer: 'ronflement', hint: "Ce grondement grave qui fait vibrer le lit..." },
      { file: 'sound_06.mp3', answer: 'moteur', hint: "Ce ronronnement régulier sous le capot..." },
      { file: 'sound_07.mp3', answer: 'ronflement', hint: "Ces pauses et redémarrages irréguliers..." },
      { file: 'sound_08.mp3', answer: 'moteur', hint: "Ce démarrage laborieux avant de trouver son rythme..." },
      { file: 'sound_09.mp3', answer: 'ronflement', hint: "Ce sifflement nasal aigu et continu..." },
      { file: 'sound_10.mp3', answer: 'moteur', hint: "Ce bourdonnement stable et infatigable..." },
      { file: 'sound_11.mp3', answer: 'ronflement', hint: "Ce rugissement nocturne qui traverse les murs..." },
      { file: 'sound_12.mp3', answer: 'moteur', hint: "Ce démarrage progressif qui monte en puissance..." },
      { file: 'sound_13.mp3', answer: 'ronflement', hint: "Ce léger ronflement paisible comme une berceuse..." },
      { file: 'sound_14.mp3', answer: 'moteur', hint: "Ce grondement diesel profond et régulier..." },
      { file: 'sound_15.mp3', answer: 'ronflement', hint: "Ces renifle-ronfle avec petits soubresauts..." },
      { file: 'sound_16.mp3', answer: 'moteur', hint: "Ce clapotement lent et cadencé..." },
      { file: 'sound_17.mp3', answer: 'ronflement', hint: "Ce ronflement titanesque qui remplit la pièce..." },
      { file: 'sound_18.mp3', answer: 'moteur', hint: "Ce souffle mécanique régulier et puissant..." },
      { file: 'sound_19.mp3', answer: 'ronflement', hint: "Cette respiration rapide et superficielle..." },
      { file: 'sound_20.mp3', answer: 'moteur', hint: "Ce grondement avec ses à-coups rythmiques..." },
      { file: 'sound_21.mp3', answer: 'ronflement', hint: "Ces vagues de ronflement croissant et décroissant..." },
      { file: 'sound_22.mp3', answer: 'moteur', hint: "Ce pétaradement saccadé au ralenti..." },
      { file: 'sound_23.mp3', answer: 'ronflement', hint: "Ce ronflement sifflant comme de l'air dans un tuyau..." },
      { file: 'sound_24.mp3', answer: 'moteur', hint: "Ce moteur capricieux qui rate de temps en temps..." },
      { file: 'sound_25.mp3', answer: 'ronflement', hint: "Ce concert de ronflement monumental..." },
      { file: 'sound_26.mp3', answer: 'moteur', hint: "Ce poum-poum lent et puissant..." },
      { file: 'sound_27.mp3', answer: 'ronflement', hint: "Ces interruptions avec raclements de gorge..." },
      { file: 'sound_28.mp3', answer: 'moteur', hint: "Ce petit cliquetis léger et régulier..." },
      { file: 'sound_29.mp3', answer: 'ronflement', hint: "Ce vrombissement vibrant dans les os..." },
      { file: 'sound_30.mp3', answer: 'moteur', hint: "Ce ronronnement mécanique constant et rassurant..." },
      { file: 'sound_31.mp3', answer: 'ronflement', hint: "Cette respiration profonde façon générateur..." },
      { file: 'sound_32.mp3', answer: 'moteur', hint: "Ce pétillement léger et rapide..." },
      { file: 'sound_33.mp3', answer: 'ronflement', hint: "Ce ronflement humide aux harmoniques étranges..." },
      { file: 'sound_34.mp3', answer: 'moteur', hint: "Ce grondement massif de géant mécanique..." },
      { file: 'sound_35.mp3', answer: 'ronflement', hint: "Ce ronflement à son paroxysme absolu..." },
      { file: 'sound_36.mp3', answer: 'moteur', hint: "Ce bourdonnement précis et inlassable..." },
      { file: 'sound_37.mp3', answer: 'ronflement', hint: "Ce ronflement doux et régulier comme une horloge..." },
      { file: 'sound_38.mp3', answer: 'moteur', hint: "Ce sifflement nasillard continu..." },
      { file: 'sound_39.mp3', answer: 'ronflement', hint: "Ces vibrations gutturales comme des pièces qui s'entrechoquent..." },
      { file: 'sound_40.mp3', answer: 'moteur', hint: "Ce battement lent sur l'eau..." },
      { file: 'sound_41.mp3', answer: 'ronflement', hint: "Ce ronflement en mode haute-intensité..." },
      { file: 'sound_42.mp3', answer: 'moteur', hint: "Ce pompage régulier et monotone..." },
      { file: 'sound_43.mp3', answer: 'ronflement', hint: "Ce ronflement oscillant entre graves et aigus..." },
      { file: 'sound_44.mp3', answer: 'moteur', hint: "Ce tambourinement circulaire et régulier..." },
      { file: 'sound_45.mp3', answer: 'ronflement', hint: "Ces crescendos suivis de silences inquiétants..." },
      { file: 'sound_46.mp3', answer: 'moteur', hint: "Ce pétaradement vintage aux ratés charmants..." },
      { file: 'sound_47.mp3', answer: 'ronflement', hint: "Ce grommellement grave et sourd..." },
      { file: 'sound_48.mp3', answer: 'moteur', hint: "Ce souffle mécanique régulier de fond..." },
      { file: 'sound_49.mp3', answer: 'ronflement', hint: "Ce délire respiratoire syncopé..." },
      { file: 'sound_50.mp3', answer: 'moteur', hint: "Ce ronronnement aérien régulier..." },
    ],
  },
};

const MESSAGES = {
  chatBebe: {
    correctA: [
      "Bien joué ! C'était bien un chat 🐱",
      "Vos oreilles sont fines !",
      "Félin identifié avec succès ! 🐾"
    ],
    correctB: [
      "Bravo ! Ce bébé ne vous a pas eu 👶",
      "Impressionnant !",
      "L'instinct parental ne trompe pas !"
    ],
    wrongThoughtA: [
      "Raté ! Ce bébé a l'âme d'un chat",
      "Il fallait adopter ce bébé, pas l'appeler félin !",
      "C'était un humain ! Dommage 😂"
    ],
    wrongThoughtB: [
      "Piégé(e) ! Ce chat pleure comme un bébé 😂",
      "Ce matou mérite un Oscar !",
      "Un vrai manipulateur ce chat !"
    ]
  },
  ronflementMoteur: {
    correctA: [
      "Bien joué ! C'était du ronflement humain 😴", 
      "Vos oreilles percent les murs !"
    ],
    correctB: [
      "Exact ! C'était un vrai moteur 🔧", 
      "Vous êtes un(e) mécano de l'oreille !"
    ],
    wrongThoughtA: [
      "Raté ! Ce moteur ronflait comme un humain 😂", 
      "Cette machine devrait consulter un médecin du sommeil !"
    ],
    wrongThoughtB: [
      "Piégé(e) ! Ce ronflement était digne d'un moteur 😂", 
      "Cet humain devrait faire réviser ses voies respiratoires !"
    ]
  }
};

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

type AppState = 'menu' | 'config' | 'playing' | 'revealed' | 'end';
type CategoryKey = keyof typeof CATEGORIES;

function App() {
  const [appState, setAppState] = useState<AppState>('menu');
  const [selectedCatKey, setSelectedCatKey] = useState<CategoryKey>('chatBebe');
  const [soundCount, setSoundCount] = useState(10);

  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastGuess, setLastGuess] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startGame = () => {
    const catQuestions = CATEGORIES[selectedCatKey].questions;
    const shuffled = shuffleArray(catQuestions).slice(0, soundCount);
    setShuffledQuestions(shuffled);
    setScore(0);
    setCurrentRound(0);
    setAppState('playing');
    setLastGuess(null);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const playAudio = () => {
    stopAudio();
    const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
    const category = CATEGORIES[selectedCatKey];
    const currentQ = shuffledQuestions[currentRound];
    const audio = new Audio(`${BASE}/sounds/${category.folder}/${currentQ.file}`);
    
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      console.error("Audio playback failed");
      setIsPlaying(false);
    };
    
    audioRef.current = audio;
    
    audio.play().catch(e => {
      console.error(e);
      setIsPlaying(false);
    });
    setIsPlaying(true);
  };

  useEffect(() => {
    return () => stopAudio();
  }, [appState, currentRound]);

  const handleGuess = (guess: string) => {
    stopAudio();
    setLastGuess(guess);
    const currentQ = shuffledQuestions[currentRound];
    if (guess === currentQ.answer) {
      setScore(s => s + 1);
    }
    setAppState('revealed');
  };

  const nextRound = () => {
    if (currentRound < soundCount - 1) {
      setCurrentRound(r => r + 1);
      setAppState('playing');
      setLastGuess(null);
    } else {
      setAppState('end');
    }
  };

  const getScoreMessage = (score: number, total: number) => {
    const pct = score / total;
    if (pct >= 0.9) return "Parfait ! Vous maîtrisez l'art de l'écoute 👑";
    if (pct >= 0.7) return "Très bien ! Vos oreilles valent de l'or 🥇";
    if (pct >= 0.5) return "Pas mal ! Mais vous pouvez faire mieux 😅";
    return "Catastrophique ! Il va falloir s'entraîner un peu 😂";
  };

  const getRandomMessage = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const getRevealMessage = () => {
    const currentQ = shuffledQuestions[currentRound];
    const isCorrect = lastGuess === currentQ.answer;
    const catMessages = MESSAGES[selectedCatKey];
    const category = CATEGORIES[selectedCatKey];
    
    if (isCorrect) {
      return currentQ.answer === category.optionA.key 
        ? getRandomMessage(catMessages.correctA)
        : getRandomMessage(catMessages.correctB);
    } else {
      return currentQ.answer === category.optionA.key
        ? getRandomMessage(catMessages.wrongThoughtB)
        : getRandomMessage(catMessages.wrongThoughtA);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <AnimatePresence mode="wait">
        
        {/* MAIN MENU */}
        {appState === 'menu' && (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="flex flex-col items-center max-w-4xl w-full gap-12"
          >
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight leading-tight text-foreground">
                Quel est<br/>ce son ?
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Choisissez votre défi auditif.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4">
              {(Object.entries(CATEGORIES) as [CategoryKey, typeof CATEGORIES[CategoryKey]][]).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => { setSelectedCatKey(key); setAppState('config'); }}
                  className={`relative p-8 rounded-[2.5rem] bubbly-shadow transition-all group flex flex-col items-center gap-4 ${
                    key === 'chatBebe' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <div className="text-7xl md:text-8xl group-hover:scale-110 transition-transform duration-300 ease-out mb-2">
                    {cat.emoji}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">{cat.title}</h2>
                  <p className="text-lg md:text-xl opacity-90">{cat.subtitle}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* CONFIG SCREEN */}
        {appState === 'config' && (
          <motion.div 
            key="config"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-card text-card-foreground border-4 border-card-border p-8 md:p-12 rounded-[3rem] w-full max-w-md flex flex-col items-center gap-10 shadow-xl"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-6xl mb-2">{CATEGORIES[selectedCatKey].emoji}</div>
              <h2 className="text-3xl md:text-4xl font-bold">{CATEGORIES[selectedCatKey].title}</h2>
            </div>
            
            <div className="w-full flex flex-col gap-6 items-center bg-background/50 p-6 rounded-3xl border-2 border-border">
              <label className="text-lg font-bold text-muted-foreground uppercase tracking-widest">Combien de sons ?</label>
              <div className="text-7xl font-black text-primary drop-shadow-sm">{soundCount}</div>
              
              <div className="w-full mt-2">
                <input 
                  type="range" 
                  min={5} max={50} step={5}
                  value={soundCount}
                  onChange={(e) => setSoundCount(Number(e.target.value))}
                  className="w-full h-4 bg-muted rounded-full appearance-none cursor-pointer accent-primary outline-none focus:ring-4 focus:ring-primary/20"
                />
                <div className="flex justify-between w-full text-muted-foreground font-bold mt-3 text-lg">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-4 mt-2">
              <button 
                onClick={startGame}
                className="bg-foreground text-background text-2xl font-bold px-12 py-6 rounded-[2rem] bubbly-shadow transition-all w-full flex items-center justify-center gap-3 hover:opacity-90"
              >
                <Play size={28} className="fill-current" />
                Jouer !
              </button>
              <button 
                onClick={() => setAppState('menu')}
                className="text-muted-foreground font-bold text-xl py-4 hover:text-foreground transition-colors"
              >
                Retour au menu
              </button>
            </div>
          </motion.div>
        )}

        {/* PLAYING SCREEN */}
        {appState === 'playing' && (() => {
          const category = CATEGORIES[selectedCatKey];
          return (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center max-w-md w-full h-full justify-between py-8 gap-8"
            >
              <div className="w-full flex justify-between items-center px-4">
                <div className="bg-muted px-5 py-2.5 rounded-full font-bold text-muted-foreground text-lg border-2 border-border">
                  Tour {currentRound + 1}/{soundCount}
                </div>
                <div className="bg-accent text-accent-foreground px-5 py-2.5 rounded-full font-bold text-lg shadow-sm">
                  Score: {score}
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center w-full gap-12 my-8">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={isPlaying ? stopAudio : playAudio}
                  className="w-56 h-56 rounded-full bg-foreground text-background flex items-center justify-center relative shadow-xl overflow-hidden group border-4 border-foreground/10"
                >
                  {isPlaying && (
                    <motion.div 
                      className="absolute inset-0 bg-primary/20"
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    {isPlaying ? (
                      <div className="flex items-center gap-1.5 h-16">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2.5 bg-current rounded-full"
                            animate={{ height: ["20%", "100%", "20%"] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              delay: i * 0.1,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <Play size={64} className="fill-current translate-x-2" />
                    )}
                    <span className="text-xl font-bold mt-2">
                      {isPlaying ? 'Arrêter' : 'Écouter le son'}
                    </span>
                  </div>
                </motion.button>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 px-4">
                <button 
                  onClick={() => handleGuess(category.optionA.key)}
                  className="bg-secondary text-secondary-foreground text-xl md:text-2xl font-bold p-6 md:p-8 rounded-[2rem] bubbly-shadow transition-all flex flex-col items-center gap-3 hover:brightness-110"
                >
                  <span className="text-5xl md:text-6xl mb-1">{category.optionA.emoji}</span>
                  <span>{category.optionA.label}</span>
                </button>
                
                <button 
                  onClick={() => handleGuess(category.optionB.key)}
                  className="bg-primary text-primary-foreground text-xl md:text-2xl font-bold p-6 md:p-8 rounded-[2rem] bubbly-shadow transition-all flex flex-col items-center gap-3 hover:brightness-110"
                >
                  <span className="text-5xl md:text-6xl mb-1">{category.optionB.emoji}</span>
                  <span>{category.optionB.label}</span>
                </button>
              </div>
            </motion.div>
          );
        })()}

        {/* REVEAL SCREEN */}
        {appState === 'revealed' && (() => {
          const category = CATEGORIES[selectedCatKey];
          const currentQ = shuffledQuestions[currentRound];
          const isCorrect = lastGuess === currentQ.answer;
          
          return (
            <motion.div 
              key="revealed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isCorrect ? 
                { opacity: 1, scale: 1 } : 
                { opacity: 1, scale: 1, x: [-10, 10, -10, 10, 0] }
              }
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center max-w-md w-full gap-8 px-4"
            >
              {isCorrect && <Confetti />}

              <motion.div 
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className={`w-40 h-40 rounded-full flex items-center justify-center text-7xl shadow-2xl border-4 ${
                  isCorrect ? 'bg-green-400 border-green-300' : 'bg-red-400 border-red-300'
                }`}
              >
                {isCorrect ? '✅' : '❌'}
              </motion.div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  C'était {currentQ.answer === category.optionA.key 
                    ? `un ${category.optionA.label} ${category.optionA.emoji}` 
                    : `un ${category.optionB.label} ${category.optionB.emoji}`} !
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-8">
                  {getRevealMessage()}
                </p>
                
                <div className="bg-card border-4 border-card-border p-8 rounded-[2rem] shadow-sm relative mt-8">
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-card px-6 py-2 text-sm font-bold uppercase tracking-widest rounded-full border-4 border-card-border text-muted-foreground">
                    L'indice
                  </span>
                  <p className="italic text-xl text-foreground font-medium">
                    "{currentQ.hint}"
                  </p>
                </div>
              </div>

              <button 
                onClick={nextRound}
                className="mt-4 bg-foreground text-background text-2xl font-bold px-12 py-6 rounded-[2rem] bubbly-shadow transition-all w-full hover:opacity-90"
              >
                {currentRound < soundCount - 1 ? 'Son suivant' : 'Voir les résultats'}
              </button>
            </motion.div>
          );
        })()}

        {/* END SCREEN */}
        {appState === 'end' && (() => {
          const ratio = score / soundCount;
          return (
            <motion.div 
              key="end"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center max-w-md w-full gap-10 px-4 py-8"
            >
              {ratio >= 0.5 && <Confetti duration={5000} />}
              
              <h1 className="text-5xl font-bold tracking-tight">Résultat final</h1>
              
              <div className="relative mt-4">
                <svg className="w-56 h-56 transform -rotate-90 drop-shadow-xl">
                  <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="20" fill="transparent" className="text-muted" />
                  <motion.circle 
                    cx="112" cy="112" r="100" 
                    stroke="currentColor" 
                    strokeWidth="20" 
                    fill="transparent"
                    className={ratio >= 0.7 ? 'text-green-500' : ratio >= 0.5 ? 'text-accent' : 'text-destructive'}
                    strokeDasharray="628.31"
                    initial={{ strokeDashoffset: 628.31 }}
                    animate={{ strokeDashoffset: 628.31 - (628.31 * ratio) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black text-foreground tracking-tighter">{score}</span>
                  <span className="text-2xl font-bold text-muted-foreground border-t-4 border-muted-foreground/20 pt-1 mt-1">/ {soundCount}</span>
                </div>
              </div>

              <p className="text-2xl md:text-3xl font-bold px-4 leading-tight">
                {getScoreMessage(score, soundCount)}
              </p>

              <div className="flex flex-col w-full gap-4 mt-6">
                <button 
                  onClick={startGame}
                  className="flex items-center justify-center gap-3 bg-primary text-primary-foreground text-2xl font-bold px-12 py-6 rounded-[2rem] bubbly-shadow transition-all w-full hover:brightness-110"
                >
                  <RefreshCcw size={28} />
                  Rejouer
                </button>
                <button 
                  onClick={() => setAppState('menu')}
                  className="flex items-center justify-center gap-3 bg-card border-4 border-card-border text-card-foreground text-xl font-bold px-12 py-5 rounded-[2rem] bubbly-shadow transition-all w-full hover:bg-muted"
                >
                  <Home size={24} />
                  Menu principal
                </button>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

export default App;
