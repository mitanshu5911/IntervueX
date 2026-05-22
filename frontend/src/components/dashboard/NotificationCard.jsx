import React from "react";

const NotificationCard = ({
  title,
  description,
  time,
  buttonText,
  onClick,
}) => {
  return (
    <div
      className="border border-gray-200 rounded-2xl
      p-4 flex items-center justify-between"
    >
      <div>
        <h3 className="font-semibold text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>

        <p className="text-xs text-indigo-600 mt-2">
          {time}
        </p>
      </div>

      <button
        onClick={onClick}
        className="px-4 py-2 rounded-xl
        bg-indigo-600 text-white text-sm"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default NotificationCard;