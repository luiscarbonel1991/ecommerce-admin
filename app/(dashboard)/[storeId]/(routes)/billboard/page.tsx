import {Billboards} from "@/app/(dashboard)/[storeId]/(routes)/billboard/_components/billboards";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {findBillboards} from "@/lib/actions/billboard";

interface BillboardPageProps {
    params: {
        storeId: string
    }
}
const BillboardPage = async ({ params }: BillboardPageProps) => {

    const { userId } = auth()

    if(!userId) {
        redirect('/sign-in')
    }

    const billboards =  await findBillboards(Number(params.storeId))

    return (
        <div className="flex flex-col">
            <div className="flex-1">
               <Billboards data={billboards}/>
            </div>
        </div>
    )
};

export default BillboardPage;