
import React from 'react';
import { Activity } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-md p-1.5 bg-health-primary">
        <Activity className="h-5 w-5 text-white" />
      </div>
      <div className="font-semibold text-lg">
        <span className="text-gray-900">Health</span>
        <span className="text-health-primary">Nexus</span>
      </div>
    </div>
  );
};

export default Logo;
