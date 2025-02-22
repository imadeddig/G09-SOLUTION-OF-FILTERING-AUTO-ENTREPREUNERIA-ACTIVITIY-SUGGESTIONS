import React, { useState, useEffect } from "react";
import logo from "./assets/logo1 1.png"; 
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { activityService } from '../src/services/api';

const Check = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    redundantCount: 0,
    declinedCount: 0,
    toReviewCount: 0
  });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch counts and activities
        const [countData, activitiesData] = await Promise.all([
          activityService.getActivityCounts(),
          activityService.getReviewActivities()
        ]);
        
        console.log('Activities data received:', activitiesData); // Add this log
        
        setCounts(countData);
        // Ensure activitiesData is an array
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setActivities([]); // Set empty array on error
      }
    };
  
    fetchData();
  }, []);

  const handleActivityClick = (activityId) => {
    navigate(`/activity/${activityId}`, { 
      state: { filterType: 'to_review' }
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Header section - keeping original styling */}
      <div
        style={{
          position: "absolute",
          zIndex: 3,
          width: "calc(100% - 40px)",
          height: "13%",
          backgroundColor: "rgb(9,68, 57)",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ maxWidth: "200px", height: "auto" }}
        />

        <div style={{display: "flex", gap: "20px" }}>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "start",
          gap: "10px",
          padding: "20px",
          top: "100px",
          width: "100%"
        }}
      >
        <h1
          style={{
            width: "90%",
            color: "black",
            fontSize: "40px",
            fontWeight: "700",
            style: " italic"
          }}
        >
          You have <span style={{ style: " italic", color: "rgba(0, 158, 128, 1)" }}>{counts.redundantCount}</span> redundant
          activities, <span style={{ style: " italic", color: "rgba(0, 158, 128, 1)" }}>{counts.declinedCount}</span> declined
          activities, and <span style={{ style: " italic", color: "rgba(0, 158, 128, 1)" }}>{counts.toReviewCount}</span> activities
          for you to check.
        </h1>

        <h1
          style={{
            width: "80%",
            color: "black",
            fontSize: "35px",
            fontWeight: "700",
            fontStyle: "italic",
            textAlign: "right",
            direction: "rtl",
          }}
          >
          لديك{" "}
          <span style={{ fontStyle: "italic", color: "rgba(0, 158, 128, 1)" }}>
          {counts.redundantCount}
          </span>{" "}
          نشاطًا زائدًا عن الحاجة، وتم رفض{" "}
          <span style={{ fontStyle: "italic", color: "rgba(0, 158, 128, 1)" }}>
          {counts.declinedCount}
          </span>{" "}
          منها الأنشطة و{" "}
          <span style={{ fontStyle: "italic", color: "rgba(0, 158, 128, 1)" }}>
          {counts.toReviewCount}
          </span>{" "}
          نشاطًا لتتمكن من التحقق منها.
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
              padding: "15px 60px",
              fontSize: "18px",
              fontWeight: "600",
              color: "rgba(0,158, 128,1)",
              backgroundColor: "transparent",
              border: "4px solid rgba(0,158, 128,1)",
              borderRadius: "73px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/redundant")}
          >
            Redundant
          </button>

          <button
            style={{
              width: "400",
              height: "100",
              padding: "15px 60px",
              fontSize: "18px",
              fontWeight: "600",
              color: "rgba(0,158, 128,1)",
              backgroundColor: "transparent",
              border: "4px solid rgba(0,158, 128,1)",
              borderRadius: "73px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/declined")}
          >
            Declined
          </button>

          <button
            style={{
              width: "400",
              height: "100",
              padding: "15px 60px",
              fontSize: "18px",
              fontWeight: "600",
              color: "white",
              backgroundColor: "rgba(0,158, 128,1)",
              border: "none",
              cursor: "pointer",
              borderRadius: "73px",
              marginRight: "10px"
            }}
            onClick={() => navigate("/to-review")}
          >
            To Review
          </button>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "33px",
          width: "80%",
          margin: "auto",
          padding: "20px",
        }}>
          {activities.map((activity) => (
            <div key={activity.id} style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h2
                style={{
                  margin: "10px 0",
                  color: "rgba(0,158, 128,1)",
                  fontSize: "20px",
                  fontWeight: "500",
                  textAlign: "left",
                }}
              >
                {activity.code_pro}
              </h2>

              <div
                style={{
                  display: "flex",
                  gap: "30px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    margin: "10px 0",
                    color: "grey",
                    fontSize: "20px",
                    fontWeight: "450",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FaUser style={{ color: "grey" }} /> Ahsatal Imad Eddine
                </h2>

                <h2
                  style={{
                    margin: "10px 0",
                    color: "grey",
                    fontSize: "20px",
                    fontWeight: "450",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FaMapMarkerAlt style={{ color: "grey" }} /> {activity.wilaya}
                </h2>
              </div>

              <h1
                style={{
                  margin: "10px 0",
                  color: "black",
                  fontSize: "24px",
                  fontWeight: "600",
                  textAlign: "left",
                }}
              >
                {activity.activity}
              </h1>

              <button
                onClick={() => handleActivityClick(activity.id)}
                style={{
                  color: "rgba(0,158, 128,1)",
                  textDecoration: "underline",
                  fontSize: "20px",
                  fontWeight: "500",
                  background: "none",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                See Details / مزيد من التفاصيل
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Check;