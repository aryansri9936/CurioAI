import React, { useState } from 'react';
import api from '../utils/api';
export default function ChatPanel({ docId }){
  const [q, setQ] = useState('');
  const [messages, setMessages] = useState([]);
  async function send(){
    if(!docId) return alert('Select or upload a doc first');
    if(!q.trim()) return;
    setMessages(m=>[...m, { role:'user', text: q }]);
    const thisQ = q;
    setQ('');
    try {
      const r = await api.post('/chat/rag', { docId, question: thisQ });
      setMessages(m=>[...m, { role:'bot', text: r.data.answer }]);
    } catch(e){
      console.error(e);
      setMessages(m=>[...m, { role:'bot', text: 'Error getting answer' }]);
    }
  }
  return (<div className="card"><h3 className="font-semibold">Ask about the PDF</h3><div className="h-48 overflow-auto mt-2 p-2 bg-slate-50 rounded">{messages.map((m,i)=>(<div key={i} className={m.role==='user' ? 'text-right' : 'text-left'}><div className={`inline-block p-2 my-1 rounded ${m.role==='user' ? 'bg-indigo-500 text-white' : 'bg-white shadow'}`}>{m.text}</div></div>))}</div><div className="mt-2 flex gap-2"><input value={q} onChange={(e)=>setQ(e.target.value)} className="flex-1 p-2 rounded" placeholder="Ask a question..." /><button onClick={send} className="btn">Ask</button></div></div>);
}
