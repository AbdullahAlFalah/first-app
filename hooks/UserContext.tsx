import React, { createContext, useContext, useState, ReactNode } from 'react';

type Props = {
    globalemail: string;
    setGlobalemail: React.Dispatch<React.SetStateAction<string>>;
  };

// Create the context with default undefined values
const UserContext = createContext<Props | undefined>(undefined);

// UserProvider component
const UserProvider = ({ children }: { children: ReactNode }) => {

    const [globalemail, setGlobalemail] = useState<string>('');
  
    return (
      <UserContext.Provider value={{ globalemail, setGlobalemail }}>
        {children}
      </UserContext.Provider>
    );

  };

// Export a custom hook for easier access to the context
export const useUserinfo = () => {

  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserinfo hook must be used within a UserProvider');
  }
  return context;

};

export default UserProvider;

