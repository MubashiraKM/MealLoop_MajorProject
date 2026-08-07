import "./Choose_us_section.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";  
// removed faCalendarDays since unused

function Choose_us_section() {
    return (
        <div className="Choose_us_section">
            <div className="title2">
                <p className="our_services">Why Choose Us</p>
            </div>
            <div className="list2">
                {/* First Card */}
                <Card 
                    sx={{ 
                        maxWidth: 265, 
                        height: 310, 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        padding: 2 ,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        backgroundColor:"#baa59dff",
                        "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0px 10px 30px #392924ff", // adds a bigger shadow
                        cursor: "pointer",}
                    }}
                >
                    <FontAwesomeIcon 
                        icon={faEarthAmericas} 
                        style={{ color: "#392924ff", fontSize: "70px", marginTop: "20px", marginBottom: "15px" }} 
                    />
                    
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center" color="#392924ff" fontWeight={700}>
                            Eco Friendly
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#392924ff" }} align="center">
                            Our website reduces food waste and supports eco-friendly living through tracking, recipes, donation, and composting.
                        </Typography>
                    </CardContent>
                </Card>

                {/* Second Card */}
                <Card 
                    sx={{ 
                        maxWidth: 265, 
                        height: 310, 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        padding: 2 ,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        backgroundColor:"#baa59dff",
                        "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0px 10px 30px #392924ff", // adds a bigger shadow
                        cursor: "pointer",}
                    }}
                >
                    <FontAwesomeIcon 
                        icon={faClipboardCheck} 
                        style={{ color: "#392924ff", fontSize: "70px", marginTop: "20px", marginBottom: "15px" }} 
                    />
                    
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center" color="#392924ff" fontWeight={700}>
                            Reliable
                        </Typography>
                        <Typography variant="body2" sx={{ color:"#392924ff" }} align="center">
                            Our website is reliable as it gives accurate expiry tracking, helpful recipes, and trusted food management features.
                        </Typography>
                    </CardContent>
                </Card>

                <div className="choose_us_image"><img src="tree_img_2.png" id="food_image2" alt="Food bucket illustration"></img></div>
            </div>
        </div>
    );
}

export default Choose_us_section;
