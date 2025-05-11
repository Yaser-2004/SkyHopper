import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-10 mt-10 px-10">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">

          {/* Logo + Description */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">SkyHopper</h2>
            <p className="text-sm max-w-sm">
              Your trusted companion for seamless and smart flight bookings. Book, pay, and fly—smarter!
            </p>
          </div>

          {/* Links + Socials */}
          <div className="md:w-1/2 flex flex-col md:flex-row justify-end gap-12">

            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/bookings" className="hover:underline">My Bookings</a></li>
              </ul>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <div className="flex items-center space-x-4">
                {/* Twitter */}
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <svg className="w-5 h-5 fill-white hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M24 4.6c-0.9 0.4-1.8 0.6-2.8 0.8a4.8 4.8 0 0 0 2.1-2.7 9.6 9.6 0 0 1-3 1.1 4.8 4.8 0 0 0-8.3 4.4A13.6 13.6 0 0 1 1.7 3.1a4.8 4.8 0 0 0 1.5 6.4 4.8 4.8 0 0 1-2.2-0.6v0.1a4.8 4.8 0 0 0 3.9 4.7 4.8 4.8 0 0 1-2.2 0.1 4.8 4.8 0 0 0 4.5 3.3A9.6 9.6 0 0 1 0 20.5a13.6 13.6 0 0 0 7.4 2.2c8.8 0 13.7-7.3 13.7-13.7v-0.6a9.8 9.8 0 0 0 2.4-2.5z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <svg className="w-5 h-5 fill-white hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M12 2.2c3.2 0 3.6 0 4.9 0.1 1.2 0.1 2 0.2 2.5 0.4 0.6 0.2 1 0.5 1.4 0.9 0.4 0.4 0.7 0.9 0.9 1.4 0.2 0.5 0.3 1.3 0.4 2.5 0.1 1.3 0.1 1.7 0.1 4.9s0 3.6-0.1 4.9c-0.1 1.2-0.2 2-0.4 2.5-0.2 0.6-0.5 1-0.9 1.4-0.4 0.4-0.9 0.7-1.4 0.9-0.5 0.2-1.3 0.3-2.5 0.4-1.3 0.1-1.7 0.1-4.9 0.1s-3.6 0-4.9-0.1c-1.2-0.1-2-0.2-2.5-0.4-0.6-0.2-1-0.5-1.4-0.9-0.4-0.4-0.7-0.9-0.9-1.4-0.2-0.5-0.3-1.3-0.4-2.5-0.1-1.3-0.1-1.7-0.1-4.9s0-3.6 0.1-4.9c0.1-1.2 0.2-2 0.4-2.5 0.2-0.6 0.5-1 0.9-1.4 0.4-0.4 0.9-0.7 1.4-0.9 0.5-0.2 1.3-0.3 2.5-0.4C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 0.1 5.6 0.2 4.4 0.5 3.4 1c-1.1 0.5-2 1.3-2.6 2.6-0.5 1-0.8 2.2-0.9 3.6C0 8.3 0 8.7 0 12s0 3.7 0.1 5c0.1 1.4 0.4 2.6 0.9 3.6 0.5 1.1 1.3 2 2.6 2.6 1 0.5 2.2 0.8 3.6 0.9 1.3 0.1 1.7 0.1 5 0.1s3.7 0 5-0.1c1.4-0.1 2.6-0.4 3.6-0.9 1.1-0.5 2-1.3 2.6-2.6 0.5-1 0.8-2.2 0.9-3.6 0.1-1.3 0.1-1.7 0.1-5s0-3.7-0.1-5c-0.1-1.4-0.4-2.6-0.9-3.6-0.5-1.1-1.3-2-2.6-2.6C19.6 0.5 18.4 0.2 17 0.1 15.7 0 15.3 0 12 0zM12 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className="text-center text-sm mt-20 border-t border-white/20 pt-4">
          © {new Date().getFullYear()} SkyHopper. All rights reserved.
        </div>
      </footer>
  )
}

export default Footer
