export default function htmlToText(html) {
  return new DOMParser().parseFromString(html, "text/html").documentElement.textContent;
}
