import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black px-5 py-16 md:py-10 lg:py-16 border-t-[1px]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {/* Company Info */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <div className="text-3xl font-semibold leading-10 mb-3">
            <Link to="/" aria-label="Aresuno Home">
              <img src="./assets/logo.png" alt="" className="w-24" />
            </Link>
          </div>
          <p className="text-base leading-6 mb-5">
            India&apos;s Fastest online service provider
          </p>
        </div>

        {/* Popular Links */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <div className="text-base font-bold leading-6 mb-3">
            Popular Links
          </div>
          <ul className="space-y-3">
            <li className="text-sm">Packers and Movers in New Delhi</li>
            <li className="text-sm">Web Designers in New Delhi</li>
            <li className="text-sm">Pest Control in New Delhi</li>
            <li className="text-sm">Interior Decorators in New Delhi</li>
            <li className="text-sm">Wedding Caterers in New Delhi</li>
          </ul>
        </div>

        {/* Corporate */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <div className="text-base font-bold leading-6 mb-3">Corporate</div>
          <ul className="space-y-3">
            <li className="text-sm">
              <Link to={"/about"}>About Us</Link>
            </li>
            <li className="text-sm">Contact Us</li>

            <li className="text-sm">
              <Link to={"/privacy"}>Privacy Policy</Link>
            </li>

            <li className="text-sm">
              <Link to={"/terms"}>Terms and Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <div className="text-xl font-semibold leading-8 mb-2">Newsletter</div>
          <p className="text-base leading-6 mb-6">
            Subscribe our Newsletter for the latest offers
          </p>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Email"
              className="text-sm leading-5 bg-gray-200 px-3 py-2 rounded-md w-full"
            />
            <button className="text-white text-sm font-bold leading-5 bg-blue-600 px-5 py-2 rounded-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <div className="text-xl font-semibold leading-8 mb-2">Follow Us</div>
          <div className="grid grid-cols-auto-32">
            <Link
              to={"https://in.linkedin.com/company/aresuno"}
              target="_blank"
              aria-label="aresuno linkedin link"
            >
              <img
                src="/assets/images/socials/linkedin.png"
                alt=""
                className="w-8 h-8"
              />
            </Link>
            <Link
              to={"https://www.instagram.com/aresuno.3/"}
              target="_blank"
              aria-label="aresuno instagram link"
            >
              <img
                src="/assets/images/socials/twitter.png"
                alt=""
                className="w-8 h-8"
              />
            </Link>
            <Link
              to={"https://www.facebook.com/people/Aresuno/100070231573790/"}
              target="_blank"
              aria-label="aresuno facebook link"
            >
              <img
                src="/assets/images/socials/instagram.png"
                alt=""
                className="w-8 h-8"
              />
            </Link>
            <Link
              to={"https://www.facebook.com/people/Aresuno/100070231573790/"}
              target="_blank"
              aria-label="aresuno facebook link"
            >
              <img
                src="/assets/images/socials/youtube.png"
                alt=""
                className="w-8 h-8"
              />
            </Link>
            <Link
              to={"https://www.facebook.com/people/Aresuno/100070231573790/"}
              target="_blank"
              aria-label="aresuno facebook link"
            >
              <img
                src="/assets/images/socials/facebook.png"
                alt=""
                className="w-8 h-8"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-16 text-center text-sm leading-5">
        Copyright © 2024 aresuno.com
      </div>
    </footer>
  );
};

export default Footer;
