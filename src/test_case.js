import {h, render} from "preact";
import { BareMDE } from "./components/BareMDE";
import { renderMd } from "./mdops"
const ticks = "```"
const testString = `
This is a heading
==================

* list item
*  ~~Removed list item~~
* [Link to site](https://github.com)
  1. Nubered list item
  1. Two of them

Lorem Ipsum
-----------

Lorem ipsum __dolor sit__ amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea _commodo_ consequat.

> Ut enim ad minim veniam, quis nostrud exercitation

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia [deserunt mollit](https://github.com) anim id est laborum.

---

## Then...

${ticks}javascript
//code block syntax
console.log("some code")

${ticks}

`

const editor = h(BareMDE , { render: renderMd , content: testString , spellCheck: false , externalPreview: ()=>console.log("external")  });
console.log("created" , editor);
render( editor, document.getElementById("editorTest") );
console.log("rendered");



