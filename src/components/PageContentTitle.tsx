import RenderIcon from './RenderIcon';

const PageContentTitle = ({
  title,
  showProjectModal,
  showLabelModal,
  setModalTitle,
  search,
  setModalData,
}: {
  title: string;
  showProjectModal?: () => void;
  showLabelModal?: () => void;
  setModalTitle?: (title: string) => void;
  search?: string;
  setModalData?: (data: any) => void;
}) => {
  return (
    <div className="page-content-title">
      <h2>{title}</h2>
      {search && (
        <span>
          {' '}
          <RenderIcon styles={{ color: 'dodgerBlue' }} title="mdi mdi-playlist-edit" />{' '}
        </span>
      )}
    </div>
  );
};

export default PageContentTitle;
