export const baseURL = process.env.REACT_APP_BACKEND_URL;
let apiURL = `${baseURL}`;
const Apiconfigs = {
  register: `${apiURL}/register-user`,
  login: `${apiURL}/login`,
  product: `${apiURL}/product`,
  category: `${apiURL}/product_category`,
  add_to_cart: `${apiURL}/add_to_cart`,
  get_profile: `${apiURL}/get_profile`,
  like: `${apiURL}/like`,
  dislike: `${apiURL}/dislike`,
  listProduct: `${apiURL}/product-list`,
  get_cart_list: `${apiURL}/get_cart_list`,
  create_order: `${apiURL}/create-order`,
};
export default Apiconfigs;
