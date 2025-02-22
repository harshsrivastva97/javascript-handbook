import React from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaLightbulb,
  FaUsers,
  FaHeart,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaNpm,
  FaVuejs,
  FaGithub,
} from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

const About: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen max-h-screen relative overflow-auto text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[74rem] mx-auto p-8 pb-24 relative z-10">
        <section className="mb-8">
          <motion.div
            className="bg-[rgba(15,23,41,0.6)] p-8 lg:p-12 rounded-2xl relative overflow-hidden border border-white/[0.08] backdrop-blur-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#646cff] to-[#a8b2d1]" />

            <motion.h1
              className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-white to-[#646cff] bg-clip-text text-transparent -tracking-wider"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              About
            </motion.h1>

            <div className="flex gap-16 items-center">
              <div className="flex-1">
                <p className="text-[#a8b2d1] leading-relaxed text-lg mb-6">
                  As a front-end developer, mastering JavaScript is essential, whether you're gearing up for job interviews or enhancing your personal skill set. Recognizing the scarcity of comprehensive and freely accessible resources on this pivotal topic, we have JavaScript Handbook, an open-source, community-driven platform dedicated to high-quality JavaScript education. Here, developers can engage with interactive learning modules, practice through real-life coding challenges, and achieve a profound understanding of JavaScript.
                </p>
                <p className="text-[#a8b2d1] leading-relaxed text-lg">
                  Join us and contribute to a thriving open-source community that values knowledge sharing and collective improvement. Together, we'll navigate the complexities of JavaScript, transforming challenges into opportunities for growth.
                </p>
              </div>

              <div className="w-80 h-80 relative flex-shrink-0 hidden lg:block">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(100,108,255,0.1)_0%,transparent_70%)] rounded-full" />
                <motion.div
                  className="w-full h-full relative flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Core Icon */}
                  <motion.div
                    className="absolute w-16 h-16 flex items-center justify-center text-4xl bg-[rgba(15,23,41,0.9)] border border-white/10 rounded-xl backdrop-blur text-[#f7df1e] z-30 shadow-lg"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaJsSquare />
                  </motion.div>

                  {/* Framework Layer */}
                  <div className="absolute w-[180px] h-[180px]">
                    {/* React */}
                    <motion.div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center text-2xl bg-[rgba(15,23,41,0.8)] border border-white/10 rounded-xl backdrop-blur text-[#61dafb]"
                      animate={{ y: [-3, 3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <FaReact />
                    </motion.div>

                    {/* Vue */}
                    <motion.div
                      className="absolute bottom-0 right-0 w-12 h-12 flex items-center justify-center text-2xl bg-[rgba(15,23,41,0.8)] border border-white/10 rounded-xl backdrop-blur text-[#42b883]"
                      animate={{ y: [3, -3] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <FaVuejs />
                    </motion.div>

                    {/* TypeScript */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-12 h-12 flex items-center justify-center text-2xl bg-[rgba(15,23,41,0.8)] border border-white/10 rounded-xl backdrop-blur text-[#3178c6]"
                      animate={{ y: [-3, 3] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <SiTypescript />
                    </motion.div>
                  </div>

                  {/* Tools Layer */}
                  <div className="absolute w-[240px] h-[240px]">
                    <motion.div
                      className="absolute top-[20%] left-0 w-12 h-12 flex items-center justify-center text-2xl bg-[rgba(15,23,41,0.8)] border border-white/10 rounded-xl backdrop-blur text-[#68a063]"
                      animate={{ y: [2, -2] }}
                      transition={{
                        duration: 2.3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <FaNodeJs />
                    </motion.div>

                    <motion.div
                      className="absolute top-[20%] right-0 w-12 h-12 flex items-center justify-center text-2xl bg-[rgba(15,23,41,0.8)] border border-white/10 rounded-xl backdrop-blur text-[#cb3837]"
                      animate={{ y: [-2, 2] }}
                      transition={{
                        duration: 2.1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <FaNpm />
                    </motion.div>

                    <motion.div
                      className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center text-2xl bg-[rgba(15,23,41,0.8)] border border-white/10 rounded-xl backdrop-blur text-white"
                      animate={{ y: [2, -2] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <FaGithub />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <motion.div
              className="bg-[rgba(15,23,41,0.6)] rounded-2xl border border-white/[0.08] backdrop-blur-md overflow-hidden transition-transform hover:-translate-y-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="p-10 relative group">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#646cff] to-[#a8b2d1] opacity-0 group-hover:opacity-100 transition-opacity" />
                <FaCode className="text-4xl text-[#646cff] mb-6 transition-transform group-hover:scale-110" />
                <h2 className="text-xl font-semibold mb-4">Interactive Learning</h2>
                <p className="text-[#a8b2d1] leading-relaxed">
                  Explore JavaScript with our hands-on platform, blending theory with practical exercises. Master advanced techniques and best practices while engaging with real-world scenarios designed for modern web development.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-[rgba(15,23,41,0.6)] rounded-2xl border border-white/[0.08] backdrop-blur-md overflow-hidden transition-transform hover:-translate-y-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="p-10 relative group">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#646cff] to-[#a8b2d1] opacity-0 group-hover:opacity-100 transition-opacity" />
                <FaLightbulb className="text-4xl text-[#646cff] mb-6 transition-transform group-hover:scale-110" />
                <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
                <p className="text-[#a8b2d1] leading-relaxed">
                  Envisioning a world where developers at all levels access top JavaScript resources, our platform thrives on community contributions and collaborative learning, actively shaping the future of JavaScript in web development.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-[rgba(15,23,41,0.6)] rounded-2xl border border-white/[0.08] backdrop-blur-md overflow-hidden transition-transform hover:-translate-y-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="p-10 relative group">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#646cff] to-[#a8b2d1] opacity-0 group-hover:opacity-100 transition-opacity" />
                <FaUsers className="text-4xl text-[#646cff] mb-6 transition-transform group-hover:scale-110" />
                <h2 className="text-xl font-semibold mb-4">Join Our Community</h2>
                <p className="text-[#a8b2d1] leading-relaxed">
                  At JavaScript Handbook, we turn challenges into opportunities and ideas into reality. Dive into JavaScript, raise your first PR, and collaborate with peers to create innovative solutions. Your contributions drive our collective creativity and success.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.footer
          className="fixed bottom-0 left-0 right-0 bg-[rgba(15,23,41,0.95)] py-4 border-t border-white/[0.08] backdrop-blur z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="max-w-[74rem] mx-auto px-8 flex justify-center items-center gap-8 text-sm flex-wrap">
            <p className="flex items-center gap-2 text-[#a8b2d1]">
              Made with <FaHeart className="text-[#ff4d4d]" /> by{" "}
              <a
                href="https://www.linkedin.com/in/harsh-srivastva/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#646cff] font-medium hover:underline"
              >
                Harsh Srivastva
              </a>
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/harshsrivastva97/javascript-handbook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a8b2d1] hover:text-[#646cff] transition-colors"
              >
                GitHub
              </a>
              <span className="text-white/30">•</span>
              <a
                href="mailto:harsh.srivastva97@gmail.com"
                className="text-[#a8b2d1] hover:text-[#646cff] transition-colors"
              >
                Report an Issue
              </a>
            </div>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default About;
