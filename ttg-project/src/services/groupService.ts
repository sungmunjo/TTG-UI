import { api } from '@/lib/api';

export interface GroupCreateRequest {
  groupName: string;
  groupDescription: string;
  groupImagePath?: string;
}

export interface GroupJoinRequest {
  groupId: number;
}

export async function createGroup(data: GroupCreateRequest): Promise<void> {
  return api.post('/group/create', data);
}

export async function joinGroup(data: GroupJoinRequest): Promise<void> {
  return api.post('/group/join', data);
}
