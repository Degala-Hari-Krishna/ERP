import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import aboutUsImage from "./images/VVITFellows.jpg";
import "./css/About.css";
import hero from "./images/vvit_drone_4k-min.jpeg";

function AboutUs() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
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
          <p>Discover Our Legacy</p>
          <p>Empowering Future Innovators</p>
        </div>
        <div className="hero_quote_border"></div>
        <div className="hero_info">
          <p>
            VVIT is dedicated to providing high-quality education and fostering innovation in science and technology.
          </p>
        </div>
      </div>
      
      <div className="about_section" data-aos="fade-up">
        <img src={aboutUsImage} alt="About VVIT" className="about_image" />
        <div className="about_text">
          <h2>About VVIT</h2>
          <p>
            Vasireddy Venkatadri Institute of Technology (VVIT) was established in 2007 under the Social Educational Trust
            in Nambur village, Guntur, AP. Founded by Er. Vasireddy Vidya Sagar, VVIT has rapidly grown to become one of the
            top engineering colleges affiliated with JNTU Kakinada.
          </p>
          <p>
            With over 6000 students and highly experienced faculty, VVIT offers a wide range of B.Tech and M.Tech programs
            and has strong industry collaborations with companies like Infosys, Tech Mahindra, and Google Inc.
          </p>
        </div>
      </div>
      
      <div className="mission_vision" data-aos="fade-up">
        <h2>Our Mission & Vision</h2>
        <div className="mission_vision_content">
          <div className="mission">
            <h3>Our Mission</h3>
            <p>
              To provide a transformative learning experience that empowers students with knowledge, skills, and
              ethical values to contribute to society.
            </p>
          </div>
          <div className="vision">
            <h3>Our Vision</h3>
            <p>
              To be recognized globally as a premier institution for engineering education, fostering innovation
              and research excellence.
            </p>
          </div>
        </div>
      </div>
      
      <div className="values" data-aos="fade-up">
        <h2>Why Choose VVIT?</h2>
        <ul>
          <li>Accredited with NAAC 'A' Grade & NBA Certified Programs</li>
          <li>Strong Industry Tie-ups with Infosys, Google, and More</li>
          <li>State-of-the-Art Research Facilities and Patents</li>
          <li>Highly Qualified Faculty & Student-Centric Learning</li>
          <li>Exceptional Placement Record with Top MNCs</li>
        </ul>
      </div>
      
      <Footer />
    </div>
  );
}

export default AboutUs;
