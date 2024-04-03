import { FiHelpCircle } from "react-icons/fi";
import Accordion from "./Accordion";

const BusinessFaqs = ({ business }) => {
  const allFAQsSchema = business.faqs?.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: `<p>${faq.answer}</p>`,
    },
  }));

  return (
    <div id="faq" className="w-full mb-10">
      <div className="flex items-center gap-3 md:gap-4">
        <FiHelpCircle className="text-black w-5 h-5 md:w-6 md:h-6" />
        <h2 className="text-lg md:text-2xl font-bold text-black">FAQ&apos;s</h2>
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: allFAQsSchema,
            }),
          }}
        />

        {business.faqs?.map((faq, index) => (
          <Accordion
            question={`${faq.question}`}
            content={faq.answer}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessFaqs;
