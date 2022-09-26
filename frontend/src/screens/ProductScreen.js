import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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

const ProductScreen = ({ match }) => {
  const productListDetails = useSelector((state) => state.productDetail);
  const { loading, error, product } = productListDetails;

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(listProductsDetails(id));
  }, [dispatch, id]);

  console.log(product);

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
                    <ListGroupItem>
                      <Button
                        className="btn btn-primary w-100"
                        type="button"
                        disabled={product.countInStock === 0}
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
