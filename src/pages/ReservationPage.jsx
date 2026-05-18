import PageHeader from "../components/PageHeader";
// ถ้ายากหารูปใหม่ไม่ได้ เอา categoryBg มาใช้ชั่วคราวก่อนก็ได้ครับ
import categoryBg from '../assets/categorytab_wallpaper.avif'; 

export default function ReservationPage() {
  return (
    <div className="min-h-screen bg-black">
      <PageHeader 
        title="Book a Table" 
        subtitle="Experience the authentic taste of KURO. Reserve your spot today." 
        backgroundImage={categoryBg} 
      />
      
      {/* เดี๋ยวเรามาสร้างฟอร์มตรงนี้ */}
    </div>
  )
}