const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Connection = require("../models/Connection");

// ── Auth helper (inline, no middleware file needed) ───────
const getUser = async (req) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById(decoded.id);
  } catch {
    return null;
  }
};

// ── GET /api/mentors  — browse all mentors ────────────────
router.get("/", async (req, res) => {
  try {
    const me = await getUser(req);
    if (!me)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const { search, skill } = req.query;

    // Build query
    const query = { role: "mentor" };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
      ];
    }
    if (skill) query.skills = { $regex: skill, $options: "i" };

    const mentors = await User.find(query).select("-password");

    // For each mentor, check if current learner already sent a request
    const connections = await Connection.find({ learner: me._id });
    const connectionMap = {};
    connections.forEach((c) => {
      connectionMap[c.mentor.toString()] = c.status;
    });

    const mentorsWithStatus = mentors.map((m) => ({
      ...m.toObject(),
      connectionStatus: connectionMap[m._id.toString()] || null,
    }));

    res.json({ success: true, mentors: mentorsWithStatus });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ── POST /api/mentors/connect  — send connection request ──
router.post("/connect", async (req, res) => {
  try {
    const me = await getUser(req);
    if (!me)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (me.role !== "learner")
      return res
        .status(403)
        .json({ success: false, message: "Only learners can connect" });

    const { mentorId, message } = req.body;
    if (!mentorId)
      return res
        .status(400)
        .json({ success: false, message: "mentorId is required" });

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor")
      return res
        .status(404)
        .json({ success: false, message: "Mentor not found" });

    // Check if already requested
    const existing = await Connection.findOne({
      learner: me._id,
      mentor: mentorId,
    });
    if (existing)
      return res
        .status(400)
        .json({
          success: false,
          message: "Request already sent",
          status: existing.status,
        });

    const connection = await Connection.create({
      learner: me._id,
      mentor: mentorId,
      message: message || "",
    });

    res
      .status(201)
      .json({ success: true, message: "Connection request sent!", connection });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ── GET /api/mentors/my-connections — learner's connections
router.get("/my-connections", async (req, res) => {
  try {
    const me = await getUser(req);
    if (!me)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const connections = await Connection.find({ learner: me._id })
      .populate("mentor", "name email skills bio")
      .sort({ createdAt: -1 });

    res.json({ success: true, connections });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ── GET /api/mentors/requests — mentor sees pending requests
router.get("/requests", async (req, res) => {
  try {
    const me = await getUser(req);
    if (!me)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (me.role !== "mentor")
      return res
        .status(403)
        .json({ success: false, message: "Only mentors can view requests" });

    const requests = await Connection.find({ mentor: me._id })
      .populate("learner", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ── PATCH /api/mentors/requests/:id — accept or reject ────
router.patch("/requests/:id", async (req, res) => {
  try {
    const me = await getUser(req);
    if (!me)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const { status } = req.body;
    if (!["accepted", "rejected"].includes(status))
      return res
        .status(400)
        .json({
          success: false,
          message: "Status must be accepted or rejected",
        });

    const connection = await Connection.findById(req.params.id);
    if (!connection)
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });

    if (connection.mentor.toString() !== me._id.toString())
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });

    connection.status = status;
    await connection.save();

    res.json({ success: true, message: `Request ${status}!`, connection });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
