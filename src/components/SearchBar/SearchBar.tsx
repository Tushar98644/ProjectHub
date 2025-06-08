import { FaMicrophone, FaSearch, FaSpinner } from "react-icons/fa";

interface SearchProps {
    searchQuery: string;
    isListening: boolean;
    handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    startListening: () => void;
}

const SearchBar = ({
    searchQuery,
    isListening,
    handleSearchSubmit,
    handleSearchInputChange,
    startListening,
}: SearchProps) => {
    return (
        <div className="mb-10 md:mb-12 max-w-2xl mx-auto opacity-80">
            <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 p-1.5 bg-slate-700/50 rounded-xl shadow-lg focus-within:ring-2 focus-within:ring-sky-500 transition-all"
            >
                <div className="pl-3 text-slate-400">
                    <FaSearch className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    id="project-search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="flex-grow bg-transparent text-slate-100 text-sm placeholder-slate-400 focus:outline-none py-2.5 px-2"
                    placeholder="Search projects by title, tag, or keyword..."
                    required={false}
                />
                <button
                    type="button"
                    onClick={startListening}
                    disabled={isListening}
                    className={`p-2.5 rounded-lg transition-colors ${
                        isListening
                            ? "bg-red-500 text-white animate-pulse"
                            : "text-slate-400 hover:text-sky-400 hover:bg-slate-600"
                    }`}
                    aria-label="Search by voice"
                >
                    {isListening ? (
                        <FaSpinner className="w-5 h-5 animate-spin" />
                    ) : (
                        <FaMicrophone className="w-5 h-5" />
                    )}
                </button>
                <button
                    type="submit"
                    className="px-4 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
