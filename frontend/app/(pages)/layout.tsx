"use client"
import "./../globals.css";
import 'flowbite/dist/flowbite.css';
import 'flowbite';
import React from 'react';
import { AppBar } from "@/app/components/navbar/AppBar";
import { Provider} from "react-redux";
import {  store } from "../state/store"

import { WEB3_APP_ID } from "../utils/utils";

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { arbitrum, mainnet } from '@reown/appkit/networks'



const projectId = process.env.NEXT_PUBLIC_WEB3_APP_ID
// 2. Set the networks
const networks = [arbitrum, mainnet];

// 3. Create a metadata object - optional
const metadata = {
  name: 'Task',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})


export const Wrapper = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store} >
      <AppBar />
        {children}
    </Provider>
  )
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Wrapper>
      {/* <LoaderModal isVisible={loading} /> */}
      {children}
    </Wrapper>
  );
}

