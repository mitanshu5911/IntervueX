import { motion } from "framer-motion";
import Heading from "../../components/room/myMeetings/Heading";
import { useCallback, useEffect, useState } from "react";
import { getMyMeetingsAPI } from "../../services/roomServices";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../contexts/ToastContext";
import { Search, SlidersHorizontal } from "lucide-react";
import FilterDropdown from "../../components/room/myMeetings/FilterDropDown";
import RoomCard from "../../components/room/RoomCard";

const borderColors = [
  "bg-indigo-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",

  "bg-red-500",
  "bg-rose-500",
  "bg-fuchsia-500",
  "bg-violet-500",
  "bg-cyan-500",

  "bg-teal-500",
  "bg-emerald-500",
  "bg-lime-500",
  "bg-yellow-500",
  "bg-amber-500",

  "bg-sky-500",
  "bg-indigo-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-pink-400"
];

const MyMeetings = () => {
  const toast = useToast();
  const { showLoading, hideLoading } = useLoading();

  const [meetings, setMeetings] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const [searchData, setSearchData] = useState("");
  const [status, setStatus] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchMeetings = useCallback(
    async (withLoader = true) => {
      try {
        if (withLoader) showLoading("Fetching your meetings...");

        const res = await getMyMeetingsAPI({
          status,
          search: searchData,
          fromDate,
          toDate,
        });

        setMeetings(res.rooms || []);
        // console.log(res);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        if (withLoader) hideLoading();
      }
    },
    [status, searchData, fromDate, toDate, showLoading, hideLoading, toast],
  );

  useEffect(() => {
    fetchMeetings(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMeetings(false);
    }, 15000);
    return () => clearInterval(interval);
  }, [fetchMeetings]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMeetings(true);
  };

  const handleApply = (e) => {
    e.preventDefault();
    fetchMeetings(true);
  };

  return (
    <div className="w-full h-full min-h-[89vh]  bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-5">
      <Heading />

      <div className="w-full flex items-center gap-3 md:gap-10 p-4 md:p-5">
        {/* SEARCH BAR */}
        <motion.form
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex items-center flex-1"
        >
          {/* glow */}
          <div className="absolute inset-0 bg-indigo-500/10 blur-2xl opacity-0 focus-within:opacity-100 transition rounded-2xl" />

          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            placeholder="Search by titles..."
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            className="w-full px-4 md:px-5 py-2.5 md:py-4 rounded-2xl 
      border border-gray-200 bg-white/80 backdrop-blur-md
      shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none
      transition-all text-sm md:text-base pr-12"
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="absolute right-2 md:right-3 
  flex items-center justify-center gap-2
  px-3 md:px-5 py-2 rounded-xl h-8 md:h-10
  bg-indigo-600 text-white shadow-md"
          >
            <Search size={16} />

            <span className="hidden md:inline text-sm font-medium">Search</span>
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex-shrink-0"
        >
          <motion.button
            onClick={() => setFilterOpen((prev) => !prev)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-center 
      w-11 h-11 md:w-auto md:h-auto md:px-6 md:py-3 rounded-2xl 
      bg-white/80 backdrop-blur-md border border-gray-200
      shadow-md hover:shadow-xl transition-all overflow-hidden"
          >
            {/* glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition" />

            {/* icon */}
            <motion.div
              animate={{ rotate: filterOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-indigo-600"
            >
              <SlidersHorizontal size={18} />
            </motion.div>

            {/* desktop text */}
            <span className="hidden md:inline ml-2 text-sm font-medium text-gray-700 relative z-10">
              Filters
            </span>
          </motion.button>

          <FilterDropdown
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            selectedStatus={status}
            setSelectedStatus={setStatus}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            onApply={(e) => {
              handleApply(e);
              setFilterOpen(false);
            }}
          />
        </motion.div>
      </div>


      <div className="w-full flex flex-col gap-4 mt-4 px-2 md:px-4">
  {meetings.map((room, index) => (
    <RoomCard
      key={room._id}
      room={room}
      color={borderColors[index % borderColors.length]}
    />
  ))}
</div>
  
    </div>
  );
};

export default MyMeetings;
