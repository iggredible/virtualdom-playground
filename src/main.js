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
let vApp = createVApp(count); // vApp is createVApp with count var

const $app = render(vApp); // $app is the actual HTML element, ready to replaceWith $rootEl

let $rootEl = mount($app, document.getElementById("app")); // rootElement is where we will attach our HTML elements
// mount(what, toWhere)

setInterval(() => {
  count++; // each second, increment by 1000
  const vNewApp = createVApp(count); // updated VApp with count +1 (1 more than last one - updated)
  const patch = diff(vApp, vNewApp); // this is returning the difference between vApp and vNewApp ifferences should be dataCount and String(count)
  // patch is the difference. Think of it as returning the HTML element of ONLY the difference
  // patch is a function (recall it return $node => {...}
  $rootEl = patch($rootEl); // once the difference is determined, it will be mounted into $rootEl
  // rootEl might/ might not be the same. But remember, rootEl contains $app, which may contain different count
  // mount TO $rootEl the DIFFERENCE (in $node
  vApp = vNewApp; // don't forget, vApp is now the new newapp, as there will be NEWER update on app
  // $rootEl = mount(render(createVApp(count)), $rootEl); // mounts to id="app" element, the entire HTML element from render(createVApp(count)) - this one will have incrementally different count
}, 1000);
