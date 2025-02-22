import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux';
import { updateTopicStatus } from '../../redux/slices/topicsDataMapSlice';
import { FaBook, FaCode, FaLaptopCode, FaBrain, FaRocket, FaCheckCircle, FaRegCircle, FaNewspaper } from "react-icons/fa";
import { BsThreeDots, BsLightningCharge, BsBookHalf } from "react-icons/bs";
import { Tooltip } from 'react-tooltip';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { listOfConcepts } from '../../data/concepts';
import "./Home.scss";

interface Topic {
  id: number;
  status: 'pending' | 'in-progress' | 'completed';
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { topics } = useAppSelector((state: RootState) => state.topicsData);

  const calculateProgress = () => {
    if (!topics?.length) return 0;
    const completed = topics.filter((topic: Topic) => topic.status === "completed").length;
    return Math.round((completed / listOfConcepts.length) * 100);
  };

  const handleStatusChange = (topicId: number, newStatus: 'pending' | 'in-progress' | 'completed') => {
    try {
      dispatch(updateTopicStatus({
        topicId,
        status: newStatus
      }));
    } catch (error) {
      console.error('Error updating topic status:', error);
    }
  };

  const navigateToConcept = (conceptId: number) => {
    navigate(`/concepts?conceptId=${conceptId}`);
  };

  const navigateToCodeVault = (conceptId: number) => {
    navigate(`/vault?concept=${conceptId}`);
  };

  const features = [
    {
      icon: <FaLaptopCode />,
      title: "Interactive Learning",
      description: "Learn JavaScript concepts through hands-on coding exercises and real-world examples"
    },
    {
      icon: <FaBrain />,
      title: "Concept Mastery",
      description: "Deep dive into core JavaScript concepts with comprehensive documentation"
    },
    {
      icon: <BsLightningCharge />,
      title: "Code Vault",
      description: "Access a vast collection of code snippets and practice exercises"
    },
    {
      icon: <BsBookHalf />,
      title: "Progress Tracking",
      description: "Track your learning journey with our intuitive progress system"
    }
  ];

  const exploreSections = [
    {
      icon: <FaNewspaper />,
      title: "Latest Articles",
      description: "Stay updated with the latest trends in JavaScript and web development.",
      link: "/blogs"
    },
    {
      icon: <FaLaptopCode />,
      title: "Exercises",
      description: "Sharpen your skills with hands-on coding exercises.",
      link: "/exercises"
    },
    {
      icon: <FaBook />,
      title: "Deep Dives",
      description: "Explore in-depth articles on complex JavaScript topics.",
      link: "/concepts"
    }
  ];

  return (
    <div className="home">
      <div className="hero flex flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Your Journey to JavaScript Mastery
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            Master JavaScript through interactive learning, comprehensive documentation,
            and hands-on coding exercises. Join thousands of developers on their path to excellence.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold flex items-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all" onClick={() => navigate('/concepts')}>
              Start Learning <FaRocket />
            </button>
            <button className="px-6 py-3 border-2 border-purple-500 text-purple-500 rounded-full font-semibold flex items-center gap-2 hover:bg-purple-500 hover:text-white transition-all" onClick={() => navigate('/vault')}>
              Explore Code Vault <FaCode />
            </button>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="topics-section p-8">
        <div className="section-header">
          <h2>Learning Path</h2>
          <p>Track your progress through essential JavaScript concepts</p>
        </div>
        <div className="flex items-center justify-around">
          <div className="topics-table-container">
            <table className="topics-table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listOfConcepts.map((concept) => {
                  const topicStatus = topics.find((t: Topic) => t.id === concept.id)?.status || 'pending';
                  return (
                    <tr key={concept.id}>
                      <td className="flex items-center">{concept.title}</td>
                      <td>
                        <div
                          className="status-toggle"
                          onClick={() => {
                            const nextStatus = {
                              pending: "in-progress",
                              "in-progress": "completed",
                              completed: "pending"
                            } as const;
                            handleStatusChange(concept.id, nextStatus[topicStatus as keyof typeof nextStatus]);
                          }}
                        >
                          <div className={`status-icon ${topicStatus}`}>
                            {topicStatus === 'completed' && <FaCheckCircle />}
                            {topicStatus === 'in-progress' && <BsThreeDots />}
                            {topicStatus === 'pending' && <FaRegCircle />}
                          </div>
                          <span className="status-text">
                            {topicStatus === 'completed' && 'Mastered'}
                            {topicStatus === 'in-progress' && 'Learning'}
                            {topicStatus === 'pending' && 'To Learn'}
                          </span>
                        </div>
                      </td>
                      <td className="actions">
                        <button
                          data-tooltip-id={`readme-${concept.id}`}
                          onClick={() => navigateToConcept(concept.id)}
                        >
                          <FaBook />
                        </button>
                        <Tooltip id={`readme-${concept.id}`} place="top">
                          Read Documentation
                        </Tooltip>

                        <button
                          data-tooltip-id={`practice-${concept.id}`}
                          onClick={() => navigateToCodeVault(concept.id)}
                        >
                          <FaCode />
                        </button>
                        <Tooltip id={`practice-${concept.id}`} place="top">
                          Practice Code
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="progress-chart-container">
            <svg style={{ height: 0 }}>
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#12c2e9" />
                  <stop offset="50%" stopColor="#c471ed" />
                  <stop offset="100%" stopColor="#f64f59" />
                </linearGradient>
              </defs>
            </svg>
            <div className="progress-chart">
              <CircularProgressbar
                value={calculateProgress()}
                text={`${calculateProgress()}%`}
                styles={buildStyles({
                  pathColor: `url(#progressGradient)`,
                  textColor: '#ffffff',
                  trailColor: 'rgba(255, 255, 255, 0.2)',
                  pathTransition: 'stroke-dashoffset 0.5s ease-in-out',
                  strokeLinecap: 'round',
                  textSize: '16px',
                  pathTransitionDuration: 0.5
                })}
              />
            </div>
            <p className="progress-text">Your Learning Progress</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Level Up Your JavaScript Skills?</h2>
          <p>Start your learning journey today and join our community of developers.</p>
          <button className="primary-btn" onClick={() => window.open('https://github.com/harshsrivastva97/javascript-handbook', '_blank')}>
            Begin Your Journey <FaRocket />
          </button>
        </div>
      </div>

      <div className="explore-section">
        <h2>Explore More</h2>
        <div className="explore-grid">
          {exploreSections.map((section, index) => (
            <motion.div
              key={section.title}
              className="explore-card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="explore-icon">{section.icon}</div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <button onClick={() => navigate(section.link)}>Learn More</button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;