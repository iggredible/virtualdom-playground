const render = vNode => {
  const newElement = document.createElement(vNode.tagName);

  for (const [k, v] of Object.entries(vNode.attrs)) {
    newElement.setAttribute(k, v);
  }
  // setting up children
  for (const child of vNode.children) {
    const childElement = render(child);
    newElement.appendChild(childElement);
  }

  return newElement;
};

export default render;
