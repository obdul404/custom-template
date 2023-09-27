import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from '@/lib/constants';
import { isShopifyError } from "@/lib/type-guards";
import { Image, Connection, Menu, Product, ShopifyMenuOperation, ShopifyProduct, ShopifyProductsOperation, ShopifyCollectionProductsOperation, ShopifyProductOperation } from "@/lib/shopify/types";
import { getMenuQuery } from "@/lib/shopify/queries/menu";
import { ensureStartsWith } from "@/lib/shopify/utils";
import { getProductQuery, getProductsQuery } from "./queries/product";
import { getCollectionProductsQuery } from './queries/collection';
const domain = process.env.SHOPIFY_STORE_DOMAIN
    ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
    : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
    cache = "force-cache",
    headers,
    query,
    tags,
    variables
}: {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string;
    tags?: string[];
    variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': key,
                ...headers
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables })
            }),
            cache,
            ...(tags && { next: { tags } })
        });
        const body = await result.json();
        if (body.errors) {
            throw body.errors[0];
        }
        return {
            status: result.status,
            body
        };
    } catch (e) {
        if (isShopifyError(e)) {
            throw {
                cause: e.cause?.toString() || 'unknown',
                status: e.status || 500,
                message: e.message,
                query
            };
        }
        throw {
            error: e,
            query
        };
    }
}

const removeEdgesAndNodes = (array: Connection<any>) => {
    return array.edges.map((edge) => edge?.node);
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
    const flattened = removeEdgesAndNodes(images);

    return flattened.map((image) => {
        const filename = image.url.match(/.*\/(.*)\..*/)[1];
        return {
            ...image,
            altText: image.altText || `${productTitle} - ${filename}`
        };
    });
};

const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = true) => {
    if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
        return undefined;
    }

    const { images, variants, ...rest } = product;

    return {
        ...rest,
        images: reshapeImages(images, product.title),
        variants: removeEdgesAndNodes(variants)
    };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
    const reshapedProducts = [];

    for (const product of products) {
        if (product) {
            const reshapedProduct = reshapeProduct(product);

            if (reshapedProduct) {
                reshapedProducts.push(reshapedProduct);
            }
        }
    }

    return reshapedProducts;
};

export async function getMenu(handle: string): Promise<Menu[]> {
    const res = await shopifyFetch<ShopifyMenuOperation>({
        query: getMenuQuery,
        tags: [TAGS.collections],
        variables: {
            handle
        }
    });
    return (
        res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
            title: item.title,
            path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', '')
        })) || []
    );

}

export async function getProduct(handle: string): Promise<Product | undefined> {
    const res = await shopifyFetch<ShopifyProductOperation>({
        query: getProductQuery,
        tags: [TAGS.products],
        variables: {
            handle: handle
        }
    });
    return reshapeProduct(res.body.data.product, false)
}

export async function getProducts({
    query,
    reverse,
    sortKey
}: {
    query?: string,
    reverse?: boolean,
    sortKey?: string
}): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyProductsOperation>({
        query: getProductsQuery,
        tags: [TAGS.products],
        variables: {
            query,
            reverse,
            sortKey
        }
    });
    return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getCollectionProducts({
    handle,
    reverse,
    sortKey
}: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
}): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
        cache: "no-store",
        query: getCollectionProductsQuery,
        tags: [TAGS.collections, TAGS.products],
        variables: {
            handle: handle,
            reverse,
            sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
        }
    });
    if (!res.body.data.collection) {
        console.log(`No collection found for \`${handle}\``);
        return [];
    }
    return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products))
}