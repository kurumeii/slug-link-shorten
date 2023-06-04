import { Poppins, Roboto_Mono } from "next/font/google"

const sans = Poppins({
  weight: ["300", "400", "500", "600", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
})

const mono = Roboto_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-mono",
})

const nextFonts = sans.variable + " " + mono.variable

export default nextFonts
