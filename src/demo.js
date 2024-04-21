import "preact/debug";
import {h, render } from "preact";
import {html} from "htm/preact";
import BareMDE from "./components/BareMDE";
// import { BareMDE } from "../test/editor_old_v/BareMDE";
import { renderMd } from "./mdops";
import {useCallback , useState} from "preact/hooks";
const ticks = "```"

const menu = [ 
   { "label": "test menu items" , "handler": ()=>alert("Menu item clicked") },
   { "label": "test2" , "handler": ()=>alert("Menu item2 clicked") },
   ]

const shortString=`Lorem Ipsum
-----------

Lorem ipsum __dolor sit__ amet, consectetur adipiscing elit,`

const testString = `# Why another web editor for markdown?

1. First, I do not want "pseudo-preview"  
in editor window. I like something, which 
looks more like code editor with minimal 
highlighting.
1. But preview pane must be _perfect_, and 
look _exactly_ like rendered page.
1. Last, but not least, the editor 
must be as light as possible.

That's why.


Lorem Ipsum
-----------

Lorem ipsum __dolor sit__ amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea _commodo_ consequat.

> Ut enim ad minim veniam, quis nostrud exercitation

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia [deserunt mollit](https://github.com) anim id est laborum.

---
`

function MDEDemo(){
   const [ modified , setModified ]= useState(false);
   const saveFn = useCallback((c)=>{ setModified(false) ; alert("Save is not implemented in demo" ), console.log(c) }, [])
   const renderFn = useCallback( 
     m=>`<!DOCTYPE html>
     <html><head>
     <!--css-->
     <link rel='stylesheet' href='simple.css'>
     </head><body><main>${ renderMd(m) }</main></body></html>` 
   ,[]
   )
   const onChangeFn = useCallback( (c)=>{console.log("change.."  ); !modified && setModified(true) } );
   return html`
   <${BareMDE}  
   render=${renderFn} 
   renderBody=${ (c)=>renderMd(c) }
   save=${saveFn}
   trueFullscreen=${true}
   content=${ testString }  
   modified=${ modified }
   maxHeight="500px"
   onUpdate=${onChangeFn}
   menuItems=${ menu }/>
   `
  
}

console.log("about to start..." , testString)
const editor = h( MDEDemo , {});

const element = document.querySelector("#editorTest");
render(  editor , element);



