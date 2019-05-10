// like React.createElement
// tagname is like DOM elements, 'div', or 'h1', or 'span'
// attrs is the attribute thingy inside an element
// like <div id="hello"> -> tagName div, id 'hello'
// children could be text node, or more element inside
export default (tagName, { attrs, children }) => {
  return {
    tagName,
    attrs: attrs,
    children: children
  };
};
