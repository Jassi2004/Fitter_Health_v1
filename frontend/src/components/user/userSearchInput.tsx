"use client"
import React from 'react';

interface UserSearchInputProps {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const UserSearchInput: React.FC<UserSearchInputProps> = ({ query, onChange, onSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by username or email"
        value={query}
        onChange={onChange}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default UserSearchInput;
