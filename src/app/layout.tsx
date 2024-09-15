import type { Metadata } from "next";
import "../styles/globals.css";
import VideoBackground from "@/components/VideoBackground";

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
      <body className="font-en antialiased text-gray-200 relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-700 bg-opacity-30"></div>
        <VideoBackground />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-[-1]"></div>

        <div className="z-10 w-full flex justify-center items-center">
          <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg max-w-[768px] w-full min-w-[300px] text-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
