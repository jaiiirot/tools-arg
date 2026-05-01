import { memo } from 'react'
import { Star, BookOpen } from 'lucide-react'
import { Button } from '@/atoms/Button'
import { Tag } from '@/atoms/Tag'
import { formatPrice } from '@/lib/utils'
import type { Course } from '@/types/course.types'

interface CourseCardProps { course: Course; onEnroll?: (c: Course) => void }

export const CourseCard = memo(function CourseCard({ course, onEnroll }: CourseCardProps) {
  return (
    <div className="bg-terminal-secondary border border-terminal-border hover:border-terminal-cyan transition-colors p-3 flex flex-col gap-2">
      {course.thumbnail && (
        <img src={course.thumbnail} alt={course.title} className="w-full h-28 object-cover border border-terminal-border" />
      )}
      <p className="text-terminal-text text-sm font-medium line-clamp-2">{course.title}</p>
      <div className="flex items-center gap-2">
        <Tag>{course.level}</Tag>
        <Tag>{course.category}</Tag>
      </div>
      <div className="flex items-center gap-1 text-terminal-yellow text-xs">
        <Star className="w-3 h-3 fill-current" />
        <span>{course.rating.toFixed(1)}</span>
        <span className="text-terminal-muted ml-1"><BookOpen className="inline w-3 h-3" /> {course.lessons.length} lessons</span>
      </div>
      <div className="flex items-center justify-between mt-auto pt-1 border-t border-terminal-border">
        <span className="text-terminal-cyan font-bold">{course.price === 0 ? 'FREE' : formatPrice(course.price)}</span>
        <Button size="sm" variant="command" onClick={() => onEnroll?.(course)}>ENROLL</Button>
      </div>
    </div>
  )
})
