'use client'; // This component uses client-side hooks and context

import { config, projectId, wagmiAdapter } from '@/config'; // Import adapter again
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react'; // Import createAppKit
import { mainnet, arbitrum } from '@reown/appkit/networks'; // Import Reown networks
// import '@rainbow-me/rainbowkit/styles.css'; // Remove RainbowKit styles
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'; // Add Config back

// Set up queryClient
const queryClient = new QueryClient();

// Define metadata
const metadata = {
  name: 'mma.box',
  description: 'The ultimate MMA fan website',
  url: 'https://mma.box',
  icons: ['https://mma.box/favicon.ico']
};

// Define networks for AppKit
const appKitNetworks = [mainnet, arbitrum];

// Check projectId before calling createAppKit
if (!projectId) {
  throw new Error('Reown Project ID (NEXT_PUBLIC_PROJECT_ID) is missing');
}

// Initialize Reown AppKit during setup
createAppKit({
  adapters: [wagmiAdapter], // Pass the adapter
  projectId: projectId,
  // @ts-expect-error - Suppress persistent type error
  networks: appKitNetworks,
  defaultNetwork: mainnet,
  metadata: metadata,
  features: { analytics: true }
});

// Context Provider component
function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  // Get initial state from cookies for SSR hydration
  const initialState = cookieToInitialState(config as Config, cookies);

  return (
    <WagmiProvider config={config as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {/* Remove RainbowKitProvider */}
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider; 