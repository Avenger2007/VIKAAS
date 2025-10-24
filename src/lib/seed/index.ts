import { db } from '@/lib/db';

// Sample schools data
const schools = [
  {
    name: "Delhi Public School",
    address: "123 Education Road",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    phone: "+91-80-12345678",
    email: "admin@dpsbangalore.edu",
    type: "PRIVATE" as const,
    status: "ACTIVE" as const
  },
  {
    name: "Government Higher Secondary School",
    address: "456 Main Street",
    city: "Mysuru",
    state: "Karnataka",
    pincode: "570001",
    phone: "+91-821-2345678",
    email: "headmaster@ghsmysuru.edu",
    type: "GOVERNMENT" as const,
    status: "ACTIVE" as const
  }
];

// Sample users data
const users = [
  // Students
  { name: "Aarav Kumar", email: "aarav.kumar@student.com", role: "STUDENT" as const },
  { name: "Priya Sharma", email: "priya.sharma@student.com", role: "STUDENT" as const },
  { name: "Rahul Verma", email: "rahul.verma@student.com", role: "STUDENT" as const },
  { name: "Ananya Reddy", email: "ananya.reddy@student.com", role: "STUDENT" as const },
  { name: "Karan Singh", email: "karan.singh@student.com", role: "STUDENT" as const },
  
  // Teachers
  { name: "Kavitha Nair", email: "kavitha.nair@teacher.com", role: "TEACHER" as const },
  { name: "Rajesh Kumar", email: "rajesh.kumar@teacher.com", role: "TEACHER" as const },
  { name: "Meera Patel", email: "meera.patel@teacher.com", role: "TEACHER" as const },
  
  // School Admins
  { name: "Principal Sharma", email: "principal@dpsbangalore.edu", role: "SCHOOL_ADMIN" as const },
  { name: "Headmaster Reddy", email: "headmaster@ghsmysuru.edu", role: "SCHOOL_ADMIN" as const }
];

// Sample uploads data
const uploads = [
  {
    title: "Architecture Sketch",
    description: "Detailed sketch of a modern building with perspective",
    type: "ARTWORK" as const,
    category: "Drawing/Sketch",
    subject: "Architecture",
    classWhenCreated: 10,
    fileName: "architecture_sketch.jpg",
    fileSize: 2048576,
    mimeType: "image/jpeg",
    fileUrl: "/uploads/architecture_sketch.jpg"
  },
  {
    title: "Science Project Report",
    description: "Complete report on renewable energy sources",
    type: "PROJECT" as const,
    category: "Science Project",
    subject: "Science",
    classWhenCreated: 10,
    fileName: "science_project.pdf",
    fileSize: 1048576,
    mimeType: "application/pdf",
    fileUrl: "/uploads/science_project.pdf"
  },
  {
    title: "Creative Writing Essay",
    description: "Essay on 'My Vision for India'",
    type: "ESSAY" as const,
    category: "Essay",
    subject: "English",
    classWhenCreated: 10,
    fileName: "creative_writing.pdf",
    fileSize: 524288,
    mimeType: "application/pdf",
    fileUrl: "/uploads/creative_writing.pdf"
  }
];

// Sample observations data
const observations = [
  {
    type: "TEXT" as const,
    content: "Aarav consistently demonstrates exceptional spatial reasoning in geometry problems. His approach to complex shapes shows advanced visual thinking.",
    tags: JSON.stringify(["Analytical", "Mathematics", "Visual Thinking"]),
    context: "Class participation",
    sentiment: "POSITIVE" as const
  },
  {
    type: "TEXT" as const,
    content: "Priya shows strong curiosity in physics experiments. She asks insightful 'why' questions and connects concepts to real-world applications.",
    tags: JSON.stringify(["Scientific Thinking", "Curiosity", "Physics"]),
    context: "Laboratory work",
    sentiment: "POSITIVE" as const
  },
  {
    type: "VOICE" as const,
    content: "Rahul has shown remarkable improvement in his communication skills. His presentation today was confident and well-structured.",
    tags: JSON.stringify(["Communication", "Presentation Skills", "Confidence"]),
    context: "Class presentation",
    sentiment: "POSITIVE" as const
  }
];

// Sample career matches data
const careerMatches = [
  {
    careerName: "Architecture",
    category: "STEM",
    matchScore: 92,
    keySkills: JSON.stringify(["Spatial Reasoning", "Design Thinking", "Attention to Detail"]),
    description: "Design and oversee construction of buildings and structures",
    educationPath: "B.Architecture (5 years)",
    salaryRange: "₹4-12 LPA",
    demand: "HIGH" as const
  },
  {
    careerName: "Product Design",
    category: "Arts",
    matchScore: 89,
    keySkills: JSON.stringify(["Creativity", "Technical Skills", "User Empathy"]),
    description: "Create innovative products that solve user problems",
    educationPath: "B.Des/M.Des (4-2 years)",
    salaryRange: "₹6-15 LPA",
    demand: "HIGH" as const
  },
  {
    careerName: "Software Engineering",
    category: "STEM",
    matchScore: 85,
    keySkills: JSON.stringify(["Logical Thinking", "Problem Solving", "Technical Aptitude"]),
    description: "Design and develop software applications and systems",
    educationPath: "B.Tech Computer Science (4 years)",
    salaryRange: "₹8-25 LPA",
    demand: "VERY_HIGH" as const
  }
];

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await db.auditLog.deleteMany();
    await db.careerMatch.deleteMany();
    await db.talentAnalysis.deleteMany();
    await db.teacherObservation.deleteMany();
    await db.uploadAnalysis.deleteMany();
    await db.studentUpload.deleteMany();
    await db.student.deleteMany();
    await db.teacher.deleteMany();
    await db.schoolAdmin.deleteMany();
    await db.payment.deleteMany();
    await db.subscription.deleteMany();
    await db.school.deleteMany();
    await db.user.deleteMany();

    console.log('🗑️ Cleared existing data');

    // Create schools
    const createdSchools = await Promise.all(
      schools.map(async (school) => {
        return await db.school.create({
          data: {
            ...school,
            subscription: {
              create: {
                plan: "TRIAL",
                status: "ACTIVE",
                startDate: new Date(),
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                maxStudents: 100,
                currentCount: 0
              }
            }
          }
        });
      })
    );

    console.log(`🏫 Created ${createdSchools.length} schools`);

    // Create users
    const createdUsers = await Promise.all(
      users.map(async (user) => {
        return await db.user.create({
          data: {
            ...user,
            status: "ACTIVE",
            emailVerified: true
          }
        });
      })
    );

    console.log(`👥 Created ${createdUsers.length} users`);

    // Create students
    const studentUsers = createdUsers.slice(0, 5);
    const createdStudents = await Promise.all(
      studentUsers.map(async (user, index) => {
        return await db.student.create({
          data: {
            userId: user.id,
            schoolId: createdSchools[index % 2].id,
            rollNumber: `${1000 + index + 1}`,
            classGrade: 8 + (index % 5), // Classes 8-12
            section: ['A', 'B', 'C'][index % 3],
            admissionNo: `ADM${2024}${1000 + index + 1}`,
            dateOfBirth: new Date(2007 + index, 0, 15),
            gender: index % 2 === 0 ? "MALE" : "FEMALE",
            parentEmail: `parent${index + 1}@email.com`,
            parentPhone: `+91-9876543${100 + index}`,
            status: "ACTIVE"
          }
        });
      })
    );

    console.log(`🎓 Created ${createdStudents.length} students`);

    // Create teachers
    const teacherUsers = createdUsers.slice(5, 8);
    const createdTeachers = await Promise.all(
      teacherUsers.map(async (user, index) => {
        return await db.teacher.create({
          data: {
            userId: user.id,
            schoolId: createdSchools[index % 2].id,
            employeeId: `EMP${2000 + index + 1}`,
            subjects: JSON.stringify(["Mathematics", "Science", "English"][index % 3]),
            classes: JSON.stringify([8, 9, 10]),
            status: "ACTIVE"
          }
        });
      })
    );

    console.log(`👨‍🏫 Created ${createdTeachers.length} teachers`);

    // Create school admins
    const adminUsers = createdUsers.slice(8, 10);
    await Promise.all(
      adminUsers.map(async (user, index) => {
        return await db.schoolAdmin.create({
          data: {
            userId: user.id,
            schoolId: createdSchools[index].id,
            role: index === 0 ? "PRINCIPAL" : "ADMIN"
          }
        });
      })
    );

    console.log(`👨‍💼 Created school admins`);

    // Create uploads
    const createdUploads = await Promise.all(
      uploads.map(async (upload, index) => {
        return await db.studentUpload.create({
          data: {
            ...upload,
            studentId: createdStudents[index % createdStudents.length].id,
            status: "ANALYZED"
          }
        });
      })
    );

    console.log(`📤 Created ${createdUploads.length} uploads`);

    // Create upload analyses
    await Promise.all(
      createdUploads.map(async (upload) => {
        return await db.uploadAnalysis.create({
          data: {
            uploadId: upload.id,
            talentMarkers: {
              spatialReasoning: 92,
              creativity: 85,
              attentionToDetail: 89,
              technicalThinking: 88,
              aestheticSensitivity: 85
            },
            insights: "Exceptional spatial reasoning abilities demonstrated through precise architectural sketching. Strong attention to structural details and proportions.",
            careerImplications: ["Architecture", "Civil Engineering", "Interior Design"],
            confidence: 92,
            processingTime: 1250
          }
        });
      })
    );

    console.log(`🔍 Created upload analyses`);

    // Create observations
    await Promise.all(
      observations.map(async (observation, index) => {
        return await db.teacherObservation.create({
          data: {
            ...observation,
            teacherId: createdTeachers[index % createdTeachers.length].id,
            studentId: createdStudents[index % createdStudents.length].id
          }
        });
      })
    );

    console.log(`📝 Created observations`);

    // Create talent analysis
    await Promise.all(
      createdStudents.map(async (student) => {
        return await db.talentAnalysis.create({
          data: {
            studentId: student.id,
            overallScore: 85,
            dimensions: {
              academicExcellence: 78,
              creativeThinking: 92,
              technicalSkills: 88,
              analyticalAbility: 85,
              leadership: 75,
              communication: 80,
              physicalWellness: 70,
              socialSkills: 82
            },
            strengths: JSON.stringify(["Creative Thinking", "Technical Skills", "Spatial Reasoning"]),
            improvementAreas: JSON.stringify(["Leadership", "Physical Wellness"]),
            growthTrajectory: {
              trend: "improving",
              keyAreas: ["creativity", "technical skills"]
            },
            recommendations: {
              academic: ["Focus on advanced mathematics", "Take design thinking courses"],
              extracurricular: ["Join robotics club", "Participate in art competitions"],
              career: ["Explore architecture", "Consider product design"]
            },
            confidence: 88,
            dataPoints: 5
          }
        });
      })
    );

    console.log(`📊 Created talent analyses`);

    // Create career matches
    await Promise.all(
      createdStudents.map(async (student) => {
        return Promise.all(
          careerMatches.map(async (career) => {
            return await db.careerMatch.create({
              data: {
                ...career,
                studentId: student.id
              }
            });
          })
        );
      })
    );

    console.log(`🚀 Created career matches`);

    console.log('✅ Database seeding completed successfully!');
    
    return {
      schools: createdSchools.length,
      users: createdUsers.length,
      students: createdStudents.length,
      teachers: createdTeachers.length,
      uploads: createdUploads.length,
      observations: observations.length,
      careerMatches: careerMatches.length * createdStudents.length
    };

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}