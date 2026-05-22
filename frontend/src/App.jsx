import React from "react";
import Navbar from "./common/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AuthSuccess from "./pages/Auth/AuthSuccess";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateRoom from "./pages/room/CreateRoom";
import MyMeetings from "./pages/room/MyMeetings";
import ScheduledRoomForMe from "./pages/room/ScheduledRoomForMe";
import Room from "./pages/room/Room";
import Footer from "./common/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex">
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            
            <Route path="/auth-success" element={<AuthSuccess />} />
          </Route>

          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-room" element={<CreateRoom/>} />
            <Route path="/my-meetings" element={<MyMeetings/>}/>
            <Route path="/scheduled-for-me" element={<ScheduledRoomForMe/>} />
            <Route path="/room/:roomId" element={<Room/>} />
          </Route>
        </Routes>
      </main>
      <Footer/>
    </div>
  );
};

export default App;
