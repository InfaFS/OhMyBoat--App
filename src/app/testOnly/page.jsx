"use client"
import { Toaster, toast } from 'sonner'

function testOnly() {
  const handleClick = () => {
    // Mostrar un toast de éxito
    toast.success('¡Esta es una notificación de éxito!')


  }

  return (
    <div>
      {/* Coloca el componente Toaster en la parte superior de tu aplicación */}
      <Toaster richColors position='top-center'/>

      <button onClick={handleClick}>Mostrar Toasts</button>
    </div>
  )
}

export default testOnly
