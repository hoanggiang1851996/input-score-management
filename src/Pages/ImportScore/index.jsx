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
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);

    const dataWidth = data[0].students[0].scores.length; // Number of smaller score columns

    const cols = [
      { wch: 5 },  // STT column
      { wch: 5 },  // STT column
      { wch: 20 }, // Họ và Tên column
    ];

    // Add "Điểm tổng kết môn học" column multiple times
    for (let i = 0; i < dataWidth; i++) {
      cols.push({ wch: 5 });
    }

    // Add remaining columns
    cols.push(
      { wch: 5 },  // TB column
      { wch: 20 }, // Ghi chú column
      // Add more widths for additional columns as needed
    );

    ws['!cols'] = cols;
    const cellRef = position;
    const range = XLSX.utils.decode_range(cellRef);
    let startRow = range.s.r;

    const headerRow1 = [
      { v: 'STT', s: { font: { bold: true }, alignment: { horizontal: 'center', vertical: 'center' } } },
      { v: 'Họ và Tên', s: { font: { bold: true }, alignment: { horizontal: 'center', vertical: 'center' } } },
      { v: 'Điểm tổng kết môn học', s: { font: { bold: true }, alignment: { horizontal: 'center', vertical: 'center' } } },
      { v: 'TB', s: { font: { bold: true }, alignment: { horizontal: 'center', vertical: 'center' } } },
      { v: 'Ghi chú', s: { font: { bold: true }, alignment: { horizontal: 'center', vertical: 'center' } } }
    ];

    const scoreNamesRow = [
      '',
      '',
      ...data[0].students[0].scores.map((score) => ({
        v: score.name,
        s: { font: { bold: true }, alignment: { horizontal: 'center', vertical: 'center' } }
      })),
      '',
      '',
    ];

    XLSX.utils.sheet_add_aoa(ws, [headerRow1, scoreNamesRow], { origin: { r: startRow, c: range.s.c } });

    const sttMerge = { s: { r: range.s.r, c: range.s.c }, e: { r: range.s.r + 1, c: range.s.c } };
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push(sttMerge);

    const nameMerge = { s: { r: range.s.r, c: range.s.c + 1 }, e: { r: range.s.r + 1, c: range.s.c + 1 } };
    ws['!merges'].push(nameMerge);

    const scoreMergeEnd = range.s.c + data[0].students[0].scores.length - 1;
    const scoreMerge = { s: { r: startRow, c: range.s.c + 2 }, e: { r: startRow, c: scoreMergeEnd + 2 } };
    ws['!merges'].push(scoreMerge);

    const tbMerge = { s: { r: range.s.r, c: scoreMergeEnd + 3 }, e: { r: range.s.r + 1, c: scoreMergeEnd + 3 } };
    ws['!merges'].push(tbMerge);

    const noteMerge = { s: { r: range.s.r, c: scoreMergeEnd + 4 }, e: { r: range.s.r + 1, c: scoreMergeEnd + 4 } };
    ws['!merges'].push(noteMerge);

    startRow += 2;

    data[0].students.forEach((student, index) => {
      const studentInfo = [index + 1, student.name];
      const scores = [];
      let totalScore = 0;

      student.scores.forEach((score) => {
        scores.push(score.score);
        totalScore += score.score;
      });

      const averageFormula = `SUM(${XLSX.utils.encode_cell({
        r: startRow,
        c: range.s.c + 2,
      })}:${XLSX.utils.encode_cell({
        r: startRow,
        c: range.s.c + 1 + student.scores.length,
      })})/${student.scores.length}`;

      const note = 'Example note'; // You can replace this with actual notes if available
      const row = [...studentInfo, ...scores, { f: averageFormula, s: { alignment: { horizontal: 'center' }, font: { bold: true } } }, { v: note, s: { alignment: { horizontal: 'center' } } }];
      XLSX.utils.sheet_add_aoa(ws, [row], { origin: { r: startRow, c: range.s.c } });
      startRow++;
    });

    ws[XLSX.utils.encode_cell({ r: range.s.r, c: scoreMergeEnd + 3 })] = { v: 'TB', s: { font: { bold: true }, alignment: { horizontal: 'center' } } };
    ws[XLSX.utils.encode_cell({ r: range.s.r, c: scoreMergeEnd + 4 })] = { v: 'Ghi chú', s: { font: { bold: true }, alignment: { horizontal: 'center' } } };

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <Button type="primary" icon={<FileExcelOutlined/>} onClick={() => handleExport('student_scores.xlsx', 'B2')}>Xuất
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
