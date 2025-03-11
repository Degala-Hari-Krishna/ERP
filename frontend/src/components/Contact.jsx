import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./css/Contact.css";
import hero from "./images/vvit_drone_4k-min.jpeg";
import img1 from "./images/about1.jpeg";
import img2 from "./images/about2.jpg";

function Contact() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="contact_page">
      <Navbar />

      {/* Hero Section */}
      <div
        className="hero_section"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          position: "relative",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div className="overlay"></div>
        <div className="hero_quote">
          <p>Get in Touch</p>
          <p>We're Here to Help You</p>
        </div>
        <div className="hero_quote_border"></div>
        <div className="hero_info">
          <p>Have questions or need assistance? Reach out to us and we’ll be happy to assist you!</p>
        </div>
      </div>

      <h3 style={{ margin: "5rem auto 2rem auto" }}>Register Now !</h3>

      <div className="contact_content">
        <div className="contact_images" data-aos="fade-right">
          <img src={img1} alt="Campus 1" />
          <img src={img2} alt="Campus 2" />
        </div>

        {/* Contact Form with FormSubmit */}
        <form action="https://formsubmit.co/harikrishna69322@gmail.com" method="POST" className="contact_form" data-aos="fade-left">
          <div className="form_group">
            <div className="form_field">
              <label>Full Name</label>
              <input type="text" name="name" placeholder="Enter Full Name" required />
            </div>
            <div className="form_field">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="Enter Your Email" required />
            </div>
          </div>

          <div className="form_group">
            <div className="form_field">
              <label>Contact Number</label>
              <input type="tel" name="phone" placeholder="Enter Phone Number" required />
            </div>
            <div className="form_field">
              <label>Gender</label>
              <select name="gender" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form_group">
            <div className="form_field">
              <label>Country</label>
              <input type="text" name="country" placeholder="Enter Country" required />
            </div>
            <div className="form_field">
              <label>Pin Code</label>
              <input type="text" name="pincode" placeholder="Enter Pin Code" required />
            </div>
          </div>

          <div className="form_group">
            <div className="form_field">
              <label>Program Type</label>
              <select name="program_type" required>
                <option value="">Select Program Type</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
            <div className="form_field">
              <label>Program</label>
              <select name="program" required>
                <option value="">Select Program</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
              </select>
            </div>
          </div>

          <div className="form_group">
            <div className="form_field full_width">
              <label>Message</label>
              <textarea name="message" placeholder="Enter your message" required></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit_btn">Submit</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
