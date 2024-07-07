import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SobreContent from "@/components/SobreContent";

export default function Index() {

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar/>
      <div className="w-full animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
          <SobreContent/>
      </div>
      <Footer/>
    </div>
  );
}
