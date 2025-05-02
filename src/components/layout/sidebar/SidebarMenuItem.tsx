
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarMenuItem as MenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { LucideIcon } from 'lucide-react';

export interface MenuItemType {
  title: string;
  icon: LucideIcon;
  url: string;
  items?: MenuItemType[];
  onClick?: () => void; // Add onClick handler prop
}

interface SidebarMenuItemProps {
  item: MenuItemType;
  openGroups: string[];
  toggleGroup: (title: string) => void;
  sidebarState: string;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item, openGroups, toggleGroup, sidebarState }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (url: string) => {
    return location.pathname === url || (url !== '/' && location.pathname.startsWith(url));
  };

  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    } else {
      navigate(item.url);
    }
  };

  if (item.items && item.items.length > 0) {
    const isOpen = openGroups.includes(item.title);
    const isCurrentActive = isActive(item.url) || 
                         (item.items && item.items.some(subItem => isActive(subItem.url)));
    
    return (
      <MenuItem key={item.title}>
        <Collapsible
          open={isOpen || isCurrentActive}
          onOpenChange={() => toggleGroup(item.title)}
        >
          <CollapsibleTrigger asChild>
            <SidebarMenuButton 
              isActive={isCurrentActive}
              tooltip={sidebarState === "collapsed" ? item.title : undefined}
              className="flex w-full justify-between"
            >
              <div className="flex items-center">
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </div>
              <ChevronRight className={`h-4 w-4 transition-transform ${isOpen || isCurrentActive ? 'rotate-90' : ''}`} />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton 
                    onClick={() => subItem.onClick ? subItem.onClick() : navigate(subItem.url)} 
                    isActive={isActive(subItem.url)}
                  >
                    <subItem.icon className="mr-2 h-4 w-4" />
                    <span>{subItem.title}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </MenuItem>
    );
  }
  
  return (
    <MenuItem key={item.title}>
      <SidebarMenuButton 
        onClick={handleClick}
        isActive={isActive(item.url)}
        tooltip={sidebarState === "collapsed" ? item.title : undefined}
      >
        <div className="flex items-center">
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </div>
      </SidebarMenuButton>
    </MenuItem>
  );
};

export default SidebarMenuItem;
