import React, { useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FaBook, FaCode, FaRocket } from "react-icons/fa";
import 'react-circular-progressbar/dist/styles.css';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getAllTopics } from "../../redux/slices/topicsSlice";
import { updateTopicStatus } from "../../redux/slices/progressSlice";
import { TopicSchema } from "../../api/types/topicTypes";
import { FEATURES, EXPLORER_SECTIONS, STATUS_ICONS, STATUS_LABELS } from './homePageConstants';
import { ProgressStatus } from "../../constants/enums/progressStatus";
import { calculateProgress } from '../../utils/progressUtils';
import './Home.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.userData.user);
  const topics = useAppSelector(state => state.topicsData.topics);

  const progress = useMemo(() => calculateProgress(topics), [topics]);

  const handleStatusChange = async (topicId: number, currentStatus: ProgressStatus) => {
    if (!user?.user_id) return;

    const statusCycle: Record<string, ProgressStatus> = {
      PENDING: ProgressStatus.IN_PROGRESS,
      IN_PROGRESS: ProgressStatus.COMPLETED,
      COMPLETED: ProgressStatus.PENDING
    };

    const newStatus: ProgressStatus = statusCycle[currentStatus];

    try {
      await dispatch(updateTopicStatus({
        user_id: user.user_id,
        topic_id: topicId,
        status: newStatus,
        dispatch
      })).unwrap();
    } catch (error) {
      console.error('Error updating topic status:', error);
    }
  }

  const navigateToConcept = useCallback((topicId: number) => {
    navigate(`/read?conceptId=${topicId}`);
  }, [navigate]);

  const navigateToCodeVault = useCallback((topicId: number) => {
    navigate(`/practice?concept=${topicId}`);
  }, [navigate]);

  useEffect(() => {
    if (user?.user_id) {
      dispatch(getAllTopics(user.user_id));
    }
  }, [dispatch, user?.user_id]);

  const renderTopicRow = useCallback((topic: TopicSchema) => {
    const topicStatus: ProgressStatus = topic.status || ProgressStatus.PENDING;
    const statusClass = `status-${topicStatus.toLowerCase().replace('_', '-')}`;

    return (
      <tr key={topic.topic_id} className="table-row transition-colors">
        <td className="py-4 px-4 text-primary">{topic.title}</td>
        <td className="py-4 px-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleStatusChange(topic.topic_id, topicStatus)}
          >
            <div className={`text-xl ${statusClass}`}>
              {STATUS_ICONS[topicStatus]}
            </div>
            <span className={`text-sm font-medium ${statusClass}`}>
              {STATUS_LABELS[topicStatus]}
            </span>
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="flex gap-3">
            <button
              className="p-2 read-button hover-button rounded-lg transition-colors"
              onClick={() => navigateToConcept(topic.topic_id)}
              aria-label={`Read about ${topic.title}`}
            >
              <FaBook />
            </button>
            <button
              className="p-2 practice-button hover-button rounded-lg transition-colors"
              onClick={() => navigateToCodeVault(topic.topic_id)}
              aria-label={`Practice ${topic.title}`}
            >
              <FaCode />
            </button>
          </div>
        </td>
      </tr>
    );
  }, [handleStatusChange, navigateToConcept, navigateToCodeVault]);

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
            <button
              className="primary-button px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all"
              onClick={() => navigate('/read')}
              aria-label="Start Learning"
            >
              Start Learning <FaRocket />
            </button>
            <button
              className="secondary-button px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all"
              onClick={() => navigate('/practice')}
              aria-label="Explore Code Vault"
            >
              Explore Code Vault <FaCode />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <section className="mb-20">
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
        </section>

        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              Your Learning Journey
            </h2>
            <p className="text-secondary">Track your progress through essential JavaScript concepts</p>
          </div>

          <div className="rounded-xl p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-64 flex flex-col items-center justify-center p-4 progress-border">
                <div className="w-48 mb-4">
                  <CircularProgressbar
                    value={progress}
                    text={`${progress}%`}
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
                  {topics?.filter(topic => topic.status === ProgressStatus.COMPLETED).length} of {topics?.length} concepts mastered
                </p>
              </div>

              <div className="flex-grow">
                <div className="overflow-hidden">
                  <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
                    <table className="w-full">
                      <thead className="sticky top-0 z-10">
                        <tr className="text-secondary table-header border-b">
                          <th className="text-left py-3 px-4 font-semibold">Topic</th>
                          <th className="text-left py-3 px-4 font-semibold">Status</th>
                          <th className="text-left py-3 px-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
                        {topics?.map(renderTopicRow)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 text-center py-16 px-4 rounded-xl cta-section">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Level Up Your JavaScript Skills?
          </h2>
          <p className="mb-8">
            Start your learning journey today and join our community of developers.
          </p>
          <button
            className="primary-button px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all mx-auto"
            onClick={() => window.open('https://github.com/harshsrivastva97/javascript-handbook', '_blank')}
            aria-label="Begin Your Journey"
          >
            Begin Your Journey <FaRocket />
          </button>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Explore More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXPLORER_SECTIONS.map((section) => (
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
                  aria-label={`Learn more about ${section.title}`}
                >
                  Learn More <FaRocket className="text-sm" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;