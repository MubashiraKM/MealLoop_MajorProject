import "./Ending_footer.css";

function Ending_footer() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services_section");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="Ending_footer">
      <div className="image">
        {/* <img src="zerobin3.png" id="zerobin" alt="Food bucket illustration" /> */}
        <button id="explore" onClick={scrollToServices}>
          Explore MealLoop
        </button>
      </div>
      <div className="link">
        {/* <a id="quick_links">Quick links</a> */}
      </div>
    </div>
  );
}

export default Ending_footer;
