// Mock data and API functions for admin dashboard

export const getDashboardStats = async () => {
  return {
    totalCommunities: 34,
    totalStudents: 2580,
    totalGraduates: 1240,
    totalPartnerships: 28,
    totalEnrollments: 3850,
  };
};

export const getGrowthStats = async () => {
  return [
    { month: "Jan", students: 120, graduates: 45, communities: 3 },
    { month: "Feb", students: 180, graduates: 68, communities: 4 },
    { month: "Mar", students: 250, graduates: 92, communities: 5 },
    { month: "Apr", students: 320, graduates: 115, communities: 6 },
    { month: "May", students: 420, graduates: 150, communities: 8 },
    { month: "Jun", students: 580, graduates: 210, communities: 10 },
    { month: "Jul", students: 720, graduates: 280, communities: 12 },
    { month: "Aug", students: 950, graduates: 380, communities: 15 },
    { month: "Sep", students: 1200, graduates: 520, communities: 20 },
    { month: "Oct", students: 1550, graduates: 700, communities: 26 },
    { month: "Nov", students: 2100, graduates: 950, communities: 30 },
    { month: "Dec", students: 2580, graduates: 1240, communities: 34 },
  ];
};

export const getTopSkills = async () => {
  return [
    { name: "Digital Literacy", value: 450 },
    { name: "Tailoring", value: 320 },
    { name: "Entrepreneurship", value: 280 },
    { name: "Leadership", value: 210 },
    { name: "Music & Arts", value: 185 },
    { name: "Sports", value: 155 },
  ];
};

export const getCommunities = async () => {
  return [
    {
      id: 1,
      name: "Gulu Municipality",
      location: "Gulu, Uganda",
      studentCount: 120,
      visitCount: 8,
      graduateCount: 45,
    },
    {
      id: 2,
      name: "Mbale Central",
      location: "Mbale, Uganda",
      studentCount: 95,
      visitCount: 6,
      graduateCount: 38,
    },
    {
      id: 3,
      name: "Walukuba",
      location: "Jinja, Uganda",
      studentCount: 145,
      visitCount: 9,
      graduateCount: 62,
    },
    {
      id: 4,
      name: "Adyel",
      location: "Lira, Uganda",
      studentCount: 110,
      visitCount: 7,
      graduateCount: 48,
    },
    {
      id: 5,
      name: "Kakoba",
      location: "Mbarara, Uganda",
      studentCount: 130,
      visitCount: 8,
      graduateCount: 55,
    },
  ];
};

export const getCourses = async () => {
  return [
    {
      id: 1,
      title: "Digital Literacy Basics",
      instructor: "David Okello",
      level: "beginner",
      enrollmentCount: 320,
    },
    {
      id: 2,
      title: "Entrepreneurship 101",
      instructor: "James Kamoga",
      level: "beginner",
      enrollmentCount: 280,
    },
    {
      id: 3,
      title: "Leadership Development",
      instructor: "Priya Sharma",
      level: "intermediate",
      enrollmentCount: 210,
    },
    {
      id: 4,
      title: "Tailoring Skills",
      instructor: "Grace Nkonge",
      level: "intermediate",
      enrollmentCount: 320,
    },
    {
      id: 5,
      title: "Advanced Business Skills",
      instructor: "Peter Mwangi",
      level: "advanced",
      enrollmentCount: 180,
    },
  ];
};

export const getMessages = async () => {
  return [
    {
      id: "1",
      sender: "John Doe",
      email: "john@example.com",
      content: "Great work on the last community visit! The students loved the training.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: "2",
      sender: "Sarah Mukasa",
      email: "sarah@innovationhub.org",
      content: "Can we schedule a meeting to discuss the new partnership? I have some exciting opportunities.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: "3",
      sender: "Mark Kato",
      email: "mark@jinja.com",
      content: "Thank you for the support. The community is growing rapidly.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ];
};

export const getNotifications = async () => {
  return [
    {
      id: "1",
      title: "New community registered",
      content: "A new community in Kampala has registered for the program",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: "2",
      title: "Student milestone",
      content: "Congratulations! You've trained 2,500 students",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: "3",
      title: "Partnership agreement signed",
      content: "New partnership with Tech for All is active",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ];
};

export const getPartners = async () => {
  return [
    {
      id: 1,
      name: "Tech for All",
      logo: "https://via.placeholder.com/100?text=Tech+for+All",
      category: "technology",
    },
    {
      id: 2,
      name: "Community First Foundation",
      logo: "https://via.placeholder.com/100?text=Community+First",
      category: "funding",
    },
    {
      id: 3,
      name: "East African Youth Alliance",
      logo: "https://via.placeholder.com/100?text=EAYA",
      category: "collaboration",
    },
    {
      id: 4,
      name: "Skills Uganda",
      logo: "https://via.placeholder.com/100?text=Skills+Uganda",
      category: "training",
    },
  ];
};

export const getUsersByRole = async (role: string) => {
  if (role === "student") {
    return [
      { id: 1, name: "Peter Okello", email: "peter@student.com", role: "student" },
      { id: 2, name: "Grace Atim", email: "grace@student.com", role: "student" },
      { id: 3, name: "James Kipchoge", email: "james@student.com", role: "student" },
      { id: 4, name: "Amina Hassan", email: "amina@student.com", role: "student" },
      { id: 5, name: "Samuel Kitui", email: "samuel@student.com", role: "student" },
    ];
  }

  if (role === "trainer") {
    return [
      { id: 1, name: "David Okello", email: "david@innovationhub.org", role: "trainer" },
      { id: 2, name: "James Kamoga", email: "james@innovationhub.org", role: "trainer" },
      { id: 3, name: "Priya Sharma", email: "priya@innovationhub.org", role: "trainer" },
      { id: 4, name: "Emmanuel Mukundane", email: "emmanuel@innovationhub.org", role: "trainer" },
    ];
  }

  return [];
};

export const getVisits = async () => {
  return [
    {
      id: 1,
      outcomes: "Innovation Skills Training in Gulu",
      description: "Trained 45 students in digital literacy and entrepreneurship",
      date: new Date(2025, 0, 15).toISOString(),
      teamLeader: "Daniel Okello",
      likes: 48,
    },
    {
      id: 2,
      outcomes: "Youth Innovation Bootcamp in Mbale",
      description: "Leadership and innovation training for 38 youth",
      date: new Date(2025, 3, 5).toISOString(),
      teamLeader: "Joseph Waswa",
      likes: 35,
    },
    {
      id: 3,
      outcomes: "Community Innovation Day in Jinja",
      description: "Promoted creativity and problem-solving in riverside communities",
      date: new Date(2025, 4, 10).toISOString(),
      teamLeader: "Mark Kato",
      likes: 62,
    },
    {
      id: 4,
      outcomes: "Digital Skills Outreach in Lira",
      description: "Taught basic web browsing and document creation",
      date: new Date(2025, 5, 15).toISOString(),
      teamLeader: "Grace Atim",
      likes: 28,
    },
    {
      id: 5,
      outcomes: "Talent Discovery Camp in Mbarara",
      description: "Identified and mentored 40 youth in music, art, and sports",
      date: new Date(2025, 6, 20).toISOString(),
      teamLeader: "Paul Tumusiime",
      likes: 55,
    },
  ];
};
