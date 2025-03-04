import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux';
import { FaBook, FaCode, FaRocket, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Home.scss';
import { getAllTopics } from "../../redux/slices/topicsSlice";
import { getUserProgress, updateTopicStatus } from "../../redux/slices/userProgressSlice";
import { TopicSchema } from "../../api/types/topicTypes";
import { FEATURES, exploreSections } from './constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.userData.user);
  const topics = useAppSelector((state: RootState) => state.topicsData.topics);
  const userProgress = useAppSelector((state: RootState) => state.userProgressData.progress);

  useEffect(() => {
    dispatch(getAllTopics());
  }, [dispatch]);

  useEffect(() => {
    if (user?.user_id) {
      dispatch(getUserProgress(user.user_id));
    }
  }, [user?.user_id, dispatch]);

  const calculateProgress = () => {
    if (!topics?.length) return 0;
    const completed = topics.filter((topic: TopicSchema) => topic.status === "COMPLETED").length;
    return Math.round((completed / topics.length) * 100);
  };

  const handleStatusChange = (topicId: number, currentStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED') => {
    if (!user?.user_id) return;

    let newStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    switch (currentStatus) {
      case 'PENDING':
        newStatus = 'IN_PROGRESS';
        break;
      case 'IN_PROGRESS':
        newStatus = 'COMPLETED';
        break;
      case 'COMPLETED':
        newStatus = 'PENDING';
        break;
      default:
        newStatus = 'PENDING';
    }

    try {
      dispatch(updateTopicStatus({
        user_id: user.user_id,
        topic_id: topicId.toString(),
        status: newStatus
      }));
    } catch (error) {
      console.error('Error updating topic status:', error);
    }
  };

  const navigateToConcept = (topicId: number) => {
    navigate(`/read?conceptId=${topicId}`);
  };

  const navigateToCodeVault = (topicId: number) => {
    navigate(`/practice?concept=${topicId}`);
  };

  return (
    <div className="home scrollable min-h-screen pt-10 pb-20">
      <div className="hero flex flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Your Journey to JavaScript Mastery
          </h1>
          <p className="text-lg text-secondary max-w-2xl mb-8">
            Master JavaScript through interactive learning, comprehensive documentation,
            and hands-on coding exercises. Join thousands of developers on their path to excellence.
          </p>
          <div className="flex gap-4">
            <button className="primary-button px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all" onClick={() => navigate('/read')}>
              Start Learning <FaRocket />
            </button>
            <button className="secondary-button px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all" onClick={() => navigate('/practice')}>
              Explore Code Vault <FaCode />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="feature-card p-6 rounded-xl transition-all"
              >
                <div className="text-3xl mb-4 accent-icon">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              Your Learning Journey
            </h2>
            <p className="text-secondary">Track your progress through essential JavaScript concepts</p>
          </div>

          <div className="rounded-xl p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Progress Section */}
              <div className="lg:w-64 flex flex-col items-center justify-center p-4 progress-border">
                <div className="w-48 mb-4">
                  <CircularProgressbar
                    value={calculateProgress()}
                    text={`${calculateProgress()}%`}
                    styles={buildStyles({
                      pathColor: `var(--accent-primary)`,
                      textColor: 'var(--text-primary)',
                      trailColor: 'var(--border-color)',
                      pathTransitionDuration: 0.5
                    })}
                  />
                </div>
                <p className="text-secondary text-center font-medium">Overall Progress</p>
                <p className="text-sm text-secondary text-center mt-2">
                  {topics?.filter(topic => topic.status === "COMPLETED").length} of {topics?.length} concepts mastered
                </p>
              </div>

              <div className="flex-grow">
                <div className="overflow-hidden">
                  <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
                    <table className="w-full">
                      <thead className="sticky top-0 z-10">
                        <tr className="text-secondary table-header border-b z-10">
                          <th className="text-left py-3 px-4 font-semibold">Topic</th>
                          <th className="text-left py-3 px-4 font-semibold">Status</th>
                          <th className="text-left py-3 px-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
                        {topics?.map((topic: TopicSchema) => {
                          const topicStatus = topic.status || 'PENDING';
                          return (
                            <tr key={topic.topic_id} className="table-row transition-colors">
                              <td className="py-4 px-4 text-primary">{topic.title}</td>
                              <td className="py-4 px-4">
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleStatusChange(topic.topic_id, topicStatus)}
                                >
                                  <div className={`text-xl ${topicStatus === 'COMPLETED' ? 'status-completed' :
                                    topicStatus === 'IN_PROGRESS' ? 'status-in-progress' :
                                      'status-pending'
                                    }`}>
                                    {topicStatus === 'COMPLETED' && <FaCheckCircle />}
                                    {topicStatus === 'IN_PROGRESS' && <BsThreeDots />}
                                    {topicStatus === 'PENDING' && <FaRegCircle />}
                                  </div>
                                  <span className={`text-sm font-medium ${topicStatus === 'COMPLETED' ? 'status-completed' :
                                    topicStatus === 'IN_PROGRESS' ? 'status-in-progress' : 'text-secondary' }`}>
                                    {topicStatus === 'COMPLETED' && 'Mastered'}
                                    {topicStatus === 'IN_PROGRESS' && 'Learning'}
                                    {topicStatus === 'PENDING' && 'To Learn'}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex gap-3">
                                  <button
                                    className="p-2 read-button hover-button rounded-lg transition-colors"
                                    onClick={() => navigateToConcept(topic.topic_id)}
                                    data-tooltip-id={`readme-${topic.topic_id}`}
                                  >
                                    <FaBook />
                                  </button>
                                  <button
                                    className="p-2 practice-button hover-button rounded-lg transition-colors"
                                    onClick={() => navigateToCodeVault(topic.topic_id)}
                                    data-tooltip-id={`practice-${topic.topic_id}`}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-20 text-center py-16 px-4 rounded-xl cta-section">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Ready to Level Up Your JavaScript Skills?
          </h2>
          <p className="text-secondary mb-8">
            Start your learning journey today and join our community of developers.
          </p>
          <button
            className="primary-button px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all mx-auto"
            onClick={() => window.open('https://github.com/harshsrivastva97/javascript-handbook', '_blank')}
          >
            Begin Your Journey <FaRocket />
          </button>
        </div>

        {/* Explore Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Explore More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exploreSections.map((section) => (
              <div
                key={section.title}
                className="feature-card p-6 rounded-xl transition-all"
              >
                <div className="text-3xl mb-4 accent-icon">{section.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-2">{section.title}</h3>
                <p className="text-secondary mb-4">{section.description}</p>
                <button
                  className="explore-more-button font-semibold flex items-center gap-2"
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