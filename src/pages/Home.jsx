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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">CurioAI — Playful Study</h1>
        <div className="space-x-2">
          <Link to="/game" className="btn">Play game</Link>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <PDFUploader onUploaded={({docId, preview}) => { setDocId(docId); setPreviewUrl(preview); refreshDocs(); }} />
          <div className="grid grid-cols-2 gap-4">
            <div className="card">
              <h3 className="font-semibold">PDF Preview</h3>
              {previewUrl ? <iframe src={previewUrl} className="w-full h-64 border mt-2" /> : <div className="text-gray-500 mt-2">Upload a PDF to preview here.</div>}
            </div>
            <Dashboard />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ChatPanel docId={docId} />
            <QuizPanel docId={docId} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold">Available Docs</h3>
            <ul className="mt-2 space-y-1">
              {docs.map(d => <li key={d._id} className="flex justify-between items-center">
                <div>{d.fileName} · {d.count} chunks</div>
                <button className="px-2 py-1 rounded bg-indigo-100" onClick={()=> { setDocId(d._id); }}>Select</button>
              </li>)}
            </ul>
          </div>
          <FlashcardGame docId={docId} />
        </div>
      </div>
    </div>
  );
}
