console.log("BareMDE web version");
// import * as preact from 'preact'
// console.log(preact)
import {h, render } from "preact";
console.log("h" , h)
import BareMDE from "../dist/BareMDE_v0.2.1.umd.js";
// import preact from 'preact'

// console.log("BMDE" , BareMDE)

window.BareMDEditor = function( props , element ){
  const e = h(BareMDE , props  );
  render( e , element )
}

