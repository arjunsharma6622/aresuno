import { FiLinkedin } from "react-icons/fi";

const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8">
          About Aresuno Info India Pvt. Ltd.
        </h2>

        <p className="text-lg leading-relaxed mb-6">
          Aresuno Info India Pvt. Ltd. is a leading online service provider
          based out of Delhi. Established in 2018, we specialize in offering a
          comprehensive range of local services to cater to diverse needs. Our
          expert team ensures seamless solutions in areas such as relocation,
          packers and movers, AC repair, home appliance repair, and much more.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Committed to excellence, we prioritize timely delivery and
          cost-effective options to meet your service requirements effectively.
          With a robust administrative team managing over 500 services, Aresuno
          stands as your single solution to all queries.
        </p>

        <div className="flex flex-wrap -mx-4 mb-8">
          <div className="w-full md:w-1/2 px-4">
            <h3 className="text-xl font-semibold mb-4">Founders</h3>
            <ul className=" list-none">
              <li className="flex gap-6 items-center">
                <span>Rahul Verma</span>{" "}
                <FiLinkedin className="text-blue-500 w-5 h-5" />
              </li>
              <li className="flex gap-6 items-center">
                <span>Rinki Verma</span>{" "}
                <FiLinkedin className="text-blue-500 w-5 h-5" />
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6">
          <p className="text-lg leading-relaxed mb-6">
            Reach out to us for all types of services ranging from home
            services, health and wellness, training and education, wedding
            services, and much more. Experience our commitment to excellence
            with a 100% service guarantee.
          </p>

          {/* <div className="text-xl">
            <a href="https://www.aresuno.com" className="text-blue-500 hover:underline">Visit our Website</a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
