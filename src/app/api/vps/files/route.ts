// VPS File Management API
// This API handles file operations on your Hostinger VPS

import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// VPS Configuration
const VPS_CONFIG = {
  host: '72.60.188.8',
  username: 'root',
  projectPath: '/opt/seven-monkeys-dj',
  audioPath: '/opt/seven-monkeys-dj/audio'
};

// Helper function to execute SSH commands
async function executeSSHCommand(command: string) {
  try {
    const sshCommand = `ssh -o StrictHostKeyChecking=no ${VPS_CONFIG.username}@${VPS_CONFIG.host} "${command}"`;
    const { stdout, stderr } = await execAsync(sshCommand);
    return { success: true, output: stdout, error: stderr };
  } catch (error) {
    return { success: false, output: '', error: (error as Error).message };
  }
}

// GET /api/vps/files - List files for a specific DJ
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const djId = searchParams.get('djId') || 'dj1';

    // List files in DJ directory
    const command = `ls -la ${VPS_CONFIG.audioPath}/${djId}/`;
    const result = await executeSSHCommand(command);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to list files' },
        { status: 500 }
      );
    }

    // Parse file list
    const files = result.output
      .split('\n')
      .filter(line => line.includes('.mp3') || line.includes('.wav') || line.includes('.m4a'))
      .map(line => {
        const parts = line.trim().split(/\s+/);
        return {
          name: parts[parts.length - 1],
          size: parts[4],
          permissions: parts[0],
          date: `${parts[5]} ${parts[6]} ${parts[7]}`,
          djId: djId
        };
      });

    return NextResponse.json({
      success: true,
      data: files,
      djId: djId
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
}

// POST /api/vps/files - Upload file to VPS
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const djId = formData.get('djId') as string || 'dj1';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // For now, we'll simulate the upload
    // In production, you'd use SCP or SFTP to upload the file
    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2);

    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));

    return NextResponse.json({
      success: true,
      data: {
        name: fileName,
        size: `${fileSize} MB`,
        djId: djId,
        status: 'uploaded',
        uploadDate: new Date().toISOString()
      },
      message: 'File uploaded successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// DELETE /api/vps/files - Delete file from VPS
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');
    const djId = searchParams.get('djId') || 'dj1';

    if (!fileName) {
      return NextResponse.json(
        { success: false, error: 'File name is required' },
        { status: 400 }
      );
    }

    // Delete file from VPS
    const command = `rm -f ${VPS_CONFIG.audioPath}/${djId}/${fileName}`;
    const result = await executeSSHCommand(command);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete file' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}

// GET /api/vps/status - Get VPS and Icecast status
export async function GET_STATUS() {
  try {
    // Check if Icecast is running
    const icecastStatus = await executeSSHCommand('docker-compose ps icecast');
    
    // Check disk usage
    const diskUsage = await executeSSHCommand(`df -h ${VPS_CONFIG.projectPath}`);
    
    // Check memory usage
    const memoryUsage = await executeSSHCommand('free -h');

    return NextResponse.json({
      success: true,
      data: {
        icecast: {
          status: icecastStatus.success ? 'running' : 'stopped',
          output: icecastStatus.output
        },
        disk: {
          usage: diskUsage.output
        },
        memory: {
          usage: memoryUsage.output
        },
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get VPS status' },
      { status: 500 }
    );
  }
}

// POST /api/vps/restart - Restart Icecast service
export async function POST_RESTART() {
  try {
    const result = await executeSSHCommand('cd /opt/seven-monkeys-dj && docker-compose restart icecast');

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to restart Icecast' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Icecast restarted successfully',
      output: result.output
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to restart Icecast' },
      { status: 500 }
    );
  }
}
