import { useState } from "react";
import { BiQuestionMark } from "react-icons/bi";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const BusinessFaqs = ({ businessDetails, setBusinessDetails }) => {
  const [businessFaqUpdate, setBusinessFaqUpdate] = useState(true);

  // handle faqs
  const handleFaqChange = (index, type, value) => {
    const updatedFaqs = [...businessDetails.faqs];
    updatedFaqs[index][type] = value;
    setBusinessDetails({ ...businessDetails, faqs: updatedFaqs });
  };

  const handleAddFaq = () => {
    const newFaqs = [...businessDetails.faqs, { question: "", answer: "" }];
    setBusinessDetails({ ...businessDetails, faqs: newFaqs });
  };

  const handleRemoveFaq = (index) => {
    const updatedFaqs = businessDetails.faqs.filter((_, i) => i !== index);
    setBusinessDetails({ ...businessDetails, faqs: updatedFaqs });
  };

  return (
    <div className="mt-6 mb-6">
      <div className="flex justify-start gap-8 items-center">
        <div className="flex items-center gap-2">
          <BiQuestionMark className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Add FAQ&apos;s</h2>
        </div>
        {businessFaqUpdate ? (
          <FiEdit2
            className="cursor-pointer w-5 h-5"
            onClick={() => setBusinessFaqUpdate(false)}
          />
        ) : (
          <FiX
            className="cursor-pointer w-5 h-5 text-red-500"
            onClick={() => setBusinessFaqUpdate(true)}
          />
        )}
      </div>
      <div className="grid grid-cols-1 gap-8 mt-6">
        {businessDetails.faqs.map((faq, index) => (
          <div key={index}>
            <div>
              <div className=" flex justify-start gap-4 items-center mb-2">
                <span className="font-medium text-lg">Faq {index + 1}</span>
                {!businessFaqUpdate && (
                  <FiTrash2
                    className="w-5 h-5 text-red-500 cursor-pointer"
                    onClick={() => handleRemoveFaq(index)}
                  />
                )}
              </div>
              <label className="block text-gray-700">Question</label>
              <div className="mt-2">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) =>
                    handleFaqChange(index, "question", e.target.value)
                  }
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={businessFaqUpdate}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mt-2">Answer</label>
              <div className="mt-2">
                <textarea
                  value={faq.answer}
                  onChange={(e) =>
                    handleFaqChange(index, "answer", e.target.value)
                  }
                  rows={4}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={businessFaqUpdate}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={handleAddFaq}
          className=" py-2 px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
          disabled={businessFaqUpdate}
        >
          Add FAQ
        </button>
      </div>
    </div>
  );
};

export default BusinessFaqs;
