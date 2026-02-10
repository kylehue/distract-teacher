import{_ as E1}from"./layout.vue_vue_type_script_setup_true_lang-CkFLjh0M.js";import{d as O,C as w,a5 as j,ae as W1,af as B0,ag as I1,ah as N1,ai as h0,aj as j1,ak as O1,z as K,al as q1,F as M0,am as D1,an as F1,ao as G1,t as V,v as g,ap as U1,aq as n,ar as y,as as k,at as N,au as K1,av as A0,aw as E0,ax as $0,ay as Y1,az as J0,aA as X1,aB as W0,aC as J1,aD as w0,a9 as V0,o as Q0,aa as J,aE as F,aF as Q1,aG as ee,aH as G,aI as f0,aJ as ae,aK as te,aL as re,aM as oe,aN as ne,aO as le,aP as b0,c as s,g as l,x as Q,y as Y,j as d,H as ie,a3 as se,A as de,u as ce,a as ue,aQ as I0,r as fe,ac as e0,b as L0,e as p0,aR as be,w as M,h as C,f as Z,R as N0,B as i0,N as j0,i as a0,a1 as O0,aS as v0,k as pe,aT as ve,_ as he,aU as ge,aV as me,aW as ye,W as xe,aX as Ae,T as $e,X as we,M as Ve,aY as Le,aZ as Ze}from"./index-BbVH41cT.js";import{G as He}from"./PhArrowLeft.vue-CJWa4pgx.js";import{_ as Se}from"./room-status-tag.vue_vue_type_script_setup_true_lang-CTo4xL2M.js";import{N as Me}from"./Badge-CcpAI_eZ.js";import"./LayoutContent-CewTOK9Z.js";import"./attribute-Cz32yFEB.js";const Ce=B0(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[B0("&::-webkit-scrollbar",{width:0,height:0})]),ke=O({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=j(null);function a(c){!(c.currentTarget.offsetWidth<c.currentTarget.scrollWidth)||c.deltaY===0||(c.currentTarget.scrollLeft+=c.deltaY+c.deltaX,c.preventDefault())}const i=W1();return Ce.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:I1,ssr:i}),Object.assign({selfRef:e,handleWheel:a},{scrollTo(...c){var x;(x=e.value)===null||x===void 0||x.scrollTo(...c)}})},render(){return w("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var ze=/\s/;function Te(e){for(var a=e.length;a--&&ze.test(e.charAt(a)););return a}var Re=/^\s+/;function _e(e){return e&&e.slice(0,Te(e)+1).replace(Re,"")}var q0=NaN,Pe=/^[-+]0x[0-9a-f]+$/i,Be=/^0b[01]+$/i,Ee=/^0o[0-7]+$/i,We=parseInt;function D0(e){if(typeof e=="number")return e;if(N1(e))return q0;if(h0(e)){var a=typeof e.valueOf=="function"?e.valueOf():e;e=h0(a)?a+"":a}if(typeof e!="string")return e===0?e:+e;e=_e(e);var i=Be.test(e);return i||Ee.test(e)?We(e.slice(2),i?2:8):Pe.test(e)?q0:+e}var Z0=function(){return j1.Date.now()},Ie="Expected a function",Ne=Math.max,je=Math.min;function Oe(e,a,i){var v,c,x,t,u,b,m=0,h=!1,H=!1,P=!0;if(typeof e!="function")throw new TypeError(Ie);a=D0(a)||0,h0(i)&&(h=!!i.leading,H="maxWait"in i,x=H?Ne(D0(i.maxWait)||0,a):x,P="trailing"in i?!!i.trailing:P);function S(f){var A=v,_=c;return v=c=void 0,m=f,t=e.apply(_,A),t}function B(f){return m=f,u=setTimeout(W,a),h?S(f):t}function z(f){var A=f-b,_=f-m,s0=a-A;return H?je(s0,x-_):s0}function E(f){var A=f-b,_=f-m;return b===void 0||A>=a||A<0||H&&_>=x}function W(){var f=Z0();if(E(f))return R(f);u=setTimeout(W,z(f))}function R(f){return u=void 0,P&&v?S(f):(v=c=void 0,t)}function U(){u!==void 0&&clearTimeout(u),m=0,v=b=c=u=void 0}function I(){return u===void 0?t:R(Z0())}function L(){var f=Z0(),A=E(f);if(v=arguments,c=this,b=f,A){if(u===void 0)return B(b);if(H)return clearTimeout(u),u=setTimeout(W,a),S(b)}return u===void 0&&(u=setTimeout(W,a)),t}return L.cancel=U,L.flush=I,L}var qe="Expected a function";function De(e,a,i){var v=!0,c=!0;if(typeof e!="function")throw new TypeError(qe);return h0(i)&&(v="leading"in i?!!i.leading:v,c="trailing"in i?!!i.trailing:c),Oe(e,a,{leading:v,maxWait:a,trailing:c})}const e1=O1("n-tabs"),Fe={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Ge=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},U1(Fe,["displayDirective"])),g0=O({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:Ge,setup(e){const{mergedClsPrefixRef:a,valueRef:i,typeRef:v,closableRef:c,tabStyleRef:x,addTabStyleRef:t,tabClassRef:u,addTabClassRef:b,tabChangeIdRef:m,onBeforeLeaveRef:h,triggerRef:H,handleAdd:P,activateTab:S,handleClose:B}=V(e1);return{trigger:H,mergedClosable:g(()=>{if(e.internalAddable)return!1;const{closable:z}=e;return z===void 0?c.value:z}),style:x,addStyle:t,tabClass:u,addTabClass:b,clsPrefix:a,value:i,type:v,handleClose(z){z.stopPropagation(),!e.disabled&&B(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){P();return}const{name:z}=e,E=++m.id;if(z!==i.value){const{value:W}=h;W?Promise.resolve(W(e.name,i.value)).then(R=>{R&&m.id===E&&S(z)}):S(z)}}}},render(){const{internalAddable:e,clsPrefix:a,name:i,disabled:v,label:c,tab:x,value:t,mergedClosable:u,trigger:b,$slots:{default:m}}=this,h=c??x;return w("div",{class:`${a}-tabs-tab-wrapper`},this.internalLeftPadded?w("div",{class:`${a}-tabs-tab-pad`}):null,w("div",Object.assign({key:i,"data-name":i,"data-disabled":v?!0:void 0},K({class:[`${a}-tabs-tab`,t===i&&`${a}-tabs-tab--active`,v&&`${a}-tabs-tab--disabled`,u&&`${a}-tabs-tab--closable`,e&&`${a}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:b==="click"?this.activateTab:void 0,onMouseenter:b==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),w("span",{class:`${a}-tabs-tab__label`},e?w(M0,null,w("div",{class:`${a}-tabs-tab__height-placeholder`}," "),w(D1,{clsPrefix:a},{default:()=>w(F1,null)})):m?m():typeof h=="object"?h:q1(h??i)),u&&this.type==="card"?w(G1,{clsPrefix:a,class:`${a}-tabs-tab__close`,onClick:this.handleClose,disabled:v}):null))}}),Ue=n("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[y("segment-type",[n("tabs-rail",[k("&.transition-disabled",[n("tabs-capsule",`
 transition: none;
 `)])])]),y("top",[n("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),y("left",[n("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),y("left, right",`
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
 `)]),y("right",`
 flex-direction: row-reverse;
 `,[n("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),n("tabs-bar",`
 left: 0;
 `)]),y("bottom",`
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
 `,[y("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),k("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),y("flex",[n("tabs-nav",`
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
 `,[N("prefix, suffix",`
 display: flex;
 align-items: center;
 `),N("prefix","padding-right: 16px;"),N("suffix","padding-left: 16px;")]),y("top, bottom",[k(">",[n("tabs-nav",[n("tabs-nav-scroll-wrapper",[k("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),k("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),y("shadow-start",[k("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),y("shadow-end",[k("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),y("left, right",[n("tabs-nav-scroll-content",`
 flex-direction: column;
 `),k(">",[n("tabs-nav",[n("tabs-nav-scroll-wrapper",[k("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),k("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),y("shadow-start",[k("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),y("shadow-end",[k("&::after",`
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
 `,[k("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `)]),k("&::before, &::after",`
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
 `,[y("disabled",{cursor:"not-allowed"}),N("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),N("label",`
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
 `,[k("&.transition-disabled",`
 transition: none;
 `),y("disabled",`
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
 `,[k("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),k("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),k("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),k("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),k("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),n("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),y("line-type, bar-type",[n("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[k("&:hover",{color:"var(--n-tab-text-color-hover)"}),y("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),y("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),n("tabs-nav",[y("line-type",[y("top",[N("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 bottom: -1px;
 `)]),y("left",[N("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 right: -1px;
 `)]),y("right",[N("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 left: -1px;
 `)]),y("bottom",[N("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 top: -1px;
 `)]),N("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),n("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),n("tabs-bar",`
 border-radius: 0;
 `)]),y("card-type",[N("prefix, suffix",`
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
 `,[y("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[N("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),K1("disabled",[k("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),y("closable","padding-right: 8px;"),y("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),y("disabled","color: var(--n-tab-text-color-disabled);")])]),y("left, right",`
 flex-direction: column; 
 `,[N("prefix, suffix",`
 padding: var(--n-tab-padding-vertical);
 `),n("tabs-wrapper",`
 flex-direction: column;
 `),n("tabs-tab-wrapper",`
 flex-direction: column;
 `,[n("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),y("top",[y("card-type",[n("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),N("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[y("active",`
 border-bottom: 1px solid #0000;
 `)]),n("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),y("left",[y("card-type",[n("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),N("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[y("active",`
 border-right: 1px solid #0000;
 `)]),n("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),y("right",[y("card-type",[n("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),N("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[y("active",`
 border-left: 1px solid #0000;
 `)]),n("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),y("bottom",[y("card-type",[n("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),N("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),n("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[y("active",`
 border-top: 1px solid #0000;
 `)]),n("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),n("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),H0=De,Ke=Object.assign(Object.assign({},J0.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),Ye=O({name:"Tabs",props:Ke,slots:Object,setup(e,{slots:a}){var i,v,c,x;const{mergedClsPrefixRef:t,inlineThemeDisabled:u}=Y1(e),b=J0("Tabs","-tabs",Ue,X1,e,t),m=j(null),h=j(null),H=j(null),P=j(null),S=j(null),B=j(null),z=j(!0),E=j(!0),W=W0(e,["labelSize","size"]),R=W0(e,["activeName","value"]),U=j((v=(i=R.value)!==null&&i!==void 0?i:e.defaultValue)!==null&&v!==void 0?v:a.default?(x=(c=A0(a.default())[0])===null||c===void 0?void 0:c.props)===null||x===void 0?void 0:x.name:null),I=J1(R,U),L={id:0},f=g(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});w0(I,()=>{L.id=0,d0(),k0()});function A(){var r;const{value:o}=I;return o===null?null:(r=m.value)===null||r===void 0?void 0:r.querySelector(`[data-name="${o}"]`)}function _(r){if(e.type==="card")return;const{value:o}=h;if(!o)return;const p=o.style.opacity==="0";if(r){const $=`${t.value}-tabs-bar--disabled`,{barWidth:T,placement:q}=e;if(r.dataset.disabled==="true"?o.classList.add($):o.classList.remove($),["top","bottom"].includes(q)){if(C0(["top","maxHeight","height"]),typeof T=="number"&&r.offsetWidth>=T){const D=Math.floor((r.offsetWidth-T)/2)+r.offsetLeft;o.style.left=`${D}px`,o.style.maxWidth=`${T}px`}else o.style.left=`${r.offsetLeft}px`,o.style.maxWidth=`${r.offsetWidth}px`;o.style.width="8192px",p&&(o.style.transition="none"),o.offsetWidth,p&&(o.style.transition="",o.style.opacity="1")}else{if(C0(["left","maxWidth","width"]),typeof T=="number"&&r.offsetHeight>=T){const D=Math.floor((r.offsetHeight-T)/2)+r.offsetTop;o.style.top=`${D}px`,o.style.maxHeight=`${T}px`}else o.style.top=`${r.offsetTop}px`,o.style.maxHeight=`${r.offsetHeight}px`;o.style.height="8192px",p&&(o.style.transition="none"),o.offsetHeight,p&&(o.style.transition="",o.style.opacity="1")}}}function s0(){if(e.type==="card")return;const{value:r}=h;r&&(r.style.opacity="0")}function C0(r){const{value:o}=h;if(o)for(const p of r)o.style[p]=""}function d0(){if(e.type==="card")return;const r=A();r?_(r):s0()}function k0(){var r;const o=(r=S.value)===null||r===void 0?void 0:r.$el;if(!o)return;const p=A();if(!p)return;const{scrollLeft:$,offsetWidth:T}=o,{offsetLeft:q,offsetWidth:D}=p;$>q?o.scrollTo({top:0,left:q,behavior:"smooth"}):q+D>$+T&&o.scrollTo({top:0,left:q+D-T,behavior:"smooth"})}const c0=j(null);let m0=0,X=null;function a1(r){const o=c0.value;if(o){m0=r.getBoundingClientRect().height;const p=`${m0}px`,$=()=>{o.style.height=p,o.style.maxHeight=p};X?($(),X(),X=null):X=$}}function t1(r){const o=c0.value;if(o){const p=r.getBoundingClientRect().height,$=()=>{document.body.offsetHeight,o.style.maxHeight=`${p}px`,o.style.height=`${Math.max(m0,p)}px`};X?(X(),X=null,$()):X=$}}function r1(){const r=c0.value;if(r){r.style.maxHeight="",r.style.height="";const{paneWrapperStyle:o}=e;if(typeof o=="string")r.style.cssText=o;else if(o){const{maxHeight:p,height:$}=o;p!==void 0&&(r.style.maxHeight=p),$!==void 0&&(r.style.height=$)}}}const z0={value:[]},T0=j("next");function o1(r){const o=I.value;let p="next";for(const $ of z0.value){if($===o)break;if($===r){p="prev";break}}T0.value=p,n1(r)}function n1(r){const{onActiveNameChange:o,onUpdateValue:p,"onUpdate:value":$}=e;o&&b0(o,r),p&&b0(p,r),$&&b0($,r),U.value=r}function l1(r){const{onClose:o}=e;o&&b0(o,r)}function R0(){const{value:r}=h;if(!r)return;const o="transition-disabled";r.classList.add(o),d0(),r.classList.remove(o)}const t0=j(null);function y0({transitionDisabled:r}){const o=m.value;if(!o)return;r&&o.classList.add("transition-disabled");const p=A();p&&t0.value&&(t0.value.style.width=`${p.offsetWidth}px`,t0.value.style.height=`${p.offsetHeight}px`,t0.value.style.transform=`translateX(${p.offsetLeft-te(getComputedStyle(o).paddingLeft)}px)`,r&&t0.value.offsetWidth),r&&o.classList.remove("transition-disabled")}w0([I],()=>{e.type==="segment"&&V0(()=>{y0({transitionDisabled:!1})})}),Q0(()=>{e.type==="segment"&&y0({transitionDisabled:!0})});let _0=0;function i1(r){var o;if(r.contentRect.width===0&&r.contentRect.height===0||_0===r.contentRect.width)return;_0=r.contentRect.width;const{type:p}=e;if((p==="line"||p==="bar")&&R0(),p!=="segment"){const{placement:$}=e;x0(($==="top"||$==="bottom"?(o=S.value)===null||o===void 0?void 0:o.$el:B.value)||null)}}const s1=H0(i1,64);w0([()=>e.justifyContent,()=>e.size],()=>{V0(()=>{const{type:r}=e;(r==="line"||r==="bar")&&R0()})});const r0=j(!1);function d1(r){var o;const{target:p,contentRect:{width:$,height:T}}=r,q=p.parentElement.parentElement.offsetWidth,D=p.parentElement.parentElement.offsetHeight,{placement:n0}=e;if(!r0.value)n0==="top"||n0==="bottom"?q<$&&(r0.value=!0):D<T&&(r0.value=!0);else{const{value:l0}=P;if(!l0)return;n0==="top"||n0==="bottom"?q-$>l0.$el.offsetWidth&&(r0.value=!1):D-T>l0.$el.offsetHeight&&(r0.value=!1)}x0(((o=S.value)===null||o===void 0?void 0:o.$el)||null)}const c1=H0(d1,64);function u1(){const{onAdd:r}=e;r&&r(),V0(()=>{const o=A(),{value:p}=S;!o||!p||p.scrollTo({left:o.offsetLeft,top:0,behavior:"smooth"})})}function x0(r){if(!r)return;const{placement:o}=e;if(o==="top"||o==="bottom"){const{scrollLeft:p,scrollWidth:$,offsetWidth:T}=r;z.value=p<=0,E.value=p+T>=$}else{const{scrollTop:p,scrollHeight:$,offsetHeight:T}=r;z.value=p<=0,E.value=p+T>=$}}const f1=H0(r=>{x0(r.target)},64);J(e1,{triggerRef:F(e,"trigger"),tabStyleRef:F(e,"tabStyle"),tabClassRef:F(e,"tabClass"),addTabStyleRef:F(e,"addTabStyle"),addTabClassRef:F(e,"addTabClass"),paneClassRef:F(e,"paneClass"),paneStyleRef:F(e,"paneStyle"),mergedClsPrefixRef:t,typeRef:F(e,"type"),closableRef:F(e,"closable"),valueRef:I,tabChangeIdRef:L,onBeforeLeaveRef:F(e,"onBeforeLeave"),activateTab:o1,handleClose:l1,handleAdd:u1}),Q1(()=>{d0(),k0()}),ee(()=>{const{value:r}=H;if(!r)return;const{value:o}=t,p=`${o}-tabs-nav-scroll-wrapper--shadow-start`,$=`${o}-tabs-nav-scroll-wrapper--shadow-end`;z.value?r.classList.remove(p):r.classList.add(p),E.value?r.classList.remove($):r.classList.add($)});const b1={syncBarPosition:()=>{d0()}},p1=()=>{y0({transitionDisabled:!0})},P0=g(()=>{const{value:r}=W,{type:o}=e,p={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[o],$=`${r}${p}`,{self:{barColor:T,closeIconColor:q,closeIconColorHover:D,closeIconColorPressed:n0,tabColor:l0,tabBorderColor:v1,paneTextColor:h1,tabFontWeight:g1,tabBorderRadius:m1,tabFontWeightActive:y1,colorSegment:x1,fontWeightStrong:A1,tabColorSegment:$1,closeSize:w1,closeIconSize:V1,closeColorHover:L1,closeColorPressed:Z1,closeBorderRadius:H1,[G("panePadding",r)]:u0,[G("tabPadding",$)]:S1,[G("tabPaddingVertical",$)]:M1,[G("tabGap",$)]:C1,[G("tabGap",`${$}Vertical`)]:k1,[G("tabTextColor",o)]:z1,[G("tabTextColorActive",o)]:T1,[G("tabTextColorHover",o)]:R1,[G("tabTextColorDisabled",o)]:_1,[G("tabFontSize",r)]:P1},common:{cubicBezierEaseInOut:B1}}=b.value;return{"--n-bezier":B1,"--n-color-segment":x1,"--n-bar-color":T,"--n-tab-font-size":P1,"--n-tab-text-color":z1,"--n-tab-text-color-active":T1,"--n-tab-text-color-disabled":_1,"--n-tab-text-color-hover":R1,"--n-pane-text-color":h1,"--n-tab-border-color":v1,"--n-tab-border-radius":m1,"--n-close-size":w1,"--n-close-icon-size":V1,"--n-close-color-hover":L1,"--n-close-color-pressed":Z1,"--n-close-border-radius":H1,"--n-close-icon-color":q,"--n-close-icon-color-hover":D,"--n-close-icon-color-pressed":n0,"--n-tab-color":l0,"--n-tab-font-weight":g1,"--n-tab-font-weight-active":y1,"--n-tab-padding":S1,"--n-tab-padding-vertical":M1,"--n-tab-gap":C1,"--n-tab-gap-vertical":k1,"--n-pane-padding-left":f0(u0,"left"),"--n-pane-padding-right":f0(u0,"right"),"--n-pane-padding-top":f0(u0,"top"),"--n-pane-padding-bottom":f0(u0,"bottom"),"--n-font-weight-strong":A1,"--n-tab-color-segment":$1}}),o0=u?ae("tabs",g(()=>`${W.value[0]}${e.type[0]}`),P0,e):void 0;return Object.assign({mergedClsPrefix:t,mergedValue:I,renderedNames:new Set,segmentCapsuleElRef:t0,tabsPaneWrapperRef:c0,tabsElRef:m,barElRef:h,addTabInstRef:P,xScrollInstRef:S,scrollWrapperElRef:H,addTabFixed:r0,tabWrapperStyle:f,handleNavResize:s1,mergedSize:W,handleScroll:f1,handleTabsResize:c1,cssVars:u?void 0:P0,themeClass:o0==null?void 0:o0.themeClass,animationDirection:T0,renderNameListRef:z0,yScrollElRef:B,handleSegmentResize:p1,onAnimationBeforeLeave:a1,onAnimationEnter:t1,onAnimationAfterEnter:r1,onRender:o0==null?void 0:o0.onRender},b1)},render(){const{mergedClsPrefix:e,type:a,placement:i,addTabFixed:v,addable:c,mergedSize:x,renderNameListRef:t,onRender:u,paneWrapperClass:b,paneWrapperStyle:m,$slots:{default:h,prefix:H,suffix:P}}=this;u==null||u();const S=h?A0(h()).filter(L=>L.type.__TAB_PANE__===!0):[],B=h?A0(h()).filter(L=>L.type.__TAB__===!0):[],z=!B.length,E=a==="card",W=a==="segment",R=!E&&!W&&this.justifyContent;t.value=[];const U=()=>{const L=w("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},R?null:w("div",{class:`${e}-tabs-scroll-padding`,style:i==="top"||i==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),z?S.map((f,A)=>(t.value.push(f.props.name),S0(w(g0,Object.assign({},f.props,{internalCreatedByPane:!0,internalLeftPadded:A!==0&&(!R||R==="center"||R==="start"||R==="end")}),f.children?{default:f.children.tab}:void 0)))):B.map((f,A)=>(t.value.push(f.props.name),S0(A!==0&&!R?U0(f):f))),!v&&c&&E?G0(c,(z?S.length:B.length)!==0):null,R?null:w("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return w("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},E&&c?w($0,{onResize:this.handleTabsResize},{default:()=>L}):L,E?w("div",{class:`${e}-tabs-pad`}):null,E?null:w("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},I=W?"top":i;return w("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${a}-type`,`${e}-tabs--${x}-size`,R&&`${e}-tabs--flex`,`${e}-tabs--${I}`],style:this.cssVars},w("div",{class:[`${e}-tabs-nav--${a}-type`,`${e}-tabs-nav--${I}`,`${e}-tabs-nav`]},E0(H,L=>L&&w("div",{class:`${e}-tabs-nav__prefix`},L)),W?w($0,{onResize:this.handleSegmentResize},{default:()=>w("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},w("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},w("div",{class:`${e}-tabs-wrapper`},w("div",{class:`${e}-tabs-tab`}))),z?S.map((L,f)=>(t.value.push(L.props.name),w(g0,Object.assign({},L.props,{internalCreatedByPane:!0,internalLeftPadded:f!==0}),L.children?{default:L.children.tab}:void 0))):B.map((L,f)=>(t.value.push(L.props.name),f===0?L:U0(L))))}):w($0,{onResize:this.handleNavResize},{default:()=>w("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(I)?w(ke,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:U}):w("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},U()))}),v&&c&&E?G0(c,!0):null,E0(P,L=>L&&w("div",{class:`${e}-tabs-nav__suffix`},L))),z&&(this.animated&&(I==="top"||I==="bottom")?w("div",{ref:"tabsPaneWrapperRef",style:m,class:[`${e}-tabs-pane-wrapper`,b]},F0(S,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):F0(S,this.mergedValue,this.renderedNames)))}});function F0(e,a,i,v,c,x,t){const u=[];return e.forEach(b=>{const{name:m,displayDirective:h,"display-directive":H}=b.props,P=B=>h===B||H===B,S=a===m;if(b.key!==void 0&&(b.key=m),S||P("show")||P("show:lazy")&&i.has(m)){i.has(m)||i.add(m);const B=!P("if");u.push(B?re(b,[[oe,S]]):b)}}),t?w(ne,{name:`${t}-transition`,onBeforeLeave:v,onEnter:c,onAfterEnter:x},{default:()=>u}):u}function G0(e,a){return w(g0,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:a,disabled:typeof e=="object"&&e.disabled})}function U0(e){const a=le(e);return a.props?a.props.internalLeftPadded=!0:a.props={internalLeftPadded:!0},a}function S0(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const Xe=["width","height","fill","transform"],Je={key:0},Qe=d("path",{d:"M128,76a52,52,0,1,0,52,52A52.06,52.06,0,0,0,128,76Zm0,80a28,28,0,1,1,28-28A28,28,0,0,1,128,156Zm92-27.21v-1.58l14-17.51a12,12,0,0,0,2.23-10.59A111.75,111.75,0,0,0,225,71.89,12,12,0,0,0,215.89,66L193.61,63.5l-1.11-1.11L190,40.1A12,12,0,0,0,184.11,31a111.67,111.67,0,0,0-27.23-11.27A12,12,0,0,0,146.3,22L128.79,36h-1.58L109.7,22a12,12,0,0,0-10.59-2.23A111.75,111.75,0,0,0,71.89,31.05,12,12,0,0,0,66,40.11L63.5,62.39,62.39,63.5,40.1,66A12,12,0,0,0,31,71.89,111.67,111.67,0,0,0,19.77,99.12,12,12,0,0,0,22,109.7l14,17.51v1.58L22,146.3a12,12,0,0,0-2.23,10.59,111.75,111.75,0,0,0,11.29,27.22A12,12,0,0,0,40.11,190l22.28,2.48,1.11,1.11L66,215.9A12,12,0,0,0,71.89,225a111.67,111.67,0,0,0,27.23,11.27A12,12,0,0,0,109.7,234l17.51-14h1.58l17.51,14a12,12,0,0,0,10.59,2.23A111.75,111.75,0,0,0,184.11,225a12,12,0,0,0,5.91-9.06l2.48-22.28,1.11-1.11L215.9,190a12,12,0,0,0,9.06-5.91,111.67,111.67,0,0,0,11.27-27.23A12,12,0,0,0,234,146.3Zm-24.12-4.89a70.1,70.1,0,0,1,0,8.2,12,12,0,0,0,2.61,8.22l12.84,16.05A86.47,86.47,0,0,1,207,166.86l-20.43,2.27a12,12,0,0,0-7.65,4,69,69,0,0,1-5.8,5.8,12,12,0,0,0-4,7.65L166.86,207a86.47,86.47,0,0,1-10.49,4.35l-16.05-12.85a12,12,0,0,0-7.5-2.62c-.24,0-.48,0-.72,0a70.1,70.1,0,0,1-8.2,0,12.06,12.06,0,0,0-8.22,2.6L99.63,211.33A86.47,86.47,0,0,1,89.14,207l-2.27-20.43a12,12,0,0,0-4-7.65,69,69,0,0,1-5.8-5.8,12,12,0,0,0-7.65-4L49,166.86a86.47,86.47,0,0,1-4.35-10.49l12.84-16.05a12,12,0,0,0,2.61-8.22,70.1,70.1,0,0,1,0-8.2,12,12,0,0,0-2.61-8.22L44.67,99.63A86.47,86.47,0,0,1,49,89.14l20.43-2.27a12,12,0,0,0,7.65-4,69,69,0,0,1,5.8-5.8,12,12,0,0,0,4-7.65L89.14,49a86.47,86.47,0,0,1,10.49-4.35l16.05,12.85a12.06,12.06,0,0,0,8.22,2.6,70.1,70.1,0,0,1,8.2,0,12,12,0,0,0,8.22-2.6l16.05-12.85A86.47,86.47,0,0,1,166.86,49l2.27,20.43a12,12,0,0,0,4,7.65,69,69,0,0,1,5.8,5.8,12,12,0,0,0,7.65,4L207,89.14a86.47,86.47,0,0,1,4.35,10.49l-12.84,16.05A12,12,0,0,0,195.88,123.9Z"},null,-1),ea=[Qe],aa={key:1},ta=d("path",{d:"M207.86,123.18l16.78-21a99.14,99.14,0,0,0-10.07-24.29l-26.7-3a81,81,0,0,0-6.81-6.81l-3-26.71a99.43,99.43,0,0,0-24.3-10l-21,16.77a81.59,81.59,0,0,0-9.64,0l-21-16.78A99.14,99.14,0,0,0,77.91,41.43l-3,26.7a81,81,0,0,0-6.81,6.81l-26.71,3a99.43,99.43,0,0,0-10,24.3l16.77,21a81.59,81.59,0,0,0,0,9.64l-16.78,21a99.14,99.14,0,0,0,10.07,24.29l26.7,3a81,81,0,0,0,6.81,6.81l3,26.71a99.43,99.43,0,0,0,24.3,10l21-16.77a81.59,81.59,0,0,0,9.64,0l21,16.78a99.14,99.14,0,0,0,24.29-10.07l3-26.7a81,81,0,0,0,6.81-6.81l26.71-3a99.43,99.43,0,0,0,10-24.3l-16.77-21A81.59,81.59,0,0,0,207.86,123.18ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z",opacity:"0.2"},null,-1),ra=d("path",{d:"M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8.06,8.06,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8.06,8.06,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"},null,-1),oa=[ta,ra],na={key:2},la=d("path",{d:"M216,130.16q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"},null,-1),ia=[la],sa={key:3},da=d("path",{d:"M128,82a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162ZM214,130.84c.06-1.89.06-3.79,0-5.68L229.33,106a6,6,0,0,0,1.11-5.29A105.34,105.34,0,0,0,219.76,74.9a6,6,0,0,0-4.53-3l-24.45-2.71q-1.93-2.07-4-4l-2.72-24.46a6,6,0,0,0-3-4.53,105.65,105.65,0,0,0-25.77-10.66A6,6,0,0,0,150,26.68l-19.2,15.37c-1.89-.06-3.79-.06-5.68,0L106,26.67a6,6,0,0,0-5.29-1.11A105.34,105.34,0,0,0,74.9,36.24a6,6,0,0,0-3,4.53L69.23,65.22q-2.07,1.94-4,4L40.76,72a6,6,0,0,0-4.53,3,105.65,105.65,0,0,0-10.66,25.77A6,6,0,0,0,26.68,106l15.37,19.2c-.06,1.89-.06,3.79,0,5.68L26.67,150.05a6,6,0,0,0-1.11,5.29A105.34,105.34,0,0,0,36.24,181.1a6,6,0,0,0,4.53,3l24.45,2.71q1.94,2.07,4,4L72,215.24a6,6,0,0,0,3,4.53,105.65,105.65,0,0,0,25.77,10.66,6,6,0,0,0,5.29-1.11L125.16,214c1.89.06,3.79.06,5.68,0l19.21,15.38a6,6,0,0,0,3.75,1.31,6.2,6.2,0,0,0,1.54-.2,105.34,105.34,0,0,0,25.76-10.68,6,6,0,0,0,3-4.53l2.71-24.45q2.07-1.93,4-4l24.46-2.72a6,6,0,0,0,4.53-3,105.49,105.49,0,0,0,10.66-25.77,6,6,0,0,0-1.11-5.29Zm-3.1,41.63-23.64,2.63a6,6,0,0,0-3.82,2,75.14,75.14,0,0,1-6.31,6.31,6,6,0,0,0-2,3.82l-2.63,23.63A94.28,94.28,0,0,1,155.14,218l-18.57-14.86a6,6,0,0,0-3.75-1.31h-.36a78.07,78.07,0,0,1-8.92,0,6,6,0,0,0-4.11,1.3L100.87,218a94.13,94.13,0,0,1-17.34-7.17L80.9,187.21a6,6,0,0,0-2-3.82,75.14,75.14,0,0,1-6.31-6.31,6,6,0,0,0-3.82-2l-23.63-2.63A94.28,94.28,0,0,1,38,155.14l14.86-18.57a6,6,0,0,0,1.3-4.11,78.07,78.07,0,0,1,0-8.92,6,6,0,0,0-1.3-4.11L38,100.87a94.13,94.13,0,0,1,7.17-17.34L68.79,80.9a6,6,0,0,0,3.82-2,75.14,75.14,0,0,1,6.31-6.31,6,6,0,0,0,2-3.82l2.63-23.63A94.28,94.28,0,0,1,100.86,38l18.57,14.86a6,6,0,0,0,4.11,1.3,78.07,78.07,0,0,1,8.92,0,6,6,0,0,0,4.11-1.3L155.13,38a94.13,94.13,0,0,1,17.34,7.17l2.63,23.64a6,6,0,0,0,2,3.82,75.14,75.14,0,0,1,6.31,6.31,6,6,0,0,0,3.82,2l23.63,2.63A94.28,94.28,0,0,1,218,100.86l-14.86,18.57a6,6,0,0,0-1.3,4.11,78.07,78.07,0,0,1,0,8.92,6,6,0,0,0,1.3,4.11L218,155.13A94.13,94.13,0,0,1,210.85,172.47Z"},null,-1),ca=[da],ua={key:4},fa=d("path",{d:"M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"},null,-1),ba=[fa],pa={key:5},va=d("path",{d:"M128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36,36,0,0,1,128,164Zm83.93-32.49q.13-3.51,0-7l15.83-19.79a4,4,0,0,0,.75-3.53A103.64,103.64,0,0,0,218,75.9a4,4,0,0,0-3-2l-25.19-2.8c-1.58-1.71-3.24-3.37-4.95-4.95L182.07,41a4,4,0,0,0-2-3A104,104,0,0,0,154.82,27.5a4,4,0,0,0-3.53.74L131.51,44.07q-3.51-.14-7,0L104.7,28.24a4,4,0,0,0-3.53-.75A103.64,103.64,0,0,0,75.9,38a4,4,0,0,0-2,3l-2.8,25.19c-1.71,1.58-3.37,3.24-4.95,4.95L41,73.93a4,4,0,0,0-3,2A104,104,0,0,0,27.5,101.18a4,4,0,0,0,.74,3.53l15.83,19.78q-.14,3.51,0,7L28.24,151.3a4,4,0,0,0-.75,3.53A103.64,103.64,0,0,0,38,180.1a4,4,0,0,0,3,2l25.19,2.8c1.58,1.71,3.24,3.37,4.95,4.95l2.8,25.2a4,4,0,0,0,2,3,104,104,0,0,0,25.28,10.46,4,4,0,0,0,3.53-.74l19.78-15.83q3.51.13,7,0l19.79,15.83a4,4,0,0,0,2.5.88,4,4,0,0,0,1-.13A103.64,103.64,0,0,0,180.1,218a4,4,0,0,0,2-3l2.8-25.19c1.71-1.58,3.37-3.24,4.95-4.95l25.2-2.8a4,4,0,0,0,3-2,104,104,0,0,0,10.46-25.28,4,4,0,0,0-.74-3.53Zm.17,42.83-24.67,2.74a4,4,0,0,0-2.55,1.32,76.2,76.2,0,0,1-6.48,6.48,4,4,0,0,0-1.32,2.55l-2.74,24.66a95.45,95.45,0,0,1-19.64,8.15l-19.38-15.51a4,4,0,0,0-2.5-.87h-.24a73.67,73.67,0,0,1-9.16,0,4,4,0,0,0-2.74.87l-19.37,15.5a95.33,95.33,0,0,1-19.65-8.13l-2.74-24.67a4,4,0,0,0-1.32-2.55,76.2,76.2,0,0,1-6.48-6.48,4,4,0,0,0-2.55-1.32l-24.66-2.74a95.45,95.45,0,0,1-8.15-19.64l15.51-19.38a4,4,0,0,0,.87-2.74,77.76,77.76,0,0,1,0-9.16,4,4,0,0,0-.87-2.74l-15.5-19.37A95.33,95.33,0,0,1,43.9,81.66l24.67-2.74a4,4,0,0,0,2.55-1.32,76.2,76.2,0,0,1,6.48-6.48,4,4,0,0,0,1.32-2.55l2.74-24.66a95.45,95.45,0,0,1,19.64-8.15l19.38,15.51a4,4,0,0,0,2.74.87,73.67,73.67,0,0,1,9.16,0,4,4,0,0,0,2.74-.87l19.37-15.5a95.33,95.33,0,0,1,19.65,8.13l2.74,24.67a4,4,0,0,0,1.32,2.55,76.2,76.2,0,0,1,6.48,6.48,4,4,0,0,0,2.55,1.32l24.66,2.74a95.45,95.45,0,0,1,8.15,19.64l-15.51,19.38a4,4,0,0,0-.87,2.74,77.76,77.76,0,0,1,0,9.16,4,4,0,0,0,.87,2.74l15.5,19.37A95.33,95.33,0,0,1,212.1,174.34Z"},null,-1),ha=[va],ga={name:"PhGear"},ma=O({...ga,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,i=V("weight","regular"),v=V("size","1em"),c=V("color","currentColor"),x=V("mirrored",!1),t=g(()=>a.weight??i),u=g(()=>a.size??v),b=g(()=>a.color??c),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:x?"scale(-1, 1)":void 0);return(h,H)=>(l(),s("svg",K({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:b.value,transform:m.value},h.$attrs),[Q(h.$slots,"default"),t.value==="bold"?(l(),s("g",Je,ea)):t.value==="duotone"?(l(),s("g",aa,oa)):t.value==="fill"?(l(),s("g",na,ia)):t.value==="light"?(l(),s("g",sa,ca)):t.value==="regular"?(l(),s("g",ua,ba)):t.value==="thin"?(l(),s("g",pa,ha)):Y("",!0)],16,Xe))}}),ya=["width","height","fill","transform"],xa={key:0},Aa=d("path",{d:"M222.14,105.85l-80-80a20,20,0,0,0-28.28,0l-80,80A19.86,19.86,0,0,0,28,120v96a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V164h24v52a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V120A19.86,19.86,0,0,0,222.14,105.85ZM204,204H164V152a12,12,0,0,0-12-12H104a12,12,0,0,0-12,12v52H52V121.65l76-76,76,76Z"},null,-1),$a=[Aa],wa={key:1},Va=d("path",{d:"M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z",opacity:"0.2"},null,-1),La=d("path",{d:"M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"},null,-1),Za=[Va,La],Ha={key:2},Sa=d("path",{d:"M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"},null,-1),Ma=[Sa],Ca={key:3},ka=d("path",{d:"M217.9,110.1l-80-80a14,14,0,0,0-19.8,0l-80,80A13.92,13.92,0,0,0,34,120v96a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V158h36v58a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V120A13.92,13.92,0,0,0,217.9,110.1ZM210,210H158V152a6,6,0,0,0-6-6H104a6,6,0,0,0-6,6v58H46V120a2,2,0,0,1,.58-1.42l80-80a2,2,0,0,1,2.84,0l80,80A2,2,0,0,1,210,120Z"},null,-1),za=[ka],Ta={key:4},Ra=d("path",{d:"M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"},null,-1),_a=[Ra],Pa={key:5},Ba=d("path",{d:"M216.49,111.51l-80-80a12,12,0,0,0-17,0l-80,80A12,12,0,0,0,36,120v96a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V156h40v60a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V120A12,12,0,0,0,216.49,111.51ZM212,212H156V152a4,4,0,0,0-4-4H104a4,4,0,0,0-4,4v60H44V120a4,4,0,0,1,1.17-2.83l80-80a4,4,0,0,1,5.66,0l80,80A4,4,0,0,1,212,120Z"},null,-1),Ea=[Ba],Wa={name:"PhHouse"},Ia=O({...Wa,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,i=V("weight","regular"),v=V("size","1em"),c=V("color","currentColor"),x=V("mirrored",!1),t=g(()=>a.weight??i),u=g(()=>a.size??v),b=g(()=>a.color??c),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:x?"scale(-1, 1)":void 0);return(h,H)=>(l(),s("svg",K({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:b.value,transform:m.value},h.$attrs),[Q(h.$slots,"default"),t.value==="bold"?(l(),s("g",xa,$a)):t.value==="duotone"?(l(),s("g",wa,Za)):t.value==="fill"?(l(),s("g",Ha,Ma)):t.value==="light"?(l(),s("g",Ca,za)):t.value==="regular"?(l(),s("g",Ta,_a)):t.value==="thin"?(l(),s("g",Pa,Ea)):Y("",!0)],16,ya))}}),Na=["width","height","fill","transform"],ja={key:0},Oa=d("path",{d:"M229.7,82.84l-175.94-54-.16-.05A20,20,0,0,0,28,48V192a20,20,0,0,0,19.94,20,20.38,20.38,0,0,0,5.66-.81l.16,0,78.24-24V196a20,20,0,0,0,20,20h32a20,20,0,0,0,20-20V165.06l25.7-7.89A20.1,20.1,0,0,0,244,138V102A20.1,20.1,0,0,0,229.7,82.84ZM52,186.58V53.43L132,78V162ZM180,192H156V179.78l24-7.36Zm40-56.95-64,19.63V85.33L220,105Z"},null,-1),qa=[Oa],Da={key:1},Fa=d("path",{d:"M144,69.09V170.91L50.24,199.67A8,8,0,0,1,40,192V48a8,8,0,0,1,10.24-7.67Z",opacity:"0.2"},null,-1),Ga=d("path",{d:"M228.54,86.66l-176.06-54A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16,16,16,0,0,0,4.52-.65L136,181.73V192a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16v-29.9l28.54-8.75A16.09,16.09,0,0,0,240,138V102A16.09,16.09,0,0,0,228.54,86.66ZM136,165,48,192V48l88,27Zm48,27H152V176.82L184,167Zm40-54-.11,0L152,160.08V79.92l71.89,22,.11,0v36Z"},null,-1),Ua=[Fa,Ga],Ka={key:2},Ya=d("path",{d:"M228.54,86.66l-176.06-54A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16,16,16,0,0,0,4.52-.65L136,181.73V192a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16v-29.9l28.54-8.75A16.09,16.09,0,0,0,240,138V102A16.09,16.09,0,0,0,228.54,86.66ZM184,192H152V176.82L184,167Zm40-54-.11,0L152,160.08V79.91L223.89,102l.11,0v36Z"},null,-1),Xa=[Ya],Ja={key:3},Qa=d("path",{d:"M228,88.59l-176.08-54A14,14,0,0,0,34,48V192a14,14,0,0,0,14,14,14.59,14.59,0,0,0,4-.59L138,179v13a14,14,0,0,0,14,14h32a14,14,0,0,0,14-14V160.62l30-9.19A14.07,14.07,0,0,0,238,138V102A14,14,0,0,0,228,88.59ZM48.56,193.92a2,2,0,0,1-1.76-.32A2,2,0,0,1,46,192V48a2,2,0,0,1,.8-1.6A2.05,2.05,0,0,1,48,46a1.79,1.79,0,0,1,.49.08L138,73.53v92.95ZM186,192a2,2,0,0,1-2,2H152a2,2,0,0,1-2-2V175.35l36-11Zm40-54a2,2,0,0,1-1.44,1.92l-.08,0L150,162.8V77.21l74.56,22.87A2,2,0,0,1,226,102Z"},null,-1),et=[Qa],at={key:4},tt=d("path",{d:"M228.54,86.66l-176.06-54A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16,16,16,0,0,0,4.52-.65L136,181.73V192a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16v-29.9l28.54-8.75A16.09,16.09,0,0,0,240,138V102A16.09,16.09,0,0,0,228.54,86.66ZM136,165,48,192V48l88,27Zm48,27H152V176.82L184,167Zm40-54-.11,0L152,160.08V79.92l71.89,22,.11,0v36Z"},null,-1),rt=[tt],ot={key:5},nt=d("path",{d:"M227.41,90.5l-176-54A12,12,0,0,0,36,48V192a12,12,0,0,0,12,12,12.41,12.41,0,0,0,3.45-.5L140,176.32V192a12,12,0,0,0,12,12h32a12,12,0,0,0,12-12V159.14l31.39-9.63A12.06,12.06,0,0,0,236,138V102A12,12,0,0,0,227.41,90.5ZM49.12,195.84A4,4,0,0,1,44,192V48a4,4,0,0,1,1.6-3.2A4,4,0,0,1,48,44a3.89,3.89,0,0,1,1.07.15L140,72.05V168ZM188,192a4,4,0,0,1-4,4H152a4,4,0,0,1-4-4V173.87l40-12.27Zm40-54a4,4,0,0,1-2.88,3.84l-.05,0L148,165.5v-91l77.12,23.66A4,4,0,0,1,228,102Z"},null,-1),lt=[nt],it={name:"PhMegaphoneSimple"},st=O({...it,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,i=V("weight","regular"),v=V("size","1em"),c=V("color","currentColor"),x=V("mirrored",!1),t=g(()=>a.weight??i),u=g(()=>a.size??v),b=g(()=>a.color??c),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:x?"scale(-1, 1)":void 0);return(h,H)=>(l(),s("svg",K({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:b.value,transform:m.value},h.$attrs),[Q(h.$slots,"default"),t.value==="bold"?(l(),s("g",ja,qa)):t.value==="duotone"?(l(),s("g",Da,Ua)):t.value==="fill"?(l(),s("g",Ka,Xa)):t.value==="light"?(l(),s("g",Ja,et)):t.value==="regular"?(l(),s("g",at,rt)):t.value==="thin"?(l(),s("g",ot,lt)):Y("",!0)],16,Na))}}),dt=["width","height","fill","transform"],ct={key:0},ut=d("path",{d:"M200,28H160a20,20,0,0,0-20,20V208a20,20,0,0,0,20,20h40a20,20,0,0,0,20-20V48A20,20,0,0,0,200,28Zm-4,176H164V52h32ZM96,28H56A20,20,0,0,0,36,48V208a20,20,0,0,0,20,20H96a20,20,0,0,0,20-20V48A20,20,0,0,0,96,28ZM92,204H60V52H92Z"},null,-1),ft=[ut],bt={key:1},pt=d("path",{d:"M208,48V208a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h40A8,8,0,0,1,208,48ZM96,40H56a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H96a8,8,0,0,0,8-8V48A8,8,0,0,0,96,40Z",opacity:"0.2"},null,-1),vt=d("path",{d:"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"},null,-1),ht=[pt,vt],gt={key:2},mt=d("path",{d:"M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"},null,-1),yt=[mt],xt={key:3},At=d("path",{d:"M200,34H160a14,14,0,0,0-14,14V208a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V48A14,14,0,0,0,200,34Zm2,174a2,2,0,0,1-2,2H160a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2ZM96,34H56A14,14,0,0,0,42,48V208a14,14,0,0,0,14,14H96a14,14,0,0,0,14-14V48A14,14,0,0,0,96,34Zm2,174a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2H96a2,2,0,0,1,2,2Z"},null,-1),$t=[At],wt={key:4},Vt=d("path",{d:"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"},null,-1),Lt=[Vt],Zt={key:5},Ht=d("path",{d:"M200,36H160a12,12,0,0,0-12,12V208a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V48A12,12,0,0,0,200,36Zm4,172a4,4,0,0,1-4,4H160a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4ZM96,36H56A12,12,0,0,0,44,48V208a12,12,0,0,0,12,12H96a12,12,0,0,0,12-12V48A12,12,0,0,0,96,36Zm4,172a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4H96a4,4,0,0,1,4,4Z"},null,-1),St=[Ht],Mt={name:"PhPause"},K0=O({...Mt,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,i=V("weight","regular"),v=V("size","1em"),c=V("color","currentColor"),x=V("mirrored",!1),t=g(()=>a.weight??i),u=g(()=>a.size??v),b=g(()=>a.color??c),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:x?"scale(-1, 1)":void 0);return(h,H)=>(l(),s("svg",K({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:b.value,transform:m.value},h.$attrs),[Q(h.$slots,"default"),t.value==="bold"?(l(),s("g",ct,ft)):t.value==="duotone"?(l(),s("g",bt,ht)):t.value==="fill"?(l(),s("g",gt,yt)):t.value==="light"?(l(),s("g",xt,$t)):t.value==="regular"?(l(),s("g",wt,Lt)):t.value==="thin"?(l(),s("g",Zt,St)):Y("",!0)],16,dt))}}),Ct=["width","height","fill","transform"],kt={key:0},zt=d("path",{d:"M234.49,111.07,90.41,22.94A20,20,0,0,0,60,39.87V216.13a20,20,0,0,0,30.41,16.93l144.08-88.13a19.82,19.82,0,0,0,0-33.86ZM84,208.85V47.15L216.16,128Z"},null,-1),Tt=[zt],Rt={key:1},_t=d("path",{d:"M228.23,134.69,84.15,222.81A8,8,0,0,1,72,216.12V39.88a8,8,0,0,1,12.15-6.69l144.08,88.12A7.82,7.82,0,0,1,228.23,134.69Z",opacity:"0.2"},null,-1),Pt=d("path",{d:"M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"},null,-1),Bt=[_t,Pt],Et={key:2},Wt=d("path",{d:"M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"},null,-1),It=[Wt],Nt={key:3},jt=d("path",{d:"M231.36,116.19,87.28,28.06a14,14,0,0,0-14.18-.27A13.69,13.69,0,0,0,66,39.87V216.13a13.69,13.69,0,0,0,7.1,12.08,14,14,0,0,0,14.18-.27l144.08-88.13a13.82,13.82,0,0,0,0-23.62Zm-6.26,13.38L81,217.7a2,2,0,0,1-2.06,0,1.78,1.78,0,0,1-1-1.61V39.87a1.78,1.78,0,0,1,1-1.61A2.06,2.06,0,0,1,80,38a2,2,0,0,1,1,.31L225.1,126.43a1.82,1.82,0,0,1,0,3.14Z"},null,-1),Ot=[jt],qt={key:4},Dt=d("path",{d:"M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"},null,-1),Ft=[Dt],Gt={key:5},Ut=d("path",{d:"M230.32,117.9,86.24,29.79a11.91,11.91,0,0,0-12.17-.23A11.71,11.71,0,0,0,68,39.89V216.11a11.71,11.71,0,0,0,6.07,10.33,11.91,11.91,0,0,0,12.17-.23L230.32,138.1a11.82,11.82,0,0,0,0-20.2Zm-4.18,13.37L82.06,219.39a4,4,0,0,1-4.07.07,3.77,3.77,0,0,1-2-3.35V39.89a3.77,3.77,0,0,1,2-3.35,4,4,0,0,1,4.07.07l144.08,88.12a3.8,3.8,0,0,1,0,6.54Z"},null,-1),Kt=[Ut],Yt={name:"PhPlay"},Y0=O({...Yt,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,i=V("weight","regular"),v=V("size","1em"),c=V("color","currentColor"),x=V("mirrored",!1),t=g(()=>a.weight??i),u=g(()=>a.size??v),b=g(()=>a.color??c),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:x?"scale(-1, 1)":void 0);return(h,H)=>(l(),s("svg",K({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:b.value,transform:m.value},h.$attrs),[Q(h.$slots,"default"),t.value==="bold"?(l(),s("g",kt,Tt)):t.value==="duotone"?(l(),s("g",Rt,Bt)):t.value==="fill"?(l(),s("g",Et,It)):t.value==="light"?(l(),s("g",Nt,Ot)):t.value==="regular"?(l(),s("g",qt,Ft)):t.value==="thin"?(l(),s("g",Gt,Kt)):Y("",!0)],16,Ct))}}),Xt=["width","height","fill","transform"],Jt={key:0},Qt=d("path",{d:"M200,36H56A20,20,0,0,0,36,56V200a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V56A20,20,0,0,0,200,36Zm-4,160H60V60H196Z"},null,-1),er=[Qt],ar={key:1},tr=d("path",{d:"M208,56V200a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z",opacity:"0.2"},null,-1),rr=d("path",{d:"M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z"},null,-1),or=[tr,rr],nr={key:2},lr=d("path",{d:"M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z"},null,-1),ir=[lr],sr={key:3},dr=d("path",{d:"M200,42H56A14,14,0,0,0,42,56V200a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V56A14,14,0,0,0,200,42Zm2,158a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2H200a2,2,0,0,1,2,2Z"},null,-1),cr=[dr],ur={key:4},fr=d("path",{d:"M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z"},null,-1),br=[fr],pr={key:5},vr=d("path",{d:"M200,44H56A12,12,0,0,0,44,56V200a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V56A12,12,0,0,0,200,44Zm4,156a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4H200a4,4,0,0,1,4,4Z"},null,-1),hr=[vr],gr={name:"PhStop"},X0=O({...gr,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,i=V("weight","regular"),v=V("size","1em"),c=V("color","currentColor"),x=V("mirrored",!1),t=g(()=>a.weight??i),u=g(()=>a.size??v),b=g(()=>a.color??c),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:x?"scale(-1, 1)":void 0);return(h,H)=>(l(),s("svg",K({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:b.value,transform:m.value},h.$attrs),[Q(h.$slots,"default"),t.value==="bold"?(l(),s("g",Jt,er)):t.value==="duotone"?(l(),s("g",ar,or)):t.value==="fill"?(l(),s("g",nr,ir)):t.value==="light"?(l(),s("g",sr,cr)):t.value==="regular"?(l(),s("g",ur,br)):t.value==="thin"?(l(),s("g",pr,hr)):Y("",!0)],16,Xt))}}),mr=["width","height","fill","transform"],yr={key:0},xr=d("path",{d:"M228,40V76a12,12,0,0,1-24,0V52H180a12,12,0,0,1,0-24h36A12,12,0,0,1,228,40ZM216,168a12,12,0,0,0-12,12v24H180a12,12,0,0,0,0,24h36a12,12,0,0,0,12-12V180A12,12,0,0,0,216,168ZM76,204H52V180a12,12,0,0,0-24,0v36a12,12,0,0,0,12,12H76a12,12,0,0,0,0-24ZM40,88A12,12,0,0,0,52,76V52H76a12,12,0,0,0,0-24H40A12,12,0,0,0,28,40V76A12,12,0,0,0,40,88Zm136,92a12,12,0,0,1-9.6-4.79,48,48,0,0,0-76.82,0,12,12,0,0,1-19.18-14.42,72.1,72.1,0,0,1,23.92-20.5,44,44,0,1,1,67.34,0,72.1,72.1,0,0,1,23.92,20.5A12,12,0,0,1,176,180Zm-48-48a20,20,0,1,0-20-20A20,20,0,0,0,128,132Z"},null,-1),Ar=[xr],$r={key:1},wr=d("path",{d:"M160,112a32,32,0,1,1-32-32A32,32,0,0,1,160,112Z",opacity:"0.2"},null,-1),Vr=d("path",{d:"M224,40V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h36A8,8,0,0,1,224,40Zm-8,132a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h36a8,8,0,0,0,8-8V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v36a8,8,0,0,0,8,8H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V76A8,8,0,0,0,40,84Zm136,92a8,8,0,0,1-6.41-3.19,52,52,0,0,0-83.2,0,8,8,0,1,1-12.8-9.62A67.94,67.94,0,0,1,101,141.51a40,40,0,1,1,53.94,0,67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,176,176Zm-48-40a24,24,0,1,0-24-24A24,24,0,0,0,128,136Z"},null,-1),Lr=[wr,Vr],Zr={key:2},Hr=d("path",{d:"M224,40V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h36A8,8,0,0,1,224,40Zm-8,132a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h36a8,8,0,0,0,8-8V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v36a8,8,0,0,0,8,8H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V76A8,8,0,0,0,40,84Zm61,57.51A67.94,67.94,0,0,0,73.6,163.19,8,8,0,0,0,80,176h96a8,8,0,0,0,6.4-12.81A67.94,67.94,0,0,0,155,141.51a40,40,0,1,0-53.94,0Z"},null,-1),Sr=[Hr],Mr={key:3},Cr=d("path",{d:"M222,40V76a6,6,0,0,1-12,0V46H180a6,6,0,0,1,0-12h36A6,6,0,0,1,222,40Zm-6,134a6,6,0,0,0-6,6v30H180a6,6,0,0,0,0,12h36a6,6,0,0,0,6-6V180A6,6,0,0,0,216,174ZM76,210H46V180a6,6,0,0,0-12,0v36a6,6,0,0,0,6,6H76a6,6,0,0,0,0-12ZM40,82a6,6,0,0,0,6-6V46H76a6,6,0,0,0,0-12H40a6,6,0,0,0-6,6V76A6,6,0,0,0,40,82Zm136,92a6,6,0,0,1-4.8-2.4,54,54,0,0,0-86.4,0,6,6,0,1,1-9.6-7.2,65.65,65.65,0,0,1,29.69-22.26,38,38,0,1,1,46.22,0A65.65,65.65,0,0,1,180.8,164.4,6,6,0,0,1,176,174Zm-48-36a26,26,0,1,0-26-26A26,26,0,0,0,128,138Z"},null,-1),kr=[Cr],zr={key:4},Tr=d("path",{d:"M224,40V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h36A8,8,0,0,1,224,40Zm-8,132a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h36a8,8,0,0,0,8-8V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v36a8,8,0,0,0,8,8H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V76A8,8,0,0,0,40,84Zm136,92a8,8,0,0,1-6.41-3.19,52,52,0,0,0-83.2,0,8,8,0,1,1-12.8-9.62A67.94,67.94,0,0,1,101,141.51a40,40,0,1,1,53.94,0,67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,176,176Zm-48-40a24,24,0,1,0-24-24A24,24,0,0,0,128,136Z"},null,-1),Rr=[Tr],_r={key:5},Pr=d("path",{d:"M220,40V76a4,4,0,0,1-8,0V44H180a4,4,0,0,1,0-8h36A4,4,0,0,1,220,40Zm-4,136a4,4,0,0,0-4,4v32H180a4,4,0,0,0,0,8h36a4,4,0,0,0,4-4V180A4,4,0,0,0,216,176ZM76,212H44V180a4,4,0,0,0-8,0v36a4,4,0,0,0,4,4H76a4,4,0,0,0,0-8ZM40,80a4,4,0,0,0,4-4V44H76a4,4,0,0,0,0-8H40a4,4,0,0,0-4,4V76A4,4,0,0,0,40,80Zm136,92a4,4,0,0,1-3.2-1.6,56,56,0,0,0-89.6,0,4,4,0,1,1-6.4-4.8,63.65,63.65,0,0,1,32.5-22.85,36,36,0,1,1,37.4,0,63.65,63.65,0,0,1,32.5,22.85A4,4,0,0,1,176,172Zm-48-32a28,28,0,1,0-28-28A28,28,0,0,0,128,140Z"},null,-1),Br=[Pr],Er={name:"PhUserFocus"},Wr=O({...Er,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,i=V("weight","regular"),v=V("size","1em"),c=V("color","currentColor"),x=V("mirrored",!1),t=g(()=>a.weight??i),u=g(()=>a.size??v),b=g(()=>a.color??c),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:x?"scale(-1, 1)":void 0);return(h,H)=>(l(),s("svg",K({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:b.value,transform:m.value},h.$attrs),[Q(h.$slots,"default"),t.value==="bold"?(l(),s("g",yr,Ar)):t.value==="duotone"?(l(),s("g",$r,Lr)):t.value==="fill"?(l(),s("g",Zr,Sr)):t.value==="light"?(l(),s("g",Mr,kr)):t.value==="regular"?(l(),s("g",zr,Rr)):t.value==="thin"?(l(),s("g",_r,Br)):Y("",!0)],16,mr))}}),Ir=["width","height","fill","transform"],Nr={key:0},jr=d("path",{d:"M125.18,156.94a64,64,0,1,0-82.36,0,100.23,100.23,0,0,0-39.49,32,12,12,0,0,0,19.35,14.2,76,76,0,0,1,122.64,0,12,12,0,0,0,19.36-14.2A100.33,100.33,0,0,0,125.18,156.94ZM44,108a40,40,0,1,1,40,40A40,40,0,0,1,44,108Zm206.1,97.67a12,12,0,0,1-16.78-2.57A76.31,76.31,0,0,0,172,172a12,12,0,0,1,0-24,40,40,0,1,0-10.3-78.67,12,12,0,1,1-6.16-23.19,64,64,0,0,1,57.64,110.8,100.23,100.23,0,0,1,39.49,32A12,12,0,0,1,250.1,205.67Z"},null,-1),Or=[jr],qr={key:1},Dr=d("path",{d:"M136,108A52,52,0,1,1,84,56,52,52,0,0,1,136,108Z",opacity:"0.2"},null,-1),Fr=d("path",{d:"M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"},null,-1),Gr=[Dr,Fr],Ur={key:2},Kr=d("path",{d:"M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"},null,-1),Yr=[Kr],Xr={key:3},Jr=d("path",{d:"M112.6,158.43a58,58,0,1,0-57.2,0A93.83,93.83,0,0,0,5.21,196.72a6,6,0,0,0,10.05,6.56,82,82,0,0,1,137.48,0,6,6,0,0,0,10-6.56A93.83,93.83,0,0,0,112.6,158.43ZM38,108a46,46,0,1,1,46,46A46.06,46.06,0,0,1,38,108Zm211,97a6,6,0,0,1-8.3-1.74A81.8,81.8,0,0,0,172,166a6,6,0,0,1,0-12,46,46,0,1,0-17.08-88.73,6,6,0,1,1-4.46-11.14,58,58,0,0,1,50.14,104.3,93.83,93.83,0,0,1,50.19,38.29A6,6,0,0,1,249,205Z"},null,-1),Qr=[Jr],eo={key:4},ao=d("path",{d:"M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"},null,-1),to=[ao],ro={key:5},oo=d("path",{d:"M107.19,159a56,56,0,1,0-46.38,0A91.83,91.83,0,0,0,6.88,197.81a4,4,0,1,0,6.7,4.37,84,84,0,0,1,140.84,0,4,4,0,1,0,6.7-4.37A91.83,91.83,0,0,0,107.19,159ZM36,108a48,48,0,1,1,48,48A48.05,48.05,0,0,1,36,108Zm212,95.35a4,4,0,0,1-5.53-1.17A83.81,83.81,0,0,0,172,164a4,4,0,0,1,0-8,48,48,0,1,0-17.82-92.58,4,4,0,1,1-3-7.43,56,56,0,0,1,44,103,91.83,91.83,0,0,1,53.93,38.86A4,4,0,0,1,248,203.35Z"},null,-1),no=[oo],lo={name:"PhUsers"},io=O({...lo,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,i=V("weight","regular"),v=V("size","1em"),c=V("color","currentColor"),x=V("mirrored",!1),t=g(()=>a.weight??i),u=g(()=>a.size??v),b=g(()=>a.color??c),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:x?"scale(-1, 1)":void 0);return(h,H)=>(l(),s("svg",K({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:b.value,transform:m.value},h.$attrs),[Q(h.$slots,"default"),t.value==="bold"?(l(),s("g",Nr,Or)):t.value==="duotone"?(l(),s("g",qr,Gr)):t.value==="fill"?(l(),s("g",Ur,Yr)):t.value==="light"?(l(),s("g",Xr,Qr)):t.value==="regular"?(l(),s("g",eo,to)):t.value==="thin"?(l(),s("g",ro,no)):Y("",!0)],16,Ir))}}),so={class:"flex items-center gap-2"},co={class:"flex items-center gap-1"},uo={key:0,class:"flex items-center justify-center w-full h-full"},fo={key:1,class:"flex gap-2 items-center"},bo={class:"flex gap-2 items-center"},po={class:"w-full h-full py-4"},$o=O({__name:"layout",setup(e){const a=ie(),i=se(),v=de(),c=ce(),x=ve(),t=ue(),u=g(()=>v.isLoadRoomLoading),b=g(()=>v.allRooms.get(i.params.roomId)??null),m=g(()=>{var f;return I0(v.monitorLogsGroupedByRoomId,(f=b.value)==null?void 0:f.id,new Map)}),h=g(()=>{var f;return I0(v.studentsGroupedByRoomId,(f=b.value)==null?void 0:f.id,new Map)}),H=g(()=>Array.from(m.value.values())),P=g(()=>Array.from(h.value.values())),S=g(()=>c.teacher),B=fe([{name:"Overview",key:"overview",icon:e0(Ia)},{name:"Monitoring",key:"monitoring",icon:e0(Wr),badgeValue:g(()=>P.value.filter(f=>f.permitted&&!!f.lockMonitorLogId).length)},{name:"Students",key:"students",icon:e0(io),badgeValue:g(()=>P.value.filter(f=>!f.permitted&&f.active).length)},{name:"Settings",key:"settings",icon:e0(ma)}]),z=g(()=>i.path.split("/").pop()||"overview"),E=L0("/api/start_monitoring/:roomId","PATCH");async function W(){try{await E.execute({params:{roomId:i.params.roomId}}),t.success("Monitoring has started.",{icon:e0(Y0)})}catch(f){t.error(f.message)}}const R=L0("/api/pause_monitoring/:roomId","PATCH");async function U(){try{await R.execute({params:{roomId:i.params.roomId}}),t.warning("Monitoring has been paused.",{icon:e0(K0)})}catch(f){t.error(f.message)}}const I=L0("/api/stop_monitoring/:roomId","PATCH");async function L(){if(confirm("Are you sure you want to stop monitoring? This will conclude and archive the room session. This action cannot be undone."))try{await I.execute({params:{roomId:i.params.roomId}}),t.error("Monitoring has been stopped.",{icon:e0(X0)})}catch(A){t.error(A.message)}}return Q0(()=>{v.loadRoom(i.params.roomId),window.$store=v}),J(xe,b),J(Ae,m),J($e,h),J(we,S),J(Ve,H),J(Le,P),J(Ze,u),(f,A)=>(l(),p0(E1,{"no-divider":""},be({default:M(()=>[b.value?(l(),s(M0,{key:1},[C(Z(Ye),{type:"card",value:z.value,"onUpdate:value":Z(a).push},{default:M(()=>[(l(!0),s(M0,null,ge(B,_=>(l(),p0(Z(g0),{key:_.key,name:_.key},{default:M(()=>[C(Z(Me),{value:_.badgeValue,offset:[6,-3]},{default:M(()=>[C(Z(N0),{to:_.key},{default:M(()=>[d("div",bo,[_.icon?(l(),p0(me(_.icon),{key:0})):Y("",!0),a0(" "+O0(_.name),1)])]),_:2},1032,["to"])]),_:2},1032,["value"])]),_:2},1032,["name"]))),128))]),_:1},8,["value","onUpdate:value"]),d("div",po,[C(Z(ye))])],64)):(l(),s("div",uo,[Z(v).isLoadRoomLoading?(l(),p0(he,{key:0})):(l(),s("div",fo,[C(Z(j0),null,{default:M(()=>[...A[8]||(A[8]=[a0("Room not found",-1)])]),_:1})]))]))]),_:2},[b.value?{name:"header",fn:M(()=>[d("div",so,[C(Z(N0),{to:"/dashboard/rooms"},{default:M(()=>[C(Z(i0),{circle:"",quaternary:""},{icon:M(()=>[C(Z(He))]),_:1})]),_:1}),C(Z(j0),{strong:"",class:"text-lg"},{default:M(()=>[a0(O0(b.value.title),1)]),_:1}),C(Se,{room:b.value},null,8,["room"])])]),key:"0"}:void 0,b.value&&b.value.status!=="concluded"?{name:"header-extra",fn:M(()=>[d("div",co,[C(Z(v0),{placement:"bottom"},{trigger:M(()=>[C(Z(i0),{type:"error",secondary:"",circle:"",loading:Z(I).isLoading,onClick:A[0]||(A[0]=_=>L())},{icon:M(()=>[C(Z(X0))]),_:1},8,["loading"])]),default:M(()=>[A[4]||(A[4]=a0(" Stop monitoring and conclude room session ",-1))]),_:1}),C(Z(v0),{placement:"bottom"},{trigger:M(()=>[C(Z(i0),{type:"warning",secondary:"",circle:"",loading:Z(R).isLoading,onClick:A[1]||(A[1]=_=>U()),disabled:b.value.status==="paused"},{icon:M(()=>[C(Z(K0))]),_:1},8,["loading","disabled"])]),default:M(()=>[A[5]||(A[5]=a0(" Pause monitoring ",-1))]),_:1}),C(Z(v0),{placement:"bottom"},{trigger:M(()=>[C(Z(i0),{type:"success",secondary:"",circle:"",loading:Z(E).isLoading,onClick:A[2]||(A[2]=_=>W()),disabled:b.value.status==="monitoring"},{icon:M(()=>[C(Z(Y0))]),_:1},8,["loading","disabled"])]),default:M(()=>[A[6]||(A[6]=a0(" Start monitoring ",-1))]),_:1})]),C(Z(pe),{vertical:""}),C(Z(v0),{placement:"bottom"},{trigger:M(()=>[C(Z(i0),{circle:"",onClick:A[3]||(A[3]=_=>Z(x).show(b.value))},{icon:M(()=>[C(Z(st))]),_:1})]),default:M(()=>[A[7]||(A[7]=a0(" Send announcement to students ",-1))]),_:1})]),key:"1"}:void 0]),1024))}});export{$o as default};
