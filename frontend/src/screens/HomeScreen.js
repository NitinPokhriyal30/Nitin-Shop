import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Product from "../components/Product";
import Pagination from "react-js-pagination";
import "../slider.less";
// import { RangeSlider, InputGroup, InputNumber } from "rsuite";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import PageNotFound from "../components/PageNotFound";

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, productsCount, resPerPage } = productList;

  const [currentPage, setCurrentPage] = useState(1);

  const [value, setValue] = React.useState([10, 1000]);

  // const marks = [
  //   {
  //     value: 0,
  //     label: "$1",
  //   },
  //   {
  //     value: 1000,
  //     label: "$1000",
  //   },
  // ];

  // console.log(value);

  const handleChange1 = (e) => {
    setValue(e.target.value);
  };

  const dispatch = useDispatch();

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { keyword } = useParams();

  useEffect(() => {
    dispatch(listProducts(keyword, currentPage, value));
  }, [dispatch, keyword, currentPage, value]);

  return (
    <>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <PageNotFound error={error} />
        ) : (
          <main className="py-5">
            {!keyword ? (
              <>
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
                <div className="d-flex justify-content-center mt-5">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={productsCount || 0}
                    onChange={setCurrentPageNo}
                    nextPageText={<i className="fa-solid fa-chevron-right"></i>}
                    prevPageText={<i className="fa-solid fa-chevron-left"></i>}
                    firstPageText={<i className="fa-solid fa-angles-left"></i>}
                    lastPageText={<i className="fa-solid fa-angles-right"></i>}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              </>
                ) : (
                  <>
                      <hr />
                <Row>
                  <Col sm={12} md={6} lg={3} xl={3}>
                    <Box>
                      <Slider
                        // getAriaLabel={() => "Minimum distance"}
                        value={value}
                        step={10}
                        // marks={marks}
                        onChange={handleChange1}
                        valueLabelDisplay="on"
                        // getAriaValueText={valuetext}
                        disableSwap
                      />
                    </Box>
                    {/* <Row>
                      <Col>
                        <RangeSlider
                          progress
                          style={{ marginTop: 16 }}
                          value={value}
                          min={1}
                          max={1000}
                          onChange={(value) => {
                            setValue(value);
                          }}
                        />
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col>
                        <InputGroup>
                          <InputNumber
                            min={1}
                            max={1000}
                            value={value[0]}
                            onChange={(nextValue) => {
                              const [start, end] = value;
                              if (nextValue > end) {
                                return;
                              }
                              setValue([nextValue, end]);
                            }}
                          />
                          <InputGroup.Addon>to</InputGroup.Addon>
                          <InputNumber
                            min={1}
                            max={1000}
                            value={value[1]}
                            onChange={(nextValue) => {
                              const [start, end] = value;
                              if (start > nextValue) {
                                return;
                              }
                              setValue([start, nextValue]);
                            }}
                          />
                        </InputGroup>
                      </Col>
                    </Row> */}
                  </Col>
                  <Col>
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
                  </Col>
                </Row>
              </>
            )}
          </main>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
