import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import Header from "../../my_components/header"
import ContentArea from "./ContentArea"
import SidebarArea from "./SidebarArea"



export default function SearchRecipies(){
    return (
        <div className="flex flex-col min-h-screen bg-background">
          <Header />
          <main className="flex-grow font-inter">
            <div className="grid grid-cols-1 grid-rows-[auto_minmax(0,1fr)] h-full md:grid-cols-[240px_minmax(0,1fr)]">
              <div className="row-start-1 row-span-2 hidden shrink-0 border-r border-gray-950/10 md:sticky md:block md:top-14 h-[calc(100vh-3.5rem)]">
                <div className="block h-full w-full">
                  <SidebarProvider>
                    <SidebarArea/>
                  </SidebarProvider>
                </div>
              </div>
              <div className="row-start-1 row-span-1 border-b border-gray-950/10 md:col-start-2">
                <div className="flex flex-row p-4">
                    VAR2
                </div>
              </div>
              <div className="row-start-2 row-span-1 border-gray-950/10 overflow-auto">
                <div className="flex flex-col ">
                  <ContentArea/>
                </div>
              </div>
            </div>
          </main>

        </div>
    )
}

