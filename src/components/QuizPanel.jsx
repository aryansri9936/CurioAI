import React, { useState } from 'react';
import api from '../utils/api';
export default function QuizPanel({ docId }){
 const [questions, setQuestions] = useState([]);
 const [loading, setLoading] = useState(false);
 async function gen(){
 if(!docId) return alert('Pick a doc');
 setLoading(true);
 const chunks = await api.get(`/pdf/${docId}/chunks`);
 const chapterText = (chunks.data.chunks || []).slice(0,6).map(c=>c.text).join('\n\n');
 const r = await api.post('/quiz/generate', { docId, chapterText, count: 8 });
 setQuestions(r.data.questions || []);
 setLoading(false);
 }
 return (<div className="card"><div className="flex justify-between items-center"><h3 className="font-semibold">Auto Quiz</h3><button onClick={gen} className="px-3 py-1 rounded bg-green-500 text-white">{loading? '...' : 'Generate'}</button></div><div className="mt-3 space-y-2">{questions.length===0 && <div className="text-gray-500">No quiz yet</div>}{questions.map((q,idx)=>(<div key={idx} className="p-3 border rounded"><div className="font-medium">{idx+1}. {q.question}</div>{q.options && q.options.map((o,i)=>(<div key={i} className="ml-4">• {o}</div>))}<div className="text-sm text-gray-500 mt-1">Answer: {q.answer}</div></div>))}</div></div>);
}
