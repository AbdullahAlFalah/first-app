import React, { createContext, useContext, useState, ReactNode } from 'react';

type Props = {
    globalemail: string;
    setGlobalemail: React.Dispatch<React.SetStateAction<string>>;
    globalId: number | null;
    setGlobalId: React.Dispatch<React.SetStateAction<number | null>>;
    globalFilmId: number | null;
    setGlobalFilmId: React.Dispatch<React.SetStateAction<number | null>>;
    expoPushToken: string | null;
    setExpoPushToken: React.Dispatch<React.SetStateAction<string | null>>;
  };

// Create the context with default undefined values
const UserContext = createContext<Props | undefined>(undefined);

// UserProvider component
const UserProvider = ({ children }: { children: ReactNode }) => {

    const [globalemail, setGlobalemail] = useState<string>('');
    const [globalId, setGlobalId] = useState<number | null>(null);
    const [globalFilmId, setGlobalFilmId] = useState<number | null>(null);
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  
    return (
      <UserContext.Provider value = {{ 
        globalemail, setGlobalemail, 
        globalId, setGlobalId, 
        globalFilmId, setGlobalFilmId,
        expoPushToken,
        setExpoPushToken 
      }}>
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

