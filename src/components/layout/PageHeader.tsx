
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, className = '' }) => {
  return (
    <div className={`py-8 pt-24 md:pt-28 bg-gray-50 ${className}`}>
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
        {description && <p className="text-lg text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
