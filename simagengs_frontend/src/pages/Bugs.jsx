import { useState, useEffect } from 'react';
import DynamicLayout from '../components/layouts/index.jsx';
import api from '../services/api';

export default function Bugs() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBug, setEditingBug] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
    status: 'open',
  });

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const response = await api.get('/bugs');
      setBugs(response.data.data || []);
    } catch (error) {
      console.error('Error fetching bugs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingBug) {
        await api.put(`/bugs/${editingBug.id}`, formData);
      } else {
        await api.post('/bugs', formData);
      }
      fetchBugs();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving bug:', error);
      alert(error.response?.data?.message || 'Failed to save bug report');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this bug report?')) return;

    try {
      await api.delete(`/bugs/${id}`);
      fetchBugs();
    } catch (error) {
      console.error('Error deleting bug:', error);
      alert('Failed to delete bug report');
    }
  };

  const handleEdit = (bug) => {
    setEditingBug(bug);
    setFormData({
      title: bug.title,
      description: bug.description,
      severity: bug.severity,
      status: bug.status,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      severity: 'medium',
      status: 'open',
    });
    setEditingBug(null);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'open': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DynamicLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Bug Reports</h2>
          <p className="text-gray-600 mt-1">Track and manage bugs you encounter</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Report Bug
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-2xl mb-1">⚠</div>
          <div className="text-2xl font-bold text-gray-900">{bugs.length}</div>
          <div className="text-sm text-gray-600">Total Bugs</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-2xl mb-1">⧗</div>
          <div className="text-2xl font-bold text-yellow-600">{bugs.filter(b => b.status === 'open').length}</div>
          <div className="text-sm text-gray-600">Open</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-2xl mb-1">◐</div>
          <div className="text-2xl font-bold text-blue-600">{bugs.filter(b => b.status === 'in-progress').length}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-2xl mb-1">◉</div>
          <div className="text-2xl font-bold text-green-600">{bugs.filter(b => b.status === 'resolved').length}</div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
        </div>
      ) : bugs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
          <div className="text-6xl mb-4">⚠</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No bugs reported</h3>
          <p className="text-gray-600 mb-6">Start tracking bugs you encounter</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Report First Bug
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {bugs.map((bug) => (
            <div key={bug.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{bug.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getSeverityColor(bug.severity)}`}>
                      {bug.severity?.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{bug.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>◷ {new Date(bug.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${getStatusColor(bug.status)}`}>
                    {bug.status?.replace('-', ' ').toUpperCase()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(bug)}
                      className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(bug.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingBug ? 'Edit Bug Report' : 'Report Bug'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bug Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Login button not working"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the bug in detail..."
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Severity
                    </label>
                    <select
                      value={formData.severity}
                      onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : editingBug ? 'Update' : 'Report'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DynamicLayout>
  );
}
