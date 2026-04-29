import React from 'react';
import { useOutletContext } from 'react-router-dom'; // استيراد الـ context
import './Production.css';

const columns = [
  {
    title: 'Pending',
    color: '#64748b',
    jobs: [
      { id: 'JOB-002', client: 'XYZ Corporation', items: 2, deadline: '5/5/2026', progress: 0 }
    ]
  },
  {
    title: 'In Progress',
    color: '#3b82f6',
    jobs: [
      { id: 'JOB-001', client: 'ABC Manufacturing', items: 3, assignee: 'Ahmed Tech', deadline: '5/2/2026', progress: 65 }
    ]
  },
  {
    title: 'Completed',
    color: '#22c55e',
    jobs: [
      { id: 'JOB-005', client: 'Premium Products', items: 1, assignee: 'Emma Johnson', deadline: '4/29/2026', progress: 100 }
    ]
  }
];

const KanbanBoard = () => {
  // 1. استقبال الـ searchTerm من الـ Production (الـ Parent)
  const { searchTerm } = useOutletContext();

  return (
    <div className="kanban-container">
      {columns.map((column, idx) => {
        // 2. فلترة الـ jobs داخل كل عمود بناءً على البحث
        const filteredJobs = column.jobs.filter(job => {
          const searchLower = searchTerm.toLowerCase();
          return (
            job.id.toLowerCase().includes(searchLower) ||
            job.client.toLowerCase().includes(searchLower) ||
            (job.assignee && job.assignee.toLowerCase().includes(searchLower))
          );
        });

        return (
          <div key={idx} className="kanban-column">
            <div className="column-header">
              <div className="header-left">
                <span className="dot" style={{ backgroundColor: column.color }}></span>
                <h2>{column.title}</h2>
              </div>
              {/* عرض عدد الوظائف المفلترة */}
              <span className="count">{filteredJobs.length}</span>
            </div>
            
            <div className="cards-container">
              {filteredJobs.map((job, jIdx) => (
                <div key={jIdx} className="job-card">
                  <div className="card-top">
                    <span className="job-id">{job.id}</span>
                    <span className="progress-percent">{job.progress}%</span>
                  </div>
                  <h3 className="client-name">{job.client}</h3>
                  
                  <div className="card-details">
                    <div className="detail-item">
                       <span>📦</span> {job.items} items
                    </div>
                    {job.assignee && (
                      <div className="detail-item">
                        <span>👤</span> {job.assignee}
                      </div>
                    )}
                    <div className="detail-item">
                      <span>🕒</span> {job.deadline}
                    </div>
                  </div>

                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${job.progress}%`,
                        backgroundColor: column.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
              
              {/* رسالة بسيطة لو العمود فضي بسبب البحث */}
              {filteredJobs.length === 0 && (
                <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '20px' }}>
                  No matches
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;