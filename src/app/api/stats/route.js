import { NextResponse } from 'next/server';

// Mock stats data
const mockStats = {
  followers: 1247,
  following: 856,
  dontFollowBack: 23,
  notFollowingBack: 189,
  blockedYou: 2,
  blockedByYou: 5,
  newFollowers: 12,
  lostFollowers: 3,
  engagementRate: 4.2,
  topPosts: [
    {
      id: '1',
      image: 'https://picsum.photos/300/300?random=1',
      likes: 324,
      comments: 45
    },
    {
      id: '2', 
      image: 'https://picsum.photos/300/300?random=2',
      likes: 289,
      comments: 32
    }
  ],
  weeklyGrowth: {
    followers: 15,
    likes: 234,
    comments: 67,
    shares: 23
  },
  demographics: {
    ageGroups: {
      '18-24': 35,
      '25-34': 42,
      '35-44': 18,
      '45+': 5
    },
    locations: {
      'Mumbai': 28,
      'Delhi': 22,
      'Bangalore': 18,
      'Others': 32
    }
  }
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'week';
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Modify stats based on period
    let stats = { ...mockStats };
    
    if (period === 'month') {
      stats.newFollowers *= 4;
      stats.lostFollowers *= 4;
      stats.weeklyGrowth.followers *= 4;
    } else if (period === 'year') {
      stats.newFollowers *= 52;
      stats.lostFollowers *= 52;
      stats.weeklyGrowth.followers *= 52;
    }
    
    return NextResponse.json({
      success: true,
      data: stats,
      period
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats data' },
      { status: 500 }
    );
  }
}