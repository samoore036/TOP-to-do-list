(()=>{"use strict";const t=function(){const t=document.documentElement,e=Array.from(document.getElementsByClassName("dark")),n=Array.from(document.getElementsByClassName("light"));t.classList.contains("day")?(t.classList.remove("day"),t.classList.add("night"),e.forEach((t=>t.classList.remove("hidden"))),n.forEach((t=>t.classList.add("hidden")))):(t.classList.remove("night"),t.classList.add("day"),e.forEach((t=>t.classList.add("hidden"))),n.forEach((t=>t.classList.remove("hidden"))))};class e{constructor(t,e,n,d,a){this.name=t,this.date=e,this.priority=n,this.project1234unique=d,this.key=a}getName(){return this.name}getDate(){return this.date}getReadableDate(){let t=this.date.split("-")[0];return""===t?"No Due Date":`${this.date.split("-")[1]}/${this.date.split("-")[2]}/${t}`}getFullDate(){let t=parseInt(this.date.split("-")[0]),e=parseInt(this.date.split("-")[1])-1,n=parseInt(this.date.split("-")[2]);return new Date(t,e,n)}getPriority(){return this.priority}getProject(){return this.project1234unique}getKey(){return this.key}}function n(t){let n=t.split("!$-")[1],d=t.split("!$-")[3],a=t.split("!$-")[5],c=t.split("!$-")[7],o=t.split("!$-")[8].split(":")[1].replace("}","");return new e(n,d,a,c,o)}function d(){const t=[];for(let e=1;e<localStorage.length;e++){let d=localStorage.getItem(e);if("deleted"===d||null===d)continue;const a=n(d);t.push(a)}return t}function a(){return localStorage.getItem(0).split("!$-").filter((t=>t.length>0))}const c=function(t){const e=document.createElement("div");e.classList.add("task-div");const n=document.createElement("div");n.classList.add("left-half");const d=function(){const t=document.createElement("button");return t.classList.add("check-box"),t}();d.classList.add("checkbox"),d.addEventListener("click",(function(){e.classList.contains("completed-task")?(d.textContent="",e.classList.remove("completed-task")):(d.textContent="✓",e.classList.add("completed-task"))})),n.appendChild(d),n.appendChild(function(t){const e=document.createElement("div");return e.textContent=t.replace(/\\n/g," "),e}(t.getName())),e.appendChild(n);const a=document.createElement("div");a.classList.add("right-half");const c=function(){const t=document.createElement("button");return t.classList.add("delete-button"),t}();switch(c.addEventListener("click",(function(){localStorage.setItem(t.getKey(),"deleted"),h(u())})),a.appendChild(function(t){const e=document.createElement("div");return e.textContent=""===t?"No Due Date":t,e}(t.getReadableDate())),a.appendChild(c),e.appendChild(a),t.getPriority()){case"None":e.style.borderLeftColor="gray";break;case"Low":e.style.borderLeftColor="green";break;case"Medium":e.style.borderLeftColor="orange";break;case"High":e.style.borderLeftColor="red"}return e};let o,l,i,s="";function r(t){s=t}function u(){return s}function m(){Array.from(document.getElementsByClassName("tab")).forEach((t=>t.classList.add("hidden")))}function p(){Array.from(document.querySelectorAll("button")).forEach((t=>t.classList.remove("active")))}function h(t){switch(t){case"all-tab":f();break;case"high-priority-tab":b();break;case"today-tab":y();break;case"week-tab":v();break;case"week-plus-tab":C();break;default:L(t)}}function g(){const t=localStorage.getItem(0).replace(u(),"").toString();localStorage.setItem(0,t),k(),function(t){for(let e=1;e<localStorage.length;e++){let d=localStorage.getItem(e);"deleted"!==d&&null!==d&&n(d).getProject()===t&&localStorage.setItem(e,"deleted")}}(u()),f()}function E(){return d().filter((t=>t.getProject().includes("tab")))}function f(){m(),p(),r("all-tab");const t=document.getElementById("all-tab");t.classList.remove("hidden"),document.getElementById("all-btn").classList.add("active");const e=t.getElementsByClassName("content-div")[0];e.textContent="",localStorage.length>=2&&E().forEach((t=>e.appendChild(c(t))))}function b(){m(),p(),r("high-priority-tab");const t=document.getElementById("high-priority-tab");t.classList.remove("hidden"),document.getElementById("high-priority-btn").classList.add("active");const e=t.getElementsByClassName("content-div")[0];e.textContent="",localStorage.length>=2&&E().filter((t=>"High"===t.getPriority())).forEach((t=>e.appendChild(c(t))))}function y(){m(),p(),r("today-tab");const t=document.getElementById("today-tab");t.classList.remove("hidden"),document.getElementById("today-btn").classList.add("active");const e=t.getElementsByClassName("content-div")[0];e.textContent="",localStorage.length>=2&&E().filter((t=>t.getFullDate().getFullYear()==I().getFullYear()&&t.getFullDate().getMonth()==I().getMonth()&&t.getFullDate().getDate()==I().getDate())).forEach((t=>e.appendChild(c(t))))}function v(){m(),p(),r("week-tab");const t=document.getElementById("week-tab");t.classList.remove("hidden"),document.getElementById("week-btn").classList.add("active");const e=t.getElementsByClassName("content-div")[0];e.textContent="",localStorage.length>=2&&E().filter((t=>t.getFullDate()>=I()&&t.getFullDate()<=B())).forEach((t=>e.appendChild(c(t))))}function C(){m(),p(),r("week-plus-tab");const t=document.getElementById("week-plus-tab");t.classList.remove("hidden"),document.getElementById("week-plus-btn").classList.add("active");const e=t.getElementsByClassName("content-div")[0];e.textContent="",localStorage.length>=2&&E().filter((t=>t.getFullDate()>B())).forEach((t=>e.appendChild(c(t))))}function L(t){m(),p(),r(t);const e=document.getElementById(t);e.classList.remove("hidden");const n=e.getElementsByClassName("content-div")[0];n.textContent="",localStorage.length>=2&&function(t){return d().filter((e=>e.getProject()===t))}(t).forEach((t=>n.appendChild(c(t))))}function k(){const t=document.getElementById("projects-div");t.textContent="",a().forEach((e=>t.appendChild(function(t){const e=document.createElement("button");return e.textContent=t,e.classList.add("project-tab-btn"),e.addEventListener("click",(function(t){L(t.target.textContent),e.classList.add("active")})),e}(e)))),a().forEach((t=>function(t){const e=document.createElement("div");e.classList.add("tab","hidden"),e.setAttribute("id",t);const n=document.createElement("div");n.classList.add("header-div");const d=document.createElement("h1");d.textContent=t,n.appendChild(d);const a=document.createElement("button");a.textContent="Delete project",a.classList.add("project-delete-btn"),a.addEventListener("click",g),n.appendChild(a);const c=document.createElement("div");c.classList.add("content-div"),e.appendChild(n),e.appendChild(c),document.getElementById("main").appendChild(e)}(t)))}function I(){const t=new Date;return new Date(t.getFullYear(),t.getMonth(),t.getDate())}function B(){return new Date(I().getFullYear(),I().getMonth(),I().getDate()+7)}function x(t){let n=localStorage.length;t.preventDefault();const d=t.target.parentElement.parentElement;o="!$-"+document.getElementById("task-input").value+"!$-",l="!$-"+document.getElementById("task-due-date").value+"!$-",i="!$-"+document.querySelector('input[name="priority"]:checked').value+"!$-";let a=`!$-${u()}!$-`;localStorage.setItem(n,JSON.stringify(new e(o,l,i,a,n))),document.getElementById("task-form").reset(),d.classList.add("hidden"),h(u())}function A(t){const e=document.createElement("input");return e.type="radio",e.name="priority",e.required="true",e.value=t,e}function w(t){t.currentTarget.parentElement.parentElement.parentElement.parentElement.classList.add("hidden")}function D(){const t=document.getElementById("add-project-form");t.reset(),t.classList.add("hidden"),document.getElementById("add-project-btn").classList.remove("hidden")}function S(){D()}function j(t){t.preventDefault();const e=document.getElementById("project-name-input").value.toLowerCase().trim();if(0===e.trim().length)return void alert("Project name must not be blank");const n=localStorage.getItem(0);for(let t=0;t<a().length;t++)if(e===a()[t])return void alert("This project name already exists. Please choose a different name for your project.");const d=n+"!$-"+e+"!$-";localStorage.setItem(0,d),D(),k()}!function(){0===localStorage.length&&localStorage.setItem(0,""),k(),document.documentElement.classList.add("day"),document.getElementById("theme-toggle").addEventListener("click",t),f(),document.getElementById("home").addEventListener("click",f),document.getElementById("view-toggle-btn").addEventListener("click",(function(){const t=document.getElementById("sidebar");t.classList.contains("hidden")?t.classList.remove("hidden"):t.classList.add("hidden")})),document.getElementById("all-btn").addEventListener("click",f),document.getElementById("high-priority-btn").addEventListener("click",b),document.getElementById("today-btn").addEventListener("click",y),document.getElementById("week-btn").addEventListener("click",v),document.getElementById("week-plus-btn").addEventListener("click",C);const e=document.getElementById("task-modal"),n=function(){const t=document.createElement("form");t.setAttribute("id","task-form");const e=document.createElement("textarea");e.setAttribute("id","task-input"),e.required="true",e.placeholder="Enter task here",t.appendChild(e);const n=document.createElement("input");n.type="date",n.setAttribute("id","task-due-date");const d=document.createElement("label");d.setAttribute("for","task-due-date"),d.textContent="Complete by:",t.appendChild(d),t.appendChild(n);const a=function(){const t=document.createElement("div");t.classList.add("radio-div");const e=document.createElement("div"),n=document.createElement("h4");n.textContent="Priority",e.appendChild(n),t.appendChild(e);const d=document.createElement("div");d.setAttribute("id","label-div");const a=A("None");a.setAttribute("id","none"),a.checked="true";const c=document.createElement("label");c.setAttribute("for","none"),c.textContent="None",d.appendChild(a),d.appendChild(c);const o=A("Low");o.setAttribute("id","low");const l=document.createElement("label");l.setAttribute("for","low"),l.textContent="Low",d.appendChild(o),d.appendChild(l);const i=A("Medium");i.setAttribute("id","medium");const s=document.createElement("label");s.setAttribute("for","medium"),s.textContent="Medium",d.appendChild(i),d.appendChild(s);const r=A("High");r.setAttribute("id","high");const u=document.createElement("label");return u.setAttribute("for","high"),u.textContent="High",d.appendChild(r),d.appendChild(u),t.appendChild(d),t}();t.appendChild(a);const c=document.createElement("div");c.classList.add("button-div");const o=document.createElement("input");o.type="submit",o.value="Add",o.setAttribute("id","submit-form-btn"),c.appendChild(o);const l=document.createElement("button");return l.textContent="Cancel",l.setAttribute("id","cancel-form-btn"),l.addEventListener("click",w),c.appendChild(l),t.appendChild(c),t.addEventListener("submit",x),t}();e.appendChild(n),document.getElementById("add-task-btn").addEventListener("click",(()=>{document.getElementById("task-overlay").classList.remove("hidden")}));const d=document.getElementById("project-add-div"),a=function(){const t=document.createElement("form");t.setAttribute("id","add-project-form");const e=document.createElement("input");e.type="text",e.setAttribute("id","project-name-input"),e.required="true",e.placeholder="Enter project name",t.appendChild(e);const n=document.createElement("div");n.classList.add("button-div");const d=document.createElement("input");d.type="submit",d.value="Add",d.setAttribute("id","submit-project-btn"),n.appendChild(d);const a=document.createElement("button");return a.textContent="Cancel",a.setAttribute("id","cancel-project-btn"),a.addEventListener("click",S),n.appendChild(a),t.appendChild(n),t.addEventListener("submit",j),document.getElementById("project-form-div").appendChild(t),t}();a.classList.add("hidden"),d.appendChild(a);const c=document.getElementById("add-project-btn");c.addEventListener("click",(function(){a.classList.remove("hidden"),c.classList.add("hidden")}))}()})();