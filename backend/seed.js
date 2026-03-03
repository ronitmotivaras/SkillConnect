require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const mentors = [
  {
    name: "Aisha Patel",
    email: "aisha@sc.com",
    password: "123456",
    role: "mentor",
    bio: "Full-stack developer with 6 years experience in React and Node.js.",
    skills: ["React", "Node.js", "MongoDB"],
    experience: "6 years",
    rating: 4.9,
    totalSessions: 120,
  },
  {
    name: "Rahul Sharma",
    email: "rahul@sc.com",
    password: "123456",
    role: "mentor",
    bio: "Data Scientist at a leading MNC. Expert in Python and ML.",
    skills: ["Python", "Machine Learning", "Data Science"],
    experience: "5 years",
    rating: 4.8,
    totalSessions: 98,
  },
  {
    name: "Priya Mehta",
    email: "priya@sc.com",
    password: "123456",
    role: "mentor",
    bio: "UI/UX Designer passionate about crafting clean user experiences.",
    skills: ["Figma", "UI/UX", "Prototyping"],
    experience: "4 years",
    rating: 4.7,
    totalSessions: 85,
  },
  {
    name: "Dev Khanna",
    email: "dev@sc.com",
    password: "123456",
    role: "mentor",
    bio: "Backend engineer specializing in microservices and cloud architecture.",
    skills: ["Node.js", "AWS", "Docker", "Microservices"],
    experience: "7 years",
    rating: 4.6,
    totalSessions: 73,
  },
  {
    name: "Meera Joshi",
    email: "meera@sc.com",
    password: "123456",
    role: "mentor",
    bio: "Android and Flutter developer. Helped 80+ students build their first app.",
    skills: ["Flutter", "Android", "Dart", "Firebase"],
    experience: "4 years",
    rating: 4.8,
    totalSessions: 90,
  },
  {
    name: "Arjun Nair",
    email: "arjun@sc.com",
    password: "123456",
    role: "mentor",
    bio: "DevOps engineer with expertise in CI/CD pipelines and Kubernetes.",
    skills: ["DevOps", "Kubernetes", "Jenkins", "Linux"],
    experience: "5 years",
    rating: 4.5,
    totalSessions: 60,
  },
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ Connected");
    for (const m of mentors) {
      const exists = await User.findOne({ email: m.email });
      if (!exists) {
        await User.create(m);
        console.log(`✅ Created mentor: ${m.name}`);
      } else {
        console.log(`⚠️  Already exists: ${m.name}`);
      }
    }
    console.log("🎉 Seeding complete!");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
