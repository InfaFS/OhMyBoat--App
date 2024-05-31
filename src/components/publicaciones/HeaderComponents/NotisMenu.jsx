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
const mensajes = [
  {
    id: 1,
    mensaje: 'Tu vehículo ha sido robado :(',
  },
  {
    id: 2,
    mensaje: 'Joseph joestar te ha enviado una solicitud de amistad',
  },
  {
    id: 3,
    mensaje: 'Joseph joestar te ha enviado una solicitud de amistad',
  },
  {
    id: 4,
    mensaje: 'Joseph joestar te ha enviado una solicitud de amistad',
  },
  {
    id: 5,
    mensaje: 'Joseph joestar te ha enviado una solicitud de amistad',
  },
  {
    id: 6,
    mensaje: 'Joseph joestar te ha enviado una solicitud de amistad',
  },
  {
    id: 7,
    mensaje: 'Joseph joestar te ha enviado una solicitud de amistad',
  },
  {
    id: 8,
    mensaje: 'Joseph joestar te ha enviado una solicitud de amistad',
  },
  {
    id: 9,
    mensaje: 'Joseph joestar te ha enviado una solicitud de amistad',
  },
  {
    id: 10,
    mensaje: 'Joseph joestar te ha enviado una solicitud de amistad',
  },
  {
    id: 11,
    mensaje: 'Joseph joestar te ha enviado una solicitud de amistad',
  },

]
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
      <ScrollArea className="h-64 w-full rounded-md border shadow-lg">
        <div className="p-4">
          {notificacionesArray.length === 0 ? (
              <h4 className="mb-4 text-sm font-medium leading-none text-gray-700">No hay notificaciones por el momento</h4>
          ) : (
            <h4 className="mb-4 text-sm font-medium leading-none text-gray-700">Notificaciones</h4>
          )}

          <Separator className="my-2" />
          {notificacionesArray.map((notif) => (
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
