import { UserPlus } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

type Props = {
    results: any[]
    errorMessage: string;
}

const SearchResults: React.FC<Props> = ({results, errorMessage}) => {
  return (
    <div className="absolute min-w-[386px] p-3 mx-auto top-14 right-0 z-50 bg-white dark:bg-primary-black border border-lighter-grey dark:border-dark-grey rounded-lg shadow-lg">
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={result._id} className={`flex items-center p-2 ${index !== results.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
            <Image
                src={result.picture}
                alt={result.pseudo}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div className="flex-grow">
                <p className="text-primary-black dark:text-white">{result.pseudo}</p>
            </div>
            <button className="p-2 rounded-lg bg-gradient-to-r from-primary-purple to-primary-skyblue text-white/70 hover:text-white/100">
                <UserPlus size={20} />
            </button>
        </div>
        ))
      ) : (
        <p className="text-primary-black dark:text-white">{errorMessage}</p>
      )}
    </div>
  )
}

export default SearchResults