import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';
import { MainTabsScreenProps } from '../types/navigation';
import { usePosts } from '../contexts/PostContext';
import PostCard from '../components/PostCard';

type Props = MainTabsScreenProps<'Feed'>;

export default function FeedScreen({ navigation }: Props) {
  const theme = useTheme();
  const { posts, loadPosts } = usePosts();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="titleMedium" style={styles.emptyText}>
              아직 게시물이 없습니다
            </Text>
            <Text variant="bodyMedium" style={styles.emptySubtext}>
              첫 번째 게시물을 작성해보세요!
            </Text>
          </View>
        }
      />
      <FAB
        testID="fab-create-post"
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('CreatePost')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginBottom: 8,
  },
  emptySubtext: {
    opacity: 0.6,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
