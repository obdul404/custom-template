import Banner from '@/components/ui/banner'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { defaultSort } from '@/lib/constants';
import { getCollectionProducts, getProducts } from '@/lib/shopify';
import Grid from '@/components/grid/Grid';


export default async function HomePage() {
  const { sortKey, reverse } = defaultSort;
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
        <TabsContent value="all"><Grid products={await getCollectionProducts({ handle: "hydrogen", sortKey, reverse })}></Grid></TabsContent>
        <TabsContent value="apparel"><Grid products={await getCollectionProducts({ handle: "automated-collection", sortKey, reverse })}></Grid></TabsContent>
        <TabsContent value="dress"><Grid products={await getCollectionProducts({ handle: "hydrogen", sortKey, reverse })}></Grid></TabsContent>
        <TabsContent value="tshirt"><Grid products={await getCollectionProducts({ handle: "automated-collection", sortKey, reverse })}></Grid></TabsContent>
        <TabsContent value="bag"><Grid products={await getCollectionProducts({ handle: "hydrogen", sortKey, reverse })}></Grid></TabsContent>
      </Tabs>
    </>
  )
}
