import PageHeader from "../components/PageHeader";
import categoryBg from '../assets/categorytab_wallpaper.avif'; 
import ReservationForm from "../components/ReservationForm";

export default function ReservationPage() {
  return (
    <div className="min-h-screen bg-black">
      <PageHeader 
        title="Book a Table" 
        subtitle="Experience the authentic taste of KURO. Reserve your spot today." 
        backgroundImage={categoryBg} 
      />
      
      <div className="max-w-6xl mx-auto">
        <ReservationForm />
      </div>
    </div>
  )
}