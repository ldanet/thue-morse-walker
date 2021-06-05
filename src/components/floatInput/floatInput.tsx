import { ChangeEvent, useCallback, useEffect, useState } from "react";

type Props = {
  id: string;
  onChange: (value: number) => void;
  value: number;
};

const FloatInput = ({ id, onChange, value: propsValue }: Props) => {
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
      id={id}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
    />
  );
};

export default FloatInput;
