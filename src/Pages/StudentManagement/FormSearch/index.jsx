import {Button, Input, Select} from "antd";
import {SearchOutlined, UndoOutlined} from "@ant-design/icons";
import {useState} from "react";

export const FormSearch = () => {
  const initRanks = [
    {
      id: 1,
      name: "A"
    },
    {
      id: 2,
      name: "B"
    },
    {
      id: 3,
      name: "C"
    }
  ];

  const [ranks, setRanks] = useState(initRanks);

  return (
    <div className="flex" style={{columnGap: 20}}>
      <div className="w-1/4">
        <Input placeholder="Nhập tên học viên để tìm kiếm"/>
      </div>
      <div className="w-1/4">
        <Select className="w-full" placeholder="Chọn phân loại">
          {ranks.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            )
          })}
        </Select>
      </div>
      <div className="w-1/4">
        <Button icon={<SearchOutlined/>} className="mr-3" type="primary">Tìm kiếm</Button>
        <Button icon={<UndoOutlined/>} type="primary" danger>Xóa lọc</Button>
      </div>
    </div>
  )
}