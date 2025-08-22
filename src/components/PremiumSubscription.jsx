import React, { useState } from 'react';
import { X, Check, Crown, Shield, Gem, Star } from 'lucide-react';

export default function PremiumSubscription({ onClose }) {
  const [selectedPlan, setSelectedPlan] = useState('3months');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const plans = [
    {
      id: 'week',
      icon: <Star className="w-5 h-5 text-green-600" />,
      price: '₹199',
      duration: 'Week',
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      savings: null
    },
    {
      id: '3months',
      icon: <Crown className="w-5 h-5 text-yellow-600" />,
      price: '₹999',
      duration: '3 Months',
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-600',
      savings: 'Save 58%'
    },
    {
      id: 'month',
      icon: <Gem className="w-5 h-5 text-blue-600" />,
      price: '₹599',
      duration: 'Month',
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      savings: 'Save 24%'
    }
  ];

  const features = [
    "Check who stalked your profile secretly",
    "Check who watched your stories secretly",
    "Track who blocked you",
    "Watch and download your friend's stories secretly"
  ];

  const profileImages = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face"
  ];

  const handleClose = () => {
    onClose();
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    console.log('Selected plan:', planId);
  };

  const handleSubscribe = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
      
      // Auto-hide success modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        onClose(); // Close the premium modal after success
      }, 3000);
      
      console.log('Subscription successful for plan:', selectedPlan);
    }, 2000);
  };

  const getSelectedPlan = () => {
    return plans.find(plan => plan.id === selectedPlan);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <div className="h-screen w-full max-w-md mx-auto bg-gray-50 relative sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col">
        {/* Fixed Close Button */}
        <div className="absolute top-8 right-4 z-10">
          <button 
            onClick={handleClose}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Main Content */}
          <div className="px-6 sm:px-8 md:px-10 py-8 md:py-10 lg:py-12">
            {/* Profile Images */}
            <div className="relative mb-8 md:mb-10 lg:mb-12 h-40 md:h-48 lg:h-56">
              <div className="relative w-full h-full">
                {/* Crazy scattered layout with different sizes and rotations */}
                
                {/* Large profile - center dominant */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-4 border-white shadow-2xl overflow-hidden rotate-12 hover:rotate-0 transition-all duration-500 z-20">
                  <img src={profileImages[0]} alt="Main Profile" className="w-full h-full object-cover" />
                </div>
                
                {/* Medium profile - top left */}
                <div className="absolute top-0 left-8 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-3 border-white shadow-xl overflow-hidden -rotate-12 hover:rotate-6 transition-all duration-300 z-10">
                  <img src={profileImages[1]} alt="Profile 2" className="w-full h-full object-cover" />
                </div>
                
                {/* Small profile - top right */}
                <div className="absolute top-2 right-12 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-3 border-white shadow-lg overflow-hidden rotate-45 hover:-rotate-12 transition-all duration-400 z-15">
                  <img src={profileImages[2]} alt="Profile 3" className="w-full h-full object-cover" />
                </div>
                
                {/* Large profile - bottom left */}
                <div className="absolute bottom-2 left-4 w-18 h-18 md:w-22 md:h-22 lg:w-26 lg:h-26 rounded-full border-4 border-white shadow-xl overflow-hidden rotate-6 hover:-rotate-6 transition-all duration-600 z-10">
                  <img src={profileImages[3]} alt="Profile 4" className="w-full h-full object-cover" />
                </div>
                
                {/* Tiny profile - middle right */}
                <div className="absolute top-16 right-4 w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-white shadow-md overflow-hidden -rotate-30 hover:rotate-45 transition-all duration-700 z-5">
                  <img src={profileImages[4]} alt="Profile 5" className="w-full h-full object-cover" />
                </div>
                
                {/* Medium profile - bottom center */}
                <div className="absolute bottom-0 left-1/3 w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22 rounded-full border-3 border-white shadow-lg overflow-hidden rotate-24 hover:rotate-0 transition-all duration-500 z-12">
                  <img src={profileImages[5]} alt="Profile 6" className="w-full h-full object-cover" />
                </div>
                
                {/* Crazy floating decorative elements */}
                <div className="absolute top-8 left-16 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-ping"></div>
                <div className="absolute top-12 right-8 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
                <div className="absolute bottom-8 left-12 w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-12 right-16 w-5 h-5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-spin"></div>
                <div className="absolute top-20 left-1/4 w-3 h-3 bg-gradient-to-r from-indigo-400 to-cyan-500 rounded-full animate-bounce"></div>
                <div className="absolute top-6 right-1/3 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
                <div className="absolute top-32 left-3/4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-20 left-2 w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-2 right-8 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping"></div>
                
                {/* Sparkle effects */}
                <div className="absolute top-3 left-20 text-yellow-400 text-lg animate-pulse">✨</div>
              </div>
            </div>          {/* Title */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-6 md:mb-8 lg:mb-10">
              Become premium & unlock all features
            </h1>

            {/* Features List */}
            <div className="mb-8 md:mb-10 lg:mb-12 space-y-3 md:space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 md:gap-4">
                  <Check className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm md:text-base lg:text-lg">{feature}</span>
                </div>
              ))}
            </div>

            {/* Pricing Plans */}
            <div className="space-y-3 md:space-y-4 lg:space-y-5 mb-8 md:mb-10 lg:mb-12">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full p-4 md:p-5 lg:p-6 rounded-xl border-2 transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? `${plan.borderColor} ${plan.bgColor} scale-105 shadow-lg`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`p-2 md:p-3 rounded-full ${plan.bgColor}`}>
                        {plan.icon}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900">
                            {plan.price}
                          </span>
                          <span className="text-gray-600 text-sm md:text-base lg:text-lg">/ {plan.duration}</span>
                          {plan.savings && (
                            <span className={`text-xs md:text-sm px-2 py-1 rounded-full ${plan.bgColor} ${plan.textColor} font-medium`}>
                              {plan.savings}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === plan.id 
                        ? `${plan.textColor} border-current` 
                        : 'border-gray-300'
                    }`}>
                      {selectedPlan === plan.id && (
                        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full bg-current`}></div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className={`w-full py-4 md:py-5 lg:py-6 px-6 md:px-8 lg:px-10 rounded-xl font-semibold text-white text-base md:text-lg lg:text-xl transition-all duration-200 ${
              isLoading 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
            } shadow-lg`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              'Subscribe'
            )}
          </button>

          {/* Subscription Terms */}
          <div className="mt-4 md:mt-6 text-center">
            <button className="text-gray-600 text-sm md:text-base underline hover:text-gray-800 transition-colors">
              Subscription Terms
            </button>
          </div>

          {/* Terms Text */}
          <p className="text-xs md:text-sm text-gray-500 text-center mt-3 md:mt-4 mb-10 md:mb-12 lg:mb-16 leading-relaxed">
            Your subscription will automatically extend for the same duration unless cancelled at least 24 hours before the current period ends. You can manage subscriptions from Play Store → Menu → Subscriptions.
          </p>
        </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 m-4 max-w-sm w-full text-center shadow-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Subscription Successful!
              </h3>
              <p className="text-gray-600 mb-4">
                Welcome to Premium! You now have access to all exclusive features.
              </p>
              <div className="text-sm text-gray-500">
                Plan: {getSelectedPlan()?.price} / {getSelectedPlan()?.duration}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
