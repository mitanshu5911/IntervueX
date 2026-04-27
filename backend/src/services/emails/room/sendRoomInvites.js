import { getEmailTransporter } from "../email.service.js";

const formatDate = (date) => {
  if (!date) return "Not specified";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short"
  }).format(new Date(date));
};

const buildEmailTemplate = ({
  title,
  description,
  formattedDate,
  interviewer,
  roomLink,
  ctaText,
  type
}) => `
<div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f5f7fb; padding:30px 15px;">
  <div style="max-width:600px; margin:auto; background:white; border-radius:14px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#4f46e5,#6366f1); padding:20px; text-align:center;">
      <h1 style="color:white; margin:0; font-size:22px; letter-spacing:1px;">
        IntervueX
      </h1>
      <p style="color:#e0e7ff; margin-top:5px; font-size:13px;">
        Real-time Technical Interview Platform
      </p>
    </div>

    <!-- BODY -->
    <div style="padding:25px; color:#374151;">

      <h2 style="margin-top:0; color:#111827;">
        ${
          type === "host"
            ? "🎯 Your Interview Room is Ready"
            : "🚀 You're Invited to an Interview"
        }
      </h2>

      <p style="font-size:14px; line-height:1.6;">
        ${
          type === "host"
            ? "Your interview room has been successfully created."
            : "You have been invited to participate in a technical interview."
        }
      </p>

      <div style="margin-top:20px; padding:15px; background:#f9fafb; border-radius:10px; border:1px solid #e5e7eb;">
        <p><b>📌 Title:</b> ${title}</p>
        <p><b>📝 Description:</b> ${description || "Not provided"}</p>
        <p><b>📅 Scheduled:</b> ${formattedDate}</p>
      </div>

      <div style="margin-top:20px;">
        <p><b>👤 Interviewer:</b></p>
        <p style="margin:5px 0;">
          ${interviewer?.name || "Interviewer"}<br/>
          <span style="font-size:13px; color:#6b7280;">
            ${interviewer?.email || ""}
          </span>
        </p>
      </div>

      <!-- CTA -->
      <div style="text-align:center; margin:30px 0;">
        <a href="${roomLink}" 
          style="
            background:linear-gradient(135deg,#4f46e5,#6366f1);
            color:white;
            padding:14px 28px;
            border-radius:8px;
            text-decoration:none;
            font-weight:600;
            display:inline-block;
            box-shadow:0 6px 15px rgba(79,70,229,0.3);
          ">
          ${ctaText}
        </a>
      </div>

      <p style="font-size:12px; color:#6b7280; text-align:center;">
        ${
          type === "host"
            ? "Manage your interview session using the button above."
            : "Click the button above to join your interview."
        }
      </p>

    </div>

    <!-- FOOTER -->
    <div style="padding:15px; text-align:center; font-size:11px; color:#9ca3af;">
      © ${new Date().getFullYear()} IntervueX • All rights reserved
    </div>

  </div>
</div>
`;

export const sendRoomInvites = async ({ emails, room, roomLink,interviewerDetail }) => {
  const transporter = getEmailTransporter();

  const formattedDate = formatDate(room.scheduledAt);

  const html = buildEmailTemplate({
    title: room.title,
    description: room.description,
    formattedDate,
    interviewer: interviewerDetail,
    roomLink,
    ctaText: "Join Interview",
    type: "candidate"
  });

  await Promise.all(
    emails.map((email) =>
      transporter.sendMail({
        from: `"IntervueX" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `🚀 Interview Invitation: ${room.title}`,
        html
      })
    )
  );
};

export const sendHostEmail = async ({ interviewer, room, roomLink }) => {
  const transporter = getEmailTransporter();

  const formattedDate = formatDate(room.scheduledAt);

  const html = buildEmailTemplate({
    title: room.title,
    description: room.description,
    formattedDate,
    interviewer,
    roomLink,
    ctaText: "Start Interview",
    type: "host"
  });

  await transporter.sendMail({
    from: `"IntervueX" <${process.env.EMAIL_USER}>`,
    to: interviewer.email,
    subject: `🎯 Your Interview Room is Ready`,
    html
  });
};