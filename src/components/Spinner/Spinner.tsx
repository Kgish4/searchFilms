import { FC } from "react";
import { Spin } from "antd";

import "./index.css";

const Spinner: FC = () => {
  return (
    <div className="spin-wrapper">
      <Spin />
    </div>
  );
};

export default Spinner;
