import { FaBook, FaLaptopCode, FaBrain, FaNewspaper, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { BsLightningCharge, BsBookHalf, BsThreeDots } from "react-icons/bs";

export const FEATURES = [
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

export const EXPLORER_SECTIONS = [
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

export const STATUS_ICONS = {
    COMPLETED: <FaCheckCircle />,
    IN_PROGRESS: <BsThreeDots />,
    PENDING: <FaRegCircle />
};

export const STATUS_LABELS = {
    COMPLETED: 'Mastered',
    IN_PROGRESS: 'Learning',
    PENDING: 'To Learn'
};