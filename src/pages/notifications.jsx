import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fakeNotifications = [
  {
    _id: '1',
    title: 'Welcome!',
    message: 'Thanks for joining our platform.',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'New Update',
    message: 'Check out the latest features we added.',
    isRead: true,
    createdAt: new Date().toISOString(),
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(fakeNotifications);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const { data } = await axios.get('/api/notifications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotifications(data);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      }
    }
    fetchNotifications();
  }, []);

  function handleDelete(id) {
    setNotifications(notifications.filter((n) => n._id !== id));
  }

  function handleToggleRead(id) {
    setNotifications(
      notifications.map((n) =>
        n._id === id ? { ...n, isRead: !n.isRead } : n
      )
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Notifications</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
        >
          Add New Notification
        </button>
      </div>

      <div className="overflow-x-auto rounded border border-gray-700">
        <table className="w-full text-left text-gray-300">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 border border-gray-700">Title</th>
              <th className="p-3 border border-gray-700">Message</th>
              <th className="p-3 border border-gray-700">Read</th>
              <th className="p-3 border border-gray-700">Date</th>
              <th className="p-3 border border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No notifications found.
                </td>
              </tr>
            )}
            {notifications.map((notification) => (
              <tr
                key={notification._id}
                className={`hover:bg-gray-800 ${
                  notification.isRead ? 'opacity-60' : ''
                }`}
              >
                <td className="p-3 border border-gray-700">{notification.title}</td>
                <td className="p-3 border border-gray-700">{notification.message || '-'}</td>
                <td className="p-3 border border-gray-700 text-center">
                  <input
                    type="checkbox"
                    checked={notification.isRead}
                    onChange={() => handleToggleRead(notification._id)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="p-3 border border-gray-700">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 border border-gray-700 space-x-2">
                  <button
                    onClick={() => alert('Update feature to implement')}
                    className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(notification._id)}
                    className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddNotificationModal
          onClose={() => setShowModal(false)}
          onAdd={(newNotification) => {
            setNotifications([newNotification, ...notifications]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

function AddNotificationModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isRead, setIsRead] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const newNotification = {
      _id: Math.random().toString(36).slice(2, 9),
      title,
      message,
      isRead,
      createdAt: new Date().toISOString(),
    };

    // هنا ترسل الـ newNotification لل API وتضيفه محلياً
    onAdd(newNotification);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-100">
          Add New Notification
        </h2>

        <label className="block">
          <span className="text-gray-300">Title</span>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-900 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-300">Message (optional)</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-900 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </label>

        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isRead}
            onChange={() => setIsRead(!isRead)}
            className="rounded cursor-pointer"
          />
          <span className="text-gray-300">Mark as Read</span>
        </label>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Add Notification
          </button>
        </div>
      </form>
    </div>
  );
}
