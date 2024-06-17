"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sliderData = [
  { id: 1, content: "Slide 1 Content" },
  { id: 2, content: "Slide 2 Content" },
  { id: 3, content: "Slide 3 Content" },
  // Add more slides as needed
];

const AutoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-sky-600">Automatic Slider</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider {...settings}>
            {sliderData.map((slide) => (
              <div key={slide.id} className="p-4">
                <div className="bg-sky-500 text-white p-6 rounded-md text-center">{slide.content}</div>
              </div>
            ))}
          </Slider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoSlider;
