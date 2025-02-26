import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('登出失败', error);
    }
  };

  // 如果未登录，显示登录提示
  if (!user) {
    return (
      <View style={styles.container}>
        <ImageBackground 
          source={{ uri: 'https://via.placeholder.com/400x200/FF5252/FFFFFF' }}
          style={styles.headerBackground}
        >
          <View style={styles.loginPromptContainer}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={50} color="#f0f0f0" />
            </View>
            <View style={styles.loginTextContainer}>
              <Text style={styles.loginPromptText}>登录后享受全部权益</Text>
              <Text style={styles.loginSubText}>赚钱更轻松</Text>
            </View>
          </View>
          
          <View style={styles.headerBadge}>
            <FontAwesome5 name="crown" size={16} color="#FFD700" style={styles.crownIcon} />
            <Text style={styles.headerBadgeText}>赏帮赚</Text>
            <View style={styles.memberTagContainer}>
              <Text style={styles.memberTagText}>年度会员</Text>
            </View>
          </View>
        </ImageBackground>
        
        {/* 余额卡片 */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceValue}>0</Text>
            <Text style={styles.balanceLabel}>任务金额</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>去提现</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.balanceDivider} />
          <View style={styles.balanceItem}>
            <Text style={styles.balanceValue}>0</Text>
            <Text style={styles.balanceLabel}>悬赏金额</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>去查看</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* 功能按钮区 */}
        <View style={styles.functionButtons}>
          <TouchableOpacity style={styles.functionButton} onPress={() => router.push('/login')}>
            <View style={styles.functionIcon}>
              <MaterialIcons name="app-registration" size={22} color="#FF5252" />
            </View>
            <Text style={styles.functionText}>我的报名</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.functionButton} onPress={() => router.push('/login')}>
            <View style={styles.functionIcon}>
              <MaterialIcons name="post-add" size={22} color="#FF5252" />
            </View>
            <Text style={styles.functionText}>发布/管理任务</Text>
          </TouchableOpacity>
        </View>
        
        {/* 登录按钮区 */}
        <View style={styles.loginButtonsContainer}>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginButtonText}>登录</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.loginButton, styles.registerButton]}
            onPress={() => router.push('/register')}
          >
            <Text style={styles.registerButtonText}>注册</Text>
          </TouchableOpacity>
        </View>
        
        {/* 广告横幅 */}
        <Image 
          source={{ uri: 'https://via.placeholder.com/400x80/FFEB3B/FF5252?text=赏帮赚撒红包啦!' }}
          style={styles.adBanner}
          resizeMode="cover"
        />
        
        {/* 菜单列表 */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="heart-outline" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>邀请好友、赢万元大奖</Text>
            <Image 
              source={{ uri: 'https://via.placeholder.com/50x50/FF5252/FFFFFF?text=红包' }}
              style={styles.menuImage}
            />
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <MaterialCommunityIcons name="refresh" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>任务刷新包</Text>
            <Text style={styles.menuCounter}>677次</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="warning-outline" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>举报维权</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>消息中心</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <MaterialCommunityIcons name="chart-line" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>收益统计</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="settings-outline" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>设置中心</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="apps-outline" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>更多模块</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  // 已登录状态的界面
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 用户信息卡片 - 仿照截图风格 */}
        <ImageBackground 
          source={{ uri: 'https://via.placeholder.com/400x200/FF5252/FFFFFF' }}
          style={styles.headerBackground}
        >
          <View style={styles.userInfoHeader}>
            <View style={styles.userBasicInfo}>
              <View style={styles.avatar}>
                {user.avatarUrl ? (
                  <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.avatarText}>{user.username[0].toUpperCase()}</Text>
                )}
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.userId}>ID: {user.id}</Text>
                <View style={styles.trustScoreContainer}>
                  <Text style={styles.trustScoreLabel}>信誉分</Text>
                  <View style={styles.trustScoreBar}>
                    <View style={[styles.trustScoreFill, { width: '20%' }]} />
                  </View>
                  <Text style={styles.trustScoreValue}>10474/50000</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.headerBadge}>
            <FontAwesome5 name="crown" size={16} color="#FFD700" style={styles.crownIcon} />
            <Text style={styles.headerBadgeText}>赏帮赚</Text>
            <View style={styles.memberTagContainer}>
              <Text style={styles.memberTagText}>年度会员</Text>
            </View>
          </View>
        </ImageBackground>
        
        {/* 余额卡片 */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceValue}>{user.taskBalance || 0}</Text>
            <Text style={styles.balanceLabel}>任务金额</Text>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/withdraw')}
            >
              <Text style={styles.actionButtonText}>去提现</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.balanceDivider} />
          <View style={styles.balanceItem}>
            <Text style={styles.balanceValue}>{user.rewardBalance || 0}</Text>
            <Text style={styles.balanceLabel}>悬赏金额</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>去查看</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* 功能按钮区 */}
        <View style={styles.functionButtons}>
          <TouchableOpacity style={styles.functionButton}>
            <View style={styles.functionIcon}>
              <MaterialIcons name="app-registration" size={22} color="#FF5252" />
            </View>
            <Text style={styles.functionText}>我的报名</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.functionButton}>
            <View style={styles.functionIcon}>
              <MaterialIcons name="post-add" size={22} color="#FF5252" />
            </View>
            <Text style={styles.functionText}>发布/管理任务</Text>
          </TouchableOpacity>
        </View>
        
        {/* 广告横幅 */}
        <Image 
          source={{ uri: 'https://via.placeholder.com/400x80/FFEB3B/FF5252?text=赏帮赚撒红包啦!' }}
          style={styles.adBanner}
          resizeMode="cover"
        />
        
        {/* 菜单列表 */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="heart-outline" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>邀请好友、赢万元大奖</Text>
            <Image 
              source={{ uri: 'https://via.placeholder.com/50x50/FF5252/FFFFFF?text=红包' }}
              style={styles.menuImage}
            />
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <MaterialCommunityIcons name="refresh" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>任务刷新包</Text>
            <Text style={styles.menuCounter}>677次</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="warning-outline" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>举报维权</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>消息中心</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <MaterialCommunityIcons name="chart-line" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>收益统计</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="settings-outline" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>设置中心</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="apps-outline" size={20} color="#FF5252" />
            </View>
            <Text style={styles.menuText}>更多模块</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerBackground: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loginPromptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  loginTextContainer: {
    flex: 1,
  },
  loginPromptText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  loginSubText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
    opacity: 0.9,
  },
  headerBadge: {
    position: 'absolute',
    left: 20,
    bottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 89, 152, 0.8)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  crownIcon: {
    marginRight: 5,
  },
  headerBadgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  memberTagContainer: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 10,
  },
  memberTagText: {
    color: '#8B4513',
    fontSize: 12,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: 'white',
    marginTop: -20,
    marginHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  balanceDivider: {
    width: 1,
    backgroundColor: '#EEEEEE',
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF5252',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  actionButton: {
    backgroundColor: '#FFF3F3',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  actionButtonText: {
    color: '#FF5252',
    fontSize: 12,
  },
  functionButtons: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 10,
    padding: 5,
    elevation: 1,
  },
  functionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  functionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF3F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  functionText: {
    fontSize: 14,
    color: '#333',
  },
  loginButtonsContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#FF5252',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FF5252',
    marginRight: 0,
    marginLeft: 10,
  },
  registerButtonText: {
    color: '#FF5252',
    fontSize: 16,
    fontWeight: 'bold',
  },
  adBanner: {
    width: '100%',
    height: 80,
    marginBottom: 15,
    borderRadius: 5,
  },
  menuCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  menuCounter: {
    color: '#999',
    fontSize: 14,
    marginRight: 10,
  },
  menuImage: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  userInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userBasicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarText: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  userId: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginVertical: 5,
  },
  trustScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  trustScoreLabel: {
    color: 'white',
    fontSize: 12,
    marginRight: 5,
  },
  trustScoreBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  trustScoreFill: {
    height: '100%',
    backgroundColor: 'white',
  },
  trustScoreValue: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
}); 