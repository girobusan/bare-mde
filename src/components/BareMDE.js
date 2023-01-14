import { Component, createRef } from "preact";
import {html} from "htm/preact";

import {CodeJar} from "codejar";
require("./prism/prism.js")
require("./prism/prism_fixed.scss");
require("./mded.scss")

// console.log(Prism);


export class BareMDE extends Component{
  constructor(props){
     super(props);
     this.componentContainer = createRef();
     this.codeJarContainer = createRef();
     this.previewContainer = createRef();
     this.state ={ 
       fullscreen: false,
       showPreview: true,
       content: props.content || "# type here",
       // documentPath: props.documentPath
     }
     this.togglePreview = this.togglePreview.bind(this);
     this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }

  componentDidMount(){
  // this.codeJarContainer.current.style.position = "relative";
    this.jar = CodeJar(this.codeJarContainer.current , 
    (e)=>Prism.highlightElement(e,false,null),
    {
      preserveIdent: true
    }

    );
    this.jar.updateCode(this.state.content);
    this.doPreview();
    this.jar.onUpdate( ()=>{
       this.props.onUpdate(this.jar.toString());
       this.doPreview();
    } )
  }

  createToggler(propName){

    let t = function(){
       const v = !this.state[propName];
       const s = {};
       s[propName] = v;
       this.setState(s);
    }

    t = t.bind(this);
    return t;
    
  }

  toggleFullscreen(){
     console.log("Toggle fullscreen");
     const v = !this.state.fullscreen;
     if(v){ this.componentContainer.current.style.zIndex = this.props.fullscreenZIndex }
     else{ this.componentContainer.current.style.zIndex = "unset"}
     this.setState({fullscreen: v});
  }
  togglePreview(){
     console.log("Toggle preview");
     const v = !this.state.showPreview;
     // if(v){this.doPreview()} 
     this.setState({showPreview: v});
     this.doPreview(true);
  }
  saveFile(){
     
  }
  doPreview(force){
     if(!this.state.showPreview&&!force){ return }
     
       this.previewContainer.current.innerHTML = this.props.render(this.jar.toString())
  }
  render(){

    // buttons:
    // toggle preview , toggle fullscreen , <preview only?> , save

    return html`<div class="BareMDE BearMDE 
       ${ this.state.fullscreen ? 'fullscreen' : 'windowed' }
       ${ this.state.showPreview ? 'preview' : 'noPreview' }"
       ref=${this.componentContainer}
    >
      <div class="toolbar top 
       ${ this.state.fullscreen ? 'fullscreen' : 'windowed' }
       ${ this.state.showPreview ? 'preview' : 'noPreview' }
      ">
         <button class="previewToggle" title="Toggle Preview" onclick=${this.togglePreview}> </button>
         <button class="fullscreenToggle" title="Toggle Fullscreen" onclick=${this.toggleFullscreen}></button>
         <button class="saveButton" title="Save File"></button>
        </div>
      <div class="workArea">
        <div class="codeJar language-md" ref=${this.codeJarContainer}></div>
        <div class="preview ${this.props.previewClass}" ref=${this.previewContainer}></div>
      </div>
    </div>`
  }
}


BareMDE.defaultProps = {
   render: (m)=>`<div style='color:blue'>${m}</div>`,
   onUpdate: (c)=>console.log("Editor updated" ),
   save: (c)=>console.log("Dummy save function" , c),
   content: "write here", //text to display on mount
   documentPath: "default" , //identifier of this content (to keep edits)
   modified: false,
   indicateChanges: false,
   previewClass: "markdownPreviewArea",
   fullscreenZIndex: 1001

}
