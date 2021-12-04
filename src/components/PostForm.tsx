import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { getLoader } from '../helpers/functions/getLoader';
import { renderServerError } from '../helpers/functions/renderServerError';
import { successCreation } from '../helpers/functions/responseChecker';
import { commentOnPost } from '../store/actions/post';
import { CREATE_POST } from '../store/actions/types';
import { CreateCommentType, RootStateType } from '../types.d';
import Button from './Button';
import RenderIcon from './RenderIcon';
import TextAreaInput from './TextAreaInput';

const initialFormValues: { comment: string } = {
  comment: EMPTY_STRING,
};

const validationSchema = Yup.object({
  comment: Yup.string().required('Please, provide a comment'),
});

const PostForm = ({
  title,
  modalVisible,
  handleCancel,
  postCommentId,
  closeFormModal,
}: {
  title: string;
  modalVisible: boolean;
  handleCancel: () => void;
  data?: any;
  postCommentId: string;
  closeFormModal: () => void;
}) => {
  const dispatch = useDispatch();
  const resetFormButtonRef = useRef<any>(null);

  const { loader } = useSelector((state: RootStateType) => state);

  const [formikFormValues] = useState(initialFormValues);

  // In Progress loading
  const { errorData, progressData, successData } = getLoader(loader, CREATE_POST);
  const loading = progressData ? true : false;

  // Check if post was created or updated successfully
  const isSuccess = successCreation(successData);

  const addComment = (values: CreateCommentType) => {
    dispatch(commentOnPost(postCommentId, values));
    resetFormButtonRef.current.click();
    closeFormModal();
  };

  const resetFormikEntries = (resetForm: any) => {
    resetForm();
  };

  useEffect(() => {
    if (isSuccess) {
      handleCancel();
      // Clear formik form values
      resetFormButtonRef.current?.click();
    }
  }, [isSuccess]);

  return (
    <Modal footer={null} title={title} visible={modalVisible} onCancel={handleCancel}>
      <Formik
        enableReinitialize
        initialValues={formikFormValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          addComment(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, resetForm }) => {
          return (
            <form onSubmit={handleSubmit} className="devugo-form">
              {renderServerError(errorData).length > 0 && (
                <div className="server-message mb-2 mt-2">
                  <Alert
                    message="Error"
                    description={renderServerError(errorData)}
                    type="error"
                    showIcon
                  />
                </div>
              )}
              <div className="input-container">
                <label>
                  <RenderIcon title="mdi mdi-title" /> Comment
                </label>
                <TextAreaInput
                  name="comment"
                  placeholder="Enter comment...."
                  onChange={handleChange}
                  id="comment"
                  value={values.comment}
                />
                <small className="danger">
                  {errors.comment && touched.comment && errors.comment}
                </small>
              </div>

              <Button disabled={loading} type="submit">
                Add {loading && <LoadingOutlined spin />}
              </Button>
              <button
                style={{ display: 'none' }}
                ref={resetFormButtonRef}
                onClick={() => resetFormikEntries(resetForm)}
                type="button"
              ></button>
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default PostForm;
