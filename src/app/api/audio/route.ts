import { NextRequest, NextResponse } from 'next/server';

// Mock audio files - in production this would come from a database
const audioFiles = [
  {
    id: '1',
    filename: 'deep-house-session-1.mp3',
    title: 'Deep House Sessions Vol. 1',
    artist: 'Vinyl Mafia',
    duration: 1800, // 30 minutes in seconds
    size: 28800000, // 28.8 MB
    genre: 'House',
    uploadDate: '2024-01-15T10:30:00Z',
    status: 'active',
    playCount: 42
  },
  {
    id: '2',
    filename: 'electric-soulgarden.mp3',
    title: 'Electric Soulgarden Mix',
    artist: 'Andy Von Emmanuel',
    duration: 2400, // 40 minutes
    size: 38400000, // 38.4 MB
    genre: 'Deep House',
    uploadDate: '2024-01-16T14:20:00Z',
    status: 'active',
    playCount: 28
  },
  {
    id: '3',
    filename: 'chill-sunset-vibes.mp3',
    title: 'Chill Sunset Vibes',
    artist: 'Moses M',
    duration: 2100, // 35 minutes
    size: 33600000, // 33.6 MB
    genre: 'Sundown House',
    uploadDate: '2024-01-17T09:15:00Z',
    status: 'active',
    playCount: 15
  },
  {
    id: '4',
    filename: 'tropical-paradise.mp3',
    title: 'Tropical Paradise Mix',
    artist: 'Pool Party DJ',
    duration: 2700, // 45 minutes
    size: 43200000, // 43.2 MB
    genre: 'Tropical House',
    uploadDate: '2024-01-18T16:45:00Z',
    status: 'active',
    playCount: 33
  }
];

// GET /api/audio - Get all audio files
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let filteredFiles = audioFiles;
    
    // Filter by genre
    if (genre) {
      filteredFiles = filteredFiles.filter(file => 
        file.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }
    
    // Filter by status
    if (status) {
      filteredFiles = filteredFiles.filter(file => file.status === status);
    }
    
    // Pagination
    const paginatedFiles = filteredFiles.slice(offset, offset + limit);
    
    return NextResponse.json({
      success: true,
      data: paginatedFiles,
      total: filteredFiles.length,
      limit,
      offset
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch audio files' },
      { status: 500 }
    );
  }
}

// POST /api/audio - Upload new audio file
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.filename || !body.title || !body.artist) {
      return NextResponse.json(
        { success: false, error: 'Filename, title, and artist are required' },
        { status: 400 }
      );
    }
    
    // Create new audio file
    const newFile = {
      id: (audioFiles.length + 1).toString(),
      filename: body.filename,
      title: body.title,
      artist: body.artist,
      duration: body.duration || 0,
      size: body.size || 0,
      genre: body.genre || 'Unknown',
      uploadDate: new Date().toISOString(),
      status: 'active',
      playCount: 0
    };
    
    audioFiles.push(newFile);
    
    return NextResponse.json({
      success: true,
      data: newFile
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to upload audio file' },
      { status: 500 }
    );
  }
}

// DELETE /api/audio - Delete audio file
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'File ID is required' },
        { status: 400 }
      );
    }
    
    const fileIndex = audioFiles.findIndex(file => file.id === id);
    
    if (fileIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      );
    }
    
    const deletedFile = audioFiles.splice(fileIndex, 1)[0];
    
    return NextResponse.json({
      success: true,
      data: deletedFile,
      message: 'File deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
