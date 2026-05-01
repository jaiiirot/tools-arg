import { TmuxLayout } from '@/templates/TmuxLayout'
import { CourseCard } from '@/molecules/CourseCard'
import { useCourses } from '@/features/courses/hooks/useCourses'
import { TerminalSpinner } from '@/atoms/Spinner'

export default function CoursesPage() {
  const { data: courses, isLoading } = useCourses()
  return (
    <TmuxLayout paneTitle="courses">
      {isLoading ? <TerminalSpinner label="Loading courses..." /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(courses ?? []).map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </TmuxLayout>
  )
}
