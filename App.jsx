const { useState } = React;

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('network');
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full space-y-6"
    >
      <h2 className="text-3xl font-semibold text-center text-teal-600">
        צור קשר
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            שם
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            אימייל
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            נושא
          </label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            הודעה
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-3 rounded-md font-medium hover:bg-teal-700 transition-colors"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'שולח...' : 'שלח'}
      </button>

      {status === 'sent' && (
        <p className="text-green-600 text-center mt-4">ההודעה נשלחה בהצלחה!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-center mt-4">אירעה שגיאה. נסה שוב.</p>
      )}
    </form>
  );
}