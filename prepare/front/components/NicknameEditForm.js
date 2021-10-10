import React, { useMemo } from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';

const NicknameEditForm = () => {
  // const style = useMemo(() => ({ marginBottom: "20px", boder: "1px solid #d9d9d9", padding: "20px" }), []);
  return (
    <FormStyle>
      <Input.Search addonBefore='닉네임' enterButton='수정' />
    </FormStyle>
  );
};

export default NicknameEditForm;

// styled-components
const FormStyle = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;
