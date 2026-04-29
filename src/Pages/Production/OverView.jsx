import React from 'react';
import { useOutletContext } from 'react-router-dom'; // ضفنا دي عشان نستقبل البحث
import './Production.css';

const jobsData = [
  { id: 'JOB-001', client: 'ABC Manufacturing', items: 3, assignedTo: 'Ahmed Tech', avatar: 'A', progress: 65, status: 'In progress', deadline: '5/2/2026' },
  { id: 'JOB-002', client: 'XYZ Corporation', items: 2, assignedTo: 'Unassigned', avatar: null, progress: 0, status: 'Pending', deadline: '5/5/2026' },
  { id: 'JOB-003', client: 'Global Industries', items: 4, assignedTo: 'Maria Worker', avatar: 'M', progress: 45, status: 'Delayed', deadline: '4/30/2026' },
  { id: 'JOB-003', client: 'Global Industries', items: 4, assignedTo: 'Maria Worker', avatar: 'M', progress: 45, status: 'Delayed', deadline: '4/30/2026' },
  { id: 'JOB-005', client: 'Premium Products', items: 1, assignedTo: 'Emma Johnson', avatar: 'E', progress: 100, status: 'Completed', deadline: '4/29/2026' },
];

const JobsTable = () => {
  // 1. استقبال الـ searchTerm من الـ Parent
  const { searchTerm } = useOutletContext();

  // 2. فلترة البيانات بناءً على الـ ID أو اسم العميل
  const filteredJobs = jobsData.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      job.id.toLowerCase().includes(searchLower) ||
      job.client.toLowerCase().includes(searchLower) ||
      job.assignedTo.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="table-container">
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Client</th>
            <th>Items</th>
            <th>Assigned To</th>
            <th>Progress</th>
            <th>Status</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {/* 3. عرض البيانات المفلترة فقط */}
          {filteredJobs.map((job, index) => (
            <tr key={index}>
              <td className="job-id">{job.id}</td>
              <td className="client-name">{job.client}</td>
              <td className="items-count">{job.items} items</td>
              <td>
                <div className="assignee">
                  {job.avatar ? (
                    <span className={`avatar avatar-${job.avatar.toLowerCase()}`}>{job.avatar}</span>
                  ) : null}
                  <span className={job.assignedTo === 'Unassigned' ? 'unassigned' : ''}>
                    {job.assignedTo}
                  </span>
                </div>
              </td>
              <td>
                <div className="progress-container">
                   <div className={`progress-dot dot-${job.status.toLowerCase().replace(' ', '-')}`}></div>
                   <div className="progress-bar-bg">
                      <div className={`progress-fill fill-${job.status.toLowerCase().replace(' ', '-')}`} style={{ width: `${job.progress}%` }}></div>
                   </div>
                   <span className="progress-text">{job.progress}%</span>
                </div>
              </td>
              <td>
                <span className={`status-badge ${job.status.toLowerCase().replace(' ', '-')}`}>
                  {job.status}
                </span>
              </td>
              <td className="deadline">{job.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* عرض رسالة لو مفيش نتائج */}
      {filteredJobs.length === 0 && (
        <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No jobs found matching your search.</p>
      )}
    </div>
  );
};

export default JobsTable;