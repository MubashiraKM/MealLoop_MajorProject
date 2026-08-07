import "./Main_section.css";

function Main_section() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services_section");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

   const handleLogout = () => {
    // Replace this with your logout logic, e.g., redirect or API call
    window.location.href = "http://localhost:8000/logout"; 
  };

  return (
    <div className="Main_section">
      <img src="meal_loop_main_page_2.png" id="food_image" alt="Food banner" />
      
       <button className="logout_button" onClick={handleLogout}>
        Logout
      </button>
      
      <div className="button_container">
        <button className="main_button" onClick={scrollToServices}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Main_section;
