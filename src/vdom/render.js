const renderElem = ({ tagName, attrs, children }) => {
  const newElement = document.createElement(tagName);
  // console.log("tagName:", tagName);
  // console.log("attrs:", attrs);
  // console.log("children:", children);
  for (const [k, v] of Object.entries(attrs)) {
    newElement.setAttribute(k, v);
  }
  for (const child of children) {
    const childElement = render(child);
    newElement.appendChild(childElement);
  }

  return newElement;
};

const render = vNode => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  return renderElem(vNode);
};

export default render;
