'use client'; // Needs to be a client component to render the web component

export default function ConnectButton() {
  // Reown AppKit automatically registers the <appkit-button> web component
  // if createAppKit was called successfully in the context provider.
  return <appkit-button />;
} 