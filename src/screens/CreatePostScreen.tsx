import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Text,
  IconButton,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { RootStackScreenProps } from '../types/navigation';
import { usePosts } from '../contexts/PostContext';
import { Location as LocationType } from '../types/post';

type Props = RootStackScreenProps<'CreatePost'>;

export default function CreatePostScreen({ navigation }: Props) {
  const theme = useTheme();
  const { addPost } = usePosts();
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [location, setLocation] = useState<LocationType | undefined>();
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진을 선택하려면 갤러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImagePickerAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진을 촬영하려면 카메라 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('권한 필요', '위치를 추가하려면 위치 접근 권한이 필요합니다.');
        return;
      }

      // 먼저 실시간 위치 시도 (타임아웃 5초)
      let currentLocation: Location.LocationObject | null = null;
      try {
        const locationPromise = Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('타임아웃')), 2000)
        );
        currentLocation = await Promise.race([locationPromise, timeoutPromise]);
      } catch {
        // 실시간 위치 실패 시 마지막 위치로 fallback
        currentLocation = await Location.getLastKnownPositionAsync({});
      }

      if (!currentLocation) {
        Alert.alert('오류', '위치를 가져올 수 없습니다. 에뮬레이터 설정에서 위치를 설정해주세요.');
        return;
      }

      let address: string | undefined;
      try {
        const geocode = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        address = geocode[0]
          ? `${geocode[0].city || ''} ${geocode[0].district || ''}`
          : undefined;
      } catch {
        // geocode 실패해도 좌표는 사용
      }

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        address,
      });
    } catch (error) {
      Alert.alert('오류', '위치를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert('내용 입력', '게시물 내용을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await addPost({
        content,
        imageUri,
        location,
        author: {
          name: '사용자',
        },
        likes: 0,
        comments: 0,
      });

      Alert.alert('성공', '게시물이 작성되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('오류', '게시물 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            mode="outlined"
            label="무슨 일이 일어나고 있나요?"
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={6}
            style={styles.input}
          />

          {imageUri && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <IconButton
                icon="close-circle"
                size={24}
                style={styles.removeButton}
                onPress={() => setImageUri(undefined)}
              />
            </View>
          )}

          {location && (
            <Card style={styles.locationCard}>
              <Card.Content>
                <View style={styles.locationContent}>
                  <IconButton icon="map-marker" size={20} />
                  <View style={styles.locationTextContainer}>
                    <Text variant="bodyMedium">
                      {location.address || '위치 추가됨'}
                    </Text>
                    <Text variant="bodySmall" style={styles.coordinates}>
                      {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </Text>
                  </View>
                  <IconButton
                    icon="close"
                    size={20}
                    onPress={() => setLocation(undefined)}
                  />
                </View>
              </Card.Content>
            </Card>
          )}

          <View style={styles.actions}>
            <Button icon="image" mode="outlined" onPress={pickImage} style={styles.actionButton}>
              갤러리
            </Button>
            <Button icon="camera" mode="outlined" onPress={takePhoto} style={styles.actionButton}>
              카메라
            </Button>
            <Button
              icon="map-marker"
              mode="outlined"
              onPress={getLocation}
              style={styles.actionButton}
              loading={loading}
              disabled={loading}
            >
              위치
            </Button>
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            disabled={loading}
            loading={loading}
          >
            게시하기
          </Button>
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
  input: {
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  locationCard: {
    marginBottom: 16,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTextContainer: {
    flex: 1,
  },
  coordinates: {
    opacity: 0.6,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  submitButton: {
    marginTop: 8,
  },
});
