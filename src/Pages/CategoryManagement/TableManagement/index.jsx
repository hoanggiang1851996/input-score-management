import {Button, Form, Input, Modal, Popconfirm, Table} from "antd";
import {useState} from "react";
import {EditOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";

export const TableManagement = () => {
  const [form] = Form.useForm();
  const initData = [
    {
      key: 1,
      name: "Danh mục khoá học I",
      description: "Danh mục khoá học I"
    },
    {
      key: 2,
      name: "Danh mục khoá học II",
      description: "Danh mục khoá học II"
    }
  ];

  const deleteCategory = (category) => {
    const newData = [...data];
    setData(newData.filter((item) => item.key !== category.key));
  };

  const [data, setData] = useState(initData);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const columns = [
    {
      title: "STT",
      key: "key",
      dataIndex: 'key'
    },
    {
      title: "Tên danh mục",
      key: "name",
      dataIndex: 'name'
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
              title="Xóa danh mục"
              description="Bạn muốn xóa danh mục này không?"
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
        <Modal title={`${isEdit ? "Chỉnh sửa" : "Thêm mới"} danh mục`} open={isOpenModalCreate} footer={[]} onCancel={handleCancel}>
          <Form
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên danh mục.',
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