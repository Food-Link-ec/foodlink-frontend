interface LogoProps {
  size?: number
  withWordmark?: boolean
  light?: boolean
  compact?: boolean
}

export default function Logo({ size = 40, withWordmark = true, light = false, compact = false }: LogoProps) {
  const badgeBg = light ? '#FAF7F0' : '#1F4D3C'
  const iconColor = light ? '#1F4D3C' : '#FAF7F0'
  const nodeColor = '#D9713F'
  const wordColor = light ? '#FAF7F0' : '#17241D'

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: compact ? 8 : 12 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="40" height="40" rx="11" fill={badgeBg} />
        <path
          d="M14 25C11.5 20.5 13 15.5 18.5 13C20.5 16 20.5 20 17.5 23C16 24.5 15 25 14 25Z"
          fill={iconColor}
        />
        <path d="M18 19.5C21.5 19.5 24 21 25.5 24" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="26.5" cy="25.3" r="2.6" fill={nodeColor} />
      </svg>

      {withWordmark && (
        <span
          style={{
            fontFamily: 'var(--fl-font-display)',
            fontWeight: 800,
            fontSize: compact ? '1.15rem' : '1.6rem',
            color: wordColor,
            letterSpacing: '-0.03em',
          }}
        >
          Food<span style={{ color: nodeColor }}>Link</span>
        </span>
      )}
    </span>
  )
}