import render from "./render";

const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push($node => {
      $node.setAttribute(k, v);
      return $node; // why return $node here? Wait, each push is: an action of setting attribute. It will then return a function that accepts an argument, $node. That $node is returned and stored as array
    });
  }
  for (const k in oldAttrs) {
    // iterate through all keys in oldAttrs
    if (!(k in newAttrs)) {
      // also, make sure k is NOT in newattrs - otherwise it may be reordered attr
      patches.push($node => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return $node => {
    for (const patch of patches) {
      patch($node);
    }
  };
};
const diffChildren = () => {};

const diff = (vOldNode, vNewNode) => {
  if (vNewNode === undefined) {
    // if newnode is undefined (and oldnode exists, then the node must have gotte ndeleted somehow
    // remove $node?
    // $node I think will be $rootEl where it will be attached to
    return $node => {
      $node.remove();
      return undefined;
    };
  }

  if (typeof vOldNode === "string" || typeof vNewNode === "string") {
    if (vOldNode !== vNewNode) {
      return $node => {
        const $newNode = render(vNewNode); //render the new string node
        $node.replaceWith($newNode); // replace the MOUNTING element
        return $newNode; // returns the HTML-ready node
      };
    } else {
      return $node => undefined; // if they are the same string, do nothing
    }
  }

  if (vOldNode.tagName !== vNewNode.tagName) {
    // if tagname is diff - make assumption that the children is different
    return $node => {
      const $newNode = render(vNewNode);
      $node.replaceWith($newNode); // dont care about vOldNode anymore
      // replaceWith new node on MOUNTING div
      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs);
  // const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

  return $node => {
    patchAttrs($node);
    // patchChildren($node);
    return $node;
  };
};

export default diff;
