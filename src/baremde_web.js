console.log("BareMDE web version");
import {h, render } from "preact";
import BareMDE from "../docs/BareMDE";

window.BareMDE = function( props , element ){
  const e = h(BareMDE , props  );
  render( e , element )
}

