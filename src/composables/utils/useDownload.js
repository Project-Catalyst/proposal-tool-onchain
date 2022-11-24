import saveToFile from "@/utils/saveToFile";

export default function useDownload() {
  function toFile(content, fileName, contentType) {
    saveToFile(content, fileName, contentType);
  }

  function toJson(content, fileName = "download.json") {
    const _content = typeof content !== "string" ? JSON.stringify(content, null, 2) : content;
    const _fileName = !fileName.endsWith(".json") ? `${fileName}.json` : fileName;
    toFile(_content, _fileName, "application/json");
  }

  return {
    toFile,
    toJson,
  };
}
