import EntryCard from "./EntryCard";

const EntryList = ({ entries = [] }) => {


    
    return (
        <div className="max-w-3xl mx-auto mt-8">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">

                <h2 className="text-2xl font-bold text-gray-800">
                    All Entries
                </h2>

                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {entries.length} records
                </span>
            </div>

            {/* EMPTY STATE */}
            {entries.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border p-6 text-center">

                    <p className="text-gray-600 font-medium">
                        No entries found yet
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                        Start by adding your first tubewell usage entry
                    </p>
                </div>
            ) : (
                <div className="space-y-4">

                    {/* LIST */}
                    {entries.map((entry) => (
                        <EntryCard
                            key={entry._id}
                            entry={entry}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EntryList;