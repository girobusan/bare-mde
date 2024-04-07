import { h } from "preact";
import {html} from "htm/preact";

export default function TButton({ 
   svg,
   svgOff,
   isOn,
   title,
   onClick,
   customClass
}){
    svgOff = svgOff || svg; 
   return html`<button class="TButton 
   ${ isOn ? 'on' : 'off' }
   ${customClass || ''}
   "
   style=${{
        width: "32px",
        height: "32px",
        display: "inline-block",
        boxSizing: "border-box",
        padding:"3px",
        userSelect: "none",
        borderWidth:"1px",
     }}
   dangerouslySetInnerHTML=${{__html:isOn? svg : svgOff}}
   title=${ title||'' }
   onClick=${ typeof onClick === 'function' ? onClick : ()=>console.log('button clicked') }
   />`
}
