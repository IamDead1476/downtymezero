import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
        return;
      }

      setUser(user);
      await fetchUrls(user.id);
      setLoading(false);
    };

    fetchUserAndData();
  }, [navigate]);

  const fetchUrls = async (userId) => {
    const { data, error } = await supabase
      .from('monitored_urls')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error.message);
    } else {
      setUrls(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleAddUrl = async (e) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    setSubmitting(true);

    const { error } = await supabase.from('monitored_urls').insert({
      user_id: user.id,
      url: newUrl.trim(),
      status: 'Unknown', // You can update this later via cron/function
    });

    setSubmitting(false);
    setNewUrl('');

    if (error) {
      alert('Error adding URL: ' + error.message);
    } else {
      fetchUrls(user.id); // refresh list
    }
  };

  const getInitials = (email) => {
    return email?.[0]?.toUpperCase() ?? '?';
  };

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg">
            {getInitials(user.email)}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">{user.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Monitored URLs</h2>

        <form onSubmit={handleAddUrl} className="flex gap-2 mb-6">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            {submitting ? 'Adding...' : 'Add URL'}
          </button>
        </form>

        {urls.length === 0 ? (
          <div className="text-gray-500">No URLs monitored yet.</div>
        ) : (
          <table className="w-full text-left bg-white shadow rounded-md overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">URL</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url.id} className="border-t">
                  <td className="px-4 py-2">{url.url}</td>
                  <td className="px-4 py-2">{url.status || 'Unknown'}</td>
                  <td className="px-4 py-2">
                    {new Date(url.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
