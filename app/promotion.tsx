import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../src/context/AuthContext';

export default function PromotionScreen() {
  const { user } = useAuth();
  const referralCode = user ? 'REF' + user.id.padStart(6, '0') : 'REF000001';
  
  // 模拟推广数据
  const promotionStats = {
    totalInvited: 8,
    successfulInvites: 5,
    pendingInvites: 3,
    totalEarned: 25.0,
  };
  
  // 模拟待激活用户
  const pendingUsers = [
    { id: '1', username: '用户152****7890', registerDate: '2023-10-25', status: 'pending' },
    { id: '2', username: '用户177****4321', registerDate: '2023-10-24', status: 'pending' },
    { id: '3', username: '用户138****5678', registerDate: '2023-10-22', status: 'pending' },
  ];
  
  // 模拟已激活用户
  const activeUsers = [
    { id: '4', username: '用户135****9876', registerDate: '2023-10-20', status: 'active', reward: 5.0 },
    { id: '5', username: '用户159****6543', registerDate: '2023-10-15', status: 'active', reward: 5.0 },
    { id: '6', username: '用户188****2109', registerDate: '2023-10-10', status: 'active', reward: 5.0 },
    { id: '7', username: '用户133****7654', registerDate: '2023-10-05', status: 'active', reward: 5.0 },
    { id: '8', username: '用户156****3210', registerDate: '2023-10-01', status: 'active', reward: 5.0 },
  ];
  
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `我正在使用这个超棒的赚钱APP，注册就送10元！使用我的邀请码 ${referralCode} 获得额外奖励！下载链接: https://example.com/download`,
      });
    } catch (error) {
      console.error('分享失败:', error);
    }
  };
  
  const handleCopyCode = () => {
    // 这里需要实现复制到剪贴板的功能
    alert('邀请码已复制到剪贴板');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 顶部横幅 */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x180/FF9800/FFFFFF?text=推广赚钱' }}
            style={styles.banner}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>邀请好友</Text>
            <Text style={styles.bannerSubtitle}>每邀请1位好友注册并实名认证</Text>
            <Text style={styles.bannerReward}>双方各得 <Text style={styles.rewardHighlight}>¥5.0</Text></Text>
          </View>
        </View>
        
        {/* 邀请码区域 */}
        <View style={styles.referralCodeContainer}>
          <Text style={styles.referralCodeTitle}>我的邀请码</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.referralCode}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
              <Text style={styles.copyButtonText}>复制</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.referralHint}>好友注册时填写此邀请码，双方均可获得奖励</Text>
        </View>
        
        {/* 分享按钮 */}
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-social" size={18} color="white" />
          <Text style={styles.shareButtonText}>立即分享给好友</Text>
        </TouchableOpacity>
        
        {/* 推广数据卡片 */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{promotionStats.totalInvited}</Text>
            <Text style={styles.statLabel}>总邀请人数</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{promotionStats.successfulInvites}</Text>
            <Text style={styles.statLabel}>成功邀请</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>¥{promotionStats.totalEarned.toFixed(1)}</Text>
            <Text style={styles.statLabel}>累计奖励</Text>
          </View>
        </View>
        
        {/* 推广规则 */}
        <View style={styles.rulesContainer}>
          <Text style={styles.sectionTitle}>推广规则</Text>
          <View style={styles.ruleItem}>
            <View style={styles.ruleNumber}>
              <Text style={styles.ruleNumberText}>1</Text>
            </View>
            <Text style={styles.ruleText}>分享邀请码给好友</Text>
          </View>
          <View style={styles.ruleArrow}>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </View>
          <View style={styles.ruleItem}>
            <View style={styles.ruleNumber}>
              <Text style={styles.ruleNumberText}>2</Text>
            </View>
            <Text style={styles.ruleText}>好友注册时填写您的邀请码</Text>
          </View>
          <View style={styles.ruleArrow}>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </View>
          <View style={styles.ruleItem}>
            <View style={styles.ruleNumber}>
              <Text style={styles.ruleNumberText}>3</Text>
            </View>
            <Text style={styles.ruleText}>好友完成实名认证</Text>
          </View>
          <View style={styles.ruleArrow}>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </View>
          <View style={styles.ruleItem}>
            <View style={[styles.ruleNumber, styles.ruleNumberLast]}>
              <Text style={styles.ruleNumberText}>4</Text>
            </View>
            <Text style={styles.ruleText}>双方各获得5元奖励</Text>
          </View>
        </View>
        
        {/* 邀请记录 */}
        <View style={styles.inviteRecordsContainer}>
          <Text style={styles.sectionTitle}>邀请记录</Text>
          
          {/* 待激活邀请 */}
          {pendingUsers.length > 0 && (
            <View style={styles.recordsSection}>
              <Text style={styles.recordsSectionTitle}>待激活 ({pendingUsers.length})</Text>
              
              {pendingUsers.map(user => (
                <View key={user.id} style={styles.recordItem}>
                  <View style={styles.userInfo}>
                    <Text style={styles.username}>{user.username}</Text>
                    <Text style={styles.registerDate}>注册时间：{user.registerDate}</Text>
                  </View>
                  <View style={styles.pendingBadge}>
                    <Text style={styles.pendingBadgeText}>待激活</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          
          {/* 已激活邀请 */}
          {activeUsers.length > 0 && (
            <View style={styles.recordsSection}>
              <Text style={styles.recordsSectionTitle}>已激活 ({activeUsers.length})</Text>
              
              {activeUsers.map(user => (
                <View key={user.id} style={styles.recordItem}>
                  <View style={styles.userInfo}>
                    <Text style={styles.username}>{user.username}</Text>
                    <Text style={styles.registerDate}>注册时间：{user.registerDate}</Text>
                  </View>
                  <View style={styles.rewardInfo}>
                    <Text style={styles.activeReward}>+¥{user.reward.toFixed(1)}</Text>
                    <View style={styles.activeBadge}>
                      <Text style={styles.activeBadgeText}>已激活</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
          
          {activeUsers.length === 0 && pendingUsers.length === 0 && (
            <View style={styles.noRecords}>
              <Ionicons name="people-outline" size={60} color="#DDD" />
              <Text style={styles.noRecordsText}>暂无邀请记录</Text>
              <Text style={styles.noRecordsHint}>赶快邀请好友一起赚钱吧</Text>
            </View>
          )}
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
  bannerContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  banner: {
    width: '100%',
    height: 180,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bannerReward: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  rewardHighlight: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 20,
  },
  referralCodeContainer: {
    backgroundColor: 'white',
    margin: 12,
    marginTop: 5,
    borderRadius: 10,
    padding: 15,
    elevation: 1,
    alignItems: 'center',
  },
  referralCodeTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  referralCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5252',
    letterSpacing: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#FF5252',
    borderRadius: 5,
  },
  copyButton: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  copyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  referralHint: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: '#FF9800',
    margin: 12,
    marginTop: 5,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  statsContainer: {
    backgroundColor: 'white',
    margin: 12,
    marginTop: 5,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#EEEEEE',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5252',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  rulesContainer: {
    backgroundColor: 'white',
    margin: 12,
    marginTop: 5,
    borderRadius: 10,
    padding: 15,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ruleNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  ruleNumberLast: {
    backgroundColor: '#4CAF50',
  },
  ruleNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
  },
  ruleArrow: {
    paddingLeft: 12,
    paddingVertical: 5,
  },
  inviteRecordsContainer: {
    backgroundColor: 'white',
    margin: 12,
    marginTop: 5,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 1,
  },
  recordsSection: {
    marginBottom: 15,
  },
  recordsSectionTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  registerDate: {
    color: '#999',
    fontSize: 12,
  },
  pendingBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'center',
  },
  pendingBadgeText: {
    color: '#FF9800',
    fontSize: 12,
  },
  rewardInfo: {
    alignItems: 'flex-end',
  },
  activeReward: {
    color: '#FF5252',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  activeBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  activeBadgeText: {
    color: '#4CAF50',
    fontSize: 12,
  },
  noRecords: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  noRecordsText: {
    color: '#666',
    fontSize: 16,
    marginTop: 10,
  },
  noRecordsHint: {
    color: '#999',
    fontSize: 14,
    marginTop: 5,
  },
});