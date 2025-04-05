'use client'; // Page needs to be client component to use hooks

import ConnectButton from "@/components/ConnectButton"; // Import local Reown button
import { useAccount, useEnsName, useEnsAvatar } from 'wagmi'; // Import Wagmi hooks
import Image from 'next/image'; // Import next/image

export default function Home() {
  // Get account, ENS name, and ENS avatar data using Wagmi hooks
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address, gatewayUrls: [] });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! }); // Use ! non-null assertion

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to mma.box</h1>
      <ConnectButton />

      {/* Display connection and ENS info */}
      {isConnected && (
        <div className="mt-8 p-4 border rounded-lg">
          <p>Connected Address: {address}</p>
          <p>ENS Name: {ensName ? ensName : 'Loading or Not Found'}</p>
          <p>ENS Avatar URL: {ensAvatar ? ensAvatar : 'Loading or Not Found'}</p>
          {ensAvatar && <Image src={ensAvatar} alt="ENS Avatar" width={50} height={50} className="rounded-full mt-2"/>}
        </div>
      )}
    </main>
  );
}
