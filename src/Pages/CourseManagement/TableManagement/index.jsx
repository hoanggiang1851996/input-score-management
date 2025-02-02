import {Button, Form, Input, Modal, Popconfirm, Select, Table} from "antd";
import {useEffect, useState} from "react";
import {EditOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";

export const TableManagement = () => {
  const [form] = Form.useForm();
  const initData = [
    {
      key: 1,
      code: "KHOA_A7_K51",
      name: "Khoá A7 K51",
      category: "Danh mục khoá học II",
      description: "Khoá A7 K51"
    },
    {
      key: 2,
      code: "KHOA_A8_K51",
      name: "Khoá A8 K51",
      category: "Danh mục khoá học I",
      description: "Khoá A8 K51"
    }
  ];

  const categoryList = [
    {
      id: 1,
      name: "Danh mục khoá học I",
      description: "Danh mục khoá học I"
    },
    {
      id: 2,
      name: "Danh mục khoá học II",
      description: "Danh mục khoá học II"
    }
  ]

  useEffect(() => {
    // call API list and setData
  }, []);

  const deleteCourse = (course) => {
    const newData = [...data];

    setData(newData.filter((item) => item.key !== course.key));
  };

  const [data, setData] = useState(initData);
  const [categories, setCategories] = useState(categoryList);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const columns = [
    {
      title: "STT",
      key: "key",
      dataIndex: 'key'
    },
    {
      title: "Mã khóa học",
      key: "code",
      dataIndex: 'code'
    },
    {
      title: "Tên khóa học",
      key: "name",
      dataIndex: 'name'
    },
    {
      title: "Danh mục",
      key: "category",
      dataIndex: 'category'
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
              form.setFieldsValue(row);
              setIsOpenModalCreate(true);
              setIsEdit(true);
            }} />
            <Popconfirm
              title="Xóa khóa học"
              description="Bạn muốn xóa khóa học này không?"
              onConfirm={() => deleteCourse(row)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <DeleteOutlined />
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
        <Button onClick={() => openModalCreate()} icon={<PlusOutlined />} type="primary">Thêm mới</Button>
      </div>
      <div className="mt-3">
        <Table dataSource={data} columns={columns} />
      </div>

      {isOpenModalCreate && (
        <Modal title={`${isEdit ? "Chỉnh sửa" : "Thêm mới"} khoá học`} open={isOpenModalCreate} footer={[]} onCancel={handleCancel}>
          <Form
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Mã khoá học"
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã khoá học.',
                },
              ]}
            >
              <Input placeholder="Nhập thông tin" />
            </Form.Item>

            <Form.Item
              label="Tên khoá học"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên khoá học.',
                },
              ]}
            >
              <Input placeholder="Nhập thông tin" />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
            >
              <Input placeholder="Nhập thông tin" />
            </Form.Item>

            <Form.Item
              label="Thuộc danh mục"
              name="category"
            >
              <Select placeholder="Chọn">
                {categories.map((item, index) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  )
                })}
              </Select>
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