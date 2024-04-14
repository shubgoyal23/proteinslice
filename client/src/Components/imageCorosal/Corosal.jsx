import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./style.css";
function Corosal() {
   return (
      <div className="w-full h-72 md:h-[32rem] relative overflow-hidden">
         <div
            className={`w-full h-72 md:h-[32rem] relative brightness-50 transition-transform ease-out duration-500`}
         >
            <Swiper
               spaceBetween={30}
               centeredSlides={true}
               autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
               }}
               pagination={{
                  clickable: true,
               }}
               navigation={true}
               modules={[Autoplay, Pagination, Navigation]}
               className="mySwiper"
            >
               <SwiperSlide>
                  <img src="./hero1.webp" alt="" />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="./hero2.webp" alt="" />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="./hero3.webp" alt="" />
               </SwiperSlide>
            </Swiper>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h1
               id="h1-grad"
               className="lg:text-7xl md:text-6xl text-5xl font-bold"
            >
               ProteinSlice
            </h1>
            <p className="mt-1 lg:text-2xl md:text-xl text-sm">
               Premium Health and Nutrition Products for Peak Fitness and
               Vibrant Living
            </p>
            <Link to="/shop">
               <button className="w-28 p-1.5 mt-4 text-center border rounded-lg border-white hover:border-amber-400 hover:text-amber-400">
                  Visit Store
               </button>
            </Link>
         </div>
      </div>
   );
}

export default Corosal;
