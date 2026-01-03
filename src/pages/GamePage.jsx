import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
export default function GamePage(){
 const [questions, setQuestions] = useState([]);
 const [idx, setIdx] = useState(0);
 const [score, setScore] = useState(0);
 useEffect(()=>{ async function load(){ const list = await api.get('/pdf/list'); const doc = list.data.docs?.[0]; if(!doc) return setQuestions([{ question:'Upload a PDF to enable game', options:['OK'], answer:'OK' }]); const r = await api.get(`/game/trivia/${doc._id}`); setQuestions(r.data.questions || []); } load(); },[]);
 function answer(choice){ if(choice === questions[idx].answer) setScore(s => s + 10); setIdx(i => i+1); }
 if(idx >= questions.length) return (<div className="max-w-3xl mx-auto p-6"><h2 className="text-2xl font-bold">Game Over</h2><div className="mt-3">Your score: {score}</div><Link to="/" className="mt-4 inline-block btn">Back</Link></div>);
 const q = questions[idx] || {};
 return (<div className="max-w-3xl mx-auto p-6"><h2 className="text-xl font-bold">Curio Trivia</h2><div className="card mt-4"><div className="font-medium">{q.question}</div><div className="mt-3 grid grid-cols-1 gap-2">{(q.options || []).map((o,i)=> <button key={i} onClick={()=>answer(o)} className="p-2 border rounded text-left">{o}</button>)}</div></div><div className="mt-3">Score: {score}</div></div>);
}
