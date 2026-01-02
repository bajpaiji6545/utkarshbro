
import React from 'react';

const Features: React.FC = () => {
  const features = [
    { title: 'Fast & Free', desc: 'No limits, no waiting. Instant extraction.', icon: '⚡' },
    { title: 'No Account', desc: 'Zero registration required. Privacy first.', icon: '🛡️' },
    { title: 'Any Device', desc: 'Works on mobile, tablet, and desktop.', icon: '📱' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mt-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {features.map((f, i) => (
        <div key={i} className="text-center p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="text-3xl mb-3">{f.icon}</div>
          <h3 className="font-bold text-gray-900 text-sm mb-1">{f.title}</h3>
          <p className="text-gray-500 text-[11px] leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
