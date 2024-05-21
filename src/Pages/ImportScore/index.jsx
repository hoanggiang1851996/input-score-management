import {useRef, useState} from 'react'
import * as XLSX from 'xlsx-js-style';
import {Button, Checkbox, Input, InputNumber, message, Select} from "antd";
import {EditOutlined, FileExcelOutlined, PrinterOutlined, SaveOutlined} from "@ant-design/icons";
import {initData} from "./fakeData.jsx";
import {useReactToPrint} from "react-to-print";
import {GeneralPrint} from "./generalPrint.jsx";
import {IndividualPrint} from "./individualPrint.jsx";

export const ImportScore = () => {
  const [data, setData] = useState(initData);
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState([])
  const componentRef = useRef();
  const componentIndividualRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrintIndividual = useReactToPrint({
    content: () => componentIndividualRef.current,
  });

  const convertDataSend = (raw) => {
    return raw.map(classData => ({
      classId: classData.classId,
      students: classData.students.map(student => ({
        studentId: student.studentId,
        scores: student.scores.reduce((acc, score) => {
          acc[score.scoreId] = score.score;
          return acc;
        }, {})
      }))
    }));
  }

  const saveTable = () => {
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Lưu thông tin thành công");
      setIsEdit(false);
    }, 1000)
    const convertedDataSend = convertDataSend(data);
    console.log(convertedDataSend, 'data send')
  };

  const handleExport = (fileName, position) => {
    https://codedamn.com/problem/VMQ1SGlrIMCv3AYs5xpB-?previous=%2Fproblems%3Fpage%3D1
  };

  return (
    <div>
      <Select className="w-[200px] mr-3" placeholder="Chọn lớp">
        <Select.Option value="1">
          Lớp 1
        </Select.Option>
        <Select.Option value="2">
          Lớp 2
        </Select.Option>
      </Select>
      <span className="mr-3">
        {!isEdit ? (
          <Button type="primary" icon={<EditOutlined/>} onClick={() => setIsEdit(true)}>Chỉnh sửa</Button>
        ) : (
          <Button type="primary" loading={loading} icon={<SaveOutlined/>} onClick={saveTable}>Lưu</Button>
        )}
      </span>
      <Button type="primary" className="mr-3" icon={<PrinterOutlined/>} onClick={handlePrint}>In tổng hợp</Button>
      <Button type="primary" className="mr-3" icon={<PrinterOutlined/>} onClick={() => {
        if (checked.length === 0) {
          message.warning("Vui lòng chọn học sinh để in.");
          return;
        }
        handlePrintIndividual();
      }}>In cá nhân</Button>
      <Button type="primary" icon={<FileExcelOutlined/>} onClick={() => handleExport('student_scores.xlsx', 'A4')}>Xuất
        excel</Button>
      <table className="mt-3 custom-table text-center">
        <thead>
        <th>
          <Checkbox checked={data[0].students.length === checked.length} onChange={(e) => {
            if (e.target.checked) {
              setChecked(data[0].students.map((item, index) => index));
            } else {
              setChecked([]);
            }
          }}/>
        </th>
        <th>STT</th>
        <th>Họ và tên</th>
        <th colSpan={data[0].students[0].scores.length + 1}>Điểm</th>
        <th>Ghi chú</th>
        </thead>
        <tbody>
        <tr className="font-bold">
          <td></td>
          <td></td>
          <td></td>
          {data[0].students[0].scores.map((item) => {
            return (
              <>
                <td key={item.id} style={{textAlign: 'center'}}>
                  {item.name}
                </td>
              </>
            )
          })}
          <td>
            Điểm TB
          </td>
          <td></td>
        </tr>
        <tr className="font-bold">
          <td></td>
          <td></td>
          <td></td>
          {data[0].students[0].scores.map((item) => {
            return (
              <td key={item.id} style={{textAlign: 'center'}}>
                {item.scoreId}
              </td>
            )
          })}
          <td>27</td>
          <td></td>
        </tr>
        {data[0].students.map((item, index) => {
          return (
            <tr key={item.studentId}>
              <td>
                <Checkbox checked={checked.indexOf(index) !== -1} onChange={(e) => {
                  if (e.target.checked) {
                    setChecked([...checked, index]);
                  } else {
                    const newChecked = [...checked];
                    console.log(newChecked)
                    setChecked(newChecked.filter((item) => item !== index));
                  }
                }}/>
              </td>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              {item.scores.map((score, scoreIndex) => {
                return (
                  <td key={score.id}>
                    {isEdit ? (
                      <InputNumber
                        style={{width: 50}}
                        value={score.score}
                        onChange={(e) => {
                          const newData = [...data]

                          newData[0].students[index].scores[scoreIndex].score = e;
                          setData(newData);
                        }}
                      />
                    ) : (
                      <div style={{width: 50, padding: '6px 12px'}}>{score.score}</div>
                    )}
                  </td>
                )
              })}
              <td>
                1
              </td>
              <td>
                {isEdit ? (
                  <Input/>
                ) : <span>Note</span>}
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>

      <GeneralPrint ref={componentRef} data={data}/>
      <IndividualPrint ref={componentIndividualRef} data={checked.map((item) => data[0].students[item])}/>
    </div>
  )
}
