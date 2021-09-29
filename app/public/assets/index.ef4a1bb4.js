import{d as e,o as t,c as n,a as s,t as r,u as a,b as o,_ as c,e as l,w as i,f as u,g as p,h as d,i as m,j as f,M as h,k as g,l as y,m as v,n as b,p as k,r as _,L as x,K as C,T as w,q as j,s as S,v as q,C as $,x as z,D as G,y as O,F as H,B as L,z as R,A,E,G as N,H as B,I as K,J as D,N as I}from"./vendor.611e93e8.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var M={name:"online-course-script",version:"1.0.0",main:"./app/lib/main.js",scripts:{dev:'cd ./app && tsc && cd .. &&   concurrently vite "ehmr -i app/**/*.js " ',build:"vue-tsc --noEmit && vite build",pack:"cd app  && tsc && npm run pack",dist:"cd app  && tsc && npm run dist",serve:"vite preview","pup:test":"cd ./app && tsc && node lib/test.js"},dependencies:{"@ant-design/icons-vue":"^6.0.1","ant-design-vue":"^2.2.8","electron-log":"^4.4.1","electron-store":"^8.0.1","mark-ui":"^1.1.6","update-electron-app":"^2.0.1",uuid:"^8.3.2",vue:"^3.2.6","vue-router":"^4.0.11"},devDependencies:{"@types/electron":"^1.6.10","@types/node":"^16.9.1","@vitejs/plugin-vue":"^1.6.1","@vitejs/plugin-vue-jsx":"^1.1.8","@vue/cli-plugin-router":"~4.5.0","@vue/compiler-sfc":"^3.2.6",chalk:"^4.1.2",concurrently:"^6.2.1",electron:"^15.0.0","electron-builder":"^22.11.7","electron-hmr":"^1.1.7",less:"^4.1.1","less-loader":"^10.0.1","puppeteer-core":"^10.4.0",typescript:"^4.3.2",vite:"^2.5.4","vite-plugin-components":"^0.13.3","vue-tsc":"^0.2.2"},description:"ocs - 在线网络课程辅助工具",repository:{type:"git",url:"git+https://github.com/enncy/OnlineCourseScript.git"},keywords:["ocs","script","puppeteer","electron","vue3","antdv"],author:"enncy",license:"Apache-2.0",bugs:{url:"https://github.com/enncy/OnlineCourseScript/issues"},homepage:"https://github.com/enncy/OnlineCourseScript#readme"};const U={class:"font-v4 flex nowrap height-24"},F={class:"flex nowrap space-10 jc-flex-start ai-center"},J={class:"flex nowrap space-10 jc-flex-end ai-center"},P={style:{cursor:"pointer"}};var T,W,Q=e({setup:e=>(e,l)=>{const i=c;return t(),n("div",U,[s("div",F,[s("li",null,r(a(M).name)+" - v"+r(a(M).version),1)]),s("div",J,[s("span",P,[o(i,{title:"关于",class:"font-v2",onClick:l[0]||(l[0]=t=>e.$router.push("/"))})])])])}});(W=T||(T={}))[W["浏览器启动成功"]=1e3]="浏览器启动成功",W[W["验证码破解成功"]=1001]="验证码破解成功",W[W["登录成功"]=1002]="登录成功",W[W["等待用户自行登录中"]=2e3]="等待用户自行登录中",W[W["脚本运行中"]=2010]="脚本运行中",W[W["未提供浏览器路径"]=3e3]="未提供浏览器路径",W[W["浏览器路径无效"]=4e3]="浏览器路径无效",W[W["浏览器启动失败"]=4001]="浏览器启动失败",W[W["未提供验证码破解的账号和密码"]=4010]="未提供验证码破解的账号和密码",W[W["验证码破解失败"]=40011]="验证码破解失败",W[W["登录失败"]=4020]="登录失败",W[W["自动登录运行超过限制次数"]=4021]="自动登录运行超过限制次数",W[W["网络错误"]=5e3]="网络错误",W[W["脚本运行超时"]=5010]="脚本运行超时",W[W["脚本执行错误"]=5011]="脚本执行错误",W[W["脚本执行的元素不存在"]=5012]="脚本执行的元素不存在";const{ipcRenderer:V}=require("electron"),X=require("uuid"),Y={get:e=>V.sendSync("get",[e]),set:(e,t)=>V.sendSync("set",[e,t]),call:(e,...t)=>V.sendSync("call",[e,...t]),on(e,t){const n=e+"-"+X.v4().replace(/-/g,"");V.send("on",n),V.on(n,t)},once(e,t){const n=e+"-"+X.v4().replace(/-/g,"");V.send("once",n),V.once(n,t)}},Z=u(" 任务列表 "),ee=u(" 账号管理 "),te=u(" 设置 ");var ne=e({setup:e=>(e,n)=>{const s=p,r=d,c=m,u=f,k=h,_=g,x=y,C=v,w=b;return t(),l(w,null,{default:i((()=>[o(_,{span:20,class:"font-v3"},{default:i((()=>[o(k,{theme:"light",mode:"horizontal"},{default:i((()=>[o(r,{key:"1",onClick:n[0]||(n[0]=t=>e.$router.push("/task"))},{default:i((()=>[o(s,{class:"icon"}),Z])),_:1}),o(r,{key:"2",onClick:n[1]||(n[1]=t=>e.$router.push("/users"))},{default:i((()=>[o(c,{class:"icon"}),ee])),_:1}),o(r,{key:"3",onClick:n[2]||(n[2]=t=>e.$router.push("/setting"))},{default:i((()=>[o(u,{class:"icon"}),te])),_:1})])),_:1})])),_:1}),o(_,{span:4},{default:i((()=>[o(k,{theme:"light",mode:"horizontal",id:"operations",class:"flex jc-flex-end",selectable:!1},{default:i((()=>[o(r,{onClick:n[3]||(n[3]=e=>a(Y).call("minimize"))},{default:i((()=>[o(x)])),_:1}),o(r,{onClick:n[4]||(n[4]=e=>a(Y).call("close"))},{default:i((()=>[o(C)])),_:1})])),_:1})])),_:1})])),_:1})}}),se=e({setup(e){const{shell:n,ipcRenderer:s}=require("electron");return s.on("info",((e,t,n)=>{k.info(T[t]+n?" : "+n:"")})),s.on("warn",((e,t,n)=>{k.warn(T[t]+n?" : "+n:"")})),s.on("success",((e,t,n)=>{k.success(T[t]+n?" : "+n:"")})),s.on("error",((e,t,n)=>{k.error(T[t]+n?" : "+n:"")})),(e,n)=>{const s=j,r=_("router-view"),a=S,c=Q,u=q,p=x;return t(),l(p,{class:"layout",style:{height:"100%"}},{default:i((()=>[o(s,{id:"layout-header"},{default:i((()=>[o(ne)])),_:1}),o(a,{id:"layout-content"},{default:i((()=>[o(w,{name:"fade"},{default:i((()=>[(t(),l(C,null,[o(r)],1024))])),_:1})])),_:1}),o(u,{id:"layout-footer"},{default:i((()=>[o(c)])),_:1})])),_:1})}}});const re={class:"font-v1",style:{"font-size":"42px",padding:"0px",margin:"0px"}},ae=u(" OCS "),oe={class:"font-v1"},ce=s("p",{class:"space-8"},[s("img",{alt:"GitHub Repo stars",src:"https://img.shields.io/github/stars/enncy/OnlineCourseScript"}),s("img",{alt:"GitHub",src:"https://img.shields.io/github/license/enncy/onlinecoursescript"}),s("img",{alt:"GitHub package.json version (branch)",src:"https://img.shields.io/github/package-json/v/enncy/onlinecoursescript/v1.0"}),s("img",{alt:"GitHub repo size",src:"https://img.shields.io/github/repo-size/enncy/OnlineCourseScript"})],-1),le={style:{width:"100%","text-align":"left"}},ie={style:{width:"450px",margin:"0 auto"}},ue=["href"],pe=["href"],de=s("pre",null,"                **** \r\n                # 使用须知\r\n                - 本软件完全开源免费，**谨防上当受骗** ，禁止用于商业用途，仅供学习交流使用\r\n                - 此软件不会收集您的个人信息，所有信息均保存到本地\r\n                - 此软件涉及到的脚本如有任何侵权行为，请联系作者进行删除\r\n                - 如有任何疑问，请到BUG反馈处反馈，或者直接联系作者邮箱 **enncyemail@qq.com**\r\n\r\n                ## **更多详细的使用教程，请移步** : https://ocs.enncy.cn/\r\n            ",-1);var me=e({setup(e){function n(){k.success("复制成功!")}return(e,c)=>{const p=G,d=O,m=$;return t(),l(m,{class:"box-shadow-base"},{default:i((()=>[s("p",re,[ae,s("span",oe,r(a(M).name),1)]),s("p",null,r(a(M).description),1),ce,s("div",le,[s("div",ie,[o(d,{column:1,labelStyle:{fontWeight:"bold"}},{default:i((()=>[o(p,{label:"项目名"},{default:i((()=>[u(r(a(M).name),1)])),_:1}),o(p,{label:"版本"},{default:i((()=>[u(" v"+r(a(M).version),1)])),_:1}),o(p,{label:"作者"},{default:i((()=>[u(r(a(M).author),1)])),_:1}),o(p,{label:"项目地址"},{default:i((()=>[s("a",{href:a(M).homepage},r(a(M).homepage),9,ue)])),_:1}),o(p,{label:"BUG反馈"},{default:i((()=>[s("a",{href:a(M).bugs.url},r(a(M).bugs.url),9,pe)])),_:1})])),_:1})])]),s("p",null,[o(a(z),{codeStyle:"github-dark",renderKey:"1",style:{"text-align":"left","letter-spacing":"1px"},raw:"",onCopy:n},{default:i((()=>[de])),_:1})])])),_:1})}}});const fe=s("h1",null,"task",-1),he=u("start");var ge=e({setup(e){const{ipcRenderer:r}=require("electron");function a(){console.log("run-script"),r.send("run-script")}return(e,r)=>{const c=L;return t(),n(H,null,[fe,s("div",null,[o(c,{type:"primary",onClick:a},{default:i((()=>[he])),_:1})])],64)}}});const ye={},ve=u(),be=s("span",null,"通用设置",-1),ke=u(),_e=s("span",null,"脚本设置",-1),xe=u(),Ce=s("span",null,"系统设置",-1),we=u(),je=s("span",null,"版本更新",-1);ye.render=function(e,n){const s=R,r=d,a=A,c=E,u=N,p=h,m=B,f=_("router-view"),g=S,y=x;return t(),l(y,{class:"box-shadow-base",style:{padding:"24px 0",background:"#fff"}},{default:i((()=>[o(m,{width:"200",style:{background:"#fff"}},{default:i((()=>[o(p,{mode:"inline",style:{height:"100%"}},{default:i((()=>[o(r,{key:"1",class:"space-12",onClick:n[0]||(n[0]=t=>e.$router.push("/setting/common"))},{default:i((()=>[o(s),ve,be])),_:1}),o(r,{key:"2",class:"space-12",onClick:n[1]||(n[1]=t=>e.$router.push("/setting/script"))},{default:i((()=>[o(a),ke,_e])),_:1}),o(r,{key:"3",class:"space-12",onClick:n[2]||(n[2]=t=>e.$router.push("/setting/system"))},{default:i((()=>[o(c),xe,Ce])),_:1}),o(r,{key:"4",class:"space-12",onClick:n[3]||(n[3]=t=>e.$router.push("/setting/version"))},{default:i((()=>[o(u),we,je])),_:1})])),_:1})])),_:1}),o(g,null,{default:i((()=>[o(f)])),_:1})])),_:1})};const Se={};Se.render=function(e,s){return t(),n("h1",null,"users")};const qe={};qe.render=function(e,t){return" 通用设置 "};const $e={};$e.render=function(e,t){return" 脚本设置 "};const ze={};ze.render=function(e,t){return" 系统设置 "};const Ge={};Ge.render=function(e,t){return" 版本更新 "};const Oe=K({history:D(),routes:[{path:"/",name:"index",component:me,meta:{desc:"关于"}},{path:"/task",name:"task",component:ge,meta:{desc:"任务列表"}},{path:"/setting",name:"setting",component:ye,children:[{path:"common",name:"setting-common",component:qe,meta:{desc:"通用设置"}},{path:"script",name:"setting-script",component:$e,meta:{desc:"脚本设置"}},{path:"system",name:"setting-system",component:ze,meta:{desc:"系统设置"}},{path:"version",name:"setting-version-update",component:Ge,meta:{desc:"版本更新"}}],meta:{desc:"设置"}},{path:"/users",name:"users",component:Se,meta:{desc:"账号管理"}},{path:"/:catchAll(.*)",name:"404",redirect:"/"}]});Oe.beforeEach(((e,t)=>!!e.name&&Oe.hasRoute(e.name))),k.config({top:"74px",duration:2,maxCount:3}),I(se).use(Oe).mount("#app");
