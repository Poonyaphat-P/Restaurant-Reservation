export default function PageHeader({ title, subtitle, backgroundImage}) {
    return (
        <div 
        className="relative bg-cover bg-center pt-28 py-8 px-4 " 
        style={{ backgroundImage: `url(${backgroundImage})` }}
        >
        {/* Black Film */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] z-0"></div>

        {/* Message */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="text-7xl text-white font-serif tracking-wide">{title}</div>
          <div className="text-2xl pt-2 font-serif text-white tracking-wider">
            {subtitle}
          </div>
        </div>
      </div>
    )
}