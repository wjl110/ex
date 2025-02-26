import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, Button, Title, Paragraph, Badge, Avatar } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

// 模拟任务数据
const TASKS = [
  { 
    id: '1', 
    title: '热门🔥超快新单', 
    type: '顶', 
    isHot: true, 
    description: '电商相关', 
    platform: '快手-移动端',
    reward: 23.75, 
    completed: 537, 
    remaining: 38 
  },
  { 
    id: '2', 
    title: '置顶📌农行卡来捡钱', 
    type: '顶', 
    isHot: false, 
    description: '其他任务', 
    platform: '淘宝证券',
    reward: 10.08, 
    completed: 181, 
    remaining: 64 
  },
  { 
    id: '3', 
    title: '全程自动听书秒审🔥', 
    type: '顶', 
    isHot: false, 
    description: '下载体验', 
    platform: '普通畅听',
    reward: 3.21, 
    completed: 2716, 
    remaining: 92 
  },
  { 
    id: '4', 
    title: '新单', 
    type: '顶', 
    isHot: false, 
    description: '账号注册', 
    platform: '华为开发者社区',
    reward: 1.02, 
    completed: 4003, 
    remaining: 102 
  },
  { 
    id: '5', 
    title: '纯白嫘！够简单🔥', 
    type: '顶', 
    isHot: false, 
    description: '其他任务', 
    platform: '花鸭借钱',
    reward: 3.7, 
    completed: 1787, 
    remaining: 104 
  },
  { 
    id: '6', 
    title: '简单注册✨纯实名', 
    type: '顶', 
    isHot: false, 
    description: '其他任务', 
    platform: '广东农业银行',
    reward: 8.27, 
    completed: 810, 
    remaining: 77 
  },
];

// 功能按钮数据
const FEATURES = [
  { id: '1', title: '新人福利', icon: 'gift', color: '#FFC107', route: '/new-user' },
  { id: '2', title: '任务大奖', icon: 'list-alt', color: '#4C6EF5', route: '/tasks' },
  { id: '3', title: '推广奖励', icon: 'megaphone', color: '#FA5252', route: '/promotion', badge: 2 },
  { id: '4', title: '每日福利', icon: 'calendar', color: '#E64980', route: '/daily' },
];

export default function HomeScreen() {
  const { user } = useAuth();

  // 渲染功能按钮
  const renderFeatureItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.featureItem}
      onPress={() => router.push(item.route)}
    >
      <View style={[styles.featureIcon, {backgroundColor: item.color}]}>
        <Ionicons name={item.icon} size={24} color="white" />
        {item.badge && (
          <Badge style={styles.badge}>{item.badge}</Badge>
        )}
      </View>
      <Text style={styles.featureText}>{item.title}</Text>
    </TouchableOpacity>
  );

  // 渲染任务项
  const renderTaskItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.taskItem}
      onPress={() => router.push(`/task/${item.id}`)}
    >
      <View style={styles.taskHeader}>
        <View style={styles.taskTitleContainer}>
          {item.isHot && (
            <View style={styles.hotTag}>
              <Text style={styles.hotTagText}>热门</Text>
            </View>
          )}
          <Text style={styles.taskTitle} numberOfLines={1}>{item.title}</Text>
        </View>
        <View style={styles.taskTypeContainer}>
          <Text style={styles.taskType}>{item.type}</Text>
          <Text style={styles.taskReward}>+{item.reward.toFixed(2)}元</Text>
        </View>
      </View>
      
      <View style={styles.taskInfo}>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <Text style={styles.taskPlatform}>{item.platform}</Text>
        <View style={styles.taskStatsContainer}>
          <Text style={styles.taskStats}>{item.completed}人已赚</Text>
          <Text style={styles.taskStats}>剩余:{item.remaining}个</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 红色活动横幅 */}
        <View style={styles.banner}>
          <View style={styles.bannerTop}>
            <Text style={styles.bannerTitle}>巨额奖励</Text>
            <Text style={styles.bannerSubtitle}>
              红包单个最高9.9元{'\n'}
              任务份数不断增加{'\n'}
              新人拿福利奖励
            </Text>
          </View>
          
          <View style={styles.bannerMiddle}>
            <Text style={styles.dailyTitle}>日额奖励</Text>
            <View style={styles.prizeContainer}>
              <Text style={styles.prizeAmount}>42856元</Text>
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>9月推广排行榜前</Text>
                <View style={styles.rankNumberContainer}>
                  <Text style={styles.rankNumber}>1222</Text>
                </View>
                <Text style={styles.rankText}>名</Text>
              </View>
            </View>
            <Text style={styles.grandPrize}>245858元大奖</Text>
          </View>
          
          <View style={styles.bannerBottom}>
            <Text style={styles.bannerBottomText}>更多赚钱详情</Text>
            <Text style={styles.bannerBottomText}>邀请好友享收益</Text>
          </View>
        </View>

        {/* 功能按钮区 */}
        <View style={styles.featuresContainer}>
          <FlatList
            data={FEATURES}
            renderItem={renderFeatureItem}
            keyExtractor={item => item.id}
            horizontal={false}
            numColumns={4}
            scrollEnabled={false}
          />
          <View style={styles.announcementContainer}>
            <Ionicons name="volume-high" size={18} color="#FF5252" style={styles.announcementIcon} />
            <Text style={styles.announcementText} numberOfLines={1}>
              【重要声明】以赏帮赚名义收钱推荐赏帮赚平台的均为诈骗...
            </Text>
          </View>
        </View>

        {/* 任务列表标签页 */}
        <View style={styles.tabContainer}>
          <View style={styles.activeTab}>
            <Ionicons name="star" size={18} color="#FF5252" />
            <Text style={styles.activeTabText}>推荐悬赏</Text>
            <View style={styles.activeIndicator} />
          </View>
          <View style={styles.inactiveTab}>
            <Ionicons name="flash" size={18} color="#333" />
            <Text style={styles.inactiveTabText}>极速快审</Text>
          </View>
        </View>

        {/* 任务列表 */}
        <View style={styles.tasksContainer}>
          <FlatList
            data={TASKS}
            renderItem={renderTaskItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  banner: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 12,
    textAlign: 'right',
    lineHeight: 18,
  },
  bannerMiddle: {
    marginTop: 10,
    alignItems: 'center',
  },
  dailyTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  prizeContainer: {
    marginVertical: 10,
  },
  prizeAmount: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rankContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  rankText: {
    color: 'white',
    fontSize: 14,
  },
  rankNumberContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  rankNumber: {
    color: 'white',
    fontWeight: 'bold',
  },
  grandPrize: {
    color: '#FFEB3B',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  bannerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  bannerBottomText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
  },
  featuresContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 15,
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 5,
  },
  featureIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF5252',
  },
  featureText: {
    fontSize: 12,
  },
  announcementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFF9F9',
    borderRadius: 5,
  },
  announcementIcon: {
    marginRight: 10,
  },
  announcementText: {
    color: '#666',
    fontSize: 13,
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  activeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: 'relative',
  },
  activeTabText: {
    color: '#FF5252',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    right: 15,
    height: 3,
    backgroundColor: '#FF5252',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  inactiveTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  inactiveTabText: {
    color: '#333',
    marginLeft: 5,
  },
  tasksContainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 10,
  },
  taskItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEEEEE',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  hotTag: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 5,
  },
  hotTagText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  taskTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskType: {
    color: 'white',
    backgroundColor: '#FF5252',
    fontSize: 12,
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: 20,
    borderRadius: 3,
    marginRight: 5,
  },
  taskReward: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
  taskInfo: {
    marginTop: 8,
  },
  taskDescription: {
    color: '#999',
    fontSize: 12,
    marginBottom: 3,
  },
  taskPlatform: {
    color: '#999',
    fontSize: 12,
    marginBottom: 5,
  },
  taskStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskStats: {
    color: '#999',
    fontSize: 12,
  },
});
