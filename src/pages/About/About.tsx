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
import "./About.scss";

const About: React.FC = () => {
  return (
    <div className="about-page scrollable">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-24">
          <h1 className="text-5xl font-bold mb-6 gradient-text">
            About JavaScript Handbook
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            An open-source platform dedicated to making JavaScript education accessible,
            interactive, and community-driven.
          </p>
        </div>

        {/* Main Content */}
        <div className="card-container rounded-2xl p-10 border shadow-xl mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8 gradient-text">
                Our Mission
              </h2>
              <div className="space-y-6">
                <p className="text-secondary leading-relaxed text-lg">
                  As a front-end developer, mastering JavaScript is essential, whether you're gearing up
                  for job interviews or enhancing your personal skill set. Recognizing the scarcity of
                  comprehensive and freely accessible resources on this pivotal topic, we created
                  JavaScript Handbook.
                </p>
                <p className="text-secondary leading-relaxed text-lg">
                  Join us and contribute to a thriving open-source community that values knowledge
                  sharing and collective improvement. Together, we'll navigate the complexities of
                  JavaScript, transforming challenges into opportunities for growth.
                </p>
              </div>
            </div>

            <div className="w-full h-full relative flex items-center justify-center min-h-[300px]">
              {/* Core Icon */}
              <div className="tech-icon javascript absolute w-20 h-20 flex items-center justify-center text-5xl border rounded-2xl shadow-2xl z-30 transform hover:scale-110 transition-transform duration-300">
                <FaJsSquare />
              </div>

              {/* Framework Layer */}
              <div className="absolute w-[220px] h-[220px]">
                <div className="tech-icon react absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center text-3xl border rounded-2xl transform hover:scale-110 transition-transform duration-300">
                  <FaReact />
                </div>
                <div className="tech-icon vue absolute bottom-0 right-0 w-16 h-16 flex items-center justify-center text-3xl border rounded-2xl transform hover:scale-110 transition-transform duration-300">
                  <FaVuejs />
                </div>
                <div className="tech-icon typescript absolute bottom-0 left-0 w-16 h-16 flex items-center justify-center text-3xl border rounded-2xl transform hover:scale-110 transition-transform duration-300">
                  <SiTypescript />
                </div>
              </div>

              {/* Tools Layer */}
              <div className="absolute w-[300px] h-[300px]">
                <div className="tech-icon node absolute top-[20%] left-0 w-16 h-16 flex items-center justify-center text-3xl border rounded-2xl transform hover:scale-110 transition-transform duration-300">
                  <FaNodeJs />
                </div>
                <div className="tech-icon npm absolute top-[20%] right-0 w-16 h-16 flex items-center justify-center text-3xl border rounded-2xl transform hover:scale-110 transition-transform duration-300">
                  <FaNpm />
                </div>
                <div className="tech-icon github absolute bottom-[20%] left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center text-3xl border rounded-2xl transform hover:scale-110 transition-transform duration-300">
                  <FaGithub />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
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
                className="feature-card rounded-2xl p-8 border shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="feature-icon text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-primary mb-4">{feature.title}</h3>
                <p className="text-secondary leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section text-center py-20 px-8 rounded-2xl border shadow-xl">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-secondary mb-10 max-w-2xl mx-auto">
            Contribute to open source and help shape the future of JavaScript education.
          </p>
          <button
            className="cta-button px-8 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto text-lg shadow-xl"
            onClick={() => window.open('https://github.com/harshsrivastva97/javascript-handbook', '_blank')}
          >
            Join on GitHub <FaRocket className="text-xl" />
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center">
          <p className="flex items-center justify-center gap-2 text-secondary text-lg">
            Made with <FaHeart className="heart-icon" /> by{" "}
            <a
              href="https://www.linkedin.com/in/harsh-srivastva/"
              target="_blank"
              rel="noopener noreferrer"
              className="author-link transition-colors"
            >
              Harsh Srivastva
            </a>
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <a
              href="https://github.com/harshsrivastva97/javascript-handbook"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link transition-colors"
            >
              GitHub
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="mailto:harsh.srivastva97@gmail.com"
              className="footer-link transition-colors"
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
