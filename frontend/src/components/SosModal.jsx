import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SosModal = ({ open, onClose, level = 'high' }) => {
  const navigate = useNavigate();
  if (!open) return null;

  const content = {
    high: {
      title: "Immediate Help Recommended",
      message: `We're concerned about what you shared. Please reach out for immediate help — you matter and help is available 24/7.`,
      actions: [
        { label: 'Call Emergency (911)', href: 'tel:911', role: 'call' },
        { label: 'Call Lifeline (988)', href: 'tel:988', role: 'call' },
        { label: 'Crisis Text Line (Text HOME to 741741)', href: null, role: 'text' },
        { label: 'Open Emergency Contacts', onClick: () => navigate('/emergency') }
      ]
    },
    medium: {
      title: "Support Recommended",
      message: `It looks like you might be struggling. Consider contacting a trusted person or a professional.`,
      actions: [
        { label: 'Talk to a trusted person', href: null, role: 'suggest' },
        { label: 'Crisis Text Line (Text HOME to 741741)', href: null, role: 'text' },
        { label: 'Open Emergency Contacts', onClick: () => navigate('/emergency') }
      ]
    }
  };

  const cfg = level === 'medium' ? content.medium : content.high;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative max-w-lg w-full bg-white rounded-xl shadow-xl p-6 mx-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-red-600">{cfg.title}</h3>
            <p className="mt-2 text-sm text-gray-700">{cfg.message}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {cfg.actions.map((a, idx) => (
            <div key={idx}>
              {a.href ? (
                <a href={a.href} className="w-full inline-block text-left px-4 py-3 rounded-lg bg-red-50 text-red-700 font-medium" rel="noopener noreferrer">
                  {a.label}
                </a>
              ) : (
                <button
                  onClick={() => {
                    if (a.onClick) a.onClick();
                    if (!a.onClick) alert(a.label);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium"
                >
                  {a.label}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SosModal;
