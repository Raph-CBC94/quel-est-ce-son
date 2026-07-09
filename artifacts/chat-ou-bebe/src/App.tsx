import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, Square, RefreshCcw } from 'lucide-react';
import Confetti from './components/Confetti';

const questions = [
  { file: "sound_01.mp3", answer: "chat",  hint: "Ce miaulement plaintif qui ressemble à 'mama'..." },
  { file: "sound_02.mp3", answer: "bebe",  hint: "Ce cri fin et aigu..." },
  { file: "sound_03.mp3", answer: "chat",  hint: "Ce hurlement de nuit déchirant..." },
  { file: "sound_04.mp3", answer: "bebe",  hint: "Ces roucoulements si doux..." },
  { file: "sound_05.mp3", answer: "chat",  hint: "Ce petit miaulement si fragile..." },
  { file: "sound_06.mp3", answer: "bebe",  hint: "Ces gémissements plaintifs..." },
  { file: "sound_07.mp3", answer: "chat",  hint: "Ces trilles staccato rapides..." },
  { file: "sound_08.mp3", answer: "bebe",  hint: "Ces petits rires perlés..." },
  { file: "sound_09.mp3", answer: "chat",  hint: "Ces miaulements répétés et exigeants..." },
  { file: "sound_10.mp3", answer: "bebe",  hint: "Ces 'maaaaa' insistants..." },
];

const correctChatMessages = [
  "Bien joué ! C'était bien un chat 🐱",
  "Vos oreilles sont fines !",
  "Félin identifié avec succès ! 🐾"
];

const correctBebeMessages = [
  "Bravo ! Ce bébé ne vous a pas eu 👶",
  "Impressionnant !",
  "L'instinct parental ne trompe pas !"
];

const wrongThoughtChatMessages = [
  "Raté ! Ce bébé a l'âme d'un chat",
  "Il fallait adopter ce bébé, pas l'appeler félin !",
  "C'était un humain ! Dommage 😂"
];

const wrongThoughtBebeMessages = [
  "Piégé(e) ! Ce chat pleure comme un bébé 😂",
  "Ce matou mérite un Oscar !",
  "Un vrai manipulateur ce chat !"
];

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

type GameState = 'start' | 'playing' | 'revealed' | 'end';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastGuess, setLastGuess] = useState<'chat' | 'bebe' | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startGame = () => {
    setShuffledQuestions(shuffleArray(questions));
    setScore(0);
    setCurrentRound(0);
    setGameState('playing');
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
    const currentQ = shuffledQuestions[currentRound];
    const audio = new Audio(`${BASE}/sounds/${currentQ.file}`);
    
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      console.error("Audio playback failed");
      setIsPlaying(false);
    };
    
    audioRef.current = audio;
    
    // Catch promise to avoid uncaught exceptions if play fails
    audio.play().catch(e => {
      console.error(e);
      setIsPlaying(false);
    });
    setIsPlaying(true);
  };

  useEffect(() => {
    // Cleanup audio on unmount or when leaving playing state
    return () => {
      stopAudio();
    };
  }, []);

  const handleGuess = (guess: 'chat' | 'bebe') => {
    stopAudio();
    setLastGuess(guess);
    const currentQ = shuffledQuestions[currentRound];
    if (guess === currentQ.answer) {
      setScore(s => s + 1);
    }
    setGameState('revealed');
  };

  const nextRound = () => {
    if (currentRound < 9) {
      setCurrentRound(r => r + 1);
      setGameState('playing');
      setLastGuess(null);
    } else {
      setGameState('end');
    }
  };

  const getScoreMessage = () => {
    if (score === 10) return "Parfait ! Vous êtes le/la Maître(sse) Chat-Bébé 👑";
    if (score >= 8) return "Excellent ! Vos oreilles valent de l'or 🥇";
    if (score >= 6) return "Pas mal ! Vous avez le niveau 'parent de chat' 🐱";
    if (score >= 4) return "Moyen... Ce chat et ce bébé vous ont bien eu 😅";
    return "Catastrophique ! Allez adopter un chat ET un bébé pour vous entraîner 😂";
  };

  const getRandomMessage = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const getRevealMessage = () => {
    const currentQ = shuffledQuestions[currentRound];
    const isCorrect = lastGuess === currentQ.answer;
    
    if (isCorrect) {
      return currentQ.answer === 'chat' 
        ? getRandomMessage(correctChatMessages)
        : getRandomMessage(correctBebeMessages);
    } else {
      return currentQ.answer === 'chat'
        ? getRandomMessage(wrongThoughtBebeMessages) // Thought baby, was cat
        : getRandomMessage(wrongThoughtChatMessages); // Thought cat, was baby
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <AnimatePresence mode="wait">
        
        {/* START SCREEN */}
        {gameState === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col items-center text-center max-w-md w-full"
          >
            <div className="flex gap-4 text-6xl mb-6">
              <motion.span 
                animate={{ rotate: [-10, 10, -10] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >🐱</motion.span>
              <span className="text-muted-foreground">ou</span>
              <motion.span 
                animate={{ rotate: [10, -10, 10] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >👶</motion.span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight text-foreground">
              Chat ou<br/>Bébé ?
            </h1>
            
            <p className="text-xl mb-12 text-muted-foreground px-4">
              Le jeu qui va vous faire douter de vos propres oreilles. 10 sons. Saurez-vous les différencier ?
            </p>
            
            <button 
              onClick={startGame}
              className="bg-primary text-primary-foreground text-2xl font-bold px-12 py-6 rounded-[2rem] bubbly-shadow transition-all w-full md:w-auto"
            >
              Jouer maintenant !
            </button>
          </motion.div>
        )}

        {/* PLAYING SCREEN */}
        {gameState === 'playing' && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center max-w-md w-full h-full justify-between py-8"
          >
            <div className="w-full flex justify-between items-center px-4 mb-8">
              <div className="bg-muted px-4 py-2 rounded-full font-semibold text-muted-foreground">
                Tour {currentRound + 1}/10
              </div>
              <div className="bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold">
                Score: {score}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center w-full gap-12 my-8">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={isPlaying ? stopAudio : playAudio}
                className="w-48 h-48 rounded-full bg-foreground text-background flex items-center justify-center relative shadow-xl overflow-hidden group"
              >
                {isPlaying && (
                  <motion.div 
                    className="absolute inset-0 bg-primary/20"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-2">
                  {isPlaying ? (
                    <div className="flex items-center gap-1 h-12">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 bg-current rounded-full"
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
                    <Play size={48} className="fill-current translate-x-2" />
                  )}
                  <span className="text-lg font-bold mt-2">
                    {isPlaying ? 'Arrêter' : 'Écouter le son'}
                  </span>
                </div>
              </motion.button>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 px-4">
              <button 
                onClick={() => handleGuess('chat')}
                className="bg-secondary text-secondary-foreground text-xl md:text-2xl font-bold p-8 rounded-3xl bubbly-shadow transition-all flex flex-col items-center gap-2"
              >
                <span className="text-4xl">🐱</span>
                <span>Chat</span>
              </button>
              
              <button 
                onClick={() => handleGuess('bebe')}
                className="bg-primary text-primary-foreground text-xl md:text-2xl font-bold p-8 rounded-3xl bubbly-shadow transition-all flex flex-col items-center gap-2"
              >
                <span className="text-4xl">👶</span>
                <span>Bébé</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* REVEAL SCREEN */}
        {gameState === 'revealed' && (() => {
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
                className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl shadow-2xl ${
                  isCorrect ? 'bg-green-400' : 'bg-red-400'
                }`}
              >
                {isCorrect ? '✅' : '❌'}
              </motion.div>

              <div>
                <h2 className="text-3xl font-bold mb-2">
                  C'était un {currentQ.answer === 'chat' ? 'Chat 🐱' : 'Bébé 👶'} !
                </h2>
                <p className="text-xl text-muted-foreground font-medium mb-6">
                  {getRevealMessage()}
                </p>
                
                <div className="bg-card border-2 border-card-border p-6 rounded-3xl shadow-sm relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card px-4 py-1 text-sm font-bold rounded-full border-2 border-card-border text-muted-foreground">
                    L'indice
                  </span>
                  <p className="italic text-lg text-foreground">
                    "{currentQ.hint}"
                  </p>
                </div>
              </div>

              <button 
                onClick={nextRound}
                className="mt-4 bg-foreground text-background text-2xl font-bold px-12 py-6 rounded-[2rem] bubbly-shadow transition-all w-full"
              >
                {currentRound < 9 ? 'Suivant' : 'Voir les résultats'}
              </button>
            </motion.div>
          );
        })()}

        {/* END SCREEN */}
        {gameState === 'end' && (
          <motion.div 
            key="end"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center max-w-md w-full gap-8 px-4"
          >
            {score >= 6 && <Confetti duration={5000} />}
            
            <h1 className="text-5xl font-bold">Résultat final</h1>
            
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-muted" />
                <motion.circle 
                  cx="96" cy="96" r="88" 
                  stroke="currentColor" 
                  strokeWidth="16" 
                  fill="transparent"
                  className={score >= 8 ? 'text-green-500' : score >= 5 ? 'text-accent' : 'text-destructive'}
                  strokeDasharray="552.92"
                  initial={{ strokeDashoffset: 552.92 }}
                  animate={{ strokeDashoffset: 552.92 - (552.92 * score) / 10 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold">{score}</span>
                <span className="text-xl text-muted-foreground">/ 10</span>
              </div>
            </div>

            <p className="text-2xl font-medium px-4">
              {getScoreMessage()}
            </p>

            <button 
              onClick={startGame}
              className="mt-8 flex items-center justify-center gap-3 bg-primary text-primary-foreground text-2xl font-bold px-12 py-6 rounded-[2rem] bubbly-shadow transition-all w-full"
            >
              <RefreshCcw size={28} />
              Rejouer
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
