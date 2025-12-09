import React, { useState, useEffect } from 'react';

/* --- Dados Fictícios com Fotos --- */
const DUMMY_SONGS = [
    { id: 1, title: 'BONEKINHA', artist: 'Glória Groove', duration: 188, favorited: false, imageUrl: 'https://picsum.photos/id/10/50/50' },
    { id: 2, title: 'A QUEDA', artist: 'Glória Groove', duration: 200, favorited: true, imageUrl: 'https://picsum.photos/id/20/50/50' },
    { id: 3, title: 'LEVITANDO', artist: 'Glória Groove', duration: 215, favorited: false, imageUrl: 'https://picsum.photos/id/30/50/50' },
    { id: 4, title: 'DANÇARINA', artist: 'Pedro Sampaio', duration: 195, favorited: false, imageUrl: 'https://picsum.photos/id/40/50/50' },
    { id: 5, title: 'SENTADÃO', artist: 'Pedro Sampaio', duration: 170, favorited: true, imageUrl: 'https://picsum.photos/id/50/50' },
    { id: 6, title: 'Pra Cima', artist: 'Marina Sena', duration: 245, favorited: false, imageUrl: 'https://picsum.photos/id/60/50/50' },
    { id: 7, title: 'Por Supuesto', artist: 'Marina Sena', duration: 230, favorited: false, imageUrl: 'https://picsum.photos/id/70/50/50' },
    { id: 8, title: 'Voltei Pra Mim', artist: 'Marina Sena', duration: 205, favorited: false, imageUrl: 'https://picsum.photos/id/80/50/50' },
];

/* --- Configuração de Responsividade Simulada --- */
const BREAKPOINT = 768; 
const isMobile = window.innerWidth < BREAKPOINT; 

/* --- Objeto de Estilos Embutidos --- */
const styles = {
    appContainer: {
        display: 'grid',
        width: '100vw', 
        height: '100vh', 
        gridTemplateColumns: isMobile ? '1fr' : '250px 1fr', 
        gridTemplateRows: '1fr 90px', 
        backgroundColor: '#121212',
        color: '#FFFFFF',
        fontFamily: 'Circular, Helvetica, Arial, sans-serif',
        overflow: 'hidden',
        fontSize: '14px',
    },
    sidebar: {
        gridRow: '1 / 2',
        gridColumn: isMobile ? '1 / 2' : '1 / 2',
        backgroundColor: '#000000',
        padding: '20px 10px',
        overflowY: 'auto',
        display: isMobile ? 'none' : 'block', 
    },
    mainContent: {
        gridRow: '1 / 2',
        gridColumn: isMobile ? '1 / 2' : '2 / 3',
        padding: '20px',
        overflowY: 'auto',
        backgroundImage: 'linear-gradient(to bottom, #1DB95430, #121212)',
    },
    playerBar: {
        gridRow: '2 / 3',
        gridColumn: '1 / 3',
        backgroundColor: '#181818',
        padding: '0 20px',
        borderTop: '1px solid #000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    cardTitle: {
        color: '#FFFFFF',
        marginBottom: '15px',
        fontSize: isMobile ? '28px' : '32px',
        fontWeight: 'bold',
        textAlign: isMobile ? 'center' : 'left',
        padding: isMobile ? '10px 0' : '0',
    },
    listItem: (isCurrent) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px',
        cursor: 'pointer',
        borderRadius: '4px',
        backgroundColor: isCurrent ? '#1DB95450' : 'transparent',
        transition: 'background-color 0.2s',
    }),
    button: (color = '#FFFFFF') => ({
        backgroundColor: '#282828',
        color: color,
        border: `1px solid ${color}`,
        padding: '8px 15px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginRight: '10px',
        whiteSpace: 'nowrap',
        fontSize: isMobile ? '12px' : '14px',
    }),
};

/* --- Componentes --- */

const Header = ({ onSearch, searchQuery, onAddSong }) => (
    <header style={{ marginBottom: '30px' }}>
        <h1 style={styles.cardTitle}>Mistic Music</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
            <input
                type="text"
                placeholder="Buscar por músicas, artistas..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                style={{ ...styles.searchBar, flexGrow: 1, marginRight: '10px' }}
            />
            <button onClick={onAddSong} style={styles.button('#FFFFFF')}>
                + Nova Música
            </button>
        </div>
    </header>
);

const Player = ({ currentSong, isPlaying, volume, progress, onPlayPause, onVolumeChange }) => (
    <div style={styles.playerBar}>
        <div style={{ display: 'flex', alignItems: 'center', width: isMobile ? '50%' : '30%' }}>
            <img 
                src={currentSong.imageUrl} 
                alt="Album Art" 
                style={{ width: '50px', height: '50px', borderRadius: '4px', marginRight: '15px' }} 
            />
            <div>
                <div style={{ fontWeight: 'bold', fontSize: isMobile ? '12px' : '14px' }}>{currentSong.title}</div>
                <div style={{ color: '#B3B3B3', fontSize: '12px' }}>{currentSong.artist}</div>
            </div>
        </div>

        <div style={{ width: isMobile ? '0' : '40%', display: isMobile ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button 
                onClick={onPlayPause} 
                style={{ ...styles.button('#FFFFFF'), backgroundColor: 'transparent', border: 'none', fontSize: '24px' }}
            >
                {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '5px' }}>
                <span style={{ color: '#B3B3B3', fontSize: '10px', marginRight: '10px' }}>
                    {Math.floor(currentSong.duration * (progress / 100) / 60)}:{String(Math.floor(currentSong.duration * (progress / 100) % 60)).padStart(2, '0')}
                </span>
                <div style={{ backgroundColor: '#444', height: '4px', width: '100%', borderRadius: '2px', cursor: 'pointer' }}>
                    <div style={{ width: `${progress}%`, height: '4px', backgroundColor: '#1DB954', borderRadius: '2px' }}></div>
                </div>
                <span style={{ color: '#B3B3B3', fontSize: '10px', marginLeft: '10px' }}>
                    {Math.floor(currentSong.duration / 60)}:{String(currentSong.duration % 60).padStart(2, '0')}
                </span>
            </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', width: isMobile ? '50%' : '30%', justifyContent: 'flex-end' }}>
            <span style={{ marginRight: '10px' }}>🔊</span>
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume} 
                onChange={onVolumeChange}
                style={{ width: isMobile ? '60px' : '100px', cursor: 'pointer', accentColor: '#1DB954' }}
            />
        </div>
    </div>
);

const Playlists = ({ playlists, history, onCreatePlaylist, onSelectPlaylist }) => (
    <div>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>Sua Biblioteca</h2>
        <button onClick={onCreatePlaylist} style={{ ...styles.button('#FFFFFF'), width: '100%', marginBottom: '20px' }}>
            + Criar Playlist
        </button>
        
        <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '14px', color: '#B3B3B3', marginBottom: '10px' }}>Playlists</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {playlists.map(p => (
                    <li 
                        key={p.id} 
                        style={{ padding: '8px 0', cursor: 'pointer', color: '#B3B3B3' }}
                        onClick={() => onSelectPlaylist(p)}
                    >
                        🎵 {p.name} <span style={{ fontSize: '10px' }}>({p.songs.length})</span>
                    </li>
                ))}
            </ul>
        </div>
        
        {/* Histórico */}
        <div>
            <h3 style={{ fontSize: '14px', color: '#B3B3B3', marginBottom: '10px' }}>Histórico ({history.length})</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {history.slice(0, 5).map((song, index) => (
                    <li 
                        key={song.id + index} 
                        style={{ padding: '8px 0', color: '#B3B3B3', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                        ▶️ {song.title} - {song.artist}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const PlaylistEditor = ({ 
    playlist, 
    allSongs, 
    onClose, 
    onRemoveSong, 
    onAddSongToPlaylist, 
    currentSongId,
    onSelectSong 
}) => {
    
    const availableSongs = allSongs.filter(
        song => !playlist.songs.some(pSong => pSong.id === song.id)
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={styles.cardTitle}>{playlist.name}</h1>
                <button onClick={onClose} style={{ ...styles.button('#FF4747'), backgroundColor: 'transparent', border: '1px solid #FF4747' }}>
                    Fechar Edição (X)
                </button>
            </div>
            
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Músicas na Playlist ({playlist.songs.length})</h2>
            
            <div style={{ backgroundColor: '#181818', borderRadius: '8px', padding: '10px', marginBottom: '30px' }}>
                {playlist.songs.length === 0 ? (
                    <p style={{ padding: '20px', textAlign: 'center' }}>Esta playlist está vazia.</p>
                ) : (
                    playlist.songs.map(song => (
                        <div 
                            key={song.id} 
                            style={styles.listItem(song.id === currentSongId)} 
                            onClick={() => onSelectSong(song)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                <img src={song.imageUrl} alt="Capa" style={{ width: '40px', height: '40px', borderRadius: '4px', marginRight: '15px' }} />
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{song.title}</div>
                                    <div style={{ color: '#B3B3B3', fontSize: '12px' }}>{song.artist}</div>
                                </div>
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onRemoveSong(playlist.id, song.id); }}
                                style={{ ...styles.button('#FF4747'), padding: '5px 10px', border: 'none' }}
                            >
                                Excluir ❌
                            </button>
                        </div>
                    ))
                )}
            </div>

            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Adicionar Músicas</h2>
            <div style={{ backgroundColor: '#181818', borderRadius: '8px', padding: '10px' }}>
                {availableSongs.length === 0 ? (
                    <p style={{ padding: '20px', textAlign: 'center' }}>Todas as músicas já foram adicionadas.</p>
                ) : (
                    availableSongs.map(song => (
                        <div 
                            key={song.id} 
                            style={{ ...styles.listItem(false), justifyContent: 'space-between' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={song.imageUrl} alt="Capa" style={{ width: '30px', height: '30px', borderRadius: '4px', marginRight: '10px' }} />
                                <div>{song.title} - {song.artist}</div>
                            </div>
                            <button 
                                onClick={() => onAddSongToPlaylist(playlist.id, song)}
                                style={{ ...styles.button('#1DB954'), padding: '5px 10px', border: 'none' }}
                            >
                                + Adicionar
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const ListaMusicas = ({ songs, onSelectSong, currentSongId, onToggleFavorite, onDeleteSong }) => (
    <div>
        <h2 style={{ ...styles.cardTitle, fontSize: '20px', textAlign: 'left' }}>Todas as Músicas</h2>
        <div style={{ backgroundColor: '#181818', borderRadius: '8px', padding: '10px' }}>
            {songs.length === 0 ? (
                <p style={{ padding: '20px', textAlign: 'center' }}>Nenhuma música encontrada ou adicionada.</p>
            ) : (
                songs.map(song => (
                     <div 
                        key={song.id} 
                        style={styles.listItem(song.id === currentSongId)} 
                        onClick={() => onSelectSong(song)}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <img 
                                src={song.imageUrl} 
                                alt="Capa" 
                                style={{ width: '40px', height: '40px', borderRadius: '4px', marginRight: '15px' }} 
                            />
                            <div>
                                <div style={{ fontWeight: 'bold', color: song.id === currentSongId ? '#1DB954' : '#FFFFFF' }}>{song.title}</div>
                                <div style={{ color: '#B3B3B3', fontSize: '12px' }}>{song.artist}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onToggleFavorite(song.id); }}
                                style={{ ...styles.button('#1DB954'), fontSize: '16px', padding: '0 5px', border: 'none', backgroundColor: 'transparent' }}
                            >
                                {song.favorited ? '❤️' : '🤍'}
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onDeleteSong(song.id); }}
                                style={{ ...styles.button('#FF4747'), fontSize: '16px', padding: '5px 10px', border: 'none' }}
                            >
                                🗑️
                            </button>
                            <span style={{ color: '#B3B3B3', marginLeft: '15px' }}>
                                {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);


/* --- Componente Principal da Aplicação --- */
function MisticMusic() {
    /* ESTADOS */
    const [allSongs, setAllSongs] = useState(DUMMY_SONGS);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentSong, setCurrentSong] = useState(DUMMY_SONGS[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0); 
    const [volume, setVolume] = useState(75); 
    const [playlists, setPlaylists] = useState([
        { id: 'p1', name: 'Favoritas', songs: DUMMY_SONGS.filter(s => s.favorited) },
        { id: 'p2', name: 'Pop Nacional', songs: [DUMMY_SONGS[0], DUMMY_SONGS[2]] },
    ]);
    const [history, setHistory] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const filteredSongs = allSongs.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    /* EFEITO DE PROGRESSO */
    useEffect(() => {
        let interval;
        if (isPlaying) {
            const durationMs = currentSong.duration * 1000;
            const delay = durationMs / 100; 
            interval = setInterval(() => {
                setProgress(prevProgress => {
                    if (prevProgress >= 100) {
                        clearInterval(interval);
                        setIsPlaying(false);
                        return 0;
                    }
                    return prevProgress + 1;
                });
            }, delay);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentSong]); 

    /* HANDLERS */
    
    const handleSelectPlaylist = (playlist) => {
        setSelectedPlaylist(playlist);
    };

    const handleSelectSong = (song) => {
        setCurrentSong(song);
        setProgress(0);
        setIsPlaying(true);
        setSelectedPlaylist(null); 
        
        setHistory(prevHistory => {
            if (prevHistory[0]?.id !== song.id) {
                return [song, ...prevHistory.slice(0, 9)]; 
            }
            return prevHistory;
        });
    };

    const handleAddSong = () => {
        const title = prompt("Título da nova música:");
        const artist = prompt("Artista:");
        if (title && artist) {
            const newSong = {
                id: Date.now(),
                title,
                artist,
                duration: 220,
                favorited: false,
                imageUrl: 'https://picsum.photos/id/90/50/50',
            };
            setAllSongs(prevSongs => [newSong, ...prevSongs]);
        }
    };

    const handleDeleteSong = (songId) => {
        if (window.confirm("Tem certeza que deseja excluir esta música?")) {
            setAllSongs(prevSongs => {
                const updatedSongs = prevSongs.filter(song => song.id !== songId);
                
                if (currentSong.id === songId) {
                    const newCurrentSong = updatedSongs[0] || DUMMY_SONGS[0];
                    setCurrentSong(newCurrentSong); 
                    setIsPlaying(false);
                    setProgress(0);
                }
                
                 setPlaylists(prevPlaylists => prevPlaylists.map(p => ({
                    ...p,
                    songs: p.songs.filter(s => s.id !== songId)
                })));
                setHistory(prevHistory => prevHistory.filter(s => s.id !== songId));

                return updatedSongs;
            });
        }
    };

    const handleToggleFavorite = (songId) => {
        setAllSongs(prevSongs => {
            const updatedSongs = prevSongs.map(song =>
                song.id === songId ? { ...song, favorited: !song.favorited } : song
            );
            
            setPlaylists(prevPlaylists => prevPlaylists.map(p => {
                if (p.id === 'p1') {
                    const songToToggle = updatedSongs.find(s => s.id === songId);
                    if (songToToggle.favorited) {
                        return { ...p, songs: [...p.songs, songToToggle] };
                    } else {
                        return { ...p, songs: p.songs.filter(s => s.id !== songId) };
                    }
                }
                return p;
            }));

            return updatedSongs;
        });
    };

    const handleCreatePlaylist = () => {
        const newPlaylistName = prompt("Digite o nome da nova playlist:");
        if (newPlaylistName) {
            const newPlaylist = {
                id: `p${Date.now()}`,
                name: newPlaylistName,
                songs: []
            };
            setPlaylists([...playlists, newPlaylist]);
        }
    };

    const handleAddSongToPlaylist = (playlistId, song) => {
        setPlaylists(prevPlaylists => prevPlaylists.map(p => {
            if (p.id === playlistId && !p.songs.some(s => s.id === song.id)) {
                return { ...p, songs: [...p.songs, song] };
            }
            return p;
        }));
        setSelectedPlaylist(prev => ({ ...prev, songs: [...prev.songs, song] }));
    };

    const handleRemoveFromPlaylist = (playlistId, songId) => {
        setPlaylists(prevPlaylists => prevPlaylists.map(p => {
            if (p.id === playlistId) {
                const updatedSongs = p.songs.filter(s => s.id !== songId);
                return { ...p, songs: updatedSongs };
            }
            return p;
        }));
        setSelectedPlaylist(prev => ({ ...prev, songs: prev.songs.filter(s => s.id !== songId) }));
        
        if (playlistId === 'p1') {
             setAllSongs(prevSongs => prevSongs.map(s => 
                 s.id === songId ? { ...s, favorited: false } : s
             ));
        }
    };

    /* RENDERIZAÇÃO CONDICIONAL */
    const renderMainContent = () => {
        if (selectedPlaylist) {
            return (
                <PlaylistEditor
                    playlist={selectedPlaylist}
                    allSongs={allSongs}
                    onClose={() => setSelectedPlaylist(null)}
                    onRemoveSong={handleRemoveFromPlaylist}
                    onAddSongToPlaylist={handleAddSongToPlaylist}
                    currentSongId={currentSong.id}
                    onSelectSong={handleSelectSong}
                />
            );
        }
        
        return (
            <>
                <Header 
                    onSearch={setSearchQuery} 
                    searchQuery={searchQuery}
                    onAddSong={handleAddSong}
                />
                <ListaMusicas 
                    songs={filteredSongs} 
                    onSelectSong={handleSelectSong}
                    currentSongId={currentSong.id}
                    onToggleFavorite={handleToggleFavorite}
                    onDeleteSong={handleDeleteSong}
                />
            </>
        );
    };

    return (
        <div style={styles.appContainer}>
            
            {/* 1. Sidebar */}
            <div style={styles.sidebar}>
                <Playlists 
                    playlists={playlists} 
                    history={history}
                    onCreatePlaylist={handleCreatePlaylist}
                    onSelectPlaylist={handleSelectPlaylist}
                />
            </div>

            {/* 2. Conteúdo Principal */}
            <div style={styles.mainContent}>
                {renderMainContent()}
            </div>
            
            {/* 3. Player Bar */}
            <Player 
                currentSong={currentSong} 
                isPlaying={isPlaying} 
                volume={volume} 
                progress={progress} 
                onPlayPause={() => setIsPlaying(!isPlaying)}
                onVolumeChange={(e) => setVolume(e.target.value)}
            />

        </div>
    );
}

export default MisticMusic;