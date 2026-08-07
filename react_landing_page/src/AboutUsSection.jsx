import React from "react";
import "./AboutUsSection.css";

const developers = [
  { name: "Mubashira K.M", role: "Lead Developer", img: "mubashira_avatar.jpg" },
  { name: "Mumtaz Begum", role: "Full-Stack Developer", img: "mumtaz_avatar.jpg" },
  { name: "N. Merlyn Sahana", role: "UI/UX Designer", img: "merlyn_avatar.jpg" },
  { name: "P. Shireen Naaz", role: "Backend Engineer", img: "shireen_avatar.jpg" },
];

const AboutUsSection = () => {
  return (
    <>
      {/* About Project Section */}
      <section className="about-container">
        <div className="about-header-row">
          <h2 className="about-title">ABOUT THE PROJECT</h2>
        </div>

        <div className="about-content">
          <div className="project-details">
            <p id="about_us_content">
              Our Smart Food Management and Waste Reduction System is designed to help individuals and communities reduce food waste through smart, sustainable solutions.
            </p>
            <p id="about_us_content">
              With four powerful features working together, our platform ensures that every ingredient is used wisely and nothing goes to waste:
            </p>
            <p id="about_us_content">
              <b>Food Expiry Tracking</b> – Get timely alerts before your food expires, helping you consume it on time and avoid waste.
            </p>
            <p id="about_us_content">
              <b>Food Donation</b> – Share excess food with nearby NGOs or shelters and make a positive impact in your community.
            </p>
            <p id="about_us_content">
              <b>Recipe Suggestions</b> – Discover creative recipes based on what’s already in your kitchen to reduce unused items.
            </p>
            <p id="about_us_content">
              <b>Compost Ideas</b> – Turn unavoidable food scraps into nutrient-rich compost to promote a greener environment.
            </p>
            <p id="about_us_content">
              Our mission is simple — to build a sustainable ecosystem where technology and responsibility work hand in hand to create a world with zero food waste.
            </p>
          </div>

          <div className="about-image">
            <img
              src="about_the_project_img_3.png"
              alt="Smart Food Management System"
              id="about_project_img"
            />
          </div>
        </div>
      </section>

      {/* ✅ Separate Full-Width About Us Section */}
      <section className="about-us-section">
        <div className="developer-section">
          <h2 className="developer-title">ABOUT US</h2>
          <p id="about_us_content_2">
            We are a passionate team of developers driven by innovation,
            creativity, and collaboration. With a shared vision of using
            technology to solve real-world problems, we combine our diverse skills
            in design, development, and problem-solving to build meaningful and
            impactful digital solutions. Our journey is guided by teamwork,
            curiosity, and a commitment to continuous learning, allowing us to
            turn ideas into practical, user-friendly applications. As aspiring
            Computer Science engineers in our 7th semester, we aim to not only
            enhance our technical expertise but also contribute to a future where
            technology empowers communities and promotes sustainable progress.
          </p>

          <div className="developer-grid">
            {developers.map((dev, index) => (
              <div className="developer-card" key={index}>
                <img src={dev.img} alt={dev.name} />
                <h4>{dev.name}</h4>
                <p>{dev.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsSection;
