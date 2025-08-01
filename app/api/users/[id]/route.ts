import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;
    const scriptPath = path.join(process.cwd(), 'scripts', 'data_service.py');
    const { stdout, stderr } = await execAsync(`python "${scriptPath}" get_user "${userId}"`);
    
    if (stderr) {
      console.error('Python script error:', stderr);
      return NextResponse.json(
        { error: 'Python script execution failed', details: stderr },
        { status: 500 }
      );
    }

    const data = JSON.parse(stdout);
    
    // Check if user was found
    if (data.error) {
      return NextResponse.json(data, { status: 404 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to execute Python script', 
        details: error instanceof Error ? error.message : 'Unknown error',
        suggestion: 'Make sure Python is installed and accessible from the command line'
      },
      { status: 500 }
    );
  }
}