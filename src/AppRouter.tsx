import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/screens/WelcomeScreen/page";
import AuthScreen from "./components/screens/AuthScreen/page";
import ConfirmScreen from "./components/screens/ConfirmScreen/page";
import HomeScreen from "./components/screens/HomeScreen/page";

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/auth" element={<AuthScreen />} />
      <Route path="/confirm" element={<ConfirmScreen />} />
      <Route path="/home" element={<HomeScreen />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
