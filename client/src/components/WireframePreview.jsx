import { useMemo } from 'react';

export default function WireframePreview({ layout }) {
  const artboard = layout.find(n => n.type === 'artboard') || layout[0];
  
  if (!artboard) return <div className="text-slate-400">No artboard found</div>;

  // Calculate scaling to fit the preview container
  // Let's assume the preview container is about 500x500 max
  const containerSize = 400;
  const scale = Math.min(
    containerSize / artboard.width,
    containerSize / artboard.height
  );

  const previewWidth = artboard.width * scale;
  const previewHeight = artboard.height * scale;

  return (
    <div className="relative shadow-xl ring-1 ring-black/5 flex items-center justify-center bg-white"
         style={{ width: previewWidth, height: previewHeight }}>
      
      {/* Background info layer indicating actual size */}
      <div className="absolute -top-8 text-xs font-semibold text-slate-400 flex items-center justify-between w-full">
        <span>Artboard: {artboard.width}x{artboard.height}</span>
        <span>{Math.round(scale * 100)}% scale</span>
      </div>

      {layout.map((node) => {
        if (node.type === 'artboard') return null;

        // Use normalized values to position exactly within the parent
        const left = `${(node.nx || 0) * 100}%`;
        const top = `${(node.ny || 0) * 100}%`;
        const width = `${(node.nw || 1) * 100}%`;
        const height = `${(node.nh || 1) * 100}%`;

        const baseClasses = "absolute overflow-hidden flex flex-col items-center justify-center text-center transition-all duration-300";

        if (node.type === 'image') {
          return (
            <div key={node.id} className={`${baseClasses} bg-slate-200 border-2 border-dashed border-slate-300 rounded-sm`}
                 style={{ left, top, width, height }}>
              {node.data ? (
                <img src={node.data} alt={node.name} className="w-full h-full object-cover opacity-80" />
              ) : (
                <span className="text-xs text-slate-500 font-medium px-2">{node.name}</span>
              )}
            </div>
          );
        }

        if (node.type === 'text') {
          return (
            <div key={node.id} className={`${baseClasses}`}
                 style={{ 
                   left, top, width, height,
                   color: node.style?.color || '#000',
                   fontSize: `${(node.style?.fontSize || 16) * scale}px`,
                   fontWeight: node.style?.fontWeight || 'normal'
                 }}>
              <span className="truncate w-full block px-2 leading-tight">{node.data}</span>
            </div>
          );
        }

        if (node.type === 'shape') {
          return (
            <div key={node.id} className={`${baseClasses}`}
                 style={{ 
                   left, top, width, height,
                   backgroundColor: node.style?.backgroundColor || '#ccc',
                   color: node.style?.color || '#000',
                   borderRadius: node.style?.borderRadius || '0',
                   fontSize: `${(node.style?.fontSize || 16) * scale}px`,
                   fontWeight: node.style?.fontWeight || 'normal'
                 }}>
              <span className="truncate w-full px-1">{node.data || node.name}</span>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
