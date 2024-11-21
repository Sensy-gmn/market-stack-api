export default function SearchBar({
    symbolPrompt,
    setSymbolPrompt,
    handleSubmit,
}) {
    return (
        <div className="mb-4 flex gap-2">
            <input
                type="text"
                value={symbolPrompt}
                onChange={(e) => setSymbolPrompt(e.target.value)}
                placeholder="Entrez le symbole (ex: AAPL)"
                className="px-3 py-2 border rounded-md text-primary"
            />
            <button
                onClick={handleSubmit}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Rechercher
            </button>
        </div>
    );
}
