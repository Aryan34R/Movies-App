import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const auth = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const currentUser = users.find((user) => user.email === uname);

    if (!currentUser) {
      alert("No user exists!");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    navigate("/dashboard");

  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Log In</h2>
        <form onSubmit={auth} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.footerText}>
          Didn't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f3f3f3",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  footerText: {
    marginTop: "10px",
    color: "#555",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;
