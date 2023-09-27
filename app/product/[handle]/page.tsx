import { getProduct } from "@/lib/shopify"
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Gallery from "@/components/gallery/Gallery";

export default async function ProductPage({ params }: { params: { handle: string } }) {
    const product = await getProduct(params.handle);
    // const [display, setDisplay] = useState("block");
    if (!product) return notFound();
    console.log(product);
    return (
        <section className="">
            <Gallery product={product} />
        </section>
    );
}