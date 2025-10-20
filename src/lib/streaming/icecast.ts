// Real Icecast Integration Service
// This service handles actual streaming to Icecast server

import axios from 'axios';

export interface IcecastStats {
  source: {
    mount: string;
    listeners: number;
    listener_peak: number;
    bitrate: number;
    samplerate: number;
    channels: number;
    server_name: string;
    server_description: string;
    server_url: string;
    server_type: string;
    genre: string;
    title: string;
  };
}

export interface IcecastMount {
  mount: string;
  listeners: number;
  listener_peak: number;
  bitrate: number;
  samplerate: number;
  channels: number;
  server_name: string;
  server_description: string;
  server_url: string;
  server_type: string;
  genre: string;
  title: string;
}

class IcecastService {
  private baseUrl: string;
  private adminPassword: string;

  constructor() {
    this.baseUrl = `http://${process.env.ICECAST_HOST || 'localhost'}:${process.env.ICECAST_PORT || '8000'}`;
    this.adminPassword = process.env.ICECAST_PASSWORD || 'sevenmonkeys2024';
  }

  // Get Icecast server statistics
  async getServerStats(): Promise<IcecastStats[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/admin/stats`, {
        auth: {
          username: 'admin',
          password: this.adminPassword
        },
        timeout: 5000
      });

      return response.data.icestats.source || [];
    } catch (error) {
      console.error('Failed to get Icecast stats:', error);
      return [];
    }
  }

  // Get specific mount point statistics
  async getMountStats(mount: string): Promise<IcecastMount | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/admin/stats`, {
        auth: {
          username: 'admin',
          password: this.adminPassword
        },
        timeout: 5000
      });

      const sources = response.data.icestats.source || [];
      const mountData = Array.isArray(sources) 
        ? sources.find((source: { mount: string }) => source.mount === mount)
        : sources.mount === mount ? sources : null;

      return mountData || null;
    } catch (error) {
      console.error(`Failed to get mount stats for ${mount}:`, error);
      return null;
    }
  }

  // Check if Icecast server is running
  async isServerRunning(): Promise<boolean> {
    try {
      await axios.get(`${this.baseUrl}/status.xsl`, { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get stream URL for a specific DJ
  getStreamUrl(djId: string): string {
    return `${this.baseUrl}/dj${djId}`;
  }

  // Get all available DJ streams
  async getAvailableStreams(): Promise<{ djId: string; url: string; listeners: number; isLive: boolean }[]> {
    try {
      const stats = await this.getServerStats();
      const streams = [];

      for (let i = 1; i <= 4; i++) {
        const mount = `/dj${i}`;
        const mountStats = stats.find(stat => stat.source.mount === mount);
        
        streams.push({
          djId: i.toString(),
          url: this.getStreamUrl(i.toString()),
          listeners: mountStats?.source.listeners || 0,
          isLive: (mountStats?.source?.listeners || 0) > 0
        });
      }

      return streams;
    } catch (error) {
      console.error('Failed to get available streams:', error);
      return [];
    }
  }

  // Update mount point metadata
  async updateMountMetadata(mount: string, metadata: {
    title?: string;
    description?: string;
    genre?: string;
    url?: string;
  }): Promise<boolean> {
    try {
      // This would require a custom Icecast module or external tool
      // For now, we'll log the request
      console.log(`Updating mount ${mount} metadata:`, metadata);
      return true;
    } catch (error) {
      console.error(`Failed to update mount ${mount} metadata:`, error);
      return false;
    }
  }

  // Get server health status
  async getServerHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'down';
    uptime: number;
    totalListeners: number;
    activeMounts: number;
  }> {
    try {
      const isRunning = await this.isServerRunning();
      if (!isRunning) {
        return {
          status: 'down',
          uptime: 0,
          totalListeners: 0,
          activeMounts: 0
        };
      }

      const stats = await this.getServerStats();
      const totalListeners = stats.reduce((sum, stat) => sum + stat.source.listeners, 0);
      const activeMounts = stats.filter(stat => stat.source.listeners > 0).length;

      return {
        status: activeMounts > 0 ? 'healthy' : 'degraded',
        uptime: Date.now(), // Would need actual uptime from Icecast
        totalListeners,
        activeMounts
      };
    } catch (error) {
      console.error('Failed to get server health:', error);
      return {
        status: 'down',
        uptime: 0,
        totalListeners: 0,
        activeMounts: 0
      };
    }
  }
}

export const icecastService = new IcecastService();
