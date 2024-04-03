import { FiArrowRight, FiInbox } from "react-icons/fi";

const BusinessPosts = () => {
  return (
    <div id="posts" className="w-full border-b pb-4 md:pb-10 border-b-gray-300">
      <div className="flex items-center gap-3 md:gap-4">
        <FiInbox className="text-black w-5 h-5 md:w-6 md:h-6" />
        <h2 className="text-lg md:text-2xl font-bold text-black">Updates</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-8">
        {business.posts?.map((post, index) => (
          <div
            key={index}
            className="max-w-full gap-4 flex flex-col md:flex-row items-start"
          >
            <div className="md:flex-[3] w-full">
              <img
                loading="lazy"
                className="w-full md:h-full h-[180px] rounded-xl object-cover"
                alt="Image"
                src={
                  post.image
                    ? post.image
                    : "https://img.freepik.com/premium-vector/happy-diwali-festival-wishing-post-design-with-red-background-template_593190-96.jpg"
                }
              />
            </div>

            <div className="md:flex-[10] w-full">
              <p className="text-sm text-gray-600">{post.description}</p>
              <p className="mt-2 text-blue-600 w-full text-sm md:text-base">
                #autodetailing&nbsp;&nbsp;#detailing
              </p>
              <div className="flex mt-3 justify-between items-center">
                <div className=" text-gray-500 text-xs md:text-base">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center md:mt-2 text-green-600">
                  <span className="font-semibold text-sm md:text-base">
                    View more
                  </span>
                  <FiArrowRight
                    className="ml-1 w-4 h-4 md:w-5 md:h-5"
                    strokeWidth={2}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessPosts;
