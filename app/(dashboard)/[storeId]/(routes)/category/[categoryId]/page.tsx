import {BillboardForm} from "@/app/(dashboard)/[storeId]/(routes)/billboard/[billboardId]/_components/billboard-form";
import {findCategory} from "@/lib/actions/category.action";
import {CategoryForm} from "@/app/(dashboard)/[storeId]/(routes)/category/[categoryId]/_components/category-form";
import {util} from "zod";
import {Category} from "@/types";
import {findBillboards} from "@/lib/actions/billboard";
import {isInteger} from "@/lib/utils";

interface CategoryCreateUpdatePageProps {
    params: { storeId: string, categoryId: string }
}

const CategoryCreateUpdatePage = async ({
                                            params
                                        }: CategoryCreateUpdatePageProps) => {

    let category: Category | null = null

    if(isInteger(params.categoryId)) {
       category = await findCategory(parseInt(params.categoryId)) as Category
    }

    const billboards = await findBillboards(Number(params.storeId))

    return (
        <div className="flex flex-col">
            <div className="flex-1">
                <CategoryForm category={category} billboards={billboards || []}/>
            </div>
        </div>
    );
}

export default CategoryCreateUpdatePage;