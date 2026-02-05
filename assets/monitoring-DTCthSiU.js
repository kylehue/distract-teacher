import{G as j}from"./PhDotsThreeVertical.vue-D232yi4m.js";import{aq as x,au as q,ar as f,as as t,at as O,d as B,D as i,ay as te,bp as fe,bq as oe,aa as he,br as ye,bs as ke,bt as xe,az as le,bu as Ce,x as G,aH as F,aJ as Le,e as I,g as y,f as u,w as k,k as N,y as $e,h as L,B as M,i as w,a5 as Y,aD as K,A as Se,a3 as Pe,a as Ne,b as Ie,Q as Me,v as E,X as ze,V as Te,M as we,aX as Be,r as U,j as R,b0 as T,bv as _e,E as W,L as H,ac as J,R as D,bn as X,o as Ee,c as A,F as Re,z as Q,H as Z}from"./index-CHNzro-_.js";import{N as Ae}from"./Select-D40Kgl2R.js";import{N as Oe}from"./Badge-CaSc8rpg.js";import{N as ee}from"./DataTable-BNQYGWDL.js";import"./attribute-Cz32yFEB.js";const n="0!important",ne="-1px!important";function S(o){return f(`${o}-type`,[t("& +",[x("button",{},[f(`${o}-type`,[O("border",{borderLeftWidth:n}),O("state-border",{left:ne})])])])])}function P(o){return f(`${o}-type`,[t("& +",[x("button",[f(`${o}-type`,[O("border",{borderTopWidth:n}),O("state-border",{top:ne})])])])])}const Ve=x("button-group",`
 flex-wrap: nowrap;
 display: inline-flex;
 position: relative;
`,[q("vertical",{flexDirection:"row"},[q("rtl",[x("button",[t("&:first-child:not(:last-child)",`
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
 `),S("default"),f("ghost",[S("primary"),S("info"),S("success"),S("warning"),S("error")])])])]),f("vertical",{flexDirection:"column"},[x("button",[t("&:first-child:not(:last-child)",`
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
 `),P("default"),f("ghost",[P("primary"),P("info"),P("success"),P("warning"),P("error")])])])]),Fe={size:{type:String,default:void 0},vertical:Boolean},De=B({name:"ButtonGroup",props:Fe,setup(o){const{mergedClsPrefixRef:a,mergedRtlRef:c}=te(o);return fe("-button-group",Ve,a),he(ye,o),{rtlEnabled:oe("ButtonGroup",c,a),mergedClsPrefix:a}},render(){const{mergedClsPrefix:o}=this;return i("div",{class:[`${o}-button-group`,this.rtlEnabled&&`${o}-button-group--rtl`,this.vertical&&`${o}-button-group--vertical`],role:"group"},this.$slots)}}),qe=t([x("table",`
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
 `)]),f("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `,[t("tr",[t("&:last-child",[t("td",`
 border-bottom: 0 solid var(--n-merged-border-color);
 `)])])]),f("single-line",[t("th",`
 border-right: 0px solid var(--n-merged-border-color);
 `),t("td",`
 border-right: 0px solid var(--n-merged-border-color);
 `)]),f("single-column",[t("tr",[t("&:not(:last-child)",[t("td",`
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])]),f("striped",[t("tr:nth-of-type(even)",[t("td","background-color: var(--n-td-color-striped)")])]),q("bottom-bordered",[t("tr",[t("&:last-child",[t("td",`
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])])]),ke(x("table",`
 background-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `,[t("th",`
 background-color: var(--n-th-color-modal);
 `),t("td",`
 background-color: var(--n-td-color-modal);
 `)])),xe(x("table",`
 background-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `,[t("th",`
 background-color: var(--n-th-color-popover);
 `),t("td",`
 background-color: var(--n-td-color-popover);
 `)]))]),Ge=Object.assign(Object.assign({},le.props),{bordered:{type:Boolean,default:!0},bottomBordered:{type:Boolean,default:!0},singleLine:{type:Boolean,default:!0},striped:Boolean,singleColumn:Boolean,size:{type:String,default:"medium"}}),Ye=B({name:"Table",props:Ge,setup(o){const{mergedClsPrefixRef:a,inlineThemeDisabled:c,mergedRtlRef:g}=te(o),s=le("Table","-table",qe,Ce,o,a),p=oe("Table",g,a),v=G(()=>{const{size:$}=o,{self:{borderColor:m,tdColor:h,tdColorModal:_,tdColorPopover:V,thColor:z,thColorModal:C,thColorPopover:e,thTextColor:r,tdTextColor:l,borderRadius:b,thFontWeight:ae,lineHeight:ie,borderColorModal:se,borderColorPopover:de,tdColorStriped:ue,tdColorStripedModal:ce,tdColorStripedPopover:me,[F("fontSize",$)]:ge,[F("tdPadding",$)]:pe,[F("thPadding",$)]:be},common:{cubicBezierEaseInOut:ve}}=s.value;return{"--n-bezier":ve,"--n-td-color":h,"--n-td-color-modal":_,"--n-td-color-popover":V,"--n-td-text-color":l,"--n-border-color":m,"--n-border-color-modal":se,"--n-border-color-popover":de,"--n-border-radius":b,"--n-font-size":ge,"--n-th-color":z,"--n-th-color-modal":C,"--n-th-color-popover":e,"--n-th-font-weight":ae,"--n-th-text-color":r,"--n-line-height":ie,"--n-td-padding":pe,"--n-th-padding":be,"--n-td-color-striped":ue,"--n-td-color-striped-modal":ce,"--n-td-color-striped-popover":me}}),d=c?Le("table",G(()=>o.size[0]),v,o):void 0;return{rtlEnabled:p,mergedClsPrefix:a,cssVars:c?void 0:v,themeClass:d==null?void 0:d.themeClass,onRender:d==null?void 0:d.onRender}},render(){var o;const{mergedClsPrefix:a}=this;return(o=this.onRender)===null||o===void 0||o.call(this),i("table",{class:[`${a}-table`,this.themeClass,{[`${a}-table--rtl`]:this.rtlEnabled,[`${a}-table--bottom-bordered`]:this.bottomBordered,[`${a}-table--bordered`]:this.bordered,[`${a}-table--single-line`]:this.singleLine,[`${a}-table--single-column`]:this.singleColumn,[`${a}-table--striped`]:this.striped}],style:this.cssVars},this.$slots)}}),je={class:"flex gap-2 justify-around"},Ke=B({__name:"filter-menu",emits:["confirm","clear"],setup(o,{emit:a}){const c=a;return(g,s)=>(y(),I(u(Ye),{bordered:!1,"single-line":!1,class:"rounded!"},{default:k(()=>[N("tbody",null,[N("tr",null,[N("td",null,[$e(g.$slots,"default")])]),N("tr",null,[N("td",je,[L(u(M),{size:"tiny",onClick:s[0]||(s[0]=p=>c("clear"))},{default:k(()=>[...s[2]||(s[2]=[w("Clear",-1)])]),_:1}),L(u(M),{size:"tiny",type:"primary",onClick:s[1]||(s[1]=p=>c("confirm"))},{default:k(()=>[...s[3]||(s[3]=[w(" Confirm ",-1)])]),_:1})])])])]),_:3}))}}),re=B({inheritAttrs:!1,__name:"filter-menu-multiselect",props:{value:{}},emits:["confirm","clear","update:value"],setup(o,{emit:a}){const c=o,g=Y(c.value??[]),s=a;return K(g,p=>{s("update:value",p)}),K(()=>c.value,p=>{p&&(g.value=p)}),(p,v)=>(y(),I(Ke,{onClear:v[1]||(v[1]=d=>s("clear")),onConfirm:v[2]||(v[2]=d=>s("confirm",g.value))},{default:k(()=>[L(u(Ae),Se(p.$attrs,{multiple:"",filterable:"",consistentMenuWidth:!1,value:g.value,"onUpdate:value":v[0]||(v[0]=d=>g.value=d)}),null,16,["value"])]),_:1}))}}),Ue={key:1,class:"flex flex-col w-full h-full gap-4"},We={class:"flex items-center justify-end gap-2"},He={key:0,class:"flex flex-col w-full h-full overflow-hidden"},Je={key:1,class:"flex flex-col w-full h-full overflow-hidden"},or=B({__name:"monitoring",setup(o){const a=Pe(),c=Ne(),g=Ie("/api/students/:studentId/unlock","PATCH"),s=Y([]),p=Me(),v=E(ze),d=E(Te),$=E(we),m=E(Be),h=Y("warningLogs"),_=[U({title:"Student Name",key:"studentName",render(e){let r=d.value.get(e.studentId);return i("div",{class:"flex flex-wrap items-center gap-1"},[i(R,null,{default:()=>(r==null?void 0:r.name)||"<Unnamed>"}),r!=null&&r.active?"":i(T,{type:"default",round:!0,size:"small"},{default:()=>"Inactive"}),r!=null&&r.permitted?"":i(T,{type:"warning",round:!0,size:"small"},{default:()=>"Needs Approval"})])},filterMultiple:!0,renderFilterMenu({hide:e}){return i(re,{class:"w-[200px]!",placeholder:"Filter students",placement:"right-start",options:Array.from(d.value.values()).map(r=>({label:r.name,value:r.id})),value:s.value,onConfirm(r){C(r),e()},onClear(){C([]),e()}})},filter(e,r){return e===r.studentId},sorter:{compare(e,r){const l=d.value.get(e.studentId),b=d.value.get(r.studentId);return!l||!b?0:l.name.localeCompare(b.name)},multiple:1}}),{title:"Integrity Score",key:"integrityScore",render(e){return(e.integrityScore*100).toFixed(2)+"%"},sorter:{compare(e,r){return e.integrityScore-r.integrityScore},multiple:3}},{title:"Warning Level",key:"warningLevel",render(e){return i(T,{type:_e(e.warningLevel),round:!0},{default:()=>e.warningLevel})},filterOptions:[{label:"Low",value:"low"},{label:"Moderate",value:"moderate"},{label:"Severe",value:"severe"}],filterMultiple:!0,filter(e,r){return r.warningLevel===e},sorter:{compare(e,r){const l={none:0,low:1,moderate:2,severe:3};return l[e.warningLevel]-l[r.warningLevel]},multiple:3}},{title:"Phone Detected",key:"isPhonePresent",width:200,render(e){return i(R,{type:e.isPhonePresent?"error":void 0},{default:()=>e.isPhonePresent?"Yes":"No"})},filterOptions:[{label:"Yes",value:"true"},{label:"No",value:"false"}],filterMultiple:!0,filter(e,r){return String(r.isPhonePresent)===e},sorter:{compare(e,r){return Number(e.isPhonePresent)-Number(r.isPhonePresent)},multiple:4}},{title:"Time",key:"time",render(e){return H(e.createdAt,!1,!0)},sorter:{compare(e,r){return W(e.createdAt,r.createdAt)},multiple:2},defaultSortOrder:"descend"},{title:"",key:"actions",width:50,align:"center",fixed:"right",render(e){return i(X,{options:[{value:"evidence",label:"View Evidence",render({node:r}){return i(D,{to:{query:{monitorLogId:e.id}}},()=>r)}},{value:"reports",label:"View Reports",render({node:r}){return i(D,{to:`/dashboard/student-reports/${e.studentId}`},()=>r)}}],trigger:"click"},{default:()=>i(M,{size:"small",circle:!0,quaternary:!0},{default:J(j)})})}}],V=[U({title:"Student Name",key:"studentName",render(e){return i("div",{class:"flex flex-wrap items-center gap-1"},[i(R,null,{default:()=>(e==null?void 0:e.name)||"<Unnamed>"}),e!=null&&e.active?"":i(T,{type:"default",round:!0,size:"small"},{default:()=>"Inactive"}),e!=null&&e.permitted?"":i(T,{type:"warning",round:!0,size:"small"},{default:()=>"Needs Approval"})])},filterMultiple:!0,renderFilterMenu({hide:e}){return i(re,{class:"w-[200px]!",placeholder:"Filter students",placement:"right-start",options:Array.from(d.value.values()).map(r=>({label:r.name,value:r.id})),value:s.value,onConfirm(r){C(r),e()},onClear(){C([]),e()}})},filter(e,r){return e===r.id},sorter:{compare(e,r){return e.name.localeCompare(r.name)},multiple:1}}),{title:"Evidence Integrity Score",key:"integrityScore",render(e){return(m.value.get(e.lockMonitorLogId).integrityScore*100).toFixed(2)+"%"},sorter:{compare(e,r){let l=m.value.get(e.lockMonitorLogId),b=m.value.get(r.lockMonitorLogId);return l.integrityScore-b.integrityScore},multiple:3}},{title:"Phone Detected",key:"isPhonePresent",render(e){let r=m.value.get(e.lockMonitorLogId);return i(R,{type:r.isPhonePresent?"error":void 0},{default:()=>r.isPhonePresent?"Yes":"No"})},filterOptions:[{label:"Yes",value:"true"},{label:"No",value:"false"}],filterMultiple:!0,filter(e,r){let l=m.value.get(r.lockMonitorLogId);return String(l.isPhonePresent)===e},sorter:{compare(e,r){let l=m.value.get(e.lockMonitorLogId),b=m.value.get(r.lockMonitorLogId);return Number(l.isPhonePresent)-Number(b.isPhonePresent)},multiple:4}},{title:"Time Locked",key:"time",render(e){let r=m.value.get(e.lockMonitorLogId);return H(r.createdAt,!1,!0)},sorter:{compare(e,r){let l=m.value.get(e.lockMonitorLogId),b=m.value.get(r.lockMonitorLogId);return W(l.createdAt,b.createdAt)},multiple:2},defaultSortOrder:"descend"},{title:"",key:"actions",width:50,align:"center",fixed:"right",render(e){let r=m.value.get(e.lockMonitorLogId);return i(X,{options:[{value:"evidence",label:"View Lock Evidence",render({node:l}){return i(D,{to:{query:{monitorLogId:r.id}}},()=>l)}},{value:"close",label:"Close Case",style:{color:p.value.errorColor}}],trigger:"click",async onUpdateValue(l){if(l==="close")try{await g.execute({params:{studentId:e.id}}),c.success(`Cheating case for ${e.name} has been closed.`)}catch(b){console.error(b),c.error("Something went wrong while closing the case.")}}},{default:()=>i(M,{size:"small",circle:!0,quaternary:!0},{default:J(j)})})}}],z=G(()=>Array.from(d.value.values()).filter(e=>e.permitted&&!!e.lockMonitorLogId));function C(e){const r=_.find(l=>l.key==="studentName");s.value=e,r.filterOptionValues=e}return Ee(()=>{a.query.filterByStudent&&(s.value=[a.query.filterByStudent],C(s.value))}),(e,r)=>u(v)?(y(),A("div",Ue,[N("div",We,[L(u(De),{class:"me-auto"},{default:k(()=>[L(u(M),{focusable:!1,type:h.value==="warningLogs"?"primary":"default",secondary:h.value==="warningLogs",onClick:r[0]||(r[0]=l=>h.value="warningLogs"),size:"small"},{default:k(()=>[...r[2]||(r[2]=[w(" Warning Logs ",-1)])]),_:1},8,["type","secondary"]),L(u(M),{focusable:!1,type:h.value==="lockedStudents"?"primary":"default",secondary:h.value==="lockedStudents",onClick:r[1]||(r[1]=l=>h.value="lockedStudents"),size:"small"},{default:k(()=>[L(u(Oe),{value:z.value.length,offset:[10,-8]},{default:k(()=>[...r[3]||(r[3]=[w(" Locked Students ",-1)])]),_:1},8,["value"])]),_:1},8,["type","secondary"])]),_:1})]),h.value==="warningLogs"?(y(),A("div",He,[u($).length>0?(y(),I(u(ee),{key:0,columns:_,data:u($),pagination:{pageSize:10},"single-line":!1,"scroll-x":900},null,8,["data"])):(y(),I(u(Z),{key:1,class:"m-auto",description:"There are currently no warning logs."}))])):Q("",!0),h.value==="lockedStudents"?(y(),A("div",Je,[z.value.length>0?(y(),I(u(ee),{key:0,columns:V,data:z.value,pagination:{pageSize:10},"single-line":!1,"scroll-x":900},null,8,["data"])):(y(),I(u(Z),{key:1,class:"m-auto",description:"There are currently no locked students."}))])):Q("",!0)])):(y(),A(Re,{key:0},[w("Nothing")],64))}});export{or as default};
