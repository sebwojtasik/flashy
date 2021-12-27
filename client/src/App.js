import "./App.css";
import Landing from "./pages/Landing/";
import Sidebar from "./modules/Sidebar";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import Deck from "./pages/Deck";
import { gql, useQuery } from "@apollo/client";
import LoadingScreen from "./common/components/LoadingScreen";
import DeckPracticeDue from "./pages/Deck/DeckPracticeDue";
import PracticeDue from "./pages/PracticeDue";
import LearnNew from "./pages/LearnNew";
import DeckLearnNew from "./pages/Deck/DeckLearnNew";
import SignUp from "./pages/SignUp";
import { useState } from "react";
import Navbar from "./modules/Navbar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const IS_AUTHENTICATED = gql`
    query isAuthenticated {
      isAuthenticated
    }
  `;

  const { loading, error, data } = useQuery(IS_AUTHENTICATED);

  if (loading) return <LoadingScreen fullscreen={true} />;

  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.isAuthenticated ? (
        <div className="layout">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <Navbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <div className="main">
            <Routes>
              <Route index path="/" element={<Dashboard />} />
              <Route path="/deck/:id" element={<Deck />} />
              <Route path="/deck/:id/new" element={<DeckLearnNew />} />
              <Route path="/deck/:id/due" element={<DeckPracticeDue />} />
              <Route path="/new" element={<LearnNew />} />
              <Route path="/due" element={<PracticeDue />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </div>
  );
}
