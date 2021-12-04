import moment from 'moment';

import RenderIcon from './RenderIcon';

const DashboardSummaryCard = ({
  body,
  likeCount,
  commentCount,
  animationDelay,
  openCommentDialog,
  likePost,
  like,
  removePost,
  userId,
  postUserId,
  postUserName,
  postCreatedAt,
  navigate,
}: {
  body: string;
  likeCount: number;
  commentCount: number;
  animationDelay: number;
  openCommentDialog: () => void;
  likePost: () => void;
  like?: boolean;
  removePost: () => void;
  userId: string;
  postUserId: string;
  postUserName: string;
  postCreatedAt: any;
  navigate?: () => void;
}) => {
  return (
    <div
      className="devugo-card dashboard-summary-card"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {postUserId === userId && (
        <div className="icon-container" onClick={removePost}>
          <RenderIcon styles={{ fontSize: 15, color: 'brown' }} title="mdi mdi-delete" />
        </div>
      )}
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: body }}
        onClick={navigate}
      ></div>
      <div className="details">
        <p>
          <span className="post-user">{postUserName}</span> -
          <span className="post-date">{moment(postCreatedAt).format('DD/MM/YYYY')}</span>
        </p>
      </div>
      <div className="action-section">
        <div className="icon-container" onClick={likePost}>
          <span>{likeCount}</span>
          <RenderIcon
            styles={{ fontSize: 15, color: like ? '#006fd6' : 'grey' }}
            title="mdi mdi-thumb-up"
          />
        </div>
        <div className="icon-container" onClick={openCommentDialog}>
          <span>{commentCount}</span>
          <RenderIcon styles={{ fontSize: 15, color: 'grey' }} title="mdi mdi-message-reply" />
        </div>
      </div>
    </div>
  );
};
export default DashboardSummaryCard;
