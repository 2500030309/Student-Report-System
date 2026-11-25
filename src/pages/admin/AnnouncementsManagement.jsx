import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { Bell, Plus, Calendar, Send, CheckCircle2, UserCheck, Megaphone } from 'lucide-react';

export const AnnouncementsManagement = () => {
  const { announcements, addAnnouncement } = useAcademicData();
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    author: 'Office of Dean Academics',
    priority: 'Medium',
    target: 'All',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnnouncement(formData);
    setModalOpen(false);
    setFormData({
      title: '',
      category: 'Academic',
      author: 'Office of Dean Academics',
      priority: 'Medium',
      target: 'All',
      content: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Institutional Notices & Announcements
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Broadcast official examination timetables, circulars, and event circulars
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setModalOpen(true)}
          className="shadow-glow"
        >
          Create Announcement
        </Button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <Card key={ann.id} padding="p-6" hover>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300">
                  {ann.category}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    ann.priority === 'High'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : ann.priority === 'Medium'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {ann.priority} Priority
                </span>
                <span className="text-xs text-slate-400">
                  Target: <strong className="text-slate-600 dark:text-slate-300">{ann.target || 'All'}</strong>
                </span>
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{ann.date}</span>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">
              {ann.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {ann.content}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Published by: <strong className="text-slate-700 dark:text-slate-300">{ann.author}</strong></span>
              <span className="font-mono">Circular Ref: #{ann.id}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Publish Official Announcement"
        subtitle="This circular will appear on student, faculty and parent dashboards"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Circular / Notice Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. End Semester Practical Schedule"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option>Examination</option>
                <option>Academic</option>
                <option>Events</option>
                <option>Campus</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Audience
              </label>
              <select
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="All">All Portals</option>
                <option value="Students">Students Only</option>
                <option value="Faculty">Faculty Only</option>
                <option value="Parents">Parents Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Notice Content *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Enter full announcement body text..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" icon={Send}>
              Broadcast Notice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AnnouncementsManagement;
