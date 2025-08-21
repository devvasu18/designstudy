import { NextResponse } from 'next/server';

// Mock discover data
const mockDiscoverUsers = [
  {
    id: '1',
    username: 'sarah.johnson',
    displayName: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
    followers: 2456,
    isVerified: true,
    mutualFriends: 8,
    category: 'suggested'
  },
  {
    id: '2',
    username: 'mike.chen',
    displayName: 'Mike Chen',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    followers: 1234,
    isVerified: false,
    mutualFriends: 3,
    category: 'suggested'
  },
  {
    id: '3',
    username: 'anna.garcia',
    displayName: 'Anna Garcia',
    avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
    followers: 5678,
    isVerified: true,
    mutualFriends: 12,
    category: 'trending'
  },
  {
    id: '4',
    username: 'david.smith',
    displayName: 'David Smith',
    avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
    followers: 987,
    isVerified: false,
    mutualFriends: 1,
    category: 'nearby'
  }
];

const mockDiscoverPosts = [
  {
    id: '1',
    user: mockDiscoverUsers[0],
    image: 'https://picsum.photos/400/400?random=10',
    likes: 324,
    comments: 45,
    caption: 'Beautiful sunset at the beach 🌅',
    timestamp: Date.now() - 3600000
  },
  {
    id: '2',
    user: mockDiscoverUsers[1],
    image: 'https://picsum.photos/400/400?random=11',
    likes: 156,
    comments: 23,
    caption: 'Coffee and code ☕💻',
    timestamp: Date.now() - 7200000
  },
  {
    id: '3',
    user: mockDiscoverUsers[2],
    image: 'https://picsum.photos/400/400?random=12',
    likes: 789,
    comments: 92,
    caption: 'Weekend vibes ✨',
    timestamp: Date.now() - 14400000
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'users';
    const category = searchParams.get('category') || 'all';
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let data;
    
    if (type === 'posts') {
      data = mockDiscoverPosts;
    } else {
      data = category === 'all' 
        ? mockDiscoverUsers 
        : mockDiscoverUsers.filter(user => user.category === category);
    }
    
    return NextResponse.json({
      success: true,
      data,
      type,
      category
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discover data' },
      { status: 500 }
    );
  }
}