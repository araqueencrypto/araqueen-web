export default function Governance() {
  return (
    <section id="governance" className="py-20 bg-gradient-to-b from-[#fff6ff] to-[#fffaf6]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">The Royal Decree — Governance</h2>
        <p className="text-gray-600 mb-6">Holders propose and vote; the Council ensures feasibility; smart contracts execute the decree.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/60 rounded-xl">Propose</div>
          <div className="p-6 bg-white/60 rounded-xl">Review</div>
          <div className="p-6 bg-white/60 rounded-xl">Execute</div>
        </div>
      </div>
    </section>
  );
}
