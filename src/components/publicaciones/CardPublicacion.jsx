import {     Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, } from "../ui/card";
    
import { Button } from "../ui/button";

  export default function CardPublicacion({marina, modelo, nombre, img}) {
      return (
          <div>
              <Card style={{ width: "100%", height: "100%" }}>
                  <CardHeader>
                      <CardTitle>{nombre}</CardTitle>
                      <CardDescription>{modelo}</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div>
                          <img src={img} width='300' height='300' alt='Image'/> {/*  */} 
                      </div>
                  </CardContent>
                  <CardFooter>
                      <Button>Ver detalle</Button>
                      <p>📍{marina}</p>
                  </CardFooter>
              </Card>
          </div>
      );
  }