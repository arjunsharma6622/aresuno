import fs from "fs";
import axios from "axios";

// base backend api url.
const base_api_url = "https://aresuno-server.vercel.app/api";

const base_url = "https://www.aresuno.com";

// dont have to do anything fancy, we can just hardcode simple routes for now.
const simple_routes = ["blogs", "help"];

// we also hardcode cities.
const cities = ["noida", "bengaluru", "mumbai"];

// helper function to join urls
const join_url = (one, two) => {
  return one + "/" + two;
};

// fetch all categories.
const raw_categories = await axios.get(join_url(base_api_url, "category"));
const categories = raw_categories.data.map((category) => {
  return category.name.replaceAll(" ", "-");
});

// fetch all business.
const raw_businesses = await axios.get(join_url(base_api_url, "business"));
const businesses = raw_businesses.data.map((business) => {
  return business.name.replaceAll(" ", "-");
});

// returns <url> xml object with given params.
const get_url_xml = (loc, lastmod, changefreq, priority) => {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
};

// our final string
let out_string = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

let datetime = new Date();
let last_mod = datetime.toISOString().slice(0, 10);
const changefreq = "daily";
const priority = "1.0";

out_string += `\n<!-- simple routes -->\n`;
// first we add simple routes.
simple_routes.forEach((route) => {
  out_string += get_url_xml(
    join_url(base_url, route),
    last_mod,
    changefreq,
    priority,
  );
});

out_string += `\n<!-- cities / category -->\n`;
// then we loop through all cities
cities.forEach((city) => {
  categories.forEach((category) => {
    // and join them with each category
    const t = join_url(city, category);
    out_string += get_url_xml(
      join_url(base_url, t),
      last_mod,
      changefreq,
      priority,
    );
  });
});

out_string += `\n<!-- businesses -->\n`;
// finnaly we add all businesses
businesses.forEach((business) => {
  const t = join_url("business", business);
  out_string += get_url_xml(
    join_url(base_url, t),
    last_mod,
    changefreq,
    priority,
  );
});

out_string += `</urlset>
`;

// write file to disk.
fs.writeFileSync("./public/sitemap.xml", out_string);
