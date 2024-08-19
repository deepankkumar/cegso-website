import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";
import "@/styles/locomotive-scroll.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS

import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div lang={"en"} className={dmSans.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;