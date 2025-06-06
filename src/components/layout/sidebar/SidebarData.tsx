
import { 
  Home, 
  Users, 
  FileText, 
  Database, 
  BarChart2, 
  Settings, 
  ShieldAlert,
  TestTube,
  Stethoscope,
  FileSearch,
  UserCog,
  FileLock,
  MessageSquare,
  CalendarClock,
  Layout as LayoutIcon,
  User,
  Pill,
  Building2,
  Clipboard,
  AlertTriangle,
  BookOpen,
  Briefcase,
  FlaskRound,
  ChartBar,
  Folder,
  Map,
  Clock,
  CheckCircle,
  FileSpreadsheet,
  ScrollText,
  HeartPulse,
  BarChart,
  Microscope,
  BellRing,
  DatabaseZap,
  Activity,
  UserCheck,
  MonitorSpeaker,
  ClipboardCheck,
  Thermometer,
  Syringe,
  Brain,
  Eye,
  Heart,
  Zap,
  Scan,
  PlusCircle,
  Shield,
  Archive,
  DollarSign,
  Mail,
  Users2,
  Bed,
  CalendarCheck,
  UserX,
  Calendar
} from 'lucide-react';
import { MenuItemType } from './SidebarMenuItem';

// Shared items for both clinical practice and research
export const sharedMenuItems: MenuItemType[] = [
  { 
    title: "Patients", 
    icon: Users, 
    url: "/patients",
    items: [
      { title: "Patient List", icon: Users, url: "/patients" },
      { title: "Register Patient", icon: PlusCircle, url: "/patients/register" },
      { title: "Clinical Information", icon: FileText, url: "/patients/clinical-information" },
      { title: "Insurance Information", icon: Shield, url: "/patients/insurance-information" }
    ]
  },
  { title: "Messages", icon: MessageSquare, url: "/messages" },
  { title: "Appointments", icon: CalendarClock, url: "/appointments" }
];

// Clinical practice specific items
export const clinicalPracticeItems: MenuItemType[] = [
  { 
    title: "Clinical Workflows", 
    icon: Stethoscope, 
    url: "/clinical-workflows",
    items: [
      { title: "Patient Check-In", icon: CheckCircle, url: "/clinical-workflows/check-in" },
      { title: "Clinical Queue", icon: Users2, url: "/clinical-workflows/clinical-queue" },
      { title: "Triage Assessment", icon: Activity, url: "/clinical-workflows/triage" },
      { title: "SOAP Notes", icon: FileText, url: "/clinical-workflows/soap-notes" },
      { title: "Clinical Notes", icon: FileText, url: "/clinical-workflows/notes" },
      { title: "Prescriptions", icon: Pill, url: "/clinical-workflows/prescriptions" },
      { title: "Treatment Plans", icon: HeartPulse, url: "/clinical-workflows/treatment-plans" },
      { title: "Medical Orders", icon: ClipboardCheck, url: "/clinical-workflows/medical-orders" },
      { title: "Patient Education", icon: BookOpen, url: "/clinical-workflows/patient-education" }
    ]
  },
  { 
    title: "Facility Management", 
    icon: Building2, 
    url: "/facility-management",
    items: [
      { title: "Bed Management", icon: Bed, url: "/facility-management/beds" },
      { title: "Room Allocation", icon: Building2, url: "/facility-management/rooms" },
      { title: "Equipment Tracking", icon: MonitorSpeaker, url: "/facility-management/equipment" },
      { title: "Maintenance", icon: Settings, url: "/facility-management/maintenance" }
    ]
  },
  { 
    title: "Staff Management", 
    icon: Users2, 
    url: "/staff-management",
    items: [
      { title: "Staff Directory", icon: Users, url: "/staff-management/directory" },
      { title: "Duty Schedules", icon: Calendar, url: "/staff-management/schedules" },
      { title: "Shift Management", icon: CalendarCheck, url: "/staff-management/shifts" },
      { title: "Time Tracking", icon: Clock, url: "/staff-management/time-tracking" },
      { title: "Leave Management", icon: UserX, url: "/staff-management/leave" }
    ]
  },
  { 
    title: "HR Management", 
    icon: UserCog, 
    url: "/hr-management",
    items: [
      { title: "Employee Records", icon: FileText, url: "/hr-management/employees" },
      { title: "Payroll", icon: DollarSign, url: "/hr-management/payroll" },
      { title: "Benefits", icon: Heart, url: "/hr-management/benefits" },
      { title: "Training & Certification", icon: BookOpen, url: "/hr-management/training" },
      { title: "Performance Reviews", icon: BarChart, url: "/hr-management/performance" }
    ]
  },
  { 
    title: "Diagnostics & Results", 
    icon: TestTube, 
    url: "/lab-results",
    items: [
      { title: "Lab Results", icon: TestTube, url: "/lab-results" },
      { title: "Imaging Results", icon: Scan, url: "/medical-records/imaging" },
      { title: "Vital Signs", icon: Activity, url: "/clinical-data/vitals" }
    ]
  },
  { 
    title: "Medical Records", 
    icon: FileText, 
    url: "/medical-records",
    items: [
      { title: "Patient History", icon: Clock, url: "/medical-records/history" },
      { title: "Diagnoses", icon: HeartPulse, url: "/medical-records/diagnoses" },
      { title: "External Records", icon: Folder, url: "/medical-records/external" }
    ]
  },
  { 
    title: "Clinical Reports", 
    icon: BarChart, 
    url: "/clinical-reports",
    items: [
      { title: "Treatment Outcomes", icon: ChartBar, url: "/clinical-reports/outcomes" },
      { title: "Patient Analytics", icon: BarChart2, url: "/clinical-reports/patient-analytics" },
      { title: "Provider Metrics", icon: FileSpreadsheet, url: "/clinical-reports/provider-metrics" },
      { title: "Medication Reports", icon: Pill, url: "/clinical-reports/medications" },
      { title: "Handoff Reports", icon: FileText, url: "/clinical-reports/handoff" }
    ]
  }
];

// Research study specific items
export const researchStudyItems: MenuItemType[] = [
  { 
    title: "Research Studies", 
    icon: FlaskRound, 
    url: "/studies",
    items: [
      { title: "Studies Overview", icon: BookOpen, url: "/studies" },
      { title: "Create Study", icon: PlusCircle, url: "/studies/create" },
      { title: "Protocol Setup", icon: FileSearch, url: "/studies/protocol-setup" },
      { title: "Study Sites", icon: Building2, url: "/studies/sites" },
      { title: "Protocol Documents", icon: Folder, url: "/studies/protocol-documents" },
      { title: "Consent Tracking", icon: Clipboard, url: "/studies/consent-tracking" },
      { title: "Patient Randomization", icon: Users, url: "/studies/patient-randomization" },
      { title: "Protocol Deviations", icon: AlertTriangle, url: "/studies/protocol-deviations" },
      { title: "Site Visits", icon: Building2, url: "/studies/site-visits" },
      { title: "Finance", icon: DollarSign, url: "/studies/finance" },
      { title: "Quiz Management", icon: Clipboard, url: "/studies/quiz-management" }
    ]
  },
  { 
    title: "Research Data", 
    icon: Database, 
    url: "/research-data",
    items: [
      { title: "Data Collection", icon: Clipboard, url: "/research-data/collection" },
      { title: "Data Exports", icon: FileSpreadsheet, url: "/research-data/exports" },
      { title: "Laboratory Results", icon: TestTube, url: "/research-data/lab-results" },
      { title: "Biospecimen Tracking", icon: Microscope, url: "/research-data/biospecimen" },
    ]
  },
  { 
    title: "Analytics", 
    icon: ChartBar, 
    url: "/analytics",
    items: [
      { title: "Enrollment Analytics", icon: Users, url: "/analytics/enrollment" },
      { title: "Study Outcomes", icon: CheckCircle, url: "/analytics/outcomes" },
      { title: "Site Performance", icon: BarChart2, url: "/analytics/site-performance" },
      { title: "Data Quality", icon: Database, url: "/analytics/data-quality" },
      { title: "Geographical Distribution", icon: Map, url: "/analytics/geographic" }
    ]
  }
];

// Admin items - common for both modes
export const adminMenuItems: MenuItemType[] = [
  { 
    title: "User Management", 
    icon: UserCog, 
    url: "/users",
    items: [
      { title: "Users List", icon: Users, url: "/users" },
      { title: "Roles & Permissions", icon: ShieldAlert, url: "/users/roles" },
      { title: "Access Requests", icon: UserCheck, url: "/users/access-requests" }
    ]
  },
  { 
    title: "Settings", 
    icon: Settings, 
    url: "/settings",
    items: [
      { title: "General Settings", icon: Settings, url: "/settings" },
      { title: "Notifications", icon: BellRing, url: "/settings/notifications" },
      { title: "System Configuration", icon: DatabaseZap, url: "/settings/system" }
    ]
  },
  { title: "Compliance", icon: ShieldAlert, url: "/compliance" },
  { title: "Audit Logs", icon: FileLock, url: "/audit-logs" },
  { title: "All Links", icon: FileText, url: "/all-links" }
];

// Legacy arrays kept for compatibility
export const mainMenuItems = [...sharedMenuItems, ...clinicalPracticeItems, ...researchStudyItems].filter(
  (item, index, self) => index === self.findIndex(t => t.title === item.title)
);

export const portalMenuItems = [
  { title: "Patient Portal", icon: LayoutIcon, url: "/patient-portal/dashboard" },
  { title: "Messages", icon: MessageSquare, url: "/messages" },
  { title: "Appointments", icon: CalendarClock, url: "/appointments" }
];
