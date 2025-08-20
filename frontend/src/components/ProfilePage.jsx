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
      title: 'Creative Innovator',
      description: 'You excel at finding unique solutions and thinking outside the box'
    },
    {
      title: 'Detail-Oriented',
      description: 'Your attention to detail ensures high-quality outputs consistently'
    },
    {
      title: 'Fast Learner',
      description: 'You quickly adapt to new technologies and methodologies'
    },
    {
      title: 'Team Player',
      description: 'Strong collaboration skills with excellent communication'
    }
  ];

  const achievements = [
    'Code Master', 'Design Guru', 'Innovation Leader', 'Team MVP',
    'Problem Solver', 'Tech Explorer', 'Quality Champion', 'Fast Deliverer'
  ];

  const activityData = [60, 80, 45, 90, 75, 95, 70, 85, 55, 78];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];

  const handleBarClick = (index) => {
    alert(`${days[index]}: ${activityData[index]}% activity`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-48 h-48 bg-red-400/30 rounded-full blur-3xl top-1/5 left-1/10 animate-pulse"></div>
        <div className="absolute w-36 h-36 bg-blue-400/30 rounded-full blur-3xl top-3/5 right-1/6 animate-pulse delay-1000"></div>
        <div className="absolute w-24 h-24 bg-yellow-400/30 rounded-full blur-3xl bottom-1/5 left-1/2 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto p-5 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 pt-10">
          <div className="relative w-30 h-30 rounded-full bg-gradient-to-r from-red-400 to-teal-400 flex items-center justify-center text-5xl font-bold mx-auto mb-5 shadow-2xl animate-pulse">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-400 via-teal-400 via-blue-500 to-orange-400 rounded-full animate-spin"></div>
            <div className="relative w-28 h-28 bg-gradient-to-r from-red-400 to-teal-400 rounded-full flex items-center justify-center">
              👤
            </div>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-teal-400 to-blue-500 bg-clip-text text-transparent mb-3 animate-pulse">
            Profile Analysis
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Comprehensive insights into your digital persona, skills, and growth patterns
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {/* Core Skills Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20 relative overflow-hidden">
  {/* Gradient top border */}
  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-400"></div>

  {/* Card Title */}
  <div className="flex items-center gap-3 text-2xl font-bold mb-6">
    <span className="text-2xl">📸</span>
    Instagram Profile Insights
  </div>

  {/* Feature bars */}
  <div  className="space-y-4">
    {[
      { name: "Posts", percentage: 80 },
      { name: "Followers Growth", percentage: 95 },
      { name: "Reels Engagement", percentage: 88 },
      { name: "Stories Views", percentage: 70 },
      { name: "Profile Reach", percentage: 90 },
    ].map((feature, index) => (
      <div
        key={index}
        className="flex justify-between items-center pb-3 border-b border-white/10"
      >
        <span className="text-sm font-medium">{feature.name}</span>
        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full transition-all duration-2000 ease-out ${
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
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-teal-400 to-blue-500"></div>
            <div className="flex items-center gap-3 text-2xl font-bold mb-6">
              <span className="text-2xl">🧠</span>
              Personality Insights
            </div>
            <div className="space-y-4">
              {personalityTraits.map((trait, index) => (
                <div 
                  key={index} 
                  className="bg-white/8 rounded-xl p-4 border-l-4 border-teal-400 transition-all duration-300 hover:bg-white/12 hover:translate-x-2"
                >
                  <div className="font-semibold text-white mb-2">{trait.title}</div>
                  <p className="text-sm text-gray-300">{trait.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Pattern Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-teal-400 to-blue-500"></div>
            <div className="flex items-center gap-3 text-2xl font-bold mb-6">
              <span className="text-2xl">📊</span>
              Activity Pattern
            </div>
            <div className="flex items-end justify-center space-x-1 h-48 mt-5">
              {activityData.map((height, index) => (
                <div
                  key={index}
                  className="w-6 bg-gradient-to-t from-red-400 to-teal-400 rounded-t cursor-pointer transition-all duration-300 hover:scale-110 hover:brightness-125"
                  style={{ height: `${height}%` }}
                  onClick={() => handleBarClick(index)}
                ></div>
              ))}
            </div>
            <p className="text-center mt-4 text-gray-400 text-sm">Weekly Activity Distribution</p>
          </div>

          {/* Growth Score Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-teal-400 to-blue-500"></div>
            <div className="flex items-center gap-3 text-2xl font-bold mb-6">
              <span className="text-2xl">📈</span>
              Growth Score
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-30 h-30 mb-5">
                <div className="absolute inset-0 rounded-full" style={{
                  background: `conic-gradient(#4ecdc4 0deg, #4ecdc4 ${85 * 3.6}deg, rgba(255,255,255,0.1) ${85 * 3.6}deg)`
                }}>
                </div>
                <div className="absolute inset-2 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">85%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-5 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent">
                    {counters.projects}
                  </div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="bg-white/5 rounded-xl p-5 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent">
                    {counters.successRate}%
                  </div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-teal-400 to-blue-500"></div>
            <div className="flex items-center gap-3 text-2xl font-bold mb-6">
              <span className="text-2xl">🏆</span>
              Achievements
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {achievements.map((achievement, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-orange-400 to-red-500 rounded-full px-4 py-2 text-sm font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>

          {/* Performance Metrics Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-teal-400 to-blue-500"></div>
            <div className="flex items-center gap-3 text-2xl font-bold mb-6">
              <span className="text-2xl">⭐</span>
              Performance Metrics
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="bg-white/5 rounded-xl p-5 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent">
                  {(counters.rating / 10).toFixed(1)}
                </div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
              <div className="bg-white/5 rounded-xl p-5 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent">
                  {(counters.followers / 1000).toFixed(1)}K
                </div>
                <div className="text-sm text-gray-400">Followers</div>
              </div>
              <div className="bg-white/5 rounded-xl p-5 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent">
                  {counters.contributions}
                </div>
                <div className="text-sm text-gray-400">Contributions</div>
              </div>
              <div className="bg-white/5 rounded-xl p-5 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent">
                  {counters.awards}
                </div>
                <div className="text-sm text-gray-400">Awards</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}