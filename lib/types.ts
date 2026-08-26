export interface UserData {
  id: string;
  username: string;
  global_name?: string;
  avatar?: string | null;
  isAdmin: boolean;
}

export interface ProjectData {
  paket?: string;
  name?: string;
  status: number;
  note?: string;
  createdAt?: number;
}

export interface DocItem {
  id: string;
  name: string;
  url: string;
  type: string;
  addedAt: number;
}

export interface Ticket {
  id: string;
  userId: string;
  username: string;
  global_name?: string;
  avatar?: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: number;
  updatedAt?: number;
  replies: TicketReply[];
}

export interface TicketReply {
  from: 'user' | 'admin';
  text?: string;
  message?: string;
  createdAt: number;
}

export interface AdminUser {
  id: string;
  username: string;
  global_name?: string;
  avatar?: string | null;
  lastLogin: number;
  loginCount?: number;
  project?: ProjectData | null;
}
