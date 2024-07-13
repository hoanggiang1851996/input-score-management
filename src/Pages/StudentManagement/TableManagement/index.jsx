import {Button, Col, Form, Input, Modal, Popconfirm, Popover, Row, Select, Table} from "antd";
import {useEffect, useRef, useState} from "react";
import {DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea.js";
import {Print} from "../Print/index.jsx";

export const TableManagement = () => {
  const [form] = Form.useForm();
  const [valueNote, setValueNote] = useState("");
  const componentPrintRef = useRef();
  const initData = [
    {
      id: 1,
      fullName: "Đinh Tuấn Khôi",
      dateOfBirth: "11/11/1996",
      address: "Kim Tràng, Việt Lập, Tân Yên, BG",
      phone: "0123456789",
      rank: "A",
      description: ""
    },
    {
      id: 2,
      fullName: "Tạ Hoàng Giang",
      dateOfBirth: "12/12/1996",
      address: "Đồi đỏ, TTCT, Tân Yên, BG",
      phone: "0123456789",
      rank: "B",
      description: ""
    }
  ];

  const initDataProcess = [
    {
      id: 1,
      subject: "Toán",
      course: "Học kỳ I A7 K51",
      process: "50%",
      note: "Học ok",
    },
    {
      id: 2,
      subject: "Lý",
      course: "Học kỳ II A7 K51",
      process: "70%",
      note: "Học k ok",
    },
  ];

  const [data, setData] = useState(initData);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [processData, setProcessData] = useState(initDataProcess);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);

  const deleteStudent = (student) => {
    // call api delete and re-fetch api list
  };

  useEffect(() => {
    // call API get course
  }, []);

  const viewDetail = (row) => {
    setIsOpenModalDetail(true);
    setDataDetail(row);

    // call API Data Process of Student
    setSubjects(initDataProcess.map((item) => {
      return {
        name: item.subject,
      }
    }))

    setCourses(initDataProcess.map((item) => {
      return {
        name: item.course,
      }
    }))
  };

  const columns = [
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
    {
      title: "Phân loại",
      key: "rank",
      dataIndex: 'rank'
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: 'action',
      width: 200,
      render: (data, row) => {
        return (
          <div>
            <EditOutlined className="mr-3 cursor-pointer" onClick={() => {
              form.setFieldsValue(row);
              setIsOpenModalCreate(true);
              setIsEdit(true);
            }} />
            <Popconfirm
              className="mr-3"
              title="Xóa học sinh"
              description="Bạn muốn xóa học sinh này không?"
              onConfirm={() => deleteStudent(row)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <DeleteOutlined/>
            </Popconfirm>
            <EyeOutlined className="cursor-pointer" onClick={() => viewDetail(row)}/>
          </div>
        )
      }
    }
  ];

  const saveDataNote = (record) => {
    // call API update process data for student
    setVisiblePopover(false);
    setValueNote("");
  }

  const columnsStudentData = [
    {
      title: "STT",
      key: "id",
      dataIndex: 'id'
    },
    {
      title: "Môn học",
      key: "subject",
      dataIndex: 'subject'
    },
    {
      title: "Kỳ học",
      key: "course",
      dataIndex: 'course'
    },
    {
      title: "Tiến trình học tập",
      key: "process",
      dataIndex: 'process'
    },
    {
      title: "Ghi chú",
      key: "note",
      dataIndex: 'note'
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: 'action',
      width: 150,
      render: (data, row) => {
        console.log(row)
        return (
          <div>
            <Popover
              content={<div>
                <TextArea value={valueNote} onChange={(e) => setValueNote(e.target.value)} className="mb-3"
                          placeholder="Nhập ghi chú"/>
                <div className="text-right"><Button onClick={() => saveDataNote(row)} type="primary">Lưu</Button></div>
              </div>}
              title="Ghi chú"
              trigger="click"
              open={visiblePopover === row.id} // Control visibility based on state
              onOpenChange={(visible) => {
                setVisiblePopover(visible ? row.id : null);
                setValueNote(row.note)
              }} // Handle visibility change
            >
              <EditOutlined className="mr-3 cursor-pointer"/>
            </Popover>
          </div>
        )
      }
    }
  ];

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
        <Modal title={`${isEdit ? "Chỉnh sửa" : "Thêm mới"} học viên`} open={isOpenModalCreate} footer={[]} onCancel={handleCancel}>
          <Form
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Họ và tên.',
                },
              ]}
            >
              <Input placeholder="Nhập thông tin"/>
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Ngày sinh.',
                },
              ]}
            >
              <Input placeholder="Nhập thông tin"/>
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Địa chỉ.',
                },
              ]}
            >
              <Input placeholder="Nhập thông tin"/>
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Số điện thoại.',
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
              <Button type="primary" danger>
                Hủy bỏ
              </Button>
            </div>
          </Form>
        </Modal>
      )}

      {isOpenModalDetail && (
        <Modal width={800} title="Xem chi tiết học viên" open={isOpenModalDetail} footer={[]}
               onCancel={() => setIsOpenModalDetail(false)}>
          <Row>
            <Col span={6}>
              Họ và tên
            </Col>
            <Col span={12}>
              {dataDetail && dataDetail.fullName}
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              Ngày sinh
            </Col>
            <Col span={12}>
              {dataDetail && dataDetail.dateOfBirth}
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              Địa chỉ
            </Col>
            <Col span={12}>
              {dataDetail && dataDetail.address}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col span={6}>
              Số điện thoại
            </Col>
            <Col span={12}>
              {dataDetail && dataDetail.phone}
            </Col>
          </Row>
          <b>Quá trình học tập</b>
          <Table pagination={false} className="mt-3 mb-3" dataSource={processData} columns={columnsStudentData}/>
          <b>In bảng điểm theo môn</b>
          <div className="mt-3 mb-3">
            <Row gutter={24}>
              <Col span={12}>
                <Select mode="multiple" allowClear placeholder="Chọn môn học" className="w-full">
                  {subjects.map((item) => {
                    return (
                      <Select.Option value={item.name} key={item.name}>
                        {item.name}
                      </Select.Option>
                    )
                  })
                  })
                </Select>
              </Col>
              <Col>
                <Button type="primary">In bảng điểm</Button>
              </Col>
            </Row>
          </div>

          <b>In bảng điểm theo kỳ học</b>
          <div className="mt-3">
            <Row gutter={24}>
              <Col span={12}>
                <Select placeholder="Chọn khoá học" className="w-full">
                  {courses.map((item) => {
                    return (
                      <Select.Option value={item.name} key={item.name}>
                        {item.name}
                      </Select.Option>
                    )
                  })
                  })
                </Select>
              </Col>
              <Col>
                <Button type="primary">In bảng điểm</Button>
              </Col>
            </Row>

            <Print ref={componentPrintRef} data={[]}/>
          </div>
        </Modal>
      )}
    </div>
  )
}