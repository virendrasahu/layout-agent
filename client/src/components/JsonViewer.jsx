export default function JsonViewer({ layout }) {
  return (
    <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed">
      {JSON.stringify(layout, null, 2)}
    </pre>
  );
}
