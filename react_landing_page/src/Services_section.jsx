import "./Services_section.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faHandHoldingHeart, faKitchenSet, faRecycle } from "@fortawesome/free-solid-svg-icons";

function Services_section() {
    return (
        <div className="Services_section" id="services_section">
            <div className="title">
                <p className="our_services">Our Services</p>
            </div>

            <div className="list">

                {/* Food Expiry Tracking Card */}
                <Card
                    sx={{
                        maxWidth: 290,
                        height: 360,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 2,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        backgroundColor:"#4c3730ff",
                        "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: "0px 10px 30px #6b4d43",
                            cursor: "pointer",
                        },
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCalendarDays}
                        style={{ color: "#efe7dc", fontSize: "70px", marginTop: "20px", marginBottom: "10px" }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center" color="#efe7dc">
                            Food Expiry Tracking
                        </Typography>
                        <Typography variant="body2" sx={{ color:"#efe7dc" }} align="center" >
                            Keep track of your food items and get timely alerts 
                            before they expire to reduce waste, save money and 
                            Stay organized.
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button
                            size="small"
                            sx={{ width: "140px", height: "35px", color: "#6b4d43", backgroundColor: "#efe7dc", fontWeight:700 }}
                            onClick={() => window.location.href = "http://localhost:8000/tracker_dash"}
                        >
                            Explore
                        </Button>
                    </CardActions>
                </Card>

                {/* Food Donation Card */}
                <Card
                    sx={{
                        maxWidth: 278,
                        height: 360,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 2,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        backgroundColor:"#4c3730ff",
                        "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: "0px 10px 30px #6b4d43",
                            cursor: "pointer",
                        },
                    }}
                >
                    <FontAwesomeIcon
                        icon={faHandHoldingHeart}
                        style={{ color: "#efe7dc", fontSize: "70px", marginTop: "20px", marginBottom: "10px" }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center" color="#efe7dc">
                            Food Donation
                        </Typography>
                        <Typography variant="body2" sx={{color:"#efe7dc"}} align="center">
                            Easily donate surplus food to nearby charities and organizations,
                            helping those in need while minimizing waste.
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button
                            size="small"
                            sx={{ width: "140px", height: "35px", color: "#6b4d43",  backgroundColor: "#efe7dc", fontWeight:700}}
                            onClick={() => window.location.href = "http://localhost:8000/donation"}
                        >
                            Explore
                        </Button>
                    </CardActions>
                </Card>

                {/* Recipe Suggestions Card */}
                <Card
                    sx={{
                        maxWidth: 278,
                        height: 360,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 2,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        backgroundColor:"#4c3730ff",
                        "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: "0px 10px 30px #6b4d43",
                            cursor: "pointer",
                        },
                    }}
                >
                    <FontAwesomeIcon
                        icon={faKitchenSet}
                        style={{ color: "#efe7dc", fontSize: "70px", marginTop: "20px", marginBottom: "10px" }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center" color="#efe7dc" >
                            Recipe Suggestions
                        </Typography>
                        <Typography variant="body2" sx={{ color:"#efe7dc" }} align="center">
                            Find creative recipes using ingredients you already have,
                             preventing food from going to waste.
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button
                            size="small"
                            sx={{ width: "140px", height: "35px",color: "#6b4d43",  backgroundColor: "#efe7dc", fontWeight:700 }}
                            onClick={() => window.location.href = "/recipe_suggestion/index.html"}
                        >
                            Explore
                        </Button>
                    </CardActions>
                </Card>

                {/* Compost Ideas Card */}
                <Card
                    sx={{
                        maxWidth: 278,
                        height: 360,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 2,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        backgroundColor:"#4c3730ff",
                        "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: "0px 10px 30px #6b4d43",
                            cursor: "pointer",
                        },
                    }}
                >
                    <FontAwesomeIcon
                        icon={faRecycle}
                        style={{ color: "#efe7dc", fontSize: "70px", marginTop: "20px", marginBottom: "10px" }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center" color="#efe7dc">
                            Compost Ideas
                        </Typography>
                        <Typography variant="body2" sx={{ color:"#efe7dc" }} align="center">
                            Discover eco-friendly ways to compost your food scraps and 
                            turn waste into nutrient-rich compost for your garden.
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button
                            size="small"
                            sx={{ width: "140px", height: "35px", color: "#6b4d43",  backgroundColor: "#efe7dc", fontWeight:700 }}
                            onClick ={() => window.location.href = "/compost_ideas/public/index.html"}
                        >   
                            Explore
                        </Button>
                    </CardActions>
                </Card>

            </div>
        </div>
    );
}

export default Services_section;
