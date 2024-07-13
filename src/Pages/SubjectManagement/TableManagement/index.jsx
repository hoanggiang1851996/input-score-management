import {Button, Form, Input, InputNumber, Modal, Popconfirm, Select, Table} from "antd";
import {useEffect, useState} from "react";
import {EditOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";

export const TableManagement = () => {
  const [form] = Form.useForm();
  const initData = [
    {
      key: 1,
      code: "VAN",
      name: "Văn",
      number: 3,
      course: "Khoá A7 K51",
      description: ""
    },
    {
      key: 2,
      code: "TOAN",
      name: "Toán",
      number: 3,
      course: "Khoá A7 K52",
      description: ""
    },
    {
      key: 3,
      code: "LY",
      name: "Lý",
      number: 2,
      course: "Khoá A7 K51",
      description: ""
    }
  ];

  const initDataCourse = [
    {
      id: 1,
      code: "KHOA_A7_K51",
      name: "Khoá A7 K51",
      category: "Danh mục khoá học II",
      description: "Khoá A7 K51",
    },
    {
      id: 2,
      code: "KHOA_A7_K52",
      name: "Khoá A7 K52",
      category: "Danh mục khoá học I",
      description: "Khoá A7 K52",
    }
  ]

  const deleteCategory = (category) => {
    const newData = [...data];
    setData(newData.filter((item) => item.key !== category.key));
  };

  const [data, setData] = useState(initData);
  const [courses, setCourses] = useState(initDataCourse);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // call API Course
  }, []);

  const columns = [
    {
      title: "STT",
      key: "key",
      dataIndex: 'key'
    },
    {
      title: "Mã môn học",
      key: "code",
      dataIndex: 'code',
    },
    {
      title: "Tên môn học",
      key: "name",
      dataIndex: 'name'
    },
    {
      title: "Số tín chỉ",
      key: "number",
      dataIndex: 'number'
    },
    {
      title: "Khoá học",
      key: "course",
      dataIndex: 'course'
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
        console.log(row)
        return (
          <div>
            <EditOutlined className="mr-3" onClick={() => {
              form.setFieldsValue(row);
              setIsOpenModalCreate(true);
              setIsEdit(true);
            }}/>
            <Popconfirm
              title="Xóa môn học"
              description="Bạn muốn xóa môn học này không?"
              onConfirm={() => deleteCategory(row)}
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

  const openModalCreate = () => {
    setIsOpenModalCreate(true);
  };

  const handleSubmit = (values) => {
    // check isEdit to call API
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
        <Modal destroyOnClose={true} title={`${isEdit ? "Chỉnh sửa" : "Thêm mới"} môn học`} open={isOpenModalCreate} footer={[]} onCancel={handleCancel}>
          <Form
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Mã môn học"
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã môn học.',
                },
              ]}
            >
              <Input placeholder="Nhập thông tin" />
            </Form.Item>

            <Form.Item
              label="Tên môn học"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên môn học.',
                },
              ]}
            >
              <Input placeholder="Nhập thông tin" />
            </Form.Item>

            <Form.Item
              label="Số tín chỉ"
              name="number"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số tín chỉ.',
                },
              ]}
            >
              <InputNumber className="w-full" placeholder="Nhập thông tin" />
            </Form.Item>

            <Form.Item
              label="Khoá học"
              name="course"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn khoá học.',
                },
              ]}
            >
              <Select placeholder="Chọn">
                {courses.map((item) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
            >
              <Input placeholder="Nhập thông tin" />
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
    </div>
  )
};