import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { STORAGE_VARIABLE } from '../constants/STORAGE_VARIABLE';
import { getLoader } from '../helpers/functions/getLoader';
import { saveToStorage } from '../helpers/functions/localStorage';
import { signOut } from '../store/actions/auth';
import { deletePost, getAPost, likeAPost } from '../store/actions/post';
import { READ_POSTS } from '../store/actions/types';
import { CommentType, RootStateType } from '../types.d';
import DashboardSummaryCard from './DashboardSummaryCard';
import PageContent from './PageContent';
import PageContentTitle from './PageContentTitle';
import UserProfile from './UserProfile';

const SinglePostContent = ({
  toggleOverlay,
  openFormModal,
  postCommentId,
  setPostCommentId,
}: {
  toggleOverlay: (value: boolean) => void;
  openFormModal: () => void;
  postCommentId: string;
  setPostCommentId: (id: string) => void;
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { loader, posts, auth } = useSelector((state: RootStateType) => state);

  // In Progress loading
  const readData = getLoader(loader, READ_POSTS);
  const reading = readData.progressData ? true : false;

  const readOnePost = () => {
    dispatch(getAPost(id));
  };

  const likePost = (id: string) => {
    dispatch(likeAPost(id));
  };

  const removePost = (id: string) => {
    saveToStorage(STORAGE_VARIABLE.deleteID, id);
    dispatch(deletePost(id));
  };

  const logout = () => {
    dispatch(signOut());
  };

  const openCommentDialog = (id: string) => {
    setPostCommentId(id);
    openFormModal();
  };

  useEffect(() => {
    readOnePost();
  }, []);

  return (
    <PageContent>
      <div className="dashboard-content single-post-content">
        <UserProfile name={auth.name} signOut={logout} />
        <PageContentTitle title="Single Twit" />
        <div className="go-back" onClick={() => history.goBack()}>
          Back
        </div>

        {!reading ? (
          <>
            <div className="dashboard-summary-cards">
              <DashboardSummaryCard
                animationDelay={0}
                body={posts.current.body}
                likeCount={posts.current.likesCount}
                like={posts.current.like}
                commentCount={posts.current.commentsCount}
                openCommentDialog={() => openCommentDialog(posts.current.id as string)}
                likePost={() => likePost(posts.current.id as string)}
                removePost={() => removePost(posts.current.id as string)}
                userId={auth.id}
                postUserId={posts.current.user?.id as string}
                postUserName={posts.current.user?.name as string}
                postCreatedAt={posts.current.createdAt}
              />
            </div>
            <div className="post-comments">
              <p>Comments</p>
              <ul>
                {posts?.current?.comments?.map((comment: CommentType, index: number) => {
                  return (
                    <li key={index}>
                      <p>
                        <span>{comment.comment}</span>
                      </p>
                      <p className="details">
                        <span className="post-user">
                          <b>{comment?.user?.name}</b>
                        </span>{' '}
                        -
                        <span className="post-date">
                          {moment(comment.createdAt).format('DD/MM/YYYY')}
                        </span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        ) : (
          <div className="center">
            <LoadingOutlined style={{ color: '#f64e60', fontSize: 50 }} spin />
          </div>
        )}
      </div>
    </PageContent>
  );
};

export default SinglePostContent;
