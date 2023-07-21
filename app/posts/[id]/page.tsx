import SideBar from "@/app/components/sideBar/SideBar";
import TopBar from "@/app/components/topBar/TopBar";

export default function Post({
  params
}: {
  params: { id: string }
}) {
  return(
    <div>
      <TopBar />
      <div className="container 2xl mx-auto grid grid-cols-12">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10">
         {params.id} Post Page
        </div>
      </div>
    </div>
  )
}