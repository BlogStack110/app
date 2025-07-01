import { useSearchParams } from "next/navigation"

const usePageNumber = () => {
  const searchParams = useSearchParams()
  const pageNumber: number = Number(searchParams.get("page"))
  return pageNumber ? pageNumber : 1
}
export default usePageNumber
