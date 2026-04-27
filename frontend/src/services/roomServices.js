import api from "../utils/api";

export const createRoomAPI = async (payload) => {
    try {
        const { data } = await api.post("/room/create-room", payload);
        return data;
    } catch (error) {
        throw error?.response?.data || {message: "Something went wrong"};
    }
};

export const getMyMeetingsAPI = async ({
  status,
  search,
  fromDate,
  toDate
} ={}) => {
  try {
    const params = {};

    
    if (status) {
        params.status = Array.isArray(status)
        ? status.join(",")
        : status;
    }
    
   if (search !== undefined && search !== "") {
  params.search = search;
}
    
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;
    
    // console.log("PARAMS:", params);

    const res = await api.get("/room/get-my-meetings", {
      params
    });

    return res.data;

  } catch (error) {
    throw error.response?.data || {
      message: "Failed to fetch meetings"
    };
  }
};

export const getScheduledForMeAPI = async ({
  status,
  search,
  fromDate,
  toDate
} = {}) => {
  try {
    const params = {};

    if (status) {
      params.status = Array.isArray(status)
        ? status.join(",")
        : status;
    }

    if (search && search.trim() !== "") {
      params.search = search.trim();
    }

    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;

    const res = await api.get("/room/scheduled-for-me", {
      params
    });

    return res.data;

  } catch (error) {
    throw error.response?.data || {
      message: "Failed to fetch scheduled meetings"
    };
  }
};