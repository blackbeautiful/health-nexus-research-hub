
import React from 'react';
import { Button } from '@/components/ui/button';
import { BreadcrumbItem, Breadcrumb } from '@/components/ui/breadcrumb';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{
    label: string;
    link?: string;
  }>;
  action?: {
    label: string;
    icon?: React.ElementType;
    onClick?: () => void;
    href?: string;
  };
}

const PageHeader = ({
  title,
  description,
  breadcrumbs,
  action,
}: PageHeaderProps) => {
  return (
    <div className="mb-6">
      {breadcrumbs && (
        <div className="mb-2">
          <Breadcrumb separator={<ChevronRight className="h-4 w-4" />}>
            <BreadcrumbItem>
              <Link to="/" className="flex items-center">
                <Home className="h-3 w-3 mr-1" />
                Home
              </Link>
            </BreadcrumbItem>
            {breadcrumbs.map((crumb, index) => (
              <BreadcrumbItem key={index}>
                {crumb.link ? (
                  <Link to={crumb.link}>{crumb.label}</Link>
                ) : (
                  crumb.label
                )}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </div>
      )}
      
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        
        {action && (
          <Button
            onClick={action.onClick}
            className="whitespace-nowrap"
            asChild={!!action.href}
          >
            {action.href ? (
              <Link to={action.href}>
                {action.icon && (
                  <action.icon className="mr-2 h-4 w-4" />
                )}
                {action.label}
              </Link>
            ) : (
              <>
                {action.icon && (
                  <action.icon className="mr-2 h-4 w-4" />
                )}
                {action.label}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
