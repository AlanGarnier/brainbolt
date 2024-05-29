"use client";
import { Search, X } from 'lucide-react'
import React, { useState } from 'react'
import SearchResults from './SearchResults';
import { User } from 'next-auth';

interface SearchBarProps {
    user: User;
}

const SearchBar: React.FC<SearchBarProps> = ({user}) => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<User[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
    
        if (value.length > 2) {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/search?pseudo=${value}`);
            const data = await response.json();
            if (response.ok) {
              setResults(data);
              setShowResults(true);
            } else {
                setResults([]);
                setErrorMessage(data.message || 'Aucun utilisateur trouvé 😞.');
                setShowResults(true);
              }
          } catch (error) {
            // console.error('Error fetching search results:', error);
            setShowResults(false);
          }
        } else {
          setShowResults(false);
        }
      };

      const handleResetValue = () => {
        setQuery('');
        setShowResults(false);
      }

  return (
    <div className="hidden lg:block lg:ml-[260px]">
        <label className="sr-only">Search</label>
        <div className="relative mt-1 lg:w-96">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={20} className="text-primary-black dark:text-[#BBBBBF]" />
            </div>
            <input
                type="text"
                name="search"
                id="topbar-search"
                className="input-search"
                placeholder="Rechercher un jeu/ami..."
                value={query}
                onChange={handleSearch}
            />
            {
              showResults && <button
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                              onClick={handleResetValue}>
                                <X size={20} className="text-primary-black dark:text-[#BBBBBF]" />
                             </button>
            }
            {showResults && <SearchResults 
                              results={results} 
                              errorMessage={errorMessage}
                              user={user} 
                            />}
        </div>
    </div>
  )
}

export default SearchBar