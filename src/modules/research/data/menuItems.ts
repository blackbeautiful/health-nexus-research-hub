import { 
  FlaskRound, 
  Database, 
  ChartBar, 
  BookOpen, 
  PlusCircle, 
  FileSearch, 
  Building2, 
  Folder, 
  Clipboard, 
  Users, 
  AlertTriangle, 
  DollarSign, 
  FileSpreadsheet, 
  TestTube, 
  Microscope, 
  CheckCircle, 
  BarChart2, 
  Map
} from 'lucide-react';
import { MenuItemType } from '@/components/layout/sidebar/SidebarMenuItem';

export const researchMenuItems: MenuItemType[] = [
  { 
    title: "Research Studies", 
    icon: FlaskRound, 
    url: "/research/studies",
    items: [
      { title: "Studies Overview", icon: BookOpen, url: "/research/studies" },
      { title: "Create Study", icon: PlusCircle, url: "/research/studies/create" },
      { title: "Protocol Setup", icon: FileSearch, url: "/research/studies/protocol-setup" },
      { title: "Study Sites", icon: Building2, url: "/research/studies/sites" },
      { title: "Protocol Documents", icon: Folder, url: "/research/studies/protocol-documents" },
      { title: "Consent Tracking", icon: Clipboard, url: "/research/studies/consent-tracking" },
      { title: "Patient Randomization", icon: Users, url: "/research/studies/patient-randomization" },
      { title: "Protocol Deviations", icon: AlertTriangle, url: "/research/studies/protocol-deviations" },
      { title: "Site Visits", icon: Building2, url: "/research/studies/site-visits" },
      { title: "Finance", icon: DollarSign, url: "/research/studies/finance" },
      { title: "Quiz Management", icon: Clipboard, url: "/research/studies/quiz-management" }
    ]
  },
  { 
    title: "Research Data", 
    icon: Database, 
    url: "/research/research-data",
    items: [
      { title: "Data Collection", icon: Clipboard, url: "/research/research-data/collection" },
      { title: "Data Exports", icon: FileSpreadsheet, url: "/research/research-data/exports" },
      { title: "Laboratory Results", icon: TestTube, url: "/research/research-data/lab-results" },
      { title: "Biospecimen Tracking", icon: Microscope, url: "/research/research-data/biospecimen" },
    ]
  },
  { 
    title: "Analytics", 
    icon: ChartBar, 
    url: "/research/analytics",
    items: [
      { title: "Enrollment Analytics", icon: Users, url: "/research/analytics/enrollment" },
      { title: "Study Outcomes", icon: CheckCircle, url: "/research/analytics/outcomes" },
      { title: "Site Performance", icon: BarChart2, url: "/research/analytics/site-performance" },
      { title: "Data Quality", icon: Database, url: "/research/analytics/data-quality" },
      { title: "Geographical Distribution", icon: Map, url: "/research/analytics/geographic" }
    ]
  }
];