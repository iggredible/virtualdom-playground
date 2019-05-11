import render from "./vdom/render";
import createElement from "./vdom/createElement";
import mount from "./vdom/mount";

const vNode = createElement("div", {
  attrs: {
    className: "someClass",
    id: "someId"
  },
  children: [
    createElement("img", {
      attrs: {
        src: "https://media.giphy.com/media/26gsf19j60Wh8GlcQ/giphy.gif"
      }
    })
  ]
});

const $app = render(vNode); // entire app structure is here - ready as newelement

const $target = document.getElementById("app");
mount($app, $target);

console.log("$app: ", $app);
