// components/BasicMenu.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Bell} from 'lucide-react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Badge from '@mui/material/Badge';
import { getUnseenNotis, seeNotis } from '../../../../actions/notifications';

{/* <Link href="/profile/notifications">
<MenuItem onClick={handleClose} className='text-sm'>Notificaciones</MenuItem>
</Link> */}

const fakeNotis = [
  {
    id: 1,
    title: "Notificación 1",
    description: "Descripción de la notificación 1",
  },
  {
    id: 2,
    title: "Notificación 2",
    description: "Descripción de la notificación 2",
  },
  {
    id: 3,
    title: "Notificación 3",
    description: "Descripción de la notificación 3",
  },
];



export default function NotisMenu({notificacionesArray,userId,unseenNotisNumber}) {
  console.log(unseenNotisNumber);
  console.log(userId);
  console.log(notificacionesArray);
  console.log(notificacionesArray.length)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [notis, setNotis] = useState(unseenNotisNumber > 0 ? unseenNotisNumber : 0);

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    const notisVistas = await seeNotis(userId);
    console.log(notisVistas.length);
    setNotis(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
    <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      <Badge badgeContent={notis} color="primary">
        <Bell height={20} width={20} />
      </Badge>
    </Button>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      PaperProps={{
        style: {
          maxHeight: '72vh', // Limita la altura máxima
          width: '300px', // Establece el ancho del menú,
        },
      }}
    >
      <ScrollArea className="w-full rounded-md border shadow-lg">
        <div className="p-4">
          <Link href="/profile/notifications">
          <h1 className='text-sm font-semibold hover:text-slate-500 cursor-pointer' >Ver historial de notificaciones</h1>
          </Link>
          <Separator className="my-2"/>
          {notificacionesArray.length === 0 ? (
              <h4 className="text-sm font-semibold leading-none text-gray-700 hover:underline">No hay notificaciones nuevas por el momento</h4>
          ) : (
            <h4 className="text-sm font-semibold leading-none text-blue-500">Nuevas notificaciones!</h4>
          )}

          <Separator className="my-2" />
          {notificacionesArray.slice().reverse().map((notif) => (
            <div key={notif.id} className="my-2">
              <div>
                <span className="text-sm font-semibold text-gray-800">{notif.title}</span>
                </div>
              <div className="text-sm text-gray-800">{notif.description}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </Menu>
  </div>
  );
}
