import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useAuth } from '../src/context/AuthContext';

// 模拟新手任务数据
const NEW_USER_TASKS = [
  {
    id: '1',
    title: '完成账号实名认证',
    description: '提高账号安全等级，解锁更多高额任务',
    reward: 2.0,
    status: 'incomplete', // 'incomplete', 'completed', 'locked'
    icon: 'id-card',
  },
  {
    id: '2',
    title: '完成首次任务',
    description: '接受并完成第一个任务，熟悉平台操作流程',
    reward: 3.0,
    status: 'incomplete',
    icon: 'tasks',
  },
  {
    id: '3',
    title: '绑定微信账号',
    description: '绑定微信账号，获得额外福利',
    reward: 1.5,
    status: 'incomplete',
    icon: 'comment',
  },
  {
    id: '4',
    title: '邀请一位好友注册',
    description: '成功邀请好友注册并完成实名认证',
    reward: 5.0,
    status: 'locked',
    icon: 'user-friends',
  },
  {
    id: '5',
    title: '累计赚取10元',
    description: '在平台上累计赚取10元奖励',
    reward: 3.0,
    status: 'locked',
    icon: 'coins',
  },
];

// 模拟新手专享任务
const EXCLUSIVE_TASKS = [
  {
    id: '101',
    title: '新人专享：简单APP下载',
    reward: 8.88,
    difficulty: '简单',
    timeRequired: '5分钟',
    completed: 341,
    remaining: 59,
  },
  {
    id: '102',
    title: '新手任务：问卷调查',
    reward: 5.20,
    difficulty: '简单',
    timeRequired: '3分钟',
    completed: 421,
    remaining: 79,
  },
  {
    id: '103',
    title: '首单专享：电商评价',
    reward: 10.00,
    difficulty: '中等',
    timeRequired: '10分钟',
    completed: 215,
    remaining: 35,
  },
];

export default function NewUserScreen() {
  const { user } = useAuth();
  
  const renderNewUserTask = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.taskItem,
        item.status === 'locked' && styles.lockedTask,
      ]}
      onPress={() => {
        if (item.status !== 'locked') {
          router.push(`/task/${item.id}?type=new-user`);
        }
      }}
    >
      <View style={styles.taskIconContainer}>
        <FontAwesome5 name={item.icon} size={20} color={item.status === 'locked' ? '#999' : '#FF5252'} />
      </View>
      <View style={styles.taskContent}>
        <View style={styles.taskHeader}>
          <Text style={[
            styles.taskTitle,
            item.status === 'locked' && styles.lockedText
          ]}>
            {item.title}
          </Text>
          {item.status === 'completed' && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>已完成</Text>
            </View>
          )}
          {item.status === 'locked' && (
            <View style={styles.lockedBadge}>
              <Text style={styles.lockedBadgeText}>未解锁</Text>
            </View>
          )}
        </View>
        <Text style={[
          styles.taskDescription,
          item.status === 'locked' && styles.lockedText
        ]}>
          {item.description}
        </Text>
        <View style={styles.taskFooter}>
          <Text style={[
            styles.rewardText,
            item.status === 'locked' && styles.lockedText
          ]}>
            奖励: <Text style={styles.rewardValue}>¥{item.reward.toFixed(1)}</Text>
          </Text>
          {item.status === 'incomplete' && (
            <TouchableOpacity
              style={styles.goButton}
              onPress={() => router.push(`/task/${item.id}?type=new-user`)}
            >
              <Text style={styles.goButtonText}>去完成</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderExclusiveTask = ({ item }) => (
    <TouchableOpacity 
      style={styles.exclusiveTaskItem}
      onPress={() => router.push(`/task/${item.id}?type=exclusive`)}
    >
      <View style={styles.exclusiveTaskTop}>
        <Text style={styles.exclusiveTaskTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.exclusiveTaskReward}>+{item.reward.toFixed(2)}元</Text>
      </View>
      <View style={styles.taskDetailRow}>
        <Text style={styles.taskDetailText}>难度: {item.difficulty}</Text>
        <Text style={styles.taskDetailText}>预计耗时: {item.timeRequired}</Text>
      </View>
      <View style={styles.taskProgressContainer}>
        <View style={styles.taskProgressBar}>
          <View 
            style={[
              styles.taskProgressFill,
              { width: `${(item.completed / (item.completed + item.remaining)) * 100}%` }
            ]}
          />
        </View>
        <Text style={styles.taskProgressText}>
          已有{item.completed}人完成 · 剩余{item.remaining}个名额
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 顶部横幅 */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x180/FF5252/FFFFFF?text=新人福利专区' }}
            style={styles.banner}
            resizeMode="cover"
          />
          <View style={styles.welcomeOverlay}>
            <Text style={styles.welcomeText}>
              {user ? `${user.username}，欢迎加入！` : '欢迎加入！'}
            </Text>
            <Text style={styles.welcomeSubtext}>
              完成新手任务可获得 <Text style={styles.highlightText}>¥14.5</Text> 奖励
            </Text>
          </View>
        </View>

        {/* 新手任务进度 */}
        <View style={styles.progressContainer}>
          <Text style={styles.sectionTitle}>新手任务 (0/5)</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '0%' }]} />
          </View>
        </View>

        {/* 新手任务列表 */}
        <View style={styles.tasksContainer}>
          <FlatList
            data={NEW_USER_TASKS}
            renderItem={renderNewUserTask}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* 新手专享任务 */}
        <View style={styles.exclusiveTasksContainer}>
          <Text style={styles.sectionTitle}>新手专享任务</Text>
          <Text style={styles.sectionSubtitle}>仅限新用户接单，轻松赚取高额奖励</Text>
          
          <FlatList
            data={EXCLUSIVE_TASKS}
            renderItem={renderExclusiveTask}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            style={styles.exclusiveTasksList}
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
    height: 180,
  },
  welcomeOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  welcomeText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  welcomeSubtext: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  highlightText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  progressContainer: {
    padding: 15,
    backgroundColor: 'white',
    marginHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF5252',
    borderRadius: 4,
  },
  tasksContainer: {
    backgroundColor: 'white',
    marginHorizontal: 12,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 1,
  },
  taskItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lockedTask: {
    opacity: 0.7,
  },
  taskIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  taskContent: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  completedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  completedText: {
    color: 'white',
    fontSize: 12,
  },
  lockedBadge: {
    backgroundColor: '#9E9E9E',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  lockedBadgeText: {
    color: 'white',
    fontSize: 12,
  },
  lockedText: {
    color: '#9E9E9E',
  },
  taskDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardText: {
    color: '#666',
  },
  rewardValue: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
  goButton: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },
  goButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  exclusiveTasksContainer: {
    padding: 15,
    backgroundColor: 'white',
    marginHorizontal: 12,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 1,
  },
  sectionSubtitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 15,
  },
  exclusiveTasksList: {
    marginTop: 10,
  },
  exclusiveTaskItem: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  exclusiveTaskTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exclusiveTaskTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  exclusiveTaskReward: {
    color: '#FF5252',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskDetailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  taskDetailText: {
    color: '#666',
    fontSize: 12,
    marginRight: 15,
  },
  taskProgressContainer: {
    marginTop: 5,
  },
  taskProgressBar: {
    height: 4,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 5,
  },
  taskProgressFill: {
    height: '100%',
    backgroundColor: '#FF9800',
    borderRadius: 2,
  },
  taskProgressText: {
    color: '#999',
    fontSize: 12,
  },
}); 