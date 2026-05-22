// src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Video,
  Plus,
  Users,
  Clock3,
  ArrowRight,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
  getMyMeetingsAPI,
  getScheduledForMeAPI,
} from "../services/roomServices";

import HeroSection from "../components/dashboard/HeroSection";
import StatsCards from "../components/dashboard/StatsCard";
import QuickActions from "../components/dashboard/QuickActions";
import NotificationCard from "../components/dashboard/NotificationCard";
import RecentMeetingCard from "../components/dashboard/RecentMeetingCard";


const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [myMeetings, setMyMeetings] = useState([]);
  const [scheduledForMe, setScheduledForMe] = useState([]);

  const [stats, setStats] = useState({
    active: 0,
    scheduled: 0,
    forMe: 0,
    total: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const [myMeetingsRes, scheduledRes] = await Promise.all([
        getMyMeetingsAPI(),
        getScheduledForMeAPI(),
      ]);

      const myRooms = myMeetingsRes?.rooms || [];
      const scheduledRooms = scheduledRes?.rooms || [];

      setMyMeetings(myRooms);
      setScheduledForMe(scheduledRooms);

      const activeRooms = myRooms.filter(
        (room) => room.status === "active"
      ).length;

      const scheduledRoomsCount = myRooms.filter(
        (room) => room.status === "scheduled"
      ).length;

      setStats({
        active: activeRooms,
        scheduled: scheduledRoomsCount,
        forMe: scheduledRooms.length,
        total: myRooms.length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div
      className="min-h-screen w-full
      bg-gradient-to-br from-indigo-50 via-white to-indigo-100
      p-4 md:p-6"
    >
      {/* HERO */}
      <HeroSection user={user} />

      {/* STATS */}
      <StatsCards stats={stats} />

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        {/* LEFT */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* QUICK ACTIONS */}
          <QuickActions />

          {/* NOTIFICATIONS */}
          <div
            className="bg-white/80 backdrop-blur-md rounded-3xl
            border border-gray-200 shadow-sm p-5"
          >
            <div className="flex items-center gap-2 mb-5">
              <Bell className="text-indigo-600" size={20} />
              <h2 className="text-lg font-semibold text-gray-800">
                Notifications
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {scheduledForMe.slice(0, 3).map((room) => (
                <NotificationCard
                  key={room._id}
                  title="Interview Scheduled"
                  description={`${room.title} interview is waiting for you`}
                  time={new Date(room.scheduledAt).toLocaleString()}
                  buttonText="Join Now"
                  onClick={() => navigate(`/room/${room.roomId}`)}
                />
              ))}

              {scheduledForMe.length === 0 && (
                <div
                  className="border border-dashed border-gray-300
                  rounded-2xl p-8 text-center"
                >
                  <p className="text-gray-500">
                    No upcoming interviews 🚀
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RECENT MEETINGS */}
          <div
            className="bg-white/80 backdrop-blur-md rounded-3xl
            border border-gray-200 shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Meetings
              </h2>

              <button
                onClick={() => navigate("/my-meetings")}
                className="flex items-center gap-2 text-sm text-indigo-600"
              >
                View All
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {myMeetings.slice(0, 4).map((room) => (
                <RecentMeetingCard key={room._id} room={room} />
              ))}

              {myMeetings.length === 0 && (
                <div
                  className="border border-dashed border-gray-300
                  rounded-2xl p-8 text-center"
                >
                  <p className="text-gray-500">
                    No meetings created yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">
          {/* PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md
            rounded-3xl border border-gray-200
            shadow-sm p-6"
          >
            <div className="flex flex-col items-center">
              <div
                className="w-20 h-20 rounded-full
                bg-gradient-to-r from-indigo-500 to-purple-500
                flex items-center justify-center
                text-white text-2xl font-bold"
              >
                {user?.name?.charAt(0)}
              </div>

              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {user?.name}
              </h2>

              <p className="text-sm text-gray-500">
                {user?.email}
              </p>

              <button
                onClick={logout}
                className="mt-6 w-full py-3 rounded-2xl
                bg-red-500 hover:bg-red-600
                text-white transition"
              >
                Logout
              </button>
            </div>
          </motion.div>

          {/* UPCOMING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md
            rounded-3xl border border-gray-200
            shadow-sm p-5"
          >
            <div className="flex items-center gap-2 mb-5">
              <Clock3 className="text-indigo-600" size={18} />
              <h2 className="font-semibold text-gray-800">
                Upcoming
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {scheduledForMe.slice(0, 3).map((room) => (
                <div
                  key={room._id}
                  className="p-4 rounded-2xl bg-indigo-50"
                >
                  <p className="font-medium text-gray-800">
                    {room.title}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(
                      room.scheduledAt
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;