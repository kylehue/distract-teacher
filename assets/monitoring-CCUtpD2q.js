import{G as j}from"./PhDotsThreeVertical.vue-B4H2bXc0.js";import{aq as C,au as G,ar as h,as as t,at as A,d as w,D as i,ay as te,bq as fe,br as oe,aa as he,bs as ye,bt as ke,bu as Ce,az as le,bv as xe,x as Y,aH as D,aJ as Le,e as ne,g as P,f as u,w as k,k as N,y as $e,h as f,B as I,i as _,a5 as q,aD as K,A as Se,a3 as Ne,a as Pe,b as Ie,Q as Me,v as T,X as Te,V as ze,M as _e,aX as we,aZ as Be,r as J,j as O,b1 as z,bw as Ee,E as U,L as W,ac as H,R as F,bo as X,o as Oe,c as R,F as Re,z as Q,H as Z}from"./index-D2g8Lydp.js";import{N as Ae}from"./Select-CBA7Z4yj.js";import{N as Ve}from"./Badge-C601BwzH.js";import{N as ee}from"./DataTable-DRM_2Jgd.js";import"./attribute-Cz32yFEB.js";const n="0!important",ae="-1px!important";function $(o){return h(`${o}-type`,[t("& +",[C("button",{},[h(`${o}-type`,[A("border",{borderLeftWidth:n}),A("state-border",{left:ae})])])])])}function S(o){return h(`${o}-type`,[t("& +",[C("button",[h(`${o}-type`,[A("border",{borderTopWidth:n}),A("state-border",{top:ae})])])])])}const De=C("button-group",`
 flex-wrap: nowrap;
 display: inline-flex;
 position: relative;
`,[G("vertical",{flexDirection:"row"},[G("rtl",[C("button",[t("&:first-child:not(:last-child)",`
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
 `),$("default"),h("ghost",[$("primary"),$("info"),$("success"),$("warning"),$("error")])])])]),h("vertical",{flexDirection:"column"},[C("button",[t("&:first-child:not(:last-child)",`
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
 `),S("default"),h("ghost",[S("primary"),S("info"),S("success"),S("warning"),S("error")])])])]),Fe={size:{type:String,default:void 0},vertical:Boolean},Ge=w({name:"ButtonGroup",props:Fe,setup(o){const{mergedClsPrefixRef:a,mergedRtlRef:c}=te(o);return fe("-button-group",De,a),he(ye,o),{rtlEnabled:oe("ButtonGroup",c,a),mergedClsPrefix:a}},render(){const{mergedClsPrefix:o}=this;return i("div",{class:[`${o}-button-group`,this.rtlEnabled&&`${o}-button-group--rtl`,this.vertical&&`${o}-button-group--vertical`],role:"group"},this.$slots)}}),Ye=t([C("table",`
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
 `)]),h("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `,[t("tr",[t("&:last-child",[t("td",`
 border-bottom: 0 solid var(--n-merged-border-color);
 `)])])]),h("single-line",[t("th",`
 border-right: 0px solid var(--n-merged-border-color);
 `),t("td",`
 border-right: 0px solid var(--n-merged-border-color);
 `)]),h("single-column",[t("tr",[t("&:not(:last-child)",[t("td",`
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])]),h("striped",[t("tr:nth-of-type(even)",[t("td","background-color: var(--n-td-color-striped)")])]),G("bottom-bordered",[t("tr",[t("&:last-child",[t("td",`
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])])]),ke(C("table",`
 background-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `,[t("th",`
 background-color: var(--n-th-color-modal);
 `),t("td",`
 background-color: var(--n-td-color-modal);
 `)])),Ce(C("table",`
 background-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `,[t("th",`
 background-color: var(--n-th-color-popover);
 `),t("td",`
 background-color: var(--n-td-color-popover);
 `)]))]),qe=Object.assign(Object.assign({},le.props),{bordered:{type:Boolean,default:!0},bottomBordered:{type:Boolean,default:!0},singleLine:{type:Boolean,default:!0},striped:Boolean,singleColumn:Boolean,size:{type:String,default:"medium"}}),je=w({name:"Table",props:qe,setup(o){const{mergedClsPrefixRef:a,inlineThemeDisabled:c,mergedRtlRef:g}=te(o),d=le("Table","-table",Ye,xe,o,a),p=oe("Table",g,a),b=Y(()=>{const{size:L}=o,{self:{borderColor:m,tdColor:B,tdColorModal:y,tdColorPopover:E,thColor:V,thColorModal:M,thColorPopover:x,thTextColor:e,tdTextColor:r,borderRadius:l,thFontWeight:v,lineHeight:ie,borderColorModal:de,borderColorPopover:se,tdColorStriped:ue,tdColorStripedModal:ce,tdColorStripedPopover:me,[D("fontSize",L)]:ge,[D("tdPadding",L)]:pe,[D("thPadding",L)]:ve},common:{cubicBezierEaseInOut:be}}=d.value;return{"--n-bezier":be,"--n-td-color":B,"--n-td-color-modal":y,"--n-td-color-popover":E,"--n-td-text-color":r,"--n-border-color":m,"--n-border-color-modal":de,"--n-border-color-popover":se,"--n-border-radius":l,"--n-font-size":ge,"--n-th-color":V,"--n-th-color-modal":M,"--n-th-color-popover":x,"--n-th-font-weight":v,"--n-th-text-color":e,"--n-line-height":ie,"--n-td-padding":pe,"--n-th-padding":ve,"--n-td-color-striped":ue,"--n-td-color-striped-modal":ce,"--n-td-color-striped-popover":me}}),s=c?Le("table",Y(()=>o.size[0]),b,o):void 0;return{rtlEnabled:p,mergedClsPrefix:a,cssVars:c?void 0:b,themeClass:s==null?void 0:s.themeClass,onRender:s==null?void 0:s.onRender}},render(){var o;const{mergedClsPrefix:a}=this;return(o=this.onRender)===null||o===void 0||o.call(this),i("table",{class:[`${a}-table`,this.themeClass,{[`${a}-table--rtl`]:this.rtlEnabled,[`${a}-table--bottom-bordered`]:this.bottomBordered,[`${a}-table--bordered`]:this.bordered,[`${a}-table--single-line`]:this.singleLine,[`${a}-table--single-column`]:this.singleColumn,[`${a}-table--striped`]:this.striped}],style:this.cssVars},this.$slots)}}),Ke={class:"flex gap-2 justify-around"},Je=w({__name:"filter-menu",emits:["confirm","clear"],setup(o,{emit:a}){const c=a;return(g,d)=>(P(),ne(u(je),{bordered:!1,"single-line":!1,class:"rounded!"},{default:k(()=>[N("tbody",null,[N("tr",null,[N("td",null,[$e(g.$slots,"default")])]),N("tr",null,[N("td",Ke,[f(u(I),{size:"tiny",onClick:d[0]||(d[0]=p=>c("clear"))},{default:k(()=>[...d[2]||(d[2]=[_("Clear",-1)])]),_:1}),f(u(I),{size:"tiny",type:"primary",onClick:d[1]||(d[1]=p=>c("confirm"))},{default:k(()=>[...d[3]||(d[3]=[_(" Confirm ",-1)])]),_:1})])])])]),_:3}))}}),re=w({inheritAttrs:!1,__name:"filter-menu-multiselect",props:{value:{}},emits:["confirm","clear","update:value"],setup(o,{emit:a}){const c=o,g=q(c.value??[]),d=a;return K(g,p=>{d("update:value",p)}),K(()=>c.value,p=>{p&&(g.value=p)}),(p,b)=>(P(),ne(Je,{onClear:b[1]||(b[1]=s=>d("clear")),onConfirm:b[2]||(b[2]=s=>d("confirm",g.value))},{default:k(()=>[f(u(Ae),Se(p.$attrs,{multiple:"",filterable:"",consistentMenuWidth:!1,value:g.value,"onUpdate:value":b[0]||(b[0]=s=>g.value=s)}),null,16,["value"])]),_:1}))}}),Ue={key:1,class:"flex flex-col w-full h-full gap-4"},We={class:"flex items-center justify-end gap-2"},He={key:0,class:"overflow-hidden"},Xe={key:1,class:"overflow-hidden"},lr=w({__name:"monitoring",setup(o){const a=Ne(),c=Pe(),g=Ie("/api/students/:studentId/unlock","PATCH"),d=q([]),p=Me(),b=T(Te),s=T(ze),L=T(_e),m=T(we),B=T(Be),y=q("warningLogs"),E=[J({title:"Student Name",key:"studentName",render(e){let r=s.value.get(e.studentId);return i("div",{class:"flex flex-wrap items-center gap-1"},[i(O,null,{default:()=>(r==null?void 0:r.name)||"<Unnamed>"}),r!=null&&r.active?"":i(z,{type:"default",round:!0,size:"small"},{default:()=>"Inactive"}),r!=null&&r.permitted?"":i(z,{type:"warning",round:!0,size:"small"},{default:()=>"Needs Approval"})])},filterMultiple:!0,renderFilterMenu({hide:e}){return i(re,{class:"w-[200px]!",placeholder:"Filter students",placement:"right-start",options:Array.from(s.value.values()).map(r=>({label:r.name,value:r.id})),value:d.value,onConfirm(r){x(r),e()},onClear(){x([]),e()}})},filter(e,r){return e===r.studentId},sorter:{compare(e,r){const l=s.value.get(e.studentId),v=s.value.get(r.studentId);return!l||!v?0:l.name.localeCompare(v.name)},multiple:1}}),{title:"Integrity Score",key:"integrityScore",render(e){return(e.integrityScore*100).toFixed(2)+"%"},sorter:{compare(e,r){return e.integrityScore-r.integrityScore},multiple:3}},{title:"Warning Level",key:"warningLevel",render(e){return i(z,{type:Ee(e.warningLevel),round:!0},{default:()=>e.warningLevel})},filterOptions:[{label:"Low",value:"low"},{label:"Moderate",value:"moderate"},{label:"Severe",value:"severe"}],filterMultiple:!0,filter(e,r){return r.warningLevel===e},sorter:{compare(e,r){const l={none:0,low:1,moderate:2,severe:3};return l[e.warningLevel]-l[r.warningLevel]},multiple:3}},{title:"Phone Detected",key:"isPhonePresent",width:200,render(e){return i(O,{type:e.isPhonePresent?"error":void 0},{default:()=>e.isPhonePresent?"Yes":"No"})},filterOptions:[{label:"Yes",value:"true"},{label:"No",value:"false"}],filterMultiple:!0,filter(e,r){return String(r.isPhonePresent)===e},sorter:{compare(e,r){return Number(e.isPhonePresent)-Number(r.isPhonePresent)},multiple:4}},{title:"Time",key:"time",render(e){return W(e.createdAt,!1,!0)},sorter:{compare(e,r){return U(e.createdAt,r.createdAt)},multiple:2},defaultSortOrder:"descend"},{title:"",key:"actions",width:50,align:"center",fixed:"right",render(e){return i(X,{options:[{value:"evidence",label:"View Evidence",render({node:r}){return i(F,{to:{query:{monitorLogId:e.id}}},()=>r)}},{value:"reports",label:"View Reports",render({node:r}){return i(F,{to:`/dashboard/student-reports/${e.studentId}`},()=>r)}}],trigger:"click"},{default:()=>i(I,{size:"small",circle:!0,quaternary:!0},{default:H(j)})})}}],V=[J({title:"Student Name",key:"studentName",render(e){return i("div",{class:"flex flex-wrap items-center gap-1"},[i(O,null,{default:()=>(e==null?void 0:e.name)||"<Unnamed>"}),e!=null&&e.active?"":i(z,{type:"default",round:!0,size:"small"},{default:()=>"Inactive"}),e!=null&&e.permitted?"":i(z,{type:"warning",round:!0,size:"small"},{default:()=>"Needs Approval"})])},filterMultiple:!0,renderFilterMenu({hide:e}){return i(re,{class:"w-[200px]!",placeholder:"Filter students",placement:"right-start",options:Array.from(s.value.values()).map(r=>({label:r.name,value:r.id})),value:d.value,onConfirm(r){x(r),e()},onClear(){x([]),e()}})},filter(e,r){return e===r.id},sorter:{compare(e,r){return e.name.localeCompare(r.name)},multiple:1}}),{title:"Evidence Integrity Score",key:"integrityScore",render(e){return(m.value.get(e.lockMonitorLogId).integrityScore*100).toFixed(2)+"%"},sorter:{compare(e,r){let l=m.value.get(e.lockMonitorLogId),v=m.value.get(r.lockMonitorLogId);return l.integrityScore-v.integrityScore},multiple:3}},{title:"Phone Detected",key:"isPhonePresent",render(e){let r=m.value.get(e.lockMonitorLogId);return i(O,{type:r.isPhonePresent?"error":void 0},{default:()=>r.isPhonePresent?"Yes":"No"})},filterOptions:[{label:"Yes",value:"true"},{label:"No",value:"false"}],filterMultiple:!0,filter(e,r){let l=m.value.get(r.lockMonitorLogId);return String(l.isPhonePresent)===e},sorter:{compare(e,r){let l=m.value.get(e.lockMonitorLogId),v=m.value.get(r.lockMonitorLogId);return Number(l.isPhonePresent)-Number(v.isPhonePresent)},multiple:4}},{title:"Time Locked",key:"time",render(e){let r=m.value.get(e.lockMonitorLogId);return W(r.createdAt,!1,!0)},sorter:{compare(e,r){let l=m.value.get(e.lockMonitorLogId),v=m.value.get(r.lockMonitorLogId);return U(l.createdAt,v.createdAt)},multiple:2},defaultSortOrder:"descend"},{title:"",key:"actions",width:50,align:"center",fixed:"right",render(e){let r=m.value.get(e.lockMonitorLogId);return i(X,{options:[{value:"evidence",label:"View Lock Evidence",render({node:l}){return i(F,{to:{query:{monitorLogId:r.id}}},()=>l)}},{value:"close",label:"Close Case",style:{color:p.value.errorColor}}],trigger:"click",async onUpdateValue(l){if(l==="close")try{await g.execute({params:{studentId:e.id}}),c.success(`Cheating case for ${e.name} has been closed.`)}catch(v){console.error(v),c.error("Something went wrong while closing the case.")}}},{default:()=>i(I,{size:"small",circle:!0,quaternary:!0},{default:H(j)})})}}],M=Y(()=>Array.from(s.value.values()).filter(e=>e.permitted&&!!e.lockMonitorLogId));function x(e){const r=E.find(l=>l.key==="studentName");d.value=e,r.filterOptionValues=e}return Oe(()=>{a.query.filterByStudent&&(d.value=[a.query.filterByStudent],x(d.value))}),(e,r)=>u(b)?(P(),R("div",Ue,[N("div",We,[f(u(Ge),{class:"me-auto"},{default:k(()=>[f(u(I),{focusable:!1,type:y.value==="warningLogs"?"primary":"default",secondary:y.value==="warningLogs",onClick:r[0]||(r[0]=l=>y.value="warningLogs"),size:"small"},{default:k(()=>[...r[2]||(r[2]=[_(" Warning Logs ",-1)])]),_:1},8,["type","secondary"]),f(u(I),{focusable:!1,type:y.value==="lockedStudents"?"primary":"default",secondary:y.value==="lockedStudents",onClick:r[1]||(r[1]=l=>y.value="lockedStudents"),size:"small"},{default:k(()=>[f(u(Ve),{value:M.value.length,offset:[10,-8]},{default:k(()=>[...r[3]||(r[3]=[_(" Locked Students ",-1)])]),_:1},8,["value"])]),_:1},8,["type","secondary"])]),_:1})]),y.value==="warningLogs"?(P(),R("div",He,[f(u(ee),{columns:E,data:u(L),pagination:{pageSize:10},"single-line":!1,"scroll-x":u(L).length?900:void 0,loading:u(B)},{empty:k(()=>[f(u(Z),{class:"m-auto",description:"There are currently no warning logs."})]),_:1},8,["data","scroll-x","loading"])])):Q("",!0),y.value==="lockedStudents"?(P(),R("div",Xe,[f(u(ee),{columns:V,data:M.value,pagination:{pageSize:10},"single-line":!1,"scroll-x":M.value.length?900:void 0,loading:u(B)},{empty:k(()=>[f(u(Z),{class:"m-auto",description:"There are currently no locked students."})]),_:1},8,["data","scroll-x","loading"])])):Q("",!0)])):(P(),R(Re,{key:0},[_("Nothing")],64))}});export{lr as default};
