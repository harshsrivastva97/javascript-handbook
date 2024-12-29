import React, { useState } from 'react';
import './Concepts.scss';

interface Concept {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Core' | 'ES6+' | 'Async' | 'DOM' | 'Performance' | 'Design Patterns';
  estimatedTime: string;
  prerequisites: string[];
  link: string;
}

const Concepts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const concepts: Concept[] = [
    {
      id: 1,
      title: 'Closures in JavaScript',
      description: 'Understanding lexical scope and the power of closures in JavaScript. Learn how closures enable data privacy and state preservation.',
      difficulty: 'Intermediate',
      category: 'Core',
      estimatedTime: '20 min',
      prerequisites: ['Functions', 'Scope', 'Variables'],
      link: 'https://example.com/closures'
    },
    {
      id: 2,
      title: 'Async/Await Pattern',
      description: 'Master asynchronous programming with the modern async/await syntax. Learn how to write cleaner asynchronous code.',
      difficulty: 'Intermediate',
      category: 'Async',
      estimatedTime: '25 min',
      prerequisites: ['Promises', 'Callbacks', 'Event Loop'],
      link: 'https://example.com/async-await'
    }
  ];

  const categories = ['all', 'Core', 'ES6+', 'Async', 'DOM', 'Performance', 'Design Patterns'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredConcepts = concepts.filter(concept => {
    const categoryMatch = selectedCategory === 'all' || concept.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || concept.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': return 'difficulty-beginner';
      case 'Intermediate': return 'difficulty-intermediate';
      case 'Advanced': return 'difficulty-advanced';
      default: return '';
    }
  };

  return (
    <div className="concepts-container">
      <h1>JavaScript Concepts</h1>
      
      <div className="filters">
        <div className="filter-group">
          <label>Category:</label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Difficulty:</label>
          <select 
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="concepts-grid">
        {filteredConcepts.map(concept => (
          <a 
            key={concept.id}
            href={concept.link}
            target="_blank"
            rel="noopener noreferrer"
            className="concept-card"
          >
            <div className="card-content">
              <div className="card-header">
                <span className={`difficulty-badge ${getDifficultyColor(concept.difficulty)}`}>
                  {concept.difficulty}
                </span>
                <span className="category-badge">
                  {concept.category}
                </span>
              </div>
              
              <h2>{concept.title}</h2>
              <p>{concept.description}</p>
              
              <div className="concept-meta">
                <span className="time">
                  <i className="far fa-clock"></i> {concept.estimatedTime}
                </span>
              </div>

              <div className="prerequisites">
                <h4>Prerequisites:</h4>
                <div className="prerequisite-tags">
                  {concept.prerequisites.map(prereq => (
                    <span key={prereq} className="prerequisite-tag">
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Concepts; 