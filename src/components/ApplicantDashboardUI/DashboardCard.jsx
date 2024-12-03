export default function DashboardCard({ title, count, icon }) {
    return (
      <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{count}</p>
        </div>
        <div className="text-gray-500">{icon}</div>
      </div>
    );
  }
  