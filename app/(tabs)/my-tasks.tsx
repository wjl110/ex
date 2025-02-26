import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

// 赚钱方式数据
const EARNING_METHODS = [
  {
    id: '1',
    title: '任务悬赏',
    description: '完成简单任务，立即获得佣金',
    icon: 'tasks',
    iconType: 'font-awesome',
    color: '#FF5252',
    route: '/tasks'
  },
  {
    id: '2',
    title: '新人专区',
    description: '新人专享任务，奖励更高',
    icon: 'gift',
    iconType: 'ionicons',
    color: '#4CAF50',
    route: '/new-user'
  },
  {
    id: '3',
    title: '每日签到',
    description: '连续签到，奖励不断',
    icon: 'calendar-check',
    iconType: 'material-community',
    color: '#2196F3',
    route: '/daily-check'
  },
  {
    id: '4',
    title: '幸运抽奖',
    description: '花费少量金币，赢取大奖',
    icon: 'ticket',
    iconType: 'material-community',
    color: '#FF9800',
    route: '/lucky-draw'
  },
  {
    id: '5',
    title: '邀请好友',
    description: '邀请好友注册，双方均可获得奖励',
    icon: 'people',
    iconType: 'ionicons',
    color: '#9C27B0',
    route: '/invite'
  },
  {
    id: '6',
    title: '高额任务',
    description: '专业任务，收益更多',
    icon: 'trending-up',
    iconType: 'ionicons',
    color: '#F44336',
    route: '/premium-tasks'
  },
  {
    id: '7',
    title: '游戏试玩',
    description: '玩游戏也能赚钱',
    icon: 'game-controller',
    iconType: 'ionicons',
    color: '#00BCD4',
    route: '/games'
  },
  {
    id: '8',
    title: '问卷调查',
    description: '完成问卷，领取奖励',
    icon: 'clipboard-list',
    iconType: 'font-awesome',
    color: '#607D8B',
    route: '/surveys'
  },
];

export default function EarnMoreScreen() {
  const renderIcon = (item) => {
    if (item.iconType === 'ionicons') {
      return <Ionicons name={item.icon} size={24} color="white" />;
    } else if (item.iconType === 'font-awesome') {
      return <FontAwesome name={item.icon} size={24} color="white" />;
    } else if (item.iconType === 'material-community') {
      return <MaterialCommunityIcons name={item.icon} size={24} color="white" />;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 顶部推广Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/380x120/FF5252/FFFFFF?text=限时活动：完成任务额外奖励+50%' }}
            style={styles.banner}
            resizeMode="cover"
          />
        </View>
        
        {/* 赚钱方式网格 */}
        <View style={styles.methodsContainer}>
          <Text style={styles.sectionTitle}>赚钱方式</Text>
          <View style={styles.methodsGrid}>
            {EARNING_METHODS.map(item => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.methodItem}
                onPress={() => router.push(item.route)}
              >
                <View style={[styles.methodIcon, { backgroundColor: item.color }]}>
                  {renderIcon(item)}
                </View>
                <Text style={styles.methodTitle}>{item.title}</Text>
                <Text style={styles.methodDescription} numberOfLines={2}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* 排行榜 */}
        <View style={styles.rankingContainer}>
          <View style={styles.rankingHeader}>
            <Text style={styles.sectionTitle}>收益排行榜</Text>
            <TouchableOpacity onPress={() => router.push('/rankings')}>
              <Text style={styles.viewMoreText}>查看更多 <Ionicons name="chevron-forward" size={14} /></Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.rankingList}>
            <View style={styles.rankingItem}>
              <View style={[styles.rankingBadge, styles.rankingBadgeGold]}>
                <Text style={styles.rankingBadgeText}>1</Text>
              </View>
              <View style={styles.rankingUserInfo}>
                <Text style={styles.rankingUsername}>用户138****9571</Text>
                <Text style={styles.rankingUserDetail}>已赚取¥8,562.50</Text>
              </View>
              <View style={styles.crownContainer}>
                <FontAwesome name="crown" size={20} color="#FFD700" />
              </View>
            </View>
            
            <View style={styles.rankingItem}>
              <View style={[styles.rankingBadge, styles.rankingBadgeSilver]}>
                <Text style={styles.rankingBadgeText}>2</Text>
              </View>
              <View style={styles.rankingUserInfo}>
                <Text style={styles.rankingUsername}>用户156****2348</Text>
                <Text style={styles.rankingUserDetail}>已赚取¥7,129.80</Text>
              </View>
            </View>
            
            <View style={styles.rankingItem}>
              <View style={[styles.rankingBadge, styles.rankingBadgeBronze]}>
                <Text style={styles.rankingBadgeText}>3</Text>
              </View>
              <View style={styles.rankingUserInfo}>
                <Text style={styles.rankingUsername}>用户177****6420</Text>
                <Text style={styles.rankingUserDetail}>已赚取¥6,584.25</Text>
              </View>
            </View>
          </View>
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
  scrollContent: {
    padding: 12,
  },
  bannerContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  banner: {
    width: '100%',
    height: 120,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  methodsContainer: {
    marginBottom: 20,
  },
  methodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  methodItem: {
    width: '48%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  methodDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  rankingContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 1,
  },
  rankingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewMoreText: {
    color: '#999',
    fontSize: 14,
  },
  rankingList: {
    marginTop: 5,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rankingBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankingBadgeGold: {
    backgroundColor: '#FFD700',
  },
  rankingBadgeSilver: {
    backgroundColor: '#C0C0C0',
  },
  rankingBadgeBronze: {
    backgroundColor: '#CD7F32',
  },
  rankingBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  rankingUserInfo: {
    flex: 1,
  },
  rankingUsername: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  rankingUserDetail: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  crownContainer: {
    marginLeft: 10,
  },
}); 