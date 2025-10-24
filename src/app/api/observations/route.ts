import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import ZAI from 'z-ai-web-dev-sdk';
import { ObservationType, SentimentType } from '@/types/dashboard';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const teacherId = formData.get('teacherId') as string;
    const studentId = formData.get('studentId') as string;
    const type = formData.get('type') as string;
    const content = formData.get('content') as string;
    const tags = formData.get('tags') as string;
    const context = formData.get('context') as string;
    const voiceNote = formData.get('voiceNote') as File;

    if (!teacherId || !studentId || !type || (!content && !voiceNote)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let processedContent = content;
    let voiceNoteUrl = null;

    // Process voice note if provided
    if (voiceNote) {
      // Save voice note file
      const fileName = `${Date.now()}-${voiceNote.name}`;
      voiceNoteUrl = `/voice-notes/${fileName}`;
      
      // In a real implementation, you'd save the file to cloud storage
      // For now, we'll simulate transcription
      processedContent = await transcribeVoiceNote(voiceNote);
    }

    // Validate observation type
    const validTypes = Object.values(ObservationType);
    if (!validTypes.includes(type as ObservationType)) {
      return NextResponse.json(
        { error: `Invalid observation type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Analyze sentiment using AI
    const sentiment = await analyzeSentiment(processedContent);

    // Create observation record
    const observation = await db.teacherObservation.create({
      data: {
        teacherId,
        studentId,
        type: type as ObservationType,
        content: processedContent,
        tags: tags || null,
        context: context || null,
        voiceNoteUrl,
        sentiment: sentiment as SentimentType
      }
    });

    return NextResponse.json({
      success: true,
      observation: {
        id: observation.id,
        content: observation.content,
        type: observation.type,
        sentiment: observation.sentiment,
        createdAt: observation.createdAt
      }
    });

  } catch (error) {
    console.error('Observation creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function transcribeVoiceNote(voiceNote: File): Promise<string> {
  try {
    // In a real implementation, you'd use a speech-to-text service
    // For now, we'll simulate transcription
    const zai = await ZAI.create();
    
    // Convert to buffer and then to base64
    const buffer = Buffer.from(await voiceNote.arrayBuffer());
    const base64Audio = buffer.toString('base64');

    const transcription = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a transcription assistant. Transcribe the audio content accurately and concisely.'
        },
        {
          role: 'user',
          content: `Please transcribe this voice note from a teacher about a student's performance. The audio contains: ${base64Audio.substring(0, 100)}...`
        }
      ],
      max_tokens: 500,
      temperature: 0.1
    });

    return transcription.choices[0]?.message?.content || 'Voice note transcription failed';
    
  } catch (error) {
    console.error('Transcription error:', error);
    return 'Voice note transcription unavailable';
  }
}

async function analyzeSentiment(content: string): Promise<SentimentType> {
  try {
    const zai = await ZAI.create();

    const sentimentAnalysis = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Analyze the sentiment of the given text. Respond with only one word: POSITIVE, NEUTRAL, or NEGATIVE.'
        },
        {
          role: 'user',
          content: content
        }
      ],
      max_tokens: 10,
      temperature: 0.1
    });

    const sentiment = sentimentAnalysis.choices[0]?.message?.content?.toUpperCase().trim();

    if (sentiment === SentimentType.POSITIVE || sentiment === SentimentType.NEUTRAL || sentiment === SentimentType.NEGATIVE) {
      return sentiment as SentimentType;
    }

    return SentimentType.NEUTRAL;

  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return SentimentType.NEUTRAL;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const teacherId = searchParams.get('teacherId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where: any = {};
    if (studentId) where.studentId = studentId;
    if (teacherId) where.teacherId = teacherId;

    const observations = await db.teacherObservation.findMany({
      where,
      include: {
        teacher: {
          include: {
            user: {
              select: { name: true }
            }
          }
        },
        student: {
          include: {
            user: {
              select: { name: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    const total = await db.teacherObservation.count({ where });

    return NextResponse.json({
      observations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get observations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}