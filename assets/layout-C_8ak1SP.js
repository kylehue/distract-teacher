import{_ as E1}from"./layout.vue_vue_type_script_setup_true_lang-DnxhMB57.js";import{d as j,D as w,a5 as N,ae as W1,af as E0,ag as I1,ah as N1,ai as v0,aj as j1,ak as O1,A as U,al as q1,F as C0,am as D1,an as F1,ao as G1,v as V,x as g,ap as U1,aq as n,ar as y,as as k,at as E,au as Y1,av as x0,aw as W0,ax as A0,ay as K1,az as J0,aA as X1,aB as I0,aC as J1,aD as $0,a9 as w0,o as Q0,aa as a0,aE as D,aF as Q1,aG as ee,aH as F,aI as f0,aJ as ae,aK as te,aL as re,aM as oe,aN as ne,aO as le,aP as b0,c as d,g as i,y as J,z as Y,k as c,I as ie,a3 as se,C as de,u as ce,a as ue,aQ as N0,r as fe,ac as e0,b as V0,e as L0,aR as be,w as M,h as S,f as Z,R as j0,B as i0,j as Z0,i as X,a1 as O0,aS as p0,l as pe,aT as ve,N as he,aU as ge,aV as me,aW as ye,X as xe,aX as Ae,V as $e,Y as we,M as Ve,aY as Le}from"./index-Dxiu9uL-.js";import{G as Ze}from"./PhArrowLeft.vue-Dzb2MdBo.js";import{_ as He}from"./room-status-tag.vue_vue_type_script_setup_true_lang-CDwi3P3q.js";import{N as Se}from"./Badge-IEt7GAoo.js";import"./LayoutContent-7DanobOi.js";import"./attribute-Cz32yFEB.js";const Me=E0(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[E0("&::-webkit-scrollbar",{width:0,height:0})]),Ce=j({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=N(null);function a(f){!(f.currentTarget.offsetWidth<f.currentTarget.scrollWidth)||f.deltaY===0||(f.currentTarget.scrollLeft+=f.deltaY+f.deltaX,f.preventDefault())}const s=W1();return Me.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:I1,ssr:s}),Object.assign({selfRef:e,handleWheel:a},{scrollTo(...f){var A;(A=e.value)===null||A===void 0||A.scrollTo(...f)}})},render(){return w("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var ke=/\s/;function ze(e){for(var a=e.length;a--&&ke.test(e.charAt(a)););return a}var Te=/^\s+/;function Re(e){return e&&e.slice(0,ze(e)+1).replace(Te,"")}var q0=NaN,_e=/^[-+]0x[0-9a-f]+$/i,Pe=/^0b[01]+$/i,Be=/^0o[0-7]+$/i,Ee=parseInt;function D0(e){if(typeof e=="number")return e;if(N1(e))return q0;if(v0(e)){var a=typeof e.valueOf=="function"?e.valueOf():e;e=v0(a)?a+"":a}if(typeof e!="string")return e===0?e:+e;e=Re(e);var s=Pe.test(e);return s||Be.test(e)?Ee(e.slice(2),s?2:8):_e.test(e)?q0:+e}var H0=function(){return j1.Date.now()},We="Expected a function",Ie=Math.max,Ne=Math.min;function je(e,a,s){var p,f,A,t,l,x,m=0,v=!1,H=!1,W=!0;if(typeof e!="function")throw new TypeError(We);a=D0(a)||0,v0(s)&&(v=!!s.leading,H="maxWait"in s,A=H?Ie(D0(s.maxWait)||0,a):A,W="trailing"in s?!!s.trailing:W);function C(u){var L=p,Q=f;return p=f=void 0,m=u,t=e.apply(Q,L),t}function R(u){return m=u,l=setTimeout(B,a),v?C(u):t}function z(u){var L=u-x,Q=u-m,s0=a-L;return H?Ne(s0,A-Q):s0}function P(u){var L=u-x,Q=u-m;return x===void 0||L>=a||L<0||H&&Q>=A}function B(){var u=H0();if(P(u))return _(u);l=setTimeout(B,z(u))}function _(u){return l=void 0,W&&p?C(u):(p=f=void 0,t)}function G(){l!==void 0&&clearTimeout(l),m=0,p=x=f=l=void 0}function I(){return l===void 0?t:_(H0())}function h(){var u=H0(),L=P(u);if(p=arguments,f=this,x=u,L){if(l===void 0)return R(x);if(H)return clearTimeout(l),l=setTimeout(B,a),C(x)}return l===void 0&&(l=setTimeout(B,a)),t}return h.cancel=G,h.flush=I,h}var Oe="Expected a function";function qe(e,a,s){var p=!0,f=!0;if(typeof e!="function")throw new TypeError(Oe);return v0(s)&&(p="leading"in s?!!s.leading:p,f="trailing"in s?!!s.trailing:f),je(e,a,{leading:p,maxWait:a,trailing:f})}const e1=O1("n-tabs"),De={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Fe=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},U1(De,["displayDirective"])),h0=j({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:Fe,setup(e){const{mergedClsPrefixRef:a,valueRef:s,typeRef:p,closableRef:f,tabStyleRef:A,addTabStyleRef:t,tabClassRef:l,addTabClassRef:x,tabChangeIdRef:m,onBeforeLeaveRef:v,triggerRef:H,handleAdd:W,activateTab:C,handleClose:R}=V(e1);return{trigger:H,mergedClosable:g(()=>{if(e.internalAddable)return!1;const{closable:z}=e;return z===void 0?f.value:z}),style:A,addStyle:t,tabClass:l,addTabClass:x,clsPrefix:a,value:s,type:p,handleClose(z){z.stopPropagation(),!e.disabled&&R(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){W();return}const{name:z}=e,P=++m.id;if(z!==s.value){const{value:B}=v;B?Promise.resolve(B(e.name,s.value)).then(_=>{_&&m.id===P&&C(z)}):C(z)}}}},render(){const{internalAddable:e,clsPrefix:a,name:s,disabled:p,label:f,tab:A,value:t,mergedClosable:l,trigger:x,$slots:{default:m}}=this,v=f??A;return w("div",{class:`${a}-tabs-tab-wrapper`},this.internalLeftPadded?w("div",{class:`${a}-tabs-tab-pad`}):null,w("div",Object.assign({key:s,"data-name":s,"data-disabled":p?!0:void 0},U({class:[`${a}-tabs-tab`,t===s&&`${a}-tabs-tab--active`,p&&`${a}-tabs-tab--disabled`,l&&`${a}-tabs-tab--closable`,e&&`${a}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:x==="click"?this.activateTab:void 0,onMouseenter:x==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),w("span",{class:`${a}-tabs-tab__label`},e?w(C0,null,w("div",{class:`${a}-tabs-tab__height-placeholder`}," "),w(D1,{clsPrefix:a},{default:()=>w(F1,null)})):m?m():typeof v=="object"?v:q1(v??s)),l&&this.type==="card"?w(G1,{clsPrefix:a,class:`${a}-tabs-tab__close`,onClick:this.handleClose,disabled:p}):null))}}),Ge=n("tabs",`
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
 `,[E("prefix, suffix",`
 display: flex;
 align-items: center;
 `),E("prefix","padding-right: 16px;"),E("suffix","padding-left: 16px;")]),y("top, bottom",[k(">",[n("tabs-nav",[n("tabs-nav-scroll-wrapper",[k("&::before",`
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
 `,[y("disabled",{cursor:"not-allowed"}),E("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),E("label",`
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
 `),y("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),n("tabs-nav",[y("line-type",[y("top",[E("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 bottom: -1px;
 `)]),y("left",[E("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 right: -1px;
 `)]),y("right",[E("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 left: -1px;
 `)]),y("bottom",[E("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 top: -1px;
 `)]),E("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),n("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),n("tabs-bar",`
 border-radius: 0;
 `)]),y("card-type",[E("prefix, suffix",`
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
 `,[E("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),Y1("disabled",[k("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),y("closable","padding-right: 8px;"),y("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),y("disabled","color: var(--n-tab-text-color-disabled);")])]),y("left, right",`
 flex-direction: column; 
 `,[E("prefix, suffix",`
 padding: var(--n-tab-padding-vertical);
 `),n("tabs-wrapper",`
 flex-direction: column;
 `),n("tabs-tab-wrapper",`
 flex-direction: column;
 `,[n("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),y("top",[y("card-type",[n("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),E("prefix, suffix",`
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
 `)])]),y("left",[y("card-type",[n("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),E("prefix, suffix",`
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
 `)])]),y("right",[y("card-type",[n("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),E("prefix, suffix",`
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
 `)])]),y("bottom",[y("card-type",[n("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),E("prefix, suffix",`
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
 `)])])])]),S0=qe,Ue=Object.assign(Object.assign({},J0.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),Ye=j({name:"Tabs",props:Ue,slots:Object,setup(e,{slots:a}){var s,p,f,A;const{mergedClsPrefixRef:t,inlineThemeDisabled:l}=K1(e),x=J0("Tabs","-tabs",Ge,X1,e,t),m=N(null),v=N(null),H=N(null),W=N(null),C=N(null),R=N(null),z=N(!0),P=N(!0),B=I0(e,["labelSize","size"]),_=I0(e,["activeName","value"]),G=N((p=(s=_.value)!==null&&s!==void 0?s:e.defaultValue)!==null&&p!==void 0?p:a.default?(A=(f=x0(a.default())[0])===null||f===void 0?void 0:f.props)===null||A===void 0?void 0:A.name:null),I=J1(_,G),h={id:0},u=g(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});$0(I,()=>{h.id=0,d0(),z0()});function L(){var r;const{value:o}=I;return o===null?null:(r=m.value)===null||r===void 0?void 0:r.querySelector(`[data-name="${o}"]`)}function Q(r){if(e.type==="card")return;const{value:o}=v;if(!o)return;const b=o.style.opacity==="0";if(r){const $=`${t.value}-tabs-bar--disabled`,{barWidth:T,placement:O}=e;if(r.dataset.disabled==="true"?o.classList.add($):o.classList.remove($),["top","bottom"].includes(O)){if(k0(["top","maxHeight","height"]),typeof T=="number"&&r.offsetWidth>=T){const q=Math.floor((r.offsetWidth-T)/2)+r.offsetLeft;o.style.left=`${q}px`,o.style.maxWidth=`${T}px`}else o.style.left=`${r.offsetLeft}px`,o.style.maxWidth=`${r.offsetWidth}px`;o.style.width="8192px",b&&(o.style.transition="none"),o.offsetWidth,b&&(o.style.transition="",o.style.opacity="1")}else{if(k0(["left","maxWidth","width"]),typeof T=="number"&&r.offsetHeight>=T){const q=Math.floor((r.offsetHeight-T)/2)+r.offsetTop;o.style.top=`${q}px`,o.style.maxHeight=`${T}px`}else o.style.top=`${r.offsetTop}px`,o.style.maxHeight=`${r.offsetHeight}px`;o.style.height="8192px",b&&(o.style.transition="none"),o.offsetHeight,b&&(o.style.transition="",o.style.opacity="1")}}}function s0(){if(e.type==="card")return;const{value:r}=v;r&&(r.style.opacity="0")}function k0(r){const{value:o}=v;if(o)for(const b of r)o.style[b]=""}function d0(){if(e.type==="card")return;const r=L();r?Q(r):s0()}function z0(){var r;const o=(r=C.value)===null||r===void 0?void 0:r.$el;if(!o)return;const b=L();if(!b)return;const{scrollLeft:$,offsetWidth:T}=o,{offsetLeft:O,offsetWidth:q}=b;$>O?o.scrollTo({top:0,left:O,behavior:"smooth"}):O+q>$+T&&o.scrollTo({top:0,left:O+q-T,behavior:"smooth"})}const c0=N(null);let g0=0,K=null;function a1(r){const o=c0.value;if(o){g0=r.getBoundingClientRect().height;const b=`${g0}px`,$=()=>{o.style.height=b,o.style.maxHeight=b};K?($(),K(),K=null):K=$}}function t1(r){const o=c0.value;if(o){const b=r.getBoundingClientRect().height,$=()=>{document.body.offsetHeight,o.style.maxHeight=`${b}px`,o.style.height=`${Math.max(g0,b)}px`};K?(K(),K=null,$()):K=$}}function r1(){const r=c0.value;if(r){r.style.maxHeight="",r.style.height="";const{paneWrapperStyle:o}=e;if(typeof o=="string")r.style.cssText=o;else if(o){const{maxHeight:b,height:$}=o;b!==void 0&&(r.style.maxHeight=b),$!==void 0&&(r.style.height=$)}}}const T0={value:[]},R0=N("next");function o1(r){const o=I.value;let b="next";for(const $ of T0.value){if($===o)break;if($===r){b="prev";break}}R0.value=b,n1(r)}function n1(r){const{onActiveNameChange:o,onUpdateValue:b,"onUpdate:value":$}=e;o&&b0(o,r),b&&b0(b,r),$&&b0($,r),G.value=r}function l1(r){const{onClose:o}=e;o&&b0(o,r)}function _0(){const{value:r}=v;if(!r)return;const o="transition-disabled";r.classList.add(o),d0(),r.classList.remove(o)}const t0=N(null);function m0({transitionDisabled:r}){const o=m.value;if(!o)return;r&&o.classList.add("transition-disabled");const b=L();b&&t0.value&&(t0.value.style.width=`${b.offsetWidth}px`,t0.value.style.height=`${b.offsetHeight}px`,t0.value.style.transform=`translateX(${b.offsetLeft-te(getComputedStyle(o).paddingLeft)}px)`,r&&t0.value.offsetWidth),r&&o.classList.remove("transition-disabled")}$0([I],()=>{e.type==="segment"&&w0(()=>{m0({transitionDisabled:!1})})}),Q0(()=>{e.type==="segment"&&m0({transitionDisabled:!0})});let P0=0;function i1(r){var o;if(r.contentRect.width===0&&r.contentRect.height===0||P0===r.contentRect.width)return;P0=r.contentRect.width;const{type:b}=e;if((b==="line"||b==="bar")&&_0(),b!=="segment"){const{placement:$}=e;y0(($==="top"||$==="bottom"?(o=C.value)===null||o===void 0?void 0:o.$el:R.value)||null)}}const s1=S0(i1,64);$0([()=>e.justifyContent,()=>e.size],()=>{w0(()=>{const{type:r}=e;(r==="line"||r==="bar")&&_0()})});const r0=N(!1);function d1(r){var o;const{target:b,contentRect:{width:$,height:T}}=r,O=b.parentElement.parentElement.offsetWidth,q=b.parentElement.parentElement.offsetHeight,{placement:n0}=e;if(!r0.value)n0==="top"||n0==="bottom"?O<$&&(r0.value=!0):q<T&&(r0.value=!0);else{const{value:l0}=W;if(!l0)return;n0==="top"||n0==="bottom"?O-$>l0.$el.offsetWidth&&(r0.value=!1):q-T>l0.$el.offsetHeight&&(r0.value=!1)}y0(((o=C.value)===null||o===void 0?void 0:o.$el)||null)}const c1=S0(d1,64);function u1(){const{onAdd:r}=e;r&&r(),w0(()=>{const o=L(),{value:b}=C;!o||!b||b.scrollTo({left:o.offsetLeft,top:0,behavior:"smooth"})})}function y0(r){if(!r)return;const{placement:o}=e;if(o==="top"||o==="bottom"){const{scrollLeft:b,scrollWidth:$,offsetWidth:T}=r;z.value=b<=0,P.value=b+T>=$}else{const{scrollTop:b,scrollHeight:$,offsetHeight:T}=r;z.value=b<=0,P.value=b+T>=$}}const f1=S0(r=>{y0(r.target)},64);a0(e1,{triggerRef:D(e,"trigger"),tabStyleRef:D(e,"tabStyle"),tabClassRef:D(e,"tabClass"),addTabStyleRef:D(e,"addTabStyle"),addTabClassRef:D(e,"addTabClass"),paneClassRef:D(e,"paneClass"),paneStyleRef:D(e,"paneStyle"),mergedClsPrefixRef:t,typeRef:D(e,"type"),closableRef:D(e,"closable"),valueRef:I,tabChangeIdRef:h,onBeforeLeaveRef:D(e,"onBeforeLeave"),activateTab:o1,handleClose:l1,handleAdd:u1}),Q1(()=>{d0(),z0()}),ee(()=>{const{value:r}=H;if(!r)return;const{value:o}=t,b=`${o}-tabs-nav-scroll-wrapper--shadow-start`,$=`${o}-tabs-nav-scroll-wrapper--shadow-end`;z.value?r.classList.remove(b):r.classList.add(b),P.value?r.classList.remove($):r.classList.add($)});const b1={syncBarPosition:()=>{d0()}},p1=()=>{m0({transitionDisabled:!0})},B0=g(()=>{const{value:r}=B,{type:o}=e,b={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[o],$=`${r}${b}`,{self:{barColor:T,closeIconColor:O,closeIconColorHover:q,closeIconColorPressed:n0,tabColor:l0,tabBorderColor:v1,paneTextColor:h1,tabFontWeight:g1,tabBorderRadius:m1,tabFontWeightActive:y1,colorSegment:x1,fontWeightStrong:A1,tabColorSegment:$1,closeSize:w1,closeIconSize:V1,closeColorHover:L1,closeColorPressed:Z1,closeBorderRadius:H1,[F("panePadding",r)]:u0,[F("tabPadding",$)]:S1,[F("tabPaddingVertical",$)]:M1,[F("tabGap",$)]:C1,[F("tabGap",`${$}Vertical`)]:k1,[F("tabTextColor",o)]:z1,[F("tabTextColorActive",o)]:T1,[F("tabTextColorHover",o)]:R1,[F("tabTextColorDisabled",o)]:_1,[F("tabFontSize",r)]:P1},common:{cubicBezierEaseInOut:B1}}=x.value;return{"--n-bezier":B1,"--n-color-segment":x1,"--n-bar-color":T,"--n-tab-font-size":P1,"--n-tab-text-color":z1,"--n-tab-text-color-active":T1,"--n-tab-text-color-disabled":_1,"--n-tab-text-color-hover":R1,"--n-pane-text-color":h1,"--n-tab-border-color":v1,"--n-tab-border-radius":m1,"--n-close-size":w1,"--n-close-icon-size":V1,"--n-close-color-hover":L1,"--n-close-color-pressed":Z1,"--n-close-border-radius":H1,"--n-close-icon-color":O,"--n-close-icon-color-hover":q,"--n-close-icon-color-pressed":n0,"--n-tab-color":l0,"--n-tab-font-weight":g1,"--n-tab-font-weight-active":y1,"--n-tab-padding":S1,"--n-tab-padding-vertical":M1,"--n-tab-gap":C1,"--n-tab-gap-vertical":k1,"--n-pane-padding-left":f0(u0,"left"),"--n-pane-padding-right":f0(u0,"right"),"--n-pane-padding-top":f0(u0,"top"),"--n-pane-padding-bottom":f0(u0,"bottom"),"--n-font-weight-strong":A1,"--n-tab-color-segment":$1}}),o0=l?ae("tabs",g(()=>`${B.value[0]}${e.type[0]}`),B0,e):void 0;return Object.assign({mergedClsPrefix:t,mergedValue:I,renderedNames:new Set,segmentCapsuleElRef:t0,tabsPaneWrapperRef:c0,tabsElRef:m,barElRef:v,addTabInstRef:W,xScrollInstRef:C,scrollWrapperElRef:H,addTabFixed:r0,tabWrapperStyle:u,handleNavResize:s1,mergedSize:B,handleScroll:f1,handleTabsResize:c1,cssVars:l?void 0:B0,themeClass:o0==null?void 0:o0.themeClass,animationDirection:R0,renderNameListRef:T0,yScrollElRef:R,handleSegmentResize:p1,onAnimationBeforeLeave:a1,onAnimationEnter:t1,onAnimationAfterEnter:r1,onRender:o0==null?void 0:o0.onRender},b1)},render(){const{mergedClsPrefix:e,type:a,placement:s,addTabFixed:p,addable:f,mergedSize:A,renderNameListRef:t,onRender:l,paneWrapperClass:x,paneWrapperStyle:m,$slots:{default:v,prefix:H,suffix:W}}=this;l==null||l();const C=v?x0(v()).filter(h=>h.type.__TAB_PANE__===!0):[],R=v?x0(v()).filter(h=>h.type.__TAB__===!0):[],z=!R.length,P=a==="card",B=a==="segment",_=!P&&!B&&this.justifyContent;t.value=[];const G=()=>{const h=w("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},_?null:w("div",{class:`${e}-tabs-scroll-padding`,style:s==="top"||s==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),z?C.map((u,L)=>(t.value.push(u.props.name),M0(w(h0,Object.assign({},u.props,{internalCreatedByPane:!0,internalLeftPadded:L!==0&&(!_||_==="center"||_==="start"||_==="end")}),u.children?{default:u.children.tab}:void 0)))):R.map((u,L)=>(t.value.push(u.props.name),M0(L!==0&&!_?U0(u):u))),!p&&f&&P?G0(f,(z?C.length:R.length)!==0):null,_?null:w("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return w("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},P&&f?w(A0,{onResize:this.handleTabsResize},{default:()=>h}):h,P?w("div",{class:`${e}-tabs-pad`}):null,P?null:w("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},I=B?"top":s;return w("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${a}-type`,`${e}-tabs--${A}-size`,_&&`${e}-tabs--flex`,`${e}-tabs--${I}`],style:this.cssVars},w("div",{class:[`${e}-tabs-nav--${a}-type`,`${e}-tabs-nav--${I}`,`${e}-tabs-nav`]},W0(H,h=>h&&w("div",{class:`${e}-tabs-nav__prefix`},h)),B?w(A0,{onResize:this.handleSegmentResize},{default:()=>w("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},w("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},w("div",{class:`${e}-tabs-wrapper`},w("div",{class:`${e}-tabs-tab`}))),z?C.map((h,u)=>(t.value.push(h.props.name),w(h0,Object.assign({},h.props,{internalCreatedByPane:!0,internalLeftPadded:u!==0}),h.children?{default:h.children.tab}:void 0))):R.map((h,u)=>(t.value.push(h.props.name),u===0?h:U0(h))))}):w(A0,{onResize:this.handleNavResize},{default:()=>w("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(I)?w(Ce,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:G}):w("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},G()))}),p&&f&&P?G0(f,!0):null,W0(W,h=>h&&w("div",{class:`${e}-tabs-nav__suffix`},h))),z&&(this.animated&&(I==="top"||I==="bottom")?w("div",{ref:"tabsPaneWrapperRef",style:m,class:[`${e}-tabs-pane-wrapper`,x]},F0(C,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):F0(C,this.mergedValue,this.renderedNames)))}});function F0(e,a,s,p,f,A,t){const l=[];return e.forEach(x=>{const{name:m,displayDirective:v,"display-directive":H}=x.props,W=R=>v===R||H===R,C=a===m;if(x.key!==void 0&&(x.key=m),C||W("show")||W("show:lazy")&&s.has(m)){s.has(m)||s.add(m);const R=!W("if");l.push(R?re(x,[[oe,C]]):x)}}),t?w(ne,{name:`${t}-transition`,onBeforeLeave:p,onEnter:f,onAfterEnter:A},{default:()=>l}):l}function G0(e,a){return w(h0,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:a,disabled:typeof e=="object"&&e.disabled})}function U0(e){const a=le(e);return a.props?a.props.internalLeftPadded=!0:a.props={internalLeftPadded:!0},a}function M0(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const Ke=["width","height","fill","transform"],Xe={key:0},Je=c("path",{d:"M128,76a52,52,0,1,0,52,52A52.06,52.06,0,0,0,128,76Zm0,80a28,28,0,1,1,28-28A28,28,0,0,1,128,156Zm92-27.21v-1.58l14-17.51a12,12,0,0,0,2.23-10.59A111.75,111.75,0,0,0,225,71.89,12,12,0,0,0,215.89,66L193.61,63.5l-1.11-1.11L190,40.1A12,12,0,0,0,184.11,31a111.67,111.67,0,0,0-27.23-11.27A12,12,0,0,0,146.3,22L128.79,36h-1.58L109.7,22a12,12,0,0,0-10.59-2.23A111.75,111.75,0,0,0,71.89,31.05,12,12,0,0,0,66,40.11L63.5,62.39,62.39,63.5,40.1,66A12,12,0,0,0,31,71.89,111.67,111.67,0,0,0,19.77,99.12,12,12,0,0,0,22,109.7l14,17.51v1.58L22,146.3a12,12,0,0,0-2.23,10.59,111.75,111.75,0,0,0,11.29,27.22A12,12,0,0,0,40.11,190l22.28,2.48,1.11,1.11L66,215.9A12,12,0,0,0,71.89,225a111.67,111.67,0,0,0,27.23,11.27A12,12,0,0,0,109.7,234l17.51-14h1.58l17.51,14a12,12,0,0,0,10.59,2.23A111.75,111.75,0,0,0,184.11,225a12,12,0,0,0,5.91-9.06l2.48-22.28,1.11-1.11L215.9,190a12,12,0,0,0,9.06-5.91,111.67,111.67,0,0,0,11.27-27.23A12,12,0,0,0,234,146.3Zm-24.12-4.89a70.1,70.1,0,0,1,0,8.2,12,12,0,0,0,2.61,8.22l12.84,16.05A86.47,86.47,0,0,1,207,166.86l-20.43,2.27a12,12,0,0,0-7.65,4,69,69,0,0,1-5.8,5.8,12,12,0,0,0-4,7.65L166.86,207a86.47,86.47,0,0,1-10.49,4.35l-16.05-12.85a12,12,0,0,0-7.5-2.62c-.24,0-.48,0-.72,0a70.1,70.1,0,0,1-8.2,0,12.06,12.06,0,0,0-8.22,2.6L99.63,211.33A86.47,86.47,0,0,1,89.14,207l-2.27-20.43a12,12,0,0,0-4-7.65,69,69,0,0,1-5.8-5.8,12,12,0,0,0-7.65-4L49,166.86a86.47,86.47,0,0,1-4.35-10.49l12.84-16.05a12,12,0,0,0,2.61-8.22,70.1,70.1,0,0,1,0-8.2,12,12,0,0,0-2.61-8.22L44.67,99.63A86.47,86.47,0,0,1,49,89.14l20.43-2.27a12,12,0,0,0,7.65-4,69,69,0,0,1,5.8-5.8,12,12,0,0,0,4-7.65L89.14,49a86.47,86.47,0,0,1,10.49-4.35l16.05,12.85a12.06,12.06,0,0,0,8.22,2.6,70.1,70.1,0,0,1,8.2,0,12,12,0,0,0,8.22-2.6l16.05-12.85A86.47,86.47,0,0,1,166.86,49l2.27,20.43a12,12,0,0,0,4,7.65,69,69,0,0,1,5.8,5.8,12,12,0,0,0,7.65,4L207,89.14a86.47,86.47,0,0,1,4.35,10.49l-12.84,16.05A12,12,0,0,0,195.88,123.9Z"},null,-1),Qe=[Je],ea={key:1},aa=c("path",{d:"M207.86,123.18l16.78-21a99.14,99.14,0,0,0-10.07-24.29l-26.7-3a81,81,0,0,0-6.81-6.81l-3-26.71a99.43,99.43,0,0,0-24.3-10l-21,16.77a81.59,81.59,0,0,0-9.64,0l-21-16.78A99.14,99.14,0,0,0,77.91,41.43l-3,26.7a81,81,0,0,0-6.81,6.81l-26.71,3a99.43,99.43,0,0,0-10,24.3l16.77,21a81.59,81.59,0,0,0,0,9.64l-16.78,21a99.14,99.14,0,0,0,10.07,24.29l26.7,3a81,81,0,0,0,6.81,6.81l3,26.71a99.43,99.43,0,0,0,24.3,10l21-16.77a81.59,81.59,0,0,0,9.64,0l21,16.78a99.14,99.14,0,0,0,24.29-10.07l3-26.7a81,81,0,0,0,6.81-6.81l26.71-3a99.43,99.43,0,0,0,10-24.3l-16.77-21A81.59,81.59,0,0,0,207.86,123.18ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z",opacity:"0.2"},null,-1),ta=c("path",{d:"M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8.06,8.06,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8.06,8.06,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"},null,-1),ra=[aa,ta],oa={key:2},na=c("path",{d:"M216,130.16q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"},null,-1),la=[na],ia={key:3},sa=c("path",{d:"M128,82a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162ZM214,130.84c.06-1.89.06-3.79,0-5.68L229.33,106a6,6,0,0,0,1.11-5.29A105.34,105.34,0,0,0,219.76,74.9a6,6,0,0,0-4.53-3l-24.45-2.71q-1.93-2.07-4-4l-2.72-24.46a6,6,0,0,0-3-4.53,105.65,105.65,0,0,0-25.77-10.66A6,6,0,0,0,150,26.68l-19.2,15.37c-1.89-.06-3.79-.06-5.68,0L106,26.67a6,6,0,0,0-5.29-1.11A105.34,105.34,0,0,0,74.9,36.24a6,6,0,0,0-3,4.53L69.23,65.22q-2.07,1.94-4,4L40.76,72a6,6,0,0,0-4.53,3,105.65,105.65,0,0,0-10.66,25.77A6,6,0,0,0,26.68,106l15.37,19.2c-.06,1.89-.06,3.79,0,5.68L26.67,150.05a6,6,0,0,0-1.11,5.29A105.34,105.34,0,0,0,36.24,181.1a6,6,0,0,0,4.53,3l24.45,2.71q1.94,2.07,4,4L72,215.24a6,6,0,0,0,3,4.53,105.65,105.65,0,0,0,25.77,10.66,6,6,0,0,0,5.29-1.11L125.16,214c1.89.06,3.79.06,5.68,0l19.21,15.38a6,6,0,0,0,3.75,1.31,6.2,6.2,0,0,0,1.54-.2,105.34,105.34,0,0,0,25.76-10.68,6,6,0,0,0,3-4.53l2.71-24.45q2.07-1.93,4-4l24.46-2.72a6,6,0,0,0,4.53-3,105.49,105.49,0,0,0,10.66-25.77,6,6,0,0,0-1.11-5.29Zm-3.1,41.63-23.64,2.63a6,6,0,0,0-3.82,2,75.14,75.14,0,0,1-6.31,6.31,6,6,0,0,0-2,3.82l-2.63,23.63A94.28,94.28,0,0,1,155.14,218l-18.57-14.86a6,6,0,0,0-3.75-1.31h-.36a78.07,78.07,0,0,1-8.92,0,6,6,0,0,0-4.11,1.3L100.87,218a94.13,94.13,0,0,1-17.34-7.17L80.9,187.21a6,6,0,0,0-2-3.82,75.14,75.14,0,0,1-6.31-6.31,6,6,0,0,0-3.82-2l-23.63-2.63A94.28,94.28,0,0,1,38,155.14l14.86-18.57a6,6,0,0,0,1.3-4.11,78.07,78.07,0,0,1,0-8.92,6,6,0,0,0-1.3-4.11L38,100.87a94.13,94.13,0,0,1,7.17-17.34L68.79,80.9a6,6,0,0,0,3.82-2,75.14,75.14,0,0,1,6.31-6.31,6,6,0,0,0,2-3.82l2.63-23.63A94.28,94.28,0,0,1,100.86,38l18.57,14.86a6,6,0,0,0,4.11,1.3,78.07,78.07,0,0,1,8.92,0,6,6,0,0,0,4.11-1.3L155.13,38a94.13,94.13,0,0,1,17.34,7.17l2.63,23.64a6,6,0,0,0,2,3.82,75.14,75.14,0,0,1,6.31,6.31,6,6,0,0,0,3.82,2l23.63,2.63A94.28,94.28,0,0,1,218,100.86l-14.86,18.57a6,6,0,0,0-1.3,4.11,78.07,78.07,0,0,1,0,8.92,6,6,0,0,0,1.3,4.11L218,155.13A94.13,94.13,0,0,1,210.85,172.47Z"},null,-1),da=[sa],ca={key:4},ua=c("path",{d:"M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"},null,-1),fa=[ua],ba={key:5},pa=c("path",{d:"M128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36,36,0,0,1,128,164Zm83.93-32.49q.13-3.51,0-7l15.83-19.79a4,4,0,0,0,.75-3.53A103.64,103.64,0,0,0,218,75.9a4,4,0,0,0-3-2l-25.19-2.8c-1.58-1.71-3.24-3.37-4.95-4.95L182.07,41a4,4,0,0,0-2-3A104,104,0,0,0,154.82,27.5a4,4,0,0,0-3.53.74L131.51,44.07q-3.51-.14-7,0L104.7,28.24a4,4,0,0,0-3.53-.75A103.64,103.64,0,0,0,75.9,38a4,4,0,0,0-2,3l-2.8,25.19c-1.71,1.58-3.37,3.24-4.95,4.95L41,73.93a4,4,0,0,0-3,2A104,104,0,0,0,27.5,101.18a4,4,0,0,0,.74,3.53l15.83,19.78q-.14,3.51,0,7L28.24,151.3a4,4,0,0,0-.75,3.53A103.64,103.64,0,0,0,38,180.1a4,4,0,0,0,3,2l25.19,2.8c1.58,1.71,3.24,3.37,4.95,4.95l2.8,25.2a4,4,0,0,0,2,3,104,104,0,0,0,25.28,10.46,4,4,0,0,0,3.53-.74l19.78-15.83q3.51.13,7,0l19.79,15.83a4,4,0,0,0,2.5.88,4,4,0,0,0,1-.13A103.64,103.64,0,0,0,180.1,218a4,4,0,0,0,2-3l2.8-25.19c1.71-1.58,3.37-3.24,4.95-4.95l25.2-2.8a4,4,0,0,0,3-2,104,104,0,0,0,10.46-25.28,4,4,0,0,0-.74-3.53Zm.17,42.83-24.67,2.74a4,4,0,0,0-2.55,1.32,76.2,76.2,0,0,1-6.48,6.48,4,4,0,0,0-1.32,2.55l-2.74,24.66a95.45,95.45,0,0,1-19.64,8.15l-19.38-15.51a4,4,0,0,0-2.5-.87h-.24a73.67,73.67,0,0,1-9.16,0,4,4,0,0,0-2.74.87l-19.37,15.5a95.33,95.33,0,0,1-19.65-8.13l-2.74-24.67a4,4,0,0,0-1.32-2.55,76.2,76.2,0,0,1-6.48-6.48,4,4,0,0,0-2.55-1.32l-24.66-2.74a95.45,95.45,0,0,1-8.15-19.64l15.51-19.38a4,4,0,0,0,.87-2.74,77.76,77.76,0,0,1,0-9.16,4,4,0,0,0-.87-2.74l-15.5-19.37A95.33,95.33,0,0,1,43.9,81.66l24.67-2.74a4,4,0,0,0,2.55-1.32,76.2,76.2,0,0,1,6.48-6.48,4,4,0,0,0,1.32-2.55l2.74-24.66a95.45,95.45,0,0,1,19.64-8.15l19.38,15.51a4,4,0,0,0,2.74.87,73.67,73.67,0,0,1,9.16,0,4,4,0,0,0,2.74-.87l19.37-15.5a95.33,95.33,0,0,1,19.65,8.13l2.74,24.67a4,4,0,0,0,1.32,2.55,76.2,76.2,0,0,1,6.48,6.48,4,4,0,0,0,2.55,1.32l24.66,2.74a95.45,95.45,0,0,1,8.15,19.64l-15.51,19.38a4,4,0,0,0-.87,2.74,77.76,77.76,0,0,1,0,9.16,4,4,0,0,0,.87,2.74l15.5,19.37A95.33,95.33,0,0,1,212.1,174.34Z"},null,-1),va=[pa],ha={name:"PhGear"},ga=j({...ha,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,s=V("weight","regular"),p=V("size","1em"),f=V("color","currentColor"),A=V("mirrored",!1),t=g(()=>a.weight??s),l=g(()=>a.size??p),x=g(()=>a.color??f),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(v,H)=>(i(),d("svg",U({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:l.value,height:l.value,fill:x.value,transform:m.value},v.$attrs),[J(v.$slots,"default"),t.value==="bold"?(i(),d("g",Xe,Qe)):t.value==="duotone"?(i(),d("g",ea,ra)):t.value==="fill"?(i(),d("g",oa,la)):t.value==="light"?(i(),d("g",ia,da)):t.value==="regular"?(i(),d("g",ca,fa)):t.value==="thin"?(i(),d("g",ba,va)):Y("",!0)],16,Ke))}}),ma=["width","height","fill","transform"],ya={key:0},xa=c("path",{d:"M222.14,105.85l-80-80a20,20,0,0,0-28.28,0l-80,80A19.86,19.86,0,0,0,28,120v96a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V164h24v52a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V120A19.86,19.86,0,0,0,222.14,105.85ZM204,204H164V152a12,12,0,0,0-12-12H104a12,12,0,0,0-12,12v52H52V121.65l76-76,76,76Z"},null,-1),Aa=[xa],$a={key:1},wa=c("path",{d:"M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z",opacity:"0.2"},null,-1),Va=c("path",{d:"M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"},null,-1),La=[wa,Va],Za={key:2},Ha=c("path",{d:"M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"},null,-1),Sa=[Ha],Ma={key:3},Ca=c("path",{d:"M217.9,110.1l-80-80a14,14,0,0,0-19.8,0l-80,80A13.92,13.92,0,0,0,34,120v96a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V158h36v58a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V120A13.92,13.92,0,0,0,217.9,110.1ZM210,210H158V152a6,6,0,0,0-6-6H104a6,6,0,0,0-6,6v58H46V120a2,2,0,0,1,.58-1.42l80-80a2,2,0,0,1,2.84,0l80,80A2,2,0,0,1,210,120Z"},null,-1),ka=[Ca],za={key:4},Ta=c("path",{d:"M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"},null,-1),Ra=[Ta],_a={key:5},Pa=c("path",{d:"M216.49,111.51l-80-80a12,12,0,0,0-17,0l-80,80A12,12,0,0,0,36,120v96a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V156h40v60a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V120A12,12,0,0,0,216.49,111.51ZM212,212H156V152a4,4,0,0,0-4-4H104a4,4,0,0,0-4,4v60H44V120a4,4,0,0,1,1.17-2.83l80-80a4,4,0,0,1,5.66,0l80,80A4,4,0,0,1,212,120Z"},null,-1),Ba=[Pa],Ea={name:"PhHouse"},Wa=j({...Ea,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,s=V("weight","regular"),p=V("size","1em"),f=V("color","currentColor"),A=V("mirrored",!1),t=g(()=>a.weight??s),l=g(()=>a.size??p),x=g(()=>a.color??f),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(v,H)=>(i(),d("svg",U({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:l.value,height:l.value,fill:x.value,transform:m.value},v.$attrs),[J(v.$slots,"default"),t.value==="bold"?(i(),d("g",ya,Aa)):t.value==="duotone"?(i(),d("g",$a,La)):t.value==="fill"?(i(),d("g",Za,Sa)):t.value==="light"?(i(),d("g",Ma,ka)):t.value==="regular"?(i(),d("g",za,Ra)):t.value==="thin"?(i(),d("g",_a,Ba)):Y("",!0)],16,ma))}}),Ia=["width","height","fill","transform"],Na={key:0},ja=c("path",{d:"M229.7,82.84l-175.94-54-.16-.05A20,20,0,0,0,28,48V192a20,20,0,0,0,19.94,20,20.38,20.38,0,0,0,5.66-.81l.16,0,78.24-24V196a20,20,0,0,0,20,20h32a20,20,0,0,0,20-20V165.06l25.7-7.89A20.1,20.1,0,0,0,244,138V102A20.1,20.1,0,0,0,229.7,82.84ZM52,186.58V53.43L132,78V162ZM180,192H156V179.78l24-7.36Zm40-56.95-64,19.63V85.33L220,105Z"},null,-1),Oa=[ja],qa={key:1},Da=c("path",{d:"M144,69.09V170.91L50.24,199.67A8,8,0,0,1,40,192V48a8,8,0,0,1,10.24-7.67Z",opacity:"0.2"},null,-1),Fa=c("path",{d:"M228.54,86.66l-176.06-54A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16,16,16,0,0,0,4.52-.65L136,181.73V192a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16v-29.9l28.54-8.75A16.09,16.09,0,0,0,240,138V102A16.09,16.09,0,0,0,228.54,86.66ZM136,165,48,192V48l88,27Zm48,27H152V176.82L184,167Zm40-54-.11,0L152,160.08V79.92l71.89,22,.11,0v36Z"},null,-1),Ga=[Da,Fa],Ua={key:2},Ya=c("path",{d:"M228.54,86.66l-176.06-54A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16,16,16,0,0,0,4.52-.65L136,181.73V192a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16v-29.9l28.54-8.75A16.09,16.09,0,0,0,240,138V102A16.09,16.09,0,0,0,228.54,86.66ZM184,192H152V176.82L184,167Zm40-54-.11,0L152,160.08V79.91L223.89,102l.11,0v36Z"},null,-1),Ka=[Ya],Xa={key:3},Ja=c("path",{d:"M228,88.59l-176.08-54A14,14,0,0,0,34,48V192a14,14,0,0,0,14,14,14.59,14.59,0,0,0,4-.59L138,179v13a14,14,0,0,0,14,14h32a14,14,0,0,0,14-14V160.62l30-9.19A14.07,14.07,0,0,0,238,138V102A14,14,0,0,0,228,88.59ZM48.56,193.92a2,2,0,0,1-1.76-.32A2,2,0,0,1,46,192V48a2,2,0,0,1,.8-1.6A2.05,2.05,0,0,1,48,46a1.79,1.79,0,0,1,.49.08L138,73.53v92.95ZM186,192a2,2,0,0,1-2,2H152a2,2,0,0,1-2-2V175.35l36-11Zm40-54a2,2,0,0,1-1.44,1.92l-.08,0L150,162.8V77.21l74.56,22.87A2,2,0,0,1,226,102Z"},null,-1),Qa=[Ja],et={key:4},at=c("path",{d:"M228.54,86.66l-176.06-54A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16,16,16,0,0,0,4.52-.65L136,181.73V192a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16v-29.9l28.54-8.75A16.09,16.09,0,0,0,240,138V102A16.09,16.09,0,0,0,228.54,86.66ZM136,165,48,192V48l88,27Zm48,27H152V176.82L184,167Zm40-54-.11,0L152,160.08V79.92l71.89,22,.11,0v36Z"},null,-1),tt=[at],rt={key:5},ot=c("path",{d:"M227.41,90.5l-176-54A12,12,0,0,0,36,48V192a12,12,0,0,0,12,12,12.41,12.41,0,0,0,3.45-.5L140,176.32V192a12,12,0,0,0,12,12h32a12,12,0,0,0,12-12V159.14l31.39-9.63A12.06,12.06,0,0,0,236,138V102A12,12,0,0,0,227.41,90.5ZM49.12,195.84A4,4,0,0,1,44,192V48a4,4,0,0,1,1.6-3.2A4,4,0,0,1,48,44a3.89,3.89,0,0,1,1.07.15L140,72.05V168ZM188,192a4,4,0,0,1-4,4H152a4,4,0,0,1-4-4V173.87l40-12.27Zm40-54a4,4,0,0,1-2.88,3.84l-.05,0L148,165.5v-91l77.12,23.66A4,4,0,0,1,228,102Z"},null,-1),nt=[ot],lt={name:"PhMegaphoneSimple"},it=j({...lt,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,s=V("weight","regular"),p=V("size","1em"),f=V("color","currentColor"),A=V("mirrored",!1),t=g(()=>a.weight??s),l=g(()=>a.size??p),x=g(()=>a.color??f),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(v,H)=>(i(),d("svg",U({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:l.value,height:l.value,fill:x.value,transform:m.value},v.$attrs),[J(v.$slots,"default"),t.value==="bold"?(i(),d("g",Na,Oa)):t.value==="duotone"?(i(),d("g",qa,Ga)):t.value==="fill"?(i(),d("g",Ua,Ka)):t.value==="light"?(i(),d("g",Xa,Qa)):t.value==="regular"?(i(),d("g",et,tt)):t.value==="thin"?(i(),d("g",rt,nt)):Y("",!0)],16,Ia))}}),st=["width","height","fill","transform"],dt={key:0},ct=c("path",{d:"M200,28H160a20,20,0,0,0-20,20V208a20,20,0,0,0,20,20h40a20,20,0,0,0,20-20V48A20,20,0,0,0,200,28Zm-4,176H164V52h32ZM96,28H56A20,20,0,0,0,36,48V208a20,20,0,0,0,20,20H96a20,20,0,0,0,20-20V48A20,20,0,0,0,96,28ZM92,204H60V52H92Z"},null,-1),ut=[ct],ft={key:1},bt=c("path",{d:"M208,48V208a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h40A8,8,0,0,1,208,48ZM96,40H56a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H96a8,8,0,0,0,8-8V48A8,8,0,0,0,96,40Z",opacity:"0.2"},null,-1),pt=c("path",{d:"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"},null,-1),vt=[bt,pt],ht={key:2},gt=c("path",{d:"M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"},null,-1),mt=[gt],yt={key:3},xt=c("path",{d:"M200,34H160a14,14,0,0,0-14,14V208a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V48A14,14,0,0,0,200,34Zm2,174a2,2,0,0,1-2,2H160a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2ZM96,34H56A14,14,0,0,0,42,48V208a14,14,0,0,0,14,14H96a14,14,0,0,0,14-14V48A14,14,0,0,0,96,34Zm2,174a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2H96a2,2,0,0,1,2,2Z"},null,-1),At=[xt],$t={key:4},wt=c("path",{d:"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"},null,-1),Vt=[wt],Lt={key:5},Zt=c("path",{d:"M200,36H160a12,12,0,0,0-12,12V208a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V48A12,12,0,0,0,200,36Zm4,172a4,4,0,0,1-4,4H160a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4ZM96,36H56A12,12,0,0,0,44,48V208a12,12,0,0,0,12,12H96a12,12,0,0,0,12-12V48A12,12,0,0,0,96,36Zm4,172a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4H96a4,4,0,0,1,4,4Z"},null,-1),Ht=[Zt],St={name:"PhPause"},Y0=j({...St,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,s=V("weight","regular"),p=V("size","1em"),f=V("color","currentColor"),A=V("mirrored",!1),t=g(()=>a.weight??s),l=g(()=>a.size??p),x=g(()=>a.color??f),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(v,H)=>(i(),d("svg",U({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:l.value,height:l.value,fill:x.value,transform:m.value},v.$attrs),[J(v.$slots,"default"),t.value==="bold"?(i(),d("g",dt,ut)):t.value==="duotone"?(i(),d("g",ft,vt)):t.value==="fill"?(i(),d("g",ht,mt)):t.value==="light"?(i(),d("g",yt,At)):t.value==="regular"?(i(),d("g",$t,Vt)):t.value==="thin"?(i(),d("g",Lt,Ht)):Y("",!0)],16,st))}}),Mt=["width","height","fill","transform"],Ct={key:0},kt=c("path",{d:"M234.49,111.07,90.41,22.94A20,20,0,0,0,60,39.87V216.13a20,20,0,0,0,30.41,16.93l144.08-88.13a19.82,19.82,0,0,0,0-33.86ZM84,208.85V47.15L216.16,128Z"},null,-1),zt=[kt],Tt={key:1},Rt=c("path",{d:"M228.23,134.69,84.15,222.81A8,8,0,0,1,72,216.12V39.88a8,8,0,0,1,12.15-6.69l144.08,88.12A7.82,7.82,0,0,1,228.23,134.69Z",opacity:"0.2"},null,-1),_t=c("path",{d:"M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"},null,-1),Pt=[Rt,_t],Bt={key:2},Et=c("path",{d:"M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"},null,-1),Wt=[Et],It={key:3},Nt=c("path",{d:"M231.36,116.19,87.28,28.06a14,14,0,0,0-14.18-.27A13.69,13.69,0,0,0,66,39.87V216.13a13.69,13.69,0,0,0,7.1,12.08,14,14,0,0,0,14.18-.27l144.08-88.13a13.82,13.82,0,0,0,0-23.62Zm-6.26,13.38L81,217.7a2,2,0,0,1-2.06,0,1.78,1.78,0,0,1-1-1.61V39.87a1.78,1.78,0,0,1,1-1.61A2.06,2.06,0,0,1,80,38a2,2,0,0,1,1,.31L225.1,126.43a1.82,1.82,0,0,1,0,3.14Z"},null,-1),jt=[Nt],Ot={key:4},qt=c("path",{d:"M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"},null,-1),Dt=[qt],Ft={key:5},Gt=c("path",{d:"M230.32,117.9,86.24,29.79a11.91,11.91,0,0,0-12.17-.23A11.71,11.71,0,0,0,68,39.89V216.11a11.71,11.71,0,0,0,6.07,10.33,11.91,11.91,0,0,0,12.17-.23L230.32,138.1a11.82,11.82,0,0,0,0-20.2Zm-4.18,13.37L82.06,219.39a4,4,0,0,1-4.07.07,3.77,3.77,0,0,1-2-3.35V39.89a3.77,3.77,0,0,1,2-3.35,4,4,0,0,1,4.07.07l144.08,88.12a3.8,3.8,0,0,1,0,6.54Z"},null,-1),Ut=[Gt],Yt={name:"PhPlay"},K0=j({...Yt,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,s=V("weight","regular"),p=V("size","1em"),f=V("color","currentColor"),A=V("mirrored",!1),t=g(()=>a.weight??s),l=g(()=>a.size??p),x=g(()=>a.color??f),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(v,H)=>(i(),d("svg",U({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:l.value,height:l.value,fill:x.value,transform:m.value},v.$attrs),[J(v.$slots,"default"),t.value==="bold"?(i(),d("g",Ct,zt)):t.value==="duotone"?(i(),d("g",Tt,Pt)):t.value==="fill"?(i(),d("g",Bt,Wt)):t.value==="light"?(i(),d("g",It,jt)):t.value==="regular"?(i(),d("g",Ot,Dt)):t.value==="thin"?(i(),d("g",Ft,Ut)):Y("",!0)],16,Mt))}}),Kt=["width","height","fill","transform"],Xt={key:0},Jt=c("path",{d:"M200,36H56A20,20,0,0,0,36,56V200a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V56A20,20,0,0,0,200,36Zm-4,160H60V60H196Z"},null,-1),Qt=[Jt],er={key:1},ar=c("path",{d:"M208,56V200a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z",opacity:"0.2"},null,-1),tr=c("path",{d:"M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z"},null,-1),rr=[ar,tr],or={key:2},nr=c("path",{d:"M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z"},null,-1),lr=[nr],ir={key:3},sr=c("path",{d:"M200,42H56A14,14,0,0,0,42,56V200a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V56A14,14,0,0,0,200,42Zm2,158a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2H200a2,2,0,0,1,2,2Z"},null,-1),dr=[sr],cr={key:4},ur=c("path",{d:"M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z"},null,-1),fr=[ur],br={key:5},pr=c("path",{d:"M200,44H56A12,12,0,0,0,44,56V200a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V56A12,12,0,0,0,200,44Zm4,156a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4H200a4,4,0,0,1,4,4Z"},null,-1),vr=[pr],hr={name:"PhStop"},X0=j({...hr,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,s=V("weight","regular"),p=V("size","1em"),f=V("color","currentColor"),A=V("mirrored",!1),t=g(()=>a.weight??s),l=g(()=>a.size??p),x=g(()=>a.color??f),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(v,H)=>(i(),d("svg",U({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:l.value,height:l.value,fill:x.value,transform:m.value},v.$attrs),[J(v.$slots,"default"),t.value==="bold"?(i(),d("g",Xt,Qt)):t.value==="duotone"?(i(),d("g",er,rr)):t.value==="fill"?(i(),d("g",or,lr)):t.value==="light"?(i(),d("g",ir,dr)):t.value==="regular"?(i(),d("g",cr,fr)):t.value==="thin"?(i(),d("g",br,vr)):Y("",!0)],16,Kt))}}),gr=["width","height","fill","transform"],mr={key:0},yr=c("path",{d:"M228,40V76a12,12,0,0,1-24,0V52H180a12,12,0,0,1,0-24h36A12,12,0,0,1,228,40ZM216,168a12,12,0,0,0-12,12v24H180a12,12,0,0,0,0,24h36a12,12,0,0,0,12-12V180A12,12,0,0,0,216,168ZM76,204H52V180a12,12,0,0,0-24,0v36a12,12,0,0,0,12,12H76a12,12,0,0,0,0-24ZM40,88A12,12,0,0,0,52,76V52H76a12,12,0,0,0,0-24H40A12,12,0,0,0,28,40V76A12,12,0,0,0,40,88Zm136,92a12,12,0,0,1-9.6-4.79,48,48,0,0,0-76.82,0,12,12,0,0,1-19.18-14.42,72.1,72.1,0,0,1,23.92-20.5,44,44,0,1,1,67.34,0,72.1,72.1,0,0,1,23.92,20.5A12,12,0,0,1,176,180Zm-48-48a20,20,0,1,0-20-20A20,20,0,0,0,128,132Z"},null,-1),xr=[yr],Ar={key:1},$r=c("path",{d:"M160,112a32,32,0,1,1-32-32A32,32,0,0,1,160,112Z",opacity:"0.2"},null,-1),wr=c("path",{d:"M224,40V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h36A8,8,0,0,1,224,40Zm-8,132a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h36a8,8,0,0,0,8-8V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v36a8,8,0,0,0,8,8H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V76A8,8,0,0,0,40,84Zm136,92a8,8,0,0,1-6.41-3.19,52,52,0,0,0-83.2,0,8,8,0,1,1-12.8-9.62A67.94,67.94,0,0,1,101,141.51a40,40,0,1,1,53.94,0,67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,176,176Zm-48-40a24,24,0,1,0-24-24A24,24,0,0,0,128,136Z"},null,-1),Vr=[$r,wr],Lr={key:2},Zr=c("path",{d:"M224,40V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h36A8,8,0,0,1,224,40Zm-8,132a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h36a8,8,0,0,0,8-8V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v36a8,8,0,0,0,8,8H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V76A8,8,0,0,0,40,84Zm61,57.51A67.94,67.94,0,0,0,73.6,163.19,8,8,0,0,0,80,176h96a8,8,0,0,0,6.4-12.81A67.94,67.94,0,0,0,155,141.51a40,40,0,1,0-53.94,0Z"},null,-1),Hr=[Zr],Sr={key:3},Mr=c("path",{d:"M222,40V76a6,6,0,0,1-12,0V46H180a6,6,0,0,1,0-12h36A6,6,0,0,1,222,40Zm-6,134a6,6,0,0,0-6,6v30H180a6,6,0,0,0,0,12h36a6,6,0,0,0,6-6V180A6,6,0,0,0,216,174ZM76,210H46V180a6,6,0,0,0-12,0v36a6,6,0,0,0,6,6H76a6,6,0,0,0,0-12ZM40,82a6,6,0,0,0,6-6V46H76a6,6,0,0,0,0-12H40a6,6,0,0,0-6,6V76A6,6,0,0,0,40,82Zm136,92a6,6,0,0,1-4.8-2.4,54,54,0,0,0-86.4,0,6,6,0,1,1-9.6-7.2,65.65,65.65,0,0,1,29.69-22.26,38,38,0,1,1,46.22,0A65.65,65.65,0,0,1,180.8,164.4,6,6,0,0,1,176,174Zm-48-36a26,26,0,1,0-26-26A26,26,0,0,0,128,138Z"},null,-1),Cr=[Mr],kr={key:4},zr=c("path",{d:"M224,40V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h36A8,8,0,0,1,224,40Zm-8,132a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h36a8,8,0,0,0,8-8V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v36a8,8,0,0,0,8,8H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V76A8,8,0,0,0,40,84Zm136,92a8,8,0,0,1-6.41-3.19,52,52,0,0,0-83.2,0,8,8,0,1,1-12.8-9.62A67.94,67.94,0,0,1,101,141.51a40,40,0,1,1,53.94,0,67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,176,176Zm-48-40a24,24,0,1,0-24-24A24,24,0,0,0,128,136Z"},null,-1),Tr=[zr],Rr={key:5},_r=c("path",{d:"M220,40V76a4,4,0,0,1-8,0V44H180a4,4,0,0,1,0-8h36A4,4,0,0,1,220,40Zm-4,136a4,4,0,0,0-4,4v32H180a4,4,0,0,0,0,8h36a4,4,0,0,0,4-4V180A4,4,0,0,0,216,176ZM76,212H44V180a4,4,0,0,0-8,0v36a4,4,0,0,0,4,4H76a4,4,0,0,0,0-8ZM40,80a4,4,0,0,0,4-4V44H76a4,4,0,0,0,0-8H40a4,4,0,0,0-4,4V76A4,4,0,0,0,40,80Zm136,92a4,4,0,0,1-3.2-1.6,56,56,0,0,0-89.6,0,4,4,0,1,1-6.4-4.8,63.65,63.65,0,0,1,32.5-22.85,36,36,0,1,1,37.4,0,63.65,63.65,0,0,1,32.5,22.85A4,4,0,0,1,176,172Zm-48-32a28,28,0,1,0-28-28A28,28,0,0,0,128,140Z"},null,-1),Pr=[_r],Br={name:"PhUserFocus"},Er=j({...Br,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,s=V("weight","regular"),p=V("size","1em"),f=V("color","currentColor"),A=V("mirrored",!1),t=g(()=>a.weight??s),l=g(()=>a.size??p),x=g(()=>a.color??f),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(v,H)=>(i(),d("svg",U({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:l.value,height:l.value,fill:x.value,transform:m.value},v.$attrs),[J(v.$slots,"default"),t.value==="bold"?(i(),d("g",mr,xr)):t.value==="duotone"?(i(),d("g",Ar,Vr)):t.value==="fill"?(i(),d("g",Lr,Hr)):t.value==="light"?(i(),d("g",Sr,Cr)):t.value==="regular"?(i(),d("g",kr,Tr)):t.value==="thin"?(i(),d("g",Rr,Pr)):Y("",!0)],16,gr))}}),Wr=["width","height","fill","transform"],Ir={key:0},Nr=c("path",{d:"M125.18,156.94a64,64,0,1,0-82.36,0,100.23,100.23,0,0,0-39.49,32,12,12,0,0,0,19.35,14.2,76,76,0,0,1,122.64,0,12,12,0,0,0,19.36-14.2A100.33,100.33,0,0,0,125.18,156.94ZM44,108a40,40,0,1,1,40,40A40,40,0,0,1,44,108Zm206.1,97.67a12,12,0,0,1-16.78-2.57A76.31,76.31,0,0,0,172,172a12,12,0,0,1,0-24,40,40,0,1,0-10.3-78.67,12,12,0,1,1-6.16-23.19,64,64,0,0,1,57.64,110.8,100.23,100.23,0,0,1,39.49,32A12,12,0,0,1,250.1,205.67Z"},null,-1),jr=[Nr],Or={key:1},qr=c("path",{d:"M136,108A52,52,0,1,1,84,56,52,52,0,0,1,136,108Z",opacity:"0.2"},null,-1),Dr=c("path",{d:"M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"},null,-1),Fr=[qr,Dr],Gr={key:2},Ur=c("path",{d:"M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"},null,-1),Yr=[Ur],Kr={key:3},Xr=c("path",{d:"M112.6,158.43a58,58,0,1,0-57.2,0A93.83,93.83,0,0,0,5.21,196.72a6,6,0,0,0,10.05,6.56,82,82,0,0,1,137.48,0,6,6,0,0,0,10-6.56A93.83,93.83,0,0,0,112.6,158.43ZM38,108a46,46,0,1,1,46,46A46.06,46.06,0,0,1,38,108Zm211,97a6,6,0,0,1-8.3-1.74A81.8,81.8,0,0,0,172,166a6,6,0,0,1,0-12,46,46,0,1,0-17.08-88.73,6,6,0,1,1-4.46-11.14,58,58,0,0,1,50.14,104.3,93.83,93.83,0,0,1,50.19,38.29A6,6,0,0,1,249,205Z"},null,-1),Jr=[Xr],Qr={key:4},eo=c("path",{d:"M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"},null,-1),ao=[eo],to={key:5},ro=c("path",{d:"M107.19,159a56,56,0,1,0-46.38,0A91.83,91.83,0,0,0,6.88,197.81a4,4,0,1,0,6.7,4.37,84,84,0,0,1,140.84,0,4,4,0,1,0,6.7-4.37A91.83,91.83,0,0,0,107.19,159ZM36,108a48,48,0,1,1,48,48A48.05,48.05,0,0,1,36,108Zm212,95.35a4,4,0,0,1-5.53-1.17A83.81,83.81,0,0,0,172,164a4,4,0,0,1,0-8,48,48,0,1,0-17.82-92.58,4,4,0,1,1-3-7.43,56,56,0,0,1,44,103,91.83,91.83,0,0,1,53.93,38.86A4,4,0,0,1,248,203.35Z"},null,-1),oo=[ro],no={name:"PhUsers"},lo=j({...no,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,s=V("weight","regular"),p=V("size","1em"),f=V("color","currentColor"),A=V("mirrored",!1),t=g(()=>a.weight??s),l=g(()=>a.size??p),x=g(()=>a.color??f),m=g(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:A?"scale(-1, 1)":void 0);return(v,H)=>(i(),d("svg",U({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:l.value,height:l.value,fill:x.value,transform:m.value},v.$attrs),[J(v.$slots,"default"),t.value==="bold"?(i(),d("g",Ir,jr)):t.value==="duotone"?(i(),d("g",Or,Fr)):t.value==="fill"?(i(),d("g",Gr,Yr)):t.value==="light"?(i(),d("g",Kr,Jr)):t.value==="regular"?(i(),d("g",Qr,ao)):t.value==="thin"?(i(),d("g",to,oo)):Y("",!0)],16,Wr))}}),io={class:"flex items-center gap-2"},so={class:"flex items-center gap-1"},co={key:0,class:"flex items-center justify-center w-full h-full"},uo={key:0,class:"flex gap-2 items-center"},fo={key:1,class:"flex gap-2 items-center"},bo={class:"flex gap-2 items-center"},po={class:"w-full h-full py-4"},$o=j({__name:"layout",setup(e){const a=ie(),s=se(),p=de(),f=ce(),A=ve(),t=ue(),l=g(()=>p.allRooms.get(s.params.roomId)??null),x=g(()=>{var h;return N0(p.monitorLogsGroupedByRoomId,(h=l.value)==null?void 0:h.id,new Map)}),m=g(()=>{var h;return N0(p.studentsGroupedByRoomId,(h=l.value)==null?void 0:h.id,new Map)}),v=g(()=>Array.from(x.value.values())),H=g(()=>Array.from(m.value.values())),W=g(()=>f.teacher),C=fe([{name:"Overview",key:"overview",icon:e0(Wa)},{name:"Monitoring",key:"monitoring",icon:e0(Er),badgeValue:g(()=>H.value.filter(h=>h.permitted&&!!h.lockMonitorLogId).length)},{name:"Students",key:"students",icon:e0(lo),badgeValue:g(()=>H.value.filter(h=>!h.permitted&&h.active).length)},{name:"Settings",key:"settings",icon:e0(ga)}]),R=g(()=>s.path.split("/").pop()||"overview"),z=V0("/api/start_monitoring/:roomId","PATCH");async function P(){try{await z.execute({params:{roomId:s.params.roomId}}),t.success("Monitoring has started.",{icon:e0(K0)})}catch(h){t.error(h.message)}}const B=V0("/api/pause_monitoring/:roomId","PATCH");async function _(){try{await B.execute({params:{roomId:s.params.roomId}}),t.warning("Monitoring has been paused.",{icon:e0(Y0)})}catch(h){t.error(h.message)}}const G=V0("/api/stop_monitoring/:roomId","PATCH");async function I(){if(confirm("Are you sure you want to stop monitoring? This will conclude and archive the room session. This action cannot be undone."))try{await G.execute({params:{roomId:s.params.roomId}}),t.error("Monitoring has been stopped.",{icon:e0(X0)})}catch(u){t.error(u.message)}}return Q0(()=>{p.loadRoom(s.params.roomId),window.$store=p}),a0(xe,l),a0(Ae,x),a0($e,m),a0(we,W),a0(Ve,v),a0(Le,H),(h,u)=>(i(),L0(E1,{"no-divider":""},be({default:M(()=>[l.value?(i(),d(C0,{key:1},[S(Z(Ye),{type:"card",value:R.value,"onUpdate:value":Z(a).push},{default:M(()=>[(i(!0),d(C0,null,ge(C,L=>(i(),L0(Z(h0),{key:L.key,name:L.key},{default:M(()=>[S(Z(Se),{value:L.badgeValue,offset:[6,-3]},{default:M(()=>[S(Z(j0),{to:L.key},{default:M(()=>[c("div",bo,[L.icon?(i(),L0(me(L.icon),{key:0})):Y("",!0),X(" "+O0(L.name),1)])]),_:2},1032,["to"])]),_:2},1032,["value"])]),_:2},1032,["name"]))),128))]),_:1},8,["value","onUpdate:value"]),c("div",po,[S(Z(ye))])],64)):(i(),d("div",co,[Z(p).isLoadRoomLoading?(i(),d("div",uo,[S(Z(he)),S(Z(Z0),null,{default:M(()=>[...u[8]||(u[8]=[X("Loading...",-1)])]),_:1})])):(i(),d("div",fo,[S(Z(Z0),null,{default:M(()=>[...u[9]||(u[9]=[X("Room not found",-1)])]),_:1})]))]))]),_:2},[l.value?{name:"header",fn:M(()=>[c("div",io,[S(Z(j0),{to:"/dashboard/rooms"},{default:M(()=>[S(Z(i0),{circle:"",quaternary:""},{icon:M(()=>[S(Z(Ze))]),_:1})]),_:1}),S(Z(Z0),{strong:"",class:"text-lg"},{default:M(()=>[X(O0(l.value.title),1)]),_:1}),S(He,{room:l.value},null,8,["room"])])]),key:"0"}:void 0,l.value&&l.value.status!=="concluded"?{name:"header-extra",fn:M(()=>[c("div",so,[S(Z(p0),{placement:"bottom"},{trigger:M(()=>[S(Z(i0),{type:"error",secondary:"",circle:"",onClick:u[0]||(u[0]=L=>I())},{icon:M(()=>[S(Z(X0))]),_:1})]),default:M(()=>[u[4]||(u[4]=X(" Stop monitoring and conclude room session ",-1))]),_:1}),S(Z(p0),{placement:"bottom"},{trigger:M(()=>[S(Z(i0),{type:"warning",secondary:"",circle:"",onClick:u[1]||(u[1]=L=>_()),disabled:l.value.status==="paused"},{icon:M(()=>[S(Z(Y0))]),_:1},8,["disabled"])]),default:M(()=>[u[5]||(u[5]=X(" Pause monitoring ",-1))]),_:1}),S(Z(p0),{placement:"bottom"},{trigger:M(()=>[S(Z(i0),{type:"success",secondary:"",circle:"",onClick:u[2]||(u[2]=L=>P()),disabled:l.value.status==="monitoring"},{icon:M(()=>[S(Z(K0))]),_:1},8,["disabled"])]),default:M(()=>[u[6]||(u[6]=X(" Start monitoring ",-1))]),_:1})]),S(Z(pe),{vertical:""}),S(Z(p0),{placement:"bottom"},{trigger:M(()=>[S(Z(i0),{circle:"",onClick:u[3]||(u[3]=L=>Z(A).show(l.value))},{icon:M(()=>[S(Z(it))]),_:1})]),default:M(()=>[u[7]||(u[7]=X(" Send announcement to students ",-1))]),_:1})]),key:"1"}:void 0]),1024))}});export{$o as default};
