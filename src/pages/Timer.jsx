import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  // Break durations in seconds
  const breakTypes = {
    short: 5 * 60,
    medium: 15 * 60,
    long: 30 * 60
  };

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (isBreak && time > 0) {
          setTime(prevTime => prevTime - 1);
        } else if (!isBreak) {
          setTime(prevTime => prevTime + 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, isBreak, time]);

  // Check if break time is up
  useEffect(() => {
    if (isBreak && time === 0 && isActive) {
      toast.info("Break time is up! Ready to get back to studying?");
      setIsActive(false);
    }
  }, [isBreak, time, isActive]);

  const handleStartStudy = () => {
    setIsActive(true);
    setIsBreak(false);
    toast.success('Study session started! Stay focused!');
  };

  const handleStartBreak = (type) => {
    setIsActive(true);
    setIsBreak(true);
    setTime(breakTypes[type]);
    
    const breakMessages = {
      short: 'Taking a quick 5-minute break!',
      medium: 'Taking a 15-minute break to recharge!',
      long: 'Enjoying a well-deserved 30-minute break!'
    };
    
    toast.info(breakMessages[type]);
  };

  const handleStop = () => {
    setIsActive(false);
    if (!isBreak) {
      setSessionCount(prev => prev + 1);
      setTotalTime(prev => prev + time);
      toast.success(`Great job! You studied for ${formatTime(time)}`);
    }
    setTime(0);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    } else if (mins > 0) {
      return `${mins}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-teal-700 to-teal-600 rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 text-white">
          <h1 className="text-3xl font-bold">Study Time Tracker</h1>
          <p className="opacity-90">Track your learning sessions and take productive breaks</p>
        </div>
        
        {/* Timer Display */}
        <div className="bg-white/10 backdrop-blur-sm p-8 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <motion.div 
              key={formatTime(time)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`text-7xl font-bold mb-4 ${isBreak ? 'text-emerald-300' : 'text-white'}`}
            >
              {formatTime(time)}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-semibold text-teal-100"
            >
              {isBreak ? 'Break Time' : `Study Session #${sessionCount + 1}`}
            </motion.div>
          </div>
          
          {/* Control Buttons */}
          <div className="mt-6 mb-8 w-full max-w-xs">
            {!isActive ? (
              <motion.button
                onClick={handleStartStudy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-colors"
              >
                Start Studying
              </motion.button>
            ) : (
              <motion.button
                onClick={handleStop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-colors"
              >
                {isBreak ? 'End Break' : 'End Session'}
              </motion.button>
            )}
          </div>
          
          {/* Break Options */}
          {!isActive && (
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-4 text-center text-teal-100">Need a break?</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <motion.button
                  onClick={() => handleStartBreak('short')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-colors"
                >
                  Short Break (5m)
                </motion.button>
                <motion.button
                  onClick={() => handleStartBreak('medium')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-500 hover:bg-amber-400 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-colors"
                >
                  Medium Break (15m)
                </motion.button>
                <motion.button
                  onClick={() => handleStartBreak('long')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 hover:bg-orange-400 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-colors"
                >
                  Long Break (30m)
                </motion.button>
              </div>
            </div>
          )}
        </div>
        
        {/* Stats */}
        <div className="bg-teal-800/80 border-t border-teal-700 p-6 bg-blue-300" >
          <h3 className="text-lg font-semibold mb-4 text-white">Today's Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-teal-900/50 p-4 rounded-lg border border-teal-700">
              <div className="text-2xl font-bold text-black-300">{sessionCount}</div>
              <div className="text-teal-200">Sessions</div>
            </div>
            <div className="bg-teal-900/50 p-4 rounded-lg border border-teal-700">
              <div className={`text-2xl font-bold ${isBreak ? 'text-emerald-300' : 'text-teal-300'}`}>
                {formatTime(time)}
              </div>
              <div className="text-teal-200">Current</div>
            </div>
            <div className="bg-teal-900/50 p-4 rounded-lg border border-teal-700">
              <div className="text-2xl font-bold text-indigo-300">
                {totalTime === 0 ? '-' : formatTime(totalTime)}
              </div>
              <div className="text-teal-200">Total Today</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Timer;
