import { useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import { createRoomAPI } from "../../services/roomServices";
import RoomForm from "../../components/room/RoomForm";
import CreateRoomSidebar from "../../components/room/CreateRoomSidebar";

const CreateRoom = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      await createRoomAPI(formData);

      toast.success("Room created successfully");
      navigate("/my-meetings");
    } catch (err) {
      toast.error(err.message || "Failed to create room");

      if (err.invalidEmails?.length) {
        console.log("Invalid Emails:", err.invalidEmails);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-6 px-4 bg-gradient-to-br from-indigo-50 via-white to-indigo-100  flex justify-between gap-0 lg:gap-5">
      <div className="w-0 lg:w-1/4 ">
        <div className="hidden lg:flex sticky top-22">
          <CreateRoomSidebar />
        </div>
      </div>

      <div className="w-full lg:w-3/4 rounded-2xl ">
      <RoomForm
        onSubmit={handleSubmit}
        loading={loading}
        mode="create"
      />
      </div>
    </div>
  );
};

export default CreateRoom;
