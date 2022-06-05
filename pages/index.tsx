import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ProtectCard from "../components/ProductCard";
import { getAllProducts } from "../utils/API";

const Home: NextPage = (props: any) => {
  const [products, setProducts] = useState(props.products);
  return (
    <div className="">
      <Head>
        <title>Home | Mahdi-Shariflo</title>
      </Head>

      <div className="flex flex-wrap justify-center">
        {products.map((product: any, index: number) => {
          return (
            <ProtectCard key={index} product={product} />
          );
        })}
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  const res: any = await getAllProducts();
  return {
    props: { products: res.data.products }, // will be passed to the page component as props
  };
}
export default Home;
