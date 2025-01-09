import { constant } from '../../config/constant';

export default function Header() {
  return (
    <nav className="text-white">
      <section className="flex justify-between items-center px-4 py-4 sm:px-16 md:px-32 lg:px-64">
        <div className="font-semibold text-2xl sm:text-3xl">
          <label>{constant.APP_NAME}</label>
        </div>

        <div>
          <img 
            src={constant.APP_LOGO} 
            alt="Scanning" 
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-3xl" 
          />
        </div>
      </section>
    </nav>
  );
}
