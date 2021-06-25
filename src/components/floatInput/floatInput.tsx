import { ChangeEvent, FocusEvent, useCallback, useRef } from "react";

type Props = {
  onChange: (value: number) => void;
  value: number;
} & Omit<JSX.IntrinsicElements["input"], "onChange">;

const FloatInput = ({ onChange, value: propsValue, ...inputProps }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.valueAsNumber;
      if (!isNaN(value)) onChange(value);
      console.log(value);
    },
    [onChange]
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      e.target.value = propsValue.toString();
    },
    [propsValue]
  );

  return (
    <input
      ref={inputRef}
      type="number"
      step="any"
      onChange={handleChange}
      onBlur={handleBlur}
      defaultValue={propsValue}
      {...inputProps}
    />
  );
};

export default FloatInput;
