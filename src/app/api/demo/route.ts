import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Get demo data to showcase the platform
    const [schoolsCount, studentsCount, teachersCount, uploadsCount, analysesCount] = await Promise.all([
      db.school.count(),
      db.student.count(),
      db.teacher.count(),
      db.studentUpload.count(),
      db.talentAnalysis.count()
    ]);

    // Get sample student with their data
    const sampleStudent = await db.student.findFirst({
      include: {
        user: {
          select: { name: true, email: true }
        },
        uploads: {
          include: { analysis: true },
          take: 3
        },
        talentAnalysis: {
          orderBy: { analysisDate: 'desc' },
          take: 1
        },
        careerMatches: {
          orderBy: { matchScore: 'desc' },
          take: 3
        },
        observations: {
          include: {
            teacher: {
              include: {
                user: {
                  select: { name: true }
                }
              }
            }
          },
          take: 2
        }
      }
    });

    // Get recent uploads
    const recentUploads = await db.studentUpload.findMany({
      include: {
        student: {
          include: {
            user: {
              select: { name: true }
            }
          }
        },
        analysis: true
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    // Get top talent categories
    const talentCategories = {
      academicExcellence: 78,
      creativeThinking: 92,
      technicalSkills: 88,
      analyticalAbility: 85,
      leadership: 75,
      communication: 80,
      physicalWellness: 70,
      socialSkills: 82
    };

    const demoData = {
      platform: {
        name: "VIKAAS",
        tagline: "Visionary Intelligence for Knowledge, Aptitude, and Ability Synthesis",
        version: "1.0 MVP",
        schoolsCount,
        studentsCount,
        teachersCount,
        uploadsCount,
        analysesCount
      },
      sampleStudent: sampleStudent ? {
        name: sampleStudent.user.name,
        class: `Class ${sampleStudent.classGrade}${sampleStudent.section || ''}`,
        overallScore: sampleStudent.talentAnalysis[0]?.overallScore || 85,
        talentDimensions: sampleStudent.talentAnalysis[0]?.dimensions || talentCategories,
        recentUploads: sampleStudent.uploads.map(upload => ({
          title: upload.title,
          type: upload.type,
          status: upload.status,
          analysis: upload.analysis ? {
            insights: upload.analysis.insights,
            confidence: upload.analysis.confidence
          } : null
        })),
        careerMatches: sampleStudent.careerMatches.map(match => ({
          career: match.careerName,
          matchScore: match.matchScore,
          category: match.category
        })),
        recentObservations: sampleStudent.observations.map(obs => ({
          teacher: obs.teacher.user.name,
          content: obs.content,
          sentiment: obs.sentiment,
          createdAt: obs.createdAt
        }))
      } : null,
      recentActivity: recentUploads.map(upload => ({
        student: upload.student.user.name,
        title: upload.title,
        type: upload.type,
        status: upload.status,
        createdAt: upload.createdAt
      })),
      features: [
        {
          title: "Visual Evidence Engine",
          description: "AI analyzes actual student work—not self-reported interests. Computer vision identifies cognitive patterns from artwork.",
          icon: "🖼️"
        },
        {
          title: "Longitudinal Tracking",
          description: "Tracks talent development Class 6-12. Time-series ML predicts growth trajectories.",
          icon: "📈"
        },
        {
          title: "Behavioral Intelligence",
          description: "Passive monitoring for early intervention. Detects at-risk patterns 12-18 months early.",
          icon: "🧠"
        }
      ],
      integrations: [
        "NEP 2020 Compliant",
        "Offline-First Architecture",
        "AI-Powered Analysis",
        "Multi-Modal Input (Text, Voice, Visual)",
        "Real-time Teacher Observations",
        "Career Path Recommendations"
      ]
    };

    return NextResponse.json(demoData);

  } catch (error) {
    console.error('Demo API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}