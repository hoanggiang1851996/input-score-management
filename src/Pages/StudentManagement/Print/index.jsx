import React from "react";

export const Print = React.forwardRef(({data}, ref) => (
  <div ref={ref} className="print-only-self">
    <div style={{width: '100%'}} className="page-break">
      <div className="flex p-4">
        <div style={{ width: '50%', textAlign: 'center' }}>
          <div>Bộ đội Biên phòng Việt Nam</div>
          <b>TRƯỜNG CAO ĐẲNG BIÊN PHÒNG</b>

        </div>
        <div style={{ textAlign: 'center' }}>
          <b style={{ fontSize: 14 }}>
            Cộng hòa xã hội chủ nghĩa việt nam
          </b>
          <div style={{ fontSize: 14, fontWeight: 'bold' }}>
            Độc lập - Tự do - Hạnh phúc
          </div>
        </div>
      </div>
      <div className="font-bold text-center" style={{ fontSize: 20 }}>BẢNG ĐIỂM</div>
      <div className="flex p-6">
        <div className="w-[50%] font-bold">
          <div>Họ và tên:</div>
          <div>Sinh năm:</div>
          <div>Quê quán:</div>
        </div>
        <div className="w-[50%] font-bold">
          <div className="uppercase">{data.name}</div>
          <div>{data.dateOfBirth ? data.dateOfBirth : "00/00/0000"}</div>
          <div>{data.address ? data.address : "BG"}</div>
        </div>
      </div>
      <table className="mt-3 custom-table-print w-[94%] m-auto">
        <tbody>
        <tr className="font-bold">
          <td style={{ width: '15%' }}>STT</td>
          <td style={{ width: '30%' }}>Tên môn học</td>
          <td style={{ width: '15%' }}>Số tín chỉ</td>
          <td style={{ width: '20%' }}>Điểm</td>
        </tr>
        {data.scores.length > 0 && data.scores.map((score, index) => {
          return (
            <tr key={`${score.name}${index}`}>
              <td style={{ width: '15%' }}>{index + 1}</td>
              <td style={{ width: '50%' }}>{score.subject}</td>
              <td style={{ width: '15%' }}>{score.number}</td>
              <td style={{ width: '20%' }}>{score.score}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  </div>
));