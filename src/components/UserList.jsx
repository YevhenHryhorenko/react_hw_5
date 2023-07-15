import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchAlbums = async (userId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
      const data = await response.json();
      setAlbums(data);
      setPhotos(null);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const fetchPhotos = async (albumId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleAlbumClick = (albumId) => {
    if (selectedAlbum === albumId) {
      setSelectedAlbum(null);
      setPhotos(null);
    } else {
      setSelectedAlbum(albumId);
      fetchPhotos(albumId);
    }
  };
  
  const handleUserClick = (userId) => {
    if (selectedUser === userId) {
      setSelectedUser(null);
      setSelectedAlbum(null);
      setPhotos(null);
    } else {
      setSelectedUser(userId);
      setSelectedAlbum(null);
      setPhotos(null);
      fetchAlbums(userId);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => handleUserClick(user.id)}>Album</button> {user.name}
            {selectedUser === user.id && albums && (
              <ul>
                {albums.map((album) => (
                  <li key={album.id}>
                    <button onClick={() => handleAlbumClick(album.id)}>Photos</button> {album.title}
                    {selectedAlbum === album.id && photos && (
                      <ul>
                        {photos.map((photo) => (
                          <li key={photo.id}>
                            <img src={photo.thumbnailUrl} alt={photo.title} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
