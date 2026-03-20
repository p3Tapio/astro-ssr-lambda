import { useState } from "react";
import "./Counter.scss";
import Button from "../Button/Button";

const Counter = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="counter">
      <Button label="+" onClick={() => setValue((value) => value + 1)} />
      <Button label="-" onClick={() => setValue((value) => value - 1)} />
      <span className="counter__value">{value}</span>
    </div>
  );
};

export default Counter;
