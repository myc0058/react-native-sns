import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, Avatar, IconButton, useTheme } from 'react-native-paper';
import { Post } from '../types/post';
import { usePosts } from '../contexts/PostContext';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const theme = useTheme();
  const { likePost } = usePosts();

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={post.author.name}
        subtitle={formatDate(post.createdAt)}
        left={(props) => (
          <Avatar.Text
            {...props}
            label={post.author.name.charAt(0).toUpperCase()}
          />
        )}
      />
      {post.imageUri && (
        <Card.Cover source={{ uri: post.imageUri }} style={styles.image} />
      )}
      <Card.Content style={styles.content}>
        <Text variant="bodyLarge">{post.content}</Text>
        {post.location && (
          <View style={styles.locationContainer}>
            <IconButton icon="map-marker" size={16} />
            <Text variant="bodySmall" style={styles.locationText}>
              {post.location.address ||
                `${post.location.latitude.toFixed(4)}, ${post.location.longitude.toFixed(4)}`}
            </Text>
          </View>
        )}
      </Card.Content>
      <Card.Actions>
        <View style={styles.actions}>
          <View style={styles.actionButton}>
            <IconButton
              icon="heart-outline"
              size={20}
              onPress={() => likePost(post.id)}
            />
            <Text variant="bodyMedium">{post.likes}</Text>
          </View>
          <View style={styles.actionButton}>
            <IconButton icon="comment-outline" size={20} />
            <Text variant="bodyMedium">{post.comments}</Text>
          </View>
          <IconButton icon="share-variant-outline" size={20} />
        </View>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  image: {
    height: 300,
  },
  content: {
    marginTop: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: -8,
  },
  locationText: {
    opacity: 0.6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
});
