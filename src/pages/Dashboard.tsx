import { useState } from 'react';

import DashboardContent from '../components/DashboardContent';
import LoaderOverlay from '../components/LoaderOverlay';
import PageHeader from '../components/PageHeader';
import PageWrapper from '../components/PageWrapper';
import PostForm from '../components/PostForm';

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [postCommentId, setPostCommentId] = useState<string>('');
  const [modalTitle] = useState('');

  const [openOverlay, setOpenOverlay] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
  };

  const toggleOverlay = (value: boolean) => {
    setOpenOverlay(value);
  };

  const openFormModal = () => {
    setModalVisible(true);
  };

  const closeFormModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <PageHeader />
      <PageWrapper>
        <DashboardContent
          postCommentId={postCommentId}
          setPostCommentId={setPostCommentId}
          openFormModal={openFormModal}
          toggleOverlay={toggleOverlay}
        />

        <PostForm
          postCommentId={postCommentId}
          title={modalTitle}
          modalVisible={modalVisible}
          handleCancel={handleCancel}
          closeFormModal={closeFormModal}
        />
        {openOverlay && <LoaderOverlay />}
      </PageWrapper>
    </>
  );
};

export default Dashboard;
