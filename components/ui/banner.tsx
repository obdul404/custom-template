import Image from "next/image";
import { Button } from "./button";
import banner from '@/public/banner.png'

export default function Banner() {
    return (
        <section className="bg-white">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Luxury fashion & Accessories</h1>
                    <Button className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        EXPLORE COLLECTION
                    </Button>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image src={banner} width={1280} height={720} alt="banner"></Image>
                </div>
            </div>
        </section>
    )
}