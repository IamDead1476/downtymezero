import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-600 text-sm mb-2">We typically respond within 24 hours.</p>
        <h2 className="text-4xl font-bold mb-2">Contact Us</h2>
        <p className="text-gray-500 mb-12">
          Have a question or need support? Reach out to us!
        </p>

        <div className="grid gap-10 md:grid-cols-3 text-center">
          {/* Email */}
          <div className="flex flex-col items-center">
            <Mail className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-sm text-gray-600 mb-1">
              For urgent inquiries, please call us.
            </p>
            <p className="text-sm font-medium text-black">
              support@downtymezero.com
            </p>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center">
            <Phone className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-sm text-gray-600 mb-1">
              Follow us on social media for updates and tips.
            </p>
            <p className="text-sm font-medium text-black">
              +1-800-123-4567
            </p>
          </div>

          {/* Office */}
          <div className="flex flex-col items-center">
            <MapPin className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Office</h3>
            <p className="text-sm text-gray-600 mb-1">
              Join our newsletter for the latest news and offers.
            </p>
            <p className="text-sm font-medium text-black">
              123 Main Street, City, Country
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
