import {Button, Form, Input, Modal, Popconfirm, Select, Table} from "antd";
import {useEffect, useState} from "react";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
export const TableManagement = () => {
  const [form] = Form.useForm();
  const initData = [
    {
      id: 1,
      username: "khoidt",
      role: "admin",
      email: "khoi@gmail.com",
      phone: "0123456789",
      createdAt: "20:00 12/12/2012",
      updatedAt: "20:00 12/12/2012",
      lastLogin: "20:00 12/12/2012",
    },
    {
      id: 2,
      username: "khoidt",
      role: "admin",
      email: "khoi@gmail.com",
      phone: "0123456789",
      createdAt: "20:00 12/12/2012",
      updatedAt: "20:00 12/12/2012",
      lastLogin: "20:00 12/12/2012",
    }
  ];

  const roles = ["admin", "teacher", "user"]

  const [data, setData] = useState(initData);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteUser = (user) => {
    // call api delete and re-fetch api list
  };

  useEffect(() => {
    // call API get course
  }, []);

  const columns = [
    {
      title: "STT",
      key: "id",
      dataIndex: 'id'
    },
    {
      title: "Tên đăng nhập",
      key: "username",
      dataIndex: 'username'
    },
    {
      title: "Quyền",
      key: "role",
      dataIndex: 'role'
    },
    {
      title: "Email",
      key: "email",
      dataIndex: 'email'
    },
    {
      title: "Đăng nhập lần cuối lúc",
      key: "lastLogin",
      dataIndex: 'lastLogin'
    },
    {
      title: "Thời gian tạo",
      key: "createdAt",
      dataIndex: 'createdAt'
    },
    {
      title: "Thời gian cập nhật",
      key: "updatedAt",
      dataIndex: 'updatedAt'
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
              title="Xóa người dùng"
              description="Bạn muốn xóa người dùng này không?"
              onConfirm={() => deleteUser(row)}
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
    setIsEdit(true);
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
        <Modal title={`${isEdit ? "Chỉnh sửa" : "Thêm mới"} giáo viên`} open={isOpenModalCreate} footer={[]} onCancel={handleCancel}>
          <Form
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Tên đăng nhập.',
                },
              ]}
            >
              <Input placeholder="Nhập thông tin"/>
            </Form.Item>

            <Form.Item
              label="Quyền"
              name="role"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn Quyền.',
                },
              ]}
            >
              <Select className="w-full" placeholder="Chọn danh mục">
                {roles.map((item) => {
                  return (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Email.',
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
    </div>
  )
}