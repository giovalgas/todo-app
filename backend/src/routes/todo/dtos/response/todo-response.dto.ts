export default interface TodoResponseDTO {
  body: string
  completed: boolean
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
