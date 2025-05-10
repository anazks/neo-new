import React from 'react';
import ProductFooter from '../Footer/ProductFooter';
import ModernNavbar from '../NavBar/NavBar';
import Nv1 from '../../../Images/Nv1.png';
import Nv2 from '../../../Images/nv2.png';
import Nv3 from '../../../Images/nv3.png';

function Nvidia() {
  return (
    <div className="flex flex-col min-h-screen bg-[#292929]">
      <ModernNavbar />
      
      {/* Main content with images */}
      <div className="w-full max-w-full overflow-x-hidden">
        {/* First Image */}
        <div className="w-full max-w-full mb-4">
          <img
            src={Nv1}
            alt="NVIDIA Graphics Card"
            className="w-full h-auto"
            loading="eager"
          />
        </div>
        
        {/* Second Image */}
        <div className="w-full max-w-full mb-4">
          <img
            src={Nv2}
            alt="NVIDIA Technology"
            className="w-full h-auto"
            loading="eager"
          />
        </div>
        
        {/* Third Image */}
        <div className="w-full max-w-full mb-4">
          <img
            src={Nv3}
            alt="NVIDIA Performance"
            className="w-full h-auto"
            loading="eager"
          />
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-auto">
        <ProductFooter />
      </div>
    </div>
  );
}

export default Nvidia;