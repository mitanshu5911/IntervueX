export const createRoomValidation = (body) => {
  try {
    const {
      title,
      description,
      scheduledAt,
      maxParticipants,
      guestList,
      features,
      recordingEnabled
    } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return { isValid: false, error: "Title is required" };
    }

    const scheduleDate = new Date(scheduledAt);

    if (!scheduledAt || isNaN(scheduleDate.getTime())) {
      return { isValid: false, error: "Valid scheduled time is required" };
    }

    if (scheduleDate <= new Date()) {
      return { isValid: false, error: "Scheduled time must be in the future" };
    }

    if (
      maxParticipants !== undefined &&
      (maxParticipants < 2 || maxParticipants > 15)
    ) {
      return {
        isValid: false,
        error: "Participants must be between 2 and 15"
      };
    }

    if (guestList && !Array.isArray(guestList)) {
      return {
        isValid: false,
        error: "Guest list must be an array"
      };
    }

    const isValidEmail = (email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const normalizedEmails = (guestList || []).map((email) =>
      typeof email === "string" ? email.toLowerCase().trim() : ""
    );

    const invalidEmails = normalizedEmails.filter(
      (email) => !isValidEmail(email)
    );

    if (invalidEmails.length > 0) {
      return {
        isValid: false,
        error: "Invalid email(s)",
        invalidEmails
      };
    }

    const uniqueEmails = [...new Set(normalizedEmails)];

    const roomFeatures = {
      video: features?.video ?? true,
      chat: features?.chat ?? true,
      codeEditor: features?.codeEditor ?? true,
      whiteboard: features?.whiteboard ?? true
    };

    return {
      isValid: true,
      data: {
        title: title.trim(),
        description: description?.trim() || "",
        scheduledAt: scheduleDate,
        maxParticipants: maxParticipants || 2,
        guestList: uniqueEmails,
        features: roomFeatures,
        recordingEnabled: !!recordingEnabled
      }
    };

  } catch (error) {
    return {
      isValid: false,
      error: "Validation failed"
    };
  }
};