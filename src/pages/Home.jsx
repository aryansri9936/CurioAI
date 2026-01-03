import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import PDFUploader from '../components/PDFUploader';
import ChatPanel from '../components/ChatPanel';
import QuizPanel from '../components/QuizPanel';
import Dashboard from '../components/Dashboard';
import FlashcardGame from '../components/FlashcardGame';
import { Link } from 'react-router-dom';
export default function Home(){
 const [docId, setDocId] = useState(null);
 const [previewUrl, setPreviewUrl] = useState(null);
 const [docs, setDocs] = useState([]);
 async function refreshDocs(){ const r = await api.get('/pdf/list'); setDocs(r.data.docs || []); }
 useEffect(()=> { refreshDocs(); }, []);
 return (
 <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
 <div className="max-w-7xl mx-auto p-8 space-y-8">
 <div className="flex justify-between items-center mb-10">
 <div>
 <h1 className="text-5xl font-bold text-gradient mb-2">CurioAI</h1>
 <p className="text-slate-400 text-lg">Your Intelligent Study Companion</p>
 </div>
 <Link to="/game" className="btn shadow-glow">🎮 Play Game</Link>
 </div>
 <div className="grid grid-cols-3 gap-6">
 <div className="col-span-2 space-y-6">
 <PDFUploader onUploaded={({docId, preview}) => { setDocId(docId); setPreviewUrl(preview); refreshDocs(); }} />
 <div className="grid grid-cols-2 gap-6">
 <div className="card shadow-glow">
 <h3 className="text-xl font-semibold text-slate-100 mb-4">📄 PDF Preview</h3>
 {previewUrl ? <iframe src={previewUrl} className="w-full h-64 border border-slate-700 rounded-lg" /> : <div className="text-slate-400 mt-4 text-center py-16">Upload a PDF to preview here</div>}
 </div>
 <Dashboard />
 </div>
 <div className="grid grid-cols-2 gap-6">
 <ChatPanel docId={docId} />
 <QuizPanel docId={docId} />
 </div>
 </div>
 <div className="space-y-6">
 <div className="card shadow-glow">
 <h3 className="text-xl font-semibold text-slate-100 mb-4">📚 Your Documents</h3>
 {docs.length === 0 ? <p className="text-slate-400 text-center py-8">No documents yet. Upload one to start!</p> : <ul className="mt-2 space-y-2">{docs.map(d => <li key={d._id} className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all"><div className="flex-1"><div className="font-medium text-slate-100">{d.fileName}</div><div className="text-xs text-slate-400 mt-1">{d.count} chunks</div></div><button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all" onClick={()=> { setDocId(d._id); }}>Select</button></li>))}</ul>}
 </div>
 <FlashcardGame docId={docId} />
 </div>
 </div>
 </div>
 </div>
 );
}
