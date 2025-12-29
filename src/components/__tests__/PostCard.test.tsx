import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import PostCard from '../PostCard';
import { Post } from '../../types/post';
import { PostProvider } from '../../contexts/PostContext';

const mockPost: Post = {
  id: '1',
  content: '테스트 게시물입니다',
  imageUri: 'https://example.com/image.jpg',
  location: {
    latitude: 37.5665,
    longitude: 126.978,
    address: '서울시 강남구',
  },
  createdAt: new Date(),
  author: {
    name: '테스트 사용자',
  },
  likes: 5,
  comments: 3,
};

describe('PostCard', () => {
  it('renders post content correctly', () => {
    const { getByText } = render(
      <PaperProvider>
        <PostProvider>
          <PostCard post={mockPost} />
        </PostProvider>
      </PaperProvider>
    );

    expect(getByText('테스트 게시물입니다')).toBeTruthy();
    expect(getByText('테스트 사용자')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('displays location when available', () => {
    const { getByText } = render(
      <PaperProvider>
        <PostProvider>
          <PostCard post={mockPost} />
        </PostProvider>
      </PaperProvider>
    );

    expect(getByText('서울시 강남구')).toBeTruthy();
  });

  it('handles post without image', () => {
    const postWithoutImage = { ...mockPost, imageUri: undefined };
    const { queryByRole } = render(
      <PaperProvider>
        <PostProvider>
          <PostCard post={postWithoutImage} />
        </PostProvider>
      </PaperProvider>
    );

    expect(queryByRole('image')).toBeFalsy();
  });
});
