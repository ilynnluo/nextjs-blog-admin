import SideBar from "@/app/components/sideBar/SideBar"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return(
    <div className="container columns-12">
      <div className="col-span-2">
        <SideBar />
      </div>
      <div className="col-span-10">
        {children}
      </div>
    </div>
  )
}