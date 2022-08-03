import React, { useEffect, useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

type UserTokens = {
  accessToken?: string;
  refreshToken?: string;
};

type UserLanguage = 'en' | 'kr' | 'cn';

type ExternalProvider = 'google';

type CurrentUser = {
  id: string;
  displayName: string;
  email: string;
  externalId?: string;
  firstName: string;
  language?: UserLanguage;
  lastName: string;
  picture?: string;
  providerType?: ExternalProvider;
  createdAt: Date;
  updatedAt: Date;
  tokens?: UserTokens;
};

type LayoutContextType = {
  loading: boolean;
  currentUser?: CurrentUser;
};

const LayoutContext = createContext<LayoutContextType>(null);

export const LayoutContextProvider: React.FC = ({ children }) => {
  // Status Updates
  const [loading, setLoading] = useState(false);

  // States
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // Hooks
  const { pathname } = useLocation();

  // Functions

  // # Region Private

  // # Region Public

  // Effects
  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await axios.get<{ user: CurrentUser | null }>('/api/users/self');
        setCurrentUser(user);
      } catch (err) {
        message.error('Error fetching current user');
      }
      setLoading(false);
    };

    if (pathname === '/') {
      fetchCurrentUser();
    }
  }, [pathname]);

  return (
    <LayoutContext.Provider
      value={{
        // Status Updates
        loading,
        // States
        currentUser,
        // Functions
        // Ref
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;
