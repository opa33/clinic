import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WelcomeScreen from "./components/screens/WelcomeScreen/page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WelcomeScreen />
  </StrictMode>
);
