import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import NavBar from "@/app/_components/nav-bar";
import { getServerAuthSession } from "~/server/auth";
import { Toaster } from "@/components/ui/sonner"


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "plotAI",
  description: "AI Real Estate Calculator",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} w-screen`}>
        <TRPCReactProvider>
          <NavBar session={session!}/>
          {children}
          <Toaster />

        </TRPCReactProvider>
      </body>
    </html>
  );
}
