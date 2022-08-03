/* eslint-disable no-underscore-dangle */
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import HeaderDropdown, { HeaderItem } from './HeaderDropdown';

type CourseNames = {
  _id: string;
  name: string;
};

const CoursesMenu: React.FC = () => {
  const [courses, setCourses] = useState<CourseNames[]>([]);

  useEffect(() => {
    const fetchCourseNames = async () => {
      try {
        const { data } = await axios.get<CourseNames[]>('/api/classroom/names');
        setCourses(data);
      } catch (err) {
        message.error('Error fetching list of courses');
      }
    };

    fetchCourseNames();
  }, []);

  const items: HeaderItem[] = useMemo(
    () =>
      courses.map(course => ({
        key: course._id,
        label: course.name,
        link: course._id,
      })),
    [courses],
  );

  return (
    <HeaderDropdown
      items={items.map(item => ({
        ...item,
        link: `/courses/${item.link}`,
      }))}
      labelName="Courses"
    />
  );
};

export default CoursesMenu;
