
import React from 'react';
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import SidebarMenuItem, { MenuItemType } from './SidebarMenuItem';

interface SidebarMenuGroupProps {
  title: string;
  items: MenuItemType[];
  openGroups: string[];
  toggleGroup: (title: string) => void;
  sidebarState: string;
  className?: string;
}

const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({ 
  title,
  items,
  openGroups,
  toggleGroup,
  sidebarState,
  className
}) => {
  return (
    <SidebarGroup className={className}>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              item={item}
              openGroups={openGroups}
              toggleGroup={toggleGroup}
              sidebarState={sidebarState}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarMenuGroup;
