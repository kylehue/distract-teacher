import{d as He,a9 as et,C as a,x as It,a5 as f,ae as _t,af as Bt,ag as At,o as tt,as as ue,aq as p,at as T,au as qe,ar as le,ci as zt,cj as $t,b2 as Le,F as kt,bb as Et,al as Oe,ay as nt,bs as Dt,az as Te,aE as ie,ck as Wt,v as z,aD as Fe,aG as Vt,cl as jt,aH as Ge,aI as Je,aJ as ot,b_ as Lt,bP as Ut,bQ as Nt,bR as Kt,bF as Ke,bS as Ht,aL as qt,aM as Gt,cm as Qe,cn as Jt,co as Qt,aC as Ye,aB as Yt,cp as Ue,cq as Xt,b$ as Zt,cr as en,cs as tn,b9 as nn,bj as on,ct as ln,cu as an,bU as Ne,cv as rn,aP as K}from"./index-8wHXb0TE.js";import{g as Xe}from"./attribute-Cz32yFEB.js";const q="v-hidden",sn=Bt("[v-hidden]",{display:"none!important"}),Ze=He({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:S}){const $=f(null),g=f(null);function h(W){const{value:i}=$,{getCounter:k,getTail:R}=e;let b;if(k!==void 0?b=k():b=g.value,!i||!b)return;b.hasAttribute(q)&&b.removeAttribute(q);const{children:A}=i;if(W.showAllItemsBeforeCalculate)for(const v of A)v.hasAttribute(q)&&v.removeAttribute(q);const m=i.offsetWidth,x=[],M=S.tail?R==null?void 0:R():null;let P=M?M.offsetWidth:0,E=!1;const D=i.children.length-(S.tail?1:0);for(let v=0;v<D-1;++v){if(v<0)continue;const C=A[v];if(E){C.hasAttribute(q)||C.setAttribute(q,"");continue}else C.hasAttribute(q)&&C.removeAttribute(q);const w=C.offsetWidth;if(P+=w,x[v]=w,P>m){const{updateCounter:V}=e;for(let B=v;B>=0;--B){const H=D-1-B;V!==void 0?V(H):b.textContent=`${H}`;const G=b.offsetWidth;if(P-=x[B],P+G<=m||B===0){E=!0,v=B-1,M&&(v===-1?(M.style.maxWidth=`${m-G}px`,M.style.boxSizing="border-box"):M.style.maxWidth="");const{onUpdateCount:j}=e;j&&j(H);break}}}}const{onUpdateOverflow:I}=e;E?I!==void 0&&I(!0):(I!==void 0&&I(!1),b.setAttribute(q,""))}const _=_t();return sn.mount({id:"vueuc/overflow",head:!0,anchorMetaName:At,ssr:_}),tt(()=>h({showAllItemsBeforeCalculate:!1})),{selfRef:$,counterRef:g,sync:h}},render(){const{$slots:e}=this;return et(()=>this.sync({showAllItemsBeforeCalculate:!1})),a("div",{class:"v-overflow",ref:"selfRef"},[It(e,"default"),e.counter?e.counter():a("span",{style:{display:"inline-block"},ref:"counterRef"}),e.tail?e.tail():null])}}),dn=ue([p("base-selection",`
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[p("base-loading",`
 color: var(--n-loading-color);
 `),p("base-selection-tags","min-height: var(--n-height);"),T("border, state-border",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),T("state-border",`
 z-index: 1;
 border-color: #0000;
 `),p("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[T("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),p("base-selection-overlay",`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[T("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),p("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `,[T("inner",`
 max-width: 100%;
 overflow: hidden;
 `)]),p("base-selection-tags",`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),p("base-selection-label",`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[p("base-selection-input",`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[T("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),T("render-label",`
 color: var(--n-text-color);
 `)]),qe("disabled",[ue("&:hover",[T("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),le("focus",[T("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),le("active",[T("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),p("base-selection-label","background-color: var(--n-color-active);"),p("base-selection-tags","background-color: var(--n-color-active);")])]),le("disabled","cursor: not-allowed;",[T("arrow",`
 color: var(--n-arrow-color-disabled);
 `),p("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[p("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),T("render-label",`
 color: var(--n-text-color-disabled);
 `)]),p("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),p("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),p("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[T("input",`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),T("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>le(`${e}-status`,[T("state-border",`border: var(--n-border-${e});`),qe("disabled",[ue("&:hover",[T("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),le("active",[T("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),p("base-selection-label",`background-color: var(--n-color-active-${e});`),p("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),le("focus",[T("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),p("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),p("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[ue("&:last-child","padding-right: 0;"),p("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[T("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),un=He({name:"InternalSelection",props:Object.assign(Object.assign({},Te.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){const{mergedClsPrefixRef:S,mergedRtlRef:$}=nt(e),g=Dt("InternalSelection",$,S),h=f(null),_=f(null),W=f(null),i=f(null),k=f(null),R=f(null),b=f(null),A=f(null),m=f(null),x=f(null),M=f(!1),P=f(!1),E=f(!1),D=Te("InternalSelection","-internal-selection",dn,Wt,e,ie(e,"clsPrefix")),I=z(()=>e.clearable&&!e.disabled&&(E.value||e.active)),v=z(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Oe(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),C=z(()=>{const n=e.selectedOption;if(n)return n[e.labelField]}),w=z(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function V(){var n;const{value:l}=h;if(l){const{value:y}=_;y&&(y.style.width=`${l.offsetWidth}px`,e.maxTagCount!=="responsive"&&((n=m.value)===null||n===void 0||n.sync({showAllItemsBeforeCalculate:!1})))}}function B(){const{value:n}=x;n&&(n.style.display="none")}function H(){const{value:n}=x;n&&(n.style.display="inline-block")}Fe(ie(e,"active"),n=>{n||B()}),Fe(ie(e,"pattern"),()=>{e.multiple&&et(V)});function G(n){const{onFocus:l}=e;l&&l(n)}function j(n){const{onBlur:l}=e;l&&l(n)}function J(n){const{onDeleteOption:l}=e;l&&l(n)}function X(n){const{onClear:l}=e;l&&l(n)}function O(n){const{onPatternInput:l}=e;l&&l(n)}function ce(n){var l;(!n.relatedTarget||!(!((l=W.value)===null||l===void 0)&&l.contains(n.relatedTarget)))&&G(n)}function he(n){var l;!((l=W.value)===null||l===void 0)&&l.contains(n.relatedTarget)||j(n)}function te(n){X(n)}function Se(){E.value=!0}function ne(){E.value=!1}function Re(n){!e.active||!e.filterable||n.target!==_.value&&n.preventDefault()}function Z(n){J(n)}const Q=f(!1);function Me(n){if(n.key==="Backspace"&&!Q.value&&!e.pattern.length){const{selectedOptions:l}=e;l!=null&&l.length&&Z(l[l.length-1])}}let ae=null;function Pe(n){const{value:l}=h;if(l){const y=n.target.value;l.textContent=y,V()}e.ignoreComposition&&Q.value?ae=n:O(n)}function Ie(){Q.value=!0}function fe(){Q.value=!1,e.ignoreComposition&&O(ae),ae=null}function ve(n){var l;P.value=!0,(l=e.onPatternFocus)===null||l===void 0||l.call(e,n)}function ee(n){var l;P.value=!1,(l=e.onPatternBlur)===null||l===void 0||l.call(e,n)}function L(){var n,l;if(e.filterable)P.value=!1,(n=R.value)===null||n===void 0||n.blur(),(l=_.value)===null||l===void 0||l.blur();else if(e.multiple){const{value:y}=i;y==null||y.blur()}else{const{value:y}=k;y==null||y.blur()}}function be(){var n,l,y;e.filterable?(P.value=!1,(n=R.value)===null||n===void 0||n.focus()):e.multiple?(l=i.value)===null||l===void 0||l.focus():(y=k.value)===null||y===void 0||y.focus()}function oe(){const{value:n}=_;n&&(H(),n.focus())}function _e(){const{value:n}=_;n&&n.blur()}function Be(n){const{value:l}=b;l&&l.setTextContent(`+${n}`)}function Ae(){const{value:n}=A;return n}function ze(){return _.value}let re=null;function se(){re!==null&&window.clearTimeout(re)}function $e(){e.active||(se(),re=window.setTimeout(()=>{w.value&&(M.value=!0)},100))}function ke(){se()}function Ee(n){n||(se(),M.value=!1)}Fe(w,n=>{n||(M.value=!1)}),tt(()=>{Vt(()=>{const n=R.value;n&&(e.disabled?n.removeAttribute("tabindex"):n.tabIndex=P.value?-1:0)})}),jt(W,e.onResize);const{inlineThemeDisabled:ge}=e,de=z(()=>{const{size:n}=e,{common:{cubicBezierEaseInOut:l},self:{fontWeight:y,borderRadius:De,color:We,placeholderColor:pe,textColor:me,paddingSingle:we,paddingMultiple:Ve,caretColor:je,colorDisabled:Ce,textColorDisabled:Y,placeholderColorDisabled:t,colorActive:o,boxShadowFocus:r,boxShadowActive:c,boxShadowHover:d,border:s,borderFocus:u,borderHover:F,borderActive:N,arrowColor:lt,arrowColorDisabled:it,loadingColor:at,colorActiveWarning:rt,boxShadowFocusWarning:st,boxShadowActiveWarning:dt,boxShadowHoverWarning:ut,borderWarning:ct,borderFocusWarning:ht,borderHoverWarning:ft,borderActiveWarning:vt,colorActiveError:bt,boxShadowFocusError:gt,boxShadowActiveError:pt,boxShadowHoverError:mt,borderError:wt,borderFocusError:Ct,borderHoverError:xt,borderActiveError:yt,clearColor:Ot,clearColorHover:Ft,clearColorPressed:Tt,clearSize:St,arrowSize:Rt,[Ge("height",n)]:Mt,[Ge("fontSize",n)]:Pt}}=D.value,xe=Je(we),ye=Je(Ve);return{"--n-bezier":l,"--n-border":s,"--n-border-active":N,"--n-border-focus":u,"--n-border-hover":F,"--n-border-radius":De,"--n-box-shadow-active":c,"--n-box-shadow-focus":r,"--n-box-shadow-hover":d,"--n-caret-color":je,"--n-color":We,"--n-color-active":o,"--n-color-disabled":Ce,"--n-font-size":Pt,"--n-height":Mt,"--n-padding-single-top":xe.top,"--n-padding-multiple-top":ye.top,"--n-padding-single-right":xe.right,"--n-padding-multiple-right":ye.right,"--n-padding-single-left":xe.left,"--n-padding-multiple-left":ye.left,"--n-padding-single-bottom":xe.bottom,"--n-padding-multiple-bottom":ye.bottom,"--n-placeholder-color":pe,"--n-placeholder-color-disabled":t,"--n-text-color":me,"--n-text-color-disabled":Y,"--n-arrow-color":lt,"--n-arrow-color-disabled":it,"--n-loading-color":at,"--n-color-active-warning":rt,"--n-box-shadow-focus-warning":st,"--n-box-shadow-active-warning":dt,"--n-box-shadow-hover-warning":ut,"--n-border-warning":ct,"--n-border-focus-warning":ht,"--n-border-hover-warning":ft,"--n-border-active-warning":vt,"--n-color-active-error":bt,"--n-box-shadow-focus-error":gt,"--n-box-shadow-active-error":pt,"--n-box-shadow-hover-error":mt,"--n-border-error":wt,"--n-border-focus-error":Ct,"--n-border-hover-error":xt,"--n-border-active-error":yt,"--n-clear-size":St,"--n-clear-color":Ot,"--n-clear-color-hover":Ft,"--n-clear-color-pressed":Tt,"--n-arrow-size":Rt,"--n-font-weight":y}}),U=ge?ot("internal-selection",z(()=>e.size[0]),de,e):void 0;return{mergedTheme:D,mergedClearable:I,mergedClsPrefix:S,rtlEnabled:g,patternInputFocused:P,filterablePlaceholder:v,label:C,selected:w,showTagsPanel:M,isComposing:Q,counterRef:b,counterWrapperRef:A,patternInputMirrorRef:h,patternInputRef:_,selfRef:W,multipleElRef:i,singleElRef:k,patternInputWrapperRef:R,overflowRef:m,inputTagElRef:x,handleMouseDown:Re,handleFocusin:ce,handleClear:te,handleMouseEnter:Se,handleMouseLeave:ne,handleDeleteOption:Z,handlePatternKeyDown:Me,handlePatternInputInput:Pe,handlePatternInputBlur:ee,handlePatternInputFocus:ve,handleMouseEnterCounter:$e,handleMouseLeaveCounter:ke,handleFocusout:he,handleCompositionEnd:fe,handleCompositionStart:Ie,onPopoverUpdateShow:Ee,focus:be,focusInput:oe,blur:L,blurInput:_e,updateCounter:Be,getCounter:Ae,getTail:ze,renderLabel:e.renderLabel,cssVars:ge?void 0:de,themeClass:U==null?void 0:U.themeClass,onRender:U==null?void 0:U.onRender}},render(){const{status:e,multiple:S,size:$,disabled:g,filterable:h,maxTagCount:_,bordered:W,clsPrefix:i,ellipsisTagPopoverProps:k,onRender:R,renderTag:b,renderLabel:A}=this;R==null||R();const m=_==="responsive",x=typeof _=="number",M=m||x,P=a(zt,null,{default:()=>a($t,{clsPrefix:i,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var D,I;return(I=(D=this.$slots).arrow)===null||I===void 0?void 0:I.call(D)}})});let E;if(S){const{labelField:D}=this,I=O=>a("div",{class:`${i}-base-selection-tag-wrapper`,key:O.value},b?b({option:O,handleClose:()=>{this.handleDeleteOption(O)}}):a(Le,{size:$,closable:!O.disabled,disabled:g,onClose:()=>{this.handleDeleteOption(O)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>A?A(O,!0):Oe(O[D],O,!0)})),v=()=>(x?this.selectedOptions.slice(0,_):this.selectedOptions).map(I),C=h?a("div",{class:`${i}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},a("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:g,value:this.pattern,autofocus:this.autofocus,class:`${i}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),a("span",{ref:"patternInputMirrorRef",class:`${i}-base-selection-input-tag__mirror`},this.pattern)):null,w=m?()=>a("div",{class:`${i}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},a(Le,{size:$,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:g})):void 0;let V;if(x){const O=this.selectedOptions.length-_;O>0&&(V=a("div",{class:`${i}-base-selection-tag-wrapper`,key:"__counter__"},a(Le,{size:$,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:g},{default:()=>`+${O}`})))}const B=m?h?a(Ze,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:v,counter:w,tail:()=>C}):a(Ze,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:v,counter:w}):x&&V?v().concat(V):v(),H=M?()=>a("div",{class:`${i}-base-selection-popover`},m?v():this.selectedOptions.map(I)):void 0,G=M?Object.assign({show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},k):null,J=(this.selected?!1:this.active?!this.pattern&&!this.isComposing:!0)?a("div",{class:`${i}-base-selection-placeholder ${i}-base-selection-overlay`},a("div",{class:`${i}-base-selection-placeholder__inner`},this.placeholder)):null,X=h?a("div",{ref:"patternInputWrapperRef",class:`${i}-base-selection-tags`},B,m?null:C,P):a("div",{ref:"multipleElRef",class:`${i}-base-selection-tags`,tabindex:g?void 0:0},B,P);E=a(kt,null,M?a(Et,Object.assign({},G,{scrollable:!0,style:"max-height: calc(var(--v-target-height) * 6.6);"}),{trigger:()=>X,default:H}):X,J)}else if(h){const D=this.pattern||this.isComposing,I=this.active?!D:!this.selected,v=this.active?!1:this.selected;E=a("div",{ref:"patternInputWrapperRef",class:`${i}-base-selection-label`,title:this.patternInputFocused?void 0:Xe(this.label)},a("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${i}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:g,disabled:g,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),v?a("div",{class:`${i}-base-selection-label__render-label ${i}-base-selection-overlay`,key:"input"},a("div",{class:`${i}-base-selection-overlay__wrapper`},b?b({option:this.selectedOption,handleClose:()=>{}}):A?A(this.selectedOption,!0):Oe(this.label,this.selectedOption,!0))):null,I?a("div",{class:`${i}-base-selection-placeholder ${i}-base-selection-overlay`,key:"placeholder"},a("div",{class:`${i}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,P)}else E=a("div",{ref:"singleElRef",class:`${i}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?a("div",{class:`${i}-base-selection-input`,title:Xe(this.label),key:"input"},a("div",{class:`${i}-base-selection-input__content`},b?b({option:this.selectedOption,handleClose:()=>{}}):A?A(this.selectedOption,!0):Oe(this.label,this.selectedOption,!0))):a("div",{class:`${i}-base-selection-placeholder ${i}-base-selection-overlay`,key:"placeholder"},a("div",{class:`${i}-base-selection-placeholder__inner`},this.placeholder)),P);return a("div",{ref:"selfRef",class:[`${i}-base-selection`,this.rtlEnabled&&`${i}-base-selection--rtl`,this.themeClass,e&&`${i}-base-selection--${e}-status`,{[`${i}-base-selection--active`]:this.active,[`${i}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${i}-base-selection--disabled`]:this.disabled,[`${i}-base-selection--multiple`]:this.multiple,[`${i}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},E,W?a("div",{class:`${i}-base-selection__border`}):null,W?a("div",{class:`${i}-base-selection__state-border`}):null)}}),cn=ue([p("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),p("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Lt({originalTransition:"background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"})])]),hn=Object.assign(Object.assign({},Te.props),{to:Ke.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},childrenField:{type:String,default:"children"},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},onChange:[Function,Array],items:Array}),bn=He({name:"Select",props:hn,slots:Object,setup(e){const{mergedClsPrefixRef:S,mergedBorderedRef:$,namespaceRef:g,inlineThemeDisabled:h}=nt(e),_=Te("Select","-select",cn,Qt,e,S),W=f(e.defaultValue),i=ie(e,"value"),k=Ye(i,W),R=f(!1),b=f(""),A=Yt(e,["items","options"]),m=f([]),x=f([]),M=z(()=>x.value.concat(m.value).concat(A.value)),P=z(()=>{const{filter:t}=e;if(t)return t;const{labelField:o,valueField:r}=e;return(c,d)=>{if(!d)return!1;const s=d[o];if(typeof s=="string")return Ue(c,s);const u=d[r];return typeof u=="string"?Ue(c,u):typeof u=="number"?Ue(c,String(u)):!1}}),E=z(()=>{if(e.remote)return A.value;{const{value:t}=M,{value:o}=b;return!o.length||!e.filterable?t:Xt(t,P.value,o,e.childrenField)}}),D=z(()=>{const{valueField:t,childrenField:o}=e,r=en(t,o);return Zt(E.value,r)}),I=z(()=>tn(M.value,e.valueField,e.childrenField)),v=f(!1),C=Ye(ie(e,"show"),v),w=f(null),V=f(null),B=f(null),{localeRef:H}=nn("Select"),G=z(()=>{var t;return(t=e.placeholder)!==null&&t!==void 0?t:H.value.placeholder}),j=[],J=f(new Map),X=z(()=>{const{fallbackOption:t}=e;if(t===void 0){const{labelField:o,valueField:r}=e;return c=>({[o]:String(c),[r]:c})}return t===!1?!1:o=>Object.assign(t(o),{value:o})});function O(t){const o=e.remote,{value:r}=J,{value:c}=I,{value:d}=X,s=[];return t.forEach(u=>{if(c.has(u))s.push(c.get(u));else if(o&&r.has(u))s.push(r.get(u));else if(d){const F=d(u);F&&s.push(F)}}),s}const ce=z(()=>{if(e.multiple){const{value:t}=k;return Array.isArray(t)?O(t):[]}return null}),he=z(()=>{const{value:t}=k;return!e.multiple&&!Array.isArray(t)?t===null?null:O([t])[0]||null:null}),te=on(e),{mergedSizeRef:Se,mergedDisabledRef:ne,mergedStatusRef:Re}=te;function Z(t,o){const{onChange:r,"onUpdate:value":c,onUpdateValue:d}=e,{nTriggerFormChange:s,nTriggerFormInput:u}=te;r&&K(r,t,o),d&&K(d,t,o),c&&K(c,t,o),W.value=t,s(),u()}function Q(t){const{onBlur:o}=e,{nTriggerFormBlur:r}=te;o&&K(o,t),r()}function Me(){const{onClear:t}=e;t&&K(t)}function ae(t){const{onFocus:o,showOnFocus:r}=e,{nTriggerFormFocus:c}=te;o&&K(o,t),c(),r&&ee()}function Pe(t){const{onSearch:o}=e;o&&K(o,t)}function Ie(t){const{onScroll:o}=e;o&&K(o,t)}function fe(){var t;const{remote:o,multiple:r}=e;if(o){const{value:c}=J;if(r){const{valueField:d}=e;(t=ce.value)===null||t===void 0||t.forEach(s=>{c.set(s[d],s)})}else{const d=he.value;d&&c.set(d[e.valueField],d)}}}function ve(t){const{onUpdateShow:o,"onUpdate:show":r}=e;o&&K(o,t),r&&K(r,t),v.value=t}function ee(){ne.value||(ve(!0),v.value=!0,e.filterable&&we())}function L(){ve(!1)}function be(){b.value="",x.value=j}const oe=f(!1);function _e(){e.filterable&&(oe.value=!0)}function Be(){e.filterable&&(oe.value=!1,C.value||be())}function Ae(){ne.value||(C.value?e.filterable?we():L():ee())}function ze(t){var o,r;!((r=(o=B.value)===null||o===void 0?void 0:o.selfRef)===null||r===void 0)&&r.contains(t.relatedTarget)||(R.value=!1,Q(t),L())}function re(t){ae(t),R.value=!0}function se(){R.value=!0}function $e(t){var o;!((o=w.value)===null||o===void 0)&&o.$el.contains(t.relatedTarget)||(R.value=!1,Q(t),L())}function ke(){var t;(t=w.value)===null||t===void 0||t.focus(),L()}function Ee(t){var o;C.value&&(!((o=w.value)===null||o===void 0)&&o.$el.contains(an(t))||L())}function ge(t){if(!Array.isArray(t))return[];if(X.value)return Array.from(t);{const{remote:o}=e,{value:r}=I;if(o){const{value:c}=J;return t.filter(d=>r.has(d)||c.has(d))}else return t.filter(c=>r.has(c))}}function de(t){U(t.rawNode)}function U(t){if(ne.value)return;const{tag:o,remote:r,clearFilterAfterSelect:c,valueField:d}=e;if(o&&!r){const{value:s}=x,u=s[0]||null;if(u){const F=m.value;F.length?F.push(u):m.value=[u],x.value=j}}if(r&&J.value.set(t[d],t),e.multiple){const s=ge(k.value),u=s.findIndex(F=>F===t[d]);if(~u){if(s.splice(u,1),o&&!r){const F=n(t[d]);~F&&(m.value.splice(F,1),c&&(b.value=""))}}else s.push(t[d]),c&&(b.value="");Z(s,O(s))}else{if(o&&!r){const s=n(t[d]);~s?m.value=[m.value[s]]:m.value=j}me(),L(),Z(t[d],t)}}function n(t){return m.value.findIndex(r=>r[e.valueField]===t)}function l(t){C.value||ee();const{value:o}=t.target;b.value=o;const{tag:r,remote:c}=e;if(Pe(o),r&&!c){if(!o){x.value=j;return}const{onCreate:d}=e,s=d?d(o):{[e.labelField]:o,[e.valueField]:o},{valueField:u,labelField:F}=e;A.value.some(N=>N[u]===s[u]||N[F]===s[F])||m.value.some(N=>N[u]===s[u]||N[F]===s[F])?x.value=j:x.value=[s]}}function y(t){t.stopPropagation();const{multiple:o}=e;!o&&e.filterable&&L(),Me(),o?Z([],[]):Z(null,null)}function De(t){!Ne(t,"action")&&!Ne(t,"empty")&&!Ne(t,"header")&&t.preventDefault()}function We(t){Ie(t)}function pe(t){var o,r,c,d,s;if(!e.keyboard){t.preventDefault();return}switch(t.key){case" ":if(e.filterable)break;t.preventDefault();case"Enter":if(!(!((o=w.value)===null||o===void 0)&&o.isComposing)){if(C.value){const u=(r=B.value)===null||r===void 0?void 0:r.getPendingTmNode();u?de(u):e.filterable||(L(),me())}else if(ee(),e.tag&&oe.value){const u=x.value[0];if(u){const F=u[e.valueField],{value:N}=k;e.multiple&&Array.isArray(N)&&N.includes(F)||U(u)}}}t.preventDefault();break;case"ArrowUp":if(t.preventDefault(),e.loading)return;C.value&&((c=B.value)===null||c===void 0||c.prev());break;case"ArrowDown":if(t.preventDefault(),e.loading)return;C.value?(d=B.value)===null||d===void 0||d.next():ee();break;case"Escape":C.value&&(rn(t),L()),(s=w.value)===null||s===void 0||s.focus();break}}function me(){var t;(t=w.value)===null||t===void 0||t.focus()}function we(){var t;(t=w.value)===null||t===void 0||t.focusInput()}function Ve(){var t;C.value&&((t=V.value)===null||t===void 0||t.syncPosition())}fe(),Fe(ie(e,"options"),fe);const je={focus:()=>{var t;(t=w.value)===null||t===void 0||t.focus()},focusInput:()=>{var t;(t=w.value)===null||t===void 0||t.focusInput()},blur:()=>{var t;(t=w.value)===null||t===void 0||t.blur()},blurInput:()=>{var t;(t=w.value)===null||t===void 0||t.blurInput()}},Ce=z(()=>{const{self:{menuBoxShadow:t}}=_.value;return{"--n-menu-box-shadow":t}}),Y=h?ot("select",void 0,Ce,e):void 0;return Object.assign(Object.assign({},je),{mergedStatus:Re,mergedClsPrefix:S,mergedBordered:$,namespace:g,treeMate:D,isMounted:ln(),triggerRef:w,menuRef:B,pattern:b,uncontrolledShow:v,mergedShow:C,adjustedTo:Ke(e),uncontrolledValue:W,mergedValue:k,followerRef:V,localizedPlaceholder:G,selectedOption:he,selectedOptions:ce,mergedSize:Se,mergedDisabled:ne,focused:R,activeWithoutMenuOpen:oe,inlineThemeDisabled:h,onTriggerInputFocus:_e,onTriggerInputBlur:Be,handleTriggerOrMenuResize:Ve,handleMenuFocus:se,handleMenuBlur:$e,handleMenuTabOut:ke,handleTriggerClick:Ae,handleToggle:de,handleDeleteOption:U,handlePatternInput:l,handleClear:y,handleTriggerBlur:ze,handleTriggerFocus:re,handleKeydown:pe,handleMenuAfterLeave:be,handleMenuClickOutside:Ee,handleMenuScroll:We,handleMenuKeydown:pe,handleMenuMousedown:De,mergedTheme:_,cssVars:h?void 0:Ce,themeClass:Y==null?void 0:Y.themeClass,onRender:Y==null?void 0:Y.onRender})},render(){return a("div",{class:`${this.mergedClsPrefix}-select`},a(Ut,null,{default:()=>[a(Nt,null,{default:()=>a(un,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,S;return[(S=(e=this.$slots).arrow)===null||S===void 0?void 0:S.call(e)]}})}),a(Kt,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===Ke.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>a(Ht,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,S,$;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),qt(a(Jt,Object.assign({},this.menuProps,{ref:"menuRef",onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(S=this.menuProps)===null||S===void 0?void 0:S.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[($=this.menuProps)===null||$===void 0?void 0:$.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange}),{empty:()=>{var g,h;return[(h=(g=this.$slots).empty)===null||h===void 0?void 0:h.call(g)]},header:()=>{var g,h;return[(h=(g=this.$slots).header)===null||h===void 0?void 0:h.call(g)]},action:()=>{var g,h;return[(h=(g=this.$slots).action)===null||h===void 0?void 0:h.call(g)]}}),this.displayDirective==="show"?[[Gt,this.mergedShow],[Qe,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Qe,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}});export{bn as N};
