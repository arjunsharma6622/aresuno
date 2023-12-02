import React from 'react'
import { FiCode } from 'react-icons/fi'

const BusinessIframe = ({ businessDetails, setBusinessDetails }) => {

  const handleIframeChange = (e) => {
    const { value } = e.target;
    function extractSrcLink(iframeTag) {
      const srcRegex = /src="(.*?)"/;
      const match = iframeTag.match(srcRegex);
      if (match) {
        return match[1];
      } else {
        return null;
      }
    }
    const extractedLink = extractSrcLink(value);
    setBusinessDetails((prev) => ({
      ...prev,
      iframe: {
        embedLink: value,
        extractedLink: extractedLink,
      },
    }));
  };

  return (
    <div className="mt-6 mb-6">
    <div className="flex items-center gap-2">
      <FiCode className="w-6 h-6" />
      <h2 className="text-xl font-semibold">
        Enter google maps iframe HTML link
      </h2>
    </div>

    <div className="mt-6">
      <textarea
        className="w-full h-48 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter google maps iframe HTML link"
        name="iframe"
        onChange={handleIframeChange}
      />
    </div>
  </div>  
  
  )
}

export default BusinessIframe