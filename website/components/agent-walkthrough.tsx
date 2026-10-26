"use client";
import { SiteLink } from "@/components/site-link";
import { useEffect, useRef, useState } from "react";
import { Check, Play, Pause, RotateCcw, Bot, ShieldCheck, AlertTriangle, ArrowRight, Volume2, VolumeX } from "lucide-react";
const steps=[
 {label:"Working today",caption:"The refund agent correctly follows a 30-day return policy. This real business rule becomes a release check."},
 {label:"Update breaks a rule",caption:"A model update offers a refund for a 45-day-old order. Evaluation catches the regression in testing; the current version stays in production."},
 {label:"Repair & retest",caption:"The policy check is made explicit and the updated agent is tested again, including boundary cases and human handoff."},
 {label:"Review & approve",caption:"An engineer reviews the failed example, the repair and the retest evidence before approving a limited rollout."},
 {label:"Release & observe",caption:"The approved version reaches a small share of requests. Task outcomes are checked, with the previous version ready for rollback."},
];
const narration = [
 "Yesterday, your agent got this right. One customer. One request. The right decision.",
 "Then you upgraded the model. Same request. Wrong refund. A small change, a real consequence.",
 "Catch the change before your customers do. We repair the rule, then test again.",
 "Now, the evidence is clear. Your team reviews the fix and approves the release.",
 "Move forward with confidence. Release gradually, watch the results, and keep a way back.",
];
const storyBeats = ["Yesterday, the right decision.", "One update. A different answer.", "Catch it before your customers do.", "Evidence first. Approval next.", "Move forward. Keep a way back."];
function preferredVoice(voices: SpeechSynthesisVoice[]) {
 const english=voices.filter(voice=>/^en(?:-|_)/i.test(voice.lang));
 const score=(voice:SpeechSynthesisVoice)=>
   (/natural|neural|premium|enhanced/i.test(voice.name)?100:0)+
   (/samantha|ava|aria|jenny/i.test(voice.name)?40:0)+
   (/google.*english/i.test(voice.name)?30:0)+
   (/^en-US$/i.test(voice.lang)?15:0)+(voice.default?5:0);
 return english.sort((a,b)=>score(b)-score(a))[0];
}
export function AgentWalkthrough(){
 const [time,setTime]=useState(0),[playing,setPlaying]=useState(false),[visible,setVisible]=useState(true);const root=useRef<HTMLElement>(null);
 const [audioOn,setAudioOn]=useState(false),[audioSupported,setAudioSupported]=useState(false),[audioError,setAudioError]=useState(""),[pageVisible,setPageVisible]=useState(true),[replay,setReplay]=useState(0);
 const speaking=useRef(false),speechStarted=useRef(0);
 const availableVoices=useRef<SpeechSynthesisVoice[]>([]);
 useEffect(()=>{if(!("speechSynthesis" in window))return;const synth=window.speechSynthesis;const refresh=()=>{availableVoices.current=synth.getVoices()};refresh();synth.addEventListener("voiceschanged",refresh);return()=>synth.removeEventListener("voiceschanged",refresh)},[]);
 useEffect(()=>{setAudioSupported("speechSynthesis" in window && "SpeechSynthesisUtterance" in window);const changed=()=>setPageVisible(!document.hidden);document.addEventListener("visibilitychange",changed);return()=>document.removeEventListener("visibilitychange",changed)},[]);
 useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)");setPlaying(!media.matches);const changed=()=>{if(media.matches)setPlaying(false)};media.addEventListener("change",changed);const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));if(root.current)observer.observe(root.current);return()=>{observer.disconnect();media.removeEventListener("change",changed)}},[]);
 useEffect(()=>{if(!playing||!visible)return;let last=performance.now();const timer=window.setInterval(()=>{const now=performance.now(),delta=Math.min((now-last)/1000,.25);last=now;if(!document.hidden)setTime(t=>{
 const next=Math.min(30,t+delta),boundary=(Math.floor(t/6)+1)*6;
 if(next>=boundary&&speaking.current&&performance.now()-speechStarted.current<10000)return boundary-.01;
 return next;
 })},100);return()=>clearInterval(timer)},[playing,visible]);
 useEffect(()=>{if(time>=30)setPlaying(false)},[time]);
 const stage=Math.min(4,Math.floor(time/6)),fixed=time>=15,failed=stage===1||(stage===2&&!fixed);
 useEffect(()=>{
 if(!audioOn||!audioSupported||!playing||!visible||!pageVisible||time>=30)return;
 const synth=window.speechSynthesis;
 const utterance=new SpeechSynthesisUtterance(narration[stage]);
 utterance.lang="en-US";utterance.rate=1.22;utterance.pitch=1.02;
 const voice=preferredVoice(synth.getVoices().length?synth.getVoices():availableVoices.current);if(voice){utterance.voice=voice;utterance.lang=voice.lang;}
 let active=true;speaking.current=true;speechStarted.current=performance.now();
 utterance.onend=()=>{if(active)speaking.current=false};
 utterance.onerror=event=>{if(!active)return;speaking.current=false;if(event.error!=="canceled"&&event.error!=="interrupted"){setAudioError("Narration could not play on this browser. The captions are still available.");setAudioOn(false)}};
 synth.speak(utterance);
 return()=>{active=false;speaking.current=false;synth.cancel()};
 // Narrate once per chapter; playback progress itself must not restart speech.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[audioOn,audioSupported,playing,visible,pageVisible,stage,replay]);
 function toggle(){if(time>=30)setTime(0);setPlaying(!playing)}
 function restart(){setTime(0);setReplay(r=>r+1);setPlaying(true)}
 function toggleAudio(){if(audioOn){setAudioOn(false);return}setAudioError("");setAudioOn(true);restart()}
 function seek(index:number){setTime(index*6);setReplay(r=>r+1)}
 return <section ref={root} className={`story-demo focus-demo ${playing&&visible?"story-playing":"story-paused"}`} aria-label="One agent upgrade from evaluation to controlled release">
 <div className="story-heading"><span>ONE AGENT. ONE CHANGE. <span>Illustrative scenario · Sample results</span></span><h2>A faster model. A refund it should never approve.</h2><p>Follow one refund agent through a model update, a failed policy check and a controlled release.</p></div>
 <div className="upgrade-chapters" aria-label="Upgrade stages">{steps.map((step,i)=><button key={step.label} aria-current={stage===i?"step":undefined} onClick={()=>seek(i)}><span>0{i+1}</span>{step.label}</button>)}</div>
 <div className={`landscape-scene story-focus-${stage}`}><div className="story-beat" key={stage}><span>THE UPGRADE STORY</span><strong>{storyBeats[stage]}</strong></div><div className="upgrade-scene">
 <div className="upgrade-production"><span className="scene-kicker">PRODUCTION · CURRENT VERSION</span><div className="upgrade-agent"><Bot size={32}/><div><strong>Refund assistant</strong><span>Serving customers throughout the checks</span></div><i/></div><div className="upgrade-case"><small>THE TASK THAT MUST KEEP WORKING</small><p>“I bought this 45 days ago.<br/>Can I get a refund?”</p><span>Return policy: 30 days</span></div><div className="upgrade-answer"><Check size={15}/><p>Outside the return window.<br/>Offer a handoff for further help.</p></div></div>
 <div className={`upgrade-candidate ${failed?"candidate-failed":""}`}><span className="scene-kicker">{stage>=4?"LIMITED ROLLOUT":"SEPARATE TEST ENVIRONMENT"}</span><div className="candidate-top"><strong>{stage===0?"Proposed model update":stage>=4?"Approved update":"Updated refund agent"}</strong><span>{stage===0?"Ready to test":failed?"Release blocked":stage===2?"Retested":stage===3?"Approved":"Observing outcomes"}</span></div>
 <div className="candidate-answer"><small>SAME REQUEST · UPDATED AGENT</small><p>{stage===0?"Will it still follow the return policy?":failed?'“Yes, I can issue a full refund.”':'“This order is outside the return window. I can connect you with our team.”'}</p></div>
 <div className="upgrade-checks">{["30-day policy enforced","Boundary cases checked","Human handoff preserved"].map((label,i)=>{const passed=stage>=3||(stage===2&&time>=15+i);return <div key={label}>{failed&&i===0?<AlertTriangle size={14}/>:passed||stage===0?<Check size={14}/>:<span className="test-wait"/>}<span>{label}</span><small>{stage===0?"Baseline":failed&&i===0?"Failed":passed?"Passed":"Checking"}</small></div>})}</div>
 <div className="release-gate">{failed?<AlertTriangle size={17}/>:<ShieldCheck size={17}/>}<span>{stage===0?"Existing behaviour recorded before the change":failed?"Customer traffic stays on the current version":stage===2?"Repair: enforce the policy before a refund decision":stage===3?"Evidence reviewed · engineer approval recorded":"Watching task outcomes · rollback available"}</span></div></div>
 <div className="rollout-lane"><span>{stage<4?"Production stays on current version":"Controlled rollout in progress"}</span><div>{Array.from({length:10},(_,i)=><i key={i} className={stage===4&&i<Math.min(3,Math.floor((time-24)/2)+1)?"rollout-new":""}/>)}</div><small><RotateCcw size={12}/>{stage<4?"Release only after review":"Previous version retained"}</small></div>
 </div></div>
 <div className="story-caption"><span>0{stage+1}</span><p>{steps[stage].caption}</p></div>
 <div className="story-steps" aria-label="Demo progress">{steps.map((step,i)=><button key={step.label} aria-label={`Go to ${step.label}`} aria-current={stage===i?"step":undefined} onClick={()=>seek(i)}><span style={{width:`${Math.max(0,Math.min(100,(time-i*6)/6*100))}%`}}/></button>)}</div>
 <div className="story-controls narrated-controls"><button onClick={toggle}>{playing?<Pause size={14}/>:<Play size={14}/>} {playing?"Pause":time>=30?"Replay":"Play"}</button><button className="narration-toggle" onClick={toggleAudio} disabled={!audioSupported} aria-pressed={audioOn}>{audioOn?<Volume2 size={15}/>:<VolumeX size={15}/>} {audioOn?"Mute narration":"Play with narration"}</button><span>0:{String(Math.floor(time)).padStart(2,"0")} / 0:30</span><button aria-label="Replay upgrade scenario" onClick={restart}><RotateCcw size={14}/></button></div>
 <p className="narration-note" role="status">{audioError||(!audioSupported?"Voice narration is unavailable in this browser. Follow the captions above.":"Faster narration · Voice varies by device · Captions always available")}</p>
 <SiteLink className="story-next" href="#what-we-do">How we maintain your agents <ArrowRight size={14}/></SiteLink>
 </section>
}
