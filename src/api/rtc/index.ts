import request from '@/api/request';

export function queryChatRooms() {
  return request({
    url: `/v1/room-list`,
    method: 'get',
  });
}
