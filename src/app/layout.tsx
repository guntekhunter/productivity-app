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

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Sebuah Teman",
  description: "Sebuah Teman adalah Teknologi AI untuk menyelesaikan tugasmu, chat GPT versi low budge, untuk mahasiswa dan guru",
};


// add user data

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head><meta name="google-adsense-account" content="ca-pub-6428415696823215"/></head>
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
