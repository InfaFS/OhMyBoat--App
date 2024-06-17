"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import InfiniteSlider from "../Slider";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../ui/card";
  import Link from "next/link";
  import { Button } from "../ui/button";
  import { Separator } from "../ui/separator";
  import RatingComponent from "./RatingComponent";
  import { intRandomizer } from "../../../data/extra-stuff";
  import { useRouter } from "next/navigation";
  import { UserRatingProm } from "../../../actions/reviewActions";
import { Star } from "lucide-react";


  const sliderData = [
    { id: 1, content: "Slide 1 Content" },
    { id: 2, content: "Slide 2 Content" },
    { id: 3, content: "Slide 3 Content" },
    { id: 1, content: "Slide 1 Content" },
    { id: 2, content: "Slide 2 Content" },
    { id: 3, content: "Slide 3 Content" },
    { id: 1, content: "Slide 1 Content" },
    { id: 2, content: "Slide 2 Content" },
    { id: 3, content: "Slide 3 Content" },
    { id: 1, content: "Slide 1 Content" },
    { id: 2, content: "Slide 2 Content" },
    { id: 3, content: "Slide 3 Content" },

    // Add more slides as needed
  ];

  export function ViewProfileComponentInfa({ firstname, lastname, birthday, email,role,id,estrellas,reviews}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    console.log(reviews)

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    };


    const router = useRouter();
    let rol = null
    
    if (role === "ADMIN") {
        rol = "Administrador"
    }
    if (role === "USER") {
        rol = "Usuario"
    }
    if (role === "MANAGER") {
        rol = "Gerente"
    }
    const handleBack = () => {
      router.back();
    }

    return (
      <div className="flex items-center justify-center h-screen">
        <div style={{ width: "50%", height: "85%" }}>
          <div className="bg-sky-700 rounded-lg shadow-md p-4">
            <Card>
              <CardHeader>
                <CardTitle className="hover:text-blue-500 cursor-pointer">
                    {`Perfil del ${rol}`}
                    </CardTitle>
                <CardDescription>Datos del usuario:</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                <p className="mb-2 ">
                  <span className="font-semibold hover:text-blue-500 cursor-pointer">Nombre:</span> {firstname} 
                </p>
  
                <p className="mb-2">
                  <span className="font-semibold hover:text-blue-500 cursor-pointer">Apellido:</span> {lastname} 
                </p>
  
                <p className="mb-2">
                  <span className="font-semibold hover:text-blue-500 cursor-pointer">Email:</span> {email}
                </p>

                <p className="mb-2">
                  <span className="font-semibold hover:text-blue-500 cursor-pointer">Fecha de Nacimiento:</span> {birthday}
                </p>
            
              {/* Solo mostrar reseñas para usuarios. */}
              { role === "USER" && (
                <section className="flex items-center space-x-4 space-y-5">
                  <RatingComponent number={estrellas} />
                  <Link href={`/view-reviews/${id}`}>
                  <Button variant="ghost" className="hover:text-blue-500">Ver reseñas</Button>
                  </Link>
                </section>
              )}

                </div>
                {/* 
                <Slider {...settings}>
                {reviews.map((slide) => (
                  <div key={slide.id} className="flex items-center">
                     <span className='text-sm'>
                  {slide.ReviewerFirstName} {slide.ReviewerLastName}
                  </span>
                  <RatingComponent number={slide.stars} format='table'/>
                 </div>
                ))}
                </Slider> */}
                  {reviews.length > 0 && (
                    <div>
                    <div className="flex justify-center items-center">
                    <Star  size={20} className="text-yellow-600"/>
                    <h1 className="text-center font-bold text-yellow-600">Reseñas Destacadas</h1>
                    <Star size={20} className="text-yellow-600"/>
                  </div>
                  <InfiniteSlider reviews={reviews} />
                  </div>

                  )}
                <Separator />
              </CardContent>
              <CardFooter>
                <div>
                  <Button className="mr-2 hover:text-blue-700" variant="ghost" onClick={handleBack}>Volver</Button>
                </div>
     
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  