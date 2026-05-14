export function chatReply(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      message: "Message is required",
    });
  }

  const text = message.toLowerCase();

  let reply =
    "I am here to help you with Dawai app, medication reminders, and health tracking.";

  if (text.includes("hello") || text.includes("hi")) {
    reply = "Hello! How can I help you with your medications today?";
  } else if (text.includes("medication") || text.includes("medicine")) {
    reply = "You can add, edit, and delete your medications from the Medications page.";
  } else if (text.includes("reminder") || text.includes("time")) {
    reply =
      "Dawai can help you track medication times and remind you when it is time to take your dose.";
  } else if (text.includes("stats") || text.includes("progress")) {
    reply = "You can check your weekly medication progress from the Stats page.";
  } else if (text.includes("profile") || text.includes("account")) {
    reply = "You can update your name, email, and password from the Profile page.";
  } else if (text.includes("missed") || text.includes("miss")) {
    reply = "If you miss a dose, you can mark it as missed from the Dashboard.";
  } else if (text.includes("taken") || text.includes("take")) {
    reply =
      "Great! You can mark your medication as taken from the Dashboard or Medications page.";
  }

  res.json({ reply });
}