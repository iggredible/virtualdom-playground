import createElement from "./vdom/createElement";
import render from "./vdom/render";

// this is our vdom!
const vApp = createElement("div", {
  attrs: {
    id: "someId",
    class: "someClass"
  },
  children: [
    createElement("img", {
      attrs: {
        src: "https://media.giphy.com/media/26gsf19j60Wh8GlcQ/giphy.gif"
      }
    })
  ]
});

const $app = render(vApp);
// next we need to render it
console.log("vApp: ", vApp);
console.log("$app: ", $app);
