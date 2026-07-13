import cn from 'clsx'

type ProgressStepsProps = {
  total: number
  current: number
}

export function ProgressSteps({ total, current }: ProgressStepsProps) {
  return (
    <div className="inv-progress" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={cn(
            'inv-progress__dot',
            i === current && 'inv-progress__dot--active',
            i < current && 'inv-progress__dot--done',
          )}
        />
      ))}
    </div>
  )
}
