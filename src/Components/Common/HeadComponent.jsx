import { Helmet } from "react-helmet-async";
import keyword_extractor from "keyword-extractor";

const HeadComponent = ({ _title, _description, _image }) => {
  const title = _title ? _title + " | Aresuno" : "Aresuno";
  const description = _description
    ? _description
    : "Find your next service at most affordable prices.";
  const image = _image
    ? _image
    : "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705314004/aresuno/banner/background-template-with-mandala-pattern-design_1308-44444_ngkych.avif";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="keywords"
        content={keyword_extractor.extract(description, {
          language: "english",
          remove_digits: true,
          return_changed_case: true,
          remove_duplicates: true,
        })}
      />

      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Aresuno" />
    </Helmet>
  );
};

export default HeadComponent;
