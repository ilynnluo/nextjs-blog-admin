import MainLayout from "@/app/layout/layout";

export default function Post({
  params
}: {
  params: { id: string }
}) {
  return(
    <MainLayout>
      {params.id} Post Page
    </MainLayout>
  )
}