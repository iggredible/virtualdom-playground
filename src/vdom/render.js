// anonymous func
const render = vNode => {
  const $el = document.createElement(vNode.tagName); // recall tagName is 'div'. $el will create div element

  for (const [k, v] of Object.entries(vNode.attrs)) {
    // object.entries return an array of array pair of key-values - hence k, v array
    $el.setAttribute(k, v); //sets attribute; here we have attrs: {id: 'someId', class: 'someClass'} - so it is rightfully we can set attribute for the newly created div element!
  }

  for (const child of vNode.children) {
    const $child = render(child); // recursion
    $el.appendChild($child); // attaches/ appends the child into parent!
  }

  return $el;
};

export default render;
