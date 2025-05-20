import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-black px-6 py-12 border-t">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Newsletter & Branding */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="src/assets/logo.png" alt="Downtymezero Logo" className="w-8 h-8 " />
            <span className="font-bold text-xl">
              Downtymezero <sup className="text-xs font-normal">HQ</sup>
            </span>
          </div>
          <p className="mb-4 text-gray-700">
            Subscribe to our newsletter for the latest updates on new features and product releases.
          </p>
          <form className="flex max-w-md w-full gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-black px-4 py-2 flex-1 outline-none"
            />
            <button
              type="submit"
              className="border border-[#eb2556] text-[#eb2556] px-4 py-2 hover:bg-[#eb2556] hover:text-white transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4">
            &copy; 2025 Downtymezero. All rights reserved.
          </p>
        </div>

        {/* Links and Social */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><a href="#">Home</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Sign Up</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-3">Connect with Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Facebook size={16} /> Facebook</li>
              <li className="flex items-center gap-2"><Instagram size={16} /> Instagram</li>
              <li className="flex items-center gap-2"><Twitter size={16} /> X</li>
              <li className="flex items-center gap-2"><Linkedin size={16} /> LinkedIn</li>
              <li className="flex items-center gap-2"><Youtube size={16} /> YouTube</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>Stay updated with our latest news and features.</p>
      </div>
    </footer>
  );
}
