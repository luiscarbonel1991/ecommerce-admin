import {FiActivity} from "react-icons/fi";
import Link from "next/link";
import {UserButton, auth} from "@clerk/nextjs";
import StoreSwitcher from "@/components/store-switcher";
import {findStoresByUser} from "@/lib/actions/store";
import {redirect} from "next/navigation";


const Header = async () => {

    const { userId } = auth()

    if(!userId) {
        redirect("/sign-in")
    }

    const stores = await findStoresByUser()

    if(!stores) {
        redirect("/")
    }

    const formattedStores = stores.map(store => ({
        id: store.id,
        name: store.name
    }))


    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center space-x-2">
                <Link href="/" className="mr-6 flex items-center space-x-2 w-full">
                    <FiActivity className="h-6 w-6"/>
                    <span className="font-bold sm:inline-block">
                      {"CE-commerce"}
                    </span>
                </Link>

                <nav className="md:ml-auto justify-end  w-full flex items-center gap-x-4">
                    <StoreSwitcher className="w-2/6" items={formattedStores}/>
                    <UserButton afterSignOutUrl={"/"}/>
                </nav>
            </div>
        </header>
)
}

export default Header;