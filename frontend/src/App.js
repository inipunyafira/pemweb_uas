import React, { useEffect, useState } from 'react';

function App() {
    const [berita, setBerita] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/berita')
            .then(response => response.json())
            .then(data => setBerita(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="App">
            <h1>Daftar Berita</h1>
            <ul>
                {berita.map((item, index) => (
                    <li key={index}>
                        <h2>{item.judul_berita}</h2>
                        <p>Kategori: {item.nama_kategori}</p>
                        <p>Ringkasan: {item.ringkasan}</p>
                        <p>Keywords: {item.keywords.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
