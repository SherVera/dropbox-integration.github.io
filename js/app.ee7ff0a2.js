(()=>{"use strict";var e={2318:(e,t,r)=>{r(5363),r(71);var o=r(8880),a=r(9592),n=r(3673);function s(e,t,r,o,a,s){const i=(0,n.up)("router-view");return(0,n.wg)(),(0,n.j4)(i)}const i=(0,n.aZ)({name:"App"});var c=r(4260);const l=(0,c.Z)(i,[["render",s]]),u=l;var d=r(7647),p=r(6417),f=r(7083),m=r(9582);const g=[{path:"/",redirect:"/login",component:()=>Promise.all([r.e(736),r.e(477)]).then(r.bind(r,9477)),children:[{name:"dropbox",path:"/dropbox",component:()=>Promise.all([r.e(736),r.e(916)]).then(r.bind(r,1916)),meta:{requiresAuth:!0}}]},{name:"login",path:"/login",component:()=>Promise.all([r.e(736),r.e(31)]).then(r.bind(r,1031)),meta:{requiresAuth:!1}},{name:"callback",path:"/callback",component:()=>Promise.all([r.e(736),r.e(242)]).then(r.bind(r,6242)),meta:{requiresAuth:!1}},{path:"/:catchAll(.*)*",component:()=>Promise.all([r.e(736),r.e(416)]).then(r.bind(r,2416))}],h=g,O=(0,f.BC)((function({store:e}){const t=m.PO,r=(0,m.p7)({scrollBehavior:()=>({left:0,top:0}),routes:h,history:t("/")});return r.beforeEach(((t,r)=>{if(t.meta.requiresAuth&&!e.getters["generals/isLoggedIn"])return p.Z.create({color:"negative",textColor:"white",message:"Debes Iniciar sesion"}),{path:"/login"}})),r}));async function v(e,t){const o="function"===typeof d["default"]?await(0,d["default"])({}):d["default"],{storeKey:n}=await Promise.resolve().then(r.bind(r,7647)),s="function"===typeof O?await O({store:o}):O;o.$router=s;const i=e(u);return i.use(a.Z,t),{app:i,store:o,storeKey:n,router:s}}var b=r(6395),S=r(6920),I=r(8416);const y={config:{},plugins:{Notify:p.Z,LocalStorage:b.Z,Loading:S.Z,AppFullscreen:I.Z}},_="/";async function w({app:e,router:t,store:r,storeKey:o},a){let n=!1;const s=e=>{try{return t.resolve(e).href}catch(r){}return Object(e)===e?null:e},i=e=>{if(n=!0,"string"===typeof e&&/^https?:\/\//.test(e))return void(window.location.href=e);const t=s(e);null!==t&&(window.location.href=t)},c=window.location.href.replace(window.location.origin,"");for(let u=0;!1===n&&u<a.length;u++)try{await a[u]({app:e,router:t,store:r,ssrContext:null,redirect:i,urlPath:c,publicPath:_})}catch(l){return l&&l.url?void i(l.url):void console.error("[Quasar] boot error:",l)}!0!==n&&(e.use(t),e.use(r,o),e.mount("#q-app"))}v(o.ri,y).then((e=>Promise.all([Promise.resolve().then(r.bind(r,9307))]).then((t=>{const r=t.map((e=>e.default)).filter((e=>"function"===typeof e));w(e,r)}))))},9307:(e,t,r)=>{r.r(t),r.d(t,{api:()=>c,default:()=>l});r(2100),r(71);var o=r(52),a=r.n(o),n=r(6417),s=r(7083);const i={apiUrl:"https://pi7wylmyt4.execute-api.us-east-1.amazonaws.com/dev/"},c=a().create({baseURL:i.apiUrl,headers:{"Access-Control-Allow-Origin":"*"},maxRedirects:0}),l=(0,s.xr)((({app:e,store:t})=>{e.config.globalProperties.$axio=a(),e.config.globalProperties.$api=c,c.interceptors.response.use((e=>("get"===e.config.method&&200===e.status&&void 0!==e.data&&void 0!==e.data.access_token&&localStorage.setItem("DROPBOX_SESSION_INFO",JSON.stringify(e.data)),e.data)),(e=>{if(void 0===e.response)n.Z.create({color:"red-5",textColor:"white",icon:"fas fa-exclamation-triangle",message:"No se pudo establecer conexión con el servidor. Revisa tu conexión a internet. "+e});else{if(401===e.response.status)e.response.data.message?n.Z.create({message:e.response.data.message,color:"black"}):n.Z.create({message:"Debe autenticarse para realizar esta acción.",color:"black"}),localStorage.removeItem("DROPBOX_SESSION_INFO");else if(403===e.response.status)n.Z.create({message:e.response.data,color:"red"}),localStorage.removeItem("DROPBOX_SESSION_INFO");else if(404===e.response.status)e.response.data.message?n.Z.create({message:e.response.data.message,color:"black"}):n.Z.create({message:"Ruta no encontrada - 404",color:"black"});else if(422===e.response.status)if(e.response.data.length>0){let t="";for(const r of e.response.data)t+=`${r.message} \n`;n.Z.create({message:t,color:"red",position:"bottom"})}else n.Z.create({message:e.response.data.message,color:"red",position:"bottom"});else 500===e.response.status&&n.Z.create({message:"Error de conexión con el servidor",color:"red",position:"bottom"});let t=e.response.data;t&&(403===t.status&&n.Z.create({color:"red-5",textColor:"white",icon:"fas fa-exclamation-triangle",message:t.error.error_description}),500===t.status&&n.Z.create({color:"red-5",textColor:"white",icon:"fas fa-exclamation-triangle",message:"Error interno en servidor"+t.message}),400===t.status&&n.Z.create({color:"red-5",textColor:"white",icon:"fas fa-exclamation-triangle",message:`${t.name}: ${t.error.error} ${t.error.error_description}`}))}})),c.interceptors.request.use((async function(e){t.dispatch("generals/fetchAccessToken");const r=!!(null!==t.state.generals.DROPBOX_SESSION_INFO|void 0)&&t.state.generals.DROPBOX_SESSION_INFO;return r&&(e.headers||(e.headers={}),e.headers={Authorization:"Bearer "+r}),e.headers.redirect=!0,e}),(function(e){return Promise.reject(e)}))}))},7647:(e,t,r)=>{r.r(t),r.d(t,{default:()=>h});var o={};r.r(o),r.d(o,{isLoggedIn:()=>l});var a={};r.r(a),r.d(a,{login:()=>d,logout:()=>p,updateAccessToken:()=>u});var n={};r.r(n),r.d(n,{fetchAccessToken:()=>f,logout:()=>m});var s=r(7083),i=r(3617);function c(){return{DROPBOX_SESSION_INFO:""}}function l(e){return null!==localStorage.getItem("DROPBOX_SESSION_INFO")}const u=(e,t)=>{e.DROPBOX_SESSION_INFO=t||""},d=(e,t)=>{localStorage.setItem("DROPBOX_SESSION_INFO",t),e.DROPBOX_SESSION_INFO=t},p=e=>{localStorage.removeItem("DROPBOX_SESSION_INFO"),e.DROPBOX_SESSION_INFO=""};function f({commit:e}){const t=localStorage.getItem("DROPBOX_SESSION_INFO");e("updateAccessToken",t)}function m({commit:e}){localStorage.removeItem("DROPBOX_SESSION_INFO"),e("logout")}const g={namespaced:!0,state:c,getters:o,mutations:a,actions:n},h=(0,s.h)((function(){const e=(0,i.MT)({modules:{generals:g},strict:!1});return e}))}},t={};function r(o){var a=t[o];if(void 0!==a)return a.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.m=e,(()=>{var e=[];r.O=(t,o,a,n)=>{if(!o){var s=1/0;for(u=0;u<e.length;u++){for(var[o,a,n]=e[u],i=!0,c=0;c<o.length;c++)(!1&n||s>=n)&&Object.keys(r.O).every((e=>r.O[e](o[c])))?o.splice(c--,1):(i=!1,n<s&&(s=n));if(i){e.splice(u--,1);var l=a();void 0!==l&&(t=l)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[o,a,n]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,o)=>(r.f[o](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+e+"."+{31:"cad08e87",242:"79e45c6e",416:"1046ee5b",477:"3cf6c26e",916:"3eb20f3e"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+{143:"app",736:"vendor"}[e]+"."+{143:"31d6cfe0",736:"5a25314c"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="dropbox-front:";r.l=(o,a,n,s)=>{if(e[o])e[o].push(a);else{var i,c;if(void 0!==n)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var d=l[u];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+n){i=d;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,r.nc&&i.setAttribute("nonce",r.nc),i.setAttribute("data-webpack",t+n),i.src=o),e[o]=[a];var p=(t,r)=>{i.onerror=i.onload=null,clearTimeout(f);var a=e[o];if(delete e[o],i.parentNode&&i.parentNode.removeChild(i),a&&a.forEach((e=>e(r))),t)return t(r)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),c&&document.head.appendChild(i)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.p="/"})(),(()=>{var e={143:0};r.f.j=(t,o)=>{var a=r.o(e,t)?e[t]:void 0;if(0!==a)if(a)o.push(a[2]);else{var n=new Promise(((r,o)=>a=e[t]=[r,o]));o.push(a[2]=n);var s=r.p+r.u(t),i=new Error,c=o=>{if(r.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var n=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.src;i.message="Loading chunk "+t+" failed.\n("+n+": "+s+")",i.name="ChunkLoadError",i.type=n,i.request=s,a[1](i)}};r.l(s,c,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,o)=>{var a,n,[s,i,c]=o,l=0;if(s.some((t=>0!==e[t]))){for(a in i)r.o(i,a)&&(r.m[a]=i[a]);if(c)var u=c(r)}for(t&&t(o);l<s.length;l++)n=s[l],r.o(e,n)&&e[n]&&e[n][0](),e[s[l]]=0;return r.O(u)},o=self["webpackChunkdropbox_front"]=self["webpackChunkdropbox_front"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=r.O(void 0,[736],(()=>r(2318)));o=r.O(o)})();