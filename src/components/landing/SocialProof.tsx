export function SocialProof() {
  const stats = [
    { value: '500+', label: 'videos created' },
    { value: '60s', label: 'avg render time' },
    { value: '0', label: 'editing skills needed' },
  ]

  return (
    <section className="bg-tempo-yellow border-b-4 border-black py-6" aria-label="Social proof">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
          <p className="font-[family-name:var(--font-heading)] text-[14px] font-bold text-black tracking-[-0.01em]">
            Trusted by indie makers shipping on Product Hunt & X
          </p>
          <div className="flex items-center gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-display)] text-[24px] md:text-[28px] font-extrabold text-black">
                  {stat.value}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-black tracking-[0.04em] uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
