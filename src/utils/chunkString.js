export default function chunkString(string) {
  if (string.length > 64) {
    const result = [];
    let rest = string;

    while (rest.length > 64) {
      result.push(rest.slice(0, 64));
      rest = rest.slice(64);
    }

    if (rest.length) {
      result.push(rest);
    }

    return result;
  } else {
    return string;
  }
}
