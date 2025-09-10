import { useState } from "react";

export default function MentalHealthSurvey() {
  const [formData, setFormData] = useState({
    ageRange: "",
    gender: "",
    educationLevel: "",
    websiteFeedback: "",
    stressFrequency: "",
    anxietyFrequency: "",
    copingMethods: [],
    comfortTalking: "",
    wouldUseDigitalPlatform: "",
    usefulFeatures: [],
    privacyImportance: "",
    shareDataAnonymously: "",
    biggestChallenge: "",
    featureSuggestions: "",
    additionalComments: ""
  });

  const [currentSection, setCurrentSection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = () => {
    
    if (!validateSection(1)) {
      alert("Please fill in all required fields in Basic Information section");
      setCurrentSection(1);
      return;
    }

    console.log("Survey Data:", formData);
    
    setSubmitted(true);
  };

  const validateSection = (section) => {
    switch(section) {
      case 1:
        return formData.ageRange && formData.gender && formData.educationLevel && formData.websiteFeedback;
      case 2:
        return true; 
      case 3:
        return true; 
      case 4:
        return true; 
      default:
        return false;
    }
  };

  const nextSection = () => {
    
    if (currentSection === 1 && !validateSection(1)) {
      alert("Please fill in all required fields in Basic Information section before proceeding.");
      return;
    }
    if (currentSection < 4) setCurrentSection(currentSection + 1);
  };

  const prevSection = () => {
    if (currentSection > 1) setCurrentSection(currentSection - 1);
  };

  const resetForm = () => {
    setSubmitted(false);
    setCurrentSection(1);
    setFormData({
      ageRange: "",
      gender: "",
      educationLevel: "",
      websiteFeedback: "",
      stressFrequency: "",
      anxietyFrequency: "",
      copingMethods: [],
      comfortTalking: "",
      wouldUseDigitalPlatform: "",
      usefulFeatures: [],
      privacyImportance: "",
      shareDataAnonymously: "",
      biggestChallenge: "",
      featureSuggestions: "",
      additionalComments: ""
    });
  };

  const progressWidth = (currentSection / 4) * 100;

  // Thank you screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your responses have been submitted successfully. Your participation helps us build better mental health support systems for students.
          </p>
          <button 
            onClick={resetForm}
            className="text-white px-8 py-3 rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: '#ff3f74' }}
          >
            Take Survey Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4f8ff' }}>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Digital Mental Health & Psychological Support
          </h1>
          <p className="text-sm mt-2">Fields marked with <span className="text-[#ff3f74]">*</span> are required</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Section {currentSection} of 4</span>
            <span>{Math.round(progressWidth)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressWidth}%`, backgroundColor: '#ff3f74' }}
            ></div>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          
          {currentSection === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                Section 1: Basic Information
              </h2>

              
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Age Range <span className="text-[#ff3f74]">*</span></label>
                <div className="space-y-2">
                  {["Below 18", "18–21", "22–25", "26+"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="ageRange"
                        value={option}
                        checked={formData.ageRange === option}
                        onChange={(e) => handleInputChange("ageRange", e.target.value)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

             
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Gender <span className="text-[#ff3f74]">*</span></label>
                <div className="space-y-2">
                  {["Male", "Female", "Non-binary / Prefer not to say"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

            
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Education Level <span className="text-[#ff3f74]">*</span></label>
                <div className="space-y-2">
                  {["Undergraduate", "Postgraduate", "PhD/Research Scholar", "Other"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="educationLevel"
                        value={option}
                        checked={formData.educationLevel === option}
                        onChange={(e) => handleInputChange("educationLevel", e.target.value)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

             
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What problems can we support you with? <span className="text-[#ff3f74]">*</span>
                </label>
                <textarea
                  value={formData.websiteFeedback}
                  onChange={(e) => handleInputChange("websiteFeedback", e.target.value)}
                  placeholder="Please share your feedback about the website's design, features, and overall experience..."
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff3f74] focus:border-[#ff3f74]"
                />
                <p className="text-sm text-gray-500 mt-2">Your feedback helps us improve our services.</p>
              </div>
            </div>
          )}

         
          {currentSection === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                Section 2: Mental Health Awareness & Lifestyle <span className="text-gray-500 text-sm font-normal">(Optional)</span>
              </h2>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How often do you feel stressed due to academic workload?
                </label>
                <div className="space-y-2">
                  {["Never", "Sometimes", "Often", "Always"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="stressFrequency"
                        value={option}
                        checked={formData.stressFrequency === option}
                        onChange={(e) => handleInputChange("stressFrequency", e.target.value)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How frequently do you experience anxiety about exams, assignments, or future career?
                </label>
                <div className="space-y-2">
                  {["Rarely", "Occasionally", "Frequently", "Almost daily"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="anxietyFrequency"
                        value={option}
                        checked={formData.anxietyFrequency === option}
                        onChange={(e) => handleInputChange("anxietyFrequency", e.target.value)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How do you usually cope with stress? (Select all that apply)
                </label>
                <div className="space-y-2">
                  {[
                    "Talking to friends/family",
                    "Exercise / Sports",
                    "Meditation / Relaxation techniques",
                    "Social media / Gaming / Distraction",
                    "Professional counseling / therapy",
                    "Other"
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={formData.copingMethods.includes(option)}
                        onChange={() => handleCheckboxChange("copingMethods", option)}
                        className="h-4 w-4 text-indigo-600 rounded"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you feel comfortable talking about your mental health with peers or teachers?
                </label>
                <div className="space-y-2">
                  {["Yes", "No", "Unsure"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="comfortTalking"
                        value={option}
                        checked={formData.comfortTalking === option}
                        onChange={(e) => handleInputChange("comfortTalking", e.target.value)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          
          {currentSection === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                Section 3: Digital Support Needs <span className="text-gray-500 text-sm font-normal">(Optional)</span>
              </h2>

              {/* Digital Platform Usage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Would you use a digital platform/app that provides mental health support?
                </label>
                <div className="space-y-2">
                  {[
                    "Yes, definitely",
                    "Maybe, if it's easy to use and secure",
                    "Not sure",
                    "No"
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="wouldUseDigitalPlatform"
                        value={option}
                        checked={formData.wouldUseDigitalPlatform === option}
                        onChange={(e) => handleInputChange("wouldUseDigitalPlatform", e.target.value)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Useful Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Which features would you find most useful? (Select up to 3)
                </label>
                <div className="space-y-2">
                  {[
                    "Daily mood/stress tracking",
                    "Anonymous peer support community",
                    "Access to professional counselors online",
                    "Guided meditation & relaxation exercises",
                    "Academic stress management resources",
                    "Emergency helpline integration",
                    "AI-based chatbot for immediate support"
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={formData.usefulFeatures.includes(option)}
                        onChange={() => handleCheckboxChange("usefulFeatures", option)}
                        disabled={formData.usefulFeatures.length >= 3 && !formData.usefulFeatures.includes(option)}
                        className="h-4 w-4 text-indigo-600 rounded disabled:opacity-50"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {formData.usefulFeatures.length}/3
                </p>
              </div>

              {/* Privacy Importance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How important is confidentiality & privacy in such a system?
                </label>
                <div className="space-y-2">
                  {["Extremely important", "Somewhat important", "Neutral", "Not important"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="privacyImportance"
                        value={option}
                        checked={formData.privacyImportance === option}
                        onChange={(e) => handleInputChange("privacyImportance", e.target.value)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Would you be willing to share your stress/anxiety patterns (anonymously) to help improve the system?
                </label>
                <div className="space-y-2">
                  {["Yes", "Maybe", "No"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="shareDataAnonymously"
                        value={option}
                        checked={formData.shareDataAnonymously === option}
                        onChange={(e) => handleInputChange("shareDataAnonymously", e.target.value)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          
          {currentSection === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                Section 4: Feedback & Suggestions <span className="text-gray-500 text-sm font-normal">(Optional)</span>
              </h2>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What is the biggest challenge students face in terms of mental health today?
                </label>
                <textarea
                  value={formData.biggestChallenge}
                  onChange={(e) => handleInputChange("biggestChallenge", e.target.value)}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Share your thoughts..."
                />
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What features/ideas would you like included in a student-specific digital mental health platform?
                </label>
                <textarea
                  value={formData.featureSuggestions}
                  onChange={(e) => handleInputChange("featureSuggestions", e.target.value)}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Suggest features that would help you..."
                />
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Any additional comments or suggestions?
                </label>
                <textarea
                  value={formData.additionalComments}
                  onChange={(e) => handleInputChange("additionalComments", e.target.value)}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Any other thoughts you'd like to share..."
                />
              </div>
            </div>
          )}

          
          <div className="flex justify-between pt-8 border-t">
            <button
              type="button"
              onClick={prevSection}
              disabled={currentSection === 1}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {currentSection < 4 ? (
              <button
                type="button"
                onClick={nextSection}
                className="px-6 py-3 text-white rounded-lg transition-colors hover:opacity-90"
                style={{ backgroundColor: '#ff3f74' }}
              >
                Next Section
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 text-white rounded-lg transition-colors hover:opacity-90 font-medium"
                style={{ backgroundColor: '#ff3f74' }}
              >
                Submit Survey
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
