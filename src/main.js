import render from "./vdom/render";
import createElement from "./vdom/createElement";
import mount from "./vdom/mount";

/* returns object necessary to createElement */
const createVApp = count =>
  createElement("div", {
    attrs: {
      className: "someClass",
      id: "someId",
      dataCount: count
    },
    children: [
      String(count),
      createElement("input"), // gets refreshed per second! A problem.
      createElement("img", {
        attrs: {
          src: "https://media.giphy.com/media/26gsf19j60Wh8GlcQ/giphy.gif"
        }
      })
    ]
  });

let count = 0;
const vApp = createVApp(count); // vApp is createVApp with count var

const $app = render(vApp); // $app is the actual HTML element, ready to replaceWith $rootEl

let $rootEl = mount($app, document.getElementById("app")); // rootElement is where we will attach our HTML elements
// mount(what, toWhere)

setInterval(() => {
  count++; // each second, increment by 1000
  $rootEl = mount(render(createVApp(count)), $rootEl); // mounts to id="app" element, the entire HTML element from render(createVApp(count)) - this one will have incrementally different count
}, 1000);
