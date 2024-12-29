import React, { useState } from 'react';
import './Exercises.scss';

interface Exercise {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  link?: string;
}

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([
    { 
      id: 1, 
      title: 'FizzBuzz Implementation', 
      difficulty: 'Easy',
      completed: false,
      link: 'https://example.com/fizzbuzz'
    },
    { 
      id: 2, 
      title: 'Binary Search Tree', 
      difficulty: 'Medium',
      completed: false,
      link: 'https://example.com/bst'
    },
    { 
      id: 3, 
      title: 'Implement Promise.all()', 
      difficulty: 'Hard',
      completed: false
    },
    // Add more exercises as needed
  ]);

  const handleComplete = (exerciseId: number) => {
    setExercises(exercises.map(exercise => 
      exercise.id === exerciseId ? { ...exercise, completed: !exercise.completed } : exercise
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'difficulty-easy';
      case 'Medium': return 'difficulty-medium';
      case 'Hard': return 'difficulty-hard';
      default: return '';
    }
  };

  const calculateProgress = () => {
    const completedCount = exercises.filter(exercise => exercise.completed).length;
    return (completedCount / exercises.length) * 100;
  };

  return (
    <div className="exercises-container">
      <h1>Coding Exercises</h1>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${calculateProgress()}%` }}
        />
        <span className="progress-text">
          {Math.round(calculateProgress())}% Completed
        </span>
      </div>
      
      <div className="exercises-grid">
        {exercises.map(exercise => (
          <div key={exercise.id} className={`exercise-card ${exercise.completed ? 'completed' : ''}`}>
            <div className="card-header">
              <span className={`difficulty-badge ${getDifficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty}
              </span>
              <input
                type="checkbox"
                checked={exercise.completed}
                onChange={() => handleComplete(exercise.id)}
                className="complete-checkbox"
              />
            </div>
            <h3>{exercise.title}</h3>
            <div className="card-actions">
              {exercise.link ? (
                <a href={exercise.link} target="_blank" rel="noopener noreferrer" className="solve-button">
                  Solve Exercise
                </a>
              ) : (
                <button className="contribute-button" onClick={() => window.open('https://github.com/yourusername/yourrepo', '_blank')}>
                  Contribute
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises; 