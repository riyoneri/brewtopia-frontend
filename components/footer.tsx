import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 py-5 text-center text-white ">
      <div className="maximum-width items-center space-y-4">
        <div className="flex flex-col-reverse justify-between gap-4 xs:flex-row xs:items-center ">
          <div className="flex flex-col items-start gap-3 xs:flex-row xs:items-center xs:gap-5">
            <span className="cursor-pointer transition hover:text-primary">
              Terms and conditions
            </span>
            <span className="cursor-pointer transition hover:text-primary">
              Privacy Policy
            </span>
          </div>
          <div className="flex items-center justify-between gap-5">
            <FaFacebook className="cursor-pointer text-lg transition hover:text-primary sm:text-xl" />
            <FaXTwitter className="cursor-pointer text-lg transition hover:text-primary sm:text-xl" />
            <FaInstagram className="cursor-pointer text-lg transition hover:text-primary sm:text-xl" />
          </div>
        </div>
        <hr />
        <p className="text-left text-sm">
          &copy;{new Date().getFullYear()} BrewTopia. All rights reserved
        </p>
      </div>
    </footer>
  );
}
