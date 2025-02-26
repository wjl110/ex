import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../src/context/AuthContext';

export default function DailyRewardsScreen() {
  const { user } = useAuth();
  const [currentDay, setCurrentDay] = useState(3); // 模拟当前签到天数
  
  // 签到奖励数据
  const checkInRewards = [
    { day: 1, reward: 0.5, status: 'completed' },
    { day: 2, reward: 0.8, status: 'completed' },
    { day: 3, reward: 1.0, status: 'current' },
    { day: 4, reward: 1.5, status: 'future' },
    { day: 5, reward: 2.0, status: 'future' },
    { day: 6, reward: 3.0, status: 'future' },
    { day: 7, reward: 8.8, status: 'future' },
  ];
  
  // 模拟今日任务
  const dailyTasks = [
    {
      id: '1',
      title: '每日签到',
      reward: 0.5,
      description: '连续签到奖励更多',
      completed: true,
      icon: 'calendar-check',
    },
    {
      id: '2',
      title: '浏览5分钟',
      reward: 0.3,
      description: '浏览任务页面累计5分钟',
      completed: true,
      progress: 100,
      icon: 'clock',
    },
    {
      id: '3',
      title: '完成1个任务',
      reward: 0.5,
      description: '今日完成任意1个任务',
      completed: false,
      progress: 0,
      total: 1,
      icon: 'clipboard-list',
    },
    {
      id: '4',
      title: '分享给好友',
      reward: 0.2,
      description: '将平台分享给好友',
      completed: false,
      icon: 'share',
    },
  ];
  
  // 模拟限时红包
  const timeLimitedRewards = [
    {
      id: '101',
      title: '限时红包',
      amount: '0.3-8.8',
      endTime: '12:00',
      remaining: 45,
      backgroundColor: '#FF5252',
    },
    {
      id: '102',
      title: '午间红包',
      amount: '0.5-10.0',
      endTime: '14:00',
      remaining: 120,
      backgroundColor: '#FF9800',
    },
    {
      id: '103',
      title: '晚间红包',
      amount: '0.8-18.8',
      endTime: '22:00',
      remaining: 240,
      backgroundColor: '#4CAF50',
    },
  ];
  
  const handleCheckIn = () => {
    // 这里处理签到逻辑
    alert('签到成功！获得1.0元奖励');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 签到卡片 */}
        <View style={styles.checkInCard}>
          <View style={styles.checkInHeader}>
            <Text style={styles.checkInTitle}>每日签到</Text>
            <Text style={styles.checkInSubtitle}>连续签到7天，最高奖励8.8元</Text>
          </View>
          
          <View style={styles.checkInDaysContainer}>
            {checkInRewards.map(item => (
              <View 
                key={item.day} 
                style={[
                  styles.checkInDay,
                  item.status === 'completed' && styles.completedDay,
                  item.status === 'current' && styles.currentDay,
                ]}
              >
                <Text 
                  style={[
                    styles.dayNumber,
                    (item.status === 'completed' || item.status === 'current') && styles.activeText
                  ]}
                >
                  {item.day}
                </Text>
                <Text 
                  style={[
                    styles.dayReward,
                    (item.status === 'completed' || item.status === 'current') && styles.activeText
                  ]}
                >
                  ¥{item.reward.toFixed(1)}
                </Text>
                {item.status === 'completed' && (
                  <View style={styles.completedMark}>
                    <Ionicons name="checkmark" size={12} color="white" />
                  </View>
                )}
              </View>
            ))}
          </View>
          
          <TouchableOpacity 
            style={[
              styles.checkInButton,
              currentDay > 2 && styles.checkInButtonDisabled
            ]}
            onPress={handleCheckIn}
            disabled={currentDay > 2}
          >
            <Text style={styles.checkInButtonText}>
              {currentDay > 2 ? '今日已签到' : '立即签到'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* 今日任务 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>今日任务</Text>
          <Text style={styles.sectionSubtitle}>完成任务获取额外奖励</Text>
          
          {dailyTasks.map(task => (
            <View key={task.id} style={styles.taskItem}>
              <View style={[styles.taskIconContainer, task.completed ? styles.completedIcon : {}]}>
                <FontAwesome5 name={task.icon} size={16} color={task.completed ? 'white' : '#FF5252'} />
              </View>
              
              <View style={styles.taskContent}>
                <View style={styles.taskHeader}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskReward}>+{task.reward.toFixed(1)}元</Text>
                </View>
                
                <Text style={styles.taskDescription}>{task.description}</Text>
                
                {task.progress !== undefined && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${task.progress}%` }
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {task.progress}%
                    </Text>
                  </View>
                )}
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.taskAction,
                  task.completed && styles.completedAction
                ]}
                disabled={task.completed}
              >
                <Text style={styles.taskActionText}>
                  {task.completed ? '已完成' : '去完成'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        {/* 限时红包 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>限时红包</Text>
          <Text style={styles.sectionSubtitle}>抢越多得越多，先到先得</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.redPacketsContainer}
          >
            {timeLimitedRewards.map(reward => (
              <TouchableOpacity 
                key={reward.id} 
                style={[
                  styles.redPacket,
                  { backgroundColor: reward.backgroundColor }
                ]}
              >
                <MaterialCommunityIcons name="wallet-giftcard" size={24} color="white" />
                <Text style={styles.redPacketTitle}>{reward.title}</Text>
                <Text style={styles.redPacketAmount}>{reward.amount}元</Text>
                <View style={styles.redPacketFooter}>
                  <Text style={styles.redPacketTime}>{reward.endTime}截止</Text>
                  <Text style={styles.redPacketRemaining}>剩{reward.remaining}个</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* 福利攻略 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>福利攻略</Text>
          <Text style={styles.sectionSubtitle}>了解更多赚钱技巧</Text>
          
          <TouchableOpacity style={styles.guideItem}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/100x70/4CAF50/FFFFFF?text=攻略' }}
              style={styles.guideImage}
            />
            <View style={styles.guideContent}>
              <Text style={styles.guideTitle}>新手如何快速赚到第一桶金</Text>
              <Text style={styles.guideDescription}>从零开始，教你一天稳赚20元</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.guideItem}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/100x70/FF9800/FFFFFF?text=攻略' }}
              style={styles.guideImage}
            />
            <View style={styles.guideContent}>
              <Text style={styles.guideTitle}>如何高效完成高价值任务</Text>
              <Text style={styles.guideDescription}>3个技巧让你的收益翻倍</Text>
            </View>
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
  checkInCard: {
    backgroundColor: 'white',
    margin: 12,
    borderRadius: 10,
    padding: 15,
    elevation: 1,
  },
  checkInHeader: {
    marginBottom: 15,
  },
  checkInTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  checkInSubtitle: {
    color: '#666',
    fontSize: 14,
  },
  checkInDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkInDay: {
    width: 40,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  completedDay: {
    backgroundColor: '#FFEBEE',
    borderColor: '#FF5252',
  },
  currentDay: {
    backgroundColor: '#FF5252',
    borderColor: '#FF5252',
  },
  dayNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  dayReward: {
    fontSize: 12,
    color: '#999',
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  completedMark: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#4CAF50',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkInButton: {
    backgroundColor: '#FF5252',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  checkInButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  checkInButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
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
    marginBottom: 5,
  },
  sectionSubtitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 15,
  },
  taskItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 12,
    alignItems: 'center',
  },
  taskIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  completedIcon: {
    backgroundColor: '#4CAF50',
  },
  taskContent: {
    flex: 1,
    marginRight: 10,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  taskReward: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
  taskDescription: {
    color: '#999',
    fontSize: 12,
    marginBottom: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF9800',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#999',
    width: 30,
  },
  taskAction: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  completedAction: {
    backgroundColor: '#4CAF50',
  },
  taskActionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  redPacketsContainer: {
    paddingVertical: 5,
    paddingBottom: 10,
  },
  redPacket: {
    width: 120,
    height: 140,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    marginRight: 12,
    padding: 12,
    justifyContent: 'space-between',
  },
  redPacketTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  redPacketAmount: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  redPacketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  redPacketTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
  },
  redPacketRemaining: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
  },
  guideItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  guideImage: {
    width: 100,
    height: 70,
  },
  guideContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  guideTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  guideDescription: {
    color: '#666',
    fontSize: 12,
  },
});
