const Review = ({ businessDetails }) => {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">Business Details</h2>

      {/* Basic Information */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
        <p>
          <span className="font-semibold">Name:</span> {businessDetails.name}
        </p>
        <p>
          <span className="font-semibold">Type:</span> {businessDetails.type}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {businessDetails.phone}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {businessDetails.email}
        </p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p>{businessDetails.description}</p>
      </div>

      {/* Address */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Address</h3>
        <p>{businessDetails.address.street}</p>
      </div>

      {/* Timings */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Timings</h3>
        <ul>
          {businessDetails.timing.map((time, index) => (
            <li key={index}>
              {time.day}: {time.isOpen ? `${time.from} - ${time.to}` : "Closed"}
            </li>
          ))}
        </ul>
      </div>

      {/* Social Links */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Social Links</h3>
        <ul>
          {Object.entries(businessDetails.socialLinks).map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold capitalize">{key}:</span> {value}
            </li>
          ))}
        </ul>
      </div>

      {/* Mode of Payment */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Mode of Payment</h3>
        <ul>
          {businessDetails.modeOfPayment.map(({ name, icon }, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Services</h3>
        <ul>
          {businessDetails.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      {/* Photos Gallery */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Photos Gallery</h3>
        <div>
          <span>Business Logo</span>
          <img
            src={businessDetails.images.logo}
            alt=""
            className="w-24 h-24 object-cover rounded-full"
          />
        </div>

        <div>
          <span>Business Cover Image</span>
          <img
            src={businessDetails.images.cover}
            alt=""
            className="w-64 object-cover rounded"
          />
        </div>

        <div>
          <span>Business Gallery</span>
          <div className="grid grid-cols-3 gap-4">
            {businessDetails.images.gallery.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover rounded"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
