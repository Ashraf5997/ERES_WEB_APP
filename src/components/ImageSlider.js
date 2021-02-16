
import React ,{useState , useEffect } from 'react';

import Carousel from 'react-bootstrap/Carousel'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

export const ImageSlider = (props) => {
return(
    <>
 <Carousel>
  <Carousel.Item>
    <img
      classNamsssse="d-block w-100"
      src="/officeImages/pic1.png" className="pic1"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>OFFICE & STAFF</h3>
      <hr></hr>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/officeImages/pic2.png" className="pic1"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h4>BOARD ROOM MEATING</h4>
       <hr></hr>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/officeImages/pic3.png" className="pic1"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>BEAUTIFUL MEMORIES</h3>
      <hr></hr>
    </Carousel.Caption>
  </Carousel.Item>

</Carousel>   
    </>
)

}
export default ImageSlider
