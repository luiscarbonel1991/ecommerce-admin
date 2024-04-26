import {Billboards} from "@/app/(dashboard)/[storeId]/(routes)/billboard/_components/billboards";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {findBillboards} from "@/lib/actions/billboard";
import {Categories} from "@/app/(dashboard)/[storeId]/(routes)/category/_components/categories";
import {findCategories} from "@/lib/actions/category.action";

interface CategoryPageProps {
    params: {
        storeId: string
    }
}
const CategoryPage = async ({ params }: CategoryPageProps) => {

    const { userId } = auth()

    if(!userId) {
        redirect('/sign-in')
    }

    const categories =  await findCategories(Number(params.storeId))

    return (
        <div className="flex flex-col">
            <div className="flex-1">
               <Categories data={categories}/>
            </div>
        </div>
    )
};

export default CategoryPage;