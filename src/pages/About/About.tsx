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
    <div className="scrollable min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            About JavaScript Handbook
          </h1>
          <p className="text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed">
            An open-source platform dedicated to making JavaScript education accessible,
            interactive, and community-driven.
          </p>
        </div>

        {/* Main Content */}
        <div className="backdrop-blur-sm bg-gray-800/50 rounded-2xl p-10 border border-gray-700/50 shadow-xl mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Our Mission
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300/90 leading-relaxed text-lg">
                  As a front-end developer, mastering JavaScript is essential, whether you're gearing up
                  for job interviews or enhancing your personal skill set. Recognizing the scarcity of
                  comprehensive and freely accessible resources on this pivotal topic, we created
                  JavaScript Handbook.
                </p>
                <p className="text-gray-300/90 leading-relaxed text-lg">
                  Join us and contribute to a thriving open-source community that values knowledge
                  sharing and collective improvement. Together, we'll navigate the complexities of
                  JavaScript, transforming challenges into opportunities for growth.
                </p>
              </div>
            </div>

            <div className="w-full h-full relative flex items-center justify-center min-h-[300px]">
              {/* Core Icon */}
              <div className="absolute w-20 h-20 flex items-center justify-center text-5xl bg-gray-900/90 border border-gray-700/50 rounded-2xl backdrop-blur-xl text-[#f7df1e] z-30 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <FaJsSquare />
              </div>

              {/* Framework Layer */}
              <div className="absolute w-[220px] h-[220px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center text-3xl bg-gray-900/90 border border-gray-700/50 rounded-2xl backdrop-blur-xl text-[#61dafb] transform hover:scale-110 transition-transform duration-300">
                  <FaReact />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 flex items-center justify-center text-3xl bg-gray-900/90 border border-gray-700/50 rounded-2xl backdrop-blur-xl text-[#42b883] transform hover:scale-110 transition-transform duration-300">
                  <FaVuejs />
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 flex items-center justify-center text-3xl bg-gray-900/90 border border-gray-700/50 rounded-2xl backdrop-blur-xl text-[#3178c6] transform hover:scale-110 transition-transform duration-300">
                  <SiTypescript />
                </div>
              </div>

              {/* Tools Layer */}
              <div className="absolute w-[300px] h-[300px]">
                <div className="absolute top-[20%] left-0 w-16 h-16 flex items-center justify-center text-3xl bg-gray-900/90 border border-gray-700/50 rounded-2xl backdrop-blur-xl text-[#68a063] transform hover:scale-110 transition-transform duration-300">
                  <FaNodeJs />
                </div>
                <div className="absolute top-[20%] right-0 w-16 h-16 flex items-center justify-center text-3xl bg-gray-900/90 border border-gray-700/50 rounded-2xl backdrop-blur-xl text-[#cb3837] transform hover:scale-110 transition-transform duration-300">
                  <FaNpm />
                </div>
                <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center text-3xl bg-gray-900/90 border border-gray-700/50 rounded-2xl backdrop-blur-xl text-white transform hover:scale-110 transition-transform duration-300">
                  <FaGithub />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            What Sets Us Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FaCode />,
                title: "Interactive Learning",
                description:
                  "Explore JavaScript with our hands-on platform, blending theory with practical exercises designed for modern web development.",
              },
              {
                icon: <FaLightbulb />,
                title: "Our Vision",
                description:
                  "Creating a world where developers at all levels can access top-quality JavaScript resources and contribute to collective learning.",
              },
              {
                icon: <FaUsers />,
                title: "Community Driven",
                description:
                  "Join our thriving community of developers, contribute to open source, and shape the future of JavaScript learning.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50 shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-6 text-purple-400">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300/90 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-20 px-8 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-gray-700/50 backdrop-blur-sm shadow-xl">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-gray-300/90 mb-10 max-w-2xl mx-auto">
            Contribute to open source and help shape the future of JavaScript education.
          </p>
          <button
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold flex items-center gap-3 hover:from-blue-600 hover:to-purple-600 transition-all mx-auto text-lg shadow-xl"
            onClick={() => window.open('https://github.com/harshsrivastva97/javascript-handbook', '_blank')}
          >
            Join on GitHub <FaRocket className="text-xl" />
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center">
          <p className="flex items-center justify-center gap-2 text-gray-300/90 text-lg">
            Made with <FaHeart className="text-red-500" /> by{" "}
            <a
              href="https://www.linkedin.com/in/harsh-srivastva/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Harsh Srivastva
            </a>
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <a
              href="https://github.com/harshsrivastva97/javascript-handbook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300/90 hover:text-purple-400 transition-colors"
            >
              GitHub
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="mailto:harsh.srivastva97@gmail.com"
              className="text-gray-300/90 hover:text-purple-400 transition-colors"
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
