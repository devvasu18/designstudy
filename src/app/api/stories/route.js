import { NextResponse } from 'next/server';

// Mock stories data
const mockStories = [
  {
    id: '1',
    username: 'devvasu18',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    hasNewStory: false,
    isAddStory: true,
    type: 'add'
  },
  {
    id: '2',
    username: 'riya.sharma',
    displayName: 'Riya Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    hasNewStory: true,
    mediaUrl: 'https://picsum.photos/400/700?random=1',
    timestamp: Date.now() - 3600000, // 1 hour ago
    views: 234,
    type: 'story'
  },
  {
    id: '3',
    username: 'john.doe',
    displayName: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    hasNewStory: true,
    mediaUrl: 'https://picsum.photos/400/700?random=2',
    timestamp: Date.now() - 7200000, // 2 hours ago
    views: 156,
    type: 'story'
  },
  {
    id: '4',
    username: 'emma.wilson',
    displayName: 'Emma Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
    hasNewStory: true,
    mediaUrl: 'https://picsum.photos/400/700?random=3',
    timestamp: Date.now() - 14400000, // 4 hours ago
    views: 89,
    type: 'story'
  },
  {
    id: '5',
    username: 'alex.martinez',
    displayName: 'Alex Martinez',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    hasNewStory: true,
    mediaUrl: 'https://picsum.photos/400/700?random=4',
    timestamp: Date.now() - 21600000, // 6 hours ago
    views: 267,
    type: 'story'
  }
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return NextResponse.json({
      success: true,
      data: mockStories
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const storyData = await request.json();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock story creation
    const newStory = {
      id: Date.now().toString(),
      username: 'devvasu18',
      displayName: 'Vasu Dev',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      hasNewStory: true,
      mediaUrl: storyData.mediaUrl || 'https://picsum.photos/400/700?random=5',
      timestamp: Date.now(),
      views: 0,
      type: 'story'
    };
    
    return NextResponse.json({
      success: true,
      data: newStory,
      message: 'Story uploaded successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to upload story' },
      { status: 500 }
    );
  }
}