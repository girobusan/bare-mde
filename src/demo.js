// Must be the first import
import "preact/debug";
import {h, render } from "preact";
import {html} from "htm/preact";
import { BareMDE } from "./components/BareMDE";
import { renderMd } from "./mdops";
import {useCallback , useState} from "preact/hooks";
const ticks = "```"
const menu = [ 
   { "label": "test menu items" , "handler": ()=>alert("Menu item clicked") },
   { "label": "test2" , "handler": ()=>alert("Menu item2 clicked") },
   ]
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
`

function MDEDemo(){
   const [ modified , setModified ]= useState(false);
   const saveFn = useCallback(()=>{ setModified(false) ; alert("Save is not implemented in demo") }, [])
   const renderFn = useCallback( 
     m=>`<html><head>
     <link rel='stylesheet' href='simple.css'>
     </head><body><main>${ renderMd(m) }</main></body></html>` 
   ,[]
   )
   const onChangeFn = useCallback( ()=>!modified && setModified(true) );
   return html`
   <div class="Demo" style="border-radius:4px; overflow:hidden;max-width:initial">
   <${BareMDE}  
   save=${saveFn}
   content=${ testString }  
   render=${renderFn} 
   modified=${ modified }
   onUpdate=${onChangeFn}
   menuItems=${ menu }/>
   </div>`
  
}


console.log("about to start...")
const editor = h( MDEDemo , {});
console.log("created" , editor);
const element = document.querySelector("#editorTest");
console.log("about to render at" , element);
render(  editor , element);
console.log("rendered");
/*


   < ${BareMDE}
    menuItems=${ menu } 
   fullScreen=${ false } 
   modified=${ modified }
   spellCheck=${ false }  
   />


 */



