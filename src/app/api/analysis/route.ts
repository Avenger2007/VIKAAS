import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { studentId } = await request.json();

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // Get all student data for analysis
    const student = await db.student.findUnique({
      where: { id: studentId },
      include: {
        user: {
          select: { name: true, email: true }
        },
        uploads: {
          include: { analysis: true }
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
          }
        }
      }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Perform comprehensive talent analysis
    const analysis = await performComprehensiveAnalysis(student);

    // Save analysis results
    const talentAnalysis = await db.talentAnalysis.create({
      data: {
        studentId,
        overallScore: analysis.overallScore,
        dimensions: analysis.dimensions,
        strengths: JSON.stringify(analysis.strengths),
        improvementAreas: JSON.stringify(analysis.improvementAreas),
        growthTrajectory: analysis.growthTrajectory,
        recommendations: analysis.recommendations,
        confidence: analysis.confidence,
        dataPoints: analysis.dataPoints
      }
    });

    // Generate career matches
    await generateCareerMatches(studentId, analysis.dimensions);

    return NextResponse.json({
      success: true,
      analysis: talentAnalysis,
      careerMatches: analysis.careerMatches
    });

  } catch (error) {
    console.error('Talent analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function performComprehensiveAnalysis(student: any) {
  const zai = await ZAI.create();

  // Analyze uploads
  const uploadAnalyses = student.uploads
    .filter((upload: any) => upload.analysis)
    .map((upload: any) => upload.analysis);

  // Analyze observations
  const observations = student.observations.map((obs: any) => ({
    content: obs.content,
    tags: obs.tags ? JSON.parse(obs.tags) : [],
    sentiment: obs.sentiment,
    teacher: obs.teacher.user.name
  }));

  // Prepare analysis prompt
  const analysisPrompt = `
    As an expert educational psychologist and talent development specialist, analyze this comprehensive student data:

    Student: ${student.user.name}
    Class: ${student.classGrade}
    
    Upload Analyses: ${JSON.stringify(uploadAnalyses, null, 2)}
    
    Teacher Observations: ${JSON.stringify(observations, null, 2)}
    
    Provide a comprehensive talent analysis covering these 8 dimensions:
    1. Academic Excellence
    2. Creative Thinking
    3. Technical Skills
    4. Analytical Ability
    5. Leadership
    6. Communication
    7. Physical & Wellness
    8. Social Skills
    
    Respond in JSON format:
    {
      "dimensions": {
        "academicExcellence": score (0-100),
        "creativeThinking": score,
        "technicalSkills": score,
        "analyticalAbility": score,
        "leadership": score,
        "communication": score,
        "physicalWellness": score,
        "socialSkills": score
      },
      "overallScore": overall_score,
      "strengths": ["strength1", "strength2", "strength3"],
      "improvementAreas": ["area1", "area2", "area3"],
      "recommendations": {
        "academic": ["rec1", "rec2"],
        "extracurricular": ["rec1", "rec2"],
        "career": ["rec1", "rec2"]
      },
      "confidence": confidence_score,
      "insights": "detailed narrative analysis"
    }
  `;

  const analysis = await zai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are an expert educational psychologist and talent development specialist with deep knowledge of NEP 2020 guidelines and Indian education system.'
      },
      {
        role: 'user',
        content: analysisPrompt
      }
    ],
    max_tokens: 2000,
    temperature: 0.3
  });

  const result = JSON.parse(analysis.choices[0]?.message?.content || '{}');

  return {
    dimensions: result.dimensions || {},
    overallScore: result.overallScore || 75,
    strengths: result.strengths || [],
    improvementAreas: result.improvementAreas || [],
    growthTrajectory: calculateGrowthTrajectory(uploadAnalyses),
    recommendations: result.recommendations || {},
    confidence: result.confidence || 75,
    dataPoints: uploadAnalyses.length + observations.length,
    insights: result.insights || 'Analysis completed successfully.'
  };
}

function calculateGrowthTrajectory(analyses: any[]) {
  // Simple growth trajectory calculation
  // In a real implementation, this would be more sophisticated
  const sortedAnalyses = analyses.sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return {
    timeline: sortedAnalyses.map((analysis, index) => ({
      period: `Period ${index + 1}`,
      creativity: analysis.talentMarkers?.creativity || 0,
      technicalThinking: analysis.talentMarkers?.technicalThinking || 0,
      overall: Object.values(analysis.talentMarkers || {}).reduce((a: number, b: any) => a + b, 0) / Object.keys(analysis.talentMarkers || {}).length
    })),
    trend: 'improving' // This would be calculated based on actual trends
  };
}

async function generateCareerMatches(studentId: string, dimensions: any) {
  const zai = await ZAI.create();

  const careerPrompt = `
    Based on these talent dimension scores, recommend the top 10 career paths:
    
    ${JSON.stringify(dimensions, null, 2)}
    
    Consider:
    1. Current job market demand in India
    2. Future growth potential
    3. Alignment with NEP 2020 vision
    4. Student's natural strengths
    
    Respond in JSON format:
    [
      {
        "careerName": "Career Title",
        "category": "STEM/Arts/Commerce/Other",
        "matchScore": score (0-100),
        "keySkills": ["skill1", "skill2", "skill3"],
        "description": "Brief career description",
        "educationPath": "Required education",
        "salaryRange": "Expected salary range",
        "demand": "HIGH/MEDIUM/LOW"
      }
    ]
  `;

  const careerAnalysis = await zai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a career counselor specializing in Indian education and job market trends.'
      },
      {
        role: 'user',
        content: careerPrompt
      }
    ],
    max_tokens: 1500,
    temperature: 0.3
  });

  const careerMatches = JSON.parse(careerAnalysis.choices[0]?.message?.content || '[]');

  // Save career matches to database
  for (const career of careerMatches.slice(0, 10)) {
    await db.careerMatch.create({
      data: {
        studentId,
        careerName: career.careerName,
        category: career.category,
        matchScore: career.matchScore,
        keySkills: JSON.stringify(career.keySkills),
        description: career.description,
        educationPath: career.educationPath,
        salaryRange: career.salaryRange,
        demand: career.demand as any
      }
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    const analyses = await db.talentAnalysis.findMany({
      where: { studentId },
      include: {
        student: {
          include: {
            user: {
              select: { name: true, email: true }
            }
          }
        }
      },
      orderBy: { analysisDate: 'desc' }
    });

    return NextResponse.json({ analyses });

  } catch (error) {
    console.error('Get analyses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}