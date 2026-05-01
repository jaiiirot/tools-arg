import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/lib/axios'
import { STALE } from '@/lib/queryClient'
import type { Course, CourseProgress } from '@/types/course.types'
import type { ApiResponse } from '@/types/api.types'

export const courseKeys = {
  all:      ['courses'] as const,
  lists:    () => [...courseKeys.all, 'list'] as const,
  detail:   (id: string) => [...courseKeys.all, 'detail', id] as const,
  progress: (id: string) => [...courseKeys.all, 'progress', id] as const,
}

export function useCourses() {
  return useQuery({
    queryKey: courseKeys.lists(),
    queryFn:  () => apiClient.get<ApiResponse<Course[]>>('/courses').then((r) => r.data.data),
    staleTime: STALE.courses,
  })
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn:  () => apiClient.get<ApiResponse<Course>>(`/courses/${id}`).then((r) => r.data.data),
    staleTime: STALE.courses,
  })
}

export function useCourseProgress(courseId: string) {
  return useQuery({
    queryKey: courseKeys.progress(courseId),
    queryFn:  () => apiClient.get<ApiResponse<CourseProgress>>(`/courses/${courseId}/progress`).then((r) => r.data.data),
  })
}

export function useCompleteLesson(courseId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (lessonId: string) => apiClient.post(`/courses/${courseId}/lessons/${lessonId}/complete`),
    onSuccess:  () => qc.invalidateQueries({ queryKey: courseKeys.progress(courseId) }),
  })
}
