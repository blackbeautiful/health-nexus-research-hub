import { 
  Users, 
  FileText, 
  Stethoscope, 
  Building2, 
  Users2, 
  UserCog, 
  TestTube, 
  BarChart, 
  CheckCircle, 
  Activity, 
  Pill, 
  HeartPulse, 
  ClipboardCheck, 
  BookOpen, 
  Bed, 
  Settings, 
  Calendar, 
  CalendarCheck, 
  Clock, 
  UserX, 
  DollarSign, 
  Heart, 
  Scan, 
  Folder, 
  ChartBar, 
  BarChart2, 
  FileSpreadsheet, 
  PlusCircle, 
  Shield, 
  MonitorSpeaker
} from 'lucide-react';
import { MenuItemType } from '@/components/layout/sidebar/SidebarMenuItem';

export const clinicalMenuItems: MenuItemType[] = [
  { 
    title: "Clinical Workflows", 
    icon: Stethoscope, 
    url: "/clinical/workflows",
    items: [
      { title: "Patient Check-In", icon: CheckCircle, url: "/clinical/workflows/check-in" },
      { title: "Clinical Queue", icon: Users2, url: "/clinical/workflows/clinical-queue" },
      { title: "Triage Assessment", icon: Activity, url: "/clinical/workflows/triage" },
      { title: "SOAP Notes", icon: FileText, url: "/clinical/workflows/soap-notes" },
      { title: "Clinical Notes", icon: FileText, url: "/clinical/workflows/notes" },
      { title: "Prescriptions", icon: Pill, url: "/clinical/workflows/prescriptions" },
      { title: "Treatment Plans", icon: HeartPulse, url: "/clinical/workflows/treatment-plans" },
      { title: "Medical Orders", icon: ClipboardCheck, url: "/clinical/workflows/medical-orders" },
      { title: "Patient Education", icon: BookOpen, url: "/clinical/workflows/patient-education" },
      { title: "Oncology Staging", icon: Activity, url: "/clinical/workflows/oncology-staging" }
    ]
  },
  { 
    title: "Facility Management", 
    icon: Building2, 
    url: "/clinical/facility-management",
    items: [
      { title: "Bed Management", icon: Bed, url: "/clinical/facility-management/beds" },
      { title: "Room Allocation", icon: Building2, url: "/clinical/facility-management/rooms" },
      { title: "Equipment Tracking", icon: MonitorSpeaker, url: "/clinical/facility-management/equipment" },
      { title: "Maintenance", icon: Settings, url: "/clinical/facility-management/maintenance" }
    ]
  },
  { 
    title: "Staff Management", 
    icon: Users2, 
    url: "/clinical/staff-management",
    items: [
      { title: "Staff Directory", icon: Users, url: "/clinical/staff-management/directory" },
      { title: "Duty Schedules", icon: Calendar, url: "/clinical/staff-management/schedules" },
      { title: "Shift Management", icon: CalendarCheck, url: "/clinical/staff-management/shifts" },
      { title: "Time Tracking", icon: Clock, url: "/clinical/staff-management/time-tracking" },
      { title: "Leave Management", icon: UserX, url: "/clinical/staff-management/leave" }
    ]
  },
  { 
    title: "HR Management", 
    icon: UserCog, 
    url: "/clinical/hr-management",
    items: [
      { title: "Employee Records", icon: FileText, url: "/clinical/hr-management/employees" },
      { title: "Payroll", icon: DollarSign, url: "/clinical/hr-management/payroll" },
      { title: "Benefits", icon: Heart, url: "/clinical/hr-management/benefits" },
      { title: "Training & Certification", icon: BookOpen, url: "/clinical/hr-management/training" },
      { title: "Performance Reviews", icon: BarChart, url: "/clinical/hr-management/performance" }
    ]
  },
  { 
    title: "Diagnostics & Results", 
    icon: TestTube, 
    url: "/clinical/lab-results",
    items: [
      { title: "Lab Results", icon: TestTube, url: "/clinical/lab-results" },
      { title: "Imaging Results", icon: Scan, url: "/clinical/medical-records/imaging" },
      { title: "Vital Signs", icon: Activity, url: "/clinical/clinical-data/vitals" }
    ]
  },
  { 
    title: "Medical Records", 
    icon: FileText, 
    url: "/clinical/medical-records",
    items: [
      { title: "Patient History", icon: Clock, url: "/clinical/medical-records/history" },
      { title: "Diagnoses", icon: HeartPulse, url: "/clinical/medical-records/diagnoses" },
      { title: "External Records", icon: Folder, url: "/clinical/medical-records/external" }
    ]
  },
  { 
    title: "Clinical Reports", 
    icon: BarChart, 
    url: "/clinical/clinical-reports",
    items: [
      { title: "Treatment Outcomes", icon: ChartBar, url: "/clinical/clinical-reports/outcomes" },
      { title: "Patient Analytics", icon: BarChart2, url: "/clinical/clinical-reports/patient-analytics" },
      { title: "Provider Metrics", icon: FileSpreadsheet, url: "/clinical/clinical-reports/provider-metrics" },
      { title: "Medication Reports", icon: Pill, url: "/clinical/clinical-reports/medications" },
      { title: "Handoff Reports", icon: FileText, url: "/clinical/clinical-reports/handoff" }
    ]
  }
];