import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Container,
} from "react-bootstrap";
import Rating from "../components/Rating";

import { useDispatch, useSelector } from "react-redux";
import { listProductsDetails } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import PageNotFound from "../components/PageNotFound";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { Redirect } from "Redirect";

const ProductScreen = () => {
  const productListDetails = useSelector((state) => state.productDetail);
  const { loading, error, product } = productListDetails;

  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listProductsDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`); 
  }

  return (
    <>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <PageNotFound error={error} />
        ) : (
          <main className="py-5">
            <Link className="btn btn-light my-3" to="/">
              Go Back
            </Link>
            <Row>
              <Col sm={12} md={12} lg={4} xl={5} className="pb-2">
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col sm={12} md={12} lg={5} xl={4} className="pb-2">
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h3>{product.name}</h3>
                    <p style={{fontSize:'14px'}}>Product #{product._id}</p>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroupItem>
                  <ListGroupItem>Price: ${product.price}</ListGroupItem>
                  <ListGroupItem>
                    Description: ${product.description}
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col sm={12} md={12} lg={3} xl={3} className="pb-2">
                <Card>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </Col>
                      </Row>
                    </ListGroupItem>

                    {product.countInStock > 0 && (
                      <ListGroupItem>
                        <Row>
                          <Col>Qty:</Col>
                          <Col>
                            <Form.Select
                              aria-label="Default select example"
                              size="sm"
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )}

                    <ListGroupItem>
                      <Button
                        className="btn btn-primary w-100"
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </main>
        )}
      </Container>
    </>
  );
};

export default ProductScreen;
