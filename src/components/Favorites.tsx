import { useUser } from "@clerk/clerk-react";

export const Favorites = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">
          Please sign in to view your Favorites books.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Favourite Books</h2>
        <p className="text-gray-600">See your favorite books here</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Favorites features coming soon...</p>
      </div>
    </div>
  );
};
