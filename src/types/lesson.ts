export type LessonStatus = 'done' | 'active' | 'locked'

export interface Lesson {
	id: number
	title: string
	status: LessonStatus
}
