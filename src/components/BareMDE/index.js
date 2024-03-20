import { Component, createRef , enqueueRender as ER } from "preact";
import {html} from "htm/preact";

import {CodeJar} from "codejar";
require("./prism/prism_fixed.scss");
require("./mded.scss")
const Prism =  require("./prism/prism.js")

import { Menu } from "./Menu";

function assign(obj, props) {
	// @ts-expect-error We change the type of `obj` to be `O & P`
	for (let i in props) obj[i] = props[i];
	return /** @type {O & P} */ (obj);
}


export class BareMDE extends Component{
  constructor(props){
     super(props);
     this.previewThrottled = false;
     this.scrollThrottled = false;
     this.saveThrottled = false;
     this.componentContainer = createRef();
     this.codeJarContainer = createRef();
     this.previewContainer = createRef();
     this.previewFrame = createRef();
     this.state ={ 
       fullscreen: props.fullScreen,
       showPreview: props.showPreview,
       fullPreview: false,
       content: props.content,
       spellCheck: props.spellCheck,
       syncScroll: true,
       modified: props.modified
     }
     this.togglePreview = this.togglePreview.bind(this);
     this.toggleFullPreview = this.toggleFullPreview.bind(this);
     this.toggleFullscreen = this.toggleFullscreen.bind(this);
     this.toggleSpellcheck = this.toggleSpellcheck.bind(this);
     this.toggleSyncScroll = this.toggleSyncScroll.bind(this);
     this.doPreview = this.doPreview.bind(this);
     this.saveFile = this.saveFile.bind(this);
     this.syncPreviewScroll = this.syncPreviewScroll.bind(this);
  }
  shouldComponentUpdate(p , s){
     
     //if content is reset, we have to reset.
     this.pos = this.jar.save();
     if(this.props.contentId!==p.contentId){
         console.log("Update content...")
         
         this.jar.updateCode(p.content);
         // this.modified = p.modified;
         this.doPreview();
     }

    if( s.syncScroll && !this.state.syncScroll ){
       this.syncPreviewScroll(true);
    }
     return true;
  }

  compomemtDidUpdate(oldS , oldP){
     // console.log("Component updated")
    // console.log("Bare MDE updated" , this.jar.save())
    // if component updated,
    // but text is not,
    // it means, we have to return cursor
    // to last known position
    if(oldP.content ==this.props.content){ 
      this.pos && this.jar.restore(this.pos) ; 
      this.pos = null ; // #FIXME
    } else{
      console.log("Update JAR") 
      this.jar.updateCode(this.props.content); //???

    }
     console.log("Component Did Update")
      this.doPreview(true);
    
  }
  componentWillUnmount(){

    window.removeEventListener("resize", this.doPreview)
  }
  componentDidMount(){
    this.jar = CodeJar(this.codeJarContainer.current , 
    (e)=>Prism.highlightElement(e,false,null),
    {
      preserveIdent: true,
      spellcheck: this.state.spellCheck
    }

    );
    this.jar.updateCode(this.props.content);
    this.doPreview();
    const updJar =  ()=>{
      this.pos = this.jar.save();
      typeof this.props.onUpdate==='function' && this.props.onUpdate(this.jar.toString());
      this.doPreview();
    } ;
    //updJar = updJar.bind(this);
    this.jar.onUpdate( updJar );
    //Chrome bug(?) fix (?):
    this.codeJarContainer.current.focus();
    window.addEventListener("resize", this.doPreview)
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
  async syncPreviewScroll(force){
    // console.log(" s p s ")
    if(!this.state.syncScroll && !force ){ return }
    if(!this.state.showPreview){ return }
    if(this.scrollThrottled){ return }

    this.scrollThrottled = true;
    const doScroll = ()=>{
      //preview height
      const previewFullH = this.previewContainer.current.scrollHeight;
      //editor height
      const editorFullH = this.codeJarContainer.current.scrollHeight;
      const editorScrolled = this.codeJarContainer.current.scrollTop;

      const elementHeight = this.previewContainer.current.getBoundingClientRect().height;
      //if one of them can not scroll, do nothing
      if(previewFullH<=elementHeight || editorFullH<=elementHeight ){ return }

      const editorRatio = editorScrolled/( editorFullH - elementHeight );


      const scrollPreviewTo =  ( previewFullH-elementHeight ) * editorRatio;
      this.previewContainer.current.scrollTo(
        {top: scrollPreviewTo , 
          left:0 , 
          behavior: "smooth"}
      );
    }
    doScroll()

    window.setTimeout( ()=>{ this.scrollThrottled=false ; doScroll() } , 100 );

  }
  

  toggleSpellcheck(){

    this.jar.updateOptions({spellcheck: !this.state.spellCheck});
    this.codeJarContainer.current.spellcheck = !this.state.spellCheck;
    this.setState({spellCheck: !this.state.spellCheck})
  }

  toggleFullscreen(){
     // console.log("Toggle fullscreen");
     const v = !this.state.fullscreen;
     if(v){ this.componentContainer.current.style.zIndex = this.props.fullscreenZIndex }
     else{ this.componentContainer.current.style.zIndex = "unset"}
     try {
     console.log("about to set state");
        this.setState({fullscreen: v});
     console.log("state set");

     }catch(e){
       console.error("Error found!" , e);
     }
     // this.doPreview();
  }
  togglePreview(){
     
     const v = !this.state.showPreview;
     const ns = {showPreview: v}

     if(this.state.fullPreview){
       this.setState({fullPreview: false});
       return;
     }
     this.setState(ns);
     // v && this.doPreview(true);
  }
  toggleFullPreview(){
    
    if( typeof this.props.externalPreview == 'function' ){ 
        return this.props.externalPreview();
    } 
     const v = !this.state.fullPreview;
     this.setState({fullPreview: v}); 
     // console.log("state is set^" , this.state);
     // this.doPreview();
  }
  toggleSyncScroll(){
     
     const v = !this.state.syncScroll;
     const ns = {syncScroll: v}
     this.setState(ns);
  }
  saveFile(){
    if(this.saveThrottled){ return }
    if( typeof this.props.save==='function' ){
      this.props.save(this.jar.toString()) 
      this.saveThrottled = true;
      window.setTimeout(()=>{ this.saveThrottled=false } , 500);
    };

  }
  async doPreview(force){
    //if preview is hidden and we do not forced to update it, return
    if(!this.state.showPreview&&!force){  return }
    if(!this.previewFrame.current){ console.log("no iframe") ;console.log() }

    const redraw = ()=>{
       if(!this.previewFrame.current.contentWindow){ return } 
      const frameDoc = this.previewFrame.current.contentWindow.document;
      const content =  this.props.render(this.jar.toString());
      // frameDoc.documentElement.innerHTML = content;
      frameDoc.open();
      frameDoc.write(content)
      frameDoc.close();

      if(typeof this.props.imageRewriter==='function'){
        const imgs = frameDoc.querySelectorAll("*[src]");
        imgs.forEach(i=>{
          if(i.getAttribute("src").match(/^http(s)?:/)){
            return;
          }
          i.src = this.props.imageRewriter(i.getAttribute( "src" ));
        })
      }
      const dHeight = Math.max(
        // frameDoc.body.scrollHeight,
        frameDoc.body.offsetHeight,
        frameDoc.documentElement.scrollHeight,
        frameDoc.documentElement.offsetHeight,
      )
       // console.log(

       //   frameDoc.body.scrollHeight,
       //   frameDoc.body.offsetHeight,
       //   frameDoc.documentElement.scrollHeight,
       //   frameDoc.documentElement.offsetHeight,
       // )
      this.previewFrame.current.style.height = dHeight+"px";
      this.syncPreviewScroll();
    }

    if(!this.previewThrottled){
      redraw();
      this.previewThrottled = true;
      window.setTimeout(()=>{ this.previewThrottled=false; redraw()} , 300);

    }
  }

  render(){
     // fix cursor position on render
     if(this.pos)
     {
       this.jar.restore(this.pos)
     }

    // buttons:
    // toggle preview , toggle fullscreen , <preview only?> , save

    return html`<div class="BareMDE 
       ${ this.state.fullscreen ? 'fullscreen' : 'windowed' }
       ${ this.state.showPreview ? 'preview' : 'noPreview' }
       ${ this.state.fullPreview ? 'fullPreview' : '' }
       "
       ref=${this.componentContainer}
       style="max-height:${ this.state.fullscreen ? '100%' : this.props.maxHeight};z-index:${ this.state.fullscreen ? this.props.fullscreenZIndex : "initial" }"
    >
      <div class="toolbar top 
       ${ this.state.fullscreen ? 'fullscreen' : 'windowed' }
       ${ this.state.showPreview ? 'preview' : 'noPreview' }
       ${ this.props.modified ? 'modified' : '' }
      ">
         <${Menu} 
         title=${this.props.menuTitle || "Additional functions"}
         zIndex=${this.state.fullscreen ? this.props.fullscreenZIndex+100 : "initial"}
         items=${this.props.menuItems}/>

         <button 
         class="previewToggle ${this.state.showPreview ? "on" : "off"}" 
         title="Toggle Preview" 
         onclick=${this.togglePreview}> 
         </button>

         <button 
         class="externalPreview ${this.state.fullPreview? "on" : "off"}" 
         title=${this.props.externalPreviewTitle || "Only preview"} 
         onclick=${this.toggleFullPreview}>
         </button>


         <button 
         class="fullscreenToggle ${this.state.fullscreen? "on" : "off"}" 
         title="Toggle Fullscreen" 
         onclick=${this.toggleFullscreen}
         style=${"display:" + ( this.props.disable.indexOf("fullscreen")!=-1 ? "none" : "" )}
         >
         </button>
         
         <button 
         class="spellcheckToggle ${this.state.spellCheck ? "on" : "off"}" 
         title="Toggle spellcheck" 
         onclick=${this.toggleSpellcheck}>
         </button>

         <button 
         class="syncScrollToggle ${this.state.syncScroll ? "on" : "off"}" 
         title="Sync preview scroll" 
         onclick=${this.toggleSyncScroll}>
         </button>

         <button 
         class="saveButton" 
         title="Save File" 
         onclick=${this.saveFile}>
         </button>

        </div>

         <div class="workArea">
         <div  
              class="codeJar language-md" 
              ref=${this.codeJarContainer} 
              onscroll=${()=>this.syncPreviewScroll()}>
              </div>
              <div 
              class="preview ${this.props.previewClass}" 
              ref=${this.previewContainer}><iframe style="min-height:100%" ref=${this.previewFrame}></iframe>
              </div>
      </div>
    </div>`
  }
}


BareMDE.defaultProps = {
   render: (m)=>`<html><head></head><body><div style='color:navyblue'>${m}</div></body></html>`,
   onUpdate: ()=>console.log("Editor updated" ),
   save: (c)=>console.log("Dummy save function" , c.substring(0,200)+"..."),
   content: "write here", //text to display on mount
   contentId: null, //id of content to track the changes
   modified: false,
   indicateChanges: true,
   previewClass: "markdownPreviewArea",
   fullScreen: false,
   showPreview: true,
   spellCheck: true,
   fullscreenZIndex: 1001,
   externalPreview: null,
   externalPreviewTitle: null,
   imageRewriter: null,
   maxHeight: '400px',
   disable: []

}
