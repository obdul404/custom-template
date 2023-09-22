import { getMenu } from "@/lib/shopify";
import { Menu } from "@/lib/shopify/types";
import Link from "next/link";
import MobileMenu from "@/components/layout/navbar/mobile-menu";
import Search from "@/components/layout/navbar/search";
import { Suspense } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
const { SITE_NAME } = process.env;

export default async function Navbar() {
    const menu = await getMenu('Main-menu');
    return (
        <nav className="relative flex items-center justify-between p-4 lg:px-6 bg-gray-100">
            <div className="block flex-none md:hidden">
                <MobileMenu menu={menu} />
            </div>
            <div className="flex w-full items-center">
                <div className="flex w-full md:w-1/3">
                    <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
                        {/* <LogoSquare /> */}
                        <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                            {SITE_NAME}
                        </div>
                    </Link>
                    {menu.length ? (
                        <ul className="hidden gap-6 text-sm md:flex md:items-center">
                            {menu.map((item: Menu) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.path}
                                        className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
                <div className="hidden justify-center md:flex md:w-1/3">
                    <Search />
                </div>
                <div className="flex justify-end md:w-1/3">
                    <Suspense>
                        <Button className="bg-neutral">
                            <ShoppingCartIcon className="text-black h-6" />
                        </Button>
                    </Suspense>
                </div>
            </div>
        </nav>
    )
}