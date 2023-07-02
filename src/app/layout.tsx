import { Providers } from "./GlobalRedux/providers";
import ProvidersWrapper from "./ProvidersWrapper";
import Footer from "./components/Footer";
import ModalMessage from "./components/ModalMessage";
import Navbar from "./components/Navbar";
import GlobalPomodoro from "./components/pomodoroComponent/GlobalPomodoro";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Teman",
  description: "Membantu Menyelesaikan Tugasmu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <ProvidersWrapper>
          <Providers>
            <Navbar />
            <ModalMessage />
            <GlobalPomodoro />
            {children}
            <Footer />
          </Providers>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
