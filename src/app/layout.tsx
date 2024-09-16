import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "EMOM Path",
  description:
    "EMOM Path is your ultimate training companion, guiding you through personalized EMOM workouts. Track your progress with detailed graphs and stay motivated as the app helps you plan the next steps on your fitness journey. Whether you're aiming to improve endurance, strength, or overall fitness, EMOM Path charts your path forward.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-en antialiased text-gray-200 relative min-h-screen">
        <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none z-[-1]"></div>
        <video
          className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
          autoPlay
          loop
          muted
        >
          <source src="/emompath.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="z-10 w-full flex justify-center items-center">
          <div className="bg-black bg-opacity-80 px-6 rounded-lg max-w-[768px] w-full min-w-[300px] text-center mx-2">
            <Header />
            {children}
            <div className="text-center text-xs">
              Copyright © All rights reserved | Shuhei Takahashi💪
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
