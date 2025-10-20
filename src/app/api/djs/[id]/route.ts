import { NextRequest, NextResponse } from 'next/server';

// Mock DJ data with SoundCloud URLs - in production this would come from a database
const mockDJs = [
  {
    id: 'vinyl-mafia',
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
    id: 'andy-von-emmanuel',
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
    id: 'moses-m',
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
    id: 'pool-party-dj',
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

// GET /api/djs/[id] - Get specific DJ
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const dj = mockDJs.find(d => d.id === id);
    
    if (!dj) {
      return NextResponse.json(
        { success: false, error: 'DJ not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: dj
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch DJ' },
      { status: 500 }
    );
  }
}

// PUT /api/djs/[id] - Update specific DJ
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const djIndex = mockDJs.findIndex(d => d.id === id);
    
    if (djIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'DJ not found' },
        { status: 404 }
      );
    }
    
    // Update DJ data
    mockDJs[djIndex] = {
      ...mockDJs[djIndex],
      ...body,
      id: id // Ensure ID doesn't change
    };
    
    return NextResponse.json({
      success: true,
      data: mockDJs[djIndex]
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update DJ' },
      { status: 500 }
    );
  }
}

// DELETE /api/djs/[id] - Delete specific DJ
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const djIndex = mockDJs.findIndex(d => d.id === id);
    
    if (djIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'DJ not found' },
        { status: 404 }
      );
    }
    
    // Remove DJ
    const deletedDJ = mockDJs.splice(djIndex, 1)[0];
    
    return NextResponse.json({
      success: true,
      data: deletedDJ
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete DJ' },
      { status: 500 }
    );
  }
}
