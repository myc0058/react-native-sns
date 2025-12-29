import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Card, Text, List, useTheme } from 'react-native-paper';
import { MainTabsScreenProps } from '../types/navigation';
import { usePosts } from '../contexts/PostContext';

type Props = MainTabsScreenProps<'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const theme = useTheme();
  const { posts } = usePosts();

  const myPosts = posts.filter(post => post.author.name === '사용자');

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.profileHeader}>
          <Avatar.Text size={80} label="U" />
          <Text variant="headlineSmall" style={styles.name}>
            사용자
          </Text>
          <Text variant="bodyMedium" style={styles.bio}>
            React Native로 만든 SNS 앱
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text variant="headlineMedium">{myPosts.length}</Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                게시물
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="headlineMedium">
                {myPosts.reduce((sum, post) => sum + post.likes, 0)}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                좋아요
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="headlineMedium">
                {myPosts.reduce((sum, post) => sum + post.comments, 0)}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                댓글
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="내 활동" />
        <Card.Content>
          <List.Item
            title="내 게시물"
            description={`${myPosts.length}개의 게시물`}
            left={(props) => <List.Icon {...props} icon="post-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            title="설정"
            description="앱 설정"
            left={(props) => <List.Icon {...props} icon="cog-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  name: {
    marginTop: 12,
  },
  bio: {
    marginTop: 4,
    opacity: 0.6,
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    marginTop: 4,
    opacity: 0.6,
  },
});
