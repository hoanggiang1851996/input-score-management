import {Button, Form, Input, Modal, Popconfirm, Table} from "antd";
import {useEffect, useState} from "react";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";

export const TableManagement = () => {
  const [form] = Form.useForm();
  const initData = [
    {
      id: 1,
      fullName: "Tiến sĩ Dương Ngọc Sơn",
      dateOfBirth: "11/11/1996",
      address: "Kim Tràng, Việt Lập, Tân Yên, BG",
      phone: "0123456789",
      description: ""
    },
    {
      id: 2,
      fullName: "Dương Xuân Thoái",
      dateOfBirth: "12/12/1996",
      address: "Đồi đỏ, TTCT, Tân Yên, BG",
      phone: "0123456789",
      description: ""
    }
  ];

  const [data, setData] = useState(initData);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteTeacher = (teacher) => {
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
              title="Xóa giáo viên"
              description="Bạn muốn xóa sinh viên này không?"
              onConfirm={() => deleteTeacher(row)}
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
    </div>
  )
}