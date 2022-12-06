// import sjcl from "sjcl";
import jsSHA from "jssha";

export default function sha256(data) {
  const sha256 = new jsSHA("SHA-256", "TEXT");
  sha256.update(data);
  const hash = sha256.getHash("HEX");
  // const bitArray = sjcl.hash.sha256.hash(data);
  // const hash = sjcl.codec.hex.fromBits(bitArray);
  return hash;
}
