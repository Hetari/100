var E=Object.defineProperty;var _=(n,s,e)=>s in n?E(n,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[s]=e;var v=(n,s,e)=>_(n,typeof s!="symbol"?s+"":s,e);import{n as x,i as S,t as w,a as A,b as C,P as H,g as I}from"./index-BKORolGL.js";import{r as f,i as y,d as b,b as L,j as W,o as B,c as M}from"./index-BRkvtEgr.js";const z=A?window:void 0;function P(n){var s;const e=w(n);return(s=e==null?void 0:e.$el)!=null?s:e}function m(...n){let s,e,o,p;if(typeof n[0]=="string"||Array.isArray(n[0])?([e,o,p]=n,s=z):[s,e,o,p]=n,!s)return x;Array.isArray(e)||(e=[e]),Array.isArray(o)||(o=[o]);const r=[],h=()=>{r.forEach(i=>i()),r.length=0},d=(i,l,u,c)=>(i.addEventListener(l,u,c),()=>i.removeEventListener(l,u,c)),a=y(()=>[P(s),w(p)],([i,l])=>{if(h(),!i)return;const u=S(l)?{...l}:l;r.push(...e.flatMap(c=>o.map(g=>d(i,c,g,u))))},{immediate:!0,flush:"post"}),t=()=>{a(),h()};return C(t),t}function T(n,s={}){const{delayEnter:e=0,delayLeave:o=0,window:p=z}=s,r=f(!1);let h;const d=a=>{const t=a?e:o;h&&(clearTimeout(h),h=void 0),t?h=setTimeout(()=>r.value=a,t):r.value=a};return p&&(m(n,"mouseenter",()=>d(!0),{passive:!0}),m(n,"mouseleave",()=>d(!1),{passive:!0})),r}const j=800,U=b({__name:"1",setup(n){const s=f(),e=T(s),o=f(5);class p{constructor(t){v(this,"p");v(this,"x");v(this,"y");v(this,"z");v(this,"pz");this.p=t,this.x=t.random(-t.width,t.width),this.y=t.random(-t.height,t.height),this.z=t.random(t.width),this.pz=this.z}update(){this.z-=I(o),this.z<1&&(this.z=this.p.width,this.x=this.p.random(-this.p.width,this.p.width),this.y=this.p.random(-this.p.height,this.p.height),this.pz=this.z)}show(){this.p.fill(0),this.p.noStroke();const t=this.p.map(this.x/this.z,0,1,0,this.p.width),i=this.p.map(this.y/this.z,0,1,0,this.p.height),l=this.p.map(this.z,0,this.p.width,16,0);this.p.ellipse(t,i,l,l);const u=this.p.map(this.x/this.pz,0,1,0,this.p.width),c=this.p.map(this.y/this.pz,0,1,0,this.p.height);this.pz=this.z,this.p.stroke(0),this.p.line(u,c,t,i)}}const r=()=>{let a=setInterval(()=>{o.value>=50||!e.value?clearInterval(a):o.value+=1},1)},h=()=>{let a=setInterval(()=>{o.value<=5||e.value?clearInterval(a):o.value-=1},1)};let d;return L(()=>{const a=[];d=new H(t=>{t.setup=()=>{t.createCanvas(t.windowWidth,t.windowHeight);for(let i=0;i<j;i++)a[i]=new p(t);t.draw=()=>{t.background(255),t.translate(t.width/2,t.height/2),a.forEach(i=>{i.update(),i.show()})}},t.windowResized=()=>{t.resizeCanvas(t.windowWidth,t.windowHeight)}},document.getElementById("canvas"))}),W(()=>{d.remove()}),y(e,a=>{a?r():h()}),(a,t)=>(B(),M("div",{ref_key:"canvas",ref:s,id:"canvas"},null,512))}});export{U as default};