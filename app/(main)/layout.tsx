import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {findStoresByUser} from "@/lib/actions/store";

const MainLayout = async ({
    children
                          }: {children: React.ReactNode}) => {


    const { userId } = auth()

    if(!userId) {
        redirect("/sign-in")
    }

    let stores = await findStoresByUser()

    if(stores) {
        redirect(`/${stores[0].id}`)
    }


    return (
        <>{children}</>
    )
}

export default MainLayout