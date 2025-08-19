import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const FinalMessage: React.FC = () => {
  const [phase, setPhase] = useState<"postcards" | "game" | "final">("postcards");
  const [flipped, setFlipped] = useState<number[]>([]);

  // UNO-style postcards with different colors and fun messages
  const postcards = [
    {
      color: "red",
      message: " hollaaa sweetheart wish you very very happy birthday there are few special messages to the very specia l person",
      symbol: "🃏"
    },
    {
      color: "yellow",
      message: "Like a REVERSE card, you turned my world upside down (in the best way) yeah yeah you turned me into a pookie sooooooo !",
      symbol: "🔄"
    },
    {
      color: "green",
      message: "your happiness matters to me even more than my own happiness and i just want to see you happy and smiling always !",
      symbol: "+4"
    },
    {
      color: "blue",
      message: "idk i am blank but hey ! you are the best part of my life and i love you so much !",
      symbol: "⏭️"
    },
    {
      color: "purple",
      message: "and yeah without you even a hour feels empty sooo idk what should i say but yeah you are really important to me and your absence even for a hour or for few mins hurts a lot  ",
      symbol: "🎯"
    }
  ];

  const flipCard = (index: number) => {
    if (!flipped.includes(index)) {
      setFlipped([...flipped, index]);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ background: "linear-gradient(135deg, #FFEEAD, #FAD0C4, #FBC2EB)", fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}
    >
      {phase === "postcards" && (
        <motion.div
          className="w-full max-w-4xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold text-center text-red-600 mb-8 drop-shadow-md">
            SPECIAL POSTCARDS FOR YOU!
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {postcards.map((card, idx) => (
              <motion.div
                key={idx}
                className={`h-48 cursor-pointer perspective-1000 ${flipped.includes(idx) ? '' : 'hover:scale-105'}`}
                onClick={() => flipCard(idx)}
                whileHover={!flipped.includes(idx) ? { scale: 1.05 } : {}}
                whileTap={!flipped.includes(idx) ? { scale: 0.95 } : {}}
              >
                <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                  flipped.includes(idx) ? 'rotate-y-180' : ''
                }`}>
                  {/* Front of card - UNO style */}
                  <div className={`absolute w-full h-full rounded-xl shadow-lg flex items-center justify-center backface-hidden ${
                    card.color === "red" ? "bg-red-500" :
                    card.color === "yellow" ? "bg-yellow-400" :
                    card.color === "green" ? "bg-green-500" :
                    card.color === "blue" ? "bg-blue-500" : "bg-purple-500"
                  }`}>
                    <div className="text-white text-6xl font-bold">
                      {card.symbol}
                    </div>
                  </div>
                  
                  {/* Back of card - message */}
                  <div className={`absolute w-full h-full rounded-xl shadow-lg flex items-center justify-center p-4 backface-hidden rotate-y-180 ${
                    card.color === "red" ? "bg-red-100" :
                    card.color === "yellow" ? "bg-yellow-100" :
                    card.color === "green" ? "bg-green-100" :
                    card.color === "blue" ? "bg-blue-100" : "bg-purple-100"
                  }`}>
                    <p className="text-center text-gray-800 font-medium text-sm">
                      {card.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {(

            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-full shadow-lg text-lg font-bold uppercase tracking-wide"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhase("game")}
              >
                Special Message For You →
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}

      {phase === "game" && (
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center drop-shadow-sm">
            CATCH THE HEART TO REVEAL YOUR SPECIAL MESSAGE!
          </h2>
          
          <div className="relative w-64 h-64 bg-white/80 rounded-xl shadow-lg flex items-center justify-center mb-8">
            <motion.div
              className="cursor-pointer absolute"
              drag
              dragConstraints={{
                top: -100,
                left: -100,
                right: 100,
                bottom: 100
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase("final")}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart size={90} className="text-red-500 drop-shadow-lg" fill="currentColor" />
            </motion.div>
          </div>
          
          <p className="text-gray-700 font-medium">
            Drag and click the heart when you catch it!
          </p>
        </motion.div>
      )}

      {phase === "final" && (
        <motion.div
          className="max-w-2xl bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center mb-6"
          >
            <Heart className="text-red-500" size={48} fill="currentColor" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
            🎲 HAPPY BIRTHDAY TO THE PERSON WHO'S MY EVERYTHING! 🎲
          </h1>
          
          <p className="text-lg text-gray-800 leading-relaxed font-semibold text-center">
            Thanks for being the most fun, DUMB  and wonderful person in my life. 
            Every day with you is like drawing the perfect card!
            THERE'S LOT IN MY HEART FOR YOU! BUT I CAN'T SAY IT ALL IN WORDS.I HOPE YOU FEEL IT! AMD I HOPE YOU KNOW HOW MUCH YOU MEAN TO ME!
            AND I HOPE YOU KNOW THAT YOU'RE THE BEST PART OF MY LIFE! AND I HOPE MY LIL EFFORT MAKES YOU SMILE! COZ THATS ALL I WANT! I WANT YOU TO BE HAPPY I WAMT YOU TO FEEL SPECIAL BCOZ YOU ARE SPECIAL!
            AT THE END OF THE DAY, YOU'RE MY FAVORITE PERSON AND I LOVE YOU SO MUCH!
            I WANT TO MAKE SURE THAT YOUR BIRTHDAY IS AS SPECIAL AS YOU ARE!TO ME 
          </p>
          
          <div className="mt-8 flex justify-center">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ILYSM 💖
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};