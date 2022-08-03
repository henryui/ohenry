import React, { useContext } from 'react';
import styled from 'styled-components';
import { Form, Input, Radio, Space } from 'antd';
import LayoutContext from '../LayoutContext';
import FormContext from './FormContext';

const StudentForm: React.FC = () => {
  const {
    email,
    setEmail,
    parentName,
    setParentName,
    phone,
    setPhone,
    studentName,
    setStudentName,
    grade,
    setGrade,
    address,
    setAddress,
  } = useContext(FormContext);
  const { currentUser } = useContext(LayoutContext);

  return (
    <StyledForm layout="vertical">
      <StyledContainer
        label="Contact Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not a valid e-mail.',
          },
          {
            required: true,
            message: 'Please provide your E-mail!',
          },
        ]}
      >
        <StyledInput
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email"
          allowClear
          size="large"
        />
      </StyledContainer>
      <StyledContainer
        label="Parent's Name"
        name="parentName"
        rules={[
          {
            required: true,
            message: "Please provide parent's name",
          },
        ]}
      >
        <StyledInput
          value={parentName}
          onChange={e => setParentName(e.target.value)}
          placeholder="Name"
          allowClear
          size="large"
        />
      </StyledContainer>
      <StyledContainer
        label="Cell Phone Number"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please provide cell phone number',
          },
        ]}
      >
        <StyledInput
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="xxx-xxx-xxxx"
          allowClear
          size="large"
        />
      </StyledContainer>
      <StyledContainer
        label="Student's Name"
        name="studentName"
        rules={[
          {
            required: true,
            message: "Please provide student's name",
          },
        ]}
      >
        <StyledInput
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
          placeholder="Name"
          allowClear
          size="large"
        />
      </StyledContainer>
      <StyledContainer
        label="Student's Grade in September 2022"
        name="grade"
        rules={[
          {
            required: true,
            message: "Please provide student's grade",
          },
        ]}
      >
        <Radio.Group>
          <Space direction="vertical">
            {[4, 5, 6, 7, 8, 9].map(gradeNum => (
              <Radio
                value={grade}
                onChange={e => setGrade(e.target.value)}
                key={`grade-radio-${gradeNum}`}
              >
                {' '}
                Grade {gradeNum}{' '}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </StyledContainer>
      <StyledContainer
        label="Student Email (@Gmail for Google Classroom)"
        name="studentEmail"
      >
        <StyledInput disabled defaultValue={currentUser.email} size="large" />
      </StyledContainer>
      <StyledContainer
        label="Home Address - for book delivery"
        name="address"
        rules={[
          {
            required: true,
            message: 'Please provide home address',
          },
        ]}
        tooltip="street number, street name, city, province, postal code"
      >
        <StyledInput
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Home Address"
          allowClear
          size="large"
        />
      </StyledContainer>
    </StyledForm>
  );
};

export default StudentForm;

const StyledForm = styled(Form)`
  width: 100%;
`;

const StyledContainer = styled(Form.Item)`
  margin-top: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 20px 25px;
  width: 100%;
`;

const StyledInput = styled(Input)`
  max-width: 500px;
`;
