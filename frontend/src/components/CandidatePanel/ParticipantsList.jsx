import { X, Pin, PinOff } from "lucide-react";
import React, { useMemo } from "react";

const ParticipantsList = ({
  allParticipants,
  participant,
  onClose,
  pinnedUser,
  setPinnedUser,
}) => {
  // SORT PARTICIPANTS
  const sortedParticipants = useMemo(() => {
    if (!allParticipants?.length) return [];

    const currentUser = allParticipants.find(
      (p) => p?.user?._id === participant?.user?._id,
    );

    const interviewer = allParticipants.find(
      (p) =>
        p?.role === "interviewer" && p?.user?._id !== participant?.user?._id,
    );

    const remainingUsers = allParticipants.filter(
      (p) =>
        p?.user?._id !== participant?.user?._id && p?.role !== "interviewer",
    );

    const finalList = [];

    if (currentUser) finalList.push(currentUser);

    if (interviewer) finalList.push(interviewer);

    return [...finalList, ...remainingUsers];
  }, [allParticipants, participant]);

  const handlePinToggle = (selectedParticipant) => {
    setPinnedUser((prevPinnedUser) => {
      if (prevPinnedUser?.user?._id === selectedParticipant?.user?._id) {
        return null;
      }

      console.log("Pinning user:", selectedParticipant?.user?.name);
      return selectedParticipant;
    });
  };

  return (
    <div className="bg-white h-full w-full rounded-3xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
      {/* HEADER */}
      <div className="h-[72px] min-h-[72px] border-b border-gray-200 flex items-center justify-between px-4 lg:px-5">
        <h2 className="font-semibold text-base lg:text-lg text-gray-800 truncate">
          Participants List
        </h2>

        <button
          className="p-2 rounded-xl hover:bg-gray-100 active:scale-95 transition-all duration-200"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 lg:px-3 py-3 space-y-2">
        {sortedParticipants.map((p) => {
          const isPinned = pinnedUser?.user?._id === p?.user?._id;

          const currentUserId = participant?.user?._id || participant?.user;

          const isYou = p?.user?._id?.toString() === currentUserId?.toString();

          const isInterviewer = p?.role === "interviewer";
          return (
            <div
              key={p?._id}
              className="group flex items-center justify-between gap-2 p-2 lg:p-3 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all duration-200"
            >
              {/* LEFT */}
              <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
                {/* AVATAR */}
                <div className="h-10 w-10 lg:h-11 lg:w-11 flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm lg:text-base shadow-md">
                  {p?.user?.name?.charAt(0)?.toUpperCase()}
                </div>

                {/* USER INFO */}
                <div className="flex flex-col min-w-0 flex-1">
                  {/* NAME */}
                  <div className="flex items-center gap-1 min-w-0">
                    <h3 className="font-medium text-sm lg:text-[15px] text-gray-800 truncate">
                      {p?.user?.name}
                    </h3>

                    {/* YOU TAG */}
                    {isYou && (
                      <span className="flex-shrink-0 text-[10px] lg:text-xs font-medium px-1.5 py-[2px] rounded-md bg-indigo-100 text-indigo-600">
                        You
                      </span>
                    )}

                    {/* INTERVIEWER TAG */}
                    {!isYou && isInterviewer && (
                      <span className="flex-shrink-0 text-[10px] lg:text-xs font-medium px-1.5 py-[2px] rounded-md bg-green-100 text-green-600">
                        Interviewer
                      </span>
                    )}
                  </div>

                  {/* EMAIL */}
                  <p className="text-[11px] lg:text-xs text-gray-500 truncate pr-1">
                    {p?.user?.email}
                  </p>
                </div>
              </div>

              {/* PIN BUTTON */}
              <button
                onClick={() => handlePinToggle(p)}
                className={`
                  
                  h-9 w-9 lg:h-10 lg:w-10
                  flex-shrink-0
                  rounded-xl
                  flex items-center justify-center
                  transition-all duration-200
                  active:scale-95
                  
                  ${
                    isPinned
                      ? "bg-red-100 text-red-500 hover:bg-red-200 shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
                  }
                  
                `}
              >
                {isPinned ? (
                  <PinOff size={16} className="lg:w-[18px] lg:h-[18px]" />
                ) : (
                  <Pin size={16} className="lg:w-[18px] lg:h-[18px]" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParticipantsList;
