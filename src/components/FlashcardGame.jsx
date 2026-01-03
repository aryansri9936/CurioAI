import React, { useEffect, useState } from 'react';
import api from '../utils/api';
export default function FlashcardGame({ docId }){
 const [cards, setCards] = useState([]);
 const [mode, setMode] = useState('flash');
 const [flipped, setFlipped] = useState({});
 const [pairState, setPairState] = useState({ first: null, second: null });
 const [score, setScore] = useState(0);
 useEffect(()=>{
 if(!docId) return;
 async function load(){ const r = await api.get(`/pdf/${docId}/chunks`).catch(()=>null); const chunks = r?.data?.chunks?.slice(0,6).map((c,i)=>({ id:i, front: c.text.slice(0,60) + '...', back: c.text.slice(60,220) })) || []; setCards(chunks); }
 load();
 },[docId]);
 const memoryDeck = mode === 'memory' ? (() => { const pairs = cards.flatMap(c => ([{ ...c, uid: c.id + '-A' }, { ...c, uid: c.id + '-B' }])); return shuffle(pairs); })() : [];
 function shuffle(a){ return a.sort(()=>Math.random()-0.5); }
 function pick(uid){
 if(pairState.first === null) setPairState({ ...pairState, first: uid });
 else if(pairState.second === null && pairState.first !== uid) {
 setPairState(prev => ({ ...prev, second: uid }));
 const firstId = pairState.first;
 setTimeout(()=> {
 const f = memoryDeck.find(d=>d.uid===firstId);
 const s = memoryDeck.find(d=>d.uid===uid);
 if(f && s && f.id === s.id){
 setScore(sc => sc + 10);
 setFlipped(prev => ({ ...prev, [firstId]: true, [uid]: true }));
 }
 setPairState({ first: null, second: null });
 }, 700);
 }
 }
 return (
 <div className="card mt-4">
 <div className="flex justify-between items-center">
 <h4 className="font-semibold">Games</h4>
 <div className="space-x-2">
 <button onClick={()=>setMode('flash')} className={`px-2 py-1 rounded ${mode==='flash'?'bg-indigo-600 text-white':''}`}>Flashcards</button>
 <button onClick={()=>setMode('memory')} className={`px-2 py-1 rounded ${mode==='memory'?'bg-indigo-600 text-white':''}`}>Memory</button>
 </div>
 </div>
 {mode==='flash' && (<div className="mt-3">{cards.length===0 && <div className="text-gray-500">Upload a PDF to auto-generate cards</div>}{cards.map(c=>(<div key={c.id} className="p-2 border rounded mb-2"><div className="font-medium">{c.front}</div><div className="text-sm text-gray-600 mt-1">{c.back}</div></div>))}</div>)}
 {mode==='memory' && (<div className="mt-3 grid grid-cols-4 gap-2">{memoryDeck.map(card=>(<div key={card.uid} className={`p-3 border rounded text-center ${flipped[card.uid] ? 'bg-green-50' : 'bg-white'}`} onClick={()=> pick(card.uid)}>{flipped[card.uid] ? <div className="text-sm">{card.front}</div> : <div className="text-sm">?</div>}</div>))}</div>)}
 <div className="mt-2 text-sm text-gray-600">Score: {score}</div>
 </div>
 );
}
