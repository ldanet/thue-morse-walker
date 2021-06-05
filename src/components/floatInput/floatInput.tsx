import { ChangeEvent, useCallback, useEffect, useState } from "react";

type Props = {
  onChange: (value: number) => void;
  value: number;
} & Omit<JSX.IntrinsicElements["input"], "onChange">;

const FloatInput = ({ onChange, value: propsValue, ...inputProps }: Props) => {
  const [value, setValue] = useState<string>(propsValue.toString(10));

  useEffect(() => {
    setValue(propsValue.toString(10));
  }, [propsValue]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    onChange(parseFloat(value));
  }, [onChange, value]);

  return (
    <input
      type="number"
      step="any"
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      {...inputProps}
    />
  );
};

export default FloatInput;
