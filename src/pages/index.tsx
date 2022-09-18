import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image'
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styled from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps ) {

  
  return (
    <>
      <Head>
        <title> Home | Ig.News </title>
      </Head>

      <main className={styled.contentContainer}>
        <section className={styled.hero}>
        👏 <span>Hey, Welcome</span>
          <h1>News abount the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image 
          src="/images/avatar.svg" 
          alt="Girl Coding" 
          width={600}
          height={600}
        />
        
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1K044yAdr4YZZHkRHzRrertP')

  const product = {
    priceId: price.id,
    amount:  new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),

  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
