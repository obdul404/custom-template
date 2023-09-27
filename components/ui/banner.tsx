import Image from "next/image";
import { Button } from "./button";
import banner from '@/public/banner.png'

export default function Banner() {
    return (
        <section className="bg-white">
            <div className="relative grid justify-center justify-items-center">
                <div className="">
                    <Image src={banner} width={1280} height={720} alt="banner"></Image>
                </div>
                <div className="absolute top-2/3 flex flex-col justify-center">
                    <h1 className="text-xl font-bold text-white">Luxury fashion & Accessories</h1>
                    <Button>
                        EXPLORE COLLECTION
                    </Button>
                </div>

            </div>
        </section>
    )
}