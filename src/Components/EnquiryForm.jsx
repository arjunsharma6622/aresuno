import { useEffect, useState } from "react";
import { FiCheckCircle, FiMessageSquare, FiX } from "react-icons/fi";
import { API_URL, ToastParams } from "../utils/util";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const EnquiryForm = ({
  onClose,
  business,
  categoryId,
  showCloseIcon = true,
}) => {
  const [enquiry, setEnquiry] = useState({
    name: "",
    phone: "",
    message: "",
    category: categoryId,
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    setIsSending(true);

    try {
      const enquiryToSend = {
        ...enquiry,
      };
      if (business) {
        enquiryToSend.business = business._id;
      }
      await axios.post(`${API_URL}/api/enquiry/create`, enquiryToSend);
      setIsSending(false);
      setIsSent(true);
      toast.success("Enquiry Sent", ToastParams);
    } catch (err) {
      setIsSending(false);
      console.error(err);
    }
  };

  const handleFormChange = (e) => {
    setEnquiry({
      ...enquiry,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="z-[40]  inset-0 h-[100%] overflow-y-hidden flex overflow-hidden items-center justify-center bg-gray-500 fixed bg-opacity-50 backdrop-filter backdrop-blur-sm top-0 right-0 bottom-0 left-0">
        {!isSent ? (
          <div className="flex flex-col md:flex-row relative w-[90%] md:w-[70%] bg-white  gap-6  rounded-xl">
            <div className="flex-[7] p-8 md:px-12 flex flex-col gap-4 md:gap-6 ">
              <div>
                <h1 className="text-xl md:text-2xl font-semibold">
                  <FiMessageSquare className="inline w-6 h-6 md:w-8 md:h-8 mr-2" />{" "}
                  Enquiry
                </h1>
                <p className="text-gray-600 text-sm md:text-base mt-2">
                  Fill out the form below to get in touch with us for more
                  details.
                </p>
              </div>

              <form
                onSubmit={handleEnquirySubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={enquiry.name}
                    className="rounded-md border text-base border-gray-300 w-full py-2 px-3 md:py-3 md:px-4 text-gray-600 focus:outline-none focus:border-blue-500"
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={enquiry.phone}
                    className="rounded-md border text-base border-gray-300 w-full py-2 px-3 md:py-3 md:px-4 text-gray-600 focus:outline-none focus:border-blue-500"
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="message">
                    Message <span className="text-sm">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="message"
                    name="message"
                    value={enquiry.message}
                    className="rounded-md border text-base border-gray-300 w-full py-2 px-3 md:py-3 md:px-4 text-gray-600 focus:outline-none focus:border-blue-500"
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {isSending ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            </div>

            <div className=" flex-[5] bg-blue-100 rounded-xl pl-4 hidden md:flex">
              <img
                src="/assets/form.png"
                alt=""
                className="rounded-xl object-cover"
              />
            </div>

            {showCloseIcon && (
              <div className="absolute top-4 right-4">
                <FiX className="w-5 h-5 cursor-pointer" onClick={onClose} />
              </div>
            )}
          </div>
        ) : (
          <div className="w-[90%] md:w-[40%] bg-white  flex gap-6  rounded-xl">
            <div className="flex-[7] p-8 md:px-12 flex flex-col gap-6 ">
              <div>
                <div className="flex justify-between">
                  <h1 className="text-2xl font-semibold">
                    <FiCheckCircle className="text-green-500 inline w-8 h-8 mr-2" />{" "}
                    Submitted
                  </h1>
                  <FiX
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => {
                      onClose();

                      setIsSent(false);
                    }}
                  />
                </div>
                <p className="text-gray-600 text-sm md:text-base mt-2">
                  We have received your enquiry, we will get back to you shortly
                </p>
                <p className="text-gray-600 text-sm md:text-base mt-2">
                  Thank you!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default EnquiryForm;
