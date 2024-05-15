import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const ImageGallery = ({ images }) => {
  return (
    <div className="w-[80%] h-[450px] mx-auto flex justify-center items-center">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="w-4/5 h-[450px] flex items-center justify-center"
      >
        {images?.map((image, index) => {
          return (
            <SwiperSlide
              key={index}
              className="rounded-xl w-[90%] h-[450px] overflow-hidden"
            >
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="object-cover]"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageGallery;
