import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
//Import extension from tip tap
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-Italic";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

// // import { extensions } from "../constants/tiptapExtension.js";

const parseJsonToHtml = (json) => {
  return parse(generateHTML(json));
};

export default parseJsonToHtml;


 