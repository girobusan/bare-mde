import { h , Component, createRef } from "preact";
import {html} from "htm/preact";

import {CodeJar} from "codejar";
require("./prism/prism_fixed.scss");
require("./mded.scss")
const Prism =  require("./prism/prism.js")

import Menu from "./Menu";
import TButton from "./TButton";
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

export default class BareMDE extends Component{
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
       fullscreen: props.fullscreen,
       showPreview: props.showPreview,
       fullPreview: false,
       content: props.content,
       spellCheck: props.spellCheck,
       syncScroll: true,
       modified: props.modified
     }
     this.surroundSelection = this.surroundSelection.bind(this);
     this.handleKey= this.handleKey.bind(this);
     this.togglePreview = this.togglePreview.bind(this);
     this.toggleFullPreview = this.toggleFullPreview.bind(this);
     this.toggleFullscreen = this.toggleFullscreen.bind(this);
     this.toggleSpellcheck = this.toggleSpellcheck.bind(this);
     this.toggleSyncScroll = this.toggleSyncScroll.bind(this);
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

  componentDidUpdate(oldS , oldP){
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
      // console.log("Update JAR") 
      this.jar.updateCode(this.props.content); //???

    }
     // console.log("Component Did Update")
      this.doPreview(true);
    
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
    console.log(this.jar);
  }

  fireCommand(command){
   this.editorCommands[command]();
  }

  handleKey(evt){ 
     if(!evt.ctrlKey){ return }
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
    //FIX: if string starts with newline, insert after newline.
    return txt.substring(0,pos) + what + txt.substring(pos);
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

    window.setTimeout( ()=>{ this.scrollThrottled=false ; doScroll() } , 50 );

  }
  

  toggleSpellcheck(){

    this.jar.updateOptions({spellcheck: !this.state.spellCheck});
    this.codeJarContainer.current.spellcheck = !this.state.spellCheck;
    this.setState({spellCheck: !this.state.spellCheck})
  }

  toggleFullscreen(){
     // console.log("Toggle fullscreen");
     
     const v = !this.state.fullscreen;
     if(v){
     typeof this.props.onEnterFullscreen === 'function' && this.props.onEnterFullscreen();
     this.componentContainer.current.style.zIndex = this.props.fullscreenZIndex 
     if(this.props.trueFullscreen && document.fullscreenEnabled){ this.componentContainer.current.requestFullscreen() }
     }
     else{ 
       typeof this.props.onExitFullscreen === 'function' && this.props.onExitFullscreen();
       this.componentContainer.current.style.zIndex = "unset"
       if(this.props.trueFullscreen && document.fullscreenEnabled){ document.exitFullscreen()}
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
  async doPreview(force){
    //if preview is hidden and we do not forced to update it, return
    if(!this.state.showPreview&&!force){  return }
    if(!this.previewFrame.current){ console.log("no iframe") ;console.log() }

    const redraw = ()=>{
       if(!this.previewFrame.current.contentWindow){ return } 
      const frameDoc = this.previewFrame.current.contentWindow.document;
      const content =  this.props.render(this.jar.toString());
      // frameDoc.documentElement.outerHTML = content;
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
      const dHeight = Math.max( //need more tests in Chrome
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
         items=${this.props.menuItems}
         />
         <${TButton}
         isOn=${true}
         customClass="formatting"
         svg=${IconBold}
         onClick=${()=>this.fireCommand("bold")}
         />
         <${TButton}
         customClass="formatting"
         isOn=${true}
         svg=${IconItalic}
         onClick=${()=>this.fireCommand("italic")}
         />
         <${TButton}
         customClass="formatting"
         isOn=${true}
         svg=${IconStrike}
         onClick=${()=>this.fireCommand("strike")}
         />
         <${TButton}
         customClass="formatting"
         isOn=${true}
         svg=${IconLink}
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
   disable: []

}
