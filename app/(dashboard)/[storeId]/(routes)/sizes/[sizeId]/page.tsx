import {isInteger} from "@/lib/utils";
import {SizeFormModel} from "@/types";
import {findSizeById} from "@/lib/actions/size.action";
import {SizeForm} from "@/app/(dashboard)/[storeId]/(routes)/sizes/[sizeId]/_components/size-form";

interface SizeCreateUpdatePageProps {
    params: { storeId: string, sizeId: string }
}
const SizeCreateUpdatePage = async ({
                                            params
                                         }: SizeCreateUpdatePageProps) => {


    let initialSizeFormData: SizeFormModel | null = null
    if(isInteger(params.sizeId)) {
         const size = await findSizeById(parseInt(params.sizeId))
        if(size) {
            initialSizeFormData = {
                id: size.id,
                name: size.name,
                value: size.value,
                storeId: size.storeId,
            }
        }
    }


    return (
        <div className="flex flex-col">
            <div className="flex-1">
                <SizeForm size={initialSizeFormData}/>
            </div>
        </div>
    );
}

export default SizeCreateUpdatePage;