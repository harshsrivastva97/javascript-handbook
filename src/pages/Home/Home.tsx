import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { updateTopicStatus } from '../../redux/slices/topicsDataMapSlice';
import { FaBook, FaCode, FaInfoCircle, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { listOfConcepts } from '../../data/concepts';
import { BsThreeDots } from "react-icons/bs";
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
    navigate(`/code-vault?concept=${conceptId}`);
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Master JavaScript Concepts and Level Up Your Coding Skills
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Enhance your JavaScript mastery through interactive learning, 
            build a solid foundation with core concepts, 
            and join a thriving community of developers.
          </motion.p>
        </div>
        <motion.div 
          className="progress-chart"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CircularProgressbar
            value={calculateProgress()}
            text={`${calculateProgress()}%`}
            styles={buildStyles({
              pathColor: '#646cff',
              textColor: '#ffffff',
              trailColor: '#2d2d2d',
            })}
          />
        </motion.div>
      </div>

      <motion.div 
        className="topics-table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
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
                  <td>{concept.title}</td>
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
      </motion.div>
    </div>
  );
};

export default Home;