export interface ICreateUsersToken {
  id?: string;
  createad_at?: Date;
  usersId?: string;
  user_id: string;
  expires_date: Date;
  refresh_token: string;
}
