import React from "react";
import { RadioSelectStyled } from "./RadioSelect.styled";

type Props = {
  options: string[],
  value: string | undefined,
  onChange: (value: string) => void
}
const RadioSelect: React.FC<Props> = ({ options, value, onChange }) => {
  return (
    <RadioSelectStyled>
      {options.map(option => (<div className="radio">
        <label className="radio-label">
          <input
            className="radio-element"
            checked={option === value}
            type="radio"
            value={option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      </div>))}
    </RadioSelectStyled>
  );
};

export default RadioSelect;
