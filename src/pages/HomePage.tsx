import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { roles } from '../data/index';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="app-title">📚 Dev Study Library</h1>
        <p className="app-subtitle">Strengthen your engineering knowledge. One question at a time.</p>
        <button className="learning-tab-btn" onClick={() => navigate('/learning')}>
          Learning Section →
        </button>
      </header>

      <div className="roles-grid">
        {roles.map(role => (
          <div key={role.id} className="role-card" style={{ '--role-color': role.color } as CSSProperties}>
            <div className="role-card-header">
              <h2 className="role-title">{role.title}</h2>
              <span className="test-count">{role.tests.length} tests</span>
            </div>
            <p className="role-description">{role.description}</p>
            <div className="tests-list">
              {role.tests.map(test => (
                <button
                  key={test.id}
                  className="test-card-btn"
                  onClick={() => navigate(`/intro/${test.id}`)}
                >
                  <span className="test-name">{test.title}</span>
                  <span className="test-meta">{test.questions.length}Q · ~{test.estimatedMinutes}min</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
