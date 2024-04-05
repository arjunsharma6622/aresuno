import React, { useState } from 'react';
import { HiCheck, HiX } from 'react-icons/hi';
import { FaRupeeSign } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiAward } from 'react-icons/fi';



const PackageSection = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      name: 'Free',
      price: '0',
      desc : 'Our free plan',
      features: [false, false, false, false, false],
    },
    {
      name: 'Basic',
      price: '15k',
      desc : 'Our basic plan',
      features: [true, true, false, false, false],
    },
    {
      name: 'Advance',
      price: '30k',
      desc : 'Our most popular plan',
      features: [true, true, true, false, false],
    },
    {
      name: 'Ultimate',
      price: '50k',
      desc : 'Exclusive plan',
      features: [true, true, true, true, true],
    },
  ];

  const features = [
    'Total Listigs',
    '',
    'Feature 3',
    'Feature 4',
    '24/7 Support',
  ];

  const handlePackageClick = (packageName) => {
    setSelectedPackage(packageName);
  };

  const getFeatureIcon = (hasFeature) => {
    return hasFeature ? <HiCheck className="text-green-500" /> : <HiX className="text-red-500" />;
  };
  
  const getColor = (packageName) => {
    switch (packageName) {
      case 'free':
        return 'green-500';
      case 'basic':
        return 'blue-500';
      case 'advance':
        return 'purple-500';
      case 'Ultimate':
        return 'red-500';
      default:
        return 'blue-500';
    }
}

  return (
    <div className="bg-white mb-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Choose the Perfect Package for Your Business</h2>
        <p className="text-gray-600 mb-16">Our packages are designed to help you grow your business and achieve your goals.</p>
      </div>

      <div className="w-full">
        <table className="w-full border-collapse ">
          <thead className=''>
            <tr className="border-r border-red-600"  >
              <th className=" py-4 px-6"></th>
              {packages.map((pkg) => (
                <th key={pkg.name} className={`h-[120px] mx-10  relative py-4 px-6  ${pkg.name === "Advance" ? 'border-t border-r border-l border-purple-500' : ''} bg-${pkg.name.toLowerCase()}-200`}>
                    { pkg.name === "Advance" &&
                  <div className='bg-purple-500 text-white absolute z-[3] -top-2 rounded-full left-1/2 -translate-y-1/2 text-xs px-4 py-1 font-normal -translate-x-1/2'>
                    Popular Plan
                  </div>
}
                    <div className='absolute flex items-center gap-1 justify-center flex-col top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[2]'>
                        {/* <FiAward className={`w-5 h-5 text-${getColor(pkg.name.toLowerCase())}`}/> */}
                  <div className="w-full text-xs font-semibold uppercase">{pkg.name} plan</div>
                  {/* <div className="w-full text-xs font-medium">{pkg.desc}</div> */}
                  <div className={`text-3xl border-${getColor(pkg.name.toLowerCase())} flex items-center gap-0 justify-center font-semibold`}>
                    <FaIndianRupeeSign className='w-5 h-5'/>
                    <span>{pkg.price}/yr</span></div>
                  </div>
                  <div className={`gradient-${pkg.name.toLowerCase()}`}></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={feature} className={index % 2 === 0 ? ' border-b border-black border-dashed border-spacing-5 text-center' : 'bg-gray-50 text-center border-b border-dashed border-black'}>
                <td className="py-4 px-6 text-center">{feature}</td>
                {packages.map((pkg) => (
                  <td key={pkg.name} className={`py-4 px-6 text-center ${pkg.name === "Advance" ? 'border-r border-l border-purple-500' : ''} `}>
                    <div className='flex items-center text-2xl w-full justify-center'>
                    {getFeatureIcon(pkg.features[index])}
                    {/* <FiCode/> */}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {/* show the pricings  */}
            {/* <tr className="text-center">
              <td className="py-4 px-6"></td>
              {packages.map((pkg) => (
                <td key={pkg.name} className={`py-4 px-6 text-center ${pkg.name === "Advance" ? 'border-r border-l border-purple-500 border-b' : ''} `}>
                  <div className={`text-2xl border-${getColor(pkg.name.toLowerCase())} py-2 flex items-center gap-1 justify-center font-semibold`}>
                    <FaIndianRupeeSign className='w-5 h-5'/>
                    <span>{pkg.price}</span></div>
                </td>
              ))}
            </tr> */}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PackageSection;
