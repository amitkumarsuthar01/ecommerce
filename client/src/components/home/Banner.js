// Banner.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../home/banner.css";

// const images = [
//   "/banner11.jpg",
//   "/banner12.jpg",
//   "/banner13.jpg",
//   "/banner14.jpg",
//   "/banner15.jpg"
// ];

const images = [
    "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50"
];

const Banner = () => (
  <Swiper
    modules={[Autoplay, Navigation, Pagination]}
    spaceBetween={0}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 3000 }}
    loop={true}
    className="banner-carousel"
  >
    {images.map((img, i) => (
      <SwiperSlide key={i}>
        <img src={img} alt={`slide-${i}`} className="banner_img" />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default Banner;
