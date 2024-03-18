import {findBillboard} from "@/lib/actions/billboard";
import {isInteger} from "@/lib/utils";
import {BillboardForm} from "@/app/(dashboard)/[storeId]/(routes)/billboard/[billboardId]/_components/billboard-form";
import {BillboardFormModel} from "@/types";
import {findImageById} from "@/lib/actions/image.action";

interface BillboardCreateUpdatePageProps {
    params: { storeId: string, billboardId: string }
}
const BillboardCreateUpdatePage = async ({
                                            params
                                         }: BillboardCreateUpdatePageProps) => {


    let initialBillboardFormData: BillboardFormModel | null = null
    if(isInteger(params.billboardId)) {
         const billboard = await findBillboard(parseInt(params.billboardId))
        if(billboard) {
            initialBillboardFormData = {
                id: billboard.id,
                name: billboard.name,
                storeId: billboard.storeId,
                imageId: billboard.imageId,
                image:  billboard.imageId ? await findImageById(billboard.imageId) : null
            }
        }
    }


    return (
        <div className="flex flex-col">
            <div className="flex-1">
                <BillboardForm billboard={initialBillboardFormData}/>
            </div>
        </div>
    );
}

export default BillboardCreateUpdatePage;