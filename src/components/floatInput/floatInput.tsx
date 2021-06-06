import { ChangeEvent, useCallback } from "react";

type Props = {
  onChange: (value: number) => void;
  value: number;
} & Omit<JSX.IntrinsicElements["input"], "onChange">;

const FloatInput = ({ onChange, value: propsValue, ...inputProps }: Props) => {
  const value = propsValue.toString(10);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(parseFloat(e.target.value));
    },
    [onChange]
  );

  return (
    <input
      type="number"
      step="any"
      onChange={handleChange}
      value={value}
      {...inputProps}
    />
  );
};

export default FloatInput;
