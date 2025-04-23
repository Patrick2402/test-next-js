'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function JwtTestComponent() {
  const [token, setToken] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Pobierz token z localStorage przy ładowaniu komponentu
    const savedToken = localStorage.getItem('auth_token');
    setToken(savedToken);
  }, []);

  const testAuthEndpoint = async () => {
    try {
      setError(null);
      // Upewnij się, że token jest w nagłówku
      const savedToken = localStorage.getItem('auth_token');
      
      if (!savedToken) {
        setError('Brak tokenu w localStorage!');
        return;
      }
      
      // Ustaw token w nagłówkach
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      
      // Wykonaj zapytanie do chronionego endpointu
      const response = await axios.get('http://localhost:8080/api/profile');
      setProfileData(response.data);
    } catch (err: any) {
      console.error('Error testing JWT:', err);
      if (err.response) {
        setError(`Błąd autoryzacji: ${err.response.status} - ${err.response.data?.error || 'Brak dostępu'}`);
      } else {
        setError('Błąd podczas testowania autoryzacji');
      }
    }
  };

  const clearToken = () => {
    localStorage.removeItem('auth_token');
    axios.defaults.headers.common['Authorization'] = '';
    setToken(null);
    setProfileData(null);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Test JWT</h2>
      
      <div className="mb-4 " >
        <h3 className="font-medium mb-2">Status tokenu:</h3>
        {token ? (
          <div className="bg-green-100 p-3 rounded">
            <p className="text-green-800 font-medium">Token znaleziony w localStorage!</p>
            <p className="text-sm mt-2 break-all text-black" >{token}</p>
          </div>
        ) : (
          <div className="bg-red-100 p-3 rounded">
            <p className="text-red-800">Brak tokenu w localStorage!</p>
          </div>
        )}
      </div>
      
      <div className="flex space-x-4 mb-6">
        <button 
          onClick={testAuthEndpoint}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Testuj chroniony endpoint
        </button>
        
        <button 
          onClick={clearToken}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Wyczyść token
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 p-3 rounded mb-4">
          <p className="text-red-800" >{error}</p>
        </div>
      )}
      
      {profileData && (
        <div className="bg-green-100 p-3 rounded">
          <h3 className="font-medium mb-2 text-black">Odpowiedź z chronionego endpointu:</h3>
          <pre className="bg-gray-50 p-2 rounded text-sm overflow-auto text-black">
            {JSON.stringify(profileData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}