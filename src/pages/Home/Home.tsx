import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux';
import { updateTopicStatus } from '../../redux/slices/topicsDataMapSlice';
import { FaBook, FaCode, FaLaptopCode, FaBrain, FaRocket, FaCheckCircle, FaRegCircle, FaNewspaper } from "react-icons/fa";
import { BsThreeDots, BsLightningCharge, BsBookHalf } from "react-icons/bs";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { listOfConcepts } from '../../data/concepts';

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
    navigate(`/read?conceptId=${conceptId}`);
  };

  const navigateToCodeVault = (conceptId: number) => {
    navigate(`/practice?concept=${conceptId}`);
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
      link: "/read"
    }
  ];

  return (
    <div className="home bg-gray-900 min-h-screen pt-10">
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
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold flex items-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all" onClick={() => navigate('/read')}>
              Start Learning <FaRocket />
            </button>
            <button className="px-6 py-3 border-2 border-purple-500 text-purple-500 rounded-full font-semibold flex items-center gap-2 hover:bg-purple-500 hover:text-white transition-all" onClick={() => navigate('/practice')}>
              Explore Code Vault <FaCode />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-gray-800 hover:bg-gray-750 transition-all"
              >
                <div className="text-3xl mb-4 text-purple-500">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Topics Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Your Learning Journey
            </h2>
            <p className="text-gray-400">Track your progress through essential JavaScript concepts</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow bg-gray-800 rounded-xl p-6">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="text-left py-3 px-4">Topic</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listOfConcepts.map((concept) => {
                    const topicStatus = topics.find((t: Topic) => t.id === concept.id)?.status || 'pending';
                    return (
                      <tr key={concept.id} className="border-b border-gray-700">
                        <td className="py-3 px-4 text-white">{concept.title}</td>
                        <td className="py-3 px-4">
                          <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => {
                              const nextStatus = {
                                pending: "in-progress",
                                "in-progress": "completed",
                                completed: "pending"
                              } as const;
                              handleStatusChange(concept.id, nextStatus[topicStatus as keyof typeof nextStatus]);
                            }}
                          >
                            <div className={`text-xl ${topicStatus === 'completed' ? 'text-green-500' :
                              topicStatus === 'in-progress' ? 'text-yellow-500' :
                                'text-gray-500'
                              }`}>
                              {topicStatus === 'completed' && <FaCheckCircle />}
                              {topicStatus === 'in-progress' && <BsThreeDots />}
                              {topicStatus === 'pending' && <FaRegCircle />}
                            </div>
                            <span className="text-gray-400">
                              {topicStatus === 'completed' && 'Mastered'}
                              {topicStatus === 'in-progress' && 'Learning'}
                              {topicStatus === 'pending' && 'To Learn'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-3">
                            <button
                              className="text-blue-500 hover:text-blue-400 transition-colors"
                              onClick={() => navigateToConcept(concept.id)}
                              data-tooltip-id={`readme-${concept.id}`}
                            >
                              <FaBook />
                            </button>
                            <button
                              className="text-purple-500 hover:text-purple-400 transition-colors"
                              onClick={() => navigateToCodeVault(concept.id)}
                              data-tooltip-id={`practice-${concept.id}`}
                            >
                              <FaCode />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="lg:w-80 bg-gray-800 rounded-xl p-6 flex flex-col items-center">
              <div className="w-48 mb-4">
                <CircularProgressbar
                  value={calculateProgress()}
                  text={`${calculateProgress()}%`}
                  styles={buildStyles({
                    pathColor: `url(#progressGradient)`,
                    textColor: '#ffffff',
                    trailColor: 'rgba(255, 255, 255, 0.2)',
                    pathTransitionDuration: 0.5
                  })}
                />
              </div>
              <p className="text-gray-400 text-center">Overall Progress</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-20 text-center py-16 px-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-purple-500/20">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Ready to Level Up Your JavaScript Skills?
          </h2>
          <p className="text-gray-400 mb-8">
            Start your learning journey today and join our community of developers.
          </p>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold flex items-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all mx-auto"
            onClick={() => window.open('https://github.com/harshsrivastva97/javascript-handbook', '_blank')}
          >
            Begin Your Journey <FaRocket />
          </button>
        </div>

        {/* Explore Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Explore More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exploreSections.map((section, index) => (
              <div
                key={section.title}
                className="p-6 rounded-xl bg-gray-800 hover:bg-gray-750 transition-all"
              >
                <div className="text-3xl mb-4 text-purple-500">{section.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
                <p className="text-gray-400 mb-4">{section.description}</p>
                <button
                  className="text-purple-500 hover:text-purple-400 transition-colors font-semibold flex items-center gap-2"
                  onClick={() => navigate(section.link)}
                >
                  Learn More <FaRocket className="text-sm" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;