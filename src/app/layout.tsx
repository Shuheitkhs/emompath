import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css"; // publicフォルダ内のファイルは/から始める

const kazesawa = localFont({
  src: [
    {
      path: "../public/fonts/Kazesawa-Regular.woff", // 相対パスで指定
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Kazesawa-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Kazesawa-ExtraLight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Kazesawa-Extrabold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Kazesawa-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Kazesawa-Semibold.woff",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-kazesawa",
});

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
      <body className={`${kazesawa.variable} antialiased`}>
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        ></video>
        <source src="/emompath.mp4" type="video/mp4" />
        {children}
      </body>
    </html>
  );
}
