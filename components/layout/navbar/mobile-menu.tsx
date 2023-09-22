'use client'
import { Button } from "@/components/ui/button";
import { Menu } from "@/lib/shopify/types";
import { Bars3CenterLeftIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import Link from "next/link";
import Search from "@/components/layout/navbar/search";
import { useEffect } from "react";


export default function MobileMenu({ menu }: { menu: Menu[] }) {
    /**
     * we are using these hooks so we can close menu while navigating to other pages
     */
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const openMobileMenu = () => setIsOpen(true);
    const closeMobileMenu = () => setIsOpen(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname, searchParams]);
    return (
        <>
            <Button
                onClick={openMobileMenu}
                aria-label="Open mobile menu"
                className="flex items-center justify-center rounded-md bg-neutral md:hidden"
            >
                <Bars3CenterLeftIcon className="text-black w-6 h-6" />
            </Button>
            <Transition show={isOpen}>
                <Dialog onClose={closeMobileMenu}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="opacity-0 backdrop-blur-none"
                        enterTo="opacity-100 backdrop-blur-[.5px]"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="opacity-100 backdrop-blur-[.5px]"
                        leaveTo="opacity-0 backdrop-blur-none"
                    >
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="translate-x-[-100%]"
                        enterTo="translate-x-0"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-[-100%]"
                    >
                        <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-black">
                            <div className="p-4">
                                <Button
                                    className="flex items-center justify-center rounded-md bg-neutral md:hidden"
                                    onClick={closeMobileMenu}
                                    aria-label="Close mobile menu"
                                >
                                    <XMarkIcon className="text-black w-6 h-6" />
                                </Button>
                                <div className="mb-4 w-full">
                                    <Search />
                                </div>
                                {menu.length ? (
                                    <ul className="flex w-full flex-col">
                                        {menu.map((item: Menu) => (
                                            <li
                                                className="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
                                                key={item.title}
                                            >
                                                <Link href={item.path} onClick={closeMobileMenu}>
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    )
}