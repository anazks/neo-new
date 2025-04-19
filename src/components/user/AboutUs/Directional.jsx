
  // AboutUs.jsx
  import React from 'react';
  import './directional.css';
import { IoArrowForwardCircleSharp } from 'react-icons/io5';
  
  function Directional() {
    return (
      <div className='mainDiv'>
        <div className='leftDiv'>
          <div>
            <h1 >Directional</h1>
            <span>AI and ML Tech</span>
            <p>We specialize in creating high-performance custom PCs tailored to your needs. Our team of experts ensures top-quality components and exceptional craftsmanship to deliver the ultimate gaming and workstation experience.</p>
          </div>
          <button className="team-button">
                    <IoArrowForwardCircleSharp className='iconsbtn-team' />
                    <span className='Team' style={{ color: 'white' }} >Blog </span>
        </button>
          <div className='leftB'>
                <div className="bottomImage">
                        <div className="imgD">
                            <img src="https://s3-alpha-sig.figma.com/img/5088/d6d8/978fe3f781b518aed7a1334da88580fe?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nCMipDnSf7Ma44soI~2yBiBkZlK0S9L-Rv6Pyw6hXSJwa3rZ3tewwt9XoJ4j7GHxh6p9Iw5YitmodA9-r~tD6Enq8ibxyAGQcsgxvygdvi8KsRreBI~yMyNhERP3nzKq4Fn~TEpiv-5Ok5JzMRcjhKoAS1e9dgYSjlUz0nSS8KowDlr7DZZP2bNVlM1ZiRngjMO5M3HmbEuR0HxLE4UUyjjIX4tu9ORDMNqxwCzVrWJJeuHNGD1pG8HWbUzZ~Mv5-wfukr0Idw6tez7V1q16Drfk4MPgBbtT2Ye24pX5cpZQaLBnv9tGDn~Pjqv8dMsqHdoFmeDRe0f8QtcfEOU6uw__" alt="" />
                        </div>
                </div>
          </div>
          <br /><br />
        </div>
        <div className='rightDiv'>
          <div className="box">
            <p></p>
          </div>
        </div>

        <br />
        <br />
      </div>
    );
  }
  
  export default Directional;
  