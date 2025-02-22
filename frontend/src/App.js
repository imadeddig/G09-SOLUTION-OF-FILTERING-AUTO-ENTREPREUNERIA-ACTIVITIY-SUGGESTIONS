import React from "react";
import { Routes, Route } from "react-router-dom";
import Redundant from "./redundant.js";
import Declined from "./declined";
import Check from "./check.js"
import ActivityProposal from "./ActivityProposal.js";
import ActivityDetailsPage from './ActivityProposal';
import ActivityAcceptancePage from "./AcceptancePage.js";
import WelcomePage from "./welcome.js";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/declined" element={<Declined />} />
      <Route path="/redundant" element={<Redundant />} />
      <Route path="/check" element={<Check />} />
      <Route path="/ActivityProposal" element={<ActivityProposal />} />
      <Route path="/ActivityAcceptancePage" element={<ActivityAcceptancePage />} />
      <Route path="/activity/:id" element={<ActivityDetailsPage />} />
    </Routes>
  );
};

export default App;
