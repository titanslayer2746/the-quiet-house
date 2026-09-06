import type { Metadata } from "next";
import { Fraunces, Beau_Rivage, Jost } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorFollower } from "@/components/CursorFollower";
import { BookingProvider } from "@/context/BookingContext";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  style: ["normal", "italic"],
});

const beauRivage = Beau_Rivage({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "The Quiet House — Hair, Skin & Body Salon",
  description:
    "A private salon house for slow, deliberate care — haircuts, colour, nails, facials, massage, and rest, in Ojai, California.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${beauRivage.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-tqh-blush text-tqh-wine">
        <LoadingScreen />
        <CursorFollower />
        <SmoothScroll>
          <BookingProvider>{children}</BookingProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
