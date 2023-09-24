import { Rate } from "antd";
import React, { FC, Fragment } from "react";

interface IRates {
  rating: Record<string, number>;
}

const Rates: FC<IRates> = ({ rating }) => {
  return Object.entries(rating).map((data) => {
    const key = data[0];
    const rate = data[1] / 2;
    return (
      <Fragment key={key}>
        <p>{key.toUpperCase()}:</p>
        <Rate disabled allowHalf defaultValue={rate} />
      </Fragment>
    );
  });
};

export default Rates;
