'use client'
import { Product } from "@/lib/shopify/types";
import Image from "next/image";
import { useState } from "react";
import clsx from 'clsx';

export default function Gallery({ product }: { product: Product }) {
    const [isActive, setActive] = useState(0)
    const show = (index: number) => setActive(index);
    return (
        // <div className="flex flex-col justify-center items-center md:flex-row md:justify-around bg-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center bg-gray-200">
            <div className="">
                {
                    product.images.map((image, index) => {
                        return (
                            <div className={clsx('w-96 h-96 m-4', isActive == index ? "block" : "hidden")} key={index}>
                                <Image
                                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className=""
                                    src={image.url}
                                    alt={product.title}
                                    width={400}
                                    height={400}
                                />
                            </div>
                        );
                    })
                }
                <div className="flex justify-center">
                    {
                        product.images.map((image, index) => {
                            return (
                                <div className="w-4 h-4 relative rounded-full bg-gray-900" key={index} onClick={() => show(index)}></div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="">
                <h2 className="mb-2 text-5xl font-medium">{product.title}</h2>
                <h2 className="">{product.title}</h2>
                <h2 className="">{product.title}</h2>
            </div>
        </div>
    )
}