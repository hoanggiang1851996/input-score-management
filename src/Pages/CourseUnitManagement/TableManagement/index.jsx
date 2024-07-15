import {Button, Checkbox, Col, DatePicker, Form, Input, message, Modal, Popconfirm, Row, Select, Table} from "antd";
import {useEffect, useState} from "react";
import {EditOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';

export const TableManagement = () => {
  const [form] = Form.useForm();
  const initData = [
    {
      id: 1,
      code: "LOP_TOAN_10",
      name: "Lớp toán 10",
      subjectCode: "TOAN",
      subjectName: "Toán",
      teacherCode: 123,
      teacherName: "Tiến sĩ. Dương Ngọc Sơn",
      studySession: "Sáng",
      startTime: "08:00 20/11/2024",
      endTime: "10:00 20/11/2024",
      location: "HN",
      content: "abc",
      description: "Lớp này cho hs giỏi"
    },
    {
      id: 2,
      code: "LOP_VAN_11",
      name: "Lớp văn 11",
      subjectCode: "VAN",
      subjectName: "Văn",
      teacherCode: 222,
      teacherName: "Thạc sĩ. Dương Xuân Thoái",
      studySession: "Chiều",
      startTime: "14:00 20/11/2024",
      endTime: "16:00 20/11/2024",
      location: "HN",
      content: "abc",
      description: "Lớp này cho hs trung bình"
    }
  ];

  const initTeacherData = [
    {
      id: 1,
      code: 123,
      name: "Tiến sĩ. Dương Ngọc Sơn",
    },
    {
      id: 2,
      code: 222,
      name: "Thạc sĩ. Dương Xuân Thái",
    },
  ]

  const initSubjectData = [
    {
      id: 1,
      code: "TOAN",
      name: "TOán",
    },
    {
      id: 2,
      code: "VAN",
      name: "Văn",
    },
  ];

  const studentListInit = [
    {
      id: 1,
      fullName: "Đinh Tuấn Khôi",
      dateOfBirth: "11/11/1996",
      address: "Kim Tràng, Việt Lập, Tân Yên, BG",
      phone: "0123456789"
    },
    {
      id: 2,
      fullName: "Tạ Hoàng Giang",
      dateOfBirth: "12/12/1996",
      address: "Đồi đỏ, TTCT, Tân Yên, BG",
      phone: "0123456789",
    },
    {
      id: 3,
      fullName: "Dương Ngọc Sơn",
      dateOfBirth: "12/12/1996",
      address: "Đồi đỏ, TTCT, Tân Yên, BG",
      phone: "0123456789",
    }
  ]

  const scheduleInit = [
    {
      id: 1,
      startTime: "10:00 30/07/2024",
      endTime: "12:00 30/07/2024",
      studySession: "Sáng"
    },
    {
      id: 2,
      startTime: "14:00 30/07/2024",
      endTime: "16:00 30/07/2024",
      studySession: "Chiều"
    }
  ]

  useEffect(() => {
    // call API list and setData
  }, []);

  const deleteClass = (course) => {
    const newData = [...data];

    setData(newData.filter((item) => item.key !== course.key));
  };

  const [data, setData] = useState(initData);
  const [teachers, setTeachers] = useState(initTeacherData);
  const [subjects, setSubjects] = useState(initSubjectData);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModalViewStudentDetail, setIsOpenModalViewStudentDetail] = useState(false);
  const [isOpenModalViewScheduleDetail, setIsOpenModalViewScheduleDetail] = useState(false);
  const [studentChecked, setStudentChecked] = useState([]);
  const [scheduleChecked, setScheduleChecked] = useState([]);
  const [studentList, setStudentList] = useState(studentListInit);
  const [schedule, setSchedule] = useState(scheduleInit);

  const viewDetailStudentList = (row) => {
    // call API detail student by row.id

    setIsOpenModalViewStudentDetail(true);
  };

  const viewSchedule = (row) => {
    // call API detail student by row.id

    setIsOpenModalViewScheduleDetail(true);
  };

  const columns = [
    {
      title: "STT",
      key: "id",
      dataIndex: 'id'
    },
    {
      title: "Mã lớp",
      key: "code",
      dataIndex: 'code'
    },
    {
      title: "Tên lớp",
      key: "name",
      dataIndex: 'name'
    },
    {
      title: "Mã môn học",
      key: "subjectCode",
      dataIndex: 'subjectCode'
    },
    {
      title: "Tên môn học",
      key: "subjectName",
      dataIndex: 'subjectName'
    },
    {
      title: "Mã giáo viên",
      key: "teacherCode",
      dataIndex: 'teacherCode'
    },
    {
      title: "Tên giáo viên",
      key: "teacherName",
      dataIndex: 'teacherName'
    },
    {
      title: "Lịch trình học",
      key: "studySession",
      dataIndex: 'studySession',
      render: (data, row) => {
        return (
          <div className="italic underline text-blue-950 cursor-pointer" onClick={() => viewSchedule(row)}>Xem lịch
            trình học</div>
        )
      }
    },
    {
      title: "Địa điểm",
      key: "location",
      dataIndex: 'location'
    },
    {
      title: "Danh sách học viên",
      key: "studentList",
      dataIndex: 'studentList',
      render: (data, row) => {
        return (
          <div className="italic underline text-blue-950 cursor-pointer" onClick={() => viewDetailStudentList(row)}>Xem
            danh sách học viên</div>
        )
      }
    },
    {
      title: "Nội dung",
      key: "content",
      dataIndex: 'content'
    },
    {
      title: "Mô tả",
      key: "description",
      dataIndex: 'description'
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: 'action',
      width: 150,
      render: (data, row) => {
        return (
          <div>
            <EditOutlined className="mr-3" onClick={() => {
              form.setFieldsValue({
                ...row,
                startTime: dayjs(row.startTime, "HH:mm DD/MM/YYYY"),
                endTime: dayjs(row.endTime, "HH:mm DD/MM/YYYY")
              });
              setIsOpenModalCreate(true);
              setIsEdit(true);
            }}/>
            <Popconfirm
              title="Xóa lớp học phần"
              description="Bạn muốn xóa lớp học phần này không?"
              onConfirm={() => deleteClass(row)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <DeleteOutlined/>
            </Popconfirm>
          </div>
        )
      }
    }
  ];

  const studentColumns = [
    {
      title: <Checkbox checked={studentChecked.length === studentList.length} onChange={(e) => {
        if (e.target.checked) {
          setStudentChecked(studentList.map((item) => item.id));
          return;
        }

        setStudentChecked([]);
      }}/>,
      key: "checkbox",
      dataIndex: 'checkbox',
      render: (data, row) => {
        return (
          <div>
            <Checkbox onChange={(e) => {
              if (e.target.checked) {
                setStudentChecked([...studentChecked, row.id]);
                return;
              }

              setStudentChecked(studentChecked.filter((item) => item.id === row.id));
            }} checked={studentChecked.indexOf(row.id) !== -1}/>
          </div>
        )
      }
    },
    {
      title: "STT",
      key: "id",
      dataIndex: 'id'
    },
    {
      title: "Họ và tên",
      key: "fullName",
      dataIndex: 'fullName'
    },
    {
      title: "Ngày sinh",
      key: "dateOfBirth",
      dataIndex: 'dateOfBirth'
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: 'address'
    },
    {
      title: "Số điện thoại",
      key: "phone",
      dataIndex: 'phone'
    },
  ]

  const scheduleColumns = [
    {
      title: <Checkbox checked={scheduleChecked.length === schedule.length} onChange={(e) => {
        if (e.target.checked) {
          setScheduleChecked(schedule.map((item) => item.id));
          return;
        }

        setScheduleChecked([]);
      }}/>,
      key: "checkbox",
      dataIndex: 'checkbox',
      render: (data, row) => {
        return (
          <div>
            <Checkbox onChange={(e) => {
              if (e.target.checked) {
                setScheduleChecked([...scheduleChecked, row.id]);
                return;
              }

              setScheduleChecked(scheduleChecked.filter((item) => item.id === row.id));
            }} checked={scheduleChecked.indexOf(row.id) !== -1}/>
          </div>
        )
      }
    },
    {
      title: "STT",
      key: "id",
      dataIndex: 'id'
    },
    {
      title: "Thời gian từ",
      key: "startTime",
      dataIndex: 'startTime'
    },
    {
      title: "Thời gian đến",
      key: "endTime",
      dataIndex: 'endTime'
    },
    {
      title: "Buổi học",
      key: "studySession",
      dataIndex: 'studySession'
    },
  ]

  useEffect(() => {
    // call api teachers, subjects
  }, []);

  const openModalCreate = () => {
    setIsOpenModalCreate(true);
  };

  const handleSubmit = (values) => {
    // call API post send values

    // fake
    setData([
      ...data,
      values
    ]);

    setIsOpenModalCreate(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    setIsOpenModalCreate(false);
    form.resetFields();
  };


  return (
    <div className="mt-3">
      <div className="text-right">
        <Button onClick={() => openModalCreate()} icon={<PlusOutlined/>} type="primary">Thêm mới</Button>
      </div>
      <div className="mt-3">
        <Table dataSource={data} columns={columns}/>
      </div>

      {isOpenModalCreate && (
        <Modal title={`${isEdit ? "Chỉnh sửa" : "Thêm mới"} lớp học phần`} open={isOpenModalCreate} footer={[]}
               onCancel={handleCancel}>
          <Form
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Mã lớp học"
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã lớp học.',
                },
              ]}
            >
              <Input placeholder="Nhập thông tin"/>
            </Form.Item>

            <Form.Item
              label="Tên lớp học"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên lớp học.',
                },
              ]}
            >
              <Input placeholder="Nhập thông tin"/>
            </Form.Item>

            <Form.Item
              label="Giáo viên"
              name="teacherCode"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn giáo viên.',
                },
              ]}
            >
              <Select placeholder="Chọn">
                {teachers.map((item, index) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Môn"
              name="subjectCode"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn môn.',
                },
              ]}
            >
              <Select placeholder="Chọn">
                {subjects.map((item, index) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Địa điểm"
              name="location"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Địa điểm.',
                },
              ]}
            >
              <Input placeholder="Nhập thông tin"/>
            </Form.Item>

            <Form.Item
              label="Nội dung"
              name="content"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Nội dung.',
                },
              ]}
            >
              <Input placeholder="Nhập thông tin"/>
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
            >
              <Input placeholder="Nhập thông tin"/>
            </Form.Item>

            <div className="text-right">
              <Button type="primary" htmlType="submit" className="mr-3">
                {isEdit ? "Lưu" : "Tạo mới"}
              </Button>
              <Button type="primary" danger onClick={() => setIsOpenModalCreate(false)}>
                Hủy bỏ
              </Button>
            </div>
          </Form>
        </Modal>
      )}

      {isOpenModalViewStudentDetail && (
        <Modal width={800} title={"Danh sách học viên"} open={isOpenModalViewStudentDetail} footer={[]}
               onCancel={() => setIsOpenModalViewStudentDetail(false)}>
          <Row gutter={24}>
            <Col span={12}>
              <Select mode="tags" maxTagCount={2} className="w-full" placeholder="Chọn học viên">
                {studentList.map((item) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.fullName}
                    </Select.Option>
                  )
                })}
              </Select>
            </Col>
            <Col span={12}>
              <Button type="primary" className="mr-3">Thêm học viên vào danh sách</Button>
              <Button type="primary" danger onClick={() => {
                if (studentChecked.length === 0) {
                  message.warning("Vui lòng chọn học viên để xóa khỏi lớp học phần.");
                }

                // call API delete
              }}>Xóa</Button>
            </Col>
          </Row>
          <Table className="mt-3" columns={studentColumns} dataSource={studentList}/>
        </Modal>
      )}

      {isOpenModalViewScheduleDetail && (
        <Modal width={1000} title={"Lịch trình lớp học phần"} open={isOpenModalViewScheduleDetail} footer={[]}
               onCancel={() => setIsOpenModalViewScheduleDetail(false)}>
          <Row gutter={24}>
            <Col span={6}>
              <DatePicker format="HH:mm DD/MM/YYYY" className="w-full" showTime placeholder="Thời gian học từ"/>
            </Col>
            <Col span={6}>
              <DatePicker format="HH:mm DD/MM/YYYY" className="w-full" showTime placeholder="Thời gian học đến"/>
            </Col>
            <Col span={6}>
              <Select className="w-full" placeholder="Chọn buổi học">
                {[{
                  value: 1,
                  name: "Buổi sáng"
                }, {
                  value: 2,
                  name: "Buổi chiều"
                }].map((item) => {
                  return (
                    <Select.Option key={item.value} value={item.value}>
                      {item.name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Col>
            <Col span={6}>
              <Button type="primary" className="mr-3">Thêm lịch trình</Button>
              <Button type="primary" danger onClick={() => {
                if (scheduleChecked.length === 0) {
                  message.warning("Vui lòng chọn lịch trình để xóa.");
                }

                // call API delete
              }}>Xóa</Button>
            </Col>
          </Row>
          <Table className="mt-3" columns={scheduleColumns} dataSource={schedule}/>
        </Modal>
      )}
    </div>
  )
};