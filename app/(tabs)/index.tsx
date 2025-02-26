import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 头部Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x200' }}
            style={styles.banner}
            resizeMode="cover"
          />
        </View>

        {/* 用户信息卡片 */}
        <Card style={styles.userCard}>
          <Card.Content style={styles.userCardContent}>
            <View>
              <Title>你好，{user?.username || '游客'}</Title>
              <Paragraph>账户余额: ¥{user?.balance || 0}</Paragraph>
            </View>
            <Button 
              mode="contained" 
              onPress={() => router.push('/withdraw')}
              style={styles.withdrawButton}
            >
              提现
            </Button>
          </Card.Content>
        </Card>

        {/* 功能区 */}
        <View style={styles.featuresContainer}>
          <TouchableOpacity 
            style={styles.featureItem}
            onPress={() => router.push('/explore')}
          >
            <View style={[styles.featureIcon, {backgroundColor: '#FFC107'}]}>
              <Text style={styles.featureIconText}>任</Text>
            </View>
            <Text style={styles.featureText}>做任务</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureItem}
            onPress={() => router.push('/publish-task')}
          >
            <View style={[styles.featureIcon, {backgroundColor: '#4CAF50'}]}>
              <Text style={styles.featureIconText}>发</Text>
            </View>
            <Text style={styles.featureText}>发布任务</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.featureItem}
            onPress={() => router.push('/my-tasks')}
          >
            <View style={[styles.featureIcon, {backgroundColor: '#2196F3'}]}>
              <Text style={styles.featureIconText}>我</Text>
            </View>
            <Text style={styles.featureText}>我的任务</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.featureItem}
            onPress={() => {}}
          >
            <View style={[styles.featureIcon, {backgroundColor: '#9C27B0'}]}>
              <Text style={styles.featureIconText}>邀</Text>
            </View>
            <Text style={styles.featureText}>邀请好友</Text>
          </TouchableOpacity>
        </View>
        
        {/* 推荐任务 */}
        <View style={styles.recommendedContainer}>
          <Title style={styles.sectionTitle}>推荐任务</Title>
          
          {[1, 2, 3].map(item => (
            <TouchableOpacity 
              key={item} 
              style={styles.taskCard}
              onPress={() => router.push(`/task/${item}`)}
            >
              <Card.Content>
                <Title>问卷调查任务 #{item}</Title>
                <Paragraph>完成一个简单的市场调查问卷，获取佣金</Paragraph>
                <View style={styles.taskFooter}>
                  <Text style={styles.taskReward}>佣金: ¥3.0</Text>
                  <Button mode="outlined">查看详情</Button>
                </View>
              </Card.Content>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* 新手指南 */}
        <Card style={styles.guideCard}>
          <Card.Content>
            <Title>新手指南</Title>
            <Paragraph>1. 注册即送1元，完成新手任务送9元</Paragraph>
            <Paragraph>2. 每天完成任务即可提现，随时到账</Paragraph>
            <Paragraph>3. 平均每个任务赚3元，多做多赚</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bannerContainer: {
    height: 150,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  userCard: {
    margin: 10,
    marginTop: -20,
    elevation: 3,
    borderRadius: 10,
  },
  userCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  withdrawButton: {
    backgroundColor: '#FF6B00',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  featureItem: {
    width: '48%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIconText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 16,
  },
  recommendedContainer: {
    padding: 10,
  },
  sectionTitle: {
    marginVertical: 10,
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
  guideCard: {
    margin: 10,
    marginBottom: 20,
    elevation: 2,
  },
});
