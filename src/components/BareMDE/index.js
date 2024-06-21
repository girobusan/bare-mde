import { h , Component, createRef } from "preact";
import {html} from "htm/preact";

import {CodeJar} from "codejar";
require("./prism/prism_fixed.scss");
require("./mded.scss")
const Prism =  require("./prism/prism.js")

import Menu from "./Menu";
import TButton from "./TButton";
const iframeScrollbars = `<style>
body , html{
scrollbar-width: thin;
scrollbar-color: #444 #dddddd;
}

html::-webkit-scrollbar{
width: 6px;
}
html::-webkit-scrollbar-track{
background: #dddddd;
}
html::-webkit-scrollbar-thumb {
background-color: #444;
border-radius: 3px;
-webkit-border-radius: 3px;
overflow: hidden;
}

</style>`
//
//   ICONS
//
import IconShowPreview from "./icons/preview_FILL0_wght400_GRAD0_opsz24.svg?raw" 
//full preview
import IconFPreview from "./icons/preview_big_on_min.svg?raw"
import IconFPreviewOff from "./icons/visibility_FILL0_wght400_GRAD0_opsz24.svg?raw"
//fullscreen
import IconFScreenOff from "./icons/fullscreen_FILL0_wght400_GRAD0_opsz24.svg?raw"
import IconFScreen from "./icons/fullscreen_exit_FILL0_wght400_GRAD0_opsz24.svg?raw"
//spellcheck
import IconSpell from "./icons/spellcheck_active_minified.svg?raw"
import IconSpellOff from "./icons/spellcheck_FILL1_wght400_GRAD0_opsz24.svg?raw"
//sync scroll
import IconSScroll from "./icons/arrows_locked.svg?raw"
import IconSScrollOff from "./icons/swap_vert_FILL0_wght400_GRAD0_opsz24.svg?raw"
//save
import IconSave from "./icons/save_white.svg?raw"
//formatting
import IconBold from "./icons/formatting/format_bold_FILL0_wght400_GRAD0_opsz24.svg?raw"
import IconItalic from "./icons/formatting/format_italic_FILL0_wght400_GRAD0_opsz24.svg?raw"
import IconLink from "./icons/formatting/link_FILL0_wght400_GRAD0_opsz24.svg?raw"
import IconStrike from "./icons/formatting/format_strikethrough_FILL0_wght400_GRAD0_opsz24.svg?raw"


const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const modSymbol = isMac ? "⌘" : "Ctrl"

export default class BareMDE extends Component{
  constructor(props){
     super(props);
     this.previewThrottled = false;
     this.previewInProcess = false;
     this.scrollThrottled = false;
     this.saveThrottled = false;
     this.componentContainer = createRef();
     this.codeJarContainer = createRef();
     this.previewContainer = createRef();
     this.previewFrame = createRef();
     this.state ={ 
       fullscreen: props.fullscreen,
       showPreview: props.showPreview,
       fullPreview: false,
       content: props.content,
       spellCheck: props.spellCheck,
       syncScroll: true,
       modified: props.modified
     }
     this.currentContent=this.props.content;
     this.contentId = this.props.contentId;
     this.surroundSelection = this.surroundSelection.bind(this);
     this.handleKey= this.handleKey.bind(this);
     this.togglePreview = this.togglePreview.bind(this);
     this.toggleFullPreview = this.toggleFullPreview.bind(this);
     this.toggleFullscreen = this.toggleFullscreen.bind(this);
     this.toggleSpellcheck = this.toggleSpellcheck.bind(this);
     this.toggleSyncScroll = this.toggleSyncScroll.bind(this);
     this.doPreview = this.doPreview.bind(this);
     this.refreshPreview = this.refreshPreview.bind(this);
     
     //
     this.saveFile = this.saveFile.bind(this);
     this.onCodeUpdate = this.onCodeUpdate.bind(this);
     this.editorCommands = {
       "bold": ()=>{ this.surroundSelection("**","**") },
       "italic": ()=>{ this.surroundSelection("_","_")},
       "strike": ()=>{ this.surroundSelection("~~","~~")},
       "link": ()=>{ let url=prompt("Enter URL:" , "https://") ;
       this.surroundSelection("[", "](" + ( url || "" ) + ")")
       }
     }
     if(props.controls){
         props.controls.doPreview = this.doPreview;
         props.controls.syncScroll = ()=>this.state.syncScroll && this.syncPreviewScroll();
         props.controls.refreshPreview = this.refreshPreview;
     }
     if(props.imageRewriter){
        console.info("Image rewriter function is removed, please, do the rewritting in upper level component")
     }
  }
  shouldComponentUpdate(){
    this.pos = this.jar.save();
  }


  componentDidUpdate(oldS , oldP){
     // console.log("BMDE updated" , oldP.content , this.props.content)
    // console.log("Bare MDE updated" , this.jar.save())
    // if component updated,
    // but text is not,
    // it means, we have to return cursor
    // to last known position
    if(( this.currentContent!==this.props.content ) ||
    (this.props.contentId!==this.contentId)
    ){ 
      this.jar.updateCode(this.props.content); //???
      this.currentContent=this.props.content;
      this.contentId = this.props.contentId;
    } else{

      // this.pos = this.jar.save() ; // #FIXME
      this.pos && this.jar.restore(this.pos); //:??? OR in render()

    }
      this.doPreview();
    
  }
  componentWillUnmount(){

    window.removeEventListener("resize", this.doPreview)
  }
  onCodeUpdate(){
   
      this.pos = this.jar.save();
      typeof this.props.onUpdate==='function' && this.props.onUpdate(this.jar.toString());
      this.doPreview();
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
    this.jar.onUpdate( this.onCodeUpdate);
    //Chrome bug(?) fix (?):
    this.codeJarContainer.current.focus();
    window.addEventListener("resize", this.doPreview)
    this.codeJarContainer.current.addEventListener("keydown" , this.handleKey);
    // console.log(this.jar);
  }

  fireCommand(command){
   this.editorCommands[command]();
  }

  handleKey(evt){ 
     const testWhat = isMac ? evt.metaKey : evt.ctrlKey ;
     if(!testWhat){ return }
     if( ['KeyB' , 'KeyI' , 'KeyL' , 'KeyD'].indexOf(evt.code )!=-1)
     {
       evt.preventDefault();
       evt.stopPropagation();
     }
      // console.log(evt.code);
      if(evt.code==='KeyB'){this.fireCommand("bold")}
      if(evt.code==='KeyI'){this.fireCommand("italic")}
      if(evt.code==='KeyL'){this.fireCommand("link")}
      if(evt.code==='KeyD'){this.fireCommand("strike")}
  }


  insertAt(txt , pos , what){
    // const prefix = txt.startsWith("\n") ? "\n" : "";
    return  txt.substring(0,pos) + what + txt.substring(pos);
  }

  surroundSelection( before , after ){
    const s = window.getSelection();
    if(s.isCollapsed){ console.error("collapsed selection" ) ; return }
    const r = s.getRangeAt(0);
    if(!r){ return }
    //check if selection is inside our editor
    if(
      this.codeJarContainer.current.contains(r.commonAncestorContainer) ||
      this.codeJarContainer.current===r.commonAncestorContainer 
    ){
      // console.log(s , r);
      const p = this.jar.save();
      if(p.dir==='->'){
        p.end+=( after.length + before.length);
      }else{
        
        p.start+=( after.length + before.length);
      }
      const start = r.startContainer;
      const startOf = r.startOffset;
      const end = r.endContainer;
      const endOf = r.endOffset;
      // this must go first!
      end.textContent = this.insertAt(
         end.textContent, 
         endOf, 
         after)

      start.textContent = this.insertAt(
         start.textContent, 
         startOf, 
         before)
      //update editor
      this.codeJarContainer.current.focus()
      this.jar.updateCode(this.jar.toString());
      this.jar.restore(p);
      this.doPreview(true)
      this.onCodeUpdate();
      return;
    }else{
      console.error("wrong selection");
    }

  }


  async syncPreviewScroll(force){
    if(!this.state.syncScroll && !force ){ return }
    if(!this.state.showPreview){ return }
    if(this.scrollThrottled){ return }

    this.scrollThrottled = true;
    const doScroll = ()=>{
      //preview height
      const previewFullH = this.previewFrame.current.contentWindow.document.documentElement.scrollHeight;
      // console.log("SH" , previewFullH )
      //editor height
      const editorFullH = this.codeJarContainer.current.scrollHeight;
      const editorScrolled = this.codeJarContainer.current.scrollTop;

      const elementHeight = this.previewContainer.current.getBoundingClientRect().height;
      //if one of them can not scroll, do nothing
      if(previewFullH<=elementHeight || editorFullH<=elementHeight ){ return }

      const editorRatio = editorScrolled/( editorFullH - elementHeight );


      const scrollPreviewTo =  Math.round( ( previewFullH-elementHeight ) * editorRatio );
      // console.log("scrolling to" , scrollPreviewTo )
      this.previewFrame.current.contentWindow.document.documentElement.scrollTo(
        {top: scrollPreviewTo , 
          left:0 , 
          behavior: "smooth"}
      );
    }
    doScroll()

    window.setTimeout( ()=>{ this.scrollThrottled=false ; doScroll() } , 50 );

  }
  

  toggleSpellcheck(){

    this.jar.updateOptions({spellcheck: !this.state.spellCheck});
    this.codeJarContainer.current.spellcheck = !this.state.spellCheck;
    this.setState({spellCheck: !this.state.spellCheck})
  }

  toggleFullscreen(){
    // console.log("Toggle fullscreen");
    const syncFF = ()=>{
      // console.log("we change fs mode!!1")
      if( !document.fullscreenElement && this.state.fullscreen )
    {
        this.setState({fullscreen: false}) 
      }
    };

    const v = !this.state.fullscreen;
    if(v){
      typeof this.props.onEnterFullscreen === 'function' && this.props.onEnterFullscreen();
      this.componentContainer.current.style.zIndex = this.props.fullscreenZIndex 
      if(this.props.trueFullscreen && document.fullscreenEnabled){
        this.componentContainer.current.requestFullscreen() 
        this.componentContainer.current.addEventListener("fullscreenchange" , syncFF)
      }
    }
    else{ 
      typeof this.props.onExitFullscreen === 'function' && this.props.onExitFullscreen();
      this.componentContainer.current.style.zIndex = "unset"
      if(this.props.trueFullscreen && document.fullscreenEnabled){ document.exitFullscreen()}
      this.componentContainer.current.removeEventListener("fullscreenchange" , syncFF)
    }
    try {
      this.setState({fullscreen: v});
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
  }
  toggleFullPreview(){
    
    if( typeof this.props.externalPreview == 'function' ){ 
        return this.props.externalPreview();
    } 
     const v = !this.state.fullPreview;
     this.setState({fullPreview: v}); 
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
      window.setTimeout(()=>{ this.saveThrottled=false } , 200);
    };

  }

  // packPreviewFrame(){
  //       const frameDoc = this.previewFrame.current.contentWindow.document;
  //         const dHeight = Math.max( //need more tests in Chrome
  //           frameDoc.body.scrollHeight, //#BUGGY
  //           frameDoc.documentElement.scrollHeight,
  //           frameDoc.documentElement.offsetHeight,
  //         )
  //         // this.previewFrame.current.style.height = dHeight+"px";
  // }

  refreshPreview(){
     this.previewFrame.current.contentWindow.document.body.innerHTML = "";
     this.doPreview(true);
  }

  async doPreview(force){
    //if preview is hidden and we do not forced to update it, return
    if(!this.state.showPreview&&!force){  return }
    if(this.state.previewInProcess){  return } //force has no sense
    if(!this.previewFrame.current){ console.log("no iframe") }

    const redraw = ()=>{
      this.previewInProcess = true; 
       if(!this.previewFrame.current.contentWindow){ return } 
      let content; 
      let contentWindow =this.previewFrame.current.contentWindow;
      
      if(
      contentWindow.document.body && 
      contentWindow.document.body.innerHTML && 
      typeof this.props.renderBody==='function'){

         content = this.props.renderBody( this.jar.toString() ) ;
         return Promise.resolve(content)
         .then(r=> { 
            contentWindow.document.body.innerHTML= r ;
            // this.packPreviewFrame();
            this.syncPreviewScroll();
            this.previewInProcess=false;
            })
      }

      content =  this.props.render(this.jar.toString())

      return Promise.resolve(content)
      .then( r=>{
        const frameDoc = this.previewFrame.current.contentWindow.document;
        frameDoc.open();
        frameDoc.write(r)
        frameDoc.close();
        frameDoc.addEventListener("click" , (e)=>{e.stopPropagation();e.preventDefault()} , true);

            frameDoc.head.innerHTML += iframeScrollbars; 

        // if(typeof this.props.imageRewriter==='function'){
        //   const imgs = frameDoc.querySelectorAll("*[src]");
        //   imgs.forEach(i=>{
        //     if(i.getAttribute("src").match(/^http(s)?:/)){
        //       return;
        //     }
        //     i.src = this.props.imageRewriter(i.getAttribute( "src" ));
        //   })
        // }
        // console.log(frameDoc, frameDoc.body)
        frameDoc.addEventListener( "DOMContentLoaded" , ()=>{
          if(!frameDoc.body){return} //too late to calc, drop it
          // this.packPreviewFrame();
          this.syncPreviewScroll();
          this.previewInProcess=false;
          // this.previewInProcess = false;
        } )
        }
      )//.finally( ()=>this.previewInProcess=false )
    }

    if(!this.previewThrottled){
      this.previewThrottled = true;
      await redraw();
      window.setTimeout(()=>{ this.previewThrottled=false; !this.previewInProcess && redraw()} , 300);

    }
  }

  render(){
     // fix cursor position on render
     // if pos was saved on update
     if(this.pos && document.activeElement===this.codeJarContainer.current)
     {
       this.jar.restore(this.pos);
       this.pos = null;
     }

    // buttons:
    // toggle preview , toggle fullscreen , <preview only?> , save

    return html`<div class="BareMDE 
       ${ this.state.fullscreen && 'fullscreen' }
       ${ this.state.showPreview && 'showPreview' }
       ${ this.state.fullPreview && 'fullPreview' }
       "
       ref=${this.componentContainer}
       style="max-height:${ this.state.fullscreen ? '100%' : this.props.maxHeight};z-index:${ this.state.fullscreen ? this.props.fullscreenZIndex : "initial" }"
    >
      <div class="toolbar top 
       ${ this.state.fullscreen ? 'fullscreen' : 'windowed' }
      ">
         <${Menu} 
         title=${this.props.menuTitle || "Additional functions"}
         zIndex=${this.state.fullscreen ? this.props.fullscreenZIndex+100 : "initial"}
         items=${this.props.menuItems}
         />
         <div class="bmde_branding" dangerouslySetInnerHTML=${{__html:this.props.branding}}/>
         <${TButton}
         isOn=${true}
         customClass="formatting"
         svg=${IconBold}
         title=${ "Bold " + modSymbol +  "+B"}
         onClick=${()=>this.fireCommand("bold")}
         />
         <${TButton}
         customClass="formatting"
         isOn=${true}
         svg=${IconItalic}
         title=${ "Italic " + modSymbol + "+I"   }
         onClick=${()=>this.fireCommand("italic")}
         />
         <${TButton}
         customClass="formatting"
         isOn=${true}
         svg=${IconStrike}
         title=${ "Strikethrough " + modSymbol + "+D"   }
         onClick=${()=>this.fireCommand("strike")}
         />
         <${TButton}
         customClass="formatting"
         isOn=${true}
         svg=${IconLink}
         title=${ "Link " + modSymbol + "+L"   }
         onClick=${()=>this.fireCommand("link")}
         />
         <div class="divider" />
         <${TButton} 
         isOn=${this.state.showPreview}
         svg=${IconShowPreview}
         title="Toggle Preview" 
         onClick=${this.togglePreview} 
         />
         <${TButton}
         isOn=${this.state.fullPreview}
         svg=${IconFPreview}
         svgOff=${IconFPreviewOff}
         title=${this.props.externalPreviewTitle || "Full width preview"} 
         onClick=${this.toggleFullPreview}
         />
        <${TButton}
        isOn=${ this.state.fullscreen }
        svg=${IconFScreen}
        svgOff=${IconFScreenOff}
        title=${this.state.fullscreen ? "Exit fullscreen" : "Go fullscreen"}
        onClick=${this.toggleFullscreen}
        />
        <${TButton}
        isOn=${ this.state.spellCheck }
        svg=${IconSpell}
        svgOff=${IconSpellOff}
        title=${this.state.spellCheck ? "Turn spellchek off" : "Turn spellcheck on"}
        onClick=${this.toggleSpellcheck}
        />
        <${TButton}
        isOn=${ this.state.syncScroll }
        svg=${IconSScroll}
        svgOff=${IconSScrollOff}
        title=${this.state.syncScroll ? "Turn scroll sync off" : "Turn scroll sync on"}
        onClick=${this.toggleSyncScroll}
        />
        <${TButton}
        svg=${IconSave}
        title=${ "Save html file" }
        onClick=${this.saveFile}
        customClass=${ this.props.modified ? "alerted" : "" }
        />
        </div>
         <div class="workArea">
         <div  
              class="codeJar language-md" 
              ref=${this.codeJarContainer} 
              onscroll=${()=>this.syncPreviewScroll()}>
              </div>
              <div 
              class="preview ${this.props.previewClass}" 
              ref=${this.previewContainer}>
              <iframe style="min-height:100%" ref=${this.previewFrame}></iframe>
              </div>
      </div>
    </div>`
  }
}


BareMDE.defaultProps = {
   render: (m)=>`<html><head></head><body><div style='color:navyblue'>${m}</div></body></html>`,
   renderBody: null,
   onUpdate: ()=>console.log("Editor updated" ),
   save: (c)=>console.log("Dummy save function" , c.substring(0,200)+"..."),
   content: "write here", //text to display on mount
   contentId: null, //id of content to track the changes
   modified: false,
   indicateChanges: true,
   previewClass: "markdownPreviewArea",
   fullscreen: false,
   onEnterFullscreen: ()=>document.body.style.overflow="hidden",
   onExitFullscreen: ()=>document.body.style.overflow="initial",
   trueFullscreen: false,
   showPreview: true,
   spellCheck: true,
   fullscreenZIndex: 1001,
   externalPreview: null,
   externalPreviewTitle: null,
   imageRewriter: null,
   maxHeight: '400px',
   branding: VERSION,
   controls: null,
   //disable: [] //What the hell is that?

}
