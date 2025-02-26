import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

// 模拟任务分类
const CATEGORIES = [
  { id: '1', title: '全部' },
  { id: '2', title: '问卷调查' },
  { id: '3', title: '应用体验' },
  { id: '4', title: '注册认证' },
  { id: '5', title: '实名认证' },
  { id: '6', title: '资料填写' },
  { id: '7', title: '小视频' },
];

// 模拟任务数据
const TASKS = [
  { 
    id: '1', 
    title: '完成简单问卷调查', 
    type: '推', 
    isHot: true, 
    category: '问卷调查',
    description: '10分钟完成', 
    platform: '调研平台',
    reward: 15.88, 
    completed: 893, 
    remaining: 45 
  },
  { 
    id: '2', 
    title: '视频APP测评任务', 
    type: '热', 
    isHot: true, 
    category: '应用体验',
    description: '体验新功能', 
    platform: '某短视频应用',
    reward: 12.50, 
    completed: 456, 
    remaining: 35 
  },
  { 
    id: '3', 
    title: '信用卡申请推广', 
    type: '高', 
    isHot: false, 
    category: '注册认证',
    description: '高佣金', 
    platform: '某银行APP',
    reward: 58.00, 
    completed: 178, 
    remaining: 22 
  },
  { 
    id: '4', 
    title: '新应用内测体验', 
    type: '新', 
    isHot: false, 
    category: '应用体验',
    description: '游戏测试', 
    platform: '游戏开发商',
    reward: 8.66, 
    completed: 342, 
    remaining: 58 
  },
  { 
    id: '5', 
    title: '电商平台评价任务', 
    type: '简', 
    isHot: false, 
    category: '资料填写',
    description: '5分钟完成', 
    platform: '购物平台',
    reward: 5.20, 
    completed: 1024, 
    remaining: 76 
  },
];

export default function ExploreScreen() {
  const [activeCategory, setActiveCategory] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryItem, 
        activeCategory === item.id && styles.activeCategoryItem
      ]}
      onPress={() => setActiveCategory(item.id)}
    >
      <Text 
        style={[
          styles.categoryText, 
          activeCategory === item.id && styles.activeCategoryText
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

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
          <Text style={[
            styles.taskType, 
            { backgroundColor: getTypeColor(item.type) }
          ]}>
            {item.type}
          </Text>
          <Text style={styles.taskReward}>+{item.reward.toFixed(2)}元</Text>
        </View>
      </View>
      
      <View style={styles.taskInfo}>
        <View style={styles.taskCategoryContainer}>
          <Text style={styles.taskCategory}>{item.category}</Text>
        </View>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <Text style={styles.taskPlatform}>{item.platform}</Text>
        <View style={styles.taskStatsContainer}>
          <Text style={styles.taskStats}>{item.completed}人已赚</Text>
          <Text style={styles.taskStats}>剩余:{item.remaining}个</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getTypeColor = (type) => {
    switch(type) {
      case '推': return '#FF5252';
      case '热': return '#FF9800';
      case '高': return '#4CAF50';
      case '新': return '#2196F3';
      case '简': return '#9C27B0';
      default: return '#FF5252';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 搜索栏 */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="搜索任务"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* 分类导航 */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* 任务列表 */}
      <FlatList
        data={TASKS}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        style={styles.tasksList}
        contentContainerStyle={styles.tasksListContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  categoriesContainer: {
    backgroundColor: 'white',
    paddingVertical: 5,
  },
  categoriesList: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
  },
  activeCategoryItem: {
    backgroundColor: '#FFEBEE',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  activeCategoryText: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
  tasksList: {
    flex: 1,
  },
  tasksListContent: {
    padding: 10,
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
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
  taskCategoryContainer: {
    marginBottom: 5,
  },
  taskCategory: {
    fontSize: 12,
    color: '#FF5252',
    backgroundColor: '#FFEBEE',
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
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
