import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCode, FaArrowRight } from "react-icons/fa";
import './Home.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const handleNavigation = (path: string) => () => navigate(path);

  return (
    <div className="home">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent-primary font-bold text-2xl flex items-center justify-center mb-5 animate-pulse shadow-lg shadow-primary/20">
              JS
            </div>
            <div className="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent-primary animate-[linear-progress_1.5s_ease-in-out_infinite]"></div>
            </div>
            <p className="text-xs text-gray-500 mt-4 animate-pulse">Loading amazing content...</p>
          </div>
        </div>
      ) : (
        <>
          <section className="hero-section relative pt-28 pb-20 overflow-hidden bg-gradient-to-b from-background to-background-secondary animate-[fade-in_0.8s_ease-in-out]">
            <div className="hero-background absolute inset-0">
              <div className="gradient-orb top-10 left-1/3 opacity-40"></div>
              <div className="gradient-orb bottom-1/4 right-10 opacity-30"></div>
            </div>
            <div className="noise-overlay absolute inset-0 opacity-5"></div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col items-center justify-between gap-12 max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                  Your One-Stop Hub for <span className="gradient-text">JavaScript</span> Mastery
                </h1>

                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                  No noise. No confusion.
                <div>
                  Just a clear, structured path to mastering JavaScript—start to expert.
                </div>
                </p>

                <div className="flex flex-wrap gap-5">
                  <button
                    className="primary-button px-8 py-4 rounded-full font-semibold flex items-center gap-3 bg-primary transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                    onClick={handleNavigation('/library')}
                  >
                    Learn by Topic
                    <span className="button-icon">
                      <FaArrowRight />
                    </span>
                  </button>
                  <button
                    className="secondary-button px-8 py-4 rounded-full font-semibold flex items-center gap-3 border border-gray-300 dark:border-gray-700 hover:bg-opacity-5 transition-all hover:-translate-y-0.5 duration-300"
                    onClick={handleNavigation('/arena')}
                  >
                    Take a Quiz
                    <span className="button-icon">
                      <FaCode />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;