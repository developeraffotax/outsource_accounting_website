import axios from "axios";
import qs from "qs";

const BaseURL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api`;
// @param {String } endpoint
// @param {Object} queryObj

export default async function fetchData(endpoint, queryObj) {
  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  });

  const urlQuery = `${BaseURL}/${endpoint}?${query}`;

  try {
    const res = await axios.get(urlQuery);
    if (res.status !== 200)
      throw new Error(`Failed to fetch data from ${endpoint}`);
    return res.data;
  } catch (error) {
    console.log(`error fetching data ${endpoint}`, error);
    throw new Error(`Error fetching data from ${endpoint}: ${error.message}`);
  }
}
