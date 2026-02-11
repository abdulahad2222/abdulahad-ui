// generate layour with footer
import Footer from "@/components/Footer";

export const metadata = {
  title: "Abdul Ahad | Projects"
};
export default function Layout({ children }) {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen w-full">
      {children}
      <Footer />
    </div>
  );
}