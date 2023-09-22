import { Product } from "@/lib/shopify/types";
import Tile from "../tile.tsx/Tile";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function Grid({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
                products.map((product) => (
                    <Link href={`/product/${product.handle}`}>
                        <Tile className="flex flex-col justify-center items-center overflow-hidden">
                            <div className="relative aspect-square w-56 h-56 md:w-96 md:h-96"> {/* Ensure this container has a height and width */}
                                <Image
                                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-contain"
                                    src={product.featuredImage?.url}
                                    alt={product.title}
                                    fill
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2 mt-2">
                                <span>{product.title}</span>
                                <Badge variant={"outline"} className="text-sm md:text-md">
                                    <span>
                                        {`${new Intl.NumberFormat(undefined, {
                                            style: 'currency',
                                            currency: product.priceRange.maxVariantPrice.currencyCode,
                                            currencyDisplay: 'narrowSymbol'
                                        }).format(parseFloat(product.priceRange.maxVariantPrice.amount))}`}
                                        <span className="ml-1">{product.priceRange.maxVariantPrice.currencyCode}</span>
                                    </span>
                                </Badge>
                            </div>
                        </Tile>
                    </Link>
                ))
            }
        </div>)
}