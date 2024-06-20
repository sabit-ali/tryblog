import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { ModeToggle } from "./modeToggle"
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth"
import Link from "next/link"

export function SheetDemo() {

    const { data: session } = useSession();
    const user: User = session?.user as User;
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline"><MenuIcon /></Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Profile</SheetTitle>
                </SheetHeader>
                
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="mt-10">
                            <ModeToggle />
                        </div>
                        {session ? (
                            <Button onClick={() => signOut()}>logout</Button>
                        ) : (
                            <Link href={'/sign-up'}>
                                <Button>Sign-up</Button>
                            </Link>
                        )}
                    </div>
                
                <SheetFooter>
                    <SheetClose asChild>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
