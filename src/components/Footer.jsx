function Footer() {
  return (
    <footer className="mt-auto py-4 px-6 border-t border-gray-200 grid grid-cols-3 items-center text-xs text-gray-500">
      <a href="/" className="justify-self-start">
        <img src="/1.png" alt="Stage Hand logo" className="h-16" />
      </a>

      <div className="justify-self-center flex flex-col sm:flex-row items-center gap-2">
        <span>Created by Emily Spiers</span>
        <a
          href="https://github.com/espiers13"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
      </div>

      <div />
    </footer>
  );
}

export default Footer;
