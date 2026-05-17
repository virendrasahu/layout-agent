import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import WireframePreview from './components/WireframePreview';
import JsonViewer from './components/JsonViewer';
import initialLayout from './data/initialLayout.json';

function App() {
  const [layout, setLayout] = useState(initialLayout);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-20 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Layout Agent</h1>
        </div>
      </header>

      <main className="flex-1 flex relative">
        {/* Left Column: Chat */}
        <section className="w-1/3 min-w-[350px] border-r border-slate-200 bg-white flex flex-col shadow-sm z-10 sticky top-[73px] h-[calc(100vh-73px)]">
          <ChatWindow layout={layout} setLayout={setLayout} />
        </section>

        {/* Right Column: Preview & JSON */}
        <section className="flex-1 flex flex-col bg-slate-50">
          <div className="p-8 flex items-center justify-center min-h-[60vh]">
            <WireframePreview layout={layout} />
          </div>
          <div className="border-t border-slate-200 bg-slate-900 text-slate-300 shadow-inner">
            <div className="px-4 py-2 bg-slate-800 text-xs font-mono border-b border-slate-700 sticky top-[73px] uppercase tracking-wider z-10">
              Layout JSON
            </div>
            <div className="p-4">
              <JsonViewer layout={layout} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
