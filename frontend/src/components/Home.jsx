import { useEffect, useState } from "react";
import {
  FaLaptopCode,
  FaMicrochip,
  FaDatabase,
  FaDraftingCompass,
  FaCogs,
  FaGraduationCap,
  FaRobot,
  FaBrain,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import about_us from "./images/VVITFellows.jpg";
import "./css/Home.css";
import Navbar from "./Navbar";
import hero from "./images/vvit_drone_4k-min.jpeg";
import Aos from "aos";
import "aos/dist/aos.css";
import Google from "./images/google-logo.png";
import Goldmann from "./images/goldmann-sacs-logo.png";
import Amazon from "./images/amazon-logo.png";
import Microsoft from "./images/microsoft-logo.png";
import Salesforce from "./images/salesforce-logo.png";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]); // Store faculty feedback
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contactus");
  };

  useEffect(() => {
    Aos.init();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fetch faculty feedback reviews
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getFeedback");
        setFeedbackList(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        className="hero_section"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="overlay"></div>
        <div className="hero_quote">
          <p>Dream Big, Achieve More.</p>
          <p>Start Your Career Journey</p>
        </div>
        <div className="hero_quote_border"></div>
        <div className="hero_info">
          <p>
            VVIT is one of the best engineering colleges in the Telugu-speaking
            states.
          </p>
        </div>
        <button className="contact_button" onClick={handleClick}>
          Start Your Journey Now
        </button>
      </div>

      <div className="companies">
        <h2>Our top companies</h2>
        <div>
          <img src={Google} alt="Google Logo" />
          <img src={Microsoft} alt="Microsoft Logo" />
          <img src={Salesforce} alt="Salesforce Logo" />
          <img src={Amazon} alt="Amazon Logo" />
          <img src={Goldmann} alt="Goldmann Sacs" />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          padding: "2rem",
          marginTop: "4rem",
        }}
      >
        <img
          src={about_us}
          alt="About Us"
          style={{ width: "30rem", borderRadius: "5px" }}
        />
        <div
          style={{
            width: "45%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <h1>Absolute Discipline</h1>
          <h1>Absolute Education</h1>
          <p style={{ fontSize: "large" }}>
            To impart quality education through exploration and experimentation
            and generate socially-conscious engineers, embedding ethics and
            values, for the advancement in science and technology.
          </p>
          <p style={{ fontWeight: 700 }}>Want to know more about Us?</p>
          <a href="/about" style={{ textDecoration: "none", color: "white" }}>
            <button className="about_button">About Us</button>
          </a>
        </div>
      </div>

      {/* Departments Section */}
      <div className="departments">
        <h2>Departments We Offer</h2>
        <div className="department-list">
          <div className="department">
            <FaLaptopCode size={50} />
            <p>Computer Science</p>
          </div>
          <div className="department">
            <FaMicrochip size={50} />
            <p>Electronics & Communication</p>
          </div>
          <div className="department">
            <FaDatabase size={50} />
            <p>Information Technology</p>
          </div>
          <div className="department">
            <FaDraftingCompass size={50} />
            <p>Civil Engineering</p>
          </div>
          <div className="department">
            <FaCogs size={50} />
            <p>Mechanical Engineering</p>
          </div>
          <div className="department">
            <FaBrain size={50} />
            <p>Artificial Intelligence & Data Science</p>
          </div>
          <div className="department">
            <FaRobot size={50} />
            <p>Artificial Intelligence & Machine Learning</p>
          </div>
          <div className="department">
            <FaGraduationCap size={50} />
            <p>M.Tech</p>
          </div>
        </div>
      </div>

      {/* Faculty Feedback Section */}
      <div className="reviews">
        <h2>Faculty Feedback</h2>
        <div className="review-list">
          {feedbackList.length === 0 ? (
            <p className="no-feedback">No feedback available.</p>
          ) : (
            feedbackList.map((feedback, index) => (
              <div key={index} className="review">
                <p>{feedback.comment}</p>
                <div className="reviewer">
                  <strong>- {feedback.studentName}</strong>
                  <div className="stars">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
