import React from "react";
import { Shield, Zap, Video,CalendarCheck  } from "lucide-react";

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start gap-3">
    <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-600">
      <Icon size={20} /> {/* medium size */}
    </div>
    <div>
      <h4 className="text-sm md:text-base font-semibold text-gray-800">
        {title}
      </h4>
      <p className="text-xs md:text-sm text-gray-500">
        {desc}
      </p>
    </div>
  </div>
);

const CreateRoomSidebar = () => {
  return (
    <div
      className="w-full rounded-3xl p-2 md:p-3 md:px-5
      bg-gradient-to-br from-indigo-100 via-white to-indigo-200
      shadow-lg flex flex-col justify-between overflow-hidden"
    >
      {/* TOP */}
      <div>
        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
          Create <br />
          <span className="text-indigo-600">
            Interview Room
          </span>
        </h1>

        <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-3">
          Set up your interview room and invite candidates to join.
        </p>

      
       
      </div>

      {/* FEATURES */}
      <div className="space-y-4 md:space-y-5 mt-4">
        <Feature
          icon={Shield}
          title="Secure & Private"
          desc="Your rooms are end-to-end encrypted"
        />

        <Feature
          icon={Zap}
          title="Realtime Collaboration"
          desc="Code, chat & collaborate in real-time"
        />

         <Feature
          icon={CalendarCheck}
          title="Smart Scheduling"
          desc="Auto reminders & seamless time management"
        />

        <Feature
          icon={Video}
          title="High Quality"
          desc="Crystal clear audio and video"
        />
      </div>
    </div>
  );
};

export default CreateRoomSidebar;