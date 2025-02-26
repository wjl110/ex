import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  username: string;
  balance: number;
  avatarUrl?: string;
  taskBalance?: number;
  rewardBalance?: number;
  trustScore?: number;
  maxTrustScore?: number;
  memberType?: string;
  isVip?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 检查用户是否已登录
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJson = await SecureStore.getItemAsync('user');
        if (userJson) {
          const userData = JSON.parse(userJson);
          setUser(userData);
        }
      } catch (error) {
        console.error('加载用户数据失败', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // 登录函数
  const login = async (username: string, password: string) => {
    try {
      // 这里应该是调用API的逻辑，现在暂时模拟
      const mockUser = {
        id: '3833445',
        username: user ? username : 'Jessica_Ch',
        balance: 10.0,
        avatarUrl: 'https://via.placeholder.com/80x80',
        taskBalance: 0,
        rewardBalance: 0,
        trustScore: 10474,
        maxTrustScore: 50000,
        memberType: '年度会员',
        isVip: true,
      };

      await SecureStore.setItemAsync('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('登录失败', error);
      throw error;
    }
  };

  // 注册函数
  const register = async (username: string, password: string) => {
    try {
      // 这里应该是调用API的注册逻辑，现在暂时模拟
      const mockUser = {
        id: '3833445',
        username: username,
        balance: 10.0,
        avatarUrl: 'https://via.placeholder.com/80x80',
        taskBalance: 0,
        rewardBalance: 0,
        trustScore: 10474,
        maxTrustScore: 50000,
        memberType: '年度会员',
        isVip: true,
      };

      await SecureStore.setItemAsync('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('注册失败', error);
      throw error;
    }
  };

  // 登出函数
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('user');
      setUser(null);
    } catch (error) {
      console.error('登出失败', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 