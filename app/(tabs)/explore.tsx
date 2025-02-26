import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const TASKS = [
  { id: '1', title: '问卷调查: 消费习惯', reward: 3.0, description: '完成一份关于日常消费习惯的调查问卷' },
  { id: '2', title: '应用体验测试', reward: 5.0, description: '下载指定应用并完成测试任务' },
  { id: '3', title: '产品评价任务', reward: 4.0, description: '对指定产品提供详细评价和反馈' },
  { id: '4', title: '短视频拍摄', reward: 8.0, description: '按要求拍摄一段简短的产品使用视频' },
  { id: '5', title: '线上问答任务', reward: 2.0, description: '回答一系列关于指定话题的问题' },
];

export default function TasksScreen() {
  const renderTaskItem = ({ item }) => (
    <Card 
      style={styles.taskCard}
      onPress={() => router.push(`/task/${item.id}`)}
    >
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
        <View style={styles.taskFooter}>
          <Text style={styles.taskReward}>佣金: ¥{item.reward.toFixed(1)}</Text>
          <Button mode="outlined">接单</Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={TASKS}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 10,
  },
  taskCard: {
    marginBottom: 10,
    elevation: 2,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  taskReward: {
    color: '#FF6B00',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
