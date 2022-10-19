import React from "react";
import { useState } from "react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <NavLink
            to="/"
            className={(isActive) =>
              "nav-link" + (!isActive ? " unselected" : "")
            }
          >
            <Navbar.Brand>Nitin Shop</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex ms-auto">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 rounded"
                aria-label="Search"
                style={{ width: "400px" }}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                style={{
                  backgroundColor: "#faaf00",
                  color: "#fff",
                  borderRadius: "0.25rem",
                }}
                onClick={searchHandler}
              >
                Search
              </Button>
            </Form>
            <Nav className="ms-auto">
              <NavLink
                to="/cart"
                className={(isActive) =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                <i className="fas fa-shopping-cart px-2"></i>Cart
              </NavLink>
              <NavLink
                to="/login"
                className={(isActive) =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                <i className="fas fa-user px-2"></i>Sign In
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
