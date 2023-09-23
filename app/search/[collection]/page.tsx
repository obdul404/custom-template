import Grid from "@/components/grid/Grid";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts } from "@/lib/shopify";

export default async function CollectionPage({
    params,
    searchParams
}: {
    params: { collection: string };
    searchParams?: { [key: string]: string[] | string | undefined };
}) {
    const { sort } = searchParams as { [key: string]: string };
    const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
    const products = await getCollectionProducts({ handle: params.collection, sortKey, reverse });
    return (
        <section>
            {products.length === 0 ? (<p className="py-3 text-lg">{`No products found in this collection`}</p>) : (<Grid products={products}></Grid>)}
        </section>
    );
}