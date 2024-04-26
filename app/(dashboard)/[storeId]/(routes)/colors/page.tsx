import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {findColors} from "@/lib/actions/color.action";
import {Colors} from "@/app/(dashboard)/[storeId]/(routes)/colors/_components/colors";

interface ColorPageProps {
    params: {
        storeId: string
    }
}

const colorsPage = async ({params}: ColorPageProps) => {

    const {userId} = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const colors = await findColors(Number(params.storeId))

    return (
        <div className="flex flex-col">
            <div className="flex-1">
                <Colors data={colors}/>
            </div>
        </div>
    )
};

export default colorsPage;