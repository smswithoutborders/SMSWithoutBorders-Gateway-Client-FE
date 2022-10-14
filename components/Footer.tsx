/* eslint-disable @next/next/no-img-element */
import { BsGithub } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content flex justify-between">
      <div className="flex items-center space-x-2">
        <div className="avatar">
          <div className="w-6 rounded-full md:w-7">
            <img src="/assets/icons/logo-icon-light.png" alt="logo" />
          </div>
        </div>
        <a className="text-base font-bold normal-case md:text-xl">
          SMSWithoutBorders
        </a>
      </div>

      <a
        href="https://github.com/smswithoutborders"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <BsGithub />
        <span>GitHub</span>
      </a>
    </footer>
  );
};

export default Footer;
