import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full space-x-2 mt-10">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-3 h-3 bg-blue-500 rounded-full"
          animate={{
            y: [0, -10, 0], 
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2, 
          }}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;

