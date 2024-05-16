import {Button, Form, Input, Modal, Popconfirm, Table} from "antd";
import {useState} from "react";
import {EditOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";

export const TableManagement = () => {
  const [form] = Form.useForm();
  const initData = [
    {
      key: 1,
      code: "TOAN",
      name: "Môn toán",
      description: "Des"
    },
    {
      key: 2,
      code: "VAB",
      name: "Môn văn",
      description: "Des"
    }
  ];

  const deleteCourse = (course) => {

  };

  const [data, setData] = useState(initData);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
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
      title: "Mô tả",
      key: "description",
      dataIndex: 'description'
    },
    {
      title: "",
      key: "action",
      dataIndex: 'action',
      width: 300,
      render: (row) => {
        return (
          <div>
            <Button icon={<EditOutlined />} type="primary" className="mr-3">Chỉnh sửa</Button>
            <Popconfirm
              title="Xóa khóa học"
              description="Bạn muốn xóa khóa học này không?"
              onConfirm={() => deleteCourse(row)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button icon={<DeleteOutlined />} type="primary" danger>Xóa</Button>
            </Popconfirm>

          </div>
        )
      }
    }
  ];

  const openModalCreate = () => {
    setIsOpenModalCreate(true);
  };

  const handleSubmit = () => {

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    setIsOpenModalCreate(false);
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
        <Modal title="Thêm mới khóa học" open={isOpenModalCreate} footer={[]} onCancel={handleCancel}>
          <Form
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Tên học phần"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mô tả',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div className="text-right">
              <Button type="primary" htmlType="submit" className="mr-3">
                Tạo mới
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
};