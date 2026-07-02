interface LogoProps {
  size?: number
  withWordmark?: boolean
  light?: boolean
}

export default function Logo({ size = 32, withWordmark = true, light = false }: LogoProps) {
  const ink = light ? '#FAF7F0' : '#1F4D3C'
  const accent = '#E8543E'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 6C13 10 10 15 12 22C13.6 27.2 18.3 29 20 29C21.7 29 26.4 27.2 28 22C30 15 27 10 20 6Z" fill={ink} />
        <path d="M20 29C20 24 24 22 28 23.5" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      {withWordmark && (
        <span style={{ fontFamily: 'var(--fl-font-display)', fontWeight: 700, fontSize: '1.2rem', color: ink, letterSpacing: '-0.02em' }}>
          Food<span style={{ color: accent }}>Link</span>
        </span>
      )}
    </span>
  )
}