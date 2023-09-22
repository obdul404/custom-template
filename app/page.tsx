import Banner from '@/components/ui/banner'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { defaultSort } from '@/lib/constants';
import { getProducts } from '@/lib/shopify';
import Grid from '@/components/grid/Grid';


export default async function HomePage() {
  const { sortKey, reverse } = defaultSort;
  const products = await getProducts({ sortKey, reverse, query: undefined });
  return (
    <>
      <Banner />
      <Tabs defaultValue="all">
        <TabsList className='flex justify-evenly bg-neutral'>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="apparel">Apparel</TabsTrigger>
          <TabsTrigger value="dress">Dress</TabsTrigger>
          <TabsTrigger value="tshirt">Tshirt</TabsTrigger>
          <TabsTrigger value="bag">Bag</TabsTrigger>
        </TabsList>
        <TabsContent value="all"><Grid products={products}></Grid></TabsContent>
        <TabsContent value="apparel"><Grid products={products}></Grid></TabsContent>
        <TabsContent value="dress"><Grid products={products}></Grid></TabsContent>
        <TabsContent value="tshirt"><Grid products={products}></Grid></TabsContent>
        <TabsContent value="bag"><Grid products={products}></Grid></TabsContent>
      </Tabs>
    </>
  )
}
