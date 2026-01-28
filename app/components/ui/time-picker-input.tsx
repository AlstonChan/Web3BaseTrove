import React, { useEffect, useMemo, useState } from "react";

import { Input } from "~/components/ui/input";
import {
  getArrowByType,
  getDateByType,
  setDateByType,
  type Period,
  type TimePickerType,
} from "~/lib/time-picker-utils";
import { cn } from "~/lib/utils";

export interface TimePickerInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The picker type, representing hours, minutes, or seconds.
   */
  picker: TimePickerType;
  /**
   * The current date value.
   */
  date: Date | undefined;
  /**
   * Callback function to set the date.
   */
  setDate: (date: Date | undefined) => void;
  /**
   * The time period (AM/PM) when using 12-hour format.
   */
  period?: Period;
  /**
   * Callback function to focus the next input field.
   */
  onRightFocus?: () => void;
  /**
   * Callback function to focus the previous input field.
   */
  onLeftFocus?: () => void;
}

/**
 * A customizable time picker input field
 *
 * @param props The props for the component.
 * @param props.ref The ref for the input element.
 * @returns The rendered time picker input field.
 */
export function TimePickerInput({
  className,
  type = "tel",
  value,
  id,
  name,
  date = new Date(new Date().setHours(0, 0, 0, 0)),
  setDate,
  onChange,
  onKeyDown,
  picker,
  period,
  onLeftFocus,
  onRightFocus,
  ref,
  ...props
}: TimePickerInputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const [flag, setFlag] = useState<boolean>(false);
  const [prevIntKey, setPrevIntKey] = useState<string>("0");

  /**
   * Allow the user to enter the second digit within 2 seconds,
   * otherwise reset to start entering the first digit again.
   */
  useEffect(() => {
    if (!flag) return;

    const timer = setTimeout(() => {
      setFlag(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [flag]);

  const calculatedValue = useMemo(() => {
    return getDateByType(date, picker);
  }, [date, picker]);

  const calculateNewValue = (key: string) => {
    /**
     * If picker is '12hours' and the first digit is 0, then the second digit is automatically set to 1.
     * The second entered digit will break the condition and the value will be set to 10-12.
     */
    if (picker === "12hours" && flag && calculatedValue.slice(1, 2) === "1" && prevIntKey === "0") {
      return `0${key}`;
    }
    return !flag ? `0${key}` : `${calculatedValue.slice(1, 2)}${key}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") return;
    e.preventDefault();

    if (e.key === "ArrowRight") onRightFocus?.();
    if (e.key === "ArrowLeft") onLeftFocus?.();

    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      const step = e.key === "ArrowUp" ? 1 : -1;
      const newValue = getArrowByType(calculatedValue, step, picker);
      if (flag) setFlag(false);
      const tempDate = new Date(date);
      setDate(setDateByType(tempDate, newValue, picker, period));
    }

    if (e.key >= "0" && e.key <= "9") {
      if (picker === "12hours") setPrevIntKey(e.key);

      const newValue = calculateNewValue(e.key);
      if (flag) onRightFocus?.();
      setFlag((prev) => !prev);
      const tempDate = new Date(date);
      setDate(setDateByType(tempDate, newValue, picker, period));
    }
  };

  return (
    <Input
      ref={ref}
      id={id || picker}
      name={name || picker}
      className={cn(
        `focus:bg-accent focus:text-accent-foreground w-12 text-center font-mono text-base tabular-nums
        caret-transparent [&::-webkit-inner-spin-button]:appearance-none`,
        className,
      )}
      value={value ?? calculatedValue}
      onChange={(e) => {
        e.preventDefault();
        onChange?.(e);
      }}
      type={type}
      inputMode="decimal"
      onKeyDown={(e) => {
        onKeyDown?.(e);
        handleKeyDown(e);
      }}
      {...props}
    />
  );
}
