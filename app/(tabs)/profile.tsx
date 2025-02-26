import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      // 可以在这里添加登出后的导航逻辑
    } catch (error) {
      console.error('登出失败', error);
    }
  };

  // 如果未登录，显示登录提示
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginPromptContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={50} color="#DDD" />
          </View>
          <Text style={styles.loginPromptText}>登录后享受更多权益</Text>
          <View style={styles.loginButtonsContainer}>
            <TouchableOpacity 
              style={[styles.loginButton, styles.registerButton]}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.registerButtonText}>注册</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.loginButton, styles.loginButtonPrimary]}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginButtonPrimaryText}>登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 用户信息卡片 */}
        <View style={styles.userInfoCard}>
          <View style={styles.userInfoHeader}>
            <View style={styles.userBasicInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user.username[0].toUpperCase()}</Text>
              </View>
              <View style={styles.userNameInfo}>
                <Text style={styles.username}>{user.username}</Text>
                <View style={styles.userLevel}>
                  <Text style={styles.userLevelText}>Lv.3</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.editProfileButton}
              onPress={() => router.push('/edit-profile')}
            >
              <Text style={styles.editProfileText}>编辑</Text>
            </TouchableOpacity>
          </View>
          
          {/* 用户数据统计 */}
          <View style={styles.userStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>¥{user.balance.toFixed(2)}</Text>
              <Text style={styles.statLabel}>账户余额</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>已完成任务</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>进行中任务</Text>
            </View>
          </View>
        </View>
        
        {/* 钱包区域 */}
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <Text style={styles.sectionTitle}>我的钱包</Text>
            <TouchableOpacity 
              style={styles.withdrawButton}
              onPress={() => router.push('/withdraw')}
            >
              <Text style={styles.withdrawButtonText}>提现</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.walletItems}>
            <TouchableOpacity 
              style={styles.walletItem}
              onPress={() => router.push('/earnings')}
            >
              <View style={[styles.walletItemIcon, {backgroundColor: '#FF9800'}]}>
                <FontAwesome5 name="money-bill-wave" size={18} color="white" />
              </View>
              <Text style={styles.walletItemText}>收益明细</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.walletItem}
              onPress={() => router.push('/withdrawals')}
            >
              <View style={[styles.walletItemIcon, {backgroundColor: '#4CAF50'}]}>
                <MaterialIcons name="account-balance-wallet" size={18} color="white" />
              </View>
              <Text style={styles.walletItemText}>提现记录</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.walletItem}
              onPress={() => router.push('/bank-cards')}
            >
              <View style={[styles.walletItemIcon, {backgroundColor: '#2196F3'}]}>
                <FontAwesome5 name="credit-card" size={18} color="white" />
              </View>
              <Text style={styles.walletItemText}>银行卡</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* 选项菜单 */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/my-tasks')}>
            <MaterialIcons name="assignment" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>我的任务</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/invite-friends')}>
            <MaterialIcons name="group" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>邀请好友</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/messages')}>
            <MaterialIcons name="mail" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>消息中心</Text>
            <View style={styles.messageBadge}>
              <Text style={styles.messageBadgeText}>2</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>设置</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/help')}>
            <MaterialIcons name="help-outline" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>帮助中心</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        </View>
        
        {/* 退出登录按钮 */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>
        
        {/* 版本信息 */}
        <Text style={styles.versionText}>当前版本: v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loginPromptContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginPromptText: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666',
  },
  loginButtonsContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  loginButton: {
    width: '48%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FF5252',
  },
  registerButtonText: {
    color: '#FF5252',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButtonPrimary: {
    backgroundColor: '#FF5252',
  },
  loginButtonPrimaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfoCard: {
    backgroundColor: 'white',
    margin: 12,
    borderRadius: 10,
    padding: 15,
    elevation: 1,
  },
  userInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  userBasicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF5252',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userNameInfo: {
    flexDirection: 'column',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userLevel: {
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  userLevelText: {
    color: '#FF5252',
    fontSize: 12,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  editProfileText: {
    fontSize: 12,
    color: '#666',
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#EBEBEB',
  },
  walletCard: {
    backgroundColor: 'white',
    margin: 12,
    marginTop: 0,
    borderRadius: 10,
    padding: 15,
    elevation: 1,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  withdrawButton: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  withdrawButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  walletItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  walletItem: {
    alignItems: 'center',
  },
  walletItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  walletItemText: {
    fontSize: 12,
    color: '#666',
  },
  menuCard: {
    backgroundColor: 'white',
    margin: 12,
    marginTop: 0,
    borderRadius: 10,
    padding: 5,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  messageBadge: {
    backgroundColor: '#FF5252',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  messageBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  logoutButton: {
    margin: 12,
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    elevation: 1,
  },
  logoutText: {
    color: '#FF5252',
    fontSize: 16,
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginVertical: 20,
  },
}); 