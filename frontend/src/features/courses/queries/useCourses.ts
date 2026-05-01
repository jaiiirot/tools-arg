import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import { queryKeys, staleTimes } from "@/lib/queryClient"
import type { PaginatedResponse, Course } from "@/types/api"

interface Filters { search?: string; level?: string; category?: string; page?: number }

export function useCourses(filters: Filters = {}) {
  return useQuery<PaginatedResponse<Course>>({
    queryKey: queryKeys.courses.list(filters),
    queryFn: async () => {
      // api/courses
      const { data } = await api.get("/courses", { params: filters })
      return data.data
    },
    staleTime: staleTimes.courses,
  })
}
