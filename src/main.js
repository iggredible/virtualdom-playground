import render from "./vdom/render";
import createElement from "./vdom/createElement";
import mount from "./vdom/mount";

const createVApp = count =>
  createElement("div", {
    attrs: {
      className: "someClass",
      id: "someId",
      dataCount: String(count)
    },
    children: [
      String(count),
      createElement("img", {
        attrs: {
          src: "https://media.giphy.com/media/26gsf19j60Wh8GlcQ/giphy.gif"
        }
      })
    ]
  });

let count = 0;
const vApp = createVApp(count);
const $app = render(vApp);

let $rootEl = mount($app, document.getElementById("app"));

console.log("app: ", $app);

setInterval(() => {
  count++;
  $rootEl = mount(render(render(createVApp(count)), $rootEl));
}, 1000);
