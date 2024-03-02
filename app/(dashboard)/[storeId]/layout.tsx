
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {findStore} from "@/lib/actions/store";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import Ecommerce from "@/components/ecommerce";
import {cookies} from "next/headers";

interface DashBoardProps {
    children: React.ReactNode
    params: { storeId: string }
}
const DashBoardLayout = async ({ children, params }: DashBoardProps) => {

    const layout = cookies().get("react-resizable-panels:layout")
    const collapsed = cookies().get("react-resizable-panels:collapsed")

    const defaultLayout = layout && layout.value ? JSON.parse(layout.value) : undefined;

    const { userId } = auth()

    if(!userId) {
        redirect("/sign-in")
    }

    let store
    try {
        const storeId = parseInt(params.storeId)
        if(isNaN(storeId)) {
            redirect("/")
        }

        store = await findStore(storeId)
        if(!store) {
            redirect("/")
        }

    } catch (error) {
        redirect("/")
    }

    return (
        /*<>
            <Header />
            <div className="flex">
                <Sidebar />

                <div className="flex-1">
                    {children}
                </div>

            </div>
        </>*/

        <>
            <Header />
            <div className="flex h-screen">
                <Ecommerce
                    defaultLayout={defaultLayout}
                    navCollapsedSize={4}
                >
                    {children}
                </Ecommerce>
            </div>
        </>
    )

}

export default DashBoardLayout