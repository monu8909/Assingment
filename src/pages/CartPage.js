import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import AddToCartPage from "../component/AddToCartPage";
import RazorpayPayment from "../component/RazorpayPayment";

import { Link } from "react-router-dom";
const CartPage = () => {
  const { getAddToCrt, _getcarlist } = useCart();

  useEffect(() => {
    getAddToCrt();
  }, []);

  let productPriceArray = _getcarlist?.map((data) => data?.price);
  let TotalPrice = productPriceArray?.reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="container">
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-md-9">
              <div className="ibox">
                <div className="ibox-title">
                  <span className="pull-right">
                    (<strong>{_getcarlist?.length}</strong>) items
                  </span>
                  <h5>Items in your cart</h5>
                </div>
                {_getcarlist &&
                  _getcarlist?.map((data) => {
                    return <AddToCartPage data={data} key={data?._id} />;
                  })}

                {/* <div className="ibox-content">
                  <button className="btn btn-white">
                    <i className="fa fa-arrow-left"></i> Continue shopping
                  </button>
                </div> */}
                <div className="m-t-sm ">
                  <div className="btn-group">
                    <Link to={"/"} className="button-92">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-basket2-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1" />
                      </svg>
                      Continue shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="ibox">
                <div className="ibox-title">
                  <h5>Cart Summary</h5>
                </div>
                <div className="ibox-content">
                  <span>Total</span>
                  <h2 className="font-bold">${TotalPrice}</h2>

                  <hr />
                  <span className="text-muted small">
                    *For United States, France and Germany applicable sales tax
                    will be applied
                  </span>
                  <div className="m-t-sm ">
                    <div className="btn-group">
                      <RazorpayPayment />
                    </div>
                  </div>
                </div>
              </div>

              <div className="ibox">
                <div className="ibox-title">
                  <h5>Support</h5>
                </div>
                <div className="ibox-content text-center">
                  <h3>
                    <i className="fa fa-phone"></i> +43 100 783 001
                  </h3>
                  <span className="small">
                    Please contact with us if you have any questions. We are
                    avalible 24h.
                  </span>
                </div>
              </div>

              <div className="ibox">
                <div className="ibox-content">
                  <p className="font-bold">
                    Other products you may be interested
                  </p>
                  <hr />
                  <div>
                    <div className="small m-t-xs">
                      Many desktop publishing packages and web page editors now.
                    </div>
                    <div className="m-t text-righ"></div>
                  </div>
                  <hr />
                  <div>
                    <div className="small m-t-xs">
                      Many desktop publishing packages and web page editors now.
                    </div>
                    <div className="m-t text-righ"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
