export type ActionType = {
  IN_PROGRESS: string;
  SUCCESS: string;
  FAILURE: string;
};

export type SignupType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SigninType = {
  email: string;
  password: string;
};

export type ApiResponseType = { type: string; response: any };
export type AuthType = {
  accessToken: string;
  username: string;
  email: string;
  loggedIn: boolean;
  id: string;
  name: string;
};

export type PostType = {
  id?: string;
  body: string;
  user?: { id: string; name: string };
  likesCount: number;
  commentsCount: number;
  like?: boolean;
  createdAt: string;
};

export type CommentType = {
  id?: string;
  comment: string;
  user?: { id: string; name: string };
  createdAt: string;
};

export type CreatePostType = {
  body: string;
};

export type CreateCommentType = {
  comment: string;
};

export type RootStateType = {
  loader: ApiResponseType[];
  auth: AuthType;
  posts: { data: PostType[]; count: number; loaded: boolean; current: any };
};
