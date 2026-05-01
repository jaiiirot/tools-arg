import { memo } from "react"
import { Badge } from "@/components/atoms/Badge"
import { Button } from "@/components/atoms/Button"
import { formatCurrency } from "@/lib/utils"
import type { Course } from "@/types/api"

interface Props { course: Course; onOpen?: (c: Course) => void; onHover?: (id: string) => void }

export const CourseCard = memo(({ course, onOpen, onHover }: Props) => {
  const levelMap: Record<string, string> = { beginner:"active", intermediate:"pending", advanced:"failed" }
  return (
    <div
      className="border border-terminal-border bg-terminal-bg-sec rounded p-4 flex flex-col gap-3 hover:border-terminal-cyan transition-all duration-200 hover:cyan-glow"
      onMouseEnter={() => onHover?.(course.id)}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-sm text-terminal-text font-medium">{course.title}</span>
        <Badge status={levelMap[course.level] as any} label={course.level} />
      </div>
      <p className="text-xs text-terminal-muted font-mono line-clamp-2">{course.description}</p>
      <div className="text-xs text-terminal-muted font-mono">by {course.instructor}</div>
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-terminal-yellow">★ {course.rating.toFixed(1)}</span>
        <span className="text-terminal-border">|</span>
        <span className="text-terminal-muted">{course.lessons.length} lecciones</span>
      </div>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-terminal-border">
        <span className="text-terminal-cyan font-mono text-lg font-bold">
          {course.price === 0 ? "FREE" : formatCurrency(course.price)}
        </span>
        <Button variant="cyan" className="text-xs px-3 py-1.5" onClick={() => onOpen?.(course)}>
          {course.enrolled ? "> continuar" : "> inscribirse"}
        </Button>
      </div>
    </div>
  )
})
CourseCard.displayName = "CourseCard"
