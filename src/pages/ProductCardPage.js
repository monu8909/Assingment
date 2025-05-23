import React, { useState } from "react";
import ProductCard from "../component/ProductCard";
import { Link } from "react-router-dom";
import { Row, Card, Col } from "react-bootstrap";
import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
const ProductCardPage = () => {
  const { likedIds, cardData, _category } = useCart();
  // const { isAuthenticated } = useAuth();
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     Product_LikeList();
  //   }
  // }, [isAuthenticated]);
  const [_categoryId, setCategoryId] = useState("");
  const FilterProduct = (category_id) => {
    setCategoryId(category_id);
  };
  return (
    <div text-align="center" className="container">
      <div className="go-to-card">
        <h2>Products category</h2>
        <div style={{ margin: "20px" }}>
          <Link className="add-to-cart" to={"/cart"}>
            Go to cart
          </Link>
        </div>
      </div>

      <div className="category-section">
        {_category
          .filter((category_) => category_?.image.includes(".jpeg"))
          .map((category_) => (
            <div key={category_._id}>
              <button
                onClick={() => {
                  FilterProduct(category_);
                }}
              >
                <h6>{category_?.name}</h6>
                <div className="image-div-category">
                  <img src={category_?.image} alt={category_?.name} />
                </div>
              </button>
            </div>
          ))}
      </div>
      {_categoryId !== "" && (
        <div className="category-name">
          <h5>{_categoryId.name} product</h5>
        </div>
      )}
      <div className="product-card-section">
        {_categoryId !== "" ? (
          <Row>
            {cardData
              ?.filter((product) => product?.category?.id === _categoryId?.id)
              ?.map((product) => {
                const isLiked = likedIds.includes(product._id); // <- key line
                return (
                  <Col
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className="grid-class"
                    key={product._id}
                  >
                    <Card>
                      <ProductCard
                        key={product.id}
                        product={product}
                        isLiked={isLiked}
                      />
                    </Card>
                  </Col>
                );
              })}
          </Row>
        ) : (
          <Row>
            {cardData &&
              cardData?.map((product) => {
                const isLiked = likedIds.includes(product._id); // <- key line
                return (
                  <Col
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className="grid-class"
                    key={product._id}
                  >
                    <Card>
                      <ProductCard
                        key={product.id}
                        product={product}
                        isLiked={isLiked}
                      />
                    </Card>
                  </Col>
                );
              })}
          </Row>
        )}
      </div>
    </div>
  );
};
export default ProductCardPage;
