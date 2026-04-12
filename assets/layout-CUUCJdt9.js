import{_ as Be}from"./layout.vue_vue_type_script_setup_true_lang-B4O-Zh2C.js";import{d as G,D as w,a3 as O,ag as Ie,ah as We,ai as E0,aj as Ne,ak as h0,al as Oe,am as je,z as Q,F as C0,an as qe,ao as De,ap as Fe,aq as Ge,t as S,v as A,ar as Ue,as as n,at as g,au as T,av as N,aw as Ke,ax as A0,ay as B0,az as $0,aA as Ye,aB as J0,aC as Xe,aD as I0,aE as Je,aF as w0,a8 as L0,o as Q0,a9 as Y,aG as D,aH as Qe,aI as ea,aJ as F,aK as f0,aL as aa,aM as ta,aN as ra,aO as oa,aP as na,aQ as la,aR as b0,e as c,f as p,x as n0,y as e0,j as v,G as ia,a1 as sa,A as da,u as ca,a as ua,aS as W0,r as fa,aT as X,b as V0,i as p0,a4 as ba,w as Z,g as C,c as V,R as N0,B as i0,N as O0,h as J,Q as j0,aU as v0,k as pa,_ as va,aV as ha,aW as ga,aX as ma,aY as ya,aZ as xa,ae as Aa,T as $a,a_ as wa,S as La,V as Va,M as Sa,a$ as Ha,b0 as Za}from"./index-M6cwBZJN.js";import{G as Ca}from"./PhArrowLeft.vue-ueTJQlpB.js";import{G as Ma}from"./PhUsers.vue-DggSNR-X.js";import{_ as Ta}from"./room-status-tag.vue_vue_type_script_setup_true_lang-Zb-sq4gh.js";import"./LayoutContent-vk3uh0Pq.js";const Ra=E0(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[E0("&::-webkit-scrollbar",{width:0,height:0})]),ka=G({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=O(null);function a(s){!(s.currentTarget.offsetWidth<s.currentTarget.scrollWidth)||s.deltaY===0||(s.currentTarget.scrollLeft+=s.deltaY+s.deltaX,s.preventDefault())}const l=Ie();return Ra.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:We,ssr:l}),Object.assign({selfRef:e,handleWheel:a},{scrollTo(...s){var $;($=e.value)===null||$===void 0||$.scrollTo(...s)}})},render(){return w("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var za=/\s/;function _a(e){for(var a=e.length;a--&&za.test(e.charAt(a)););return a}var Pa=/^\s+/;function Ea(e){return e&&e.slice(0,_a(e)+1).replace(Pa,"")}var q0=NaN,Ba=/^[-+]0x[0-9a-f]+$/i,Ia=/^0b[01]+$/i,Wa=/^0o[0-7]+$/i,Na=parseInt;function D0(e){if(typeof e=="number")return e;if(Ne(e))return q0;if(h0(e)){var a=typeof e.valueOf=="function"?e.valueOf():e;e=h0(a)?a+"":a}if(typeof e!="string")return e===0?e:+e;e=Ea(e);var l=Ia.test(e);return l||Wa.test(e)?Na(e.slice(2),l?2:8):Ba.test(e)?q0:+e}var S0=function(){return Oe.Date.now()},Oa="Expected a function",ja=Math.max,qa=Math.min;function Da(e,a,l){var b,s,$,o,u,f,m=0,h=!1,M=!1,P=!0;if(typeof e!="function")throw new TypeError(Oa);a=D0(a)||0,h0(l)&&(h=!!l.leading,M="maxWait"in l,$=M?ja(D0(l.maxWait)||0,a):$,P="trailing"in l?!!l.trailing:P);function H(i){var y=b,_=s;return b=s=void 0,m=i,o=e.apply(_,y),o}function E(i){return m=i,u=setTimeout(I,a),h?H(i):o}function R(i){var y=i-f,_=i-m,s0=a-y;return M?qa(s0,$-_):s0}function B(i){var y=i-f,_=i-m;return f===void 0||y>=a||y<0||M&&_>=$}function I(){var i=S0();if(B(i))return z(i);u=setTimeout(I,R(i))}function z(i){return u=void 0,P&&b?H(i):(b=s=void 0,o)}function U(){u!==void 0&&clearTimeout(u),m=0,b=f=s=u=void 0}function W(){return u===void 0?o:z(S0())}function L(){var i=S0(),y=B(i);if(b=arguments,s=this,f=i,y){if(u===void 0)return E(f);if(M)return clearTimeout(u),u=setTimeout(I,a),H(f)}return u===void 0&&(u=setTimeout(I,a)),o}return L.cancel=U,L.flush=W,L}var Fa="Expected a function";function Ga(e,a,l){var b=!0,s=!0;if(typeof e!="function")throw new TypeError(Fa);return h0(l)&&(b="leading"in l?!!l.leading:b,s="trailing"in l?!!l.trailing:s),Da(e,a,{leading:b,maxWait:a,trailing:s})}const ee=je("n-tabs"),Ua={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Ka=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},Ue(Ua,["displayDirective"])),g0=G({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:Ka,setup(e){const{mergedClsPrefixRef:a,valueRef:l,typeRef:b,closableRef:s,tabStyleRef:$,addTabStyleRef:o,tabClassRef:u,addTabClassRef:f,tabChangeIdRef:m,onBeforeLeaveRef:h,triggerRef:M,handleAdd:P,activateTab:H,handleClose:E}=S(ee);return{trigger:M,mergedClosable:A(()=>{if(e.internalAddable)return!1;const{closable:R}=e;return R===void 0?s.value:R}),style:$,addStyle:o,tabClass:u,addTabClass:f,clsPrefix:a,value:l,type:b,handleClose(R){R.stopPropagation(),!e.disabled&&E(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){P();return}const{name:R}=e,B=++m.id;if(R!==l.value){const{value:I}=h;I?Promise.resolve(I(e.name,l.value)).then(z=>{z&&m.id===B&&H(R)}):H(R)}}}},render(){const{internalAddable:e,clsPrefix:a,name:l,disabled:b,label:s,tab:$,value:o,mergedClosable:u,trigger:f,$slots:{default:m}}=this,h=s??$;return w("div",{class:`${a}-tabs-tab-wrapper`},this.internalLeftPadded?w("div",{class:`${a}-tabs-tab-pad`}):null,w("div",Object.assign({key:l,"data-name":l,"data-disabled":b?!0:void 0},Q({class:[`${a}-tabs-tab`,o===l&&`${a}-tabs-tab--active`,b&&`${a}-tabs-tab--disabled`,u&&`${a}-tabs-tab--closable`,e&&`${a}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:f==="click"?this.activateTab:void 0,onMouseenter:f==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),w("span",{class:`${a}-tabs-tab__label`},e?w(C0,null,w("div",{class:`${a}-tabs-tab__height-placeholder`}," "),w(qe,{clsPrefix:a},{default:()=>w(De,null)})):m?m():typeof h=="object"?h:Fe(h??l)),u&&this.type==="card"?w(Ge,{clsPrefix:a,class:`${a}-tabs-tab__close`,onClick:this.handleClose,disabled:b}):null))}}),Ya=n("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[g("segment-type",[n("tabs-rail",[T("&.transition-disabled",[n("tabs-capsule",`
 transition: none;
 `)])])]),g("top",[n("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),g("left",[n("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),g("left, right",`
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
 `)]),g("right",`
 flex-direction: row-reverse;
 `,[n("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),n("tabs-bar",`
 left: 0;
 `)]),g("bottom",`
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
 `,[g("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),T("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),g("flex",[n("tabs-nav",`
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
 `),N("prefix","padding-right: 16px;"),N("suffix","padding-left: 16px;")]),g("top, bottom",[T(">",[n("tabs-nav",[n("tabs-nav-scroll-wrapper",[T("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),T("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),g("shadow-start",[T("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),g("shadow-end",[T("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),g("left, right",[n("tabs-nav-scroll-content",`
 flex-direction: column;
 `),T(">",[n("tabs-nav",[n("tabs-nav-scroll-wrapper",[T("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),T("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),g("shadow-start",[T("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),g("shadow-end",[T("&::after",`
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
 `,[T("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `)]),T("&::before, &::after",`
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
 `,[g("disabled",{cursor:"not-allowed"}),N("close",`
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
 `,[T("&.transition-disabled",`
 transition: none;
 `),g("disabled",`
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
 `,[T("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),T("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),T("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),T("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),T("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),n("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),g("line-type, bar-type",[n("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[T("&:hover",{color:"var(--n-tab-text-color-hover)"}),g("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),g("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),n("tabs-nav",[g("line-type",[g("top",[N("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 bottom: -1px;
 `)]),g("left",[N("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 right: -1px;
 `)]),g("right",[N("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-bar",`
 left: -1px;
 `)]),g("bottom",[N("prefix, suffix",`
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
 `)]),g("card-type",[N("prefix, suffix",`
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
 `,[g("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[N("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),Ke("disabled",[T("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),g("closable","padding-right: 8px;"),g("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),g("disabled","color: var(--n-tab-text-color-disabled);")])]),g("left, right",`
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
 `)])]),g("top",[g("card-type",[n("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),N("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[g("active",`
 border-bottom: 1px solid #0000;
 `)]),n("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),n("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),g("left",[g("card-type",[n("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),N("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[g("active",`
 border-right: 1px solid #0000;
 `)]),n("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),n("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),g("right",[g("card-type",[n("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),N("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[g("active",`
 border-left: 1px solid #0000;
 `)]),n("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),n("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),g("bottom",[g("card-type",[n("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),N("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),n("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[g("active",`
 border-top: 1px solid #0000;
 `)]),n("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),n("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),H0=Ga,Xa=Object.assign(Object.assign({},J0.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),Ja=G({name:"Tabs",props:Xa,slots:Object,setup(e,{slots:a}){var l,b,s,$;const{mergedClsPrefixRef:o,inlineThemeDisabled:u}=Ye(e),f=J0("Tabs","-tabs",Ya,Xe,e,o),m=O(null),h=O(null),M=O(null),P=O(null),H=O(null),E=O(null),R=O(!0),B=O(!0),I=I0(e,["labelSize","size"]),z=I0(e,["activeName","value"]),U=O((b=(l=z.value)!==null&&l!==void 0?l:e.defaultValue)!==null&&b!==void 0?b:a.default?($=(s=A0(a.default())[0])===null||s===void 0?void 0:s.props)===null||$===void 0?void 0:$.name:null),W=Je(z,U),L={id:0},i=A(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});w0(W,()=>{L.id=0,d0(),T0()});function y(){var t;const{value:r}=W;return r===null?null:(t=m.value)===null||t===void 0?void 0:t.querySelector(`[data-name="${r}"]`)}function _(t){if(e.type==="card")return;const{value:r}=h;if(!r)return;const d=r.style.opacity==="0";if(t){const x=`${o.value}-tabs-bar--disabled`,{barWidth:k,placement:j}=e;if(t.dataset.disabled==="true"?r.classList.add(x):r.classList.remove(x),["top","bottom"].includes(j)){if(M0(["top","maxHeight","height"]),typeof k=="number"&&t.offsetWidth>=k){const q=Math.floor((t.offsetWidth-k)/2)+t.offsetLeft;r.style.left=`${q}px`,r.style.maxWidth=`${k}px`}else r.style.left=`${t.offsetLeft}px`,r.style.maxWidth=`${t.offsetWidth}px`;r.style.width="8192px",d&&(r.style.transition="none"),r.offsetWidth,d&&(r.style.transition="",r.style.opacity="1")}else{if(M0(["left","maxWidth","width"]),typeof k=="number"&&t.offsetHeight>=k){const q=Math.floor((t.offsetHeight-k)/2)+t.offsetTop;r.style.top=`${q}px`,r.style.maxHeight=`${k}px`}else r.style.top=`${t.offsetTop}px`,r.style.maxHeight=`${t.offsetHeight}px`;r.style.height="8192px",d&&(r.style.transition="none"),r.offsetHeight,d&&(r.style.transition="",r.style.opacity="1")}}}function s0(){if(e.type==="card")return;const{value:t}=h;t&&(t.style.opacity="0")}function M0(t){const{value:r}=h;if(r)for(const d of t)r.style[d]=""}function d0(){if(e.type==="card")return;const t=y();t?_(t):s0()}function T0(){var t;const r=(t=H.value)===null||t===void 0?void 0:t.$el;if(!r)return;const d=y();if(!d)return;const{scrollLeft:x,offsetWidth:k}=r,{offsetLeft:j,offsetWidth:q}=d;x>j?r.scrollTo({top:0,left:j,behavior:"smooth"}):j+q>x+k&&r.scrollTo({top:0,left:j+q-k,behavior:"smooth"})}const c0=O(null);let m0=0,K=null;function ae(t){const r=c0.value;if(r){m0=t.getBoundingClientRect().height;const d=`${m0}px`,x=()=>{r.style.height=d,r.style.maxHeight=d};K?(x(),K(),K=null):K=x}}function te(t){const r=c0.value;if(r){const d=t.getBoundingClientRect().height,x=()=>{document.body.offsetHeight,r.style.maxHeight=`${d}px`,r.style.height=`${Math.max(m0,d)}px`};K?(K(),K=null,x()):K=x}}function re(){const t=c0.value;if(t){t.style.maxHeight="",t.style.height="";const{paneWrapperStyle:r}=e;if(typeof r=="string")t.style.cssText=r;else if(r){const{maxHeight:d,height:x}=r;d!==void 0&&(t.style.maxHeight=d),x!==void 0&&(t.style.height=x)}}}const R0={value:[]},k0=O("next");function oe(t){const r=W.value;let d="next";for(const x of R0.value){if(x===r)break;if(x===t){d="prev";break}}k0.value=d,ne(t)}function ne(t){const{onActiveNameChange:r,onUpdateValue:d,"onUpdate:value":x}=e;r&&b0(r,t),d&&b0(d,t),x&&b0(x,t),U.value=t}function le(t){const{onClose:r}=e;r&&b0(r,t)}function z0(){const{value:t}=h;if(!t)return;const r="transition-disabled";t.classList.add(r),d0(),t.classList.remove(r)}const a0=O(null);function y0({transitionDisabled:t}){const r=m.value;if(!r)return;t&&r.classList.add("transition-disabled");const d=y();d&&a0.value&&(a0.value.style.width=`${d.offsetWidth}px`,a0.value.style.height=`${d.offsetHeight}px`,a0.value.style.transform=`translateX(${d.offsetLeft-ta(getComputedStyle(r).paddingLeft)}px)`,t&&a0.value.offsetWidth),t&&r.classList.remove("transition-disabled")}w0([W],()=>{e.type==="segment"&&L0(()=>{y0({transitionDisabled:!1})})}),Q0(()=>{e.type==="segment"&&y0({transitionDisabled:!0})});let _0=0;function ie(t){var r;if(t.contentRect.width===0&&t.contentRect.height===0||_0===t.contentRect.width)return;_0=t.contentRect.width;const{type:d}=e;if((d==="line"||d==="bar")&&z0(),d!=="segment"){const{placement:x}=e;x0((x==="top"||x==="bottom"?(r=H.value)===null||r===void 0?void 0:r.$el:E.value)||null)}}const se=H0(ie,64);w0([()=>e.justifyContent,()=>e.size],()=>{L0(()=>{const{type:t}=e;(t==="line"||t==="bar")&&z0()})});const t0=O(!1);function de(t){var r;const{target:d,contentRect:{width:x,height:k}}=t,j=d.parentElement.parentElement.offsetWidth,q=d.parentElement.parentElement.offsetHeight,{placement:o0}=e;if(!t0.value)o0==="top"||o0==="bottom"?j<x&&(t0.value=!0):q<k&&(t0.value=!0);else{const{value:l0}=P;if(!l0)return;o0==="top"||o0==="bottom"?j-x>l0.$el.offsetWidth&&(t0.value=!1):q-k>l0.$el.offsetHeight&&(t0.value=!1)}x0(((r=H.value)===null||r===void 0?void 0:r.$el)||null)}const ce=H0(de,64);function ue(){const{onAdd:t}=e;t&&t(),L0(()=>{const r=y(),{value:d}=H;!r||!d||d.scrollTo({left:r.offsetLeft,top:0,behavior:"smooth"})})}function x0(t){if(!t)return;const{placement:r}=e;if(r==="top"||r==="bottom"){const{scrollLeft:d,scrollWidth:x,offsetWidth:k}=t;R.value=d<=0,B.value=d+k>=x}else{const{scrollTop:d,scrollHeight:x,offsetHeight:k}=t;R.value=d<=0,B.value=d+k>=x}}const fe=H0(t=>{x0(t.target)},64);Y(ee,{triggerRef:D(e,"trigger"),tabStyleRef:D(e,"tabStyle"),tabClassRef:D(e,"tabClass"),addTabStyleRef:D(e,"addTabStyle"),addTabClassRef:D(e,"addTabClass"),paneClassRef:D(e,"paneClass"),paneStyleRef:D(e,"paneStyle"),mergedClsPrefixRef:o,typeRef:D(e,"type"),closableRef:D(e,"closable"),valueRef:W,tabChangeIdRef:L,onBeforeLeaveRef:D(e,"onBeforeLeave"),activateTab:oe,handleClose:le,handleAdd:ue}),Qe(()=>{d0(),T0()}),ea(()=>{const{value:t}=M;if(!t)return;const{value:r}=o,d=`${r}-tabs-nav-scroll-wrapper--shadow-start`,x=`${r}-tabs-nav-scroll-wrapper--shadow-end`;R.value?t.classList.remove(d):t.classList.add(d),B.value?t.classList.remove(x):t.classList.add(x)});const be={syncBarPosition:()=>{d0()}},pe=()=>{y0({transitionDisabled:!0})},P0=A(()=>{const{value:t}=I,{type:r}=e,d={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[r],x=`${t}${d}`,{self:{barColor:k,closeIconColor:j,closeIconColorHover:q,closeIconColorPressed:o0,tabColor:l0,tabBorderColor:ve,paneTextColor:he,tabFontWeight:ge,tabBorderRadius:me,tabFontWeightActive:ye,colorSegment:xe,fontWeightStrong:Ae,tabColorSegment:$e,closeSize:we,closeIconSize:Le,closeColorHover:Ve,closeColorPressed:Se,closeBorderRadius:He,[F("panePadding",t)]:u0,[F("tabPadding",x)]:Ze,[F("tabPaddingVertical",x)]:Ce,[F("tabGap",x)]:Me,[F("tabGap",`${x}Vertical`)]:Te,[F("tabTextColor",r)]:Re,[F("tabTextColorActive",r)]:ke,[F("tabTextColorHover",r)]:ze,[F("tabTextColorDisabled",r)]:_e,[F("tabFontSize",t)]:Pe},common:{cubicBezierEaseInOut:Ee}}=f.value;return{"--n-bezier":Ee,"--n-color-segment":xe,"--n-bar-color":k,"--n-tab-font-size":Pe,"--n-tab-text-color":Re,"--n-tab-text-color-active":ke,"--n-tab-text-color-disabled":_e,"--n-tab-text-color-hover":ze,"--n-pane-text-color":he,"--n-tab-border-color":ve,"--n-tab-border-radius":me,"--n-close-size":we,"--n-close-icon-size":Le,"--n-close-color-hover":Ve,"--n-close-color-pressed":Se,"--n-close-border-radius":He,"--n-close-icon-color":j,"--n-close-icon-color-hover":q,"--n-close-icon-color-pressed":o0,"--n-tab-color":l0,"--n-tab-font-weight":ge,"--n-tab-font-weight-active":ye,"--n-tab-padding":Ze,"--n-tab-padding-vertical":Ce,"--n-tab-gap":Me,"--n-tab-gap-vertical":Te,"--n-pane-padding-left":f0(u0,"left"),"--n-pane-padding-right":f0(u0,"right"),"--n-pane-padding-top":f0(u0,"top"),"--n-pane-padding-bottom":f0(u0,"bottom"),"--n-font-weight-strong":Ae,"--n-tab-color-segment":$e}}),r0=u?aa("tabs",A(()=>`${I.value[0]}${e.type[0]}`),P0,e):void 0;return Object.assign({mergedClsPrefix:o,mergedValue:W,renderedNames:new Set,segmentCapsuleElRef:a0,tabsPaneWrapperRef:c0,tabsElRef:m,barElRef:h,addTabInstRef:P,xScrollInstRef:H,scrollWrapperElRef:M,addTabFixed:t0,tabWrapperStyle:i,handleNavResize:se,mergedSize:I,handleScroll:fe,handleTabsResize:ce,cssVars:u?void 0:P0,themeClass:r0==null?void 0:r0.themeClass,animationDirection:k0,renderNameListRef:R0,yScrollElRef:E,handleSegmentResize:pe,onAnimationBeforeLeave:ae,onAnimationEnter:te,onAnimationAfterEnter:re,onRender:r0==null?void 0:r0.onRender},be)},render(){const{mergedClsPrefix:e,type:a,placement:l,addTabFixed:b,addable:s,mergedSize:$,renderNameListRef:o,onRender:u,paneWrapperClass:f,paneWrapperStyle:m,$slots:{default:h,prefix:M,suffix:P}}=this;u==null||u();const H=h?A0(h()).filter(L=>L.type.__TAB_PANE__===!0):[],E=h?A0(h()).filter(L=>L.type.__TAB__===!0):[],R=!E.length,B=a==="card",I=a==="segment",z=!B&&!I&&this.justifyContent;o.value=[];const U=()=>{const L=w("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},z?null:w("div",{class:`${e}-tabs-scroll-padding`,style:l==="top"||l==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),R?H.map((i,y)=>(o.value.push(i.props.name),Z0(w(g0,Object.assign({},i.props,{internalCreatedByPane:!0,internalLeftPadded:y!==0&&(!z||z==="center"||z==="start"||z==="end")}),i.children?{default:i.children.tab}:void 0)))):E.map((i,y)=>(o.value.push(i.props.name),Z0(y!==0&&!z?U0(i):i))),!b&&s&&B?G0(s,(R?H.length:E.length)!==0):null,z?null:w("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return w("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},B&&s?w($0,{onResize:this.handleTabsResize},{default:()=>L}):L,B?w("div",{class:`${e}-tabs-pad`}):null,B?null:w("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},W=I?"top":l;return w("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${a}-type`,`${e}-tabs--${$}-size`,z&&`${e}-tabs--flex`,`${e}-tabs--${W}`],style:this.cssVars},w("div",{class:[`${e}-tabs-nav--${a}-type`,`${e}-tabs-nav--${W}`,`${e}-tabs-nav`]},B0(M,L=>L&&w("div",{class:`${e}-tabs-nav__prefix`},L)),I?w($0,{onResize:this.handleSegmentResize},{default:()=>w("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},w("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},w("div",{class:`${e}-tabs-wrapper`},w("div",{class:`${e}-tabs-tab`}))),R?H.map((L,i)=>(o.value.push(L.props.name),w(g0,Object.assign({},L.props,{internalCreatedByPane:!0,internalLeftPadded:i!==0}),L.children?{default:L.children.tab}:void 0))):E.map((L,i)=>(o.value.push(L.props.name),i===0?L:U0(L))))}):w($0,{onResize:this.handleNavResize},{default:()=>w("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(W)?w(ka,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:U}):w("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},U()))}),b&&s&&B?G0(s,!0):null,B0(P,L=>L&&w("div",{class:`${e}-tabs-nav__suffix`},L))),R&&(this.animated&&(W==="top"||W==="bottom")?w("div",{ref:"tabsPaneWrapperRef",style:m,class:[`${e}-tabs-pane-wrapper`,f]},F0(H,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):F0(H,this.mergedValue,this.renderedNames)))}});function F0(e,a,l,b,s,$,o){const u=[];return e.forEach(f=>{const{name:m,displayDirective:h,"display-directive":M}=f.props,P=E=>h===E||M===E,H=a===m;if(f.key!==void 0&&(f.key=m),H||P("show")||P("show:lazy")&&l.has(m)){l.has(m)||l.add(m);const E=!P("if");u.push(E?ra(f,[[oa,H]]):f)}}),o?w(na,{name:`${o}-transition`,onBeforeLeave:b,onEnter:s,onAfterEnter:$},{default:()=>u}):u}function G0(e,a){return w(g0,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:a,disabled:typeof e=="object"&&e.disabled})}function U0(e){const a=la(e);return a.props?a.props.internalLeftPadded=!0:a.props={internalLeftPadded:!0},a}function Z0(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const Qa=["width","height","fill","transform"],e1={key:0},a1=v("path",{d:"M128,76a52,52,0,1,0,52,52A52.06,52.06,0,0,0,128,76Zm0,80a28,28,0,1,1,28-28A28,28,0,0,1,128,156Zm92-27.21v-1.58l14-17.51a12,12,0,0,0,2.23-10.59A111.75,111.75,0,0,0,225,71.89,12,12,0,0,0,215.89,66L193.61,63.5l-1.11-1.11L190,40.1A12,12,0,0,0,184.11,31a111.67,111.67,0,0,0-27.23-11.27A12,12,0,0,0,146.3,22L128.79,36h-1.58L109.7,22a12,12,0,0,0-10.59-2.23A111.75,111.75,0,0,0,71.89,31.05,12,12,0,0,0,66,40.11L63.5,62.39,62.39,63.5,40.1,66A12,12,0,0,0,31,71.89,111.67,111.67,0,0,0,19.77,99.12,12,12,0,0,0,22,109.7l14,17.51v1.58L22,146.3a12,12,0,0,0-2.23,10.59,111.75,111.75,0,0,0,11.29,27.22A12,12,0,0,0,40.11,190l22.28,2.48,1.11,1.11L66,215.9A12,12,0,0,0,71.89,225a111.67,111.67,0,0,0,27.23,11.27A12,12,0,0,0,109.7,234l17.51-14h1.58l17.51,14a12,12,0,0,0,10.59,2.23A111.75,111.75,0,0,0,184.11,225a12,12,0,0,0,5.91-9.06l2.48-22.28,1.11-1.11L215.9,190a12,12,0,0,0,9.06-5.91,111.67,111.67,0,0,0,11.27-27.23A12,12,0,0,0,234,146.3Zm-24.12-4.89a70.1,70.1,0,0,1,0,8.2,12,12,0,0,0,2.61,8.22l12.84,16.05A86.47,86.47,0,0,1,207,166.86l-20.43,2.27a12,12,0,0,0-7.65,4,69,69,0,0,1-5.8,5.8,12,12,0,0,0-4,7.65L166.86,207a86.47,86.47,0,0,1-10.49,4.35l-16.05-12.85a12,12,0,0,0-7.5-2.62c-.24,0-.48,0-.72,0a70.1,70.1,0,0,1-8.2,0,12.06,12.06,0,0,0-8.22,2.6L99.63,211.33A86.47,86.47,0,0,1,89.14,207l-2.27-20.43a12,12,0,0,0-4-7.65,69,69,0,0,1-5.8-5.8,12,12,0,0,0-7.65-4L49,166.86a86.47,86.47,0,0,1-4.35-10.49l12.84-16.05a12,12,0,0,0,2.61-8.22,70.1,70.1,0,0,1,0-8.2,12,12,0,0,0-2.61-8.22L44.67,99.63A86.47,86.47,0,0,1,49,89.14l20.43-2.27a12,12,0,0,0,7.65-4,69,69,0,0,1,5.8-5.8,12,12,0,0,0,4-7.65L89.14,49a86.47,86.47,0,0,1,10.49-4.35l16.05,12.85a12.06,12.06,0,0,0,8.22,2.6,70.1,70.1,0,0,1,8.2,0,12,12,0,0,0,8.22-2.6l16.05-12.85A86.47,86.47,0,0,1,166.86,49l2.27,20.43a12,12,0,0,0,4,7.65,69,69,0,0,1,5.8,5.8,12,12,0,0,0,7.65,4L207,89.14a86.47,86.47,0,0,1,4.35,10.49l-12.84,16.05A12,12,0,0,0,195.88,123.9Z"},null,-1),t1=[a1],r1={key:1},o1=v("path",{d:"M207.86,123.18l16.78-21a99.14,99.14,0,0,0-10.07-24.29l-26.7-3a81,81,0,0,0-6.81-6.81l-3-26.71a99.43,99.43,0,0,0-24.3-10l-21,16.77a81.59,81.59,0,0,0-9.64,0l-21-16.78A99.14,99.14,0,0,0,77.91,41.43l-3,26.7a81,81,0,0,0-6.81,6.81l-26.71,3a99.43,99.43,0,0,0-10,24.3l16.77,21a81.59,81.59,0,0,0,0,9.64l-16.78,21a99.14,99.14,0,0,0,10.07,24.29l26.7,3a81,81,0,0,0,6.81,6.81l3,26.71a99.43,99.43,0,0,0,24.3,10l21-16.77a81.59,81.59,0,0,0,9.64,0l21,16.78a99.14,99.14,0,0,0,24.29-10.07l3-26.7a81,81,0,0,0,6.81-6.81l26.71-3a99.43,99.43,0,0,0,10-24.3l-16.77-21A81.59,81.59,0,0,0,207.86,123.18ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z",opacity:"0.2"},null,-1),n1=v("path",{d:"M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8.06,8.06,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8.06,8.06,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"},null,-1),l1=[o1,n1],i1={key:2},s1=v("path",{d:"M216,130.16q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"},null,-1),d1=[s1],c1={key:3},u1=v("path",{d:"M128,82a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162ZM214,130.84c.06-1.89.06-3.79,0-5.68L229.33,106a6,6,0,0,0,1.11-5.29A105.34,105.34,0,0,0,219.76,74.9a6,6,0,0,0-4.53-3l-24.45-2.71q-1.93-2.07-4-4l-2.72-24.46a6,6,0,0,0-3-4.53,105.65,105.65,0,0,0-25.77-10.66A6,6,0,0,0,150,26.68l-19.2,15.37c-1.89-.06-3.79-.06-5.68,0L106,26.67a6,6,0,0,0-5.29-1.11A105.34,105.34,0,0,0,74.9,36.24a6,6,0,0,0-3,4.53L69.23,65.22q-2.07,1.94-4,4L40.76,72a6,6,0,0,0-4.53,3,105.65,105.65,0,0,0-10.66,25.77A6,6,0,0,0,26.68,106l15.37,19.2c-.06,1.89-.06,3.79,0,5.68L26.67,150.05a6,6,0,0,0-1.11,5.29A105.34,105.34,0,0,0,36.24,181.1a6,6,0,0,0,4.53,3l24.45,2.71q1.94,2.07,4,4L72,215.24a6,6,0,0,0,3,4.53,105.65,105.65,0,0,0,25.77,10.66,6,6,0,0,0,5.29-1.11L125.16,214c1.89.06,3.79.06,5.68,0l19.21,15.38a6,6,0,0,0,3.75,1.31,6.2,6.2,0,0,0,1.54-.2,105.34,105.34,0,0,0,25.76-10.68,6,6,0,0,0,3-4.53l2.71-24.45q2.07-1.93,4-4l24.46-2.72a6,6,0,0,0,4.53-3,105.49,105.49,0,0,0,10.66-25.77,6,6,0,0,0-1.11-5.29Zm-3.1,41.63-23.64,2.63a6,6,0,0,0-3.82,2,75.14,75.14,0,0,1-6.31,6.31,6,6,0,0,0-2,3.82l-2.63,23.63A94.28,94.28,0,0,1,155.14,218l-18.57-14.86a6,6,0,0,0-3.75-1.31h-.36a78.07,78.07,0,0,1-8.92,0,6,6,0,0,0-4.11,1.3L100.87,218a94.13,94.13,0,0,1-17.34-7.17L80.9,187.21a6,6,0,0,0-2-3.82,75.14,75.14,0,0,1-6.31-6.31,6,6,0,0,0-3.82-2l-23.63-2.63A94.28,94.28,0,0,1,38,155.14l14.86-18.57a6,6,0,0,0,1.3-4.11,78.07,78.07,0,0,1,0-8.92,6,6,0,0,0-1.3-4.11L38,100.87a94.13,94.13,0,0,1,7.17-17.34L68.79,80.9a6,6,0,0,0,3.82-2,75.14,75.14,0,0,1,6.31-6.31,6,6,0,0,0,2-3.82l2.63-23.63A94.28,94.28,0,0,1,100.86,38l18.57,14.86a6,6,0,0,0,4.11,1.3,78.07,78.07,0,0,1,8.92,0,6,6,0,0,0,4.11-1.3L155.13,38a94.13,94.13,0,0,1,17.34,7.17l2.63,23.64a6,6,0,0,0,2,3.82,75.14,75.14,0,0,1,6.31,6.31,6,6,0,0,0,3.82,2l23.63,2.63A94.28,94.28,0,0,1,218,100.86l-14.86,18.57a6,6,0,0,0-1.3,4.11,78.07,78.07,0,0,1,0,8.92,6,6,0,0,0,1.3,4.11L218,155.13A94.13,94.13,0,0,1,210.85,172.47Z"},null,-1),f1=[u1],b1={key:4},p1=v("path",{d:"M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"},null,-1),v1=[p1],h1={key:5},g1=v("path",{d:"M128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36,36,0,0,1,128,164Zm83.93-32.49q.13-3.51,0-7l15.83-19.79a4,4,0,0,0,.75-3.53A103.64,103.64,0,0,0,218,75.9a4,4,0,0,0-3-2l-25.19-2.8c-1.58-1.71-3.24-3.37-4.95-4.95L182.07,41a4,4,0,0,0-2-3A104,104,0,0,0,154.82,27.5a4,4,0,0,0-3.53.74L131.51,44.07q-3.51-.14-7,0L104.7,28.24a4,4,0,0,0-3.53-.75A103.64,103.64,0,0,0,75.9,38a4,4,0,0,0-2,3l-2.8,25.19c-1.71,1.58-3.37,3.24-4.95,4.95L41,73.93a4,4,0,0,0-3,2A104,104,0,0,0,27.5,101.18a4,4,0,0,0,.74,3.53l15.83,19.78q-.14,3.51,0,7L28.24,151.3a4,4,0,0,0-.75,3.53A103.64,103.64,0,0,0,38,180.1a4,4,0,0,0,3,2l25.19,2.8c1.58,1.71,3.24,3.37,4.95,4.95l2.8,25.2a4,4,0,0,0,2,3,104,104,0,0,0,25.28,10.46,4,4,0,0,0,3.53-.74l19.78-15.83q3.51.13,7,0l19.79,15.83a4,4,0,0,0,2.5.88,4,4,0,0,0,1-.13A103.64,103.64,0,0,0,180.1,218a4,4,0,0,0,2-3l2.8-25.19c1.71-1.58,3.37-3.24,4.95-4.95l25.2-2.8a4,4,0,0,0,3-2,104,104,0,0,0,10.46-25.28,4,4,0,0,0-.74-3.53Zm.17,42.83-24.67,2.74a4,4,0,0,0-2.55,1.32,76.2,76.2,0,0,1-6.48,6.48,4,4,0,0,0-1.32,2.55l-2.74,24.66a95.45,95.45,0,0,1-19.64,8.15l-19.38-15.51a4,4,0,0,0-2.5-.87h-.24a73.67,73.67,0,0,1-9.16,0,4,4,0,0,0-2.74.87l-19.37,15.5a95.33,95.33,0,0,1-19.65-8.13l-2.74-24.67a4,4,0,0,0-1.32-2.55,76.2,76.2,0,0,1-6.48-6.48,4,4,0,0,0-2.55-1.32l-24.66-2.74a95.45,95.45,0,0,1-8.15-19.64l15.51-19.38a4,4,0,0,0,.87-2.74,77.76,77.76,0,0,1,0-9.16,4,4,0,0,0-.87-2.74l-15.5-19.37A95.33,95.33,0,0,1,43.9,81.66l24.67-2.74a4,4,0,0,0,2.55-1.32,76.2,76.2,0,0,1,6.48-6.48,4,4,0,0,0,1.32-2.55l2.74-24.66a95.45,95.45,0,0,1,19.64-8.15l19.38,15.51a4,4,0,0,0,2.74.87,73.67,73.67,0,0,1,9.16,0,4,4,0,0,0,2.74-.87l19.37-15.5a95.33,95.33,0,0,1,19.65,8.13l2.74,24.67a4,4,0,0,0,1.32,2.55,76.2,76.2,0,0,1,6.48,6.48,4,4,0,0,0,2.55,1.32l24.66,2.74a95.45,95.45,0,0,1,8.15,19.64l-15.51,19.38a4,4,0,0,0-.87,2.74,77.76,77.76,0,0,1,0,9.16,4,4,0,0,0,.87,2.74l15.5,19.37A95.33,95.33,0,0,1,212.1,174.34Z"},null,-1),m1=[g1],y1={name:"PhGear"},x1=G({...y1,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,l=S("weight","regular"),b=S("size","1em"),s=S("color","currentColor"),$=S("mirrored",!1),o=A(()=>a.weight??l),u=A(()=>a.size??b),f=A(()=>a.color??s),m=A(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:$?"scale(-1, 1)":void 0);return(h,M)=>(c(),p("svg",Q({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:f.value,transform:m.value},h.$attrs),[n0(h.$slots,"default"),o.value==="bold"?(c(),p("g",e1,t1)):o.value==="duotone"?(c(),p("g",r1,l1)):o.value==="fill"?(c(),p("g",i1,d1)):o.value==="light"?(c(),p("g",c1,f1)):o.value==="regular"?(c(),p("g",b1,v1)):o.value==="thin"?(c(),p("g",h1,m1)):e0("",!0)],16,Qa))}}),A1=["width","height","fill","transform"],$1={key:0},w1=v("path",{d:"M229.7,82.84l-175.94-54-.16-.05A20,20,0,0,0,28,48V192a20,20,0,0,0,19.94,20,20.38,20.38,0,0,0,5.66-.81l.16,0,78.24-24V196a20,20,0,0,0,20,20h32a20,20,0,0,0,20-20V165.06l25.7-7.89A20.1,20.1,0,0,0,244,138V102A20.1,20.1,0,0,0,229.7,82.84ZM52,186.58V53.43L132,78V162ZM180,192H156V179.78l24-7.36Zm40-56.95-64,19.63V85.33L220,105Z"},null,-1),L1=[w1],V1={key:1},S1=v("path",{d:"M144,69.09V170.91L50.24,199.67A8,8,0,0,1,40,192V48a8,8,0,0,1,10.24-7.67Z",opacity:"0.2"},null,-1),H1=v("path",{d:"M228.54,86.66l-176.06-54A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16,16,16,0,0,0,4.52-.65L136,181.73V192a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16v-29.9l28.54-8.75A16.09,16.09,0,0,0,240,138V102A16.09,16.09,0,0,0,228.54,86.66ZM136,165,48,192V48l88,27Zm48,27H152V176.82L184,167Zm40-54-.11,0L152,160.08V79.92l71.89,22,.11,0v36Z"},null,-1),Z1=[S1,H1],C1={key:2},M1=v("path",{d:"M228.54,86.66l-176.06-54A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16,16,16,0,0,0,4.52-.65L136,181.73V192a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16v-29.9l28.54-8.75A16.09,16.09,0,0,0,240,138V102A16.09,16.09,0,0,0,228.54,86.66ZM184,192H152V176.82L184,167Zm40-54-.11,0L152,160.08V79.91L223.89,102l.11,0v36Z"},null,-1),T1=[M1],R1={key:3},k1=v("path",{d:"M228,88.59l-176.08-54A14,14,0,0,0,34,48V192a14,14,0,0,0,14,14,14.59,14.59,0,0,0,4-.59L138,179v13a14,14,0,0,0,14,14h32a14,14,0,0,0,14-14V160.62l30-9.19A14.07,14.07,0,0,0,238,138V102A14,14,0,0,0,228,88.59ZM48.56,193.92a2,2,0,0,1-1.76-.32A2,2,0,0,1,46,192V48a2,2,0,0,1,.8-1.6A2.05,2.05,0,0,1,48,46a1.79,1.79,0,0,1,.49.08L138,73.53v92.95ZM186,192a2,2,0,0,1-2,2H152a2,2,0,0,1-2-2V175.35l36-11Zm40-54a2,2,0,0,1-1.44,1.92l-.08,0L150,162.8V77.21l74.56,22.87A2,2,0,0,1,226,102Z"},null,-1),z1=[k1],_1={key:4},P1=v("path",{d:"M228.54,86.66l-176.06-54A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16,16,16,0,0,0,4.52-.65L136,181.73V192a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16v-29.9l28.54-8.75A16.09,16.09,0,0,0,240,138V102A16.09,16.09,0,0,0,228.54,86.66ZM136,165,48,192V48l88,27Zm48,27H152V176.82L184,167Zm40-54-.11,0L152,160.08V79.92l71.89,22,.11,0v36Z"},null,-1),E1=[P1],B1={key:5},I1=v("path",{d:"M227.41,90.5l-176-54A12,12,0,0,0,36,48V192a12,12,0,0,0,12,12,12.41,12.41,0,0,0,3.45-.5L140,176.32V192a12,12,0,0,0,12,12h32a12,12,0,0,0,12-12V159.14l31.39-9.63A12.06,12.06,0,0,0,236,138V102A12,12,0,0,0,227.41,90.5ZM49.12,195.84A4,4,0,0,1,44,192V48a4,4,0,0,1,1.6-3.2A4,4,0,0,1,48,44a3.89,3.89,0,0,1,1.07.15L140,72.05V168ZM188,192a4,4,0,0,1-4,4H152a4,4,0,0,1-4-4V173.87l40-12.27Zm40-54a4,4,0,0,1-2.88,3.84l-.05,0L148,165.5v-91l77.12,23.66A4,4,0,0,1,228,102Z"},null,-1),W1=[I1],N1={name:"PhMegaphoneSimple"},O1=G({...N1,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,l=S("weight","regular"),b=S("size","1em"),s=S("color","currentColor"),$=S("mirrored",!1),o=A(()=>a.weight??l),u=A(()=>a.size??b),f=A(()=>a.color??s),m=A(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:$?"scale(-1, 1)":void 0);return(h,M)=>(c(),p("svg",Q({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:f.value,transform:m.value},h.$attrs),[n0(h.$slots,"default"),o.value==="bold"?(c(),p("g",$1,L1)):o.value==="duotone"?(c(),p("g",V1,Z1)):o.value==="fill"?(c(),p("g",C1,T1)):o.value==="light"?(c(),p("g",R1,z1)):o.value==="regular"?(c(),p("g",_1,E1)):o.value==="thin"?(c(),p("g",B1,W1)):e0("",!0)],16,A1))}}),j1=["width","height","fill","transform"],q1={key:0},D1=v("path",{d:"M200,28H160a20,20,0,0,0-20,20V208a20,20,0,0,0,20,20h40a20,20,0,0,0,20-20V48A20,20,0,0,0,200,28Zm-4,176H164V52h32ZM96,28H56A20,20,0,0,0,36,48V208a20,20,0,0,0,20,20H96a20,20,0,0,0,20-20V48A20,20,0,0,0,96,28ZM92,204H60V52H92Z"},null,-1),F1=[D1],G1={key:1},U1=v("path",{d:"M208,48V208a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h40A8,8,0,0,1,208,48ZM96,40H56a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H96a8,8,0,0,0,8-8V48A8,8,0,0,0,96,40Z",opacity:"0.2"},null,-1),K1=v("path",{d:"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"},null,-1),Y1=[U1,K1],X1={key:2},J1=v("path",{d:"M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"},null,-1),Q1=[J1],et={key:3},at=v("path",{d:"M200,34H160a14,14,0,0,0-14,14V208a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V48A14,14,0,0,0,200,34Zm2,174a2,2,0,0,1-2,2H160a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2ZM96,34H56A14,14,0,0,0,42,48V208a14,14,0,0,0,14,14H96a14,14,0,0,0,14-14V48A14,14,0,0,0,96,34Zm2,174a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2H96a2,2,0,0,1,2,2Z"},null,-1),tt=[at],rt={key:4},ot=v("path",{d:"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"},null,-1),nt=[ot],lt={key:5},it=v("path",{d:"M200,36H160a12,12,0,0,0-12,12V208a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V48A12,12,0,0,0,200,36Zm4,172a4,4,0,0,1-4,4H160a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4ZM96,36H56A12,12,0,0,0,44,48V208a12,12,0,0,0,12,12H96a12,12,0,0,0,12-12V48A12,12,0,0,0,96,36Zm4,172a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4H96a4,4,0,0,1,4,4Z"},null,-1),st=[it],dt={name:"PhPause"},K0=G({...dt,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,l=S("weight","regular"),b=S("size","1em"),s=S("color","currentColor"),$=S("mirrored",!1),o=A(()=>a.weight??l),u=A(()=>a.size??b),f=A(()=>a.color??s),m=A(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:$?"scale(-1, 1)":void 0);return(h,M)=>(c(),p("svg",Q({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:f.value,transform:m.value},h.$attrs),[n0(h.$slots,"default"),o.value==="bold"?(c(),p("g",q1,F1)):o.value==="duotone"?(c(),p("g",G1,Y1)):o.value==="fill"?(c(),p("g",X1,Q1)):o.value==="light"?(c(),p("g",et,tt)):o.value==="regular"?(c(),p("g",rt,nt)):o.value==="thin"?(c(),p("g",lt,st)):e0("",!0)],16,j1))}}),ct=["width","height","fill","transform"],ut={key:0},ft=v("path",{d:"M234.49,111.07,90.41,22.94A20,20,0,0,0,60,39.87V216.13a20,20,0,0,0,30.41,16.93l144.08-88.13a19.82,19.82,0,0,0,0-33.86ZM84,208.85V47.15L216.16,128Z"},null,-1),bt=[ft],pt={key:1},vt=v("path",{d:"M228.23,134.69,84.15,222.81A8,8,0,0,1,72,216.12V39.88a8,8,0,0,1,12.15-6.69l144.08,88.12A7.82,7.82,0,0,1,228.23,134.69Z",opacity:"0.2"},null,-1),ht=v("path",{d:"M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"},null,-1),gt=[vt,ht],mt={key:2},yt=v("path",{d:"M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"},null,-1),xt=[yt],At={key:3},$t=v("path",{d:"M231.36,116.19,87.28,28.06a14,14,0,0,0-14.18-.27A13.69,13.69,0,0,0,66,39.87V216.13a13.69,13.69,0,0,0,7.1,12.08,14,14,0,0,0,14.18-.27l144.08-88.13a13.82,13.82,0,0,0,0-23.62Zm-6.26,13.38L81,217.7a2,2,0,0,1-2.06,0,1.78,1.78,0,0,1-1-1.61V39.87a1.78,1.78,0,0,1,1-1.61A2.06,2.06,0,0,1,80,38a2,2,0,0,1,1,.31L225.1,126.43a1.82,1.82,0,0,1,0,3.14Z"},null,-1),wt=[$t],Lt={key:4},Vt=v("path",{d:"M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"},null,-1),St=[Vt],Ht={key:5},Zt=v("path",{d:"M230.32,117.9,86.24,29.79a11.91,11.91,0,0,0-12.17-.23A11.71,11.71,0,0,0,68,39.89V216.11a11.71,11.71,0,0,0,6.07,10.33,11.91,11.91,0,0,0,12.17-.23L230.32,138.1a11.82,11.82,0,0,0,0-20.2Zm-4.18,13.37L82.06,219.39a4,4,0,0,1-4.07.07,3.77,3.77,0,0,1-2-3.35V39.89a3.77,3.77,0,0,1,2-3.35,4,4,0,0,1,4.07.07l144.08,88.12a3.8,3.8,0,0,1,0,6.54Z"},null,-1),Ct=[Zt],Mt={name:"PhPlay"},Y0=G({...Mt,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,l=S("weight","regular"),b=S("size","1em"),s=S("color","currentColor"),$=S("mirrored",!1),o=A(()=>a.weight??l),u=A(()=>a.size??b),f=A(()=>a.color??s),m=A(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:$?"scale(-1, 1)":void 0);return(h,M)=>(c(),p("svg",Q({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:f.value,transform:m.value},h.$attrs),[n0(h.$slots,"default"),o.value==="bold"?(c(),p("g",ut,bt)):o.value==="duotone"?(c(),p("g",pt,gt)):o.value==="fill"?(c(),p("g",mt,xt)):o.value==="light"?(c(),p("g",At,wt)):o.value==="regular"?(c(),p("g",Lt,St)):o.value==="thin"?(c(),p("g",Ht,Ct)):e0("",!0)],16,ct))}}),Tt=["width","height","fill","transform"],Rt={key:0},kt=v("path",{d:"M200,36H56A20,20,0,0,0,36,56V200a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V56A20,20,0,0,0,200,36Zm-4,160H60V60H196Z"},null,-1),zt=[kt],_t={key:1},Pt=v("path",{d:"M208,56V200a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z",opacity:"0.2"},null,-1),Et=v("path",{d:"M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z"},null,-1),Bt=[Pt,Et],It={key:2},Wt=v("path",{d:"M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z"},null,-1),Nt=[Wt],Ot={key:3},jt=v("path",{d:"M200,42H56A14,14,0,0,0,42,56V200a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V56A14,14,0,0,0,200,42Zm2,158a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2H200a2,2,0,0,1,2,2Z"},null,-1),qt=[jt],Dt={key:4},Ft=v("path",{d:"M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z"},null,-1),Gt=[Ft],Ut={key:5},Kt=v("path",{d:"M200,44H56A12,12,0,0,0,44,56V200a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V56A12,12,0,0,0,200,44Zm4,156a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4H200a4,4,0,0,1,4,4Z"},null,-1),Yt=[Kt],Xt={name:"PhStop"},X0=G({...Xt,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,l=S("weight","regular"),b=S("size","1em"),s=S("color","currentColor"),$=S("mirrored",!1),o=A(()=>a.weight??l),u=A(()=>a.size??b),f=A(()=>a.color??s),m=A(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:$?"scale(-1, 1)":void 0);return(h,M)=>(c(),p("svg",Q({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:f.value,transform:m.value},h.$attrs),[n0(h.$slots,"default"),o.value==="bold"?(c(),p("g",Rt,zt)):o.value==="duotone"?(c(),p("g",_t,Bt)):o.value==="fill"?(c(),p("g",It,Nt)):o.value==="light"?(c(),p("g",Ot,qt)):o.value==="regular"?(c(),p("g",Dt,Gt)):o.value==="thin"?(c(),p("g",Ut,Yt)):e0("",!0)],16,Tt))}}),Jt=["width","height","fill","transform"],Qt={key:0},er=v("path",{d:"M228,40V76a12,12,0,0,1-24,0V52H180a12,12,0,0,1,0-24h36A12,12,0,0,1,228,40ZM216,168a12,12,0,0,0-12,12v24H180a12,12,0,0,0,0,24h36a12,12,0,0,0,12-12V180A12,12,0,0,0,216,168ZM76,204H52V180a12,12,0,0,0-24,0v36a12,12,0,0,0,12,12H76a12,12,0,0,0,0-24ZM40,88A12,12,0,0,0,52,76V52H76a12,12,0,0,0,0-24H40A12,12,0,0,0,28,40V76A12,12,0,0,0,40,88Zm136,92a12,12,0,0,1-9.6-4.79,48,48,0,0,0-76.82,0,12,12,0,0,1-19.18-14.42,72.1,72.1,0,0,1,23.92-20.5,44,44,0,1,1,67.34,0,72.1,72.1,0,0,1,23.92,20.5A12,12,0,0,1,176,180Zm-48-48a20,20,0,1,0-20-20A20,20,0,0,0,128,132Z"},null,-1),ar=[er],tr={key:1},rr=v("path",{d:"M160,112a32,32,0,1,1-32-32A32,32,0,0,1,160,112Z",opacity:"0.2"},null,-1),or=v("path",{d:"M224,40V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h36A8,8,0,0,1,224,40Zm-8,132a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h36a8,8,0,0,0,8-8V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v36a8,8,0,0,0,8,8H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V76A8,8,0,0,0,40,84Zm136,92a8,8,0,0,1-6.41-3.19,52,52,0,0,0-83.2,0,8,8,0,1,1-12.8-9.62A67.94,67.94,0,0,1,101,141.51a40,40,0,1,1,53.94,0,67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,176,176Zm-48-40a24,24,0,1,0-24-24A24,24,0,0,0,128,136Z"},null,-1),nr=[rr,or],lr={key:2},ir=v("path",{d:"M224,40V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h36A8,8,0,0,1,224,40Zm-8,132a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h36a8,8,0,0,0,8-8V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v36a8,8,0,0,0,8,8H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V76A8,8,0,0,0,40,84Zm61,57.51A67.94,67.94,0,0,0,73.6,163.19,8,8,0,0,0,80,176h96a8,8,0,0,0,6.4-12.81A67.94,67.94,0,0,0,155,141.51a40,40,0,1,0-53.94,0Z"},null,-1),sr=[ir],dr={key:3},cr=v("path",{d:"M222,40V76a6,6,0,0,1-12,0V46H180a6,6,0,0,1,0-12h36A6,6,0,0,1,222,40Zm-6,134a6,6,0,0,0-6,6v30H180a6,6,0,0,0,0,12h36a6,6,0,0,0,6-6V180A6,6,0,0,0,216,174ZM76,210H46V180a6,6,0,0,0-12,0v36a6,6,0,0,0,6,6H76a6,6,0,0,0,0-12ZM40,82a6,6,0,0,0,6-6V46H76a6,6,0,0,0,0-12H40a6,6,0,0,0-6,6V76A6,6,0,0,0,40,82Zm136,92a6,6,0,0,1-4.8-2.4,54,54,0,0,0-86.4,0,6,6,0,1,1-9.6-7.2,65.65,65.65,0,0,1,29.69-22.26,38,38,0,1,1,46.22,0A65.65,65.65,0,0,1,180.8,164.4,6,6,0,0,1,176,174Zm-48-36a26,26,0,1,0-26-26A26,26,0,0,0,128,138Z"},null,-1),ur=[cr],fr={key:4},br=v("path",{d:"M224,40V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h36A8,8,0,0,1,224,40Zm-8,132a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h36a8,8,0,0,0,8-8V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v36a8,8,0,0,0,8,8H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V76A8,8,0,0,0,40,84Zm136,92a8,8,0,0,1-6.41-3.19,52,52,0,0,0-83.2,0,8,8,0,1,1-12.8-9.62A67.94,67.94,0,0,1,101,141.51a40,40,0,1,1,53.94,0,67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,176,176Zm-48-40a24,24,0,1,0-24-24A24,24,0,0,0,128,136Z"},null,-1),pr=[br],vr={key:5},hr=v("path",{d:"M220,40V76a4,4,0,0,1-8,0V44H180a4,4,0,0,1,0-8h36A4,4,0,0,1,220,40Zm-4,136a4,4,0,0,0-4,4v32H180a4,4,0,0,0,0,8h36a4,4,0,0,0,4-4V180A4,4,0,0,0,216,176ZM76,212H44V180a4,4,0,0,0-8,0v36a4,4,0,0,0,4,4H76a4,4,0,0,0,0-8ZM40,80a4,4,0,0,0,4-4V44H76a4,4,0,0,0,0-8H40a4,4,0,0,0-4,4V76A4,4,0,0,0,40,80Zm136,92a4,4,0,0,1-3.2-1.6,56,56,0,0,0-89.6,0,4,4,0,1,1-6.4-4.8,63.65,63.65,0,0,1,32.5-22.85,36,36,0,1,1,37.4,0,63.65,63.65,0,0,1,32.5,22.85A4,4,0,0,1,176,172Zm-48-32a28,28,0,1,0-28-28A28,28,0,0,0,128,140Z"},null,-1),gr=[hr],mr={name:"PhUserFocus"},yr=G({...mr,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(e){const a=e,l=S("weight","regular"),b=S("size","1em"),s=S("color","currentColor"),$=S("mirrored",!1),o=A(()=>a.weight??l),u=A(()=>a.size??b),f=A(()=>a.color??s),m=A(()=>a.mirrored!==void 0?a.mirrored?"scale(-1, 1)":void 0:$?"scale(-1, 1)":void 0);return(h,M)=>(c(),p("svg",Q({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:u.value,height:u.value,fill:f.value,transform:m.value},h.$attrs),[n0(h.$slots,"default"),o.value==="bold"?(c(),p("g",Qt,ar)):o.value==="duotone"?(c(),p("g",tr,nr)):o.value==="fill"?(c(),p("g",lr,sr)):o.value==="light"?(c(),p("g",dr,ur)):o.value==="regular"?(c(),p("g",fr,pr)):o.value==="thin"?(c(),p("g",vr,gr)):e0("",!0)],16,Jt))}}),xr={class:"flex items-center gap-2"},Ar={class:"flex items-center gap-1"},$r={key:0,class:"flex items-center justify-center w-full h-full"},wr={key:1,class:"flex gap-2 items-center"},Lr={class:"flex gap-2 items-center"},Vr={class:"w-full h-full py-4"},Rr=G({__name:"layout",setup(e){const a=ia(),l=sa(),b=da(),s=ca(),$=xa(),o=ua(),u=A(()=>b.isLoadRoomLoading),f=A(()=>b.allRooms.get(l.params.roomId)??null),m=A(()=>{var i;return W0(b.monitorLogsGroupedByRoomId,(i=f.value)==null?void 0:i.id,new Map)}),h=A(()=>{var i;return W0(b.studentsGroupedByRoomId,(i=f.value)==null?void 0:i.id,new Map)}),M=A(()=>Array.from(m.value.values())),P=A(()=>Array.from(h.value.values())),H=A(()=>s.teacher),E=fa([{name:"Room Overview",key:"overview",icon:X(Aa)},{name:"Monitoring",key:"monitoring",icon:X(yr),badgeValue:A(()=>P.value.filter(i=>i.permitted&&!!i.lockMonitorLogId).length)},{name:"Students",key:"students",icon:X(Ma),badgeValue:A(()=>P.value.filter(i=>!i.permitted&&i.active).length)},{name:"Settings",key:"settings",icon:X(x1)}]),R=A(()=>l.path.split("/").pop()||"overview"),B=V0("/api/start_monitoring/:roomId","PATCH");async function I(){try{await B.execute({params:{roomId:l.params.roomId}}),o.success("Monitoring has started.",{icon:X(Y0)})}catch(i){o.error(i.message)}}const z=V0("/api/pause_monitoring/:roomId","PATCH");async function U(){try{await z.execute({params:{roomId:l.params.roomId}}),o.warning("Monitoring has been paused.",{icon:X(K0)})}catch(i){o.error(i.message)}}const W=V0("/api/stop_monitoring/:roomId","PATCH");async function L(){if(confirm("Are you sure you want to stop monitoring? This will conclude and archive the room session. This action cannot be undone."))try{await W.execute({params:{roomId:l.params.roomId}}),o.error("Monitoring has been stopped.",{icon:X(X0)})}catch(y){o.error(y.message)}}return Q0(()=>{b.loadRoom(l.params.roomId),window.$store=b}),Y($a,f),Y(wa,m),Y(La,h),Y(Va,H),Y(Sa,M),Y(Ha,P),Y(Za,u),(i,y)=>(c(),p0(Be,{"no-divider":""},ba({default:Z(()=>[f.value?(c(),p(C0,{key:1},[C(V(Ja),{type:"card",value:R.value,"onUpdate:value":V(a).push},{default:Z(()=>[(c(!0),p(C0,null,ha(E,_=>(c(),p0(V(g0),{key:_.key,name:_.key},{default:Z(()=>[C(V(ga),{value:_.badgeValue,offset:[6,-3]},{default:Z(()=>[C(V(N0),{to:_.key},{default:Z(()=>[v("div",Lr,[_.icon?(c(),p0(ma(_.icon),{key:0})):e0("",!0),J(" "+j0(_.name),1)])]),_:2},1032,["to"])]),_:2},1032,["value"])]),_:2},1032,["name"]))),128))]),_:1},8,["value","onUpdate:value"]),v("div",Vr,[C(V(ya))])],64)):(c(),p("div",$r,[V(b).isLoadRoomLoading?(c(),p0(va,{key:0})):(c(),p("div",wr,[C(V(O0),null,{default:Z(()=>[...y[8]||(y[8]=[J("Room not found",-1)])]),_:1})]))]))]),_:2},[f.value?{name:"header",fn:Z(()=>[v("div",xr,[C(V(N0),{to:"/dashboard/rooms"},{default:Z(()=>[C(V(i0),{circle:"",quaternary:""},{icon:Z(()=>[C(V(Ca))]),_:1})]),_:1}),C(V(O0),{strong:"",class:"text-lg"},{default:Z(()=>[J(j0(f.value.title),1)]),_:1}),C(Ta,{room:f.value},null,8,["room"])])]),key:"0"}:void 0,f.value&&f.value.status!=="concluded"?{name:"header-extra",fn:Z(()=>[v("div",Ar,[C(V(v0),null,{trigger:Z(()=>[C(V(i0),{type:"error",secondary:"",circle:"",loading:V(W).isLoading,onClick:y[0]||(y[0]=_=>L())},{icon:Z(()=>[C(V(X0))]),_:1},8,["loading"])]),default:Z(()=>[y[4]||(y[4]=J(" Stop monitoring and conclude room session ",-1))]),_:1}),C(V(v0),null,{trigger:Z(()=>[C(V(i0),{type:"warning",secondary:"",circle:"",loading:V(z).isLoading,onClick:y[1]||(y[1]=_=>U()),disabled:f.value.status==="paused"},{icon:Z(()=>[C(V(K0))]),_:1},8,["loading","disabled"])]),default:Z(()=>[y[5]||(y[5]=J(" Pause monitoring ",-1))]),_:1}),C(V(v0),null,{trigger:Z(()=>[C(V(i0),{type:"success",secondary:"",circle:"",loading:V(B).isLoading,onClick:y[2]||(y[2]=_=>I()),disabled:f.value.status==="monitoring"},{icon:Z(()=>[C(V(Y0))]),_:1},8,["loading","disabled"])]),default:Z(()=>[y[6]||(y[6]=J(" Start monitoring ",-1))]),_:1})]),C(V(pa),{vertical:""}),C(V(v0),null,{trigger:Z(()=>[C(V(i0),{circle:"",onClick:y[3]||(y[3]=_=>V($).show(f.value))},{icon:Z(()=>[C(V(O1))]),_:1})]),default:Z(()=>[y[7]||(y[7]=J(" Send announcement to students ",-1))]),_:1})]),key:"1"}:void 0]),1024))}});export{Rr as default};
