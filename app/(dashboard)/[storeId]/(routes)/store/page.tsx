import { auth } from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {findStore} from "@/lib/actions/store";
import {StoreForm} from "@/app/(dashboard)/[storeId]/(routes)/store/_components/store-form";
import {Store} from "@/types";

interface StorePageProps {
    params: { storeId: string }
}
const StorePage = async ({
                             params
                         }: StorePageProps) => {

    const { userId } = auth()

    if(!userId) {
        redirect("/sign-in")
    }

    const store = await findStore(parseInt(params.storeId))

    if(!store) {
        redirect("/")
    }

    const initialStoreFormData = {
        id: store.id,
        name: store.name,
    } as Store

    return (
        <div className="flex flex-col">
         <div className="flex-1">
             <StoreForm store={initialStoreFormData}/>
         </div>
        </div>
    );
};


export default StorePage;