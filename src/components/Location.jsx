export default function Location() {
  return (
    <div className="flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-white mb-2 tracking-tight mb-6">Visit Us</h2>
        <p className="text-gray-400 text-lg font-medium text-white mb-10">
            Experience the art of Japanese fine dining in the heart of the city. We recommend booking in advance.
        </p>
        <div className="w-full h-80 rounded-lg overflow-hidden shadow-md mb-10">
            <iframe 
            className="w-full h-full px-10"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.613365833054!2d100.30865517532325!3d13.802165686594963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e293ae4612d80b%3A0x8f34af5a14567c77!2zS2F2ZSBTYWxheWEgKOC5gOC4hOC4nyDguKjguLLguKXguLLguKLguLIp!5e0!3m2!1sth!2sth!4v1779000950863!5m2!1sth!2sth"
            style={{border: 0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>

    </div>
  )
}