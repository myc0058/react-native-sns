import { by, device, element, expect, waitFor } from 'detox';

describe('App E2E Tests', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the feed screen on launch', async () => {
    // 피드 텍스트가 2개 (헤더, 탭바) 있으므로 첫 번째(헤더) 확인
    await expect(element(by.text('피드')).atIndex(0)).toBeVisible();
  });

  it('should show empty state when no posts', async () => {
    // 게시물이 없을 때 빈 상태 메시지 확인
    await expect(element(by.text('아직 게시물이 없습니다'))).toBeVisible();
  });

  it('should navigate to create post screen via FAB', async () => {
    // FAB 버튼 클릭 - testID로 찾기
    await element(by.id('fab-create-post')).tap();

    // 게시물 작성 화면 헤더 확인
    await expect(element(by.text('게시물 작성'))).toBeVisible();
  });

  it('should navigate to profile screen', async () => {
    // 프로필 탭 클릭
    await element(by.text('프로필')).tap();

    // 프로필 화면에 있는지 확인 (2개의 '프로필' 텍스트 중 첫 번째가 헤더)
    await waitFor(element(by.text('프로필')).atIndex(0))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should navigate back to feed screen', async () => {
    // 프로필 탭으로 이동
    await element(by.text('프로필')).tap();

    // 피드 탭으로 다시 이동
    await element(by.text('피드')).tap();

    // 빈 상태 메시지가 보이는지 확인
    await waitFor(element(by.text('아직 게시물이 없습니다')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
