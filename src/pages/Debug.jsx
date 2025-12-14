import Layout from "../components/ui/Layout";

export default function Debug() {
  // Convert localStorage into a usable object
  const allStorage = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    try {
      allStorage[key] = JSON.parse(localStorage.getItem(key));
    } catch {
      allStorage[key] = localStorage.getItem(key);
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        LocalStorage Debug Panel
      </h1>

      {/* Show message if empty */}
      {Object.keys(allStorage).length === 0 ? (
        <p className="text-red-600 text-lg">LocalStorage is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(allStorage).map(([key, value]) => (
            <div
              key={key}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                {key}
              </h2>

              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-80 text-sm whitespace-pre-wrap">
                {JSON.stringify(value, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* Clear Storage Button */}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
      >
        Clear LocalStorage
      </button>
    </Layout>
  );
}
