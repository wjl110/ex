import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

// 模拟高奖励任务
const HIGH_REWARD_TASKS = [
  {
    id: '201',
    title: '信用卡推广任务',
    reward: 88.00,
    description: '完成信用卡申请并激活',
    requirements: '需要实名认证、有信用记录',
    timeRequired: '1-2天',
    completed: 125,
    total: 200,
    category: '金融',
  },
  {
    id: '202',
    title: '贷款APP注册推广',
    reward: 65.50,
    description: '下载APP并完成注册认证',
    requirements: '年龄22-50岁、有稳定工作',
    timeRequired: '30分钟',
    completed: 210,
    total: 300,
    category: '金融',
  },
  {
    id: '203',
    title: '高端电商社区体验',
    reward: 45.00,
    description: '参与电商平台内测体验',
    requirements: '购物爱好者、需撰写体验报告',
    timeRequired: '2小时',
    completed: 78,
    total: 100,
    category: '电商',
  },
  {
    id: '204',
    title: '短视频拍摄及发布',
    reward: 120.00,
    description: '拍摄产品使用短视频并发布',
    requirements: '拥有500+粉丝的社交媒体账号',
    timeRequired: '1-3天',
    completed: 32,
    total: 50,
    category: '社交媒体',
  },
];

// 限时活动
const LIMITED_TIME_TASKS = [
  {
    id: '301',
    title: '双十一活动推广',
    reward: 50.00,
    endTime: '2023-11-11 23:59:59',
    hoursLeft: 48,
  },
  {
    id: '302',
    title: '618大促推荐任务',
    reward: 35.00,
    endTime: '2023-06-18 23:59:59',
    hoursLeft: 72,
  },
];

export default function TaskRewardsScreen() {
  const renderHighRewardTask = ({ item }) => (
    <TouchableOpacity 
      style={styles.highRewardTaskItem}
      onPress={() => router.push(`/task/${item.id}?type=high-reward`)}
    >
      <View style={styles.highRewardTaskHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.highRewardValue}>¥{item.reward.toFixed(2)}</Text>
      </View>
      
      <Text style={styles.highRewardTaskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
      
      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsTitle}>要求：</Text>
        <Text style={styles.requirementsText}>{item.requirements}</Text>
      </View>
      
      <View style={styles.taskMetaInfo}>
        <Text style={styles.taskMetaText}>预计用时: {item.timeRequired}</Text>
        <Text style={styles.taskMetaText}>剩余名额: {item.total - item.completed}/{item.total}</Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(item.completed / item.total) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{Math.round((item.completed / item.total) * 100)}%</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.acceptButton}
        onPress={() => router.push(`/task/${item.id}?type=high-reward`)}
      >
        <Text style={styles.acceptButtonText}>立即接单</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderLimitedTimeTask = ({ item }) => (
    <TouchableOpacity 
      style={styles.limitedTimeTaskItem}
      onPress={() => router.push(`/task/${item.id}?type=limited-time`)}
    >
      <View style={styles.limitedTimeContent}>
        <Text style={styles.limitedTimeTitle}>{item.title}</Text>
        <Text style={styles.limitedTimeReward}>¥{item.reward.toFixed(2)}</Text>
      </View>
      <View style={styles.countdownContainer}>
        <Ionicons name="time-outline" size={16} color="#FF5252" style={styles.clockIcon} />
        <Text style={styles.countdownText}>剩余 {item.hoursLeft} 小时</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 顶部横幅 */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x150/4CAF50/FFFFFF?text=高额任务专区' }}
            style={styles.banner}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>任务大奖</Text>
            <Text style={styles.bannerSubtitle}>高薪任务，一单抵十单</Text>
          </View>
        </View>
        
        {/* 限时活动任务 */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>限时活动</Text>
            <Text style={styles.sectionSubtitle}>抓紧时间，把握机会</Text>
          </View>
          
          <FlatList
            data={LIMITED_TIME_TASKS}
            renderItem={renderLimitedTimeTask}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.limitedTimeList}
          />
        </View>
        
        {/* 高奖励任务列表 */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>高额任务</Text>
            <Text style={styles.sectionSubtitle}>收益更高，要求也更高</Text>
          </View>
          
          <FlatList
            data={HIGH_REWARD_TASKS}
            renderItem={renderHighRewardTask}
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
    backgroundColor: '#F5F5F5',
  },
  bannerContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  banner: {
    width: '100%',
    height: 150,
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
  sectionContainer: {
    backgroundColor: 'white',
    margin: 12,
    marginTop: 0,
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    elevation: 1,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: '#666',
    fontSize: 14,
    marginTop: 3,
  },
  limitedTimeList: {
    paddingBottom: 10,
  },
  limitedTimeTaskItem: {
    width: 250,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  limitedTimeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  limitedTimeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  limitedTimeReward: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5252',
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: 5,
  },
  countdownText: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
  highRewardTaskItem: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  highRewardTaskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  categoryText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  highRewardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5252',
  },
  highRewardTaskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  requirementsContainer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  requirementsTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  requirementsText: {
    color: '#666',
    fontSize: 14,
  },
  taskMetaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  taskMetaText: {
    color: '#666',
    fontSize: 12,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    color: '#666',
    fontSize: 12,
    width: 35,
    textAlign: 'right',
  },
  acceptButton: {
    backgroundColor: '#FF5252',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 