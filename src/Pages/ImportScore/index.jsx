import { useState, useRef } from 'react'
import {Button, Checkbox, Input, InputNumber, message, Select} from "antd";
import {EditOutlined, SaveOutlined, PrinterOutlined, FileExcelOutlined} from "@ant-design/icons";
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

  const handleExport = () => {
    const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.aoa_to_sheet([])

		// Định vị ô cần thêm dữ liệu
		const cellRef = position // Ví dụ: 'B2'

		// Lấy hàng và cột từ cellRef
		const range = XLSX.utils.decode_range(cellRef)

		// Tính toán vị trí bắt đầu thêm dữ liệu
		let startRow = range.s.r

		// Thêm header cho dòng 1
		const headerRow1 = [
			{ v: 'Student ID', s: { font: { bold: true } } },
			{ v: 'Name', s: { font: { bold: true } } },
			{
				v: 'Score',
				s: {
					font: { bold: true },
					alignment: { horizontal: 'center' },
					colspan: data[0].students[0].scores.length
				}
			},
			'', // Thêm một ô trống để cách cột "Score" và "Average"
			{ v: 'Average', s: { font: { bold: true } } } // Thêm header "Average"
		]

		// Tạo một mảng chứa các tên điểm
		const scoreNamesRow = [
			'',
			'',
			...data[0].students[0].scores.map((score) => score.name),
			''
		]

		// Thêm dòng score names vào sau headerRow1
		XLSX.utils.sheet_add_aoa(ws, [headerRow1, scoreNamesRow], {
			origin: { r: startRow, c: range.s.c }
		})

		// Merge ô Score
		const scoreMergeEnd = range.s.c + data[0].students[0].scores.length - 1
		const merge = {
			s: { r: startRow, c: range.s.c + 2 },
			e: { r: startRow, c: scoreMergeEnd + 2 }
		}
		if (!ws['!merges']) ws['!merges'] = []
		ws['!merges'].push(merge)

		// Bắt đầu từ dòng tiếp theo sau dòng score names
		startRow += 2

		// Thêm dữ liệu sinh viên và tính trung bình
		data[0].students.forEach((student) => {
			const studentInfo = [student.studentId, student.name]
			const scores = []
			let totalScore = 0 // Tính tổng điểm để tính trung bình
			student.scores.forEach((score) => {
				scores.push(score.score)
				totalScore += score.score
			})
			const averageFormula = `SUM(${XLSX.utils.encode_cell({
				r: startRow,
				c: range.s.c + 2
			})}:${XLSX.utils.encode_cell({
				r: startRow,
				c: range.s.c + 1 + student.scores.length
			})})/${student.scores.length}` // Tạo công thức SUM tương ứng
			const row = [...studentInfo, ...scores, { f: averageFormula }] // Thêm công thức trung bình vào dòng dữ liệu
			XLSX.utils.sheet_add_aoa(ws, [row], {
				origin: { r: startRow, c: range.s.c }
			})
			startRow++
		})

		// Ghi sheet vào workbook
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

		// Xuất file Excel
		const excelBuffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
		const blob = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		})
		const url = window.URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', fileName)
		document.body.appendChild(link)
		link.click()
		console.log(link)
		document.body.removeChild(link)
  }
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
          <Button type="primary" icon={<EditOutlined />} onClick={() => setIsEdit(true)}>Chỉnh sửa</Button>
        ) : (
          <Button type="primary" loading={loading} icon={<SaveOutlined />} onClick={saveTable}>Lưu</Button>
        )}
      </span>
      <Button type="primary" className="mr-3" icon={<PrinterOutlined />} onClick={handlePrint}>In tổng hợp</Button>
      <Button type="primary" className="mr-3" icon={<PrinterOutlined />} onClick={() => {
        if (checked.length === 0) {
          message.warning("Vui lòng chọn học sinh để in.");
          return;
        }
        handlePrintIndividual();
      }}>In cá nhân</Button>
      <Button type="primary" icon={<FileExcelOutlined />} onClick={() => handleExport(data, 'student_scores.xlsx', 'B2')}>Xuất excel</Button>
      <table className="mt-3 custom-table text-center">
        <thead>
        <th>
          <Checkbox checked={data[0].students.length === checked.length} onChange={(e) => {
            if (e.target.checked) {
              setChecked(data[0].students.map((item, index) => index));
            } else {
              setChecked([]);
            }
          }} />
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
                <td key={item.id} style={{ textAlign: 'center' }}>
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
              <td key={item.id} style={{ textAlign: 'center' }}>
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
                }} />
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
                  <Input />
                ) : <span>Note</span>}
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>

      <GeneralPrint ref={componentRef} data={data} />
      <IndividualPrint ref={componentIndividualRef} data={checked.map((item) => data[0].students[item])} />
    </div>
  )
}
