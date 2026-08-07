import "./Footer.css";

function Footer()
{
    return(
        <div className="Footer">
            <div className="Footer_content">
                <div className="Footer_heading"><p id="heading">Get Started</p></div>
                <div className="Footer_data"><p id="content">Join MealLoop and start your journey toward a more sustainable lifestyle. Track your food, donate surplus, find recipes, and learn about composting today.</p></div>
            </div>
            <div className="Footer_image">
                <img src="meal_logo_without_bg_img.png" id="food_image2" alt="Food bucket illustration"></img>
            </div>
        </div>
        
    );
}
export default Footer;