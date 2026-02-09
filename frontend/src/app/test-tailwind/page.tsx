export default function TestTailwindPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center p-8">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-12 max-w-2xl">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">
          ✅ Tailwind CSS is Working!
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
          If you can see this styled page with colors, gradients, and proper spacing,
          then Tailwind CSS is configured correctly.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-primary-100 dark:bg-primary-950 p-4 rounded-lg">
            <div className="text-sm font-semibold text-primary-700 dark:text-primary-300">Primary Color</div>
          </div>
          <div className="bg-accent-100 dark:bg-accent-950 p-4 rounded-lg">
            <div className="text-sm font-semibold text-accent-700 dark:text-accent-300">Accent Color</div>
          </div>
          <div className="bg-success-100 dark:bg-success-950 p-4 rounded-lg">
            <div className="text-sm font-semibold text-success-700 dark:text-success-300">Success Color</div>
          </div>
          <div className="bg-error-100 dark:bg-error-950 p-4 rounded-lg">
            <div className="text-sm font-semibold text-error-700 dark:text-error-300">Error Color</div>
          </div>
        </div>

        <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg">
          Test Button with Hover Effect
        </button>
      </div>
    </div>
  );
}
