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

  const initDataCourse = [
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


  const [ranks, setRanks] = useState(initRanks);
  const [dataCourse, setDataCourse] = useState(initDataCourse);

  return (
    <div className="flex" style={{columnGap: 20}}>
      <div className="w-1/5">
        <Input placeholder="Nhập tên học viên để tìm kiếm"/>
      </div>
      <div className="w-1/5">
        <Select className="w-full" placeholder="Chọn khóa học">
          {dataCourse.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            )
          })}
        </Select>
      </div>
      <div className="w-1/5">
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
      <div className="w-1/5">
        <Button icon={<SearchOutlined/>} className="mr-3" type="primary">Tìm kiếm</Button>
        <Button icon={<UndoOutlined/>} type="primary" danger>Xóa lọc</Button>
      </div>
    </div>
  )
}