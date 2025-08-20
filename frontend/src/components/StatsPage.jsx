import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, Eye, Heart, MessageCircle, Share, BarChart3, PieChart, Calendar, Clock } from 'lucide-react';

const StatsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [animatedStats, setAnimatedStats] = useState({
    followers: 0,
    following: 0,
    dontFollowBack: 0,
    notFollowingBack: 0,
    blockedYou: 0,
    blockedByYou: 0,
    newFollowers: 0,
    lostFollowers: 0
  });

  const finalStats = {
    followers: 398,
    following: 238,
    dontFollowBack: 20,
    notFollowingBack: 181,
    blockedYou: 0, // Hidden with "?"
    blockedByYou: 2,
    newFollowers: 0,
    lostFollowers: 0
  };

  // Animate numbers on component mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(finalStats).forEach((key) => {
      let currentStep = 0;
      const increment = finalStats[key] / steps;
      
      const timer = setInterval(() => {
        currentStep++;
        setAnimatedStats(prev => ({
          ...prev,
          [key]: Math.min(Math.floor(increment * currentStep), finalStats[key])
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, []);

  const engagementData = [
    { period: 'Today', likes: 45, comments: 12, shares: 8, views: 234 },
    { period: 'Yesterday', likes: 67, comments: 18, shares: 15, views: 456 },
    { period: 'This Week', likes: 289, comments: 76, shares: 43, views: 1678 },
    { period: 'This Month', likes: 1234, comments: 345, shares: 167, views: 8901 }
  ];

  const currentEngagement = engagementData.find(data => 
    selectedPeriod === 'today' ? data.period === 'Today' :
    selectedPeriod === 'yesterday' ? data.period === 'Yesterday' :
    selectedPeriod === 'week' ? data.period === 'This Week' :
    data.period === 'This Month'
  ) || engagementData[2];

  const growthTrends = [
    { label: 'Followers Growth', value: '+12', trend: 'up', color: 'text-green-500' },
    { label: 'Engagement Rate', value: '+8.5%', trend: 'up', color: 'text-green-500' },
    { label: 'Profile Views', value: '-3.2%', trend: 'down', color: 'text-red-500' },
    { label: 'Story Views', value: '+15%', trend: 'up', color: 'text-green-500' }
  ];

  const topContent = [
    { type: 'Post', title: 'Beautiful sunset photo', engagement: 156, date: '2 days ago' },
    { type: 'Story', title: 'Behind the scenes', engagement: 89, date: '1 day ago' },
    { type: 'Post', title: 'Travel memories', engagement: 134, date: '3 days ago' }
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">

        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 text-center">Followers Analysis</h1>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Followers */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-1">
                {animatedStats.followers}
              </div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
          </div>

          {/* Following */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-1">
                {animatedStats.following}
              </div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>

          {/* Don't follow back */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-lg text-gray-600 mb-2 text-xs leading-tight">
                Don't follow you back
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {animatedStats.dontFollowBack}
              </div>
            </div>
          </div>

          {/* You are not following back */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-lg text-gray-600 mb-2 text-xs leading-tight">
                You are not following back
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {animatedStats.notFollowingBack}
              </div>
            </div>
          </div>

          {/* Blocked you */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-lg text-gray-600 mb-2 text-xs leading-tight">
                Blocked you
              </div>
              <div className="text-2xl font-bold text-gray-800">
                ?
              </div>
            </div>
          </div>

          {/* Blocked by you */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-lg text-gray-600 mb-2 text-xs leading-tight">
                Blocked by you
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {animatedStats.blockedByYou}
              </div>
            </div>
          </div>

          {/* New Followers */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-lg text-gray-600 mb-2 text-xs leading-tight">
                New Followers
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {animatedStats.newFollowers}
              </div>
            </div>
          </div>

          {/* Lost Followers */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-lg text-gray-600 mb-2 text-xs leading-tight">
                Lost Followers
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {animatedStats.lostFollowers}
              </div>
            </div>
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 text-center">Analytics Period</h3>
          <div className="flex space-x-2">
            {[
              { id: 'today', label: 'Today' },
              { id: 'yesterday', label: 'Yesterday' },
              { id: 'week', label: 'Week' },
              { id: 'month', label: 'Month' }
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedPeriod === period.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            Engagement Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{currentEngagement.likes}</div>
              <div className="text-xs text-gray-500">Likes</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <MessageCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{currentEngagement.comments}</div>
              <div className="text-xs text-gray-500">Comments</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Share className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{currentEngagement.shares}</div>
              <div className="text-xs text-gray-500">Shares</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <Eye className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{currentEngagement.views.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Views</div>
            </div>
          </div>
        </div>

        {/* Growth Trends */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Growth Trends
          </h3>
          <div className="space-y-3">
            {growthTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{trend.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${trend.color}`}>
                    {trend.value}
                  </span>
                  {trend.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Content */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-500" />
            Top Content
          </h3>
          <div className="space-y-3">
            {topContent.map((content, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      content.type === 'Post' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {content.type}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-800 truncate">
                    {content.title}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {content.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-purple-600">
                    {content.engagement}
                  </div>
                  <div className="text-xs text-gray-500">interactions</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Generate Detailed Report
          </button>
          <button className="w-full py-4 bg-white border-2 border-purple-500 text-purple-500 font-semibold rounded-2xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
            Export Analytics Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;