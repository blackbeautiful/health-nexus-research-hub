
import React, { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, description, actions }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {actions && (
        <div className="mt-4 md:mt-0 flex space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageTitle;
