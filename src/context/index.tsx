'use client'; 

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { config, projectId, wagmiAdapter } from '@/config';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';

// Set up queryClient
const queryClient = new QueryClient();

// Context Provider component with conditional wallet initialization
function ContextProvider({ children, cookies }: { children: ReactNode; cookies?: string | null }) {
  const pathname = usePathname();
  const [walletInitialized, setWalletInitialized] = useState<boolean>(false);

  // Only initialize wallet features on community page or when explicitly needed
  const shouldInitializeWallet = pathname?.includes('/community') || false;

  // Initialize Reown AppKit when needed
  useEffect(() => {
    if (shouldInitializeWallet && !walletInitialized) {
      // Dynamically import and initialize wallet features
      import('@reown/appkit/react').then(({ createAppKit }) => {
        import('@reown/appkit/networks').then(({ mainnet, arbitrum }) => {
          const appKitNetworks = [mainnet, arbitrum];
          
          if (!projectId) {
            console.warn('Reown Project ID (NEXT_PUBLIC_PROJECT_ID) is missing');
            return;
          }

          try {
            createAppKit({
              adapters: [wagmiAdapter],
              projectId: projectId,
              // @ts-expect-error - Suppress persistent type error
              networks: appKitNetworks,
              defaultNetwork: mainnet,
              metadata: {
                name: 'mma.box',
                description: 'The ultimate MMA fan website',
                url: 'https://mma.box',
                icons: ['/favicon-32x32.png']
              },
              features: { analytics: true }
            });
            setWalletInitialized(true);
          } catch (error) {
            console.warn('Failed to initialize wallet connection:', error);
          }
        });
      });
    }
  }, [pathname, shouldInitializeWallet, walletInitialized]);

  // If we need wallet features, use the full provider setup, otherwise just use QueryClient
  if (shouldInitializeWallet) {
    const initialState = cookies ? cookieToInitialState(config as Config, cookies) : undefined;
    
    return (
      <WagmiProvider config={config as Config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    );
  }
  
  // Default simple provider for non-wallet pages
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default ContextProvider;