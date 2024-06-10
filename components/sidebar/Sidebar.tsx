import React from 'react';
import { List, ListItemButton, ListItemText, Divider } from '@mui/material';

type SidebarProps = {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ selectedSection, setSelectedSection }) => {
  return (
    <div className="w-64">
      <List>
        <ListItemButton
          selected={selectedSection === 'profile'}
          onClick={() => setSelectedSection('profile')}
        >
          <ListItemText primary="Perfil" />
        </ListItemButton>
        <ListItemButton
          selected={selectedSection === 'companies'}
          onClick={() => setSelectedSection('companies')}
        >
          <ListItemText primary="Empresas" />
        </ListItemButton>
      </List>
      <Divider />
    </div>
  );
};

export default Sidebar;
