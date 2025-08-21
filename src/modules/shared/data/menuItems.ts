import { 
  Users, 
  PlusCircle, 
  FileText, 
  Shield, 
  MessageSquare, 
  CalendarClock,
  UserCog,
  ShieldAlert,
  Settings,
  BellRing,
  DatabaseZap,
  FileLock,
  UserCheck
} from 'lucide-react';
import { MenuItemType } from '@/components/layout/sidebar/SidebarMenuItem';

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

export const adminMenuItems: MenuItemType[] = [
  { 
    title: "User Management", 
    icon: UserCog, 
    url: "/admin/users",
    items: [
      { title: "Users List", icon: Users, url: "/admin/users" },
      { title: "Roles & Permissions", icon: ShieldAlert, url: "/admin/users/roles" },
      { title: "Access Requests", icon: UserCheck, url: "/admin/users/access-requests" }
    ]
  },
  { 
    title: "Settings", 
    icon: Settings, 
    url: "/admin/settings",
    items: [
      { title: "General Settings", icon: Settings, url: "/admin/settings" },
      { title: "Notifications", icon: BellRing, url: "/admin/settings/notifications" },
      { title: "System Configuration", icon: DatabaseZap, url: "/admin/settings/system" }
    ]
  },
  { title: "Compliance", icon: ShieldAlert, url: "/admin/compliance" },
  { title: "Audit Logs", icon: FileLock, url: "/admin/audit-logs" },
  { title: "All Links", icon: FileText, url: "/admin/all-links" }
];