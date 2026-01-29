import React, { useState, useMemo } from 'react';
import { dictionaryEntries } from '../../data/demoData';
import type { DictionaryCategory, DictionaryEntry } from '../../types';
import './DictionaryPage.css';

const categories: { value: DictionaryCategory; label: string }[] = [
    { value: 'routes', label: 'Routes' },
    { value: 'coverages', label: 'Coverages' },
    { value: 'formations', label: 'Formations' },
    { value: 'blitzes', label: 'Blitzes' },
    { value: 'protections', label: 'Protections' },
    { value: 'concepts', label: 'Concepts' },
];

export function DictionaryPage() {
    const [activeCategory, setActiveCategory] = useState<DictionaryCategory>('routes');
    const [search, setSearch] = useState('');
    const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const filteredEntries = useMemo(() => {
        return dictionaryEntries.filter(entry => {
            const matchesCategory = entry.category === activeCategory;
            const matchesSearch = entry.name.toLowerCase().includes(search.toLowerCase()) ||
                entry.aliases.some(a => a.toLowerCase().includes(search.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, search]);

    return (
        <div className="dictionary-page animate-fade-in">
            <div className="page-header">
                <div>
                    <h1>Team Dictionary</h1>
                    <p className="page-subtitle">Define your team's terminology</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Import CSV
                    </button>
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Entry
                    </button>
                </div>
            </div>

            <div className="dictionary-layout">
                <div className="dictionary-sidebar">
                    <div className="search-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            className="input"
                            placeholder="Search terms..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="category-tabs">
                        {categories.map(cat => (
                            <button
                                key={cat.value}
                                className={`category-tab ${activeCategory === cat.value ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.value)}
                            >
                                {cat.label}
                                <span className="count">
                                    {dictionaryEntries.filter(e => e.category === cat.value).length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="dictionary-content">
                    <div className="entries-list">
                        {filteredEntries.map((entry, index) => (
                            <div
                                key={entry.id}
                                className={`entry-card card card-hover ${selectedEntry?.id === entry.id ? 'selected' : ''}`}
                                onClick={() => setSelectedEntry(entry)}
                                style={{ animationDelay: `${index * 30}ms` }}
                            >
                                <h3>{entry.name}</h3>
                                <p className="entry-description">{entry.description}</p>
                                {entry.aliases.length > 0 && (
                                    <div className="aliases">
                                        {entry.aliases.map(alias => (
                                            <span key={alias} className="chip">{alias}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {filteredEntries.length === 0 && (
                            <div className="empty-state">
                                <div className="empty-icon">📖</div>
                                <h3>No entries found</h3>
                                <p>Add your first {activeCategory} entry</p>
                            </div>
                        )}
                    </div>
                </div>

                {selectedEntry && (
                    <div className="entry-detail card animate-slide-in">
                        <div className="detail-header">
                            <h2>{selectedEntry.name}</h2>
                            <button className="close-btn" onClick={() => setSelectedEntry(null)}>×</button>
                        </div>

                        <div className="detail-content">
                            <div className="detail-field">
                                <label>Category</label>
                                <span className="badge badge-accent">{selectedEntry.category}</span>
                            </div>

                            <div className="detail-field">
                                <label>Description</label>
                                <p>{selectedEntry.description}</p>
                            </div>

                            <div className="detail-field">
                                <label>Aliases</label>
                                <div className="aliases-editable">
                                    {selectedEntry.aliases.map(alias => (
                                        <span key={alias} className="chip editable">
                                            {alias}
                                            <button>×</button>
                                        </span>
                                    ))}
                                    <input className="input alias-input" placeholder="Add alias..." />
                                </div>
                            </div>

                            {selectedEntry.diagram && (
                                <div className="detail-field">
                                    <label>Diagram</label>
                                    <div className="diagram-placeholder">
                                        <span>📊</span>
                                        <p>Diagram preview</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="detail-actions">
                            <button className="btn btn-secondary">Delete</button>
                            <button className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                )}
            </div>

            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="add-entry-modal card animate-slide-up" onClick={e => e.stopPropagation()}>
                        <h2>Add Dictionary Entry</h2>

                        <div className="form-field">
                            <label>Name</label>
                            <input className="input" placeholder="Entry name" />
                        </div>

                        <div className="form-field">
                            <label>Category</label>
                            <select className="input">
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-field">
                            <label>Description</label>
                            <textarea className="input" rows={3} placeholder="Describe this term..." />
                        </div>

                        <div className="form-field">
                            <label>Aliases (comma separated)</label>
                            <input className="input" placeholder="Alt name 1, Alt name 2" />
                        </div>

                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={() => setShowAddModal(false)}>
                                Create Entry
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
