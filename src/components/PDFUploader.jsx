import React, { useState } from 'react';
import api from '../utils/api';
export default function PDFUploader({ onUploaded }){
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  async function upload(){
    if(!file) return alert('Pick a PDF');
    setLoading(true);
    const fd = new FormData();
    fd.append('pdf', file);
    try {
      const r = await api.post('/pdf/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setLoading(false);
      const res = r.data;
      onUploaded({ docId: res.docId, preview: (api.defaults.baseURL.replace('/api','') || '') + res.path });
      alert('Uploaded ' + res.fileName);
    } catch(err){
      setLoading(false);
      console.error(err);
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    }
  }
  return (<div className="card"><h3 className="font-semibold">Upload PDF</h3><input className="mt-2" type="file" accept="application/pdf" onChange={(e)=>setFile(e.target.files[0])} /><div className="mt-3"><button onClick={upload} className="btn">{loading? 'Uploading...':'Upload & Process'}</button></div></div>);
}
