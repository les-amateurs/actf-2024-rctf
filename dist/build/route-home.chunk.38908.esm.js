(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"4x8c":function(t,e,r){function n(t,e,r){var n=e.split("."),o=t.__lsc||(t.__lsc={});return o[e+r]||(o[e+r]=function(e){for(var o=e&&e.target||this,a={},s=a,i="string"==typeof r?function(t,e,r,n){for(n=0,e=e.split?e.split("."):e;t&&n<e.length;)t=t[e[n++]];return void 0===t?r:t}(e,r):o.nodeName?o.type.match(/^che|rad/)?o.checked:o.value:e,c=0;c<n.length-1;c++)s=s[n[c]]||(s[n[c]]=!c&&t.state[n[c]]||{});s[n[c]]=i,t.setState(a)})}r("sL3o").Component.prototype.linkState=function(t,e){return n(this,t,e)},t.exports=n},"810C":function(t,e,r){"use strict";(function(t){var n=r("obyI"),o=r("C+Gs"),a=r("+mXV"),s=r("JltG");const i=Object(o.a)({card:{background:"#222",margin:"auto"},section:{display:"inline"},content:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",columnGap:"20px",margin:"20px 40px",textAlign:"center"},time:{fontSize:"40px"},absolute:{gridColumn:"span 4",fontSize:"15px",color:"#bbb"},sub:{gridColumn:"span 4",marginTop:"10px",fontSize:"20px"},over:{margin:"20px 40px",fontSize:"20px",textAlign:"center"}},({classes:e})=>{const[r,o]=Object(a.j)(Date.now());if(Object(a.d)(()=>{const t=setInterval(()=>o(Date.now()),1e3);return()=>clearInterval(t)},[]),r>n.a.endTime)return t("div",{class:"row"},t("div",{class:"card "+e.card},t("div",{class:e.over},"The CTF is over.")));const i=r>n.a.startTime,c=i?n.a.endTime:n.a.startTime,l=c-r,p=Math.floor(l/864e5),u=Math.floor(l/36e5)%24,m=Math.floor(l/6e4)%60,f=Math.floor(l/1e3)%60;return t("div",{class:"row"},t("div",{class:"card "+e.card},t("div",{class:e.content},t("span",{class:e.time},p),t("span",{class:e.time},u),t("span",{class:e.time},m),t("span",{class:e.time},f),t("span",null,"Days"),t("span",null,"Hours"),t("span",null,"Minutes"),t("span",null,"Seconds"),t("span",{class:e.sub},"until ",n.a.ctfName," ",i?"ends":"starts"),t("span",{class:e.absolute},Object(s.a)(c)))))});e.a=i}).call(this,r("sL3o").h)},BHE3:function(t,e){"use strict";function r(t){return t.replace(RegExp("^"+(t.match(/^(\t| )+/)||"")[0],"gm"),"")}function n(t){return(t+"").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var o={"":["<em>","</em>"],_:["<strong>","</strong>"],"\n":["<br />"]," ":["<br />"],"-":["<hr />"]};e.a=function t(e){function a(t){var e=o[t.replace(/\*/g,"_")[1]||""],r=f[f.length-1]==t;return e?e[1]?(f[r?"pop":"push"](t),e[0|r]):e[0]:t}function s(){for(var t="";f.length;)t+=a(f[f.length-1]);return t}var i,c,l,p,u,m=/((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^```(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,3})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*])/gm,f=[],d="",h=0,g={};for(e=e.replace(/^\[(.+?)\]:\s*(.+)$/gm,(function(t,e,r){return g[e.toLowerCase()]=r,""})).replace(/^\n+|\n+$/g,"");l=m.exec(e);)c=e.substring(h,l.index),h=m.lastIndex,i=l[0],c.match(/[^\\](\\\\)*\\$/)||(l[3]||l[4]?i='<pre class="code '+(l[4]?"poetry":l[2].toLowerCase())+'">'+r(n(l[3]||l[4]).replace(/^\n+|\n+$/g,""))+"</pre>":l[6]?((u=l[6]).match(/\./)&&(l[5]=l[5].replace(/^\d+/gm,"")),p=t(r(l[5].replace(/^\s*[>*+.-]/gm,""))),">"===u?u="blockquote":(u=u.match(/\./)?"ol":"ul",p=p.replace(/^(.*)(\n|$)/gm,"<li>$1</li>")),i="<"+u+">"+p+"</"+u+">"):l[8]?i='<img src="'+n(l[8])+'" alt="'+n(l[7])+'">':l[10]?(d=d.replace("<a>",'<a href="'+n(l[11]||g[c.toLowerCase()])+'">'),i=s()+"</a>"):l[9]?i="<a>":l[12]||l[14]?i="<"+(u="h"+(l[14]?l[14].length:"="===l[13][0]?1:2))+">"+t(l[12]||l[15])+"</"+u+">":l[16]?i="<code>"+n(l[16])+"</code>":(l[17]||l[1])&&(i=a(l[17]||"--"))),d+=c,d+=i;return(d+e.substring(h)+s()).trim()}},CoLn:function(t,e,r){"use strict";(function(t){function n(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var s=r("BHE3"),i=r("y713"),c=r("810C"),l=r("ZUSA"),p=r("ngDR");e.a=({content:e,components:r})=>{return t(i.a,{type:"html",trim:!1,markup:(n=e,n.split(/(?:\r?\n){2,}/).map(t=>[" ","\t","#","-","*"].some(e=>t.startsWith(e))?Object(s.a)(t):`<p>${Object(s.a)(t)}</p>`).join("\n\n")),components:o({Timer:c.a,Sponsors:l.a,ActionButton:p.a},r)});var n}}).call(this,r("sL3o").h)},JltG:function(t,e,r){"use strict";r.d(e,"a",(function(){return o})),r.d(e,"b",(function(){return a}));const n=t=>{const e=new Date(t);return`${e.toLocaleDateString()} ${e.toLocaleTimeString()}`},o=t=>{const e=new Date(t).getTimezoneOffset(),r=String(Math.floor(Math.abs(e)/60)).padStart(2,"0"),o=String(Math.abs(e)%60).padStart(2,"0"),a=e>0?"-":"+";return`${n(t)} UTC${a}${r}:${o}`},a=t=>{const e=Date.now()-t,r=Math.floor(e/1e3);if(r<60)return"just now";const o=Math.floor(r/60);if(o<60)return`${o} minute${1===o?"":"s"} ago`;const a=Math.floor(o/60);if(a<24)return`${a} hour${1===a?"":"s"} ago`;const s=Math.floor(a/24);return s<7?`${s} day${1===s?"":"s"} ago`:n(t)}},Yu8N:function(t,e,r){"use strict";r.r(e),function(t){var n=r("sL3o"),o=r("obyI"),a=(r("4x8c"),r("CoLn")),s=r("C+Gs");e.default=Object(s.a)({content:{"& a":{display:"inline",padding:"0"},"& h1, & h2, & h3":{margin:"32px 0 16px 0"}}},class extends n.Component{componentDidMount(){document.title=o.a.ctfName}render({classes:e}){return t("div",{class:"row u-center"},t("div",{class:"col-6 "+e.content},t(a.a,{content:o.a.homeContent})))}})}.call(this,r("sL3o").h)},ZUSA:function(t,e,r){"use strict";(function(t){var n=r("obyI"),o=(r("4x8c"),r("CoLn")),a=r("C+Gs");e.a=Object(a.a)({icon:{padding:"10px",margin:"20px 0",background:"#fff",borderRadius:"10px","& img":{height:"6.250em",width:"auto"}},description:{"& a":{display:"inline",padding:"0"}},row:{marginBottom:"1.5em"},card:{background:"#222"}},({classes:e})=>{const{sponsors:r}=n.a;return t("div",{class:"row"},r.map(r=>{let n="card "+e.card;return r.small||(n+=" u-flex u-flex-column h-100"),t("div",{class:"col-6 "+e.row,key:r.name},t("div",{class:n},t("div",{class:"content"},r.icon&&t("figure",{class:"u-center "+e.icon},t("img",{src:r.icon})),t("p",{class:"title level"},r.name),t("small",{class:e.description},t(o.a,{content:r.description})))))}))})}).call(this,r("sL3o").h)},ngDR:function(t,e,r){"use strict";(function(t){function n(){return(n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function o(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},a=Object.keys(t);for(n=0;n<a.length;n++)e.indexOf(r=a[n])>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(n=0;n<a.length;n++)e.indexOf(r=a[n])>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}var a=r("C+Gs");const s=Object(a.a)({button:{padding:"16px !important",color:"#fff",background:"#222",boxShadow:"rgba(250,250,250,0.6) 0px 0px 1rem 0px",fontSize:"20px",borderRadius:"1rem",textAlign:"center",transition:"box-shadow ease-in-out 0.2s, transform ease-in-out 0.2s",margin:"20px auto","&:hover":{boxShadow:"rgba(250,250,250,0.6) 0px 0px 1.1rem 0px",transform:"scale(1.1)",color:"#fff"},"& svg":{height:"1em",position:"relative",top:"0.125em"}}},e=>{let{classes:r}=e,a=o(e,["classes"]);return t("div",{class:"row u-center"},t("a",n({class:r.button},a)))});e.a=s}).call(this,r("sL3o").h)},y713:function(t,e,r){"use strict";function n(t,e,r){if(3===t.nodeType){var o="textContent"in t?t.textContent:t.nodeValue||"";if(!1!==n.options.trim){var a=0===e||e===r.length-1;if((!(o=o.match(/^[\s\n]+$/g)&&"all"!==n.options.trim?" ":o.replace(/(^[\s\n]+|[\s\n]+$)/g,"all"===n.options.trim||a?"":" "))||" "===o)&&r.length>1&&a)return null}return o}if(1!==t.nodeType)return null;var s=String(t.nodeName).toLowerCase();if("script"===s&&!n.options.allowScripts)return null;var i,c,p=n.h(s,function(t){var e=t&&t.length;if(!e)return null;for(var r={},o=0;o<e;o++){var a=t[o],s=a.name,i=a.value;""===i&&(i=!0),"on"===s.substring(0,2)&&n.options.allowEvents&&(i=new Function(i)),r[s]=i}return r}(t.attributes),(c=(i=t.childNodes)&&Array.prototype.map.call(i,n).filter(l))&&c.length?c:null);return n.visitor&&n.visitor(p),p}function o(t){var e=(t.type||"").toLowerCase(),r=o.map;r&&r.hasOwnProperty(e)?(t.type=r[e],t.props=Object.keys(t.props||{}).reduce((function(e,r){var n;return e[(n=r,n.replace(/-(.)/g,(function(t,e){return e.toUpperCase()})))]=t.props[r],e}),{})):t.type=e.replace(/[^a-z0-9-]/i,"")}var a,s,i=r("sL3o"),c={},l=function(t){return t},p={};e.a=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.setReviver=function(t){s=t},e.prototype.shouldComponentUpdate=function(t){var e=this.props;return t.wrap!==e.wrap||t.type!==e.type||t.markup!==e.markup},e.prototype.setComponents=function(t){if(this.map={},t)for(var e in t)if(t.hasOwnProperty(e)){var r=e.replace(/([A-Z]+)([A-Z][a-z0-9])|([a-z0-9]+)([A-Z])/g,"$1$3-$2$4").toLowerCase();this.map[r]=t[e]}},e.prototype.render=function(t){var e=t.wrap;void 0===e&&(e=!0);var r,l=t.type,u=t.markup,m=t.components,f=t.reviver,d=t.onError,h=t["allow-scripts"],g=t["allow-events"],v=t.trim,b=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&-1===e.indexOf(n)&&(r[n]=t[n]);return r}(t,["wrap","type","markup","components","reviver","onError","allow-scripts","allow-events","trim"]),y=f||this.reviver||this.constructor.prototype.reviver||s||i.h;this.setComponents(m);var w={allowScripts:h,allowEvents:g,trim:v};try{r=function(t,e,r,s,i){var l=function(t,e){var r,n,o,s,i="html"===e?"text/html":"application/xml";"html"===e?(s="body",o="<!DOCTYPE html>\n<html><body>"+t+"</body></html>"):(s="xml",o='<?xml version="1.0" encoding="UTF-8"?>\n<xml>'+t+"</xml>");try{r=(new DOMParser).parseFromString(o,i)}catch(t){n=t}if(r||"html"!==e||((r=a||(a=function(){if(document.implementation&&document.implementation.createHTMLDocument)return document.implementation.createHTMLDocument("");var t=document.createElement("iframe");return t.style.cssText="position:absolute; left:0; top:-999em; width:1px; height:1px; overflow:hidden;",t.setAttribute("sandbox","allow-forms"),document.body.appendChild(t),t.contentWindow.document}())).open(),r.write(o),r.close()),r){var c=r.getElementsByTagName(s)[0],l=c.firstChild;return t&&!l&&(c.error="Document parse failed."),l&&"parsererror"===String(l.nodeName).toLowerCase()&&(l.removeChild(l.firstChild),l.removeChild(l.lastChild),c.error=l.textContent||l.nodeValue||n||"Unknown error",c.removeChild(l)),c}}(t,e);if(l&&l.error)throw new Error(l.error);var u=l&&l.body||l;o.map=s||p;var m=u&&function(t,e,r,o){return n.visitor=e,n.h=r,n.options=o||c,n(t)}(u,o,r,i);return o.map=null,m&&m.props&&m.props.children||null}(u,l,y,this.map,w)}catch(t){d?d({error:t}):"undefined"!=typeof console&&console.error&&console.error("preact-markup: "+t)}if(!1===e)return r&&r[0]||null;var x=b.hasOwnProperty("className")?"className":"class",O=b[x];return O?O.splice?O.splice(0,0,"markup"):"string"==typeof O?b[x]+=" markup":"object"==typeof O&&(O.markup=!0):b[x]="markup",y("div",b,r||null)},e}(i.Component)}}]);