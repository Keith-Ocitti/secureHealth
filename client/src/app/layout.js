// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;
export const metadata = {
  title: "Secure Health",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
