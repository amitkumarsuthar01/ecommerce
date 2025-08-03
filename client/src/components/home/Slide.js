import React from 'react';
import "../home/slide.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Divider } from '@mui/material';
import { NavLink } from "react-router-dom";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const Slide = ({ title, products = [] }) => {
  return (
    <div className="products_section">
      <div className="products_deal">
        <h3>{title}</h3>
        <button className="view_btn">View All</button>
      </div>
      <Divider />

      {products.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite
          draggable={false}
          swipeable
          centerMode
          autoPlay
          autoPlaySpeed={4000}
          keyBoardControl
          showDots={false}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          containerClass="carousel-container"
        >
          {products.map((item) => {
            const { id, url, title, discount, tagline } = item || {};
            return (
              <NavLink to={`/getproductsone/${id}`} key={id}>
                <div className="products_items">
                  <div className="product_img">
                    <img src={url} alt={title?.shortTitle || "Product"} />
                  </div>
                  <p className="products_name">{title?.shortTitle}</p>
                  <p className="products_offer" style={{ color: "#007185" }}>{discount}</p>
                  <p className="products_explore">{tagline}</p>
                </div>
              </NavLink>
            );
          })}
        </Carousel>
      ) : (
        <p style={{ padding: "1rem", textAlign: "center" }}>No products available.</p>
      )}
    </div>
  );
};

export default Slide;
