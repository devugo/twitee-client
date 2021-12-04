import { LoadingOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { PAGINATION } from '../constants/PAGINATION';
import { STORAGE_VARIABLE } from '../constants/STORAGE_VARIABLE';
import { getLoader } from '../helpers/functions/getLoader';
import { saveToStorage } from '../helpers/functions/localStorage';
import { signOut } from '../store/actions/auth';
import { createPost, deletePost, getPosts, likeAPost } from '../store/actions/post';
import { READ_POSTS } from '../store/actions/types';
import { PostType, RootStateType } from '../types.d';
import DashboardSummaryCard from './DashboardSummaryCard';
import PageContent from './PageContent';
import PageContentTitle from './PageContentTitle';
import TextAreaInput from './TextAreaInput';
import UserProfile from './UserProfile';

const DashboardContent = ({
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
  const [currentPage, setCurrentPage] = useState(1);
  const { loader, posts, auth } = useSelector((state: RootStateType) => state);
  const [twitBody, setTwitBody] = useState<string>('');
  const postsData = posts.data;
  const postsCount = posts.count;

  // In Progress loading
  const readData = getLoader(loader, READ_POSTS);
  const reading = readData.progressData ? true : false;

  const paginationAnimationDelay = { animationDelay: `${(postsData.length - 1) * 0.2}s` };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleChange = (e: any) => {
    setTwitBody(e.target.value);
  };

  const readPosts = (params: string = '') => {
    dispatch(getPosts(params));
  };

  const addPost = () => {
    dispatch(createPost({ body: twitBody }));
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

  const twit = (e: any) => {
    e.preventDefault();
    if (twitBody) {
      addPost();
    }
  };

  useEffect(() => {
    const params = `?page=${currentPage}`;
    readPosts(params);
  }, [currentPage]);

  return (
    <PageContent>
      <div className="dashboard-content">
        <UserProfile name={auth.name} signOut={logout} />
        <PageContentTitle title="Twits" />
        <form onSubmit={twit}>
          <TextAreaInput
            name="twit-body"
            placeholder="What's on your mind?"
            onChange={handleChange}
            id="twit-body"
            value={twitBody}
          />
          <div className="button-container">
            <button className="twit-button" type="submit">
              Twit
            </button>
          </div>
        </form>

        {!reading ? (
          <>
            <div className="dashboard-summary-cards">
              {postsData.map((post: PostType, index: number) => {
                const animationDelay = index * 0.2;
                return (
                  <Fragment key={index}>
                    <DashboardSummaryCard
                      navigate={() => history.push(`/dashboard/${post.id}`)}
                      animationDelay={animationDelay}
                      body={post.body}
                      likeCount={post.likesCount}
                      like={post.like}
                      commentCount={post.commentsCount}
                      openCommentDialog={() => openCommentDialog(post.id as string)}
                      likePost={() => likePost(post.id as string)}
                      removePost={() => removePost(post.id as string)}
                      userId={auth.id}
                      postUserId={post.user?.id as string}
                      postUserName={post.user?.name as string}
                      postCreatedAt={post.createdAt}
                    />
                  </Fragment>
                );
              })}
            </div>
          </>
        ) : (
          <div className="center">
            <LoadingOutlined style={{ color: '#f64e60', fontSize: 50 }} spin />
          </div>
        )}

        {!reading && postsCount > 0 && (
          <div className="pagination" style={paginationAnimationDelay}>
            <Pagination
              defaultPageSize={PAGINATION.itemsPerPage}
              onChange={goToPage}
              current={currentPage}
              total={postsCount}
            />
          </div>
        )}
      </div>
    </PageContent>
  );
};

export default DashboardContent;
