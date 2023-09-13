(()=>{"use strict";const e=document.querySelectorAll(".dropdown-hover"),t=[];e.forEach((e=>{t.push(e.parentElement)}));const o=[...new Set(t)];let n=!1;const r={initDropdowns(){document.addEventListener("click",r.pageClickHandler),[...document.querySelectorAll(".dropdown-hover")].forEach((e=>{r.registerHover(e)})),o.forEach((e=>{e.addEventListener("click",r.menuClickHandler),e.addEventListener("mousedown",(()=>{n=!0})),e.addEventListener("mouseup",(()=>{n=!1}))}))},initialise:()=>{const e=setInterval((function(){"complete"===document.readyState&&(clearInterval(e),r.initDropdowns())}),100)},isInLeftHalf(e){const t=e.getBoundingClientRect(),o=window.innerWidth;return t.left<=o/2},scrollIntoView(e){const t=e.getBoundingClientRect(),o=document.body.getBoundingClientRect(),n=window.innerHeight;if(!(t.bottom>n))return!1;{const e=t.bottom-n;window.scrollBy(0,e),t.bottom>o.bottom&&(document.body.style.height=document.documentElement.scrollHeight+e+"px")}},pageClickHandler(e){let t=!1;if(o.forEach((o=>{1==!!o.contains(e.target)&&(t=!0)})),t)return;const n=[];document.querySelectorAll(".dropdown-hover").forEach((e=>{e.contains(e.querySelector(".dropdown_toggle-active"))&&n.push(e)})),[...n].forEach((e=>{1==!!e.closest('[data-hover-lock="true"]')&&e.closest(".dropdown-hover").setAttribute("data-hover-lock","false"),r.close(e.querySelector(".dropdown_toggle"))}))},hoverHandler(e){const t=e.target.closest(".dropdown-hover").getElementsByClassName("dropdown_toggle")[0];if("mouseenter"===e.type)r.open(t);else if("mouseleave"===e.type&&(n=!1,0==!!t.closest('[data-hover-lock="true"]')&&t.classList.contains("dropdown_toggle-active"))){let e;const o=t=>{e=t.target};document.addEventListener("mouseover",o,!1),setTimeout((()=>{t.parentElement.contains(e)||r.close(t),document.removeEventListener("mouseover",o,!1)}),10)}},focusHandler(e){if(n)return;const t=e.target.closest(".dropdown").getElementsByClassName("dropdown_toggle")[0];"focusin"===e.type?r.open(t):"focusout"===e.type&&0==!!t.closest('[data-hover-lock="true"]')&&t.classList.contains("dropdown_toggle-active")&&(0==!!e.target.closest(".dropdown-hover").contains(e.relatedTarget)?r.close(e.target.closest(".dropdown-hover").querySelector(".dropdown_toggle")):r.close(t))},registerHover(e){0==!!e.closest(".fullscreenMenu")&&(e.addEventListener("mouseenter",r.hoverHandler),e.addEventListener("mouseleave",r.hoverHandler),e.setAttribute("data-hover-listener","true")),e.addEventListener("focusin",r.focusHandler),e.addEventListener("focusout",r.focusHandler)},deregisterHover(e){e.removeEventListener("mouseenter",r.hoverHandler),e.removeEventListener("mouseleave",r.hoverHandler),e.setAttribute("data-hover-listener","false")},menuClickHandler(e){if(1==!!e.target.closest(".dropdown_toggle")||1==!!e.target.closest(".dropdown_primary")){const t=e.target.closest(".dropdown").querySelector(".dropdown_toggle");t.classList.contains("dropdown_toggle-active")&&0==!!t.closest('[data-hover-lock="true"]')?t.closest(".dropdown-hover").setAttribute("data-hover-lock","true"):t.classList.contains("dropdown_toggle-active")&&1==!!t.closest('[data-hover-lock="true"]')?(t.parentElement.classList.contains("dropdown-hover")&&t.closest(".dropdown-hover").setAttribute("data-hover-lock","false"),r.close(t)):(t.closest(".dropdown-hover").setAttribute("data-hover-lock","true"),r.open(t))}else 0==!!e.target.closest('[data-hover-lock="true"]')&&1==!!e.target.closest(".dropdown-hover")&&e.target.closest(".dropdown-hover").setAttribute("data-hover-lock","true")},open(e){const t=e.parentElement;t.classList.contains("dropdown-hover")&&(r.isInLeftHalf(t)?(t.classList.add("dropdown-swingRight"),t.classList.remove("dropdown-swingLeft")):(t.classList.add("dropdown-swingLeft"),t.classList.remove("dropdown-swingRight"))),[...document.querySelectorAll(".dropdown_toggle-active")].forEach((t=>{t.parentElement.contains(e)||r.close(t)}));const o=[];if([...document.querySelectorAll(".dropdown-hover:not( .fullscreenMenu .dropdown )")].forEach((e=>{e.contains(e.querySelector(".dropdown_toggle-active"))&&o.push(e)})),[...o].forEach((e=>{e.contains(t)||(e.setAttribute("data-hover-lock","false"),r.close(e.querySelector(".dropdown_toggle")))})),0==!!e.parentElement.classList.contains("dropdown-hover")&&0==!!e.classList.contains("dropdown_toggle-active")){const e=[],o=[...t.closest(".dropdown-hover").querySelectorAll(".dropdown")];o.unshift(t.closest(".dropdown-hover")),o.pop(),o.forEach((o=>{if(o.contains(t)){e.push(o);const t=o.querySelector(".dropdown_toggle");t.classList.add("dropdown_toggle-active"),t.setAttribute("aria-expanded",!0),t.setAttribute("aria-pressed",!0)}}))}e.classList.add("dropdown_toggle-active"),e.setAttribute("aria-expanded",!0),e.setAttribute("aria-pressed",!0);const n=t.lastElementChild;r.scrollIntoView(n)},close(e){const t=e.parentElement.querySelectorAll(".dropdown_toggle-active");if(t.length>1)for(let e=t.length-1;e>=0;e--)t[e].classList.remove("dropdown_toggle-active"),t[e].setAttribute("aria-expanded",!1),t[e].setAttribute("aria-pressed",!1);else e.classList.remove("dropdown_toggle-active"),e.setAttribute("aria-expanded",!1),e.setAttribute("aria-pressed",!1)}};function s(e,t,o){switch(t){case"scale":return e.style.transform="scale("+o+")",void(e.style.opacity=o);case"left":e.style.left=o+"px"}}const a=async(e,t,o,n,r,a)=>{await function(e,t,o,n,r,a){const c=r-n,l=a/(a/1e3*60);let i=0,d=0;const u=r>=n;return new Promise((p=>{const y=setInterval((function(){if(d+=l,i=function(e,t,o,n,r){let s=o,a=t;const c=n,l=r;switch(e){case"linear":return c*(s/l)+a;case"easeInQuad":return c*(s/=l)*s+a;case"easeOutQuad":return-c*(s/=l)*(s-2)+a;case"easeInOutQuad":return(s/=l/2)<1?c/2*s*s+a:-c/2*(--s*(s-2)-1)+a;case"easeInCubic":return c*(s/=l)*s*s+a;case"easeOutCubic":return c*((s=s/l-1)*s*s+1)+a;case"easeInOutCubic":return(s/=l/2)<1?c/2*s*s*s+a:c/2*((s-=2)*s*s+2)+a;case"easeInQuart":return c*(s/=l)*s*s*s+a;case"easeOutQuart":return-c*((s=s/l-1)*s*s*s-1)+a;case"easeInOutQuart":return(s/=l/2)<1?c/2*s*s*s*s+a:-c/2*((s-=2)*s*s*s-2)+a;case"easeInQuint":return c*(s/=l)*s*s*s*s+a;case"easeOutQuint":return c*((s=s/l-1)*s*s*s*s+1)+a;case"easeInOutQuint":return(s/=l/2)<1?c/2*s*s*s*s*s+a:c/2*((s-=2)*s*s*s*s+2)+a;case"easeInSine":return-c*Math.cos(s/l*(Math.PI/2))+c+a;case"easeOutSine":return c*Math.sin(s/l*(Math.PI/2))+a;case"easeInOutSine":return-c/2*(Math.cos(Math.PI*s/l)-1)+a;case"easeInExpo":return 0===s?a:c*Math.pow(2,10*(s/l-1))+a;case"easeOutExpo":return s===l?a+c:c*(1-Math.pow(2,-10*s/l))+a;case"easeInOutExpo":return 0===s?a:s===l?a+c:(s/=l/2)<1?c/2*Math.pow(2,10*(s-1))+a:c/2*(2-Math.pow(2,-10*--s))+a;case"easeInCirc":return-c*(Math.sqrt(1-(s/=l)*s)-1)+a;case"easeOutCirc":return c*Math.sqrt(1-(s=s/l-1)*s)+a;case"easeInOutCirc":return(s/=l/2)<1?-c/2*(Math.sqrt(1-s*s)-1)+a:c/2*(Math.sqrt(1-(s-=2)*s)+1)+a;case"easeInBack":return a=1.70158,c*(s/=l)*s*((a+1)*s-a)+a;case"easeOutBack":return a=1.70158,c*((s=s/l-1)*s*((a+1)*s+a)+1)+a;case"easeInOutBack":return a=1.70158,(s/=l/2)<1?c/2*(s*s*((1+(a*=1.525))*s-a))+a:c/2*((s-=2)*s*((1+(a*=1.525))*s+a)+2)+a;case"easeInBounce":return c-easeOutBounce(l-s,0,c,l)+a;case"easeOutBounce":return(s/=l)<1/2.75?c*(7.5625*s*s)+a:s<2/2.75?c*(7.5625*(s-=1.5/2.75)*s+.75)+a:s<2.5/2.75?c*(7.5625*(s-=2.25/2.75)*s+.9375)+a:c*(7.5625*(s-=2.625/2.75)*s+.984375)+a;case"easeInOutBounce":return s<l/2?.5*easeInBounce(2*s,0,c,l)+a:.5*easeOutBounce(2*s-l,0,c,l)+.5*c+a}}(o,n,d,c,a).toFixed(2),u&&i>=r||!u&&i<=r)return clearInterval(y),s(e,t,r),p(t+" done");s(e,t,i)}),1e3/60)}))}(e,t,o,n,r,a)};gsap.registerPlugin(ScrollTrigger),r.initialise(),(()=>{const e=document.querySelector("body"),t=document.querySelector("body header"),o=document.querySelector(".menuToggle");let n=!1;if(null===o)return;const r=setInterval((()=>{"complete"===document.readyState&&(clearInterval(r),o.addEventListener("click",s))}),100),s=()=>{n||(n=!0,e.classList.contains("menu_active")?c():a())},a=async()=>{t.setAttribute("hidden",!1),e.classList.add("menu_active"),await l(t,"transform","translate( 0, 0 )"),window.addEventListener("scroll",c,{once:!0}),n=!1},c=async()=>{t.setAttribute("hidden",!0),e.classList.remove("menu_active"),await l(t,"transform","translate( 0, -100% )"),n=!1},l=(e,o,n)=>{new Promise((r=>{try{e.style[o]=n;const s=o=>{o.target===e&&(t.removeEventListener("transitionend",s),r("Transition complete."))};t.addEventListener("transitionend",s)}catch(e){console.error(e.name+": "+e.message),reject(e)}}))}})(),(()=>{if(!document.querySelector(".thumbNav"))return;let e,t=!0,o=!0,n=window.pageYOffset;window.onscroll=function(){e=window.pageYOffset,t&&(t=!1,setTimeout((function(){n>e&&!1===o?(document.querySelector(".thumbNav-jshide").style.transform="translateY(0rem)",o=!0):n<e&&!0===o&&(document.querySelector(".thumbNav-jshide").style.transform="translateY(5rem)",document.querySelector(".thumbNav_checkbox").checked=!1,o=!1),n=e,t=!0}),500))}})(),(()=>{let e,t,o,n,r=!1,s=!1,c=!0;async function l(l){const p=l.currentTarget.id;e=document.querySelector("."+p),t=e.querySelector(".modal_dialog"),o=e.querySelector(".modal_control-close"),o.onclick=()=>{d()},window.onclick=function(e){t===!e.target||t.contains(e.target)||d()},await Promise.all([i(),u()]),async function(){s||r||(s=!0,r=!0,function(){if(null!==document.getElementById("js_psuedoScrollBar"))document.getElementById("js_psuedoScrollBar").style.display="block";else{const e=document.createElement("div");e.setAttribute("id","js_psuedoScrollBar"),e.style.position="fixed",e.style.right="0",e.style.top="0",e.style.width=n,e.style.height="100vh",e.style.background="#333",e.style.zIndex="9",document.body.appendChild(e)}document.querySelector("body").style.overflow="hidden",document.querySelector("html").style.paddingRight=n}(),function(){let e;const t=o=>{null!==e&&window.clearTimeout(e),e=window.setTimeout((function(){s?i():window.removeEventListener("resize",t)}),20)};window.addEventListener("resize",t)}(),c?(t.style.left="-768px",t.style.transform="scale(1)",t.style.opacity="1",e.style.display="contents",e.style.opacity="1",await a(t,"left","easeInOutCirc",-768,0,800),r=!1):(t.style.left="0",t.style.transform="scale(0)",t.style.opacity="0",e.style.display="flex",e.style.opacity="0",function(e){let t=4;const o=setInterval((function(){t>=100&&clearInterval(o),e.style.opacity=t/100,t+=2}),16)}(e),await a(t,"scale","easeInOutCirc",0,1,800),r=!1))}()}async function i(){const o=parseInt(document.querySelector("html").getBoundingClientRect().width,10);c=o<=768,c&&s&&!r?(t.style.left="0",t.style.transform="scale(1)",t.style.opacity="1",e.style.display="contents",e.style.opacity="1"):!c||s||r?c||!s||r?c||s||r||(t.style.left="0",t.style.transform="scale(0)",t.style.opacity="0",e.style.display="none",e.style.opacity="0"):(t.style.left="0",t.style.transform="scale(1)",t.style.opacity="1",e.style.display="flex",e.style.opacity="1"):(t.style.left="-768px",t.style.transform="scale(1)",t.style.opacity="1",e.style.display="contents",e.style.opacity="1")}async function d(){s&&!r&&(s=!1,r=!0,null!==document.getElementById("js_psuedoScrollBar")&&(document.getElementById("js_psuedoScrollBar").style.display="none",document.querySelector("body").style.overflow="visible",document.querySelector("html").style.paddingRight="0"),c?(t.style.left="0",t.style.transform="scale(1)",t.style.opacity="1",e.style.display="contents",e.style.opacity="1",await a(t,"left","easeInOutCirc",0,-768,800),r=!1):(t.style.left="0",t.style.transform="scale(1)",t.style.opacity="1",e.style.display="flex",e.style.opacity="1",function(e){let t=100;const o=setInterval((function(){t<=0&&clearInterval(o),e.style.opacity=t/100,t-=2}),16)}(e),await a(t,"scale","easeInOutCirc",1,0,800),e.style.display="none",r=!1))}async function u(){const e=window.innerWidth,t=document.querySelector("html").getBoundingClientRect().width;return n=parseInt(e-t,10)+"px",n}const p=setInterval((function(){"complete"===document.readyState&&(clearInterval(p),document.querySelectorAll(".modal_control-open").forEach((e=>{e.addEventListener("click",l)})))}),100)})(),(()=>{let e,t,o,n,r,s;const a=document.querySelector("body");function c(){e=window.innerWidth,t=window.innerHeight,n=e>=t?"landscape":"portrait",n!==o&&(a.classList.remove(o),a.classList.add(n),o=n),s=e<="768"?"mobile":e<="1120"?"tablet":e<="1440"?"laptop":e<="1920"?"desktop":"xl",s!==r&&(a.classList.remove(r),a.classList.add(s),r=s)}function l(){const e=window.innerWidth,t=document.querySelector("html").getBoundingClientRect().width,o=parseInt(e-t,10)+"px";document.documentElement.style.setProperty("--scrollbar",o)}new ResizeObserver((e=>l())).observe(document.body);const i=setInterval((function(){"complete"===document.readyState&&(clearInterval(i),c())}),10);let d;window.onresize=function(){d&&clearTimeout(d),d=setTimeout((function(){c(),l()}),10)}})(),(()=>{const e=".welcome .scrollTriggerParent",t=".welcome .landing_content",o=".welcome .fist_container",n=".welcome .sign",r=".welcome .svgMe_container",s=".welcome .star-1",a=".welcome .star-2",c=".welcome .desert_shadow",l=".welcome .desert_sun",i=[];if(!document.querySelector(e))return;const d=e=>e/window.innerWidth*100+"vw",u=e=>{const t=document.querySelector(e).getBoundingClientRect(),o=t.right-t.left,n=2*t.left;return document.body.clientWidth-o-n},p=()=>{i.punch=(()=>{const e=gsap.timeline().addLabel("fadeIn").set(t,{y:"-100vh",opacity:0}).to(t,{y:0,opacity:1,duration:1,ease:"power4.out"},">").addLabel("punch").set(o,{visibility:"visible"}).to(o,{top:0,duration:.3,ease:"elastic.out(1,0.8)"}).to(o,{top:"110vh",duration:1.8,ease:"power3.out"}).set(o,{visibility:"hidden"}).set(".welcome .sign_pinSignTop",{visibility:"hidden"},"<-2.02").set(n,{position:"absolute",margin:0},"<").to(n,{xPercent:-13,yPercent:-20,scale:.1,duration:1.5,ease:"power3.out"},"<").to(n,{rotateX:1080,rotateY:720,rotateZ:360,duration:1.5,ease:"none"},"<").to(r,{xPercent:10,yPercent:-40,scale:.1,duration:1.5,ease:"power3.out"},"<").to(r,{rotateZ:1440,duration:1.5,ease:"none"},"<").to(n,{xPercent:-15,yPercent:10,duration:1,ease:"power2.in"},">-0.6").to(n,{rotateX:1080,rotateY:720,scale:.001,rotateZ:360,duration:1,ease:"none"},"<").to(r,{xPercent:10,yPercent:-20,duration:1,ease:"power2.in"},"<").to(r,{rotateZ:1800,scale:.001,duration:1,ease:"none"},"<").set([s,a],{scale:0,visibility:"visible"}).to([s,a],{scale:1e3,rotate:180,duration:.2,ease:"none"},">").to([s,a],{scale:0,rotate:360,duration:.2,ease:"none"},">").set([s,a],{visibility:"hidden",rotate:0}).set(t,{visibility:"hidden"});return e.pause("punch"),e})(),ScrollTrigger.create({trigger:e,start:"top top-=100px",end:"bottom top",onEnter:()=>i.punch.play("punch"),onLeave:()=>i.punch.pause("fadeIn"),onLeaveBack:()=>i.punch.tweenFromTo("fadeIn","punch")}),i.sunMove=gsap.timeline().set(c,{transformOrigin:"top center",skewX:55,scaleY:.4}).to(l,{keyframes:{x:[0,d(u(l)/2),d(u(l))],easeEach:"none"}}).to(l,{keyframes:{"0%":{marginTop:"3vw"},"50%":{marginTop:"-3vw",ease:"power2.out"},"100%":{marginTop:"3vw",ease:"power2.in"}}},"<").to(c,{keyframes:{skewX:[55,0,-55],scaleY:[.4,.2,.4],easeEach:"none"}},"<").fromTo(".welcome .landing_backdrop",{background:"radial-gradient( at 9% 9%, #fffb 0%, #fff0 30% ), linear-gradient( hsl(207, 53%, 60%) 0%, hsl(207, 53%, 88%) 20%, hsl(61, 75%, 60%) 55%, hsl(30, 75%, 60%) 60%, #fff 61% )"},{ease:"linear",background:"radial-gradient( at 91% 9%, #fffb 0%, #fff0 30% ), linear-gradient( hsl(207, 53%, 50%) 0%, hsl(0, 76%, 88%) 25%, hsl(61, 75%, 60%) 55%, hsl(30, 76%, 50%) 70%, #fff 71% )"},"<"),ScrollTrigger.create({trigger:e,start:"top top-=500px",end:"bottom bottom+=500px",scrub:1,animation:i.sunMove})};let y;const m=()=>{Object.entries(i).forEach((([,e])=>e.revert())),p()},w=setInterval((()=>{"complete"===document.readyState&&(clearInterval(w),p(),window.onresize=()=>((e,t,o=[])=>{clearTimeout(y),y=setTimeout((()=>e(...o)),t)})(m,150))}),100)})()})();