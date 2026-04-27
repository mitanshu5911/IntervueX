import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Sparkles,
  Video,
  MessageSquare,
  Code,
  PenTool,
  Form,
} from "lucide-react";
import GuestInput from "./GuestInput";

const defaultForm = {
  title: "",
  description: "",
  scheduledAt: "",
  maxParticipants: 2,
  guestList: [],
  features: {
    video: true,
    chat: true,
    codeEditor: true,
    whiteboard: true,
  },
  recordingEnabled: false,
};

const RoomForm = ({ initialData, onSubmit, loading, mode = "create" }) => {
  const [form, setForm] = useState(defaultForm);

 useEffect(() => {
  if (initialData) {
    setForm({
      ...defaultForm,
      ...initialData,
      guestList: Array.isArray(initialData?.guestList)
        ? initialData.guestList
        : [],
    });
  }
}, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (feature) => {
    setForm((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature],
      },
    }));
  };

  const toggleRecording = () => {
    setForm((prev) => ({
      ...prev,
      recordingEnabled: !prev.recordingEnabled,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const featureConfig = [
    { key: "video", label: "Video", icon: Video },
    { key: "chat", label: "Chat", icon: MessageSquare },
    { key: "codeEditor", label: "Code Editor", icon: Code },
    { key: "whiteboard", label: "Whiteboard", icon: PenTool },
  ];

  const getCurrentDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto 
      bg-white/70 backdrop-blur-2xl 
      border border-white/40
      rounded-3xl shadow-[0_20px_60px_rgba(79,70,229,0.15)]
      p-6 md:p-10 space-y-8"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {mode === "create" ? "Create Room" : "Update Room"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Configure your interview setup
          </p>
        </div>

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Form />
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          
          placeholder="Frontend Interview"
        />

        <InputField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional details..."
          textarea
        />
      </div>

      {/* SCHEDULE + PARTICIPANTS */}
      <div className="grid md:grid-cols-2 gap-6">
        <IconInput
          icon={Calendar}
          label="Schedule"
          type="datetime-local"
          name="scheduledAt"
          value={form.scheduledAt}
           min={getCurrentDateTime()}
          onChange={handleChange}
        />

        <IconInput
          icon={Users}
          label="Max Participants"
          type="number"
          name="maxParticipants"
          value={form.maxParticipants}
          onChange={handleChange}
          min={2}
          max={15}
        />
      </div>

      {/* GUESTS */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-700">
          Invite Candidates
        </h3>

        <GuestInput
  guestList={form.guestList}
  setGuestList={(updater) =>
    setForm((prev) => ({
      ...prev,
      guestList:
        typeof updater === "function"
          ? updater(prev.guestList || [])
          : updater,
    }))
  }
/>
      </div>

      {/* FEATURES */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-4">
          Room Features
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featureConfig.map(({ key, label, icon: Icon }) => {
            const active = form.features[key];

            return (
              <motion.button
                type="button"
                key={key}
                onClick={() => toggleFeature(key)}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2
                  transition-all duration-300
                  ${
                    active
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-white/60 text-gray-600 hover:bg-indigo-50"
                  }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* RECORDING */}
      <motion.div
        onClick={toggleRecording}
        whileTap={{ scale: 0.98 }}
        className={`cursor-pointer flex items-center justify-between px-5 py-4 rounded-2xl border transition
          ${
            form.recordingEnabled
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
      >
        <span className="font-medium">
          Recording {form.recordingEnabled ? "Enabled" : "Disabled"}
        </span>

        <div
          className={`w-10 h-5 rounded-full transition ${
            form.recordingEnabled ? "bg-white/30" : "bg-gray-300"
          }`}
        >
          <div
            className={`h-5 w-5 bg-white rounded-full shadow transition ${
              form.recordingEnabled ? "translate-x-5" : ""
            }`}
          />
        </div>
      </motion.div>

      {/* SUBMIT */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        disabled={loading}
        className="w-full py-4 rounded-2xl font-semibold text-white
        bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600
        shadow-lg shadow-indigo-500/30
        hover:shadow-indigo-500/50 transition-all"
      >
        {loading
          ? "Processing..."
          : mode === "create"
          ? "Create Room"
          : "Update Room"}
      </motion.button>
    </motion.form>
  );
};

export default RoomForm;

/* ---------------- SUB COMPONENTS ---------------- */

const InputField = ({ label, textarea, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-600">{label}</label>

    {textarea ? (
      <textarea
        {...props}
        className="w-full px-4 py-3 rounded-xl border bg-white/70 focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    ) : (
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl border bg-white/70 focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    )}
  </div>
);

const IconInput = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-600">{label}</label>

    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/70 focus-within:ring-2 focus-within:ring-indigo-500">
      <Icon size={16} className="text-indigo-500" />
      <input
        {...props}
        className="w-full bg-transparent outline-none"
      />
    </div>
  </div>
);