import { NextRequest, NextResponse } from 'next/server';
import { icecastService } from '@/lib/streaming/icecast';

// DJ data with SoundCloud URLs
const djProfiles = [
  {
    id: '1',
    name: 'Vinyl Mafia',
    genre: 'House Music',
    status: 'live',
    description: 'Legendary house music vibes with soul-stirring beats',
    avatar: 'dj',
    listeners: 42,
    currentTrack: 'I Feel Like Slapping A N Today',
    soundcloudUrl: 'https://soundcloud.com/christopher-yohaya-mamunu-adjetey/i-feel-like-slapping-a-n-today',
    soundcloudTrackId: 'christopher-yohaya-mamunu-adjetey/i-feel-like-slapping-a-n-today',
    soundcloudUser: 'christopher-yohaya-mamunu-adjetey'
  },
  {
    id: '2',
    name: 'Andy Von Emmanuel',
    genre: 'Deep House',
    status: 'live',
    description: 'Soulful deep house that moves your spirit',
    avatar: 'soulful',
    listeners: 28,
    currentTrack: 'Electric Soulgarden Mix',
    soundcloudUrl: 'https://soundcloud.com/andyvonemmanuel/electric-soulgarden-mix',
    soundcloudTrackId: '987654321',
    soundcloudUser: 'andyvonemmanuel'
  },
  {
    id: '3',
    name: 'Moses M',
    genre: 'Sundown House',
    status: 'live',
    description: 'Sundown house sessions for lazy Sundays',
    avatar: 'lazy-sunday',
    listeners: 15,
    currentTrack: 'Chill Sunset Vibes',
    soundcloudUrl: 'https://soundcloud.com/mosesm/chill-sunset-vibes',
    soundcloudTrackId: '456789123',
    soundcloudUser: 'mosesm'
  },
  {
    id: '4',
    name: 'Pool Party DJ',
    genre: 'Tropical House',
    status: 'live',
    description: 'Tropical vibes for pool parties',
    avatar: 'pool-party',
    listeners: 33,
    currentTrack: 'Tropical Paradise Mix',
    soundcloudUrl: 'https://soundcloud.com/poolpartydj/tropical-paradise-mix',
    soundcloudTrackId: '789123456',
    soundcloudUser: 'poolpartydj'
  }
];

// GET /api/djs - Get all DJs with real Icecast data
export async function GET() {
  try {
    // Get real-time data from Icecast
    const streams = await icecastService.getAvailableStreams();
    const isServerRunning = await icecastService.isServerRunning();
    
    // Merge DJ profiles with real-time stream data
    const djsWithStreamData = djProfiles.map(dj => {
      const streamData = streams.find(stream => stream.djId === dj.id);
      
      return {
        ...dj,
        listeners: streamData?.listeners || 0,
        isLive: streamData?.isLive || false,
        streamUrl: streamData?.url || '',
        serverStatus: isServerRunning ? 'online' : 'offline'
      };
    });
    
    return NextResponse.json({
      success: true,
      data: djsWithStreamData,
      total: djsWithStreamData.length,
      serverStatus: isServerRunning ? 'online' : 'offline'
    });
  } catch (error) {
    console.error('DJs API error:', error);
    
    // Fallback to static data if Icecast is unavailable
    const fallbackDJs = djProfiles.map(dj => ({
      ...dj,
      listeners: 0,
      isLive: false,
      streamUrl: '',
      serverStatus: 'offline'
    }));
    
    return NextResponse.json({
      success: true,
      data: fallbackDJs,
      total: fallbackDJs.length,
      serverStatus: 'offline',
      warning: 'Icecast server unavailable - showing offline data'
    });
  }
}

// POST /api/djs - Create a new DJ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.genre) {
      return NextResponse.json(
        { success: false, error: 'Name and genre are required' },
        { status: 400 }
      );
    }
    
    // Generate new DJ ID
    const newId = (djProfiles.length + 1).toString();
    const newMountPoint = `/dj${newId}`;
    
    // Create new DJ
    const newDJ = {
      id: newId,
      name: body.name,
      genre: body.genre,
      status: 'offline',
      description: body.description || '',
      avatar: body.avatar || 'dj',
      currentTrack: 'No track playing',
      listeners: 0,
      soundcloudUrl: body.soundcloudUrl || '',
      soundcloudTrackId: body.soundcloudTrackId || '',
      soundcloudUser: body.soundcloudUser || ''
    };
    
    // In production, save to database
    djProfiles.push(newDJ);
    
    return NextResponse.json({
      success: true,
      data: newDJ
    }, { status: 201 });
  } catch (error) {
    console.error('Create DJ error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create DJ' },
      { status: 500 }
    );
  }
}
