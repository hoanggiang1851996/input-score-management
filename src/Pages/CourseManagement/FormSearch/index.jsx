import {Button, Input, Select} from "antd";
import {SearchOutlined, UndoOutlined} from "@ant-design/icons";

export const FormSearch = () => {
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
  return (
    <div className="flex" style={{ columnGap: 20 }}>
      <div className="w-1/5">
        <Input placeholder="Nhập mã khoá học" />
      </div>
      <div className="w-1/5">
        <Input placeholder="Nhập tên khoá học" />
      </div>
      <div className="w-1/5">
        <Select className="w-full" placeholder="Chọn danh mục">
          {initData.map((item) => {
            return (
              <Select.Option key={item.key} value={item.key}>
                {item.name}
              </Select.Option>
            )
          })}
        </Select>
      </div>
      <div className="w-1/5">
        <Button icon={<SearchOutlined />} className="mr-3" type="primary">Tìm kiếm</Button>
        <Button icon={<UndoOutlined />} type="primary" danger>Xóa lọc</Button>
      </div>
    </div>
  )
}