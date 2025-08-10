"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Share, Music, User, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function TikTokPhoneMockup() {
  const [currentVideo, setCurrentVideo] = useState(0);
  
  const videos = [
    {
      title: "Summer Sale Launch 🔥",
      user: "@fashionbrand",
      likes: "247K",
      comments: "1.2K",
      shares: "892",
      description: "Get ready for the biggest sale of the year! 50% off everything ✨ #summersale #fashion #trending",
      bgGradient: "from-pink-500 via-purple-500 to-blue-500"
    },
    {
      title: "Product Tutorial ✨",
      user: "@techreviews",
      likes: "156K",
      comments: "987",
      shares: "645", 
      description: "Mind-blowing features that will change everything! Swipe for more ➡️ #technology #innovation #viral",
      bgGradient: "from-orange-400 via-red-500 to-pink-500"
    },
    {
      title: "Behind the Scenes 🎬",
      user: "@creativestudio",
      likes: "89K",
      comments: "543",
      shares: "321",
      description: "See how we create viral content that converts! The secret formula revealed 🚀 #marketing #bts #creative",
      bgGradient: "from-green-400 via-blue-500 to-purple-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentVideoData = videos[currentVideo];

  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="relative w-60 h-[530px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
        {/* Screen */}
        <div className="w-full h-full bg-gray-900 rounded-[2rem] overflow-hidden relative">
          
          {/* Video Background */}
          <motion.div
            key={currentVideo}
            className={`absolute inset-0 bg-gradient-to-br ${currentVideoData.bgGradient} opacity-90`}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
            
            {/* Top Bar */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              />
            </div>

            {/* Center Content */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                key={`content-${currentVideo}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-3xl mb-3"
                >
                  🚀
                </motion.div>
                <h3 className="text-lg font-bold mb-1">{currentVideoData.title}</h3>
                <p className="text-xs opacity-90">{currentVideoData.description}</p>
              </motion.div>
            </div>

            {/* Bottom Content */}
            <div className="space-y-4">
              {/* User Info */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-xs">{currentVideoData.user}</p>
                  <p className="text-[10px] opacity-75">Follow for more content</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="ml-auto bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold"
                >
                  Follow
                </motion.button>
              </div>

              {/* Music Bar */}
              <div className="flex items-center space-x-1 bg-black/20 rounded-full p-1">
                <Music className="w-3 h-3" />
                <div className="flex-1">
                  <motion.div
                    animate={{ x: [-50, 50] }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="text-[10px] truncate"
                  >
                    Original sound - Trending viral music ✨
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="absolute right-2 bottom-20 space-y-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center space-y-0.5"
            >
              <div className="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center backdrop-blur">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </div>
              <span className="text-[10px] font-semibold">{currentVideoData.likes}</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center space-y-0.5"
            >
              <div className="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center backdrop-blur">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold">{currentVideoData.comments}</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center space-y-0.5"
            >
              <div className="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center backdrop-blur">
                <Share className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold">{currentVideoData.shares}</span>
            </motion.div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-2 left-2 flex space-x-1">
            {videos.map((_, index) => (
              <motion.div
                key={index}
                className={`h-0.5 rounded-full ${
                  index === currentVideo ? 'bg-white w-6' : 'bg-white/40 w-1'
                }`}
                animate={{
                  width: index === currentVideo ? 24 : 4,
                  opacity: index === currentVideo ? 1 : 0.4
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Phone Details */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gray-600 rounded-full"></div>
      </div>

      {/* Floating Interaction Elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-4 -right-4 bg-pink-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
      >
        <Heart className="w-4 h-4 text-white fill-current" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 10, 0],
          x: [0, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -bottom-6 -left-6 bg-blue-500 rounded-full w-7 h-7 flex items-center justify-center shadow-lg"
      >
        <Share className="w-3 h-3 text-white" />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/2 -left-8 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
      >
        <Plus className="w-3 h-3 text-gray-800" />
      </motion.div>
    </div>
  );
} 