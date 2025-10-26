export default function Roadmap() {
  const steps = [
    { title: "Phase I", subtitle: "Launch & Community Building" },
    { title: "Phase II", subtitle: "Smart Contract & Audit" },
    { title: "Phase III", subtitle: "Tokenomics & Real-World Integration" },
    { title: "Phase IV", subtitle: "Cross-chain & Scaling" },
  ];

  return (
    <section id="roadmap" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Royal Roadmap</h2>
        <div className="space-y-8">
          {steps.map((s,i)=>(
            <div key={i} className="p-6 rounded-xl bg-gradient-to-r from-pink-50 to-yellow-50 border border-pink-100">
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm text-gray-600">{s.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
