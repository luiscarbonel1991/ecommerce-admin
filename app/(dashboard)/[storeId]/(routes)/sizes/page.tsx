import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {findSizes} from "@/lib/actions/size.action";
import {Sizes} from "@/app/(dashboard)/[storeId]/(routes)/sizes/_components/sizes";

interface BillboardPageProps {
    params: {
        storeId: string
    }
}

const SizesPage = async ({params}: BillboardPageProps) => {

    const {userId} = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const sizes = await findSizes(Number(params.storeId))

    return (
        <div className="flex flex-col">
            <div className="flex-1">
                <Sizes data={sizes}/>
            </div>
        </div>
    )
};

export default SizesPage;