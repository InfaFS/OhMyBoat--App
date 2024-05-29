This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Extra comands
... los del principio(agregarlos)
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npm install @auth/prisma-adapter
Si llego a implementar google o otro medio de logeo, poner la db con ? para hacer opcionales los campos
sudo npx prisma generate HACER ESTO!!!!!!!!!!!!!!!1
npm install uuid# OhMyBoat--App

APP OhMyBoat! 🛥️

------------------  
IMPORTANTE!!! USAR SUDO ANTES DE UN COMANDO SI ALGUNO TIRA ERROR(ej: sudo npx prisma init ).

✍️ Pasos  
 --> Cuando clonen el repositorio tienen que usar estos tres comandos (teniendo en cuenta que ya tienen npm/node)  
 npm install react  
 npm install next  
 npm install prisma -D  
 (una sola vez)  

------------------  

--> Manejo de la base de datos  
 Usamos una local (sqlite,ya configurado)  
 para inicializarla, usamos  
 --> npx prisma init (si hay una carpeta prisma ya no sera necesario)
 --> npx prisma migrate dev  
 Si aplicamos algun cambio  
 --> npx prisma migrate dev  
 Si solo la queremos resetear  
 --> npx prisma migrate reset  

------------------  

Por el momento estamos usando tambien  
--> npm install next-auth  
--> npm install react-hook-form  
--> npm install bcrypt  
aniadir mas data adelante...  

PARA QUE NO DE ERORR LA BASE DE DATOS  
(sudo) npx prisma db push  
(sudo) npx prisma db pull  
(sudo) npx prisma migrate dev  
(sudo) npx prisma generate  
PONER--> sudo chmod 777 A TODO LO QUE ESTA EN LA CARPETA PRISMA  
 