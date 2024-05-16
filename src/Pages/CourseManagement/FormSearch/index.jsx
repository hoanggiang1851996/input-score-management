import {Button, Input} from "antd";
import {SearchOutlined, UndoOutlined} from "@ant-design/icons";

export const FormSearch = () => {
  return (
    <div className="flex" style={{ columnGap: 20 }}>
      <div className="w-1/4">
        <Input />
      </div>
      <div className="w-1/4">
        <Input />
      </div>
      <div className="w-1/4">
        <Input />
      </div>
      <div className="w-1/4">
        <Button icon={<SearchOutlined />} className="mr-3" type="primary">Tìm kiếm</Button>
        <Button icon={<UndoOutlined />} type="primary" danger>Xóa lọc</Button>
      </div>
    </div>
  )
}