import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MedSync</h3>
            <p className="text-emerald-100">
              Your health, seamlessly connected. Access healthcare services anytime, anywhere.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-emerald-100 hover:text-white">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-emerald-100 hover:text-white">About</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 ">Contact</h3>
            <p className="text-emerald-100">Email: medsync@medsync-support.com</p>
            <p className="text-emerald-100">Phone: +40 723 555 777</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-emerald-700 text-center text-emerald-100">
          <p>&copy; {new Date().getFullYear()} MedSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
