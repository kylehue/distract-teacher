import{G as j}from"./PhDotsThreeVertical.vue-dl71m6Vz.js";import{aq as x,au as G,ar as y,as as t,at as A,d as w,C as i,ay as oe,br as he,bs as le,aa as ye,bt as ke,bu as xe,bv as Ce,az as ne,bw as Le,v as Y,aH as D,aJ as $e,e as ae,g as P,f as u,w as f,j as N,x as Se,h as g,B as I,i as z,a5 as K,aD as q,z as Ne,a3 as Pe,a as Ie,b as Te,P as _e,t as _,Y as Me,T as ze,M as we,aX as Be,aZ as Ee,r as J,N as O,b2 as M,bx as Oe,D as U,K as W,ac as H,R as F,bp as X,o as Re,c as R,F as Ae,y as Z,_ as Q,G as ee}from"./index-DoW2RhRu.js";import{N as Ve}from"./Select-DFcm6fUM.js";import{N as De}from"./Badge-CFMOTC7E.js";import{N as re}from"./DataTable-BvVxsARg.js";import"./attribute-Cz32yFEB.js";const n="0!important",ie="-1px!important";function $(o){return y(`${o}-type`,[t("& +",[x("button",{},[y(`${o}-type`,[A("border",{borderLeftWidth:n}),A("state-border",{left:ie})])])])])}function S(o){return y(`${o}-type`,[t("& +",[x("button",[y(`${o}-type`,[A("border",{borderTopWidth:n}),A("state-border",{top:ie})])])])])}const Fe=x("button-group",`
 flex-wrap: nowrap;
 display: inline-flex;
 position: relative;
`,[G("vertical",{flexDirection:"row"},[G("rtl",[x("button",[t("&:first-child:not(:last-child)",`
 margin-right: ${n};
 border-top-right-radius: ${n};
 border-bottom-right-radius: ${n};
 `),t("&:last-child:not(:first-child)",`
 margin-left: ${n};
 border-top-left-radius: ${n};
 border-bottom-left-radius: ${n};
 `),t("&:not(:first-child):not(:last-child)",`
 margin-left: ${n};
 margin-right: ${n};
 border-radius: ${n};
 `),$("default"),y("ghost",[$("primary"),$("info"),$("success"),$("warning"),$("error")])])])]),y("vertical",{flexDirection:"column"},[x("button",[t("&:first-child:not(:last-child)",`
 margin-bottom: ${n};
 margin-left: ${n};
 margin-right: ${n};
 border-bottom-left-radius: ${n};
 border-bottom-right-radius: ${n};
 `),t("&:last-child:not(:first-child)",`
 margin-top: ${n};
 margin-left: ${n};
 margin-right: ${n};
 border-top-left-radius: ${n};
 border-top-right-radius: ${n};
 `),t("&:not(:first-child):not(:last-child)",`
 margin: ${n};
 border-radius: ${n};
 `),S("default"),y("ghost",[S("primary"),S("info"),S("success"),S("warning"),S("error")])])])]),Ge={size:{type:String,default:void 0},vertical:Boolean},Ye=w({name:"ButtonGroup",props:Ge,setup(o){const{mergedClsPrefixRef:a,mergedRtlRef:c}=oe(o);return he("-button-group",Fe,a),ye(ke,o),{rtlEnabled:le("ButtonGroup",c,a),mergedClsPrefix:a}},render(){const{mergedClsPrefix:o}=this;return i("div",{class:[`${o}-button-group`,this.rtlEnabled&&`${o}-button-group--rtl`,this.vertical&&`${o}-button-group--vertical`],role:"group"},this.$slots)}}),Ke=t([x("table",`
 font-size: var(--n-font-size);
 font-variant-numeric: tabular-nums;
 line-height: var(--n-line-height);
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 text-align: left;
 border-collapse: separate;
 border-spacing: 0;
 overflow: hidden;
 background-color: var(--n-td-color);
 border-color: var(--n-merged-border-color);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 --n-merged-border-color: var(--n-border-color);
 `,[t("th",`
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 text-align: inherit;
 padding: var(--n-th-padding);
 vertical-align: inherit;
 text-transform: none;
 border: 0px solid var(--n-merged-border-color);
 font-weight: var(--n-th-font-weight);
 color: var(--n-th-text-color);
 background-color: var(--n-th-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 border-right: 1px solid var(--n-merged-border-color);
 `,[t("&:last-child",`
 border-right: 0px solid var(--n-merged-border-color);
 `)]),t("td",`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 padding: var(--n-td-padding);
 color: var(--n-td-text-color);
 background-color: var(--n-td-color);
 border: 0px solid var(--n-merged-border-color);
 border-right: 1px solid var(--n-merged-border-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 `,[t("&:last-child",`
 border-right: 0px solid var(--n-merged-border-color);
 `)]),y("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `,[t("tr",[t("&:last-child",[t("td",`
 border-bottom: 0 solid var(--n-merged-border-color);
 `)])])]),y("single-line",[t("th",`
 border-right: 0px solid var(--n-merged-border-color);
 `),t("td",`
 border-right: 0px solid var(--n-merged-border-color);
 `)]),y("single-column",[t("tr",[t("&:not(:last-child)",[t("td",`
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])]),y("striped",[t("tr:nth-of-type(even)",[t("td","background-color: var(--n-td-color-striped)")])]),G("bottom-bordered",[t("tr",[t("&:last-child",[t("td",`
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])])]),xe(x("table",`
 background-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `,[t("th",`
 background-color: var(--n-th-color-modal);
 `),t("td",`
 background-color: var(--n-td-color-modal);
 `)])),Ce(x("table",`
 background-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `,[t("th",`
 background-color: var(--n-th-color-popover);
 `),t("td",`
 background-color: var(--n-td-color-popover);
 `)]))]),je=Object.assign(Object.assign({},ne.props),{bordered:{type:Boolean,default:!0},bottomBordered:{type:Boolean,default:!0},singleLine:{type:Boolean,default:!0},striped:Boolean,singleColumn:Boolean,size:{type:String,default:"medium"}}),qe=w({name:"Table",props:je,setup(o){const{mergedClsPrefixRef:a,inlineThemeDisabled:c,mergedRtlRef:p}=oe(o),d=ne("Table","-table",Ke,Le,o,a),v=le("Table",p,a),h=Y(()=>{const{size:L}=o,{self:{borderColor:m,tdColor:B,tdColorModal:k,tdColorPopover:E,thColor:V,thColorModal:T,thColorPopover:C,thTextColor:e,tdTextColor:r,borderRadius:l,thFontWeight:b,lineHeight:de,borderColorModal:se,borderColorPopover:ue,tdColorStriped:ce,tdColorStripedModal:me,tdColorStripedPopover:ge,[D("fontSize",L)]:pe,[D("tdPadding",L)]:ve,[D("thPadding",L)]:be},common:{cubicBezierEaseInOut:fe}}=d.value;return{"--n-bezier":fe,"--n-td-color":B,"--n-td-color-modal":k,"--n-td-color-popover":E,"--n-td-text-color":r,"--n-border-color":m,"--n-border-color-modal":se,"--n-border-color-popover":ue,"--n-border-radius":l,"--n-font-size":pe,"--n-th-color":V,"--n-th-color-modal":T,"--n-th-color-popover":C,"--n-th-font-weight":b,"--n-th-text-color":e,"--n-line-height":de,"--n-td-padding":ve,"--n-th-padding":be,"--n-td-color-striped":ce,"--n-td-color-striped-modal":me,"--n-td-color-striped-popover":ge}}),s=c?$e("table",Y(()=>o.size[0]),h,o):void 0;return{rtlEnabled:v,mergedClsPrefix:a,cssVars:c?void 0:h,themeClass:s==null?void 0:s.themeClass,onRender:s==null?void 0:s.onRender}},render(){var o;const{mergedClsPrefix:a}=this;return(o=this.onRender)===null||o===void 0||o.call(this),i("table",{class:[`${a}-table`,this.themeClass,{[`${a}-table--rtl`]:this.rtlEnabled,[`${a}-table--bottom-bordered`]:this.bottomBordered,[`${a}-table--bordered`]:this.bordered,[`${a}-table--single-line`]:this.singleLine,[`${a}-table--single-column`]:this.singleColumn,[`${a}-table--striped`]:this.striped}],style:this.cssVars},this.$slots)}}),Je={class:"flex gap-2 justify-around"},Ue=w({__name:"filter-menu",emits:["confirm","clear"],setup(o,{emit:a}){const c=a;return(p,d)=>(P(),ae(u(qe),{bordered:!1,"single-line":!1,class:"rounded!"},{default:f(()=>[N("tbody",null,[N("tr",null,[N("td",null,[Se(p.$slots,"default")])]),N("tr",null,[N("td",Je,[g(u(I),{size:"tiny",onClick:d[0]||(d[0]=v=>c("clear"))},{default:f(()=>[...d[2]||(d[2]=[z("Clear",-1)])]),_:1}),g(u(I),{size:"tiny",type:"primary",onClick:d[1]||(d[1]=v=>c("confirm"))},{default:f(()=>[...d[3]||(d[3]=[z(" Confirm ",-1)])]),_:1})])])])]),_:3}))}}),te=w({inheritAttrs:!1,__name:"filter-menu-multiselect",props:{value:{}},emits:["confirm","clear","update:value"],setup(o,{emit:a}){const c=o,p=K(c.value??[]),d=a;return q(p,v=>{d("update:value",v)}),q(()=>c.value,v=>{v&&(p.value=v)}),(v,h)=>(P(),ae(Ue,{onClear:h[1]||(h[1]=s=>d("clear")),onConfirm:h[2]||(h[2]=s=>d("confirm",p.value))},{default:f(()=>[g(u(Ve),Ne(v.$attrs,{multiple:"",filterable:"",consistentMenuWidth:!1,value:p.value,"onUpdate:value":h[0]||(h[0]=s=>p.value=s)}),null,16,["value"])]),_:1}))}}),We={key:1,class:"flex flex-col w-full h-full gap-4"},He={class:"flex items-center justify-end gap-2"},Xe={key:0,class:"overflow-hidden"},Ze={key:1,class:"overflow-hidden"},nr=w({__name:"monitoring",setup(o){const a=Pe(),c=Ie(),p=Te("/api/students/:studentId/unlock","PATCH"),d=K([]),v=_e(),h=_(Me),s=_(ze),L=_(we),m=_(Be),B=_(Ee),k=K("warningLogs"),E=[J({title:"Student Name",key:"studentName",render(e){let r=s.value.get(e.studentId);return i("div",{class:"flex flex-wrap items-center gap-1"},[i(O,null,{default:()=>(r==null?void 0:r.name)||"<Unnamed>"}),r!=null&&r.active?"":i(M,{type:"default",round:!0,size:"small"},{default:()=>"Inactive"}),r!=null&&r.permitted?"":i(M,{type:"warning",round:!0,size:"small"},{default:()=>"Needs Approval"})])},filterMultiple:!0,renderFilterMenu({hide:e}){return i(te,{class:"w-[200px]!",placeholder:"Filter students",placement:"right-start",options:Array.from(s.value.values()).map(r=>({label:r.name,value:r.id})),value:d.value,onConfirm(r){C(r),e()},onClear(){C([]),e()}})},filter(e,r){return e===r.studentId},sorter:{compare(e,r){const l=s.value.get(e.studentId),b=s.value.get(r.studentId);return!l||!b?0:l.name.localeCompare(b.name)},multiple:1}}),{title:"Integrity Score",key:"integrityScore",render(e){return(e.integrityScore*100).toFixed(2)+"%"},sorter:{compare(e,r){return e.integrityScore-r.integrityScore},multiple:3}},{title:"Warning Level",key:"warningLevel",render(e){return i(M,{type:Oe(e.warningLevel),round:!0},{default:()=>e.warningLevel})},filterOptions:[{label:"Low",value:"low"},{label:"Moderate",value:"moderate"},{label:"Severe",value:"severe"}],filterMultiple:!0,filter(e,r){return r.warningLevel===e},sorter:{compare(e,r){const l={none:0,low:1,moderate:2,severe:3};return l[e.warningLevel]-l[r.warningLevel]},multiple:3}},{title:"Phone Detected",key:"isPhonePresent",width:200,render(e){return i(O,{type:e.isPhonePresent?"error":void 0},{default:()=>e.isPhonePresent?"Yes":"No"})},filterOptions:[{label:"Yes",value:"true"},{label:"No",value:"false"}],filterMultiple:!0,filter(e,r){return String(r.isPhonePresent)===e},sorter:{compare(e,r){return Number(e.isPhonePresent)-Number(r.isPhonePresent)},multiple:4}},{title:"Time",key:"time",render(e){return W(e.createdAt,!1,!0)},sorter:{compare(e,r){return U(e.createdAt,r.createdAt)},multiple:2},defaultSortOrder:"descend"},{title:"",key:"actions",width:50,align:"center",fixed:"right",render(e){return i(X,{options:[{value:"evidence",label:"View Evidence",render({node:r}){return i(F,{to:{query:{monitorLogId:e.id}}},()=>r)}},{value:"reports",label:"View Reports",render({node:r}){return i(F,{to:`/dashboard/student-reports/${e.studentId}`},()=>r)}}],trigger:"click"},{default:()=>i(I,{size:"small",circle:!0,quaternary:!0},{default:H(j)})})}}],V=[J({title:"Student Name",key:"studentName",render(e){return i("div",{class:"flex flex-wrap items-center gap-1"},[i(O,null,{default:()=>(e==null?void 0:e.name)||"<Unnamed>"}),e!=null&&e.active?"":i(M,{type:"default",round:!0,size:"small"},{default:()=>"Inactive"}),e!=null&&e.permitted?"":i(M,{type:"warning",round:!0,size:"small"},{default:()=>"Needs Approval"})])},filterMultiple:!0,renderFilterMenu({hide:e}){return i(te,{class:"w-[200px]!",placeholder:"Filter students",placement:"right-start",options:Array.from(s.value.values()).map(r=>({label:r.name,value:r.id})),value:d.value,onConfirm(r){C(r),e()},onClear(){C([]),e()}})},filter(e,r){return e===r.id},sorter:{compare(e,r){return e.name.localeCompare(r.name)},multiple:1}}),{title:"Evidence Integrity Score",key:"integrityScore",render(e){return(m.value.get(e.lockMonitorLogId).integrityScore*100).toFixed(2)+"%"},sorter:{compare(e,r){let l=m.value.get(e.lockMonitorLogId),b=m.value.get(r.lockMonitorLogId);return l.integrityScore-b.integrityScore},multiple:3}},{title:"Phone Detected",key:"isPhonePresent",render(e){let r=m.value.get(e.lockMonitorLogId);return i(O,{type:r.isPhonePresent?"error":void 0},{default:()=>r.isPhonePresent?"Yes":"No"})},filterOptions:[{label:"Yes",value:"true"},{label:"No",value:"false"}],filterMultiple:!0,filter(e,r){let l=m.value.get(r.lockMonitorLogId);return String(l.isPhonePresent)===e},sorter:{compare(e,r){let l=m.value.get(e.lockMonitorLogId),b=m.value.get(r.lockMonitorLogId);return Number(l.isPhonePresent)-Number(b.isPhonePresent)},multiple:4}},{title:"Time Locked",key:"time",render(e){let r=m.value.get(e.lockMonitorLogId);return W(r.createdAt,!1,!0)},sorter:{compare(e,r){let l=m.value.get(e.lockMonitorLogId),b=m.value.get(r.lockMonitorLogId);return U(l.createdAt,b.createdAt)},multiple:2},defaultSortOrder:"descend"},{title:"",key:"actions",width:50,align:"center",fixed:"right",render(e){let r=m.value.get(e.lockMonitorLogId);return i(X,{options:[{value:"evidence",label:"View Lock Evidence",render({node:l}){return i(F,{to:{query:{monitorLogId:r.id}}},()=>l)}},{value:"close",label:"Close Case",style:{color:v.value.errorColor}}],trigger:"click",async onUpdateValue(l){if(l==="close")try{await p.execute({params:{studentId:e.id}}),c.success(`Cheating case for ${e.name} has been closed.`)}catch(b){console.error(b),c.error("Something went wrong while closing the case.")}}},{default:()=>i(I,{size:"small",circle:!0,quaternary:!0},{default:H(j)})})}}],T=Y(()=>Array.from(s.value.values()).filter(e=>e.permitted&&!!e.lockMonitorLogId));function C(e){const r=E.find(l=>l.key==="studentName");d.value=e,r.filterOptionValues=e}return Re(()=>{a.query.filterByStudent&&(d.value=[a.query.filterByStudent],C(d.value))}),(e,r)=>u(h)?(P(),R("div",We,[N("div",He,[g(u(Ye),{class:"me-auto"},{default:f(()=>[g(u(I),{focusable:!1,type:k.value==="warningLogs"?"primary":"default",secondary:k.value==="warningLogs",onClick:r[0]||(r[0]=l=>k.value="warningLogs"),size:"small"},{default:f(()=>[...r[2]||(r[2]=[z(" Warning Logs ",-1)])]),_:1},8,["type","secondary"]),g(u(I),{focusable:!1,type:k.value==="lockedStudents"?"primary":"default",secondary:k.value==="lockedStudents",onClick:r[1]||(r[1]=l=>k.value="lockedStudents"),size:"small"},{default:f(()=>[g(u(De),{value:T.value.length,offset:[10,-8]},{default:f(()=>[...r[3]||(r[3]=[z(" Locked Students ",-1)])]),_:1},8,["value"])]),_:1},8,["type","secondary"])]),_:1})]),k.value==="warningLogs"?(P(),R("div",Xe,[g(u(re),{columns:E,data:u(L),pagination:{pageSize:10},"single-line":!1,"scroll-x":u(L).length?900:void 0,loading:u(B)},{empty:f(()=>[g(u(ee),{class:"m-auto",description:"There are currently no warning logs."})]),loading:f(()=>[g(Q,{text:""})]),_:1},8,["data","scroll-x","loading"])])):Z("",!0),k.value==="lockedStudents"?(P(),R("div",Ze,[g(u(re),{columns:V,data:T.value,pagination:{pageSize:10},"single-line":!1,"scroll-x":T.value.length?900:void 0,loading:u(B)},{empty:f(()=>[g(u(ee),{class:"m-auto",description:"There are currently no locked students."})]),loading:f(()=>[g(Q,{text:""})]),_:1},8,["data","scroll-x","loading"])])):Z("",!0)])):(P(),R(Ae,{key:0},[z("Nothing")],64))}});export{nr as default};
