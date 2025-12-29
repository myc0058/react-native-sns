import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Post } from '../types/post';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'createdAt'>) => Promise<void>;
  loadPosts: () => Promise<void>;
  likePost: (postId: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

const STORAGE_KEY = '@posts';

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        setPosts(parsedPosts.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        })));
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };

  const addPost = async (postData: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const likePost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <PostContext.Provider value={{ posts, addPost, loadPosts, likePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};
