
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, ChevronDown, Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface AnalyticsFiltersProps {
  onFilterChange?: (filters: any) => void;
}

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({ onFilterChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Date Range</span>
            <ChevronDown className="h-3 w-3 ml-2 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="range"
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      <Select defaultValue="all">
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="Select Study" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Studies</SelectItem>
          <SelectItem value="oncology">Oncology Studies</SelectItem>
          <SelectItem value="cardiology">Cardiology Studies</SelectItem>
          <SelectItem value="neurology">Neurology Studies</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all">
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="Study Phase" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Phases</SelectItem>
          <SelectItem value="phase1">Phase 1</SelectItem>
          <SelectItem value="phase2">Phase 2</SelectItem>
          <SelectItem value="phase3">Phase 3</SelectItem>
          <SelectItem value="phase4">Phase 4</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="h-4 w-4 mr-2" />
            <span>More Filters</span>
            <ChevronDown className="h-3 w-3 ml-2 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-4">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Status</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="completed" />
                <Label htmlFor="completed">Completed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pending" />
                <Label htmlFor="pending">Pending</Label>
              </div>
            </div>
            
            <h4 className="font-medium text-sm">Demographics</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="adult" />
                <Label htmlFor="adult">Adult</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pediatric" />
                <Label htmlFor="pediatric">Pediatric</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="geriatric" />
                <Label htmlFor="geriatric">Geriatric</Label>
              </div>
            </div>
            
            <Button className="w-full" size="sm">Apply Filters</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AnalyticsFilters;
