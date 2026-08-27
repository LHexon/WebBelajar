let currentMap, miniMap, markers=[];
const data=[
 {name:"Plastic Care Jakarta",city:"Jakarta",lat:-6.2,lng:106.82,risk:"high",banks:198},
 {name:"Bank Sampah Hijau Lestari",city:"Bandung",lat:-6.91,lng:107.61,risk:"low",banks:382},
 {name:"Eco Point Surabaya",city:"Surabaya",lat:-7.25,lng:112.75,risk:"high",banks:274},
 {name:"Bank Sampah Berseri",city:"Semarang",lat:-6.97,lng:110.42,risk:"mid",banks:226},
 {name:"Eco Bali",city:"Denpasar",lat:-8.65,lng:115.22,risk:"mid",banks:117},
 {name:"Makassar Green Bank",city:"Makassar",lat:-5.14,lng:119.41,risk:"mid",banks:91},
 {name:"Medan Bersih",city:"Medan",lat:3.59,lng:98.67,risk:"low",banks:74},
 {name:"Pontianak Eco",city:"Pontianak",lat:-0.03,lng:109.34,risk:"high",banks:52}
];
function go(page){location.hash=page}
function showPage(){
 let p=location.hash.replace("#","")||"home";
 document.querySelectorAll(".page").forEach(x=>x.classList.toggle("active",x.id===p));
 document.querySelectorAll("nav a").forEach(x=>x.classList.toggle("active",x.dataset.page===p));
 if(p==="map"){setTimeout(initMainMap,80)}
 if(p==="dashboard"){setTimeout(drawChart,80)}
}
window.addEventListener("hashchange",showPage); showPage();
document.getElementById("date").textContent=new Date().toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"short",year:"numeric"});
setTimeout(()=>{document.getElementById("splash").style.opacity="0";setTimeout(()=>document.getElementById("splash").remove(),600)},1500);
document.getElementById("hamb").onclick=()=>document.querySelector(".sidebar").classList.toggle("open");

function markerColor(r){return r==="high"?"#df6b64":r==="mid"?"#e4b94e":"#54b879"}
function addMarkers(map){
 data.forEach(x=>{
  const m=L.circleMarker([x.lat,x.lng],{radius:9,fillColor:markerColor(x.risk),color:"#fff",weight:2,fillOpacity:.9});
  m.bindPopup(`<b>${x.name}</b><br>${x.city}<br>Risiko: <b>${x.risk==="high"?"Tinggi":x.risk==="mid"?"Sedang":"Rendah"}</b><br>${x.banks} bank sampah terdata`);
  m.addTo(map); markers.push({m,r:x.risk});
 });
}
function initMainMap(){
 if(currentMap)return;
 currentMap=L.map("mainMap").setView([-2.5,118],4.3);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(currentMap);
 addMarkers(currentMap);
 document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".filters button").forEach(q=>q.classList.remove("active"));b.classList.add("active");
  let r=b.dataset.risk;markers.forEach(o=>o.m.setStyle({opacity:r==="all"||o.r===r?1:0,fillOpacity:r==="all"||o.r===r?.9:0}));
 });
}
miniMap=L.map("miniMap",{zoomControl:false,attributionControl:false}).setView([-2.5,118],4);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(miniMap);addMarkers(miniMap);

function drawChart(){
 const c=document.getElementById("chart");if(!c)return;const ctx=c.getContext("2d"),d=[142,166,181,194,202,218,225,231,246,258,271,288],labels=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
 c.width=c.clientWidth*2;c.height=270*2;ctx.scale(2,2);let w=c.clientWidth,h=270,p=35;ctx.font="11px DM Sans";ctx.fillStyle="#80938b";ctx.strokeStyle="#e6eee9";
 for(let i=0;i<5;i++){let y=35+i*48;ctx.beginPath();ctx.moveTo(p,y);ctx.lineTo(w-15,y);ctx.stroke()}
 let max=300;d.forEach((v,i)=>{let x=p+i*((w-p-20)/(d.length-1)),y=235-(v/max*190);ctx.fillStyle="#16845b";ctx.beginPath();ctx.roundRect(x-7,y,14,235-y,7);ctx.fill();ctx.fillStyle="#80938b";ctx.fillText(labels[i],x-9,257)});
}
function downloadReport(){
 const rows=[["Provinsi","Bank Sampah","Plastik/Bulan","Status"],["Jawa Barat",382,"486 ton","Aktif"],["Jawa Timur",274,"391 ton","Aktif"],["DKI Jakarta",198,"315 ton","Aktif"],["Jawa Tengah",226,"288 ton","Aktif"],["Bali",117,"142 ton","Pantau"]];
 const csv=rows.map(r=>r.join(",")).join("\\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="plasticbank-laporan.csv";a.click();
}
function openReport(){document.getElementById("modal").classList.add("show")}
function closeReport(){document.getElementById("modal").classList.remove("show")}
function submitReport(){
 const loc=document.getElementById("rLocation").value.trim();if(!loc)return alert("Isi lokasi terlebih dahulu.");
 alert("Laporan berhasil dibuat (demo). Terima kasih sudah ikut menjaga lingkungan.");closeReport();
}
document.getElementById("filter").onchange=function(){let v=this.value;document.querySelectorAll("#reports tbody tr").forEach(tr=>{tr.style.display=v==="Semua status"||tr.innerText.includes(v)?"":"none"})};
document.getElementById("search").oninput=function(){let q=this.value.toLowerCase();document.querySelectorAll(".page.active table tbody tr").forEach(tr=>tr.style.display=tr.innerText.toLowerCase().includes(q)?"":"none")};
