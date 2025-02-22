import React from "react";
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
  FaRocket,
} from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

const About: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen pt-10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            About JavaScript Handbook
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            An open-source platform dedicated to making JavaScript education accessible,
            interactive, and community-driven.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-800 rounded-xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              As a front-end developer, mastering JavaScript is essential, whether you're gearing up
              for job interviews or enhancing your personal skill set. Recognizing the scarcity of
              comprehensive and freely accessible resources on this pivotal topic, we created
              JavaScript Handbook.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Join us and contribute to a thriving open-source community that values knowledge
              sharing and collective improvement. Together, we'll navigate the complexities of
              JavaScript, transforming challenges into opportunities for growth.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 border border-purple-500/20">
            <div className="w-full h-full relative flex items-center justify-center">
              {/* Core Icon */}
              <div
                className="absolute w-16 h-16 flex items-center justify-center text-4xl bg-[rgba(15,23,41,0.9)] border border-white/10 rounded-xl backdrop-blur text-[#f7df1e] z-30 shadow-lg"
              >
                <FaJsSquare />
              </div>

              {/* Framework Layer */}
              <div className="absolute w-[180px] h-[180px]">
                {/* React */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center text-2xl bg-[rgba(15,23,41,0.8)] border border-white/10 rounded-xl backdrop-blur text-[#61dafb]"
                >
                  <FaReact />
                </div>

                {/* Vue */}
                <div
                  className="absolute bottom-0 right-0 w-12 h-12 flex items-center justify-center text-2xl bg-[rgba(15,23,41,0.8)] border border-white/10 rounded-xl backdrop-blur text-[#42b883]"
                >
                  <FaVuejs />
                </div>

                {/* TypeScript */}
                <div
                  className="absolute bottom-0 left-0 w-12 h-12 flex items-center justify-center text-2xl bg-[rgba(15,23,41,0.8)] border border-white/10 rounded-xl backdrop-blur text-[#3178c6]"
                >
                  <SiTypescript />
                </div>
              </div>

              {/* Tools Layer */}
              <div className="absolute w-[240px] h-[240px]">
                <div
                  className="absolute top-[20%] left-0 w-12 h-12 flex items-center justify-center text-2xl bg-[rgba(15,23,41,0.8)] border border-white/10 rounded-xl backdrop-blur text-[#68a063]"
                >
                  <FaNodeJs />
                </div>

                <div
                  className="absolute top-[20%] right-0 w-12 h-12 flex items-center justify-center text-2xl bg-[rgba(15,23,41,0.8)] border border-white/10 rounded-xl backdrop-blur text-[#cb3837]"
                >
                  <FaNpm />
                </div>

                <div
                  className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center text-2xl bg-[rgba(15,23,41,0.8)] border border-white/10 rounded-xl backdrop-blur text-white"
                >
                  <FaGithub />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            What Sets Us Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gray-800 hover:bg-gray-750 transition-all border border-purple-500/20">
              <div className="text-3xl mb-4 text-purple-500">
                <FaCode />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Interactive Learning</h3>
              <p className="text-gray-400">
                Explore JavaScript with our hands-on platform, blending theory with practical
                exercises designed for modern web development.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-800 hover:bg-gray-750 transition-all border border-purple-500/20">
              <div className="text-3xl mb-4 text-purple-500">
                <FaLightbulb />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Our Vision</h3>
              <p className="text-gray-400">
                Creating a world where developers at all levels can access top-quality JavaScript
                resources and contribute to collective learning.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-800 hover:bg-gray-750 transition-all border border-purple-500/20">
              <div className="text-3xl mb-4 text-purple-500">
                <FaUsers />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Community Driven</h3>
              <p className="text-gray-400">
                Join our thriving community of developers, contribute to open source, and shape
                the future of JavaScript learning.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16 px-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-purple-500/20">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Ready to Join Our Community?
          </h2>
          <p className="text-gray-400 mb-8">
            Contribute to open source and help shape the future of JavaScript education.
          </p>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold flex items-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all mx-auto"
            onClick={() => window.open('https://github.com/harshsrivastva97/javascript-handbook', '_blank')}
          >
            Join on GitHub <FaRocket />
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center">
          <p className="flex items-center justify-center gap-2 text-gray-400">
            Made with <FaHeart className="text-red-500" /> by{" "}
            <a
              href="https://www.linkedin.com/in/harsh-srivastva/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:text-purple-400 transition-colors"
            >
              Harsh Srivastva
            </a>
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <a
              href="https://github.com/harshsrivastva97/javascript-handbook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-500 transition-colors"
            >
              GitHub
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="mailto:harsh.srivastva97@gmail.com"
              className="text-gray-400 hover:text-purple-500 transition-colors"
            >
              Report an Issue
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;
