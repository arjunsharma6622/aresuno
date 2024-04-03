const BusinessIframe = ({ businessDetails, setBusinessDetails }) => {
  // const handleIframeChange = (e) => {
  //   const { value } = e.target;
  //   function extractSrcLink(iframeTag) {
  //     const srcRegex = /src="(.*?)"/;
  //     const match = iframeTag.match(srcRegex);
  //     if (match) {
  //       return match[1];
  //     } else {
  //       return null;
  //     }
  //   }
  //   const extractedLink = extractSrcLink(value);
  //   setBusinessDetails((prev) => ({
  //     ...prev,
  //     iframe: {
  //       embedLink: value,
  //       extractedLink: extractedLink,
  //     },
  //   }));
  // };

  return (
    <div className="md:mt-6 md:mb-6">
      {/* <div className="flex items-center gap-2">
      <FiCode className="w-5 h-5 md:w-6 md:h-6" />
        <div className="flex items-center gap-4">
        <h2 className="text-lg md:text-xl font-semibold">Enter iFrame HTML link 
        </h2>
        <span className="text-gray-500 text-sm">* All fields are required</span>
        </div>
    </div> */}

      <div className="mt-6">
        {/* <textarea
        className="w-full h-24 md:h-48 text-sm md:text-base p-4 rounded-md border border-gray-300 focus:outline-none"
        placeholder="Enter google maps iframe HTML link"
        name="iframe"
        onChange={handleIframeChange}
        value={businessDetails.iframe.embedLink}
      /> */}

        <h1>Ignore this and click NEXT</h1>
      </div>
    </div>
  );
};

export default BusinessIframe;
