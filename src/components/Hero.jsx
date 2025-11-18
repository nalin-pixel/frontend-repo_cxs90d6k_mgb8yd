import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-8">
        <div className="backdrop-blur-sm bg-slate-900/40 rounded-2xl p-8 border border-white/10">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            ImpactFlow
          </h1>
          <p className="mt-4 text-slate-200 text-lg md:text-xl">
            Intelligent Event & Volunteer Management System for NGOs.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#create" className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition">Create Event</a>
            <a href="#dashboard" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition">View Dashboard</a>
          </div>
        </div>
        <div className="hidden lg:block" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900" />
    </section>
  );
}
