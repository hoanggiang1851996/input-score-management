import React from "react";

export const GeneralPrint = React.forwardRef(({data}, ref) => (
  <div ref={ref} className="print-only">
    <div style={{width: '100%'}}>
      <div className="flex p-4">
        <div style={{ width: '40%', textAlign: 'center' }}>
          <div>Bộ đội Biên phòng Việt Nam</div>
          <b>Trường cao đẳng Biên Phòng</b>

        </div>
        <div>
          <b style={{ fontSize: 20 }}>
            Kết quả điểm lớp 12C - Tiếng Lào Sỹ Quan
          </b>
        </div>
      </div>
      <table className="mt-3 custom-table-print m-auto" ref={ref}>
        <tbody>
        <tr className="font-bold">
          <td rowSpan={2}>STT</td>
          <td rowSpan={2}>Họ và tên</td>
          <td colSpan={data[0].students[0].scores.length} className="text-center">Điểm</td>
          <td>Ghi chú</td>
        </tr>
        <tr className="font-bold">
          {data[0].students[0].scores.map((item) => {
            return (
              <td key={item.id} style={{textAlign: 'center'}}>
                {item.name}
              </td>
            )
          })}
          <td></td>
        </tr>
        {data[0].students.map((item, index) => {
          return (
            <tr key={item.studentId}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              {item.scores.map((score) => {
                return (
                  <td key={score.id}>
                    {score.score}
                  </td>
                )
              })}
              <td>

              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  </div>
));