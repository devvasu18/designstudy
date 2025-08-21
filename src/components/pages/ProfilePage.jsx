'use client';

import { useState, useEffect, useRef } from 'react';

export default function ProfileDashboard() {
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [counters, setCounters] = useState({
    projects: 0,
    successRate: 0,
    rating: 0,
    followers: 0,
    contributions: 0,
    awards: 0
  });

  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targets = {
      projects: 127,
      successRate: 95,
      rating: 48,
      followers: 2300,
      contributions: 156,
      awards: 24
    };

    const animateCounter = (key, target) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCounters(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, 50);
    };

    Object.entries(targets).forEach(([key, value]) => {
      animateCounter(key, value);
    });
  }, []);

  const skills = [
    { name: 'Frontend Development', percentage: 92 },
    { name: 'UI/UX Design', percentage: 88 },
    { name: 'JavaScript/React', percentage: 95 },
    { name: 'Problem Solving', percentage: 89 },
    { name: 'Team Collaboration', percentage: 91 }
  ];

  const personalityTraits = [
    {
      title: 'Profile Completeness',
      description: 'Bio, profile picture, and contact information are well-maintained'
    },
    {
      title: 'Content Variety',
      description: 'Mix of photos, videos, and stories creates engaging content'
    },
    {
      title: 'Post Consistency',
      description: 'Regular posting schedule maintains audience engagement'
    },
    {
      title: 'Visual Style',
      description: 'Consistent aesthetic and theme across all posts'
    }
  ];

  const achievements = [
    'Verified Profile', 'Bio Complete', 'Profile Picture', 'Contact Info',
    'Regular Poster', 'Story User', 'Photo Gallery', 'Video Content'
  ];

  const activityData = [60, 80, 45, 90, 75, 95, 70, 85, 55, 78];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];

  const handleBarClick = (index) => {
    alert(`${days[index]}: ${activityData[index]}% activity`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-5">
        {/* Header */}
        <div className="text-center mb-10 pt-10">
          <div className="relative w-30 h-30 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center text-5xl font-bold mx-auto mb-5 shadow-lg">
            <div className="w-28 h-28 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full flex items-center justify-center">
              <img
                src="https://avatar.iran.liara.run/public/42"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 bg-clip-text text-transparent mb-3">
            Profile Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive insights into your digital persona, skills, and growth patterns
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {/* Core Skills Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            {/* Instagram-style gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400"></div>

            {/* Card Title */}
            <div className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              Instagram Profile Insights
            </div>

            {/* Feature bars */}
            <div className="space-y-4">
              {[
                { name: "Posts", percentage: 80 },
                { name: "Followers", percentage: 70 },
                { name: "Following", percentage: 60 },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center pb-3 border-b border-gray-200"
                >
                  <span className="text-sm font-medium text-gray-700">{feature.name}</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-pink-500 to-orange-400 rounded-full transition-all duration-2000 ease-out ${
                          skillsVisible ? 'w-full' : 'w-0'
                      }`}
                      style={{
                        width: `${feature.percentage}%`,
                        transition: "width 2s ease-out",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personality Insights Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400"></div>
            <div className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              Profile Quality Insights
            </div>
            <div className="space-y-4">
              {personalityTraits.map((trait, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-xl p-4 border-l-4 border-pink-500 transition-all duration-300 hover:bg-gray-100 hover:translate-x-2"
                >
                  <div className="font-semibold text-gray-900 mb-2">{trait.title}</div>
                  <p className="text-sm text-gray-600">{trait.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Pattern Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400"></div>
            <div className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
              </div>
              Basic Statistics
            </div>
            <div className="space-y-4 mt-5">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">398</div>
                <div className="text-sm text-gray-500">Total Followers</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">238</div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">15</div>
                <div className="text-sm text-gray-500">Total Posts</div>
              </div>
            </div>
          </div>

          {/* Growth Score Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400"></div>
            <div className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
              </div>
              Profile Score
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-30 h-30 mb-5">
                <div className="absolute inset-0 rounded-full" style={{
                  background: `conic-gradient(#ec4899 0deg, #ec4899 ${85 * 3.6}deg, #e5e7eb ${85 * 3.6}deg)`
                }}>
                </div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center border-4 border-gray-100">
                  <span className="text-2xl font-bold text-gray-900">85%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-gray-50 rounded-xl p-5 text-center hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                    15
                  </div>
                  <div className="text-sm text-gray-500">Posts</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 text-center hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                    398
                  </div>
                  <div className="text-sm text-gray-500">Followers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400"></div>
            <div className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              Profile Features
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {achievements.map((achievement, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full px-4 py-2 text-sm font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>

          {/* Performance Metrics Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400"></div>
            <div className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
              Key Metrics
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="bg-gray-50 rounded-xl p-5 text-center hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                  1.7
                </div>
                <div className="text-sm text-gray-500">Follower Ratio</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-center hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                  26.5
                </div>
                <div className="text-sm text-gray-500">Posts per Follower</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-center hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                  15
                </div>
                <div className="text-sm text-gray-500">Total Posts</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-center hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                  238
                </div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}