import{a as L,S,i as l}from"./assets/vendor-DqB7j7Ix.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const w="50870146-6f4da653a0080d03ee3a8a589",q="https://pixabay.com/api/";async function g(s,o=1){const r={key:w,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o};return(await L.get(q,{params:r})).data}function h(s){return s.map(({webformatURL:o,largeImageURL:r,tags:i,likes:e,views:t,comments:n,downloads:b})=>`
      <li class='gallery-item'>
        <a class="gallery-link" href="${r}">
          <img class='gallery-image' src="${o}" alt="${i}" data-source="${r}" />
          <div class="info">
            <div class="info-item">
              <p>Likes</p>
              <p>${e}</p>
            </div>
            <div class="info-item">
              <p>Views</p>
              <p>${t}</p>
            </div>
            <div class="info-item">
              <p>Comments</p>
              <p>${n}</p>
            </div>
            <div class="info-item">
              <p>Downloads</p>
              <p>${b}</p>
            </div>
          </div>
        </a>
      </li>
    `).join("")}const m=document.querySelector("form"),p=document.querySelector(".gallery"),c=document.querySelector(".loader"),a=document.querySelector(".load-more");let y="",d=1,u=0;const v=new S(".gallery a",{captions:!0,captionPosition:"bottom",captionsData:"alt",captionDelay:250,overlayOpacity:.8}),f={backgroundColor:"rgba(239, 64, 64, 1)",messageColor:"#fff",titleColor:"#fff",iconColor:"#fff",timeout:5e3,progressBarColor:"rgba(181, 27, 27, 1)"};m.addEventListener("submit",async s=>{s.preventDefault();const o=m.elements.query.value.trim();if(!o){l.warning({message:"Please enter a search term",position:"topRight"});return}y=o,d=1,p.innerHTML="",a.style.display="none",c.style.display="block";try{const{hits:r,totalHits:i}=await g(y,d);u=i,r.length?(p.innerHTML=h(r),v.refresh(),u>r.length&&(a.style.display="block")):l.error({message:"Sorry, there are no images matching your search query.",position:"topRight",...f})}catch{l.error({message:"Something went wrong. Please try again later.",position:"topRight",...f})}finally{c.style.display="none"}});a.addEventListener("click",async()=>{d+=1,c.style.display="block",a.style.display="none";try{const{hits:s}=await g(y,d);p.insertAdjacentHTML("beforeend",h(s)),v.refresh();const o=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"}),document.querySelectorAll(".gallery-item").length>=u?(a.style.display="none",l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):a.style.display="block"}catch{l.error({message:"Failed to load more images.",position:"topRight",...f})}finally{c.style.display="none"}});
//# sourceMappingURL=index.js.map
