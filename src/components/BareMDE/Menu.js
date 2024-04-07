import { h , Component} from "preact";
import {html} from "htm/preact";
import { If } from "./If";
import svgM from "./icons/menu_FILL0_wght400_GRAD0_opsz24.svg?raw"

export default class Menu extends Component{
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
    this.handleItem = this.handleItem.bind(this);
    this.doClose=this.doClose.bind(this);

  }

  handleItem(i){
    this.props.items[i].handler();
    // this.setState({"open" : false});
  }

  doClose(){
    this.setState({ "open" : false })
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.open===true && previousState.open===false){
       window.addEventListener("click", this.doClose)
    }
    if(this.state.open===false && previousState.open===true){
       window.removeEventListener("click", this.doClose)
    }
    return true;
    
  }

  render(){
    if(!this.props.items || this.props.items.length==0){ return "" }
    const my = this;
    return html`
    <div class="EditorMenu">
    <button
    dangerouslySetInnerHTML=${{__html: svgM}}
    title=${this.props.title || "Menu"}
    onClick=${(e)=>{  e.stopPropagation() ; e.preventDefault(); this.setState({ open: !this.state.open }) }}/>
    <${If} condition=${this.state.open}>
    <div class="menuItems" style="z-index:${this.props.zIndex}">
    ${ this.props.items.map( 
    (e,i)=>html`<div class="Item" 
    onMouseDown=${ ()=>my.handleItem(i) }
    dangerouslySetInnerHTML=${{__html: e.label}}
    />` 
    ) }
    </div>
    </${If}>
    </div>

    `
    }
  }


Menu.defaultProps = {
  zIndex: 1100,
}

