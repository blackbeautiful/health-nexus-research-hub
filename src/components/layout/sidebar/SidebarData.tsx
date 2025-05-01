
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
  FileText as FileText2,
  BookOpen,
  Briefcase,
  FlaskRound,
  ChartBar,
  Folder
} from 'lucide-react';
import { MenuItemType } from './SidebarMenuItem';

// Shared items for both clinical practice and research
export const sharedMenuItems: MenuItemType[] = [
  { title: "Dashboard", icon: Home, url: "/" },
  { 
    title: "Patients", 
    icon: Users, 
    url: "/patients",
    items: [
      { title: "Patient List", icon: Users, url: "/patients" },
      { title: "Register Patient", icon: User, url: "/patients/register" },
      { title: "Clinical Information", icon: FileText, url: "/patients/clinical-information" },
      { title: "Insurance Information", icon: FileText2, url: "/patients/insurance-information" }
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
      { title: "Clinical Notes", icon: FileText, url: "/clinical-workflows/notes" },
      { title: "New Note", icon: FileText2, url: "/clinical-workflows/notes/new" },
      { title: "Prescriptions", icon: Pill, url: "/clinical-workflows/prescriptions" },
      { title: "New Prescription", icon: Pill, url: "/clinical-workflows/prescriptions/new" }
    ]
  },
  { title: "Lab Results", icon: TestTube, url: "/lab-results" },
  { title: "Clinical Data", icon: Database, url: "/clinical-data" },
  { title: "Patient Portal", icon: LayoutIcon, url: "/patient-portal/dashboard" }
];

// Research study specific items
export const researchStudyItems: MenuItemType[] = [
  { 
    title: "Research Studies", 
    icon: FlaskRound, 
    url: "/studies",
    items: [
      { title: "Studies Overview", icon: BookOpen, url: "/studies" },
      { title: "Protocol Setup", icon: FileSearch, url: "/studies/protocol-setup" },
      { title: "Study Sites", icon: Building2, url: "/studies/sites" },
      { title: "Protocol Documents", icon: Folder, url: "/studies/protocol-documents" },
      { title: "Consent Tracking", icon: Clipboard, url: "/studies/consent-tracking" },
      { title: "Patient Randomization", icon: Users, url: "/studies/patient-randomization" },
      { title: "Protocol Deviations", icon: AlertTriangle, url: "/studies/protocol-deviations" },
      { title: "Site Visits", icon: Building2, url: "/studies/site-visits" },
      { title: "Finance", icon: FileText2, url: "/studies/finance" },
      { title: "Quiz Management", icon: Clipboard, url: "/studies/quiz-management" }
    ]
  },
  { title: "Analytics", icon: ChartBar, url: "/analytics" }
];

// Admin items - common for both modes
export const adminMenuItems: MenuItemType[] = [
  { title: "User Management", icon: UserCog, url: "/users" },
  { title: "Settings", icon: Settings, url: "/settings" },
  { title: "Compliance", icon: ShieldAlert, url: "/compliance" },
  { title: "Audit Logs", icon: FileLock, url: "/audit-logs" }
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
