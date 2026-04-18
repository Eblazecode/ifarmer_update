import CookieNotice from "@/components/cookie-notice";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import WhatsAppButton from "@/components/whatsapp-button";

export default function SiteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <CookieNotice />
      <ScrollToTopButton />
      <WhatsAppButton />
    </div>
  );
}
