import { mix } from "@/utils";

const dividerRegEx = /(-?\d+?)(?=(\d{3})+(?!\d)|$)/g;

const defaultOptions = {
  separator: " ",
  inputDecimalDelimiter: ".",
  outputDecimalDelimiter: ".",
};

export default function numberVerbose(number, options = {}) {
  const opts = mix(defaultOptions, options);
  const [integerValue, decimalPlaces] = number.toString().split(opts.inputDecimalDelimiter);
  try {
    return `${integerValue.match(dividerRegEx).join(opts.separator)}${
      decimalPlaces ? opts.outputDecimalDelimiter + decimalPlaces : ""
    }`;
  } catch (err) {
    return number.toString();
  }
}
