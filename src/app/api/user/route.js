import { NextResponse } from 'next/server';

// Mock user data
const mockUser = {
  id: '1',
  username: 'devvasu18',
  displayName: 'Vasu Dev',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  followers: 1247,
  following: 856,
  posts: 42,
  isVerified: true,
  bio: 'Full Stack Developer | React & Next.js | Building cool stuff 🚀',
  location: 'Mumbai, India',
  website: 'https://devvasu.dev',
  joinedDate: '2022-03-15'
};

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({
      success: true,
      data: mockUser
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const updates = await request.json();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock update logic
    const updatedUser = { ...mockUser, ...updates };
    
    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update user data' },
      { status: 500 }
    );
  }
}