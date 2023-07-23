import SideBar from "../components/sideBar/SideBar"
import TopBar from "../components/topBar/TopBar"

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <TopBar />
      <div className="container 2xl mx-auto grid grid-cols-12">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10">
          <div className="container mx-auto p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}