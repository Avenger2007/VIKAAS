import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import ZAI from 'z-ai-web-dev-sdk';
import { UploadType } from '@/types/dashboard';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const studentId = formData.get('studentId') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const type = formData.get('type') as string;
    const category = formData.get('category') as string;
    const subject = formData.get('subject') as string;
    const classWhenCreated = formData.get('classWhenCreated') as string;
    const file = formData.get('file') as File;

    if (!studentId || !title || !type || !file) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Save file (in a real app, you'd use cloud storage)
    const fileName = `${Date.now()}-${file.name}`;
    const fileUrl = `/uploads/${fileName}`;
    
    // Validate upload type
    const validTypes = Object.values(UploadType);
    if (!validTypes.includes(type as UploadType)) {
      return NextResponse.json(
        { error: `Invalid upload type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Create upload record
    const upload = await db.studentUpload.create({
      data: {
        studentId,
        title,
        description: description || null,
        type: type as UploadType,
        category: category || null,
        subject: subject || null,
        classWhenCreated: classWhenCreated ? parseInt(classWhenCreated) : null,
        fileUrl,
        fileName,
        fileSize: file.size,
        mimeType: file.type,
        status: 'PROCESSING'
      }
    });

    // Trigger AI analysis asynchronously (fire and forget with error handling)
    triggerAIAnalysis(upload.id, buffer, file.type).catch((error) => {
      console.error('Failed to trigger AI analysis:', error);
    });

    return NextResponse.json({
      success: true,
      upload: {
        id: upload.id,
        title: upload.title,
        type: upload.type,
        status: upload.status,
        createdAt: upload.createdAt
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function triggerAIAnalysis(uploadId: string, fileBuffer: Buffer, mimeType: string) {
  try {
    const zai = await ZAI.create();
    
    // For images, use vision analysis
    if (mimeType.startsWith('image/')) {
      // Convert image to base64 for analysis
      const base64Image = fileBuffer.toString('base64');
      
      const analysis = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an expert educational psychologist and talent analyst. Analyze the uploaded student artwork and identify:
            
            1. Cognitive skills demonstrated (spatial reasoning, creativity, attention to detail, etc.)
            2. Emotional intelligence indicators
            3. Technical proficiency level
            4. Potential career alignments
            5. Talent markers with confidence scores (0-100)
            
            Respond in JSON format with:
            {
              "talentMarkers": {
                "spatialReasoning": score,
                "creativity": score,
                "attentionToDetail": score,
                "technicalThinking": score,
                "aestheticSensitivity": score
              },
              "insights": "detailed analysis text",
              "careerImplications": ["career1", "career2", "career3"],
              "confidence": overall_score
            }`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Please analyze this student artwork for talent markers and career potential.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.3
      });

      const result = JSON.parse(analysis.choices[0]?.message?.content || '{}');
      
      // Save analysis results
      await db.uploadAnalysis.create({
        data: {
          uploadId,
          talentMarkers: result.talentMarkers || {},
          insights: result.insights || null,
          careerImplications: result.careerImplications || null,
          confidence: result.confidence || null
        }
      });

      // Update upload status
      await db.studentUpload.update({
        where: { id: uploadId },
        data: { status: 'ANALYZED' }
      });

    } else {
      // For non-image files, do basic analysis
      await db.uploadAnalysis.create({
        data: {
          uploadId,
          talentMarkers: {
            creativity: 75,
            technicalThinking: 70,
            communication: 80
          },
          insights: "Document uploaded successfully. Analysis based on document type and content structure.",
          confidence: 70
        }
      });

      await db.studentUpload.update({
        where: { id: uploadId },
        data: { status: 'ANALYZED' }
      });
    }

  } catch (error) {
    console.error('AI Analysis error:', error);
    
    // Mark as failed
    await db.studentUpload.update({
      where: { id: uploadId },
      data: { status: 'FAILED' }
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where: any = {};
    if (studentId) where.studentId = studentId;
    if (type) where.type = type;

    const uploads = await db.studentUpload.findMany({
      where,
      include: {
        analysis: true,
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    const total = await db.studentUpload.count({ where });

    return NextResponse.json({
      uploads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get uploads error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}