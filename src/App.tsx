import Search from "./pages/search";

const App = () => (
  <>
    <header className="py-4 flex flex-col items-center justify-center">
      <h1 className="text-dark-blue text-xl md:text-2xl font-black">windtail</h1>
      <p className="text-dark-blue md:text-lg font-black">
        reverse tailwind lookup
      </p>
    </header>
    <main className="py-4 flex-grow flex flex-col items-center gap-8 max-w-2xl">
      <Search />
    </main>
    <footer className="py-4 flex flex-row items-center justify-center gap-4 text-xs md:text-sm">
      <a
        href="https://tailwindcss.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-dark-blue hover:text-blue-black font-semibold"
      >
        tailwind docs
      </a>
      <a
        href="https://github.com/kenakingkong/windtail"
        target="_blank"
        rel="noopener noreferrer"
        className="text-dark-blue hover:text-blue-black font-semibold"
      >
        github code
      </a>
      <a
        href="https://makenakong.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-dark-blue hover:text-blue-black font-semibold"
      >
        makenakong.com
      </a>
    </footer>
  </>
);

export default App;
