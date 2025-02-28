import React from "react";
import { motion } from "framer-motion";
import "./Loading.scss";

const Loading: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center  dark:">
      <div className="flex flex-col items-center">
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-blue-500 rounded-full"
              animate={{
                y: [-10, 0, -10],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
        <motion.p
          className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading amazing content...
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;
