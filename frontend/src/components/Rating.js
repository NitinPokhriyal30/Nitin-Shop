import React from "react";
import PropTypes from "prop-types";
import Rating1 from "@mui/material/Rating";
// import Stack from "@mui/material/Stack";

const Rating = ({ value, text, color }) => {
  return (
    <>
      {/* <div className="rating">
        <span>
          <i
            style={{ color }}
            className={
              value >= 1
                ? "fas fa-star"
                : value >= 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 2
                ? "fas fa-star"
                : value >= 1.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 3
                ? "fas fa-star"
                : value >= 2.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 4
                ? "fas fa-star"
                : value >= 3.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 5
                ? "fas fa-star"
                : value >= 4.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span className="mx-2">{text && text}</span>
      </div> */}

      <span>
        <Rating1
          name="half-rating-read"
          defaultValue={value}
          precision={0.5}
          readOnly
        />
      </span>
      <span className="mx-2" style={{verticalAlign : 'top'}}>{text && text}</span>
    </>
  );
};

Rating.defaultProps = {
  color: "#FF9529",
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
