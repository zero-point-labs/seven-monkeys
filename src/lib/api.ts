// API utility functions for Seven Monkeys DJ Platform

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface DJ {
  id: string;
  name: string;
  genre: string;
  status: 'live' | 'offline';
  description: string;
  avatar: string;
  listeners: number;
  currentTrack: string;
  soundcloudUrl?: string; // SoundCloud track or playlist URL
  soundcloudTrackId?: string; // SoundCloud track ID for embed
  soundcloudUser?: string; // SoundCloud username
}

export interface AudioFile {
  id: string;
  filename: string;
  title: string;
  artist: string;
  duration: number;
  size: number;
  genre: string;
  uploadDate: string;
  status: 'active' | 'inactive';
  playCount: number;
}

export interface StreamingStatus {
  isStreaming: boolean;
  currentDJ: string | null;
  listeners: number;
  bitrate: number;
  format: string;
  serverUrl: string;
  mountPoint: string;
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  
  return response.json();
}

// DJ Management API
export const djAPI = {
  // Get all DJs
  getAll: async (): Promise<DJ[]> => {
    const response = await apiRequest<{ success: boolean; data: DJ[] }>('/djs');
    return response.data;
  },

  // Get specific DJ
  getById: async (id: string): Promise<DJ> => {
    const response = await apiRequest<{ success: boolean; data: DJ }>(`/djs/${id}`);
    return response.data;
  },

  // Create new DJ
  create: async (djData: Partial<DJ>): Promise<DJ> => {
    const response = await apiRequest<{ success: boolean; data: DJ }>('/djs', {
      method: 'POST',
      body: JSON.stringify(djData),
    });
    return response.data;
  },

  // Update DJ
  update: async (id: string, djData: Partial<DJ>): Promise<DJ> => {
    const response = await apiRequest<{ success: boolean; data: DJ }>(`/djs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(djData),
    });
    return response.data;
  },

  // Delete DJ
  delete: async (id: string): Promise<void> => {
    await apiRequest(`/djs/${id}`, {
      method: 'DELETE',
    });
  },
};

// Streaming Control API
export const streamAPI = {
  // Get streaming status
  getStatus: async (): Promise<StreamingStatus> => {
    const response = await apiRequest<{ success: boolean; data: StreamingStatus }>('/stream/status');
    return response.data;
  },

  // Start streaming
  start: async (djId: string): Promise<StreamingStatus> => {
    const response = await apiRequest<{ success: boolean; data: StreamingStatus }>('/stream/start', {
      method: 'POST',
      body: JSON.stringify({ djId }),
    });
    return response.data;
  },

  // Stop streaming
  stop: async (): Promise<StreamingStatus> => {
    const response = await apiRequest<{ success: boolean; data: StreamingStatus }>('/stream', {
      method: 'PUT',
    });
    return response.data;
  },

  // Update listener count
  updateListeners: async (listeners: number): Promise<StreamingStatus> => {
    const response = await apiRequest<{ success: boolean; data: StreamingStatus }>('/stream', {
      method: 'PATCH',
      body: JSON.stringify({ listeners }),
    });
    return response.data;
  },
};

// Audio Management API
export const audioAPI = {
  // Get all audio files
  getAll: async (params?: {
    genre?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ data: AudioFile[]; total: number }> => {
    const searchParams = new URLSearchParams();
    if (params?.genre) searchParams.set('genre', params.genre);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());

    const endpoint = `/audio${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const response = await apiRequest<{ success: boolean; data: AudioFile[]; total: number }>(endpoint);
    return { data: response.data, total: response.total };
  },

  // Upload audio file
  upload: async (fileData: Partial<AudioFile>): Promise<AudioFile> => {
    const response = await apiRequest<{ success: boolean; data: AudioFile }>('/audio', {
      method: 'POST',
      body: JSON.stringify(fileData),
    });
    return response.data;
  },

  // Delete audio file
  delete: async (id: string): Promise<void> => {
    await apiRequest(`/audio?id=${id}`, {
      method: 'DELETE',
    });
  },
};

// Error handling utility
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Retry utility for failed requests
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError!;
}
