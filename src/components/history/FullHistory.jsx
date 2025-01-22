import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FullHistory() {
    const location = useLocation();
    const navigate = useNavigate();
    const historyItem = location.state?.historyItem;

    if (!historyItem) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f9f9f9', color: '#333', padding: '20px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>No Data Available</h1>
                <button
                    style={{ backgroundColor: '#007BFF', color: '#fff', fontWeight: 'medium', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                    onClick={() => navigate('/history')}
                >
                    Go Back to Main Page
                </button>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: 'Georgia, serif', lineHeight: '1.6', backgroundColor: '#fff', color: '#333', padding: '20px' }}>
            {/* Add Back Button here */}
            <header style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '20px', textAlign: 'center' }}>
                <button
                    style={{ backgroundColor: '#007BFF', color: '#fff', fontWeight: 'medium', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', position: 'absolute', top: '20px', left: '20px' }}
                    onClick={() => navigate('/history')}
                >
                    Back
                </button>
                <h1 className="text-4xl md:text-3xl font-bold font-serif">{historyItem.event}</h1>
                <p className="text-base md:text-lg italic text-gray-600 mt-2">A dive into the depths of history</p>

            </header>

            <main style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '20px' }}>
                <aside style={{ position: 'sticky', top: '10px', alignSelf: 'flex-start', backgroundColor: '#f1f1f1', padding: '10px', border: '1px solid black', borderRadius: '5px', fontFamily: 'Arial, sans-serif' }}>
                    {historyItem.images && historyItem.images.length > 0 && (
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid black', paddingBottom: '5px' }}>Images</h2>
                            <div>
                                {historyItem.images.map((img, index) => (
                                    <figure key={index} style={{ marginBottom: '20px' }}>
                                        <img
                                            src={img.link}
                                            alt={img.title}
                                            style={{ width: '100%', borderRadius: '5px', marginBottom: '10px' }}
                                        />
                                        <figcaption style={{ fontSize: '14px', textAlign: 'center', color: '#555' }}>{img.title}</figcaption>
                                    </figure>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

                <section style={{ padding: '10px', columnCount: 3, columnGap: '30px', textAlign: 'justify', fontSize: '18px' }}>
                    <section style={{ marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '2px solid black' }}>Year</h2>
                        <p style={{ fontSize: '18px', paddingLeft: '10px', borderLeft: '4px solid #007BFF' }}>{historyItem.year}</p>
                    </section>

                    <section style={{ marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '2px solid black' }}>Description</h2>
                        <p>{historyItem.description}</p>
                    </section>

                    {historyItem.background && (
                        <section style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '2px solid black' }}>Background</h2>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                {historyItem.background.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {historyItem.key_figures && (
                        <section style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '2px solid black' }}>Key Figures</h2>
                            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                {historyItem.key_figures.map((figure, index) => (
                                    <li key={index} style={{ padding: '10px', border: '1px solid black', borderRadius: '5px' }}>
                                        {figure}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {historyItem.development && (
                        <section style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '2px solid black' }}>Development</h2>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                {historyItem.development.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {historyItem.impact && (
                        <section style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '2px solid black' }}>Impact</h2>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                {historyItem.impact.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {historyItem.references && historyItem.references.length > 0 && (
                        <section style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '2px solid black' }}>Additional Resources</h2>
                            <ul>
                                {historyItem.references.map((ref, index) => (
                                    <li key={index} style={{ marginBottom: '20px', borderBottom: '1px solid black', paddingBottom: '10px' }}>
                                        <p style={{ fontWeight: 'bold', color: '#007BFF', marginBottom: '5px' }}>{ref.title}</p>
                                        {ref.type === 'video' && ref.link.includes('youtube.com') ? (
                                            <iframe
                                                width="100%"
                                                height="315"
                                                src={ref.link.replace('watch?v=', 'embed/')}
                                                title={ref.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{ borderRadius: '5px' }}
                                            ></iframe>
                                        ) : (
                                            <a
                                                href={ref.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#007BFF', textDecoration: 'underline' }}
                                            >
                                                {ref.link}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </section>
            </main>

            <footer style={{ borderTop: '2px solid black', paddingTop: '20px', textAlign: 'center', marginTop: '20px' }}>
                <button
                    style={{ backgroundColor: '#007BFF', color: '#fff', fontWeight: 'medium', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                    onClick={() => navigate('/history')}
                >
                    Go Back
                </button>
            </footer>
        </div>
    );
}

export default FullHistory;
