import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const PackageHead = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate(`/signup?phoneNo=${data.number}`);
  };

  const infoToCustomer = [
    {
      name: "Create an Account",
      icon: "signup.png",
    },
    {
      name: "List Your Business",
      icon: "business.png",
    },
    {
      name: "Get Instant Leads",
      icon: "leads.png",
    },
    {
      name: "Grow Your Business",
      icon: "grow.png",
    },
  ];

  return (
    <>
      {/* salmon bg part */}
      <div className="flex w-full max-w-[90vw] rounded-xl p-0 items-end gap-10 mx-auto bg-white lg:p-14 lg:bg-primary-salmon-500">
        <div className="flex-[7] flex flex-col gap-8 justify-start lg:gap-16">
          {/* text */}
          <h1 className="leading-relaxed flex flex-col lg:gap-2 mt-3 lg:mt-0">
            <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-light-blue-500 to-primary-light-blue-700 bg-clip-text text-transparent">
              Transform Your Business
            </p>{" "}
            <p className="text-sm lg:text-2xl lg:tracking-wider pl-1 lg:pl-0">
              with India&apos;s Leading Online Marketplace
            </p>
          </h1>

          <div>
            <form
              className="w-full flex items-center rounded-lg h-14 focus:border focus:border-primary-light-blue-500"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                placeholder="Enter your Number"
                className="px-2 rounded-l-lg rounded-y-lg py-2 focus:outline-none h-full w-full border border-neutral-300"
                {...register("number", {
                  required: true,
                  pattern:
                    /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm,
                })}
              />
              <input
                value={"Create listing"}
                className="w-min h-full p-2 text-sm cursor-pointer bg-primary-light-blue-500 text-white rounded-tr-[5px] rounded-br-[5px] flex items-center gap-2 lg:px-4"
                type="submit"
              />
            </form>

            {/* input errors */}
            {errors.number && (
              <span className="text-red-600 ml-1 text-xs">
                Invalid phone number
              </span>
            )}
          </div>
        </div>

        {/* truck svg */}
        <div className="flex-[6] hidden w-0 px-auto lg:flex items-center justify-end">
          <img
            src={`./assets/truck_delivery.svg`}
            alt=""
            className="max-h-[12rem]"
          />
        </div>
      </div>

      {/* icons part */}
      <div className="grid grid-cols-2 gap-4 mt-12 lg:flex lg:items-center lg:justify-center lg:gap-12">
        {" "}
        {infoToCustomer.map((info) => (
          <div
            key={info.name}
            className="w-full lg:max-w-[12rem] flex flex-col items-center text-center"
          >
            <div className="bg-primary-salmon-500 p-2 rounded-full max-w-[4rem] max-h-[4rem] aspect-square flex items-center justify-center">
              <img
                src={`./assets/images/${info.icon}`}
                alt=""
                className="max-w-[2rem]"
              />
            </div>
            <div>
              <p className="py-3 text-sm">{info.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PackageHead;
