import React from "react";
const AddToCartPage = (props) => {
  const { data } = props;
  const [quantity, setQuantity] = React.useState(data?.quantity);

  return (
    <div className="ibox-content">
      <div className="table-responsive">
        <table className="table shoping-cart-table">
          <tbody>
            <tr>
              <td width="90">
                <div className="cart-product-imitation"></div>
              </td>
              <td className="desc">
                <h3>{data?.title}</h3>
                <p className="small">{data?.description}</p>

                <div className="m-t-sm">
                  <i className="fa fa-gift"></i> Add gift package
                  <i className="fa fa-trash"></i> Remove item
                </div>
              </td>

              <td>
                $ {data?.price} &nbsp;&nbsp;
                <s className="small text-muted">${data?.price + 92}</s>
              </td>
              <td width="80">
                <input
                  type="number"
                  className="form-control hover-active"
                  placeholder={data?.quantity}
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value));
                    setQuantity(value);
                  }}
                />
              </td>
              <td>
                <h4> $ {data?.price * quantity}</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddToCartPage;
