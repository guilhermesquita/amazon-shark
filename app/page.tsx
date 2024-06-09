import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function Index() {

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar/>
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          teste
        </main>
      </div>
      <Footer/>
    </div>
  );
}
