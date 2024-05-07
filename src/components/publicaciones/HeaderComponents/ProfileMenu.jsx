// components/BasicMenu.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { User,LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { CerradoDeSesion } from '../../../../actions/cerrarsession';

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

  };

  const handleCloseAndLogout = async () => {
    setAnchorEl(null);
    const res = await CerradoDeSesion();
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <User height={20} width={20} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link href="/settings">
        <MenuItem onClick={handleClose}>
        <div className="flex items-center">
            <Settings height={20} width={20} className="mr-2" />
            <span>Ver perfil</span>
          </div>
        </MenuItem>
        </Link>
        
        <MenuItem onClick={handleCloseAndLogout}>
          <div className="flex items-center">
            <LogOut height={20} width={20} className="mr-2" />
            <span>Cerrar Sesión</span>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
