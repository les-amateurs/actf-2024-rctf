(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"4x8c":function(t,e,n){function o(t,e,n){var o=e.split("."),r=t.__lsc||(t.__lsc={});return r[e+n]||(r[e+n]=function(e){for(var r=e&&e.target||this,s={},c=s,a="string"==typeof n?function(t,e,n,o){for(o=0,e=e.split?e.split("."):e;t&&o<e.length;)t=t[e[o++]];return void 0===t?n:t}(e,n):r.nodeName?r.type.match(/^che|rad/)?r.checked:r.value:e,i=0;i<o.length-1;i++)c=c[o[i]]||(c[o[i]]=!i&&t.state[o[i]]||{});c[o[i]]=a,t.setState(s)})}n("sL3o").Component.prototype.linkState=function(t,e){return o(this,t,e)},t.exports=o},bvLL:function(t,e,n){"use strict";n.r(e),function(t){var o=n("sL3o"),r=n("obyI"),s=(n("4x8c"),n("C+Gs"));e.default=Object(s.a)({},class extends o.Component{componentDidMount(){document.title="Error | "+r.a.ctfName}render({error:e,message:n}){return t("div",{class:"row u-text-center u-center"},t("div",{class:"col-4"},t("h1",null,e),t("p",{class:"font-thin"},n||"There was an error")))}})}.call(this,n("sL3o").h)}}]);