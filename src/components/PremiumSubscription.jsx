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
    "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
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
      <div className="min-h-screen w-full max-w-md mx-auto bg-gray-50 relative">
        {/* Close Button */}
        <div className="absolute top-8 right-4 z-10">
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Main Content */}
        <div className="px-6 py-8">
          {/* Profile Images */}
          <div className="relative mb-8">
            <div className="flex justify-center items-center">
              <div className="relative w-64 h-32">
                {profileImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden
                      ${index === 0 ? 'top-0 left-8' : ''}
                      ${index === 1 ? 'top-2 right-16' : ''}
                      ${index === 2 ? 'top-8 left-20' : ''}
                      ${index === 3 ? 'top-8 right-8' : ''}
                      ${index === 4 ? 'bottom-0 left-12' : ''}
                      ${index === 5 ? 'bottom-2 right-12' : ''}
                    `}
                  >
                    <img 
                      src={image} 
                      alt={`Profile ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                
                {/* Decorative dots */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="absolute top-12 left-4 w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="absolute bottom-8 right-2 w-2 h-2 bg-orange-400 rounded-full"></div>
                <div className="absolute bottom-4 left-2 w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="absolute top-6 left-12 w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold text-gray-900 text-center mb-6">
            Become premium & unlock all features
          </h1>

          {/* Features List */}
          <div className="mb-8 space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Pricing Plans */}
          <div className="space-y-3 mb-8">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedPlan === plan.id
                    ? `${plan.borderColor} ${plan.bgColor} scale-105 shadow-lg`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${plan.bgColor}`}>
                      {plan.icon}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-gray-600">/ {plan.duration}</span>
                        {plan.savings && (
                          <span className={`text-xs px-2 py-1 rounded-full ${plan.bgColor} ${plan.textColor} font-medium`}>
                            {plan.savings}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.id 
                      ? `${plan.textColor} border-current` 
                      : 'border-gray-300'
                  }`}>
                    {selectedPlan === plan.id && (
                      <div className={`w-2 h-2 rounded-full bg-current`}></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
              isLoading 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
            } shadow-lg`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              'Subscribe'
            )}
          </button>

          {/* Subscription Terms */}
          <div className="mt-4 text-center">
            <button className="text-gray-600 text-sm underline hover:text-gray-800 transition-colors">
              Subscription Terms
            </button>
          </div>

          {/* Terms Text */}
          <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
            Your subscription will automatically extend for the same duration unless cancelled at least 24 hours before the current period ends. You can manage subscriptions from Play Store → Menu → Subscriptions.
          </p>
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
