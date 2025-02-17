import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/");
    }
  }, [navigate]);


  const handleSignOut = () => {
    localStorage.removeItem("currentUser"); 
    navigate("/"); 
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h5">Profile</Typography>
          <Typography variant="body1"><strong>Users Name:</strong> {user.firstName}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
          <Button variant="contained" color="secondary" onClick={handleSignOut} style={styles.button}>
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// internal-Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f3f3f3",
  },
  card: {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    textAlign: "center",
  },
  button: {
    marginTop: "15px",
  },
};

export default Profile;
