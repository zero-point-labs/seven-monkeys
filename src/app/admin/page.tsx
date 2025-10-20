'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import BrandLogo from '@/components/brand/BrandLogo';
import ThemeIcon from '@/components/brand/ThemeIcon';
import { AudioProvider, useAudio } from '@/contexts/AudioContext';
import { DJ, AudioFile } from '@/lib/api';

// Enhanced Admin Dashboard with File Management
function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const { currentDJ, isPlaying, djs, refreshDJs } = useAudio();

  // File management state
  const [audioFiles, setAudioFiles] = useState<{[key: string]: AudioFile[]}>({
    dj1: [],
    dj2: [],
    dj3: [],
    dj4: []
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDJ, setSelectedDJ] = useState('dj1');

  // Mock data for admin dashboard
  const [streamStats, setStreamStats] = useState({
    totalListeners: 0,
    activeStreams: 0,
    uptime: '0h 0m',
    bandwidth: '0 MB/s'
  });

  useEffect(() => {
    // Update stream stats
    const totalListeners = djs.reduce((sum: number, dj: DJ) => sum + dj.listeners, 0);
    setStreamStats(prev => ({
      ...prev,
      totalListeners,
      activeStreams: djs.length
    }));
  }, [djs]);

  // File management functions
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setUploadProgress(0);

    // Simulate file upload to VPS
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call to upload file
    setTimeout(() => {
      const newFile: AudioFile = {
        id: Date.now().toString(),
        filename: file.name,
        title: file.name.split('.')[0],
        artist: 'Unknown Artist',
        duration: 0,
        size: file.size,
        genre: 'Unknown',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'active',
        playCount: 0
      };

      setAudioFiles(prev => ({
        ...prev,
        [selectedDJ]: [...prev[selectedDJ], newFile]
      }));

      clearInterval(uploadInterval);
      setIsLoading(false);
      setUploadProgress(0);
    }, 2000);
  };

  const handleDeleteFile = async (fileId: string, djId: string) => {
    // Simulate API call to delete file from VPS
    setAudioFiles(prev => ({
      ...prev,
      [djId]: prev[djId].filter(file => file.id !== fileId)
    }));
  };

  const handleSyncFiles = async () => {
    setIsLoading(true);
    
    // Simulate syncing files from VPS
    setTimeout(() => {
      // Mock file data from VPS
      const mockFiles = {
        dj1: [
          {
            id: '1',
            filename: 'summer-vibes.mp3',
            title: 'Summer Vibes',
            artist: 'Unknown Artist',
            duration: 225, // 3:45 in seconds
            size: 4400000, // 4.2 MB in bytes
            genre: 'House',
            uploadDate: '2024-01-15',
            status: 'active' as const,
            playCount: 0
          }
        ],
        dj2: [
          {
            id: '2',
            filename: 'deep-house-mix.mp3',
            title: 'Deep House Mix',
            artist: 'Unknown Artist',
            duration: 320, // 5:20 in seconds
            size: 6800000, // 6.8 MB in bytes
            genre: 'Deep House',
            uploadDate: '2024-01-14',
            status: 'active' as const,
            playCount: 0
          }
        ],
        dj3: [],
        dj4: []
      };

      setAudioFiles(mockFiles);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BrandLogo size="md" variant="full" className="text-white" />
              <Badge variant="outline" className="border-orange-400 text-orange-400">
                Admin Dashboard
              </Badge>
              <Badge variant="outline" className="border-green-400 text-green-400">
                VPS Connected
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-orange-400 text-orange-400 hover:bg-orange-400/10"
                onClick={handleSyncFiles}
              >
                <ThemeIcon type="save" size="sm" className="mr-2" />
                Sync Files
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-orange-400 text-orange-400 hover:bg-orange-400/10"
              >
                <ThemeIcon type="music" size="sm" className="mr-2" />
                Music Platform
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-pink-400 text-pink-400 hover:bg-pink-400/10"
              >
                <ThemeIcon type="home" size="sm" className="mr-2" />
                Bar Website
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your DJ platform and streaming controls</p>
          <div className="mt-2 text-sm text-gray-500">
            <span className="text-green-400">●</span> Connected to VPS: 72.60.188.8
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-400 text-sm font-medium">Total Listeners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{streamStats.totalListeners}</div>
              <p className="text-xs text-gray-400">Across all streams</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-pink-400 text-sm font-medium">Active Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{streamStats.activeStreams}</div>
              <p className="text-xs text-gray-400">Currently live</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-400 text-sm font-medium">VPS Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">Online</div>
              <p className="text-xs text-gray-400">Icecast Server</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-pink-400 text-sm font-medium">Storage Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2.1 GB</div>
              <p className="text-xs text-gray-400">Audio files</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-400 data-[state=active]:text-black">
              Overview
            </TabsTrigger>
            <TabsTrigger value="djs" className="data-[state=active]:bg-orange-400 data-[state=active]:text-black">
              DJ Management
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-orange-400 data-[state=active]:text-black">
              File Manager
            </TabsTrigger>
            <TabsTrigger value="streaming" className="data-[state=active]:bg-orange-400 data-[state=active]:text-black">
              Streaming
            </TabsTrigger>
            <TabsTrigger value="vps" className="data-[state=active]:bg-orange-400 data-[state=active]:text-black">
              VPS Control
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Stream Status */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Current Stream Status</CardTitle>
                  <CardDescription>Live streaming information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentDJ ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Now Playing:</span>
                        <span className="text-white font-medium">{currentDJ.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Status:</span>
                        <Badge className={isPlaying ? "bg-green-500" : "bg-red-500"}>
                          {isPlaying ? "Live" : "Paused"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Listeners:</span>
                        <span className="text-orange-400 font-medium">{currentDJ.listeners}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">SoundCloud URL:</span>
                        <span className="text-white font-medium text-xs">{currentDJ.soundcloudUrl || 'Not set'}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ThemeIcon type="music" size="lg" className="mx-auto mb-4 text-gray-500" />
                      <p className="text-gray-400">No active stream</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-black font-bold">
                    <ThemeIcon type="upload" className="mr-2" />
                    Upload New Audio
                  </Button>
                  <Button variant="outline" className="w-full border-orange-400 text-orange-400 hover:bg-orange-400/10">
                    <ThemeIcon type="edit" className="mr-2" />
                    Manage DJs
                  </Button>
                  <Button variant="outline" className="w-full border-pink-400 text-pink-400 hover:bg-pink-400/10">
                    <ThemeIcon type="save" className="mr-2" />
                    Sync VPS Files
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* DJ Management Tab */}
          <TabsContent value="djs" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">DJ Management</CardTitle>
                <CardDescription>Manage DJ profiles and streaming settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {djs.map((dj: DJ) => (
                    <div key={dj.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                          <ThemeIcon type="music" size="sm" className="text-black" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{dj.name}</h3>
                          <p className="text-gray-400 text-sm">{dj.genre}</p>
                          <p className="text-gray-500 text-xs">SoundCloud: {dj.soundcloudUser || 'Not set'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={dj.listeners > 0 ? "bg-green-500" : "bg-gray-500"}>
                          {dj.listeners} listeners
                        </Badge>
                        <Button variant="outline" size="sm" className="border-orange-400 text-orange-400 hover:bg-orange-400/10">
                          <ThemeIcon type="edit" size="sm" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* File Manager Tab */}
          <TabsContent value="files" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">File Manager</CardTitle>
                    <CardDescription>Manage audio files on VPS</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select value={selectedDJ} onValueChange={setSelectedDJ}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dj1">DJ 1</SelectItem>
                        <SelectItem value="dj2">DJ 2</SelectItem>
                        <SelectItem value="dj3">DJ 3</SelectItem>
                        <SelectItem value="dj4">DJ 4</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="audio-upload"
                    />
                    <Label htmlFor="audio-upload">
                      <Button asChild className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-black font-bold">
                        <span>
                          <ThemeIcon type="upload" className="mr-2" />
                          Upload
                        </span>
                      </Button>
                    </Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading && (
                  <div className="mb-4">
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-gray-400 mt-2">Uploading to VPS...</p>
                  </div>
                )}
                <div className="space-y-3">
                  {audioFiles[selectedDJ].map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center space-x-4">
                        <ThemeIcon type="music" size="sm" className="text-orange-400" />
                        <div>
                          <h3 className="text-white font-medium">{file.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                            <span>{Math.floor(file.duration / 60)}:{(file.duration % 60).toString().padStart(2, '0')}</span>
                            <span>{file.genre}</span>
                            <span>{file.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={file.status === 'active' ? "bg-green-500" : "bg-yellow-500"}>
                          {file.status}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-400 text-red-400 hover:bg-red-400/10"
                          onClick={() => handleDeleteFile(file.id, selectedDJ)}
                        >
                          <ThemeIcon type="delete" size="sm" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {audioFiles[selectedDJ].length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <ThemeIcon type="music" size="lg" className="mx-auto mb-4" />
                      <p>No audio files for {selectedDJ}</p>
                      <p className="text-sm">Upload files to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Streaming Tab */}
          <TabsContent value="streaming" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Stream Controls</CardTitle>
                  <CardDescription>Control the streaming server</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-bold">
                      <ThemeIcon type="play" className="mr-2" />
                      Start Stream
                    </Button>
                    <Button variant="outline" className="w-full border-red-400 text-red-400 hover:bg-red-400/10">
                      <ThemeIcon type="stop" className="mr-2" />
                      Stop Stream
                    </Button>
                    <Button variant="outline" className="w-full border-orange-400 text-orange-400 hover:bg-orange-400/10">
                      <ThemeIcon type="pause" className="mr-2" />
                      Pause Stream
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">VPS Server Status</CardTitle>
                  <CardDescription>Icecast server information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Server Status:</span>
                      <Badge className="bg-green-500">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Icecast Version:</span>
                      <span className="text-white">2.4.4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Server IP:</span>
                      <span className="text-white">72.60.188.8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Port:</span>
                      <span className="text-white">8000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Admin URL:</span>
                      <a href="http://72.60.188.8:8000/admin" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">
                        Open Icecast Admin
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* VPS Control Tab */}
          <TabsContent value="vps" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">VPS Management</CardTitle>
                  <CardDescription>Control your Hostinger VPS</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold">
                      <ThemeIcon type="external-link" className="mr-2" />
                      Open Hostinger Panel
                    </Button>
                    <Button variant="outline" className="w-full border-green-400 text-green-400 hover:bg-green-400/10">
                      <ThemeIcon type="save" className="mr-2" />
                      SSH Terminal
                    </Button>
                    <Button variant="outline" className="w-full border-orange-400 text-orange-400 hover:bg-orange-400/10">
                      <ThemeIcon type="edit" className="mr-2" />
                      File Manager
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Commands</CardTitle>
                  <CardDescription>Common VPS operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400 mb-1">Check Icecast Status:</p>
                      <code className="text-orange-400 text-xs">docker-compose ps</code>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400 mb-1">View Logs:</p>
                      <code className="text-orange-400 text-xs">docker-compose logs -f icecast</code>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400 mb-1">Restart Services:</p>
                      <code className="text-orange-400 text-xs">docker-compose restart</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Main Admin Dashboard Component with Audio Provider
export default function AdminDashboard() {
  return (
    <AudioProvider>
      <AdminDashboardContent />
    </AudioProvider>
  );
}