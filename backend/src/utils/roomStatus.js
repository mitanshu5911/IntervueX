export const getRoomStatus = (room) => {
  const now = new Date();

  if(room.status === "ended") return "ended";

  if (!room.scheduledAt) return "active";

  const start = new Date(room.scheduledAt);

  if (room.endedAt) return "ended";
  if (room.startedAt) return "active";

  if (now < start) return "scheduled";

  return "active";
};
