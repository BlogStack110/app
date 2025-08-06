export interface Profile {
	userId: string
	imgUrl: string
	fullName: string
	about: string
	totalPosts: number
	totalLikes: number
	totalVeiws: number
	socialLinks: string[]
	followers: number
	joinedDate: Date
	emailVerified: boolean
}
