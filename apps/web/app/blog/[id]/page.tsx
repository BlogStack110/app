export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { id } = await params
  return <div>My Post: {id}</div>
}
