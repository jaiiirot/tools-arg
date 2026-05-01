export interface Lesson {
  id: string
  title: string
  description: string
  videoUrl: string
  duration: number
  order: number
  isFree: boolean
}

export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  instructor: string
  lessons: Lesson[]
  enrolledCount: number
  rating: number
  createdAt: string
}

export interface CourseProgress {
  courseId: string
  completedLessons: string[]
  percentage: number
}
