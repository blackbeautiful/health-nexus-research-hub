
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
  FileText as FileText2
} from 'lucide-react';
import { MenuItemType } from './SidebarMenuItem';

export const mainMenuItems: MenuItemType[] = [
  { title: "Dashboard", icon: Home, url: "/" },
  { 
    title: "Patients", 
    icon: Users, 
    url: "/patients",
    items: [
      { title: "Patient List", icon: Users, url: "/patients" },
      { title: "Register Patient", icon: User, url: "/patients/register" }
    ]
  },
  { 
    title: "Research Studies", 
    icon: FileSearch, 
    url: "/studies",
    items: [
      { title: "Studies Overview", icon: FileText2, url: "/studies" },
      { title: "Protocol Setup", icon: FileSearch, url: "/studies/protocol-setup" },
      { title: "Study Sites", icon: Building2, url: "/studies/sites" },
      { title: "Protocol Documents", icon: FileText, url: "/studies/protocol-documents" },
      { title: "Consent Tracking", icon: Clipboard, url: "/studies/consent-tracking" },
      { title: "Patient Randomization", icon: Users, url: "/studies/patient-randomization" },
      { title: "Protocol Deviations", icon: AlertTriangle, url: "/studies/protocol-deviations" },
      { title: "Site Visits", icon: Building2, url: "/studies/site-visits" },
      { title: "Finance", icon: FileText2, url: "/studies/finance" }
    ]
  },
  { 
    title: "Clinical Workflows", 
    icon: Stethoscope, 
    url: "/clinical-workflows",
    items: [
      { title: "Clinical Notes", icon: FileText, url: "/clinical-workflows/notes" },
      { title: "Prescriptions", icon: Pill, url: "/clinical-workflows/prescriptions" }
    ]
  },
  { title: "Clinical Data", icon: Database, url: "/clinical-data" },
  { title: "Lab Results", icon: TestTube, url: "/lab-results" },
  { title: "Analytics", icon: BarChart2, url: "/analytics" }
];

export const adminMenuItems: MenuItemType[] = [
  { title: "User Management", icon: UserCog, url: "/users" },
  { title: "Settings", icon: Settings, url: "/settings" },
  { title: "Compliance", icon: ShieldAlert, url: "/compliance" },
  { title: "Audit Logs", icon: FileLock, url: "/audit-logs" }
];

export const portalMenuItems: MenuItemType[] = [
  { title: "Patient Portal", icon: LayoutIcon, url: "/patient-portal/dashboard" },
  { title: "Messages", icon: MessageSquare, url: "/messages" },
  { title: "Appointments", icon: CalendarClock, url: "/appointments" }
];
