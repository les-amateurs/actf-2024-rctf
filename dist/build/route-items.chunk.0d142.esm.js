(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{BFHi:function(e,t,r){"use strict";(function(e){function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e}).apply(this,arguments)}var o=r("C+Gs"),n=r("+mXV"),a=(r("hdRk"),r("ucLl")),c=(r("LMLH"),r("CoLn")),s=r("J89/"),d=r("ykor");const l={A:t=>e("a",i({},t,{target:"_blank"}))};t.a=Object(o.a)({frame:{marginBottom:"1em",paddingBottom:"0.625em",background:"#222"},description:{"& a":{display:"inline",padding:0},"& p":{lineHeight:"1.4em",fontSize:"1em",marginTop:0},"& pre":{whiteSpace:"pre-wrap"}},divider:{margin:"0.625em",width:"80%"},points:{marginTop:"0.75rem !important",marginBottom:"0 !important",display:"inline-block",transition:"opacity ease-in-out 0.2s",fontWeight:700,color:"rgb(240,61,77)"},solvesPending:{opacity:"0.6",pointerEvents:"none",cursor:"default"},tag:{background:"#111"},input:{background:"#111",color:"#fff !important"},submit:{background:"#111",color:"#fff","&:hover":{background:"#222"}},preview:{fontSize:"1.5rem !important",marginTop:"0.5rem"},previewImage:{aspectRatio:"16 / 9"}},({classes:t,item:r,owned:i,equipped:o,setItemStatus:u})=>{const{toast:p}=Object(a.b)(),[b,m]=Object(n.j)(void 0),f=Object(n.g)(()=>{switch((async()=>{switch(r.type){case"font":Object(d.a)(r.id,r.resourceUrl)}})(),r.type){case"font":return()=>e("p",{style:{fontFamily:"font-"+r.id},class:""+t.preview},"This is how text will look on your profile");case"background":return()=>e("img",{src:r.resourceUrl,class:`${t.preview} ${t.previewImage}`})}},[r]),y=Object(n.a)(e=>{e.preventDefault(),i?i&&o?Object(s.b)(r.id).then(({error:e})=>{void 0===e?(p({body:"Item Successfully unequipped!"}),u(r.id,"UNEQUIP")):p({body:e,type:"error"})}):Object(s.b)(r.id).then(({error:e})=>{void 0===e?(p({body:"Item Successfully equipped!"}),u(r.id,"EQUIP")):p({body:e,type:"error"})}):Object(s.a)(r.id).then(({error:e})=>{void 0===e?(p({body:"Item successfuly bought!"}),u(r.id,"BUY")):p({body:e,type:"error"})})},[p,u,i,o]);return e("div",{class:"frame "+t.frame},e("div",{class:"frame__body"},e("div",{class:"row u-no-padding"},e("div",{class:"col-6 u-no-padding"},e("div",{class:"frame__title title"},r.name),e("div",{class:"frame__subtitle u-no-margin"},r.type)),e("div",{class:"col-6 u-no-padding u-text-right"},e("div",{class:""+t.points},r.price," chips"))),e("div",{class:"content-no-padding u-center"},e("div",{class:"divider "+t.divider})),e("div",{class:t.description+" frame__subtitle"},e(c.a,{content:r.description,components:l}),e("h6",null,"Preview"),f&&e(f,null)),e("button",{class:"form-group-btn btn-small "+t.submit,onClick:y},i?o?"UNEQUIP":"EQUIP":"BUY")))})}).call(this,r("sL3o").h)},"J89/":function(e,t,r){"use strict";r.d(t,"c",(function(){return n})),r.d(t,"d",(function(){return a})),r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return s}));var i=r("vgrf"),o=r("O1lG");const n=async()=>{const e=await Object(i.b)("GET","/items");return Object(i.a)({resp:e,valid:["goodItems"]})},a=async()=>{const{data:e,error:t}=await Object(o.c)();return t?{error:t}:{data:{equipped:Object.values(e.equippedItems).map(e=>e.id),items:e.items}}},c=async e=>{const t=await Object(i.b)("POST",`/items/${encodeURIComponent(e)}/buy`);return Object(i.a)({resp:t,valid:["goodPurchase"]})},s=async e=>{const t=await Object(i.b)("PUT",`/items/${encodeURIComponent(e)}/equip`);return Object(i.a)({resp:t,valid:["goodEquip"]})}},Scjv:function(e,t,r){"use strict";r.r(t),function(e){function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var a=r("+mXV"),c=r("obyI"),s=r("C+Gs"),d=(r("bQ6K"),r("pEbl"),r("ucLl")),l=r("J89/"),u=r("BFHi");t.default=Object(s.a)({showSolved:{marginBottom:"0.625em"},frame:{marginBottom:"1em",paddingBottom:"0.625em",background:"#222"},row:{justifyContent:"center","& .title, & .frame__subtitle":{color:"#fff"}},equipped:{listStyleType:"none"}},({classes:t})=>{const[r,i]=Object(a.j)([]),n=Object(a.g)(()=>{let e={};for(const t of r)e[t.id]=t;return e},[r]),[s,p]=Object(a.j)({items:[],equipped:[]}),{toast:b}=Object(d.b)();Object(a.d)(()=>{document.title="Items | "+c.a.ctfName},[]),Object(a.d)(()=>{(async()=>{if(0!==r.length)return;const{data:e,error:t}=await Object(l.c)();t?b({body:t,type:"error"}):i(e)})()},[b]),Object(a.d)(()=>{(async()=>{const{data:e,error:t}=await Object(l.d)();t?b({body:t,type:"error"}):p(e)})()},[b]);const m=Object(a.a)((e,t)=>{switch(t){case"BUY":p(o(o({},s),{},{items:[...s.items,e]}));break;case"EQUIP":{const t=n[e].type;p(o(o({},s),{},{equipped:[...s.equipped.filter(e=>e.type!==t),e]}))}break;case"UNEQUIP":p(o(o({},s),{},{equipped:[...s.equipped.filter(t=>t!==e)]}))}},[n,s]);return e("div",{class:"row "+t.row},e("div",{class:"col-3"},e("div",{class:"frame "+t.frame},e("div",{class:"frame__body"},e("div",{class:"frame__title title"},"Filters"))),e("div",{class:"frame "+t.frame},e("div",{class:"frame__body"},e("div",{class:"frame__title title"},"Equipped"),e("ul",{class:""+t.equipped},s.equipped.map(t=>e("li",{key:n[t].type},e("b",null,n[t].type,": "),n[t].name)))))),e("div",{class:"col-6"},r.map(t=>e(u.a,{key:t.id,item:t,owned:s.items.includes(t.id),equipped:s.equipped.includes(t.id),setItemStatus:m}))))})}.call(this,r("sL3o").h)},ykor:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));const i=async(e,t)=>{let r=!1,i=document.fonts.values(),o=null;for(;!(o=i.next()).done;)o.value.family==="font-"+e&&(r=!0);if(!r){console.log("Loading font "+t);const r=new FontFace("font-"+e,`url(${t})`);document.fonts.add(await r.load())}}}}]);