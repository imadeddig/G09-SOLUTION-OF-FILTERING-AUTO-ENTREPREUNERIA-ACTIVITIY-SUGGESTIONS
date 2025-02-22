import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./AcceptancePage.css";
import logo from "./assets/logo1 1.png";

const ActivityAcceptancePage = () => {
  const [contactMethod, setContactMethod] = useState(null);
  const [contactValue, setContactValue] = useState("");

  const handleContactMethodChange = (method) => {
    setContactMethod(method);
    setContactValue(""); // Reset input value when switching methods
  };


  const getInputType = () => {
    return contactMethod === "email" ? "email" : "tel";
  };

  return (
    <div className="page-container">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <div>
              <img
                src={logo}
                alt="Logo"
                style={{ top: "50px", width: "200px", height: "auto" }}
              />
            </div>
          </div>
          <nav className="nav-menu">
            <a href="#" className="nav-link">
              Home
            </a>
            <a href="#" className="nav-link">
              Import Data
            </a>
            <a href="#" className="nav-link">
              See Pinned Activities
            </a>
          </nav>
        </div>
      </header>
      <div className="main-container">
        {/* Header */}

        {/* Activity Section */}
        <div className="activity-section">
          <p className="activity-title">
            Activity / نشاط :<span>مختص في تربية النحل</span>
          </p>

          <p className="inform-text">
            Inform Proposer Via/ابلغ مقدم العرض عبر:
          </p>

          <div className="button-group">
            
            <button
              className={`contact-button ${
                contactMethod === "email" ? "active" : ""
              }`}
              onClick={() => handleContactMethodChange("email")}
            >
              Email
            </button>
            <button
              className={`contact-button ${
                contactMethod === "phone" ? "active" : ""
              }`}
              onClick={() => handleContactMethodChange("phone")}
            >
              Phone Number
            </button>
          </div>

          {/* Acceptance Message Card */}
          <div className="acceptance-card">
            <div className="card-content">
              <p>
                <strong>
                  Congratulations! Your Activity Proposal has been Accepted 🎉
                </strong>
              </p>
              <p>Dear [Name],</p>
              <p>
                We are pleased to inform you that your proposed activity,
                [Activity Name], has been accepted! 🎉
              </p>
              <p>
                Your idea stood out, and we are excited to see it come to life.
                Please let us know if you need any support in preparing for the
                next steps. We will be in touch soon with further details
                regarding logistics and implementation.
              </p>
              <p>Looking forward to working together on this!</p>
              <p>Best regards,</p>
              <p>[Your Name]</p>
              <p>[Your Position]</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="button-group" style={{ marginTop: "24px" }}>
            <button
              className="button-primary"
              disabled={!contactMethod || !contactValue}
            >
              Send
            </button>
            <button className="button-secondary back-button">
              <ArrowLeft size={16} />
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityAcceptancePage;
