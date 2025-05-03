import AboutUs from "@/components/home/AboutUs";
import Banner from "@/components/home/Banner";
import CustomerFeedback from "@/components/home/CustomerFeedback";
import Slider from "@/components/home/Slider";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Slider></Slider>
      <AboutUs></AboutUs>
      <CustomerFeedback></CustomerFeedback>
    </div>
  );
}
