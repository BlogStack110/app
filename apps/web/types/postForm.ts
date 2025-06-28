import { z } from "zod"

export const titleSchema = z.string().min(3, "Title must be over 3 characters").max(100, "Title must be under 100 characters")
export const contentSchema = z.string().min(10, "Content must be over 10 characters")
export const tagsSchema = z.array(z.string()).min(1, "At least one tag is required")
