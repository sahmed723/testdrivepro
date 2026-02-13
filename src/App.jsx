import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const LOGO_B64 = "data:image/png;base64,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";

// ═══ SVG ICONS (professional, no emojis) ═══
const I = {
  car:     (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14v-5l-2-5H7l-2 5v5z"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/><path d="M5 12h14"/></svg>,
  clock:   (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  check:   (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  shield:  (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l7 4v5c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V6l7-4z"/></svg>,
  pen:     (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  chart:   (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
  send:    (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  users:   (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  user:    (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  tag:     (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1"/></svg>,
  home:    (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg>,
  plus:    (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  cal:     (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  trend:   (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>,
  mail:    (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>,
  alert:   (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>,
  dollar:  (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  x:       (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  cam:     (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  grid:    (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  arrow:   (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  dot:     (c="#30d158",s=8) => <svg width={s} height={s}><circle cx={s/2} cy={s/2} r={s/2} fill={c}/></svg>,
  link:    (c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  hourglass:(c="#fff",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h12M6 22h12M6 2v6l6 4-6 4v6M18 2v6l-6 4 6 4v6"/></svg>,
};

// ═══ INVENTORY with days on lot ═══
const INVENTORY = [
  { id:1, year:2015, make:"Acura", model:"ILX", trim:"4dr Sedan 2.0L", price:11997, miles:110665, vin:"19VDE1F32FE008412", stock:"FE008412", color:"Silver Moon Metallic", engine:"2.0L 4 Cyl", img:"https://cdn.ebizautos.media/used-2015-acura-ilx-4drsedan20l-14370-22972601-1-400.jpg", status:"available", daysOnLot:92 },
  { id:2, year:2015, make:"Audi", model:"A3", trim:"1.8T Premium FWD", price:8497, miles:126143, vin:"WAUACGFF5F1001788", stock:"F1001788", color:"Glacier White Metallic", engine:"1.8L 4 Cyl", img:"https://cdn.ebizautos.media/used-2015-audi-a3-4drsedanfwd18tpremium-14370-22961399-1-400.jpg", status:"available", daysOnLot:118 },
  { id:3, year:2017, make:"Audi", model:"A4", trim:"Premium Plus quattro", price:15997, miles:82158, vin:"WAUENAF41HN068262", stock:"HN068262", color:"Moonlight Blue", engine:"2.0L 4 Cyl", img:"https://cdn.ebizautos.media/used-2017-audi-a4-20tfsiautomaticpremiumplusquattroawd-14370-22958420-1-400.jpg", status:"available", daysOnLot:45 },
  { id:4, year:2017, make:"Audi", model:"A4", trim:"Premium quattro AWD", price:18997, miles:24763, vin:"WAUANAF46HN022571", stock:"HN022571", color:"Scuba Blue Metallic", engine:"2.0L 4 Cyl", img:"https://cdn.ebizautos.media/used-2017-audi-a4-20tfsiautomaticpremiumquattroawd-14370-22873107-1-400.jpg", status:"available", daysOnLot:12 },
  { id:5, year:2008, make:"Audi", model:"A4", trim:"2.0T Avant quattro", price:5997, miles:145867, vin:"WAUKF78EX8A042100", stock:"8A042100", color:"Brilliant Black", engine:"2.0L 4 Cyl", img:"https://cdn.ebizautos.media/used-2008-audi-a4-20tavantquattro-14370-22930213-1-400.jpg", status:"available", daysOnLot:156 },
  { id:6, year:2013, make:"Audi", model:"A7", trim:"3.0 Premium Plus", price:15997, miles:87054, vin:"WAUYGAFC4DN057989", stock:"DN057989", color:"Moonlight Blue", engine:"3.0L V6", img:"https://cdn.ebizautos.media/used-2013-audi-a7-4drhatchbackquattro30premiumplus-14370-22927573-1-400.jpg", status:"available", daysOnLot:78 },
  { id:7, year:2023, make:"Ford", model:"Bronco", trim:"Black Diamond 4x4", price:40997, miles:18200, vin:"1FMDE5CP3PLA96073", stock:"PLA96073", color:"Cactus Gray", engine:"2.3L Turbo", img:null, status:"available", daysOnLot:22 },
  { id:8, year:2023, make:"Porsche", model:"Cayenne", trim:"Turbo", price:75997, miles:9100, vin:"WP1AF2AY2PDA20481", stock:"PDA20481", color:"Carrara White", engine:"4.0L V8 TT", img:null, status:"available", daysOnLot:8 },
  { id:9, year:2023, make:"Land Rover", model:"Range Rover", trim:"Autobiography SWB", price:107997, miles:12400, vin:"SALK19E71PA088506", stock:"PA088506", color:"Santorini Black", engine:"4.4L V8 TT", img:null, status:"available", daysOnLot:34 },
  { id:10, year:2019, make:"BMW", model:"8 Series", trim:"M850i xDrive", price:42997, miles:34500, vin:"WBABC4C5XKBJ35568", stock:"KBJ35568", color:"Barcelona Blue", engine:"4.4L V8 TT", img:null, status:"available", daysOnLot:67 },
  { id:11, year:2018, make:"Lamborghini", model:"Huracan", trim:"LP 580-2", price:185997, miles:22100, vin:"ZHWUC2ZF7JLA09526", stock:"JLA09526", color:"Giallo Majo", engine:"5.2L V10", img:null, status:"available", daysOnLot:41 },
  { id:12, year:2022, make:"Honda", model:"Accord Hybrid", trim:"Sport", price:17997, miles:28700, vin:"1HGCV3F20NA001483", stock:"NA001483", color:"Platinum White", engine:"2.0L Hybrid", img:null, status:"available", daysOnLot:5 },
  { id:13, year:2020, make:"Chevrolet", model:"Malibu", trim:"LT Sunroof", price:10997, miles:52000, vin:"1G1ZD5ST6LF091057", stock:"LF091057", color:"Shadow Gray", engine:"1.5L Turbo", img:null, status:"available", daysOnLot:103 },
  { id:14, year:2017, make:"Ram", model:"1500", trim:"Big Horn 4x4", price:15997, miles:68400, vin:"1C6RR7LT5HS844246", stock:"HS844246", color:"Bright White", engine:"5.7L V8 HEMI", img:null, status:"available", daysOnLot:88 },
];

const USERS = {
  admin: { email:"bilal@magnetismmotors.com", password:"admin123", name:"Bilal Ahmed", role:"admin", initials:"BA" },
  manager: { email:"mike@magnetismmotors.com", password:"manager123", name:"Mike Graham", role:"manager", initials:"MG" },
  sales: { email:"shafay@magnetismmotors.com", password:"sales123", name:"Shafay Ahmed", role:"salesperson", initials:"SA" },
};
const SP = [
  { id:1, name:"Shafay Ahmed", initials:"SA", active:true },
  { id:2, name:"Sarah Chen", initials:"SC", active:true },
  { id:3, name:"Devon Williams", initials:"DW", active:true },
  { id:4, name:"Aaliyah Patel", initials:"AP", active:false },
];

function genHistory() {
  const names = ["James Mitchell","Linda Tran","Robert Garcia","Patricia Okafor","David Kim","Angela Thompson","Marcus Johnson","Yuki Tanaka","Elena Rodriguez","Samuel Osei","Priya Sharma","Carlos Mendez","Naomi Wells","Brian Foster","Diana Park","Victor Huang","Rachel Adams","Omar Hassan","Tiffany Cole","Anthony Reeves","Maria Lopez","Kevin Nguyen","Jasmine Taylor","Derek Stone","Alicia Brown","Nathan Scott","Brianna White","Isaiah Moore"];
  const phones = names.map((_,i) => `(${["404","678","770"][i%3]}) 555-${String(100+i).padStart(4,"0")}`);
  const drives = []; let id = 1;
  for (let d = 30; d >= 0; d--) {
    const date = new Date(); date.setDate(date.getDate() - d);
    const ds = date.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
    const count = d === 0 ? 2 : Math.floor(Math.random()*4)+1;
    for (let j = 0; j < count; j++) {
      const ni = (id-1)%names.length, vi = ((id*7)%INVENTORY.length), si = (id%4)+1;
      const sp = SP.find(s=>s.id===si)||SP[0], v = INVENTORY[vi];
      const hr = 9+Math.floor(Math.random()*7), mn = Math.floor(Math.random()*4)*15;
      const timeIn = `${hr>12?hr-12:hr}:${String(mn).padStart(2,"0")} ${hr>=12?"PM":"AM"}`;
      const isActive = d===0 && j===count-1;
      const outMn = mn+20+Math.floor(Math.random()*25);
      const timeOut = isActive?null:`${hr>12?hr-12:hr}:${String(outMn%60).padStart(2,"0")} ${hr>=12?"PM":"AM"}`;
      const outcome = isActive?null:(Math.random()>0.78?"sold":(Math.random()>0.3?"not_sold":null));
      const startTs = isActive?Date.now()-Math.floor(Math.random()*45+5)*60000:null;
      drives.push({ id:id++,customer:names[ni],phone:phones[ni],vehicle:`${v.year} ${v.make} ${v.model}`,vehicleId:v.id,salesperson:sp.name,salesId:sp.id,timeIn,timeOut,date:ds,status:isActive?"active":"completed",idVerified:true,adfSent:Math.random()>0.08,signed:true,signedAt:ds,outcome,startTimestamp:startTs });
    }
  }
  return drives;
}

const fmt = p => p?"$"+p.toLocaleString():"Call";
const dolAge = d => d>=90?C.red:d>=60?"#ff9f0a":d>=30?C.accent:C.green;
const dolLabel = d => d>=90?"Critical":d>=60?"Aging":d>=30?"Watch":"Fresh";

const C = {
  bg:"#050507", surface:"#0c0c10", surfaceLight:"#141418", border:"rgba(255,255,255,0.06)",
  borderLight:"rgba(255,255,255,0.1)", text:"#f5f5f7", textMuted:"#8e8e93", textDim:"#555",
  accent:"#c94050", accentHover:"#b3384a", accentLight:"#d4606e", green:"#30d158", red:"#ff453a", blue:"#0a84ff", purple:"#bf5af2", amber:"#ff9f0a",
  glass:{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14 },
  gradText:{ background:"linear-gradient(135deg, #c94050, #e8788a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
};

function Badge({children,color=C.accent,sm}) {
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:sm?"2px 8px":"4px 12px",borderRadius:100,fontSize:sm?10:11,fontWeight:600,letterSpacing:0.3,textTransform:"uppercase",background:color+"14",color,border:`1px solid ${color}28`}}>{children}</span>;
}
function Num({end,prefix="",suffix=""}) {
  const [v,setV]=useState(0);
  useEffect(()=>{let s=0;const step=Math.max(end/60,1);const t=setInterval(()=>{s+=step;if(s>=end){setV(end);clearInterval(t);}else setV(Math.floor(s));},16);return()=>clearInterval(t);},[end]);
  return <span>{prefix}{v.toLocaleString()}{suffix}</span>;
}
function Stat({label,value,prefix,suffix,color=C.accent,icon}) {
  return <div style={{...C.glass,padding:"22px 24px",flex:1,minWidth:160}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:11,color:C.textMuted,textTransform:"uppercase",letterSpacing:1.2,fontWeight:600}}>{label}</div>{icon&&<span style={{opacity:0.5}}>{icon}</span>}</div><div style={{fontSize:32,fontWeight:700,color,marginTop:10,lineHeight:1}}><Num end={value} prefix={prefix||""} suffix={suffix||""}/></div></div>;
}
function Logo({size=32}) {
  return <img src={LOGO_B64} alt="TDP" style={{width:size,height:size,borderRadius:size*0.25,objectFit:"cover"}}/>;
}

// ═══ LIVE TIMER ═══
function LiveTimer({startTimestamp}) {
  const [elapsed,setElapsed]=useState(0);
  useEffect(()=>{if(!startTimestamp)return;const tick=()=>setElapsed(Math.floor((Date.now()-startTimestamp)/1000));tick();const id=setInterval(tick,1000);return()=>clearInterval(id);},[startTimestamp]);
  const hrs=Math.floor(elapsed/3600),mins=Math.floor((elapsed%3600)/60),secs=elapsed%60;
  const display=hrs>0?`${hrs}h ${String(mins).padStart(2,"0")}m ${String(secs).padStart(2,"0")}s`:`${mins}m ${String(secs).padStart(2,"0")}s`;
  const color=elapsed>45*60?C.red:elapsed>30*60?"#ff9f0a":C.green;
  return <span style={{fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:15,color,letterSpacing:0.5}}>{display}</span>;
}

// ═══ EMAIL ALERT TOAST ═══
function AlertToast({alerts,onDismiss}) {
  if(!alerts.length) return null;
  return <div style={{position:"fixed",top:16,right:16,zIndex:999,display:"flex",flexDirection:"column",gap:8,maxWidth:400}}>
    {alerts.map((a,i)=><div key={i} style={{background:"#1a1a1e",border:`1px solid ${C.amber}44`,borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"flex-start",gap:12,boxShadow:`0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${C.amber}22`}}>
      <div style={{marginTop:2}}>{I.mail(C.amber,18)}</div>
      <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:C.amber,marginBottom:2}}>Alert Sent</div><div style={{fontSize:12,color:C.textMuted,lineHeight:1.4}}>{a}</div></div>
      <button onClick={()=>onDismiss(i)} style={{background:"none",border:"none",cursor:"pointer",padding:2}}>{I.x(C.textDim,14)}</button>
    </div>)}
  </div>;
}

// ═══ LIVE DASHBOARD ═══
function LiveDashboard({td,setTD}) {
  const active=td.filter(t=>t.status==="active");
  const todayStr=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  const completed=td.filter(t=>t.status==="completed"&&t.date===todayStr);
  const parseT=(ts)=>{const p=ts?.match(/(\d+):(\d+)\s*(AM|PM)/i);if(!p)return 0;let h=parseInt(p[1]);const m=parseInt(p[2]);if(p[3].toUpperCase()==="PM"&&h<12)h+=12;if(p[3].toUpperCase()==="AM"&&h===12)h=0;return h*60+m;};
  const validCompleted=completed.filter(t=>t.timeOut);
  const avgMins=validCompleted.length>0?Math.round(validCompleted.reduce((s,t)=>s+(parseT(t.timeOut)-parseT(t.timeIn)),0)/validCompleted.length):0;
  const markReturn=(id)=>{setTD(p=>p.map(t=>t.id===id?{...t,status:"completed",timeOut:new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:true}),startTimestamp:null}:t));};

  return <div>
    <h1 style={{fontSize:26,fontWeight:700,margin:"0 0 4px"}}>Live Dashboard</h1>
    <p style={{color:C.textDim,fontSize:13,margin:"0 0 24px"}}>Real-time test drive tracking</p>
    <div style={{display:"flex",gap:14,marginBottom:24,flexWrap:"wrap"}}>
      <Stat label="Currently Out" value={active.length} color={C.green} icon={I.dot(C.green,10)}/><Stat label="Returned Today" value={completed.length} icon={I.check(C.textDim,16)}/><Stat label="Avg Duration" value={avgMins} suffix=" min" color={C.blue} icon={I.clock(C.textDim,16)}/>
    </div>

    {active.length>0?<div style={{marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><div style={{width:10,height:10,borderRadius:"50%",background:C.green,boxShadow:`0 0 10px ${C.green}`,animation:"pulse 2s infinite"}}/><span style={{fontWeight:700,fontSize:16}}>Active Test Drives</span><span style={{fontSize:12,color:C.textMuted}}>({active.length})</span></div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      {active.map(t=>{const veh=INVENTORY.find(v=>v.id===t.vehicleId);const aged=veh&&veh.daysOnLot>=60;return <div key={t.id} style={{...C.glass,padding:"20px 24px",marginBottom:10,borderLeft:`3px solid ${t.startTimestamp&&(Date.now()-t.startTimestamp)>45*60000?C.red:(Date.now()-t.startTimestamp)>30*60000?"#ff9f0a":C.green}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.car(C.text,20)}</div>
            <div><div style={{fontWeight:700,fontSize:15}}>{t.customer}</div><div style={{fontSize:12,color:C.textMuted}}>{t.phone}</div></div>
          </div>
          <div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.textDim,marginBottom:2,textTransform:"uppercase",letterSpacing:1,fontWeight:600}}>Elapsed</div>{t.startTimestamp?<LiveTimer startTimestamp={t.startTimestamp}/>:<span style={{color:C.green,fontWeight:600}}>Out since {t.timeIn}</span>}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",gap:16,fontSize:12,flexWrap:"wrap"}}>
            <span><span style={{color:C.textDim}}>Vehicle:</span> <span style={{fontWeight:600}}>{t.vehicle}</span></span>
            <span><span style={{color:C.textDim}}>Sales:</span> <span style={{fontWeight:600}}>{t.salesperson}</span></span>
            {veh&&<span style={{display:"flex",alignItems:"center",gap:4}}><span style={{color:C.textDim}}>DOL:</span> <span style={{fontWeight:700,color:dolAge(veh.daysOnLot)}}>{veh.daysOnLot}d</span></span>}
            {aged&&<Badge color={C.amber} sm>{I.mail(C.amber,10)} Alert Sent</Badge>}
          </div>
          <button onClick={()=>markReturn(t.id)} style={{padding:"8px 20px",borderRadius:8,background:C.accent,border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif",whiteSpace:"nowrap"}}>Mark Returned</button>
        </div>
      </div>;})}
    </div>:<div style={{...C.glass,padding:40,textAlign:"center",marginBottom:24}}><div style={{marginBottom:8,opacity:0.4}}>{I.check(C.green,32)}</div><div style={{fontWeight:600}}>No vehicles currently out</div><div style={{fontSize:13,color:C.textMuted,marginTop:4}}>All test drives have been returned</div></div>}

    {validCompleted.length>0&&<div>
      <h2 style={{fontSize:16,fontWeight:700,margin:"0 0 12px"}}>Returned Today</h2>
      <div style={{...C.glass,padding:16,overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
          {["Customer","Vehicle","Salesperson","Out","Back","Duration","Outcome"].map(h=><th key={h} style={{textAlign:"left",padding:"10px 12px",color:C.textDim,fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>{h}</th>)}
        </tr></thead>
        <tbody>{validCompleted.map(t=>{const dur=parseT(t.timeOut)-parseT(t.timeIn);return <tr key={t.id} style={{borderBottom:`1px solid ${C.border}`}}>
          <td style={{padding:12,fontWeight:600}}>{t.customer}</td>
          <td style={{padding:12,color:C.textMuted}}>{t.vehicle}</td>
          <td style={{padding:12,color:C.textMuted}}>{t.salesperson}</td>
          <td style={{padding:12,color:C.textMuted}}>{t.timeIn}</td>
          <td style={{padding:12,color:C.textMuted}}>{t.timeOut}</td>
          <td style={{padding:12,fontWeight:600,color:dur>30?C.red:C.green}}>{dur} min</td>
          <td style={{padding:12}}>{t.outcome==="sold"?<Badge color={C.green} sm>Sold</Badge>:t.outcome==="not_sold"?<Badge color={C.textDim} sm>No Sale</Badge>:<Badge color={C.accent} sm>Pending</Badge>}</td>
        </tr>;})}
        </tbody>
      </table></div>
    </div>}
  </div>;
}

// ═══ SIGNATURE PAD ═══
function SignaturePad({onSign}) {
  const ref=useRef(null);const [drawing,setDrawing]=useState(false);const [drawn,setDrawn]=useState(false);
  const pos=e=>{const r=ref.current.getBoundingClientRect();const cx=e.touches?e.touches[0].clientX:e.clientX;const cy=e.touches?e.touches[0].clientY:e.clientY;return{x:cx-r.left,y:cy-r.top};};
  const start=e=>{e.preventDefault();const c=ref.current.getContext("2d");const p=pos(e);c.beginPath();c.moveTo(p.x,p.y);setDrawing(true);};
  const move=e=>{if(!drawing)return;e.preventDefault();const c=ref.current.getContext("2d");const p=pos(e);c.lineTo(p.x,p.y);c.strokeStyle="#c94050";c.lineWidth=2.5;c.lineCap="round";c.stroke();setDrawn(true);};
  const end=()=>setDrawing(false);
  const clear=()=>{ref.current.getContext("2d").clearRect(0,0,520,140);setDrawn(false);};
  return <div><div style={{border:`2px solid ${drawn?C.green+"44":C.border}`,borderRadius:12,overflow:"hidden",background:"#0a0a0f",position:"relative"}}>
    <canvas ref={ref} width={520} height={140} style={{display:"block",width:"100%",cursor:"crosshair",touchAction:"none"}} onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end} onTouchStart={start} onTouchMove={move} onTouchEnd={end}/>
    {!drawn&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",color:C.textDim,fontSize:14}}>Sign here</div>}
  </div><div style={{display:"flex",gap:10,marginTop:10,justifyContent:"flex-end"}}>
    <button onClick={clear} style={{padding:"8px 20px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",color:C.textMuted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Clear</button>
    {drawn&&<button onClick={()=>onSign(ref.current.toDataURL())} style={{padding:"8px 24px",borderRadius:8,background:C.green,border:"none",color:C.bg,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Confirm Signature</button>}
  </div></div>;
}

function LicenseUpload({label,subtitle,onUpload,preview}) {
  const r=useRef(null);
  const h=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=ev=>onUpload(ev.target.result);rd.readAsDataURL(f);};
  return <div onClick={()=>r.current.click()} style={{border:`2px dashed ${preview?C.green+"44":C.accent+"33"}`,borderRadius:14,padding:preview?8:32,cursor:"pointer",background:preview?C.green+"04":C.accent+"04",textAlign:"center"}}>
    <input ref={r} type="file" accept="image/*" capture="environment" onChange={h} style={{display:"none"}}/>
    {preview?<div style={{position:"relative"}}><img src={preview} alt={label} style={{width:"100%",maxHeight:180,objectFit:"contain",borderRadius:8}}/><div style={{position:"absolute",top:8,right:8}}><Badge color={C.green} sm>Uploaded</Badge></div></div>:
    <><div style={{marginBottom:6,opacity:0.6}}>{I.cam(C.accent,28)}</div><div style={{fontWeight:600,fontSize:14,color:C.text}}>{label}</div><div style={{fontSize:12,color:C.textMuted,marginTop:4}}>{subtitle}</div></>}
  </div>;
}

// ═══ LANDING ═══
function LandingPage({onLogin}) {
  const [vis,setVis]=useState(false);useEffect(()=>{setTimeout(()=>setVis(true),50);},[]);
  const partners=[
    {name:"DriveCentric",abbr:"DC",color:"#4F8EF7",desc:"CRM"},
    {name:"CDK Global",abbr:"CDK",color:"#00A551",desc:"DMS"},
    {name:"DealerSocket",abbr:"DS",color:"#FF6B35",desc:"CRM"},
    {name:"RouteOne",abbr:"R1",color:"#1E3A5F",desc:"Finance"},
    {name:"vAuto",abbr:"vA",color:"#E31837",desc:"Inventory"},
    {name:"IDScan.net",abbr:"ID",color:"#0073CF",desc:"Identity"},
    {name:"Tekion",abbr:"TK",color:"#6C5CE7",desc:"DMS"},
    {name:"Reynolds & Reynolds",abbr:"R&R",color:"#2D3436",desc:"DMS"},
  ];
  return <div style={{background:C.bg,color:C.text,fontFamily:"'Outfit',sans-serif",minHeight:"100vh"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 48px",height:72,display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(5,5,7,0.7)",backdropFilter:"blur(24px)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}><Logo size={36}/><span style={{fontSize:18,fontWeight:600}}>Test Drive Pro</span></div>
      <button onClick={onLogin} style={{padding:"10px 28px",borderRadius:100,background:C.text,border:"none",color:C.bg,fontWeight:600,fontSize:13,cursor:"pointer"}}>Sign In</button>
    </nav>
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"140px 48px 80px",position:"relative"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,64,80,0.06), transparent 60%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:800,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(40px)",transition:"all 1s cubic-bezier(0.16,1,0.3,1)"}}>
        <h1 style={{fontSize:"clamp(52px,7vw,84px)",fontWeight:700,lineHeight:0.95,letterSpacing:-3,margin:0}}>Know every car<br/><span style={{...C.gradText}}>on every drive.</span></h1>
      </div>
      <p style={{fontSize:18,color:C.textMuted,lineHeight:1.65,marginTop:28,maxWidth:520,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(40px)",transition:"all 1s cubic-bezier(0.16,1,0.3,1) 0.15s"}}>Verify customer identity, capture digital agreements, track every test drive in real time, and push leads to your CRM — all from your team's phone.</p>
      <div style={{display:"flex",gap:14,marginTop:44,opacity:vis?1:0,transition:"all 1s ease 0.3s"}}>
        <button onClick={onLogin} style={{padding:"16px 40px",borderRadius:100,background:C.text,border:"none",color:C.bg,fontWeight:600,fontSize:15,cursor:"pointer"}}>Get Started</button>
      </div>
    </section>
    <section style={{padding:"80px 48px",borderTop:`1px solid ${C.border}`}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{fontSize:12,color:C.accent,textTransform:"uppercase",letterSpacing:2,fontWeight:600,marginBottom:12}}>Features</div>
        <h2 style={{fontSize:42,fontWeight:700,letterSpacing:-1.5,margin:"0 0 48px"}}>Everything your floor team needs</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:C.border,borderRadius:18,overflow:"hidden"}}>
          {[{icon:I.shield(C.accent,24),t:"Identity Verification",d:"Upload license photos and verify through IDScan.net DIVE API."},{icon:I.clock(C.accent,24),t:"Time In / Time Out",d:"Real-time tracking with live elapsed timers and aging alerts."},{icon:I.pen(C.accent,24),t:"Digital Agreements",d:"Customers sign on-device with full SMS consent. Stored securely."},{icon:I.car(C.accent,24),t:"Inventory Sync",d:"Live inventory with days-on-lot aging and priority alerts."},{icon:I.chart(C.accent,24),t:"Full Analytics",d:"30-day history, performance metrics, customer database, close rates."},{icon:I.send(C.accent,24),t:"ADF/XML CRM Push",d:"Every lead pushed in standard ADF format to your DMS."}].map((f,i)=>
            <div key={i} style={{background:C.surface,padding:"36px 32px",transition:"background 0.3s"}} onMouseEnter={e=>e.currentTarget.style.background=C.surfaceLight} onMouseLeave={e=>e.currentTarget.style.background=C.surface}>
              <div style={{marginBottom:14}}>{f.icon}</div><h3 style={{fontSize:17,fontWeight:600,margin:"0 0 6px"}}>{f.t}</h3><p style={{fontSize:13,color:C.textMuted,lineHeight:1.6,margin:0}}>{f.d}</p>
            </div>)}
        </div>
      </div>
    </section>
    <section style={{padding:"60px 48px 80px",borderTop:`1px solid ${C.border}`}}>
      <div style={{maxWidth:1200,margin:"0 auto",textAlign:"center"}}>
        <div style={{fontSize:12,color:C.textDim,textTransform:"uppercase",letterSpacing:2,fontWeight:600,marginBottom:16}}>Integrations & Partners</div>
        <h2 style={{fontSize:32,fontWeight:700,letterSpacing:-1,margin:"0 0 40px"}}>Connects with your existing tools</h2>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:36,flexWrap:"wrap"}}>
          {partners.map(p=><div key={p.name} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,opacity:0.6,transition:"all 0.3s",cursor:"default"}} onMouseEnter={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.opacity="0.6";e.currentTarget.style.transform="translateY(0)";}}>
            <div style={{width:64,height:64,borderRadius:16,background:`${p.color}12`,border:`1px solid ${p.color}22`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:p.abbr.length>2?14:18,fontWeight:800,color:p.color,letterSpacing:-0.5}}>{p.abbr}</span>
            </div>
            <div style={{textAlign:"center"}}><div style={{fontSize:12,color:C.text,fontWeight:600}}>{p.name}</div><div style={{fontSize:10,color:C.textDim}}>{p.desc}</div></div>
          </div>)}
        </div>
      </div>
    </section>
    <section style={{padding:"60px 48px 80px",textAlign:"center",borderTop:`1px solid ${C.border}`}}>
      <h2 style={{fontSize:42,fontWeight:700,letterSpacing:-1.5,margin:"0 0 40px"}}>Ready to know where every key is?</h2>
      <button onClick={onLogin} style={{padding:"18px 56px",borderRadius:100,background:C.text,border:"none",color:C.bg,fontWeight:600,fontSize:16,cursor:"pointer"}}>Sign In to Demo</button>
    </section>
  </div>;
}

// ═══ LOGIN ═══
function LoginPage({onLogin,onBack}) {
  const [email,setEmail]=useState("");const [pass,setPass]=useState("");const [error,setError]=useState("");const [loading,setLoading]=useState(false);
  const submit=()=>{setError("");setLoading(true);setTimeout(()=>{const f=Object.values(USERS).find(u=>u.email===email&&u.password===pass);if(f)onLogin(f);else{setError("Invalid credentials");setLoading(false);}},800);};
  const inp={width:"100%",padding:"14px 16px",borderRadius:12,border:`1px solid ${C.border}`,background:"rgba(255,255,255,0.04)",color:C.text,fontSize:14,fontFamily:"'Outfit',sans-serif",outline:"none",boxSizing:"border-box"};
  return <div style={{background:C.bg,color:C.text,fontFamily:"'Outfit',sans-serif",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
    <div style={{width:400}}>
      <div style={{textAlign:"center",marginBottom:40}}><Logo size={52}/><h1 style={{fontSize:26,fontWeight:700,margin:"16px 0 6px"}}>Sign in to Test Drive Pro</h1><p style={{color:C.textMuted,fontSize:14,margin:0}}>Magnetism Motors — Lawrenceville, GA</p></div>
      <div style={{...C.glass,padding:32}}>
        <div style={{marginBottom:18}}><label style={{fontSize:12,color:C.textMuted,fontWeight:600,marginBottom:6,display:"block",textTransform:"uppercase",letterSpacing:0.8}}>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@magnetismmotors.com" style={inp}/></div>
        <div style={{marginBottom:24}}><label style={{fontSize:12,color:C.textMuted,fontWeight:600,marginBottom:6,display:"block",textTransform:"uppercase",letterSpacing:0.8}}>Password</label><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={inp} onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
        {error&&<div style={{padding:"10px 14px",borderRadius:10,background:C.red+"14",color:C.red,fontSize:13,marginBottom:18,display:"flex",alignItems:"center",gap:8}}>{I.alert(C.red,14)} {error}</div>}
        <button onClick={submit} disabled={loading} style={{width:"100%",padding:"14px",borderRadius:12,background:`linear-gradient(135deg,${C.accent},${C.accentHover})`,border:"none",color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer"}}>{loading?"Signing in...":"Sign In"}</button>
      </div>
      <div style={{marginTop:24,padding:"20px 24px",borderRadius:14,background:"rgba(255,255,255,0.02)",border:`1px solid ${C.border}`}}>
        <div style={{fontSize:11,color:C.textDim,textTransform:"uppercase",letterSpacing:1,fontWeight:600,marginBottom:12}}>Quick Access</div>
        {[{l:"Owner",e:"bilal@magnetismmotors.com",p:"admin123",c:C.accent},{l:"Manager",e:"mike@magnetismmotors.com",p:"manager123",c:C.blue},{l:"Sales",e:"shafay@magnetismmotors.com",p:"sales123",c:C.green}].map(q=>
          <button key={q.l} onClick={()=>{setEmail(q.e);setPass(q.p);}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"10px 12px",borderRadius:10,border:"none",background:"transparent",color:C.textMuted,fontSize:13,cursor:"pointer",textAlign:"left",marginBottom:4,fontFamily:"'Outfit',sans-serif"}}><span><span style={{color:q.c,fontWeight:600}}>{q.l}</span> — {q.e}</span><span style={{opacity:0.3}}>{I.arrow(C.textDim,14)}</span></button>
        )}
      </div>
      <button onClick={onBack} style={{display:"block",margin:"24px auto 0",background:"none",border:"none",color:C.textDim,fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Back</button>
    </div>
  </div>;
}

// ═══ APP SHELL ═══
function Shell({user,onLogout,children,nav,active,setView}) {
  const rc={admin:C.accent,manager:C.blue,salesperson:C.green}[user.role];
  return <div style={{background:C.bg,color:C.text,fontFamily:"'Outfit',sans-serif",minHeight:"100vh",display:"flex"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
    <aside style={{width:232,background:C.surface,borderRight:`1px solid ${C.border}`,padding:"20px 14px",display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,height:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"4px 8px",marginBottom:24}}><Logo size={32}/><div><div style={{fontSize:14,fontWeight:600,lineHeight:1}}>Test Drive Pro</div><div style={{fontSize:10,color:C.textDim,marginTop:1}}>Magnetism Motors</div></div></div>
      <div style={{padding:"4px 8px",marginBottom:16}}><Badge color={rc}>{user.role==="salesperson"?"Sales":user.role}</Badge></div>
      <div style={{flex:1,display:"flex",flexDirection:"column",gap:2}}>
        {nav.map(n=><button key={n.id} onClick={()=>setView(n.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,border:"none",background:active===n.id?"rgba(255,255,255,0.06)":"transparent",color:active===n.id?C.text:C.textMuted,fontSize:13,fontWeight:active===n.id?600:500,cursor:"pointer",textAlign:"left",width:"100%",fontFamily:"'Outfit',sans-serif"}}><span style={{width:20,display:"flex",justifyContent:"center"}}>{n.icon}</span>{n.label}</button>)}
      </div>
      <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px",marginBottom:8}}>
          <div style={{width:34,height:34,borderRadius:10,background:rc+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:rc}}>{user.initials}</div>
          <div><div style={{fontSize:13,fontWeight:600}}>{user.name}</div><div style={{fontSize:10,color:C.textDim,textTransform:"capitalize"}}>{user.role}</div></div>
        </div>
        <button onClick={onLogout} style={{width:"100%",padding:"8px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",color:C.textMuted,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}} onMouseEnter={e=>{e.target.style.background=C.red+"14";e.target.style.color=C.red;}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=C.textMuted;}}>Sign Out</button>
      </div>
    </aside>
    <main style={{marginLeft:232,flex:1,padding:"32px 40px",minHeight:"100vh"}}>{children}</main>
  </div>;
}

// ═══ TABLE ═══
function TDTable({drives,showSales=true}) {
  if(!drives.length)return <div style={{...C.glass,padding:40,textAlign:"center",color:C.textDim}}>No test drives</div>;
  return <div style={{...C.glass,padding:20,overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
    <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
      {["Customer","Phone","Vehicle",showSales&&"Salesperson","Date","In","Out","Outcome","ID","CRM"].filter(Boolean).map(h=><th key={h} style={{textAlign:"left",padding:"10px 12px",color:C.textDim,fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>{h}</th>)}
    </tr></thead>
    <tbody>{drives.map(td=><tr key={td.id} style={{borderBottom:`1px solid ${C.border}`}}>
      <td style={{padding:12,fontWeight:600}}>{td.customer}</td>
      <td style={{padding:12,color:C.textMuted,fontSize:12}}>{td.phone}</td>
      <td style={{padding:12,color:C.textMuted}}>{td.vehicle}</td>
      {showSales&&<td style={{padding:12,color:C.textMuted}}>{td.salesperson}</td>}
      <td style={{padding:12,color:C.textMuted}}>{td.date}</td>
      <td style={{padding:12,color:C.textMuted}}>{td.timeIn}</td>
      <td style={{padding:12}}>{td.timeOut||<Badge color={C.green} sm>Active</Badge>}</td>
      <td style={{padding:12}}>{td.outcome==="sold"?<Badge color={C.green} sm>Sold</Badge>:td.outcome==="not_sold"?<Badge color={C.textDim} sm>No Sale</Badge>:td.status==="active"?<Badge color={C.green} sm>On Drive</Badge>:<Badge color={C.accent} sm>Pending</Badge>}</td>
      <td style={{padding:12}}><Badge color={C.green} sm>Verified</Badge></td>
      <td style={{padding:12}}>{td.adfSent?<Badge color={C.blue} sm>Sent</Badge>:<Badge color={C.accent} sm>Pending</Badge>}</td>
    </tr>)}</tbody>
  </table></div>;
}

// ═══ INVENTORY VIEW WITH DAYS ON LOT ═══
function InvView({td}) {
  const [f,setF]=useState("all");const [sort,setSort]=useState("dol");
  const getS=v=>(td||[]).find(t=>t.vehicleId===v.id&&t.status==="active")?"on-drive":v.status;
  let list=f==="all"?[...INVENTORY]:INVENTORY.filter(v=>getS(v)===f);
  if(sort==="dol") list.sort((a,b)=>b.daysOnLot-a.daysOnLot);
  else if(sort==="price") list.sort((a,b)=>b.price-a.price);
  const critical=INVENTORY.filter(v=>v.daysOnLot>=90).length;
  const aging=INVENTORY.filter(v=>v.daysOnLot>=60&&v.daysOnLot<90).length;
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:20}}>
      <div><h1 style={{fontSize:26,fontWeight:700,margin:0}}>Inventory</h1><p style={{color:C.textDim,fontSize:13,margin:"4px 0 0"}}>{INVENTORY.length} vehicles · magnetismmotors.com</p></div>
      <div style={{display:"flex",gap:6}}>
        {[["all","All"],["available","Available"],["on-drive","On Drive"]].map(([v,l])=><button key={v} onClick={()=>setF(v)} style={{padding:"7px 16px",borderRadius:100,border:`1px solid ${f===v?C.accent+"44":C.border}`,background:f===v?C.accent+"14":"transparent",color:f===v?C.accent:C.textMuted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>{l}</button>)}
        <span style={{width:1,background:C.border,margin:"0 4px"}}/>
        {[["dol","By Age"],["price","By Price"]].map(([v,l])=><button key={v} onClick={()=>setSort(v)} style={{padding:"7px 16px",borderRadius:100,border:`1px solid ${sort===v?C.blue+"44":C.border}`,background:sort===v?C.blue+"14":"transparent",color:sort===v?C.blue:C.textMuted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>{l}</button>)}
      </div>
    </div>
    {(critical>0||aging>0)&&<div style={{...C.glass,padding:"14px 20px",marginBottom:16,display:"flex",alignItems:"center",gap:14,borderLeft:`3px solid ${C.amber}`}}>
      {I.alert(C.amber,18)}<div style={{flex:1}}><span style={{fontWeight:700,fontSize:13}}>Aging Inventory Alert:</span><span style={{fontSize:13,color:C.textMuted}}> {critical} critical (90+ days), {aging} aging (60-89 days). Email alerts fire when these vehicles go on test drives.</span></div>
    </div>}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
      {list.map(v=>{const st=getS(v);const dc=dolAge(v.daysOnLot);return <div key={v.id} style={{borderRadius:16,overflow:"hidden",background:C.surface,border:`1px solid ${C.border}`,transition:"all 0.25s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
        <div style={{height:130,background:C.surfaceLight,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
          {v.img?<img src={v.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:null}
          {!v.img&&<div style={{fontSize:13,color:C.textDim,fontWeight:600}}>{v.year} {v.make} {v.model}</div>}
          <div style={{position:"absolute",top:8,right:8,display:"flex",gap:4}}><Badge color={st==="available"?C.green:C.accent} sm>{st==="on-drive"?"On Drive":st}</Badge></div>
          <div style={{position:"absolute",top:8,left:8}}><div style={{padding:"3px 10px",borderRadius:100,fontSize:10,fontWeight:700,background:dc+"22",color:dc,border:`1px solid ${dc}33`}}>{v.daysOnLot}d on lot</div></div>
        </div>
        <div style={{padding:"14px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:11,color:C.textDim}}>{v.year} · {v.color}</div>{v.daysOnLot>=60&&<div style={{display:"flex",alignItems:"center",gap:3}}>{I.alert(dc,12)}<span style={{fontSize:10,fontWeight:700,color:dc}}>{dolLabel(v.daysOnLot)}</span></div>}</div>
          <div style={{fontSize:15,fontWeight:700,marginTop:2}}>{v.make} {v.model}</div>
          <div style={{fontSize:12,color:C.textMuted}}>{v.trim}</div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
            <span style={{fontSize:16,fontWeight:700,...C.gradText}}>{fmt(v.price)}</span>
            <span style={{fontSize:11,color:C.textDim}}>{v.miles.toLocaleString()} mi</span>
          </div>
        </div>
      </div>;})}
    </div>
  </div>;
}

// ═══ CONTRACT ═══
function Contract({vehicle,sigData}) {
  const today=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  return <div style={{background:"#fff",color:"#111",borderRadius:12,padding:"36px 32px",maxHeight:460,overflow:"auto",fontSize:12.5,lineHeight:1.7}}>
    <div style={{textAlign:"center",borderBottom:"2px solid #111",paddingBottom:16,marginBottom:20}}>
      <div style={{fontSize:20,fontWeight:800,letterSpacing:1,textTransform:"uppercase"}}>Magnetism Motors</div>
      <div style={{fontSize:11,color:"#666",marginTop:4}}>2279 Lawrenceville Hwy, Lawrenceville, GA 30044 · (770) 800-1100</div>
      <div style={{fontSize:15,fontWeight:700,marginTop:14,textTransform:"uppercase",letterSpacing:2}}>Test Drive Agreement</div>
    </div>
    <p><strong>Date:</strong> {today}</p>
    {vehicle&&<div style={{padding:14,background:"#f5f5f5",borderRadius:8,marginBottom:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,fontSize:11.5}}>
      <div><strong>Vehicle:</strong> {vehicle.year} {vehicle.make} {vehicle.model}</div><div><strong>Trim:</strong> {vehicle.trim}</div>
      <div><strong>VIN:</strong> {vehicle.vin}</div><div><strong>Stock:</strong> {vehicle.stock}</div>
    </div>}
    <p>I, the undersigned, acknowledge and agree to the following:</p>
    <p><strong>1. VALID LICENSE & INSURANCE.</strong> I possess a valid driver's license and maintain automobile liability insurance.</p>
    <p><strong>2. SAFE OPERATION.</strong> I will operate the vehicle safely, lawfully, and will not exceed speed limits or operate under the influence.</p>
    <p><strong>3. LIABILITY & DAMAGES.</strong> I assume full responsibility for damages, violations, or incidents during the test drive.</p>
    <p><strong>4. IDENTITY VERIFICATION.</strong> I authorize Magnetism Motors to photograph and verify my government-issued ID.</p>
    <p><strong>5. DESIGNATED ROUTE & TIMEFRAME.</strong> I will follow the designated route and return the vehicle within the agreed timeframe.</p>
    <p><strong>6. VEHICLE CONDITION.</strong> I will report any issues observed before, during, or after the test drive.</p>
    <div style={{padding:14,background:"#f0f7ff",border:"1px solid #cde0f5",borderRadius:8,margin:"16px 0"}}>
      <p style={{margin:0,fontWeight:700}}>7. CONSENT TO RECEIVE TEXT MESSAGES</p>
      <p style={{margin:"6px 0 0"}}>By signing, I consent to receive SMS/MMS from Magnetism Motors including follow-up, promotional offers, and service reminders. Message/data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out.</p>
    </div>
    <p><strong>8. GOVERNING LAW.</strong> This Agreement is governed by Georgia law.</p>
    {sigData?<div style={{borderTop:"1px solid #ccc",marginTop:16,paddingTop:12}}><img src={sigData} alt="Sig" style={{height:50}}/><div style={{fontSize:10,color:"#666",marginTop:4}}>Digitally signed {today}</div></div>:
    <div style={{borderTop:"1px solid #ccc",marginTop:16,paddingTop:12,color:"#999",fontStyle:"italic"}}>Awaiting signature...</div>}
  </div>;
}

// ═══ NEW TEST DRIVE ═══
function NewTD({testDrives,setTestDrives,setAlerts}) {
  const [step,setStep]=useState(0);const [frontImg,setFrontImg]=useState(null);const [backImg,setBackImg]=useState(null);
  const [verifying,setVerifying]=useState(false);const [verified,setVerified]=useState(false);const [parsed,setParsed]=useState(null);
  const [sel,setSel]=useState(null);const [sigData,setSigData]=useState(null);const [started,setStarted]=useState(false);const [phone,setPhone]=useState("");
  const steps=["Upload ID","Select Vehicle","Sign & Go"];
  const verify=()=>{setVerifying(true);setTimeout(()=>{setParsed({firstName:"Linda",lastName:"Tran",dob:"03/15/1988",license:"GA-058472198",expires:"03/15/2027",address:"1245 Peachtree Blvd, Atlanta GA",state:"Georgia",trust:97});setVerified(true);setVerifying(false);},2000);};
  const go=()=>{const v=INVENTORY.find(x=>x.id===sel);
    if(v.daysOnLot>=60){setAlerts(p=>[...p,`${v.year} ${v.make} ${v.model} (${v.daysOnLot} days on lot) is on a test drive with ${parsed.firstName} ${parsed.lastName}. Priority: close this deal.`]);}
    setTestDrives(p=>[{id:Date.now(),customer:`${parsed.firstName} ${parsed.lastName}`,phone,vehicle:`${v.year} ${v.make} ${v.model}`,vehicleId:v.id,salesperson:"Shafay Ahmed",salesId:1,timeIn:new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:true}),timeOut:null,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),status:"active",idVerified:true,adfSent:true,signed:true,signedAt:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),outcome:null,startTimestamp:Date.now()},...p]);setStarted(true);};
  const sv=sel?INVENTORY.find(v=>v.id===sel):null;
  return <div>
    <h1 style={{fontSize:26,fontWeight:700,margin:"0 0 4px"}}>New Test Drive</h1>
    <p style={{color:C.textDim,fontSize:13,margin:"0 0 28px"}}>Walk through each step</p>
    <div style={{display:"flex",alignItems:"center",marginBottom:36}}>
      {steps.map((s,i)=><div key={s} style={{display:"flex",alignItems:"center",flex:i<2?1:"none"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:i<step?C.green:i===step?C.accent:"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:i<=step?C.bg:C.textDim}}>{i<step?<span>{I.check(C.bg,14)}</span>:i+1}</div>
          <span style={{fontSize:12,fontWeight:i===step?600:400,color:i<=step?C.text:C.textDim,whiteSpace:"nowrap"}}>{s}</span>
        </div>{i<2&&<div style={{flex:1,height:1,background:i<step?C.green+"66":C.border,margin:"0 14px"}}/>}
      </div>)}
    </div>
    {step===0&&<div style={{maxWidth:600,margin:"0 auto"}}>{!verified?<div style={{...C.glass,padding:32}}>
      <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 4px"}}>Upload Driver's License</h2>
      <p style={{color:C.textMuted,fontSize:13,margin:"0 0 20px"}}>Take photos of the front and back for IDScan.net verification.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
        <LicenseUpload label="Front" subtitle="Photo of front" onUpload={setFrontImg} preview={frontImg}/>
        <LicenseUpload label="Back (Barcode)" subtitle="Photo of barcode" onUpload={setBackImg} preview={backImg}/>
      </div>
      <div style={{marginBottom:16}}><label style={{fontSize:12,color:C.textMuted,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:0.8}}>Phone</label><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(770) 555-0100" style={{width:"100%",padding:"14px 16px",borderRadius:12,border:`1px solid ${C.border}`,background:"rgba(255,255,255,0.04)",color:C.text,fontSize:14,fontFamily:"'Outfit',sans-serif",outline:"none",boxSizing:"border-box"}}/></div>
      {frontImg&&backImg&&!verifying&&<button onClick={verify} style={{width:"100%",padding:"14px",borderRadius:12,background:`linear-gradient(135deg,${C.accent},${C.accentHover})`,border:"none",color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Verify via IDScan.net</button>}
      {verifying&&<div style={{textAlign:"center",padding:20}}><div style={{width:44,height:44,borderRadius:"50%",border:`3px solid ${C.accent}`,borderTopColor:"transparent",margin:"0 auto 12px",animation:"spin 1s linear infinite"}}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style><div style={{fontWeight:600}}>Verifying with IDScan.net...</div></div>}
    </div>:<div style={{...C.glass,padding:32}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><div style={{width:48,height:48,borderRadius:"50%",background:C.green+"15",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.shield(C.green,24)}</div><div><div style={{fontSize:18,fontWeight:700}}>Identity Verified</div><div style={{fontSize:12,color:C.textMuted}}>Trust Score: <span style={{color:C.green,fontWeight:700}}>{parsed.trust}/100</span></div></div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,fontSize:13,padding:14,background:"rgba(255,255,255,0.02)",borderRadius:10}}>
        {[["Name",`${parsed.firstName} ${parsed.lastName}`],["DOB",parsed.dob],["License",parsed.license],["Expires",parsed.expires],["Address",parsed.address],["State",parsed.state]].map(([l,v])=><div key={l}><div style={{color:C.textDim,fontSize:10,fontWeight:600,textTransform:"uppercase",marginBottom:2}}>{l}</div><div style={{fontWeight:600}}>{v}</div></div>)}
      </div>
      <button onClick={()=>setStep(1)} style={{width:"100%",marginTop:20,padding:"14px",borderRadius:100,background:C.text,border:"none",color:C.bg,fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Continue</button>
    </div>}</div>}
    {step===1&&<div>
      <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 16px"}}>Select Vehicle</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
        {INVENTORY.filter(v=>v.status==="available").map(v=><div key={v.id} onClick={()=>setSel(v.id)} style={{...C.glass,padding:0,overflow:"hidden",cursor:"pointer",borderColor:sel===v.id?C.accent:C.border,boxShadow:sel===v.id?`0 0 20px ${C.accent}22`:"none"}}>
          {v.img&&<img src={v.img} alt="" style={{width:"100%",height:90,objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>}
          <div style={{padding:"10px 14px"}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:700,fontSize:13}}>{v.year} {v.make} {v.model}</span><span style={{fontSize:10,fontWeight:700,color:dolAge(v.daysOnLot)}}>{v.daysOnLot}d</span></div><div style={{fontSize:11,color:C.textMuted}}>{v.trim}</div><div style={{fontSize:14,fontWeight:700,...C.gradText,marginTop:6}}>{fmt(v.price)}</div></div>
        </div>)}
      </div>
      {sel&&<div style={{textAlign:"center",marginTop:20}}><button onClick={()=>setStep(2)} style={{padding:"14px 40px",borderRadius:100,background:C.text,border:"none",color:C.bg,fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Continue</button></div>}
    </div>}
    {step===2&&<div style={{maxWidth:640,margin:"0 auto"}}>{!started?<>
      {sv&&sv.daysOnLot>=60&&<div style={{...C.glass,padding:"14px 18px",marginBottom:16,borderLeft:`3px solid ${C.amber}`,display:"flex",alignItems:"center",gap:10}}>
        {I.mail(C.amber,18)}<div style={{fontSize:13}}><span style={{fontWeight:700,color:C.amber}}>Priority Vehicle</span> — {sv.daysOnLot} days on lot. Admin & manager will be notified via email when this drive starts.</div>
      </div>}
      <Contract vehicle={sv} sigData={sigData}/>
      <div style={{marginTop:20}}><div style={{fontSize:14,fontWeight:700,marginBottom:10}}>Customer Signature</div>
        {!sigData?<SignaturePad onSign={d=>setSigData(d)}/>:<div style={{...C.glass,padding:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:10}}><Badge color={C.green}>Signed</Badge><span style={{fontSize:13,color:C.textMuted}}>by {parsed?.firstName} {parsed?.lastName}</span></div><button onClick={()=>setSigData(null)} style={{background:"none",border:"none",color:C.textDim,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Re-sign</button></div>}
      </div>
      {sigData&&<button onClick={go} style={{width:"100%",marginTop:20,padding:"16px",borderRadius:12,background:`linear-gradient(135deg,${C.green},#22c55e)`,border:"none",color:C.bg,fontWeight:700,fontSize:16,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Start Test Drive</button>}
    </>:<div style={{textAlign:"center",...C.glass,padding:40}}>
      <div style={{marginBottom:12,opacity:0.5}}>{I.car(C.green,40)}</div><h2 style={{fontSize:22,fontWeight:700,margin:"0 0 6px"}}>Test Drive Active</h2>
      <p style={{color:C.textMuted,fontSize:13,marginBottom:16}}>Timer running. Lead pushed to CRM.</p>
      <div style={{display:"flex",gap:8,justifyContent:"center"}}><Badge color={C.green}>Signed</Badge><Badge color={C.blue}>ADF Sent</Badge><Badge color={C.green}>ID Verified</Badge></div>
    </div>}</div>}
  </div>;
}

// ═══ ANALYTICS ═══
function PerformancePage({td}) {
  const spStats=SP.map(s=>{const d=td.filter(t=>t.salesId===s.id);return{...s,drives:d.length,active:d.filter(t=>t.status==="active").length,conv:d.length?Math.round((d.filter(t=>t.adfSent).length/d.length)*100):0,sold:d.filter(t=>t.outcome==="sold").length};});
  const totalDrives=td.length,totalSigned=td.filter(t=>t.signed).length,totalAdf=td.filter(t=>t.adfSent).length,totalSold=td.filter(t=>t.outcome==="sold").length;
  const topVehicles=INVENTORY.map(v=>({...v,count:td.filter(t=>t.vehicleId===v.id).length})).sort((a,b)=>b.count-a.count).slice(0,8);
  const dailyData=useMemo(()=>{const m={};td.forEach(t=>{m[t.date]=(m[t.date]||0)+1;});return Object.entries(m).slice(-14);},[td]);
  const maxD=Math.max(...dailyData.map(d=>d[1]),1);
  return <div>
    <h1 style={{fontSize:26,fontWeight:700,margin:"0 0 24px"}}>Performance</h1>
    <div style={{display:"flex",gap:14,marginBottom:24,flexWrap:"wrap"}}>
      <Stat label="Total Drives" value={totalDrives} icon={I.car(C.textDim,16)}/><Stat label="Agreements" value={totalSigned} color={C.green} icon={I.pen(C.textDim,16)}/><Stat label="CRM Leads" value={totalAdf} color={C.blue} icon={I.send(C.textDim,16)}/><Stat label="Sold" value={totalSold} color={C.green} icon={I.dollar(C.textDim,16)}/><Stat label="Close Rate" value={totalDrives?Math.round(totalSold/totalDrives*100):0} suffix="%" color={C.purple} icon={I.trend(C.textDim,16)}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
      <div style={{...C.glass,padding:24}}><div style={{fontSize:15,fontWeight:700,marginBottom:16}}>Drives per Day (14 Days)</div><div style={{display:"flex",alignItems:"flex-end",gap:6,height:160}}>
        {dailyData.map(([d,v],i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          <span style={{fontSize:10,fontWeight:700,color:C.accent}}>{v}</span>
          <div style={{width:"100%",height:(v/maxD)*120,borderRadius:"4px 4px 2px 2px",background:`linear-gradient(180deg,${C.accent},${C.accent}55)`,minHeight:4}}/>
          <span style={{fontSize:8,color:C.textDim,transform:"rotate(-45deg)",whiteSpace:"nowrap"}}>{d.split(",")[0]}</span>
        </div>)}
      </div></div>
      <div style={{...C.glass,padding:24}}><div style={{fontSize:15,fontWeight:700,marginBottom:16}}>Most Test Driven Vehicles</div>
        {topVehicles.filter(v=>v.count>0).map((v,i)=><div key={v.id} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:i<topVehicles.length-1?`1px solid ${C.border}`:"none"}}>
          <span style={{fontSize:11,fontWeight:800,color:C.textDim,width:18}}>#{i+1}</span>
          <div style={{flex:1,fontSize:13,fontWeight:600}}>{v.year} {v.make} {v.model}</div>
          <div style={{width:60,height:6,borderRadius:3,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}><div style={{height:"100%",width:`${(v.count/topVehicles[0].count)*100}%`,background:C.accent,borderRadius:3}}/></div>
          <span style={{fontSize:12,fontWeight:700,color:C.accent,width:24,textAlign:"right"}}>{v.count}</span>
        </div>)}
      </div>
    </div>
    <h2 style={{fontSize:16,fontWeight:700,margin:"0 0 12px"}}>Salesperson Breakdown</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:14}}>
      {spStats.map(s=><div key={s.id} style={{...C.glass,padding:22}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <div style={{width:40,height:40,borderRadius:10,background:C.accent+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:C.accent}}>{s.initials}</div>
          <div><div style={{fontWeight:700}}>{s.name}</div><Badge color={s.active?C.green:C.textDim} sm>{s.active?"On Floor":"Off"}</Badge></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6}}>
          {[["Drives",s.drives,C.blue],["Active",s.active,C.green],["Sold",s.sold,C.green],["CRM",s.conv+"%",C.purple]].map(([l,v,c])=><div key={l} style={{textAlign:"center",padding:8,borderRadius:8,background:"rgba(255,255,255,0.02)"}}><div style={{fontSize:18,fontWeight:700,color:c}}>{v}</div><div style={{fontSize:9,color:C.textDim,marginTop:2}}>{l}</div></div>)}
        </div>
      </div>)}
    </div>
  </div>;
}
function AgreementsPage({td}) {
  const signed=td.filter(t=>t.signed);
  return <div><h1 style={{fontSize:26,fontWeight:700,margin:"0 0 4px"}}>Signed Agreements</h1><p style={{color:C.textDim,fontSize:13,margin:"0 0 24px"}}>{signed.length} agreements on file</p>
    <div style={{...C.glass,padding:20,overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
      <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>{["Customer","Phone","Vehicle","Salesperson","Signed On","ID","CRM Status"].map(h=><th key={h} style={{textAlign:"left",padding:"10px 12px",color:C.textDim,fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>{h}</th>)}</tr></thead>
      <tbody>{signed.map(t=><tr key={t.id} style={{borderBottom:`1px solid ${C.border}`}}>
        <td style={{padding:12,fontWeight:600}}>{t.customer}</td><td style={{padding:12,color:C.textMuted,fontSize:12}}>{t.phone}</td><td style={{padding:12,color:C.textMuted}}>{t.vehicle}</td><td style={{padding:12,color:C.textMuted}}>{t.salesperson}</td><td style={{padding:12}}><Badge color={C.green} sm>{t.signedAt||t.date}</Badge></td><td style={{padding:12}}><Badge color={C.green} sm>Verified</Badge></td><td style={{padding:12}}>{t.adfSent?<Badge color={C.blue} sm>Delivered</Badge>:<Badge color={C.accent} sm>Pending</Badge>}</td>
      </tr>)}</tbody>
    </table></div>
  </div>;
}
function CustomersPage({td}) {
  const custMap={};td.forEach(t=>{if(!custMap[t.customer])custMap[t.customer]={name:t.customer,phone:t.phone,drives:[],salespersons:new Set()};custMap[t.customer].drives.push(t);custMap[t.customer].salespersons.add(t.salesperson);});
  const customers=Object.values(custMap).sort((a,b)=>b.drives.length-a.drives.length);
  return <div><h1 style={{fontSize:26,fontWeight:700,margin:"0 0 4px"}}>Customer Database</h1><p style={{color:C.textDim,fontSize:13,margin:"0 0 24px"}}>{customers.length} unique customers from signed agreements</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:12}}>
      {customers.map(c=><div key={c.name} style={{...C.glass,padding:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div><div style={{fontSize:15,fontWeight:700}}>{c.name}</div><div style={{fontSize:12,color:C.textMuted,marginTop:2}}>{c.phone}</div></div>
          <Badge sm>{c.drives.length} drive{c.drives.length>1?"s":""}</Badge>
        </div>
        <div style={{fontSize:12,color:C.textMuted,marginBottom:8}}>Vehicles test driven:</div>
        {c.drives.map((d,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:i<c.drives.length-1?`1px solid ${C.border}`:"none",fontSize:12}}>
          <span style={{fontWeight:600,color:C.text}}>{d.vehicle}</span>
          <span style={{color:C.textDim}}>{d.date} · {d.salesperson.split(" ")[0]}</span>
        </div>)}
      </div>)}
    </div>
  </div>;
}

// ═══ MY DRIVES WITH OUTCOME ═══
function MyDrives({drives,setTD}) {
  const markOutcome=(id,outcome)=>{setTD(p=>p.map(t=>t.id===id?{...t,outcome}:t));};
  const sold=drives.filter(t=>t.outcome==="sold").length;
  return <div><h1 style={{fontSize:26,fontWeight:700,margin:"0 0 4px"}}>My Test Drives</h1><p style={{color:C.textDim,fontSize:13,margin:"0 0 20px"}}>{drives.length} total · {sold} sold · {Math.round(drives.length?sold/drives.length*100:0)}% close rate</p>
    {drives.length===0?<div style={{...C.glass,padding:40,textAlign:"center",color:C.textDim}}>No test drives yet</div>:
    drives.map(t=><div key={t.id} style={{...C.glass,padding:"16px 20px",marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:28,height:28,borderRadius:8,background:t.status==="active"?C.green+"15":t.outcome==="sold"?C.green+"15":t.outcome==="not_sold"?"rgba(255,255,255,0.04)":C.accent+"15",display:"flex",alignItems:"center",justifyContent:"center"}}>{t.status==="active"?I.dot(C.green,10):t.outcome==="sold"?I.dollar(C.green,14):t.outcome==="not_sold"?I.x(C.textDim,14):I.hourglass(C.accent,14)}</div>
          <div><div style={{fontWeight:700,fontSize:14}}>{t.customer}</div><div style={{fontSize:12,color:C.textMuted}}>{t.vehicle} · {t.date} · {t.timeIn}{t.timeOut?` - ${t.timeOut}`:""}</div></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {t.status==="active"?<Badge color={C.green} sm>Active</Badge>:
          t.outcome==="sold"?<Badge color={C.green} sm>Sold</Badge>:
          t.outcome==="not_sold"?<Badge color={C.textDim} sm>No Sale</Badge>:
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>markOutcome(t.id,"sold")} style={{padding:"6px 14px",borderRadius:8,background:C.green+"18",border:`1px solid ${C.green}33`,color:C.green,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}} onMouseEnter={e=>{e.target.style.background=C.green;e.target.style.color=C.bg;}} onMouseLeave={e=>{e.target.style.background=C.green+"18";e.target.style.color=C.green;}}>Sold</button>
            <button onClick={()=>markOutcome(t.id,"not_sold")} style={{padding:"6px 14px",borderRadius:8,background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,color:C.textMuted,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}} onMouseEnter={e=>{e.target.style.background=C.red+"18";e.target.style.color=C.red;}} onMouseLeave={e=>{e.target.style.background="rgba(255,255,255,0.04)";e.target.style.color=C.textMuted;}}>No Sale</button>
          </div>}
        </div>
      </div>
    </div>)}
  </div>;
}

// ═══ PORTALS ═══
function AdminPortal({user,onLogout,td,setTD,alerts,setAlerts}) {
  const [view,setView]=useState("dashboard");
  const nav=[{id:"dashboard",icon:I.grid(C.textMuted,16),label:"Dashboard"},{id:"live",icon:I.clock(C.textMuted,16),label:"Live Tracking"},{id:"drives30",icon:I.cal(C.textMuted,16),label:"Last 30 Days"},{id:"agreements",icon:I.pen(C.textMuted,16),label:"Agreements"},{id:"customers",icon:I.user(C.textMuted,16),label:"Customers"},{id:"performance",icon:I.trend(C.textMuted,16),label:"Performance"},{id:"inventory",icon:I.tag(C.textMuted,16),label:"Inventory"},{id:"team",icon:I.users(C.textMuted,16),label:"Team"}];
  const active=td.filter(t=>t.status==="active");
  const content=()=>{
    if(view==="inventory")return <InvView td={td}/>;
    if(view==="live")return <LiveDashboard td={td} setTD={setTD}/>;
    if(view==="drives30")return <div><h1 style={{fontSize:26,fontWeight:700,margin:"0 0 24px"}}>Test Drives — Last 30 Days</h1><TDTable drives={td}/></div>;
    if(view==="agreements")return <AgreementsPage td={td}/>;
    if(view==="customers")return <CustomersPage td={td}/>;
    if(view==="performance")return <PerformancePage td={td}/>;
    if(view==="team")return <div><h1 style={{fontSize:26,fontWeight:700,margin:"0 0 24px"}}>Sales Team</h1><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
      {SP.map(s=>{const d=td.filter(t=>t.salesId===s.id);return <div key={s.id} style={{...C.glass,padding:22}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><div style={{width:40,height:40,borderRadius:10,background:C.accent+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:C.accent}}>{s.initials}</div><div><div style={{fontWeight:700}}>{s.name}</div><Badge color={s.active?C.green:C.textDim} sm>{s.active?"On Floor":"Off"}</Badge></div></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{[["Total Drives",d.length,C.blue],["Active",d.filter(t=>t.status==="active").length,C.green]].map(([l,v,c])=><div key={l} style={{textAlign:"center",padding:10,borderRadius:10,background:"rgba(255,255,255,0.02)"}}><div style={{fontSize:20,fontWeight:700,color:c}}>{v}</div><div style={{fontSize:10,color:C.textDim,marginTop:3}}>{l}</div></div>)}</div></div>;})}
    </div></div>;
    return <div>
      <div style={{marginBottom:28}}><h1 style={{fontSize:26,fontWeight:700,margin:0}}>Dashboard</h1><p style={{color:C.textDim,fontSize:13,margin:"4px 0 0"}}>Magnetism Motors — Lawrenceville, GA</p></div>
      <div style={{display:"flex",gap:14,marginBottom:24,flexWrap:"wrap"}}><Stat label="Total Drives" value={td.length} icon={I.car(C.textDim,16)}/><Stat label="Active Now" value={active.length} color={C.green} icon={I.dot(C.green,10)}/><Stat label="Agreements" value={td.filter(t=>t.signed).length} color={C.blue} icon={I.pen(C.textDim,16)}/><Stat label="CRM Delivered" value={td.filter(t=>t.adfSent).length} color={C.purple} icon={I.send(C.textDim,16)}/></div>
      {active.length>0&&<div style={{...C.glass,padding:22,marginBottom:20}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><div style={{width:8,height:8,borderRadius:"50%",background:C.green,boxShadow:`0 0 8px ${C.green}`}}/><span style={{fontWeight:700}}>Active Test Drives</span></div>
        {active.map(t=>{const veh=INVENTORY.find(v=>v.id===t.vehicleId);return <div key={t.id} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 14px",borderRadius:12,background:C.green+"08",border:`1px solid ${C.green}18`,marginBottom:6}}>
          <div style={{opacity:0.5}}>{I.car(C.green,18)}</div><div style={{flex:1}}><div style={{fontWeight:600}}>{t.customer}</div><div style={{fontSize:12,color:C.textMuted}}>{t.vehicle} · {t.salesperson}{veh&&veh.daysOnLot>=60?<span style={{color:C.amber,fontWeight:700}}> · {veh.daysOnLot}d on lot</span>:""}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:600,color:C.green}}>Out since {t.timeIn}</div></div>
        </div>;})}
      </div>}
      <h2 style={{fontSize:16,fontWeight:700,margin:"0 0 12px"}}>Recent Activity</h2><TDTable drives={td.slice(0,10)}/>
    </div>;
  };
  return <Shell user={user} onLogout={onLogout} nav={nav} active={view} setView={setView}><AlertToast alerts={alerts} onDismiss={i=>setAlerts(p=>p.filter((_,j)=>j!==i))}/>{content()}</Shell>;
}

function ManagerPortal({user,onLogout,td,setTD,alerts,setAlerts}) {
  const [view,setView]=useState("floor");
  const nav=[{id:"floor",icon:I.grid(C.textMuted,16),label:"Floor View"},{id:"live",icon:I.clock(C.textMuted,16),label:"Live Tracking"},{id:"drives",icon:I.car(C.textMuted,16),label:"All Drives"},{id:"agreements",icon:I.pen(C.textMuted,16),label:"Agreements"},{id:"team",icon:I.users(C.textMuted,16),label:"Salespeople"},{id:"inventory",icon:I.tag(C.textMuted,16),label:"Inventory"}];
  const active=td.filter(t=>t.status==="active");
  const content=()=>{
    if(view==="inventory")return <InvView td={td}/>;
    if(view==="live")return <LiveDashboard td={td} setTD={setTD}/>;
    if(view==="drives")return <div><h1 style={{fontSize:26,fontWeight:700,margin:"0 0 24px"}}>All Test Drives</h1><TDTable drives={td}/></div>;
    if(view==="agreements")return <AgreementsPage td={td}/>;
    if(view==="team")return <div><h1 style={{fontSize:26,fontWeight:700,margin:"0 0 24px"}}>Salespeople</h1>{SP.map(s=><div key={s.id} style={{...C.glass,padding:"16px 20px",marginBottom:8,display:"flex",alignItems:"center",gap:14}}><div style={{width:38,height:38,borderRadius:10,background:C.blue+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:C.blue}}>{s.initials}</div><div style={{flex:1}}><div style={{fontWeight:600}}>{s.name}</div><div style={{fontSize:12,color:C.textMuted}}>{td.filter(t=>t.salesId===s.id).length} drives</div></div><Badge color={s.active?C.green:C.textDim} sm>{s.active?"On Floor":"Off"}</Badge></div>)}</div>;
    return <div>
      <div style={{marginBottom:28}}><h1 style={{fontSize:26,fontWeight:700,margin:0}}>Floor View</h1></div>
      <div style={{display:"flex",gap:14,marginBottom:24,flexWrap:"wrap"}}><Stat label="Active" value={active.length} color={C.green} icon={I.dot(C.green,10)}/><Stat label="Today" value={td.filter(t=>t.date===td[0]?.date).length} icon={I.car(C.textDim,16)}/></div>
      {active.length>0&&<div style={{...C.glass,padding:22,marginBottom:20}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><div style={{width:8,height:8,borderRadius:"50%",background:C.green,boxShadow:`0 0 8px ${C.green}`}}/><span style={{fontWeight:700}}>On Drive</span></div>
        {active.map(t=><div key={t.id} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 14px",borderRadius:12,background:C.green+"06",marginBottom:6}}><div style={{opacity:0.5}}>{I.car(C.green,18)}</div><div style={{flex:1}}><div style={{fontWeight:600}}>{t.customer} — {t.vehicle}</div><div style={{fontSize:12,color:C.textMuted}}>with {t.salesperson}</div></div><div style={{fontWeight:600,color:C.green,fontSize:13}}>Since {t.timeIn}</div></div>)}
      </div>}
      <h2 style={{fontSize:16,fontWeight:700,margin:"0 0 12px"}}>Recent</h2><TDTable drives={td.slice(0,10)}/>
    </div>;
  };
  return <Shell user={user} onLogout={onLogout} nav={nav} active={view} setView={setView}><AlertToast alerts={alerts} onDismiss={i=>setAlerts(p=>p.filter((_,j)=>j!==i))}/>{content()}</Shell>;
}

function SalesPortal({user,onLogout,td,setTD,alerts,setAlerts}) {
  const [view,setView]=useState("dashboard");
  const nav=[{id:"dashboard",icon:I.home(C.textMuted,16),label:"My Dashboard"},{id:"new",icon:I.plus(C.textMuted,16),label:"New Test Drive"},{id:"live",icon:I.clock(C.textMuted,16),label:"Live Tracking"},{id:"drives",icon:I.car(C.textMuted,16),label:"My Drives"},{id:"inventory",icon:I.tag(C.textMuted,16),label:"Inventory"}];
  const my=td.filter(t=>t.salesId===1);
  const content=()=>{
    if(view==="inventory")return <InvView td={td}/>;
    if(view==="new")return <NewTD testDrives={td} setTestDrives={setTD} setAlerts={setAlerts}/>;
    if(view==="live")return <LiveDashboard td={td} setTD={setTD}/>;
    if(view==="drives")return <MyDrives drives={my} setTD={setTD}/>;
    const sold=my.filter(t=>t.outcome==="sold").length;
    return <div>
      <div style={{marginBottom:28}}><h1 style={{fontSize:26,fontWeight:700,margin:0}}>Welcome back, {user.name.split(" ")[0]}</h1></div>
      <div style={{display:"flex",gap:14,marginBottom:24,flexWrap:"wrap"}}><Stat label="My Drives" value={my.length} icon={I.car(C.textDim,16)}/><Stat label="Active" value={my.filter(t=>t.status==="active").length} color={C.green} icon={I.dot(C.green,10)}/><Stat label="Sold" value={sold} color={C.green} icon={I.dollar(C.textDim,16)}/><Stat label="Close Rate" value={my.length?Math.round(sold/my.length*100):0} suffix="%" color={C.purple} icon={I.trend(C.textDim,16)}/></div>
      {my.filter(t=>t.outcome===null&&t.status==="completed").length>0&&<div style={{...C.glass,padding:16,marginBottom:20,borderLeft:`3px solid ${C.accent}`}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{opacity:0.5}}>{I.hourglass(C.accent,16)}</span><span style={{fontWeight:600,fontSize:13}}>You have {my.filter(t=>t.outcome===null&&t.status==="completed").length} drives waiting for outcome</span>
        <button onClick={()=>setView("drives")} style={{marginLeft:"auto",padding:"6px 14px",borderRadius:8,background:C.accent+"18",border:`1px solid ${C.accent}33`,color:C.accent,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Update Now</button></div>
      </div>}
      <h2 style={{fontSize:16,fontWeight:700,margin:"0 0 12px"}}>Recent</h2>
      {my.slice(0,6).map(t=><div key={t.id} style={{...C.glass,padding:"12px 16px",marginBottom:6,display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:24,display:"flex",justifyContent:"center"}}>{t.status==="active"?I.dot(C.green,10):t.outcome==="sold"?I.dollar(C.green,14):t.outcome==="not_sold"?I.x(C.textDim,14):I.hourglass(C.accent,14)}</div><div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{t.customer}</div><div style={{fontSize:11,color:C.textMuted}}>{t.vehicle} · {t.date}</div></div><Badge color={t.outcome==="sold"?C.green:t.status==="active"?C.green:t.outcome==="not_sold"?C.textDim:C.accent} sm>{t.outcome==="sold"?"Sold":t.status==="active"?"Active":t.outcome==="not_sold"?"No Sale":"Pending"}</Badge>
      </div>)}
    </div>;
  };
  return <Shell user={user} onLogout={onLogout} nav={nav} active={view} setView={setView}>{content()}</Shell>;
}

// ═══ ROOT ═══
export default function App() {
  const [page,setPage]=useState("landing");const [user,setUser]=useState(null);
  const [td,setTD]=useState(()=>genHistory());
  const [alerts,setAlerts]=useState([]);
  const login=u=>{setUser(u);setPage("app");};const logout=()=>{setUser(null);setPage("landing");};
  if(page==="landing")return <LandingPage onLogin={()=>setPage("login")}/>;
  if(page==="login")return <LoginPage onLogin={login} onBack={()=>setPage("landing")}/>;
  if(user?.role==="admin")return <AdminPortal user={user} onLogout={logout} td={td} setTD={setTD} alerts={alerts} setAlerts={setAlerts}/>;
  if(user?.role==="manager")return <ManagerPortal user={user} onLogout={logout} td={td} setTD={setTD} alerts={alerts} setAlerts={setAlerts}/>;
  if(user?.role==="salesperson")return <SalesPortal user={user} onLogout={logout} td={td} setTD={setTD} alerts={alerts} setAlerts={setAlerts}/>;
  return null;
}
