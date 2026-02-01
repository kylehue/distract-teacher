import{_ as He}from"./layout.vue_vue_type_script_setup_true_lang-Cj1xYnld.js";import{d as D,a8 as x,_ as N,aa as ke,ab as _0,ac as _e,ad as Pe,ae as u0,af as Ee,ag as Be,z as a0,ah as We,F as C0,ai as Ie,aj as Ne,ak as Oe,t as R,v as $,al as je,am as n,an as u,ao as Z,ap as k,aq as qe,ar as m0,as as P0,at as x0,au as Fe,av as G0,aw as De,ax as E0,ay as Ge,az as y0,a4 as A0,o as U0,a5 as Y,aA as q,aB as Ue,aC as Ke,aD as F,aE as c0,aF as Ye,aG as Xe,aH as Je,aI as Qe,aJ as e1,aK as a1,aL as b0,c as p,g as b,x as n0,y as t0,k as h,A as t1,Y as r1,X as o1,u as n1,aM as B0,r as l1,a7 as f0,e as $0,aN as i1,w as B,h as W,f as z,W as W0,B as I0,j as w0,i as o0,P as N0,aO as s1,aP as d1,N as c1,aQ as b1,aR as f1,aS as u1,R as p1,aT as v1,aU as h1,T as g1,M as m1,aV as x1}from"./index-v4FvHuDo.js";import{G as y1}from"./PhArrowLeft.vue-Dkttttga.js";import{_ as A1}from"./room-status-tag.vue_vue_type_script_setup_true_lang-GPEvLDhs.js";import{N as $1}from"./Badge-C_UpUP6q.js";import"./LayoutContent-DUgE_Jiw.js";import"./attribute-Cz32yFEB.js";const w1=_0(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[_0("&::-webkit-scrollbar",{width:0,height:0})]),L1=D({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=N(null);function t(s){!(s.currentTarget.offsetWidth<s.currentTarget.scrollWidth)||s.deltaY===0||(s.currentTarget.scrollLeft+=s.deltaY+s.deltaX,s.preventDefault())}const l=ke();return w1.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:_e,ssr:l}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...s){var A;(A=e.value)===null||A===void 0||A.scrollTo(...s)}})},render(){return x("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var S1=/\s/;function V1(e){for(var t=e.length;t--&&S1.test(e.charAt(t)););return t}var C1=/^\s+/;function Z1(e){return e&&e.slice(0,V1(e)+1).replace(C1,"")}var O0=NaN,M1=/^[-+]0x[0-9a-f]+$/i,R1=/^0b[01]+$/i,T1=/^0o[0-7]+$/i,z1=parseInt;function j0(e){if(typeof e=="number")return e;if(Pe(e))return O0;if(u0(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=u0(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=Z1(e);var l=R1.test(e);return l||T1.test(e)?z1(e.slice(2),l?2:8):M1.test(e)?O0:+e}var L0=function(){return Ee.Date.now()},H1="Expected a function",k1=Math.max,_1=Math.min;function P1(e,t,l){var c,s,A,o,d,g,m=0,f=!1,M=!1,_=!0;if(typeof e!="function")throw new TypeError(H1);t=j0(t)||0,u0(l)&&(f=!!l.leading,M="maxWait"in l,A=M?k1(j0(l.maxWait)||0,t):A,_="trailing"in l?!!l.trailing:_);function C(y){var H=c,K=s;return c=s=void 0,m=y,o=e.apply(K,H),o}function w(y){return m=y,d=setTimeout(E,t),f?C(y):o}function L(y){var H=y-g,K=y-m,l0=t-H;return M?_1(l0,A-K):l0}function V(y){var H=y-g,K=y-m;return g===void 0||H>=t||H<0||M&&K>=A}function E(){var y=L0();if(V(y))return P(y);d=setTimeout(E,L(y))}function P(y){return d=void 0,_&&c?C(y):(c=s=void 0,o)}function U(){d!==void 0&&clearTimeout(d),m=0,c=g=s=d=void 0}function I(){return d===void 0?o:P(L0())}function S(){var y=L0(),H=V(y);if(c=arguments,s=this,g=y,H){if(d===void 0)return w(g);if(M)return clearTimeout(d),d=setTimeout(E,t),C(g)}return d===void 0&&(d=setTimeout(E,t)),o}return S.cancel=U,S.flush=I,S}var E1="Expected a function";function B1(e,t,l){var c=!0,s=!0;if(typeof e!="function")throw new TypeError(E1);return u0(l)&&(c="leading"in l?!!l.leading:c,s="trailing"in l?!!l.trailing:s),P1(e,t,{leading:c,maxWait:t,trailing:s})}const K0=Be("n-tabs"),W1={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},I1=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},je(W1,["displayDirective"])),p0=D({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:I1,setup(e){const{mergedClsPrefixRef:t,valueRef:l,typeRef:c,closableRef:s,tabStyleRef:A,addTabStyleRef:o,tabClassRef:d,addTabClassRef:g,tabChangeIdRef:m,onBeforeLeaveRef:f,triggerRef:M,handleAdd:_,activateTab:C,handleClose:w}=R(K0);return{trigger:M,mergedClosable:$(()=>{if(e.internalAddable)return!1;const{closable:L}=e;return L===void 0?s.value:L}),style:A,addStyle:o,tabClass:d,addTabClass:g,clsPrefix:t,value:l,type:c,handleClose(L){L.stopPropagation(),!e.disabled&&w(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){_();return}const{name:L}=e,V=++m.id;if(L!==l.value){const{value:E}=f;E?Promise.resolve(E(e.name,l.value)).then(P=>{P&&m.id===V&&C(L)}):C(L)}}}},render(){const{internalAddable:e,clsPrefix:t,name:l,disabled:c,label:s,tab:A,value:o,mergedClosable:d,trigger:g,$slots:{default:m}}=this,f=s??A;return x("div",{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?x("div",{class:`${t}-tabs-tab-pad`}):null,x("div",Object.assign({key:l,"data-name":l,"data-disabled":c?!0:void 0},a0({class:[`${t}-tabs-tab`,o===l&&`${t}-tabs-tab--active`,c&&`${t}-tabs-tab--disabled`,d&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:g==="click"?this.activateTab:void 0,onMouseenter:g==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),x("span",{class:`${t}-tabs-tab__label`},e?x(C0,null,x("div",{class:`${t}-tabs-tab__height-placeholder`}," "),x(Ie,{clsPrefix:t},{default:()=>x(Ne,null)})):m?m():typeof f=="object"?f:We(f??l)),d&&this.type==="card"?x(Oe,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:c}):null))}}),N1=n("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[u("segment-type",[n("tabs-rail",[Z("&.transition-disabled",[n("tabs-capsule",`
 transition: none;
 `)])])]),u("top",[n("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),u("left",[n("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),u("left, right",`
 flex-direction: row;
 `,[n("tabs-bar",`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),n("tabs-tab",`
 padding: var(--n-tab-padding-vertical); 
 `)]),u("right",`
 flex-direction: row-reverse;
 `,[n("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),n("tabs-bar",`
 left: 0;
 `)]),u("bottom",`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[n("tab-pane",`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),n("tabs-bar",`
 top: 0;
 `)]),n("tabs-rail",`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[n("tabs-capsule",`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),n("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[n("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[u("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),Z("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),u("flex",[n("tabs-nav",`
 width: 100%;
 position: relative;
 `,[n("tabs-wrapper",`
 width: 100%;
 `,[n("tabs-tab",`
 margin-right: 0;
 `)])])]),n("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[k("prefix, suffix",`
 display: flex;
 align-items: center;
 `),k("prefix","padding-right: 16px;"),k("suffix","padding-left: 16px;")]),u("top, bottom",[Z(">",[n("tabs-nav",[n("tabs-nav-scroll-wrapper",[Z("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),Z("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),u("shadow-start",[Z("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),u("shadow-end",[Z("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),u("left, right",[n("tabs-nav-scroll-content",`
 flex-direction: column;
 `),Z(">",[n("tabs-nav",[n("tabs-nav-scroll-wrapper",[Z("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),Z("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),u("shadow-start",[Z("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),u("shadow-end",[Z("&::after",`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),n("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[n("tabs-nav-y-scroll",`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[Z("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `)]),Z("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),n("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),n("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),n("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),n("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[u("disabled",{cursor:"not-allowed"}),k("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),k("label",`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),n("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[Z("&.transition-disabled",`
 transition: none;
 `),u("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),n("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),n("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[Z("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),Z("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),Z("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),Z("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),Z("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),n("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),u("line-type, bar-type",[n("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[Z("&:hover",{color:"var(--n-tab-text-color-hover)"}),u("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),u("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),n("tabs-nav",[u("line-type",[u("top",[k("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 bottom: -1px;
 `)]),u("left",[k("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 right: -1px;
 `)]),u("right",[k("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 left: -1px;
 `)]),u("bottom",[k("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 top: -1px;
 `)]),k("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),n("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),n("tabs-bar",`
 border-radius: 0;
 `)]),u("card-type",[k("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),n("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),n("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 `),n("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[u("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[k("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),qe("disabled",[Z("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),u("closable","padding-right: 8px;"),u("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),u("disabled","color: var(--n-tab-text-color-disabled);")])]),u("left, right",`
 flex-direction: column; 
 `,[k("prefix, suffix",`
 padding: var(--n-tab-padding-vertical);
 `),n("tabs-wrapper",`
 flex-direction: column;
 `),n("tabs-tab-wrapper",`
 flex-direction: column;
 `,[n("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),u("top",[u("card-type",[n("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),k("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[u("active",`
 border-bottom: 1px solid #0000;
 `)]),n("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),u("left",[u("card-type",[n("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),k("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[u("active",`
 border-right: 1px solid #0000;
 `)]),n("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),u("right",[u("card-type",[n("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),k("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[u("active",`
 border-left: 1px solid #0000;
 `)]),n("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),u("bottom",[u("card-type",[n("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),k("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),n("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[u("active",`
 border-top: 1px solid #0000;
 `)]),n("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),n("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),S0=B1,O1=Object.assign(Object.assign({},G0.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),j1=D({name:"Tabs",props:O1,slots:Object,setup(e,{slots:t}){var l,c,s,A;const{mergedClsPrefixRef:o,inlineThemeDisabled:d}=Fe(e),g=G0("Tabs","-tabs",N1,De,e,o),m=N(null),f=N(null),M=N(null),_=N(null),C=N(null),w=N(null),L=N(!0),V=N(!0),E=E0(e,["labelSize","size"]),P=E0(e,["activeName","value"]),U=N((c=(l=P.value)!==null&&l!==void 0?l:e.defaultValue)!==null&&c!==void 0?c:t.default?(A=(s=m0(t.default())[0])===null||s===void 0?void 0:s.props)===null||A===void 0?void 0:A.name:null),I=Ge(P,U),S={id:0},y=$(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});y0(I,()=>{S.id=0,i0(),M0()});function H(){var a;const{value:r}=I;return r===null?null:(a=m.value)===null||a===void 0?void 0:a.querySelector(`[data-name="${r}"]`)}function K(a){if(e.type==="card")return;const{value:r}=f;if(!r)return;const i=r.style.opacity==="0";if(a){const v=`${o.value}-tabs-bar--disabled`,{barWidth:T,placement:O}=e;if(a.dataset.disabled==="true"?r.classList.add(v):r.classList.remove(v),["top","bottom"].includes(O)){if(Z0(["top","maxHeight","height"]),typeof T=="number"&&a.offsetWidth>=T){const j=Math.floor((a.offsetWidth-T)/2)+a.offsetLeft;r.style.left=`${j}px`,r.style.maxWidth=`${T}px`}else r.style.left=`${a.offsetLeft}px`,r.style.maxWidth=`${a.offsetWidth}px`;r.style.width="8192px",i&&(r.style.transition="none"),r.offsetWidth,i&&(r.style.transition="",r.style.opacity="1")}else{if(Z0(["left","maxWidth","width"]),typeof T=="number"&&a.offsetHeight>=T){const j=Math.floor((a.offsetHeight-T)/2)+a.offsetTop;r.style.top=`${j}px`,r.style.maxHeight=`${T}px`}else r.style.top=`${a.offsetTop}px`,r.style.maxHeight=`${a.offsetHeight}px`;r.style.height="8192px",i&&(r.style.transition="none"),r.offsetHeight,i&&(r.style.transition="",r.style.opacity="1")}}}function l0(){if(e.type==="card")return;const{value:a}=f;a&&(a.style.opacity="0")}function Z0(a){const{value:r}=f;if(r)for(const i of a)r.style[i]=""}function i0(){if(e.type==="card")return;const a=H();a?K(a):l0()}function M0(){var a;const r=(a=C.value)===null||a===void 0?void 0:a.$el;if(!r)return;const i=H();if(!i)return;const{scrollLeft:v,offsetWidth:T}=r,{offsetLeft:O,offsetWidth:j}=i;v>O?r.scrollTo({top:0,left:O,behavior:"smooth"}):O+j>v+T&&r.scrollTo({top:0,left:O+j-T,behavior:"smooth"})}const s0=N(null);let v0=0,G=null;function Y0(a){const r=s0.value;if(r){v0=a.getBoundingClientRect().height;const i=`${v0}px`,v=()=>{r.style.height=i,r.style.maxHeight=i};G?(v(),G(),G=null):G=v}}function X0(a){const r=s0.value;if(r){const i=a.getBoundingClientRect().height,v=()=>{document.body.offsetHeight,r.style.maxHeight=`${i}px`,r.style.height=`${Math.max(v0,i)}px`};G?(G(),G=null,v()):G=v}}function J0(){const a=s0.value;if(a){a.style.maxHeight="",a.style.height="";const{paneWrapperStyle:r}=e;if(typeof r=="string")a.style.cssText=r;else if(r){const{maxHeight:i,height:v}=r;i!==void 0&&(a.style.maxHeight=i),v!==void 0&&(a.style.height=v)}}}const R0={value:[]},T0=N("next");function Q0(a){const r=I.value;let i="next";for(const v of R0.value){if(v===r)break;if(v===a){i="prev";break}}T0.value=i,ee(a)}function ee(a){const{onActiveNameChange:r,onUpdateValue:i,"onUpdate:value":v}=e;r&&b0(r,a),i&&b0(i,a),v&&b0(v,a),U.value=a}function ae(a){const{onClose:r}=e;r&&b0(r,a)}function z0(){const{value:a}=f;if(!a)return;const r="transition-disabled";a.classList.add(r),i0(),a.classList.remove(r)}const X=N(null);function h0({transitionDisabled:a}){const r=m.value;if(!r)return;a&&r.classList.add("transition-disabled");const i=H();i&&X.value&&(X.value.style.width=`${i.offsetWidth}px`,X.value.style.height=`${i.offsetHeight}px`,X.value.style.transform=`translateX(${i.offsetLeft-Xe(getComputedStyle(r).paddingLeft)}px)`,a&&X.value.offsetWidth),a&&r.classList.remove("transition-disabled")}y0([I],()=>{e.type==="segment"&&A0(()=>{h0({transitionDisabled:!1})})}),U0(()=>{e.type==="segment"&&h0({transitionDisabled:!0})});let H0=0;function te(a){var r;if(a.contentRect.width===0&&a.contentRect.height===0||H0===a.contentRect.width)return;H0=a.contentRect.width;const{type:i}=e;if((i==="line"||i==="bar")&&z0(),i!=="segment"){const{placement:v}=e;g0((v==="top"||v==="bottom"?(r=C.value)===null||r===void 0?void 0:r.$el:w.value)||null)}}const re=S0(te,64);y0([()=>e.justifyContent,()=>e.size],()=>{A0(()=>{const{type:a}=e;(a==="line"||a==="bar")&&z0()})});const J=N(!1);function oe(a){var r;const{target:i,contentRect:{width:v,height:T}}=a,O=i.parentElement.parentElement.offsetWidth,j=i.parentElement.parentElement.offsetHeight,{placement:e0}=e;if(!J.value)e0==="top"||e0==="bottom"?O<v&&(J.value=!0):j<T&&(J.value=!0);else{const{value:r0}=_;if(!r0)return;e0==="top"||e0==="bottom"?O-v>r0.$el.offsetWidth&&(J.value=!1):j-T>r0.$el.offsetHeight&&(J.value=!1)}g0(((r=C.value)===null||r===void 0?void 0:r.$el)||null)}const ne=S0(oe,64);function le(){const{onAdd:a}=e;a&&a(),A0(()=>{const r=H(),{value:i}=C;!r||!i||i.scrollTo({left:r.offsetLeft,top:0,behavior:"smooth"})})}function g0(a){if(!a)return;const{placement:r}=e;if(r==="top"||r==="bottom"){const{scrollLeft:i,scrollWidth:v,offsetWidth:T}=a;L.value=i<=0,V.value=i+T>=v}else{const{scrollTop:i,scrollHeight:v,offsetHeight:T}=a;L.value=i<=0,V.value=i+T>=v}}const ie=S0(a=>{g0(a.target)},64);Y(K0,{triggerRef:q(e,"trigger"),tabStyleRef:q(e,"tabStyle"),tabClassRef:q(e,"tabClass"),addTabStyleRef:q(e,"addTabStyle"),addTabClassRef:q(e,"addTabClass"),paneClassRef:q(e,"paneClass"),paneStyleRef:q(e,"paneStyle"),mergedClsPrefixRef:o,typeRef:q(e,"type"),closableRef:q(e,"closable"),valueRef:I,tabChangeIdRef:S,onBeforeLeaveRef:q(e,"onBeforeLeave"),activateTab:Q0,handleClose:ae,handleAdd:le}),Ue(()=>{i0(),M0()}),Ke(()=>{const{value:a}=M;if(!a)return;const{value:r}=o,i=`${r}-tabs-nav-scroll-wrapper--shadow-start`,v=`${r}-tabs-nav-scroll-wrapper--shadow-end`;L.value?a.classList.remove(i):a.classList.add(i),V.value?a.classList.remove(v):a.classList.add(v)});const se={syncBarPosition:()=>{i0()}},de=()=>{h0({transitionDisabled:!0})},k0=$(()=>{const{value:a}=E,{type:r}=e,i={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[r],v=`${a}${i}`,{self:{barColor:T,closeIconColor:O,closeIconColorHover:j,closeIconColorPressed:e0,tabColor:r0,tabBorderColor:ce,paneTextColor:be,tabFontWeight:fe,tabBorderRadius:ue,tabFontWeightActive:pe,colorSegment:ve,fontWeightStrong:he,tabColorSegment:ge,closeSize:me,closeIconSize:xe,closeColorHover:ye,closeColorPressed:Ae,closeBorderRadius:$e,[F("panePadding",a)]:d0,[F("tabPadding",v)]:we,[F("tabPaddingVertical",v)]:Le,[F("tabGap",v)]:Se,[F("tabGap",`${v}Vertical`)]:Ve,[F("tabTextColor",r)]:Ce,[F("tabTextColorActive",r)]:Ze,[F("tabTextColorHover",r)]:Me,[F("tabTextColorDisabled",r)]:Re,[F("tabFontSize",a)]:Te},common:{cubicBezierEaseInOut:ze}}=g.value;return{"--n-bezier":ze,"--n-color-segment":ve,"--n-bar-color":T,"--n-tab-font-size":Te,"--n-tab-text-color":Ce,"--n-tab-text-color-active":Ze,"--n-tab-text-color-disabled":Re,"--n-tab-text-color-hover":Me,"--n-pane-text-color":be,"--n-tab-border-color":ce,"--n-tab-border-radius":ue,"--n-close-size":me,"--n-close-icon-size":xe,"--n-close-color-hover":ye,"--n-close-color-pressed":Ae,"--n-close-border-radius":$e,"--n-close-icon-color":O,"--n-close-icon-color-hover":j,"--n-close-icon-color-pressed":e0,"--n-tab-color":r0,"--n-tab-font-weight":fe,"--n-tab-font-weight-active":pe,"--n-tab-padding":we,"--n-tab-padding-vertical":Le,"--n-tab-gap":Se,"--n-tab-gap-vertical":Ve,"--n-pane-padding-left":c0(d0,"left"),"--n-pane-padding-right":c0(d0,"right"),"--n-pane-padding-top":c0(d0,"top"),"--n-pane-padding-bottom":c0(d0,"bottom"),"--n-font-weight-strong":he,"--n-tab-color-segment":ge}}),Q=d?Ye("tabs",$(()=>`${E.value[0]}${e.type[0]}`),k0,e):void 0;return Object.assign({mergedClsPrefix:o,mergedValue:I,renderedNames:new Set,segmentCapsuleElRef:X,tabsPaneWrapperRef:s0,tabsElRef:m,barElRef:f,addTabInstRef:_,xScrollInstRef:C,scrollWrapperElRef:M,addTabFixed:J,tabWrapperStyle:y,handleNavResize:re,mergedSize:E,handleScroll:ie,handleTabsResize:ne,cssVars:d?void 0:k0,themeClass:Q==null?void 0:Q.themeClass,animationDirection:T0,renderNameListRef:R0,yScrollElRef:w,handleSegmentResize:de,onAnimationBeforeLeave:Y0,onAnimationEnter:X0,onAnimationAfterEnter:J0,onRender:Q==null?void 0:Q.onRender},se)},render(){const{mergedClsPrefix:e,type:t,placement:l,addTabFixed:c,addable:s,mergedSize:A,renderNameListRef:o,onRender:d,paneWrapperClass:g,paneWrapperStyle:m,$slots:{default:f,prefix:M,suffix:_}}=this;d==null||d();const C=f?m0(f()).filter(S=>S.type.__TAB_PANE__===!0):[],w=f?m0(f()).filter(S=>S.type.__TAB__===!0):[],L=!w.length,V=t==="card",E=t==="segment",P=!V&&!E&&this.justifyContent;o.value=[];const U=()=>{const S=x("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},P?null:x("div",{class:`${e}-tabs-scroll-padding`,style:l==="top"||l==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),L?C.map((y,H)=>(o.value.push(y.props.name),V0(x(p0,Object.assign({},y.props,{internalCreatedByPane:!0,internalLeftPadded:H!==0&&(!P||P==="center"||P==="start"||P==="end")}),y.children?{default:y.children.tab}:void 0)))):w.map((y,H)=>(o.value.push(y.props.name),V0(H!==0&&!P?D0(y):y))),!c&&s&&V?F0(s,(L?C.length:w.length)!==0):null,P?null:x("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return x("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},V&&s?x(x0,{onResize:this.handleTabsResize},{default:()=>S}):S,V?x("div",{class:`${e}-tabs-pad`}):null,V?null:x("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},I=E?"top":l;return x("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${A}-size`,P&&`${e}-tabs--flex`,`${e}-tabs--${I}`],style:this.cssVars},x("div",{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${I}`,`${e}-tabs-nav`]},P0(M,S=>S&&x("div",{class:`${e}-tabs-nav__prefix`},S)),E?x(x0,{onResize:this.handleSegmentResize},{default:()=>x("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},x("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},x("div",{class:`${e}-tabs-wrapper`},x("div",{class:`${e}-tabs-tab`}))),L?C.map((S,y)=>(o.value.push(S.props.name),x(p0,Object.assign({},S.props,{internalCreatedByPane:!0,internalLeftPadded:y!==0}),S.children?{default:S.children.tab}:void 0))):w.map((S,y)=>(o.value.push(S.props.name),y===0?S:D0(S))))}):x(x0,{onResize:this.handleNavResize},{default:()=>x("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(I)?x(L1,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:U}):x("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},U()))}),c&&s&&V?F0(s,!0):null,P0(_,S=>S&&x("div",{class:`${e}-tabs-nav__suffix`},S))),L&&(this.animated&&(I==="top"||I==="bottom")?x("div",{ref:"tabsPaneWrapperRef",style:m,class:[`${e}-tabs-pane-wrapper`,g]},q0(C,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):q0(C,this.mergedValue,this.renderedNames)))}});function q0(e,t,l,c,s,A,o){const d=[];return e.forEach(g=>{const{name:m,displayDirective:f,"display-directive":M}=g.props,_=w=>f===w||M===w,C=t===m;if(g.key!==void 0&&(g.key=m),C||_("show")||_("show:lazy")&&l.has(m)){l.has(m)||l.add(m);const w=!_("if");d.push(w?Je(g,[[Qe,C]]):g)}}),o?x(e1,{name:`${o}-transition`,onBeforeLeave:c,onEnter:s,onAfterEnter:A},{default:()=>d}):d}function F0(e,t){return x(p0,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e=="object"&&e.disabled})}function D0(e){const t=a1(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function V0(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const q1=["width","height","fill","transform"],F1={key:0},D1=h("path",{d:"M128,76a52,52,0,1,0,52,52A52.06,52.06,0,0,0,128,76Zm0,80a28,28,0,1,1,28-28A28,28,0,0,1,128,156Zm92-27.21v-1.58l14-17.51a12,12,0,0,0,2.23-10.59A111.75,111.75,0,0,0,225,71.89,12,12,0,0,0,215.89,66L193.61,63.5l-1.11-1.11L190,40.1A12,12,0,0,0,184.11,31a111.67,111.67,0,0,0-27.23-11.27A12,12,0,0,0,146.3,22L128.79,36h-1.58L109.7,22a12,12,0,0,0-10.59-2.23A111.75,111.75,0,0,0,71.89,31.05,12,12,0,0,0,66,40.11L63.5,62.39,62.39,63.5,40.1,66A12,12,0,0,0,31,71.89,111.67,111.67,0,0,0,19.77,99.12,12,12,0,0,0,22,109.7l14,17.51v1.58L22,146.3a12,12,0,0,0-2.23,10.59,111.75,111.75,0,0,0,11.29,27.22A12,12,0,0,0,40.11,190l22.28,2.48,1.11,1.11L66,215.9A12,12,0,0,0,71.89,225a111.67,111.67,0,0,0,27.23,11.27A12,12,0,0,0,109.7,234l17.51-14h1.58l17.51,14a12,12,0,0,0,10.59,2.23A111.75,111.75,0,0,0,184.11,225a12,12,0,0,0,5.91-9.06l2.48-22.28,1.11-1.11L215.9,190a12,12,0,0,0,9.06-5.91,111.67,111.67,0,0,0,11.27-27.23A12,12,0,0,0,234,146.3Zm-24.12-4.89a70.1,70.1,0,0,1,0,8.2,12,12,0,0,0,2.61,8.22l12.84,16.05A86.47,86.47,0,0,1,207,166.86l-20.43,2.27a12,12,0,0,0-7.65,4,69,69,0,0,1-5.8,5.8,12,12,0,0,0-4,7.65L166.86,207a86.47,86.47,0,0,1-10.49,4.35l-16.05-12.85a12,12,0,0,0-7.5-2.62c-.24,0-.48,0-.72,0a70.1,70.1,0,0,1-8.2,0,12.06,12.06,0,0,0-8.22,2.6L99.63,211.33A86.47,86.47,0,0,1,89.14,207l-2.27-20.43a12,12,0,0,0-4-7.65,69,69,0,0,1-5.8-5.8,12,12,0,0,0-7.65-4L49,166.86a86.47,86.47,0,0,1-4.35-10.49l12.84-16.05a12,12,0,0,0,2.61-8.22,70.1,70.1,0,0,1,0-8.2,12,12,0,0,0-2.61-8.22L44.67,99.63A86.47,86.47,0,0,1,49,89.14l20.43-2.27a12,12,0,0,0,7.65-4,69,69,0,0,1,5.8-5.8,12,12,0,0,0,4-7.65L89.14,49a86.47,86.47,0,0,1,10.49-4.35l16.05,12.85a12.06,12.06,0,0,0,8.22,2.6,70.1,70.1,0,0,1,8.2,0,12,12,0,0,0,8.22-2.6l16.05-12.85A86.47,86.47,0,0,1,166.86,49l2.27,20.43a12,12,0,0,0,4,7.65,69,69,0,0,1,5.8,5.8,12,12,0,0,0,7.65,4L207,89.14a86.47,86.47,0,0,1,4.35,10.49l-12.84,16.05A12,12,0,0,0,195.88,123.9Z"},null,-1),G1=[D1],U1={key:1},K1=h("path",{d:"M207.86,123.18l16.78-21a99.14,99.14,0,0,0-10.07-24.29l-26.7-3a81,81,0,0,0-6.81-6.81l-3-26.71a99.43,99.43,0,0,0-24.3-10l-21,16.77a81.59,81.59,0,0,0-9.64,0l-21-16.78A99.14,99.14,0,0,0,77.91,41.43l-3,26.7a81,81,0,0,0-6.81,6.81l-26.71,3a99.43,99.43,0,0,0-10,24.3l16.77,21a81.59,81.59,0,0,0,0,9.64l-16.78,21a99.14,99.14,0,0,0,10.07,24.29l26.7,3a81,81,0,0,0,6.81,6.81l3,26.71a99.43,99.43,0,0,0,24.3,10l21-16.77a81.59,81.59,0,0,0,9.64,0l21,16.78a99.14,99.14,0,0,0,24.29-10.07l3-26.7a81,81,0,0,0,6.81-6.81l26.71-3a99.43,99.43,0,0,0,10-24.3l-16.77-21A81.59,81.59,0,0,0,207.86,123.18ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z",opacity:"0.2"},null,-1),Y1=h("path",{d:"M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8.06,8.06,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8.06,8.06,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"},null,-1),X1=[K1,Y1],J1={key:2},Q1=h("path",{d:"M216,130.16q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"},null,-1),ea=[Q1],aa={key:3},ta=h("path",{d:"M128,82a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162ZM214,130.84c.06-1.89.06-3.79,0-5.68L229.33,106a6,6,0,0,0,1.11-5.29A105.34,105.34,0,0,0,219.76,74.9a6,6,0,0,0-4.53-3l-24.45-2.71q-1.93-2.07-4-4l-2.72-24.46a6,6,0,0,0-3-4.53,105.65,105.65,0,0,0-25.77-10.66A6,6,0,0,0,150,26.68l-19.2,15.37c-1.89-.06-3.79-.06-5.68,0L106,26.67a6,6,0,0,0-5.29-1.11A105.34,105.34,0,0,0,74.9,36.24a6,6,0,0,0-3,4.53L69.23,65.22q-2.07,1.94-4,4L40.76,72a6,6,0,0,0-4.53,3,105.65,105.65,0,0,0-10.66,25.77A6,6,0,0,0,26.68,106l15.37,19.2c-.06,1.89-.06,3.79,0,5.68L26.67,150.05a6,6,0,0,0-1.11,5.29A105.34,105.34,0,0,0,36.24,181.1a6,6,0,0,0,4.53,3l24.45,2.71q1.94,2.07,4,4L72,215.24a6,6,0,0,0,3,4.53,105.65,105.65,0,0,0,25.77,10.66,6,6,0,0,0,5.29-1.11L125.16,214c1.89.06,3.79.06,5.68,0l19.21,15.38a6,6,0,0,0,3.75,1.31,6.2,6.2,0,0,0,1.54-.2,105.34,105.34,0,0,0,25.76-10.68,6,6,0,0,0,3-4.53l2.71-24.45q2.07-1.93,4-4l24.46-2.72a6,6,0,0,0,4.53-3,105.49,105.49,0,0,0,10.66-25.77,6,6,0,0,0-1.11-5.29Zm-3.1,41.63-23.64,2.63a6,6,0,0,0-3.82,2,75.14,75.14,0,0,1-6.31,6.31,6,6,0,0,0-2,3.82l-2.63,23.63A94.28,94.28,0,0,1,155.14,218l-18.57-14.86a6,6,0,0,0-3.75-1.31h-.36a78.07,78.07,0,0,1-8.92,0,6,6,0,0,0-4.11,1.3L100.87,218a94.13,94.13,0,0,1-17.34-7.17L80.9,187.21a6,6,0,0,0-2-3.82,75.14,75.14,0,0,1-6.31-6.31,6,6,0,0,0-3.82-2l-23.63-2.63A94.28,94.28,0,0,1,38,155.14l14.86-18.57a6,6,0,0,0,1.3-4.11,78.07,78.07,0,0,1,0-8.92,6,6,0,0,0-1.3-4.11L38,100.87a94.13,94.13,0,0,1,7.17-17.34L68.79,80.9a6,6,0,0,0,3.82-2,75.14,75.14,0,0,1,6.31-6.31,6,6,0,0,0,2-3.82l2.63-23.63A94.28,94.28,0,0,1,100.86,38l18.57,14.86a6,6,0,0,0,4.11,1.3,78.07,78.07,0,0,1,8.92,0,6,6,0,0,0,4.11-1.3L155.13,38a94.13,94.13,0,0,1,17.34,7.17l2.63,23.64a6,6,0,0,0,2,3.82,75.14,75.14,0,0,1,6.31,6.31,6,6,0,0,0,3.82,2l23.63,2.63A94.28,94.28,0,0,1,218,100.86l-14.86,18.57a6,6,0,0,0-1.3,4.11,78.07,78.07,0,0,1,0,8.92,6,6,0,0,0,1.3,4.11L218,155.13A94.13,94.13,0,0,1,210.85,172.47Z"},null,-1),ra=[ta],oa={key:4},na=h("path",{d:"M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"},null,-1),la=[na],ia={key:5},sa=h("path",{d:"M128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36,36,0,0,1,128,164Zm83.93-32.49q.13-3.51,0-7l15.83-19.79a4,4,0,0,0,.75-3.53A103.64,103.64,0,0,0,218,75.9a4,4,0,0,0-3-2l-25.19-2.8c-1.58-1.71-3.24-3.37-4.95-4.95L182.07,41a4,4,0,0,0-2-3A104,104,0,0,0,154.82,27.5a4,4,0,0,0-3.53.74L131.51,44.07q-3.51-.14-7,0L104.7,28.24a4,4,0,0,0-3.53-.75A103.64,103.64,0,0,0,75.9,38a4,4,0,0,0-2,3l-2.8,25.19c-1.71,1.58-3.37,3.24-4.95,4.95L41,73.93a4,4,0,0,0-3,2A104,104,0,0,0,27.5,101.18a4,4,0,0,0,.74,3.53l15.83,19.78q-.14,3.51,0,7L28.24,151.3a4,4,0,0,0-.75,3.53A103.64,103.64,0,0,0,38,180.1a4,4,0,0,0,3,2l25.19,2.8c1.58,1.71,3.24,3.37,4.95,4.95l2.8,25.2a4,4,0,0,0,2,3,104,104,0,0,0,25.28,10.46,4,4,0,0,0,3.53-.74l19.78-15.83q3.51.13,7,0l19.79,15.83a4,4,0,0,0,2.5.88,4,4,0,0,0,1-.13A103.64,103.64,0,0,0,180.1,218a4,4,0,0,0,2-3l2.8-25.19c1.71-1.58,3.37-3.24,4.95-4.95l25.2-2.8a4,4,0,0,0,3-2,104,104,0,0,0,10.46-25.28,4,4,0,0,0-.74-3.53Zm.17,42.83-24.67,2.74a4,4,0,0,0-2.55,1.32,76.2,76.2,0,0,1-6.48,6.48,4,4,0,0,0-1.32,2.55l-2.74,24.66a95.45,95.45,0,0,1-19.64,8.15l-19.38-15.51a4,4,0,0,0-2.5-.87h-.24a73.67,73.67,0,0,1-9.16,0,4,4,0,0,0-2.74.87l-19.37,15.5a95.33,95.33,0,0,1-19.65-8.13l-2.74-24.67a4,4,0,0,0-1.32-2.55,76.2,76.2,0,0,1-6.48-6.48,4,4,0,0,0-2.55-1.32l-24.66-2.74a95.45,95.45,0,0,1-8.15-19.64l15.51-19.38a4,4,0,0,0,.87-2.74,77.76,77.76,0,0,1,0-9.16,4,4,0,0,0-.87-2.74l-15.5-19.37A95.33,95.33,0,0,1,43.9,81.66l24.67-2.74a4,4,0,0,0,2.55-1.32,76.2,76.2,0,0,1,6.48-6.48,4,4,0,0,0,1.32-2.55l2.74-24.66a95.45,95.45,0,0,1,19.64-8.15l19.38,15.51a4,4,0,0,0,2.74.87,73.67,73.67,0,0,1,9.16,0,4,4,0,0,0,2.74-.87l19.37-15.5a95.33,95.33,0,0,1,19.65,8.13l2.74,24.67a4,4,0,0,0,1.32,2.55,76.2,76.2,0,0,1,6.48,6.48,4,4,0,0,0,2.55,1.32l24.66,2.74a95.45,95.45,0,0,1,8.15,19.64l-15.51,19.38a4,4,0,0,0-.87,2.74,77.76,77.76,0,0,1,0,9.16,4,4,0,0,0,.87,2.74l15.5,19.37A95.33,95.33,0,0,1,212.1,174.34Z"},null,-1),da=[sa],ca={name:"PhGear"},ba=D({...ca,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const t=e,l=R("weight","regular"),c=R("size","1em"),s=R("color","currentColor"),A=R("mirrored",!1),o=$(()=>t.weight??l),d=$(()=>t.size??c),g=$(()=>t.color??s),m=$(()=>t.mirrored!==void 0?t.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(f,M)=>(b(),p("svg",a0({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:d.value,height:d.value,fill:g.value,transform:m.value},f.$attrs),[n0(f.$slots,"default"),o.value==="bold"?(b(),p("g",F1,G1)):o.value==="duotone"?(b(),p("g",U1,X1)):o.value==="fill"?(b(),p("g",J1,ea)):o.value==="light"?(b(),p("g",aa,ra)):o.value==="regular"?(b(),p("g",oa,la)):o.value==="thin"?(b(),p("g",ia,da)):t0("",!0)],16,q1))}}),fa=["width","height","fill","transform"],ua={key:0},pa=h("path",{d:"M222.14,105.85l-80-80a20,20,0,0,0-28.28,0l-80,80A19.86,19.86,0,0,0,28,120v96a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V164h24v52a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V120A19.86,19.86,0,0,0,222.14,105.85ZM204,204H164V152a12,12,0,0,0-12-12H104a12,12,0,0,0-12,12v52H52V121.65l76-76,76,76Z"},null,-1),va=[pa],ha={key:1},ga=h("path",{d:"M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z",opacity:"0.2"},null,-1),ma=h("path",{d:"M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"},null,-1),xa=[ga,ma],ya={key:2},Aa=h("path",{d:"M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"},null,-1),$a=[Aa],wa={key:3},La=h("path",{d:"M217.9,110.1l-80-80a14,14,0,0,0-19.8,0l-80,80A13.92,13.92,0,0,0,34,120v96a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V158h36v58a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V120A13.92,13.92,0,0,0,217.9,110.1ZM210,210H158V152a6,6,0,0,0-6-6H104a6,6,0,0,0-6,6v58H46V120a2,2,0,0,1,.58-1.42l80-80a2,2,0,0,1,2.84,0l80,80A2,2,0,0,1,210,120Z"},null,-1),Sa=[La],Va={key:4},Ca=h("path",{d:"M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"},null,-1),Za=[Ca],Ma={key:5},Ra=h("path",{d:"M216.49,111.51l-80-80a12,12,0,0,0-17,0l-80,80A12,12,0,0,0,36,120v96a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V156h40v60a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V120A12,12,0,0,0,216.49,111.51ZM212,212H156V152a4,4,0,0,0-4-4H104a4,4,0,0,0-4,4v60H44V120a4,4,0,0,1,1.17-2.83l80-80a4,4,0,0,1,5.66,0l80,80A4,4,0,0,1,212,120Z"},null,-1),Ta=[Ra],za={name:"PhHouse"},Ha=D({...za,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const t=e,l=R("weight","regular"),c=R("size","1em"),s=R("color","currentColor"),A=R("mirrored",!1),o=$(()=>t.weight??l),d=$(()=>t.size??c),g=$(()=>t.color??s),m=$(()=>t.mirrored!==void 0?t.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(f,M)=>(b(),p("svg",a0({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:d.value,height:d.value,fill:g.value,transform:m.value},f.$attrs),[n0(f.$slots,"default"),o.value==="bold"?(b(),p("g",ua,va)):o.value==="duotone"?(b(),p("g",ha,xa)):o.value==="fill"?(b(),p("g",ya,$a)):o.value==="light"?(b(),p("g",wa,Sa)):o.value==="regular"?(b(),p("g",Va,Za)):o.value==="thin"?(b(),p("g",Ma,Ta)):t0("",!0)],16,fa))}}),ka=["width","height","fill","transform"],_a={key:0},Pa=h("path",{d:"M229.7,82.84l-175.94-54-.16-.05A20,20,0,0,0,28,48V192a20,20,0,0,0,19.94,20,20.38,20.38,0,0,0,5.66-.81l.16,0,78.24-24V196a20,20,0,0,0,20,20h32a20,20,0,0,0,20-20V165.06l25.7-7.89A20.1,20.1,0,0,0,244,138V102A20.1,20.1,0,0,0,229.7,82.84ZM52,186.58V53.43L132,78V162ZM180,192H156V179.78l24-7.36Zm40-56.95-64,19.63V85.33L220,105Z"},null,-1),Ea=[Pa],Ba={key:1},Wa=h("path",{d:"M144,69.09V170.91L50.24,199.67A8,8,0,0,1,40,192V48a8,8,0,0,1,10.24-7.67Z",opacity:"0.2"},null,-1),Ia=h("path",{d:"M228.54,86.66l-176.06-54A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16,16,16,0,0,0,4.52-.65L136,181.73V192a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16v-29.9l28.54-8.75A16.09,16.09,0,0,0,240,138V102A16.09,16.09,0,0,0,228.54,86.66ZM136,165,48,192V48l88,27Zm48,27H152V176.82L184,167Zm40-54-.11,0L152,160.08V79.92l71.89,22,.11,0v36Z"},null,-1),Na=[Wa,Ia],Oa={key:2},ja=h("path",{d:"M228.54,86.66l-176.06-54A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16,16,16,0,0,0,4.52-.65L136,181.73V192a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16v-29.9l28.54-8.75A16.09,16.09,0,0,0,240,138V102A16.09,16.09,0,0,0,228.54,86.66ZM184,192H152V176.82L184,167Zm40-54-.11,0L152,160.08V79.91L223.89,102l.11,0v36Z"},null,-1),qa=[ja],Fa={key:3},Da=h("path",{d:"M228,88.59l-176.08-54A14,14,0,0,0,34,48V192a14,14,0,0,0,14,14,14.59,14.59,0,0,0,4-.59L138,179v13a14,14,0,0,0,14,14h32a14,14,0,0,0,14-14V160.62l30-9.19A14.07,14.07,0,0,0,238,138V102A14,14,0,0,0,228,88.59ZM48.56,193.92a2,2,0,0,1-1.76-.32A2,2,0,0,1,46,192V48a2,2,0,0,1,.8-1.6A2.05,2.05,0,0,1,48,46a1.79,1.79,0,0,1,.49.08L138,73.53v92.95ZM186,192a2,2,0,0,1-2,2H152a2,2,0,0,1-2-2V175.35l36-11Zm40-54a2,2,0,0,1-1.44,1.92l-.08,0L150,162.8V77.21l74.56,22.87A2,2,0,0,1,226,102Z"},null,-1),Ga=[Da],Ua={key:4},Ka=h("path",{d:"M228.54,86.66l-176.06-54A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16,16,16,0,0,0,4.52-.65L136,181.73V192a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16v-29.9l28.54-8.75A16.09,16.09,0,0,0,240,138V102A16.09,16.09,0,0,0,228.54,86.66ZM136,165,48,192V48l88,27Zm48,27H152V176.82L184,167Zm40-54-.11,0L152,160.08V79.92l71.89,22,.11,0v36Z"},null,-1),Ya=[Ka],Xa={key:5},Ja=h("path",{d:"M227.41,90.5l-176-54A12,12,0,0,0,36,48V192a12,12,0,0,0,12,12,12.41,12.41,0,0,0,3.45-.5L140,176.32V192a12,12,0,0,0,12,12h32a12,12,0,0,0,12-12V159.14l31.39-9.63A12.06,12.06,0,0,0,236,138V102A12,12,0,0,0,227.41,90.5ZM49.12,195.84A4,4,0,0,1,44,192V48a4,4,0,0,1,1.6-3.2A4,4,0,0,1,48,44a3.89,3.89,0,0,1,1.07.15L140,72.05V168ZM188,192a4,4,0,0,1-4,4H152a4,4,0,0,1-4-4V173.87l40-12.27Zm40-54a4,4,0,0,1-2.88,3.84l-.05,0L148,165.5v-91l77.12,23.66A4,4,0,0,1,228,102Z"},null,-1),Qa=[Ja],et={name:"PhMegaphoneSimple"},at=D({...et,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const t=e,l=R("weight","regular"),c=R("size","1em"),s=R("color","currentColor"),A=R("mirrored",!1),o=$(()=>t.weight??l),d=$(()=>t.size??c),g=$(()=>t.color??s),m=$(()=>t.mirrored!==void 0?t.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(f,M)=>(b(),p("svg",a0({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:d.value,height:d.value,fill:g.value,transform:m.value},f.$attrs),[n0(f.$slots,"default"),o.value==="bold"?(b(),p("g",_a,Ea)):o.value==="duotone"?(b(),p("g",Ba,Na)):o.value==="fill"?(b(),p("g",Oa,qa)):o.value==="light"?(b(),p("g",Fa,Ga)):o.value==="regular"?(b(),p("g",Ua,Ya)):o.value==="thin"?(b(),p("g",Xa,Qa)):t0("",!0)],16,ka))}}),tt=["width","height","fill","transform"],rt={key:0},ot=h("path",{d:"M228,40V76a12,12,0,0,1-24,0V52H180a12,12,0,0,1,0-24h36A12,12,0,0,1,228,40ZM216,168a12,12,0,0,0-12,12v24H180a12,12,0,0,0,0,24h36a12,12,0,0,0,12-12V180A12,12,0,0,0,216,168ZM76,204H52V180a12,12,0,0,0-24,0v36a12,12,0,0,0,12,12H76a12,12,0,0,0,0-24ZM40,88A12,12,0,0,0,52,76V52H76a12,12,0,0,0,0-24H40A12,12,0,0,0,28,40V76A12,12,0,0,0,40,88Zm136,92a12,12,0,0,1-9.6-4.79,48,48,0,0,0-76.82,0,12,12,0,0,1-19.18-14.42,72.1,72.1,0,0,1,23.92-20.5,44,44,0,1,1,67.34,0,72.1,72.1,0,0,1,23.92,20.5A12,12,0,0,1,176,180Zm-48-48a20,20,0,1,0-20-20A20,20,0,0,0,128,132Z"},null,-1),nt=[ot],lt={key:1},it=h("path",{d:"M160,112a32,32,0,1,1-32-32A32,32,0,0,1,160,112Z",opacity:"0.2"},null,-1),st=h("path",{d:"M224,40V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h36A8,8,0,0,1,224,40Zm-8,132a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h36a8,8,0,0,0,8-8V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v36a8,8,0,0,0,8,8H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V76A8,8,0,0,0,40,84Zm136,92a8,8,0,0,1-6.41-3.19,52,52,0,0,0-83.2,0,8,8,0,1,1-12.8-9.62A67.94,67.94,0,0,1,101,141.51a40,40,0,1,1,53.94,0,67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,176,176Zm-48-40a24,24,0,1,0-24-24A24,24,0,0,0,128,136Z"},null,-1),dt=[it,st],ct={key:2},bt=h("path",{d:"M224,40V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h36A8,8,0,0,1,224,40Zm-8,132a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h36a8,8,0,0,0,8-8V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v36a8,8,0,0,0,8,8H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V76A8,8,0,0,0,40,84Zm61,57.51A67.94,67.94,0,0,0,73.6,163.19,8,8,0,0,0,80,176h96a8,8,0,0,0,6.4-12.81A67.94,67.94,0,0,0,155,141.51a40,40,0,1,0-53.94,0Z"},null,-1),ft=[bt],ut={key:3},pt=h("path",{d:"M222,40V76a6,6,0,0,1-12,0V46H180a6,6,0,0,1,0-12h36A6,6,0,0,1,222,40Zm-6,134a6,6,0,0,0-6,6v30H180a6,6,0,0,0,0,12h36a6,6,0,0,0,6-6V180A6,6,0,0,0,216,174ZM76,210H46V180a6,6,0,0,0-12,0v36a6,6,0,0,0,6,6H76a6,6,0,0,0,0-12ZM40,82a6,6,0,0,0,6-6V46H76a6,6,0,0,0,0-12H40a6,6,0,0,0-6,6V76A6,6,0,0,0,40,82Zm136,92a6,6,0,0,1-4.8-2.4,54,54,0,0,0-86.4,0,6,6,0,1,1-9.6-7.2,65.65,65.65,0,0,1,29.69-22.26,38,38,0,1,1,46.22,0A65.65,65.65,0,0,1,180.8,164.4,6,6,0,0,1,176,174Zm-48-36a26,26,0,1,0-26-26A26,26,0,0,0,128,138Z"},null,-1),vt=[pt],ht={key:4},gt=h("path",{d:"M224,40V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h36A8,8,0,0,1,224,40Zm-8,132a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h36a8,8,0,0,0,8-8V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v36a8,8,0,0,0,8,8H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V76A8,8,0,0,0,40,84Zm136,92a8,8,0,0,1-6.41-3.19,52,52,0,0,0-83.2,0,8,8,0,1,1-12.8-9.62A67.94,67.94,0,0,1,101,141.51a40,40,0,1,1,53.94,0,67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,176,176Zm-48-40a24,24,0,1,0-24-24A24,24,0,0,0,128,136Z"},null,-1),mt=[gt],xt={key:5},yt=h("path",{d:"M220,40V76a4,4,0,0,1-8,0V44H180a4,4,0,0,1,0-8h36A4,4,0,0,1,220,40Zm-4,136a4,4,0,0,0-4,4v32H180a4,4,0,0,0,0,8h36a4,4,0,0,0,4-4V180A4,4,0,0,0,216,176ZM76,212H44V180a4,4,0,0,0-8,0v36a4,4,0,0,0,4,4H76a4,4,0,0,0,0-8ZM40,80a4,4,0,0,0,4-4V44H76a4,4,0,0,0,0-8H40a4,4,0,0,0-4,4V76A4,4,0,0,0,40,80Zm136,92a4,4,0,0,1-3.2-1.6,56,56,0,0,0-89.6,0,4,4,0,1,1-6.4-4.8,63.65,63.65,0,0,1,32.5-22.85,36,36,0,1,1,37.4,0,63.65,63.65,0,0,1,32.5,22.85A4,4,0,0,1,176,172Zm-48-32a28,28,0,1,0-28-28A28,28,0,0,0,128,140Z"},null,-1),At=[yt],$t={name:"PhUserFocus"},wt=D({...$t,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const t=e,l=R("weight","regular"),c=R("size","1em"),s=R("color","currentColor"),A=R("mirrored",!1),o=$(()=>t.weight??l),d=$(()=>t.size??c),g=$(()=>t.color??s),m=$(()=>t.mirrored!==void 0?t.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(f,M)=>(b(),p("svg",a0({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:d.value,height:d.value,fill:g.value,transform:m.value},f.$attrs),[n0(f.$slots,"default"),o.value==="bold"?(b(),p("g",rt,nt)):o.value==="duotone"?(b(),p("g",lt,dt)):o.value==="fill"?(b(),p("g",ct,ft)):o.value==="light"?(b(),p("g",ut,vt)):o.value==="regular"?(b(),p("g",ht,mt)):o.value==="thin"?(b(),p("g",xt,At)):t0("",!0)],16,tt))}}),Lt=["width","height","fill","transform"],St={key:0},Vt=h("path",{d:"M125.18,156.94a64,64,0,1,0-82.36,0,100.23,100.23,0,0,0-39.49,32,12,12,0,0,0,19.35,14.2,76,76,0,0,1,122.64,0,12,12,0,0,0,19.36-14.2A100.33,100.33,0,0,0,125.18,156.94ZM44,108a40,40,0,1,1,40,40A40,40,0,0,1,44,108Zm206.1,97.67a12,12,0,0,1-16.78-2.57A76.31,76.31,0,0,0,172,172a12,12,0,0,1,0-24,40,40,0,1,0-10.3-78.67,12,12,0,1,1-6.16-23.19,64,64,0,0,1,57.64,110.8,100.23,100.23,0,0,1,39.49,32A12,12,0,0,1,250.1,205.67Z"},null,-1),Ct=[Vt],Zt={key:1},Mt=h("path",{d:"M136,108A52,52,0,1,1,84,56,52,52,0,0,1,136,108Z",opacity:"0.2"},null,-1),Rt=h("path",{d:"M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"},null,-1),Tt=[Mt,Rt],zt={key:2},Ht=h("path",{d:"M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"},null,-1),kt=[Ht],_t={key:3},Pt=h("path",{d:"M112.6,158.43a58,58,0,1,0-57.2,0A93.83,93.83,0,0,0,5.21,196.72a6,6,0,0,0,10.05,6.56,82,82,0,0,1,137.48,0,6,6,0,0,0,10-6.56A93.83,93.83,0,0,0,112.6,158.43ZM38,108a46,46,0,1,1,46,46A46.06,46.06,0,0,1,38,108Zm211,97a6,6,0,0,1-8.3-1.74A81.8,81.8,0,0,0,172,166a6,6,0,0,1,0-12,46,46,0,1,0-17.08-88.73,6,6,0,1,1-4.46-11.14,58,58,0,0,1,50.14,104.3,93.83,93.83,0,0,1,50.19,38.29A6,6,0,0,1,249,205Z"},null,-1),Et=[Pt],Bt={key:4},Wt=h("path",{d:"M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"},null,-1),It=[Wt],Nt={key:5},Ot=h("path",{d:"M107.19,159a56,56,0,1,0-46.38,0A91.83,91.83,0,0,0,6.88,197.81a4,4,0,1,0,6.7,4.37,84,84,0,0,1,140.84,0,4,4,0,1,0,6.7-4.37A91.83,91.83,0,0,0,107.19,159ZM36,108a48,48,0,1,1,48,48A48.05,48.05,0,0,1,36,108Zm212,95.35a4,4,0,0,1-5.53-1.17A83.81,83.81,0,0,0,172,164a4,4,0,0,1,0-8,48,48,0,1,0-17.82-92.58,4,4,0,1,1-3-7.43,56,56,0,0,1,44,103,91.83,91.83,0,0,1,53.93,38.86A4,4,0,0,1,248,203.35Z"},null,-1),jt=[Ot],qt={name:"PhUsers"},Ft=D({...qt,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const t=e,l=R("weight","regular"),c=R("size","1em"),s=R("color","currentColor"),A=R("mirrored",!1),o=$(()=>t.weight??l),d=$(()=>t.size??c),g=$(()=>t.color??s),m=$(()=>t.mirrored!==void 0?t.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(f,M)=>(b(),p("svg",a0({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:d.value,height:d.value,fill:g.value,transform:m.value},f.$attrs),[n0(f.$slots,"default"),o.value==="bold"?(b(),p("g",St,Ct)):o.value==="duotone"?(b(),p("g",Zt,Tt)):o.value==="fill"?(b(),p("g",zt,kt)):o.value==="light"?(b(),p("g",_t,Et)):o.value==="regular"?(b(),p("g",Bt,It)):o.value==="thin"?(b(),p("g",Nt,jt)):t0("",!0)],16,Lt))}}),Dt={class:"flex items-center gap-2"},Gt={key:0,class:"flex items-center justify-center w-full h-full"},Ut={key:0,class:"flex gap-2 items-center"},Kt={key:1,class:"flex gap-2 items-center"},Yt={class:"flex gap-2 items-center"},Xt={class:"py-4"},nr=D({__name:"layout",setup(e){const t=t1(),l=r1(),c=o1(),s=n1(),A=d1(),o=$(()=>c.allRooms.get(l.params.roomId)??null),d=$(()=>{var w;return B0(c.monitorLogsGroupedByRoomId,(w=o.value)==null?void 0:w.id,new Map)}),g=$(()=>{var w;return B0(c.studentsGroupedByRoomId,(w=o.value)==null?void 0:w.id,new Map)}),m=$(()=>Array.from(d.value.values())),f=$(()=>Array.from(g.value.values())),M=$(()=>s.teacher),_=l1([{name:"Overview",key:"overview",icon:f0(Ha)},{name:"Monitoring",key:"monitoring",icon:f0(wt),badgeValue:$(()=>f.value.filter(w=>w.permitted&&!!w.lockMonitorLogId).length)},{name:"Students",key:"students",icon:f0(Ft),badgeValue:$(()=>f.value.filter(w=>!w.permitted&&w.active).length)},{name:"Settings",key:"settings",icon:f0(ba)}]),C=$(()=>l.path.split("/").pop()||"overview");return U0(()=>{c.loadRoom(l.params.roomId),window.$store=c}),Y(p1,o),Y(v1,d),Y(h1,g),Y(g1,M),Y(m1,m),Y(x1,f),(w,L)=>(b(),$0(He,{"no-divider":""},i1({default:B(()=>[o.value?(b(),p(C0,{key:1},[W(z(j1),{type:"card",value:C.value,"onUpdate:value":z(t).push},{default:B(()=>[(b(!0),p(C0,null,b1(_,V=>(b(),$0(z(p0),{key:V.key,name:V.key},{default:B(()=>[W(z($1),{value:V.badgeValue,offset:[6,-3]},{default:B(()=>[W(z(W0),{to:V.key},{default:B(()=>[h("div",Yt,[V.icon?(b(),$0(f1(V.icon),{key:0})):t0("",!0),o0(" "+N0(V.name),1)])]),_:2},1032,["to"])]),_:2},1032,["value"])]),_:2},1032,["name"]))),128))]),_:1},8,["value","onUpdate:value"]),h("div",Xt,[W(z(u1))])],64)):(b(),p("div",Gt,[z(c).isLoadRoomLoading?(b(),p("div",Ut,[W(z(c1)),W(z(w0),null,{default:B(()=>[...L[2]||(L[2]=[o0("Loading...",-1)])]),_:1})])):(b(),p("div",Kt,[W(z(w0),null,{default:B(()=>[...L[3]||(L[3]=[o0("Room not found",-1)])]),_:1})]))]))]),_:2},[o.value?{name:"header",fn:B(()=>[h("div",Dt,[W(z(W0),{to:"/dashboard/rooms"},{default:B(()=>[W(z(I0),{circle:"",quaternary:""},{icon:B(()=>[W(z(y1))]),_:1})]),_:1}),W(z(w0),{strong:"",class:"text-lg"},{default:B(()=>[o0(N0(o.value.title),1)]),_:1}),W(A1,{room:o.value},null,8,["room"])])]),key:"0"}:void 0,o.value?{name:"header-extra",fn:B(()=>[W(z(s1),null,{trigger:B(()=>[W(z(I0),{circle:"",onClick:L[0]||(L[0]=V=>z(A).show(o.value))},{icon:B(()=>[W(z(at))]),_:1})]),default:B(()=>[L[1]||(L[1]=o0(" Announce to students ",-1))]),_:1})]),key:"1"}:void 0]),1024))}});export{nr as default};
