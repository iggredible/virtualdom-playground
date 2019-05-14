import render from "./vdom/render";
import createElement from "./vdom/createElement";
import mount from "./vdom/mount";
import diff from "./vdom/diff";

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
let vApp = createVApp(count); // vApp is createVApp with count var. OLD vApp

const $app = render(vApp); // $app is the actual HTML element, ready to replaceWith $rootEl

let $rootEl = mount($app, document.getElementById("app"));

setInterval(() => {
  count++;
  const vNewApp = createVApp(count); // NEW vApp
  const patch = diff(vApp, vNewApp);
  $rootEl = patch($rootEl); //patch takes one arg
  vApp = vNewApp;
}, 1000);
