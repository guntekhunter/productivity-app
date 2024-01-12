import { Providers } from "./GlobalRedux/providers";
import ProvidersWrapper from "./ProvidersWrapper";
import Footer from "./components/Footer";
import ModalMessage from "./components/ModalMessage";
import Navbar from "./components/Navbar";
import GlobalPomodoro from "./components/pomodoroComponent/GlobalPomodoro";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import DarkTheme from "./DarkTheme";
import Switcher from "./Switcher";
import Script from "next/script";

const sans = Open_Sans({ subsets: ["latin"] });


export const metadata = {
  title: "Sebuah Teman",
  description:
  "Sebuah Teman adalah Teknologi AI untuk menyelesaikan tugasmu, chat GPT versi low budge, untuk mahasiswa dan guru",
};

// add user data

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="fkPZcxOI_UM2wPjwpFlko8fufw7RmJXp0BbhTeR9JG8" />
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
        crossOrigin="anonymous"
      />
      <body className={sans.className}>
        <ProvidersWrapper>
          <Providers>
            <Navbar />
            <ModalMessage />
            <GlobalPomodoro />
            <DarkTheme>
              <div>
                <Switcher />
              </div>
              {children}
            </DarkTheme>
            <Footer />
          </Providers>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
