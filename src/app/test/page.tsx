import { ContactForm } from '@/components/contact-form';
import LanguageSelector from '@/components/language-selector';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            API Testing Page
          </h1>
          <p className="text-gray-600">
            Test the backend functionality and language switching
          </p>
        </div>

        {/* Language Selector Test */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Language Selector Test</h2>
          <div className="flex gap-4 items-center">
            <span>Default variant:</span>
            <LanguageSelector />
          </div>
          <div className="flex gap-4 items-center mt-4">
            <span>Compact variant:</span>
            <LanguageSelector variant="compact" />
          </div>
        </div>

        {/* Contact Form Test */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Form Test</h2>
          <ContactForm />
        </div>

        {/* API Endpoints Test */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Languages API</h3>
              <p className="text-sm text-gray-600">GET /api/languages</p>
              <button
                onClick={async () => {
                  const response = await fetch('/api/languages');
                  const data = await response.json();
                  console.log('Languages:', data);
                  alert(JSON.stringify(data, null, 2));
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Test Languages API
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Translations API</h3>
              <p className="text-sm text-gray-600">GET /api/translations?lang=en</p>
              <button
                onClick={async () => {
                  const response = await fetch('/api/translations?lang=en');
                  const data = await response.json();
                  console.log('Translations:', data);
                  alert(JSON.stringify(data, null, 2));
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Test Translations API
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Contacts API</h3>
              <p className="text-sm text-gray-600">GET /api/contacts</p>
              <button
                onClick={async () => {
                  const response = await fetch('/api/contacts');
                  const data = await response.json();
                  console.log('Contacts:', data);
                  alert(JSON.stringify(data, null, 2));
                }}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Test Contacts API
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Blog Posts API</h3>
              <p className="text-sm text-gray-600">GET /api/blogs</p>
              <button
                onClick={async () => {
                  const response = await fetch('/api/blogs');
                  const data = await response.json();
                  console.log('Blog Posts:', data);
                  alert(JSON.stringify(data, null, 2));
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Test Blog Posts API
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
