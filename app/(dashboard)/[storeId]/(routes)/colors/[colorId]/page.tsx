import {isInteger} from "@/lib/utils";
import {ColorFormModel, SizeFormModel} from "@/types";
import {findColorById} from "@/lib/actions/color.action";
import {ColorForm} from "@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/_components/color-form";

interface ColorCreateUpdatePageProps {
    params: { storeId: string, colorId: string }
}
const ColorCreateUpdatePage = async ({
                                            params
                                         }: ColorCreateUpdatePageProps) => {


    let initialSizeFormData: ColorFormModel | null = null
    if(isInteger(params.colorId)) {
         const color = await findColorById(parseInt(params.colorId))
        if(color) {
            initialSizeFormData = {
                id: color.id,
                name: color.name,
                value: color.value,
                storeId: color.storeId,
            }
        }
    }


    return (
        <div className="flex flex-col">
            <div className="flex-1">
                <ColorForm color={initialSizeFormData}/>
            </div>
        </div>
    );
}

export default ColorCreateUpdatePage;