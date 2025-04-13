
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageTitle from '@/components/common/PageTitle';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Download, RefreshCw } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RecentPatients from '@/components/dashboard/RecentPatients';
import StudiesOverview from '@/components/dashboard/StudiesOverviewFixed';
import CancerDistributionChart from '@/components/dashboard/CancerDistributionChart';
import ResearchMetricsChart from '@/components/dashboard/ResearchMetricsChart';
import DataCompliance from '@/components/dashboard/DataCompliance';
import { Users, FileText, TestTube, Shield } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      title: "Dashboard Updated",
      description: "Latest data has been loaded.",
    });
  };

  return (
    <MainLayout>
      <PageTitle 
        title="Research Dashboard"
        description="Overview of ongoing studies and patient data"
        actions={
          <>
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Study
            </Button>
          </>
        }
      />
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Patients" 
          value="1,248" 
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard 
          title="Active Studies" 
          value="12" 
          icon={<FileText className="h-5 w-5" />}
          trend={{ value: 4.5, isPositive: true }}
        />
        <StatCard 
          title="Lab Specimens" 
          value="3,742" 
          icon={<TestTube className="h-5 w-5" />}
          trend={{ value: 12.3, isPositive: true }}
        />
        <StatCard 
          title="Compliance Score" 
          value="98%" 
          icon={<Shield className="h-5 w-5" />}
          trend={{ value: 1.8, isPositive: true }}
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <RecentPatients />
        <StudiesOverview />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        <CancerDistributionChart />
        <ResearchMetricsChart />
        <DataCompliance />
      </div>
    </MainLayout>
  );
};

export default Index;
