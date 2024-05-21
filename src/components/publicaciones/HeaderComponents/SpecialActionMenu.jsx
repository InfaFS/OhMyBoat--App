// components/BasicMenu.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Contact, ShieldCheckIcon,Trash2,UserPlus} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { borrarPublicaciones } from '../../../../actions/borrarPublicaciones';
import { toast } from 'sonner';
export default function SpecialActionsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAndDelete = async () => {
    setAnchorEl(null);
    toast.dismiss();
    const res = await borrarPublicaciones();
    if (res.success) {
        toast.success(res.success);
        router.refresh();

    }
  }

  const handleConfirmation = () => {
    setAnchorEl(null);
    toast.error("SE BORRARAN TODAS LAS PUBLICACIONES!", {
      action: <>
      <div>
        <button onClick={handleCloseAndDelete} className='hover:text-rose-600 text-red-900'>Confirmar</button>
        <button onClick={() => {toast.dismiss();setAnchorEl(null) }} className='hover:text-rose-600 text-red-900 '>Cancelar</button>
        </div>
      </>
  })
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
      <ShieldCheckIcon height={20} width={20} />
      </Button>
      <Menu
        id="special-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <MenuItem onClick={handleConfirmation} className="text-sm"> <Trash2 height={20} width={20} className='mr-2' />Borrar publicaciones</MenuItem>
        <Link href="/admin/view-employees">
        <MenuItem onClick={handleClose} className="text-sm"> <Contact height={20} width={20} className='mr-2' />Ver gerentes</MenuItem>
        </Link>
        <Link href="/admin/auth/register-manager">
        <MenuItem onClick={handleClose} className="text-sm"> <UserPlus height={20} width={20} className='mr-2' />Registrar gerente</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
