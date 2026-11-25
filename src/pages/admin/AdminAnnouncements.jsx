import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, Badge, Modal } from '../../components/common/Card';
import {
  Bell,
  Plus,
  Calendar,
  Send,
  AlertCircle,
  Tag,
  CheckCircle2
} from 'lucide-react';

export const AdminAnnouncements = () => {
  const { announcements, addAnnouncement } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic');
  const [priority, setPriority] = useState('High');
  const [target, setTarget] = useState('All');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnnouncement({
      title,
      category,
      priority,
      target,
      content,
      author: 'Office of Academic Dean'
    });
    setIsModalOpen(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Campus Announcements & Notices
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Publish official university broadcasts to students, faculty, or guardians.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-glow transition-all flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Broadcast</span>
        </button>
      </div>

      {/* Announcements Stream */}
      <div className="space-y-4">
        {announcements.map((item) => (
          <Card key={item.id} className="p-6 space-y-3 hover:shadow-card transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    item.priority === 'High'
                      ? 'danger'
                      : item.priority === 'Medium'
                      ? 'warning'
                      : 'info'
                  }
                >
                  {item.priority} Priority
                </Badge>
                <Badge variant="primary">{item.category}</Badge>
                <span className="text-xs text-slate-400 font-mono">Target: {item.target}</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{item.date}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {item.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Published by: {item.author}</span>
              <span className="text-emerald-500 font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* New Announcement Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Broadcast New Notice"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
              Notice Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Schedule for Mid-Term 2 Laboratory Practicals"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="Academic">Academic</option>
                <option value="Examination">Examination</option>
                <option value="Events">Events</option>
                <option value="Campus">Campus</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Target Audience
              </label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="All">All Audiences</option>
                <option value="Students">Students Only</option>
                <option value="Faculty">Faculty Only</option>
                <option value="Parents">Parents Only</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
              Notice Content *
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter detailed notification body text..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-glow"
            >
              Publish Notice
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminAnnouncements;
