import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { EXPLORER_SECTIONS } from "./homePageConstants";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => () => navigate(path);

  return (
    <main className="home">
      <section className="home__section home__hero">
        <div className="home__hero-grid">
          <div className="home__hero-content">
            <span className="home__badge">JavaScript Handbook</span>
            <h1 className="home__title">
              Build real <span className="home__accent">JavaScript</span> mastery
              with a guided path
            </h1>
            <p className="home__subtitle">
              Focused lessons, practical labs, and quick checks that help you
              grow from fundamentals to advanced topics without the noise.
            </p>
            <div className="home__actions">
              <button
                className="home__button home__button--primary"
                onClick={handleNavigation("/library")}
              >
                Start Learning
              </button>
              <button
                className="home__button home__button--secondary"
                onClick={handleNavigation("/quiz")}
              >
                Quick Quiz
              </button>
            </div>
            <div className="home__hero-meta">
              <div className="home__meta-item">
                <span className="home__meta-title">Structured tracks</span>
                <span className="home__meta-text">Clear progression</span>
              </div>
              <div className="home__meta-item">
                <span className="home__meta-title">Hands-on practice</span>
                <span className="home__meta-text">Real-world examples</span>
              </div>
              <div className="home__meta-item">
                <span className="home__meta-title">Fast feedback</span>
                <span className="home__meta-text">Short quizzes</span>
              </div>
            </div>
          </div>
          <div className="home__hero-panel">
            <h2 className="home__panel-title">Start with a clear path</h2>
            <p className="home__panel-text">
              Pick a track, practice with focused labs, and test your
              understanding in minutes.
            </p>
            <ul className="home__panel-list">
              <li>Foundations to modern JavaScript (ES6+)</li>
              <li>Browser APIs and real application patterns</li>
              <li>Practice challenges with quick feedback</li>
            </ul>
            <button
              className="home__button home__button--ghost"
              onClick={handleNavigation("/library")}
            >
              Explore the Library
            </button>
          </div>
        </div>
      </section>

      <section className="home__section home__explore">
        <div className="home__section-header home__section-header--wide">
          <div>
            <h2 className="home__section-title">Explore the learning hub</h2>
            <p className="home__section-subtitle">
              Choose where you want to start and move at your own pace.
            </p>
          </div>
          <button
            className="home__button home__button--ghost"
            onClick={handleNavigation("/library")}
          >
            View all topics
          </button>
        </div>
        <div className="home__explore-grid">
          {EXPLORER_SECTIONS.map((section) => (
            <button
              key={section.title}
              type="button"
              className="home__explore-card"
              onClick={handleNavigation(section.link)}
            >
              <div className="home__explore-card-top">
                <span className="home__card-icon">{section.icon}</span>
                <span className="home__explore-tag">Curated</span>
              </div>
              <h3 className="home__card-title">{section.title}</h3>
              <p className="home__card-text">{section.description}</p>
              <span className="home__explore-link">Open {section.title}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;