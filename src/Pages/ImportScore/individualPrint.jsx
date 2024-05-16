import React from "react";

export const IndividualPrint = React.forwardRef(({data}, ref) => (
  <div ref={ref} className="print-only-self">
    {console.log(data)}
    {data.length > 0 && data.map((item, index) => {
      return (
        <div key={index} style={{width: '100%'}} className="page-break">
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
          <div className="font-bold text-center" style={{ fontSize: 20 }}>PHIẾU ĐIỂM</div>
          <div className="flex p-6">
            <div className="w-[50%] font-bold">
              <div>Họ và tên:</div>
              <div>Sinh năm:</div>
              <div>Quê quán:</div>
              <div>Lớp:</div>
            </div>
            <div className="w-[50%] font-bold">
              <div className="uppercase">{item.name}</div>
              <div>{item.birthDay ? item.birthDay : "00/00/0000"}</div>
              <div>{item.hometown ? item.hometown : "BG"}</div>
              <div>CNTT</div>
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
            {item.scores.map((score, index) => {
              return (
                <tr key={`${score.name}${index}`}>
                  <td style={{ width: '15%' }}>{index + 1}</td>
                  <td style={{ width: '50%' }}>{score.name}</td>
                  <td style={{ width: '15%' }}>2</td>
                  <td style={{ width: '20%' }}>{score.score}</td>
                </tr>
              )
            })}
            </tbody>
          </table>

          <div className="flex w-[94%] m-auto mt-6">
            <div className="w-[50%]">
              <div>Điểm trung bình các học phần</div>
              <div>Điểm trung bình thi cuối kỳ</div>
              <div>Điểm trung bình toàn khóa</div>
              <div>Xếp loại rèn luyện toàn khóa</div>
              <div>Xếp loại tốt nghiệp</div>
            </div>
            <div className="font-bold">
              <div>7,2</div>
              <div>7,2</div>
              <div>7,2</div>
              <div>Tốt</div>
              <div>Khá</div>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
           <div className="w-[40%] text-center">
             <div className="italic">Bắc Giang, Ngày ... tháng ... năm ....</div>
             <div className="font-bold">Hiệu trưởng</div>
           </div>
          </div>
        </div>
      )
    })}
  </div>
));