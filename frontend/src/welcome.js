import React from "react";
import backgroundImage from "./assets/entrepreneur.png";
import logo from "./assets/logo1 1.png";
import { useNavigate } from "react-router-dom";
const WelcomePage = () => {
    const navigate = useNavigate();
  return (


    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        margin: "0",
        padding: "0",
        position: "absolute",
        top: "0",
        left: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}




    >

   

      <div
        style={{
          position: "absolute",
          top: "0px",
         
          zIndex: 3,
          width:"calc(100% - 20px)",
          height:"13%",
          backgroundColor:"rgba(5, 46, 6, 0.4)",
        
        }}
      >
        <img src={logo} alt="Logo" style={{ position: 'absolute', top:"10px", left:'50px',width: "200px", height: "auto" }} />
      </div>


      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(5, 46, 6, 0.35)",
          backdropFilter: "blur(0.5px)"
        }}
      />

      <div
        style={{
          position: "absolute",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "35px",
            fontWeight: "600",
          }}
        >
          Activity Filter for Activities
        </h1>

        <h1
          style={{
            color: "white",
            fontSize: "60px",
            fontWeight: "700",
            marginTop: "-30px",
          }}
        >
          Welcome Back, Admin
        </h1>


        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "10px",
          }}
        >

          <button
            style={{
              width: "400",
              height: "100",
              padding: "20px 45px",
              fontSize: "18px",
              fontWeight: "600",
              color: "white",
              backgroundColor: "transparent",
              border: "4px solid white",
              borderRadius: "73px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/redundant")}
          >

            See Activities
          </button>
        </div>
      </div>


    </div>
  );
};

export default WelcomePage;
