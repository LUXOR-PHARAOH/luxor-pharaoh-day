'use client';

import {useRef,useState} from 'react';
import Link from 'next/link';

export default function SoundtrackControl(){
  const [on,setOn]=useState(false);
  const ctx=useRef<AudioContext|null>(null);
  const nodes=useRef<OscillatorNode[]>([]);
  const toggle=()=>{
    if(on){nodes.current.forEach(n=>{try{n.stop()}catch{}});nodes.current=[];ctx.current?.close();ctx.current=null;setOn(false);return;}
    const AudioCtx=window.AudioContext||((window as unknown as {webkitAudioContext:typeof AudioContext}).webkitAudioContext);
    const ac=new AudioCtx();ctx.current=ac;
    const master=ac.createGain();master.gain.value=.018;master.connect(ac.destination);
    const filter=ac.createBiquadFilter();filter.type='lowpass';filter.frequency.value=900;filter.connect(master);
    [110,164.81,220,329.63].forEach((freq,i)=>{const o=ac.createOscillator();o.type=i%2?'sine':'triangle';o.frequency.value=freq;o.detune.value=i*2;o.connect(filter);o.start();nodes.current.push(o);});
    setOn(true);
  };
  return <div className="sound-suite"><div><b>♫ Atmosphere Mode</b><small>صوت أصلي مولّد محليًا — بدون تسجيلات تجارية مدمجة</small></div><div className="sound-actions"><button type="button" className="sound-control" onClick={toggle} aria-pressed={on} aria-label="تشغيل أو إيقاف أجواء صوتية">{on?'◼ إيقاف الأجواء':'♫ تشغيل الأجواء'}</button><Link className="sound-link" href="/soundtrack">اختيار الموسيقى / Soundtrack Guide</Link></div></div>;
}