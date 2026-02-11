import Footer from "@/components/Footer";

export const metadata = {
  title: "abdul ahad | About"
};
export default function Layout({ children }) {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen w-full">
      {children}
      <Footer />
    </div>
  );
}
