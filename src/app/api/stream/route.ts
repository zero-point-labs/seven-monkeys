import { NextRequest, NextResponse } from 'next/server';
import { icecastService } from '@/lib/streaming/icecast';

// GET /api/stream/status - Get streaming status from Icecast
export async function GET() {
  try {
    const isRunning = await icecastService.isServerRunning();
    
    if (!isRunning) {
      return NextResponse.json({
        success: false,
        error: 'Icecast server is not running',
        data: {
          isStreaming: false,
          currentDJ: null,
          listeners: 0,
          serverStatus: 'down'
        }
      });
    }

    const streams = await icecastService.getAvailableStreams();
    const health = await icecastService.getServerHealth();
    
    // Find active DJ
    const activeStream = streams.find(stream => stream.isLive);
    
    return NextResponse.json({
      success: true,
      data: {
        isStreaming: health.status === 'healthy',
        currentDJ: activeStream?.djId || null,
        listeners: health.totalListeners,
        activeMounts: health.activeMounts,
        serverStatus: health.status,
        streams: streams.map(stream => ({
          djId: stream.djId,
          url: stream.url,
          listeners: stream.listeners,
          isLive: stream.isLive
        }))
      }
    });
  } catch (error) {
    console.error('Stream status error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get streaming status',
        data: {
          isStreaming: false,
          currentDJ: null,
          listeners: 0,
          serverStatus: 'error'
        }
      },
      { status: 500 }
    );
  }
}

// POST /api/stream/start - Start streaming (triggers Liquidsoap)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.djId) {
      return NextResponse.json(
        { success: false, error: 'DJ ID is required' },
        { status: 400 }
      );
    }

    // Check if Icecast is running
    const isRunning = await icecastService.isServerRunning();
    if (!isRunning) {
      return NextResponse.json(
        { success: false, error: 'Icecast server is not running' },
        { status: 503 }
      );
    }

    // Get current stream status
    const streams = await icecastService.getAvailableStreams();
    const targetStream = streams.find(stream => stream.djId === body.djId);
    
    if (!targetStream) {
      return NextResponse.json(
        { success: false, error: `DJ ${body.djId} stream not found` },
        { status: 404 }
      );
    }

    // In production, this would trigger Liquidsoap to start streaming
    // For now, we'll simulate the stream being active
    const mountStats = await icecastService.getMountStats(`/dj${body.djId}`);
    
    return NextResponse.json({
      success: true,
      data: {
        isStreaming: true,
        currentDJ: body.djId,
        listeners: mountStats?.listeners || 0,
        streamUrl: targetStream.url,
        message: `DJ ${body.djId} stream started successfully`
      }
    });
  } catch (error) {
    console.error('Start stream error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to start stream' },
      { status: 500 }
    );
  }
}

// PUT /api/stream/stop - Stop streaming
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const djId = body.djId;

    // Check if Icecast is running
    const isRunning = await icecastService.isServerRunning();
    if (!isRunning) {
      return NextResponse.json(
        { success: false, error: 'Icecast server is not running' },
        { status: 503 }
      );
    }

    // In production, this would stop Liquidsoap streaming
    // For now, we'll just return success
    const health = await icecastService.getServerHealth();
    
    return NextResponse.json({
      success: true,
      data: {
        isStreaming: false,
        currentDJ: null,
        listeners: 0,
        serverStatus: health.status,
        message: djId ? `DJ ${djId} stream stopped` : 'All streams stopped'
      }
    });
  } catch (error) {
    console.error('Stop stream error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to stop stream' },
      { status: 500 }
    );
  }
}

// PATCH /api/stream/update-listeners - Update listener count (real-time from Icecast)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.djId) {
      return NextResponse.json(
        { success: false, error: 'DJ ID is required' },
        { status: 400 }
      );
    }

    // Get real listener count from Icecast
    const mountStats = await icecastService.getMountStats(`/dj${body.djId}`);
    
    if (!mountStats) {
      return NextResponse.json(
        { success: false, error: `Mount /dj${body.djId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        djId: body.djId,
        listeners: mountStats.listeners,
        listenerPeak: mountStats.listener_peak,
        bitrate: mountStats.bitrate,
        isLive: mountStats.listeners > 0
      }
    });
  } catch (error) {
    console.error('Update listeners error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update listeners' },
      { status: 500 }
    );
  }
}
