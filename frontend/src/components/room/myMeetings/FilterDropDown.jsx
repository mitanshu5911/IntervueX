import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const statuses = ["active", "scheduled", "ended"];

const FilterDropDown = ({
  open,
  onClose,
  selectedStatus,
  setSelectedStatus,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  onApply
}) => {
  const dropdownRef = useRef(null);

  const toggleStatus = (status) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((s) => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-5 z-50"
        >

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-semibold text-gray-700">
              Filters
            </p>

            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100 transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* STATUS */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Status
            </p>

            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => {
                const active = selectedStatus.includes(status);

                return (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition
                      ${
                        active
                          ? "bg-indigo-600 text-white shadow"
                          : "bg-gray-100 text-gray-600 hover:bg-indigo-100"
                      }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DATE RANGE */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Date Range
            </p>

            <div className="flex gap-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-1/2 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-1/2 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* ACTION */}
          <button
            onClick={(e) => {
              onApply(e);
              onClose();
            }}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition shadow-md"
          >
            Apply Filters
          </button>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterDropDown;