import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import PageNotFound from "../components/PageNotFound";



const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  
  return (
    <>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <PageNotFound error={error} />
        ) : (
          <main className="py-5">
            <h3>Latest Products</h3>
            <Row>
              {products.map((product) => (
                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="d-flex justify-content-center"
                  key={product._id}
                >
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </main>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
