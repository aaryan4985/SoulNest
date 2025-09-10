import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPhone, FiHeart, FiShield } from 'react-icons/fi';

const SOSPopup = ({ isOpen, onClose, onConfirm }) => {
  const [stage, setStage] = useState('confirm'); // confirm, sending, sent
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (stage === 'sending') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStage('sent');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [stage]);

  const handleConfirmSOS = async () => {
    setStage('sending');
    setCountdown(3);
    
    try {
      // Call the parent confirm function
      await onConfirm();
    } catch (error) {
      console.error('Error sending SOS:', error);
      setStage('confirm');
    }
  };

  const resetAndClose = () => {
    setStage('confirm');
    setCountdown(3);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={resetAndClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FiShield className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Emergency SOS</h2>
                    <p className="text-red-100 text-sm">Immediate assistance</p>
                  </div>
                </div>
                <button
                  onClick={resetAndClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {stage === 'confirm' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Need Immediate Help?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      This will immediately alert our support team that you need urgent assistance.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <FiHeart className="w-4 h-4" />
                      Remember: You're Not Alone
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Help is available 24/7</li>
                      <li>• Your feelings are valid</li>
                      <li>• This situation is temporary</li>
                      <li>• Professional support is on the way</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">
                      Crisis Hotlines:
                    </h4>
                    <div className="text-sm text-green-800 space-y-1">
                      <div className="flex items-center gap-2">
                        <FiPhone className="w-3 h-3" />
                        <span className="font-mono">988 - Suicide & Crisis Lifeline</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiPhone className="w-3 h-3" />
                        <span className="font-mono">1-800-273-8255 - National Suicide Prevention</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={resetAndClose}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmSOS}
                      className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                    >
                      Send SOS Alert
                    </button>
                  </div>
                </motion.div>
              )}

              {stage === 'sending' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Sending Emergency Alert...
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      Notifying support team in {countdown} seconds
                    </p>
                  </div>
                </motion.div>
              )}

              {stage === 'sent' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <FiShield className="w-8 h-8 text-green-600" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">
                      Help is On The Way! 🚨
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      Our support team has been notified and will reach out to you immediately.
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                    <h4 className="font-medium text-green-900 mb-2">
                      What happens next:
                    </h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>✓ Support team has been alerted</li>
                      <li>✓ A counselor will contact you within 5 minutes</li>
                      <li>✓ Your emergency contacts will be notified (if authorized)</li>
                      <li>✓ Continue breathing deeply - help is coming</li>
                    </ul>
                  </div>

                  <button
                    onClick={resetAndClose}
                    className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SOSPopup;
