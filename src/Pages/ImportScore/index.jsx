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
    const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.aoa_to_sheet([])

		const dataWidth = data[0].students[0].scores.length // Number of smaller score columns

		const cols = [
			{ wch: 5 }, // STT column
			{ wch: 20 } // Họ và Tên column
		]

		// Add "Điểm tổng kết môn học" column multiple times
		for (let i = 0; i < dataWidth; i++) {
			cols.push({ wch: 5 })
		}

		// Add remaining columns
		cols.push(
			{ wch: 5 }, // TB column
			{ wch: 20 }, // Ghi chú column
			{ wch: 20 } // Ghi chú column
			// Add more widths for additional columns as needed
		)

		ws['!cols'] = cols
		const cellRef = position
		const range = XLSX.utils.decode_range(cellRef)
		let startRow = range.s.r

		const headerTitle = [
			{
				v: 'Bộ đội biên phòng',
				s: {
					alignment: { horizontal: 'center', vertical: 'center' }
				}
			}
		]

		XLSX.utils.sheet_add_aoa(ws, [headerTitle], {
			origin: { r: 0, c: 0 }
		})

		const headerTitle2 = [
			{
				v: 'Kết quả học tập lớp 12C - tiếng Lào sỹ quan',
				s: {
					font: { bold: true, size: 16 },
					alignment: { horizontal: 'center', vertical: 'center' }
				}
			}
		]

		XLSX.utils.sheet_add_aoa(ws, [headerTitle2], {
			origin: { r: 0, c: 2 }
		})

		XLSX.utils.sheet_add_aoa(ws, [headerTitle], {
			origin: { r: 0, c: 0 }
		})

		ws['!merges'] = []

		const headerTitleLine2 = [
			{
				v: 'Trường cao đẳng Biên Phòng',
				s: {
					font: { bold: true },
					alignment: { horizontal: 'center', vertical: 'center' }
				}
			}
		]

		XLSX.utils.sheet_add_aoa(ws, [headerTitleLine2], {
			origin: { r: 1, c: 0 }
		})

		ws['!merges'] = [
			{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
			{
				s: { r: 0, c: 2 },
				e: { r: 0, c: 3 + data[0].students[0].scores.length }
			},
			{ s: { r: 1, c: 0 }, e: { r: 1, c: 1 } }
		]

		const headerRow1 = [
			{
				v: 'STT',
				s: {
					font: { bold: true },
					alignment: { horizontal: 'center', vertical: 'center' }
				}
			},
			{
				v: 'Họ và Tên',
				s: {
					font: { bold: true },
					alignment: { horizontal: 'center', vertical: 'center' }
				}
			},
			{
				v: 'Điểm tổng kết môn học',
				s: {
					font: { bold: true },
					alignment: { horizontal: 'center', vertical: 'center' }
				}
			},
			{
				v: 'TB',
				s: {
					font: { bold: true },
					alignment: { horizontal: 'center', vertical: 'center' }
				}
			},
			{
				v: 'Xếp loại',
				s: {
					font: { bold: true },
					alignment: { horizontal: 'center', vertical: 'center' }
				}
			},
			{
				v: 'Ghi chú',
				s: {
					font: { bold: true },
					alignment: { horizontal: 'center', vertical: 'center' }
				}
			}
		]

		const scoreNamesRow = [
			'',
			'',
			...data[0].students[0].scores.map((score) => ({
				v: score.name,
				s: {
					font: { bold: true },
					alignment: { horizontal: 'center', vertical: 'center' }
				}
			})),
			'',
			''
		]

		const creditCodeRow = [
			'',
			'',
			...data[0].students[0].scores.map((score) => score.credit),
			{
				f: `SUM(${XLSX.utils.encode_cell({
					r: startRow + 2,
					c: range.s.c + 2
				})}:${XLSX.utils.encode_cell({
					r: startRow + 2,
					c: range.s.c + 1 + data[0].students[0].scores.length
				})})`,
				s: {
					font: { bold: true },
					alignment: { horizontal: 'center', vertical: 'center' }
				}
			},
			''
		]

		XLSX.utils.sheet_add_aoa(
			ws,
			[headerRow1, scoreNamesRow, creditCodeRow],
			{
				origin: { r: startRow, c: range.s.c }
			}
		)

		const sttMerge = {
			s: { r: range.s.r, c: range.s.c },
			e: { r: range.s.r + 2, c: range.s.c }
		}
		if (!ws['!merges']) ws['!merges'] = []
		ws['!merges'].push(sttMerge)

		const nameMerge = {
			s: { r: range.s.r, c: range.s.c + 1 },
			e: { r: range.s.r + 2, c: range.s.c + 1 }
		}
		ws['!merges'].push(nameMerge)

		const scoreMergeEnd = range.s.c + data[0].students[0].scores.length - 1
		const scoreMerge = {
			s: { r: startRow, c: range.s.c + 2 },
			e: { r: startRow, c: scoreMergeEnd + 2 }
		}
		ws['!merges'].push(scoreMerge)

		const tbMerge = {
			s: { r: range.s.r, c: scoreMergeEnd + 3 },
			e: { r: range.s.r + 1, c: scoreMergeEnd + 3 }
		}
		ws['!merges'].push(tbMerge)

		const rankMerge = {
			s: { r: range.s.r, c: scoreMergeEnd + 4 },
			e: { r: range.s.r + 2, c: scoreMergeEnd + 4 }
		}
		ws['!merges'].push(rankMerge)

		const noteMerge = {
			s: { r: range.s.r, c: scoreMergeEnd + 5 },
			e: { r: range.s.r + 2, c: scoreMergeEnd + 5 }
		}
		ws['!merges'].push(noteMerge)

		startRow += 3

		data[0].students.forEach((student, index) => {
			let dataSum = ''
			const studentInfo = [index + 1, student.name]
			const scores = []
			let totalScore = 0

			student.scores.forEach((score) => {
				scores.push(score.score)
				totalScore += score.score
			})

			student.scores.forEach((item, indexScore) => {
				dataSum =
					dataSum +
					`${XLSX.utils.encode_cell({
						r: startRow,
						c: range.s.c + 2 + indexScore
					})}*${XLSX.utils.encode_cell({
						r: startRow - index - 1,
						c: range.s.c + 2 + indexScore
					})}${indexScore !== student.scores.length - 1 ? ',' : ''} `
			})

			const averageFormula = `ROUND(SUM(${dataSum})/${XLSX.utils.encode_cell(
				{
					r: startRow - index - 1,
					c: range.s.c + 2 + student.scores.length
				}
			)}, 1)`

			const row = [
				...studentInfo,
				...scores,
				{
					f: averageFormula,
					s: {
						alignment: { horizontal: 'center' },
						font: { bold: true }
					}
				},
				{
					v: student.rank,
					s: { alignment: { horizontal: 'center' } }
				},
				{ v: student.note, s: { alignment: { horizontal: 'center' } } }
			]
			XLSX.utils.sheet_add_aoa(ws, [row], {
				origin: { r: startRow, c: range.s.c }
			})
			startRow++
		})

		ws[XLSX.utils.encode_cell({ r: range.s.r, c: scoreMergeEnd + 3 })] = {
			v: 'TB',
			s: { font: { bold: true }, alignment: { horizontal: 'center' } }
		}
		ws[XLSX.utils.encode_cell({ r: range.s.r, c: scoreMergeEnd + 4 })] = {
			v: 'Rank',
			s: { font: { bold: true }, alignment: { horizontal: 'center' } }
		}
		ws[XLSX.utils.encode_cell({ r: range.s.r, c: scoreMergeEnd + 5 })] = {
			v: 'Ghi chú',
			s: { font: { bold: true }, alignment: { horizontal: 'center' } }
		}

		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

		const excelBuffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
		const blob = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		})
		const url = window.URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', fileName)
		document.body.appendChild(link)
		console.log(link)
		link.click()
		document.body.removeChild(link)
  };

	const exportExcelIndividual = (fileName, dataExcel) => {
		const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.aoa_to_sheet([])

		let startRow = 0
		ws['!merges'] = []
    dataExcel.forEach((student) => {
			const headerTitle = [
				{
					v: 'Bộ đội biên phòng',
					s: {
						alignment: {
							horizontal: 'center',
							vertical: 'center'
						}
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [headerTitle], {
				origin: { r: 0 + startRow, c: 0 }
			})

			const headerTitleRight = [
				{
					v: 'Cộng hòa xã hội chủ nghĩa Việt Nam',
					s: {
						font: { bold: true },
						alignment: {
							horizontal: 'center',
							vertical: 'center'
						}
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [headerTitleRight], {
				origin: { r: 0 + startRow, c: 4 }
			})

			const headerTitleLine2 = [
				{
					v: 'TRƯỜNG CAO ĐẲNG BIÊN PHÒNG',
					s: {
						font: { bold: true },
						alignment: {
							horizontal: 'center',
							vertical: 'center'
						}
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [headerTitleLine2], {
				origin: { r: 1 + startRow, c: 0 }
			})

			const headerTitleLine2Right = [
				{
					v: 'Độc lập - Tự do - Hạnh phúc',
					s: {
						font: { bold: true },
						alignment: {
							horizontal: 'center',
							vertical: 'center'
						}
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [headerTitleLine2Right], {
				origin: { r: 1 + startRow, c: 4 }
			})

			ws['!merges'].push({
				s: { r: 0 + startRow, c: 0 },
				e: { r: 0 + startRow, c: 3 }
			})
			ws['!merges'].push({
				s: { r: 1 + startRow, c: 0 },
				e: { r: 1 + startRow, c: 3 }
			})
			ws['!merges'].push({
				s: { r: 0 + startRow, c: 4 },
				e: { r: 0 + startRow, c: 8 }
			})
			ws['!merges'].push({
				s: { r: 1 + startRow, c: 4 },
				e: { r: 1 + startRow, c: 8 }
			})

			const recordScore = [
				{
					v: 'PHIẾU ĐIỂM',
					s: {
						font: { bold: true },
						alignment: {
							horizontal: 'center',
							vertical: 'center'
						}
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [recordScore], {
				origin: { r: 5 + startRow, c: 0 }
			})

			ws['!merges'].push({
				s: { r: 5 + startRow, c: 0 },
				e: { r: 5 + startRow, c: 8 }
			})

			//name

			const nameTitle = [
				{
					v: 'Họ và tên',
					s: {
						font: { bold: true }
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [nameTitle], {
				origin: { r: 7 + startRow, c: 1 }
			})

			ws['!merges'].push({
				s: { r: 7 + startRow, c: 1 },
				e: { r: 7 + startRow, c: 3 }
			})

			const name = [
				{
					v: student.name.toUpperCase(),
					s: {
						font: { bold: true }
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [name], {
				origin: { r: 7 + startRow, c: 4 }
			})

			ws['!merges'].push({
				s: { r: 7 + startRow, c: 4 },
				e: { r: 7 + startRow, c: 8 }
			})

			//bd

			const bdTitle = [
				{
					v: 'Ngày sinh',
					s: {
						font: { bold: true }
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [bdTitle], {
				origin: { r: 8 + startRow, c: 1 }
			})

			ws['!merges'].push({
				s: { r: 8 + startRow, c: 1 },
				e: { r: 8 + startRow, c: 3 }
			})

			const bd = [
				{
					v: 'fake',
					s: {
						font: { bold: true }
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [bd], {
				origin: { r: 8 + startRow, c: 4 }
			})

			ws['!merges'].push({
				s: { r: 8 + startRow, c: 4 },
				e: { r: 8 + startRow, c: 8 }
			})

			//que

			const queTitle = [
				{
					v: 'Quê quán',
					s: {
						font: { bold: true }
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [queTitle], {
				origin: { r: 9 + startRow, c: 1 }
			})

			ws['!merges'].push({
				s: { r: 9 + startRow, c: 1 },
				e: { r: 9 + startRow, c: 3 }
			})

			const que = [
				{
					v: 'BG',
					s: {
						font: { bold: true }
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [que], {
				origin: { r: 9 + startRow, c: 4 }
			})

			ws['!merges'].push({
				s: { r: 9 + startRow, c: 4 },
				e: { r: 9 + startRow, c: 8 }
			})

			//clazz

			const clazzTitle = [
				{
					v: 'Lớp học viên',
					s: {
						font: { bold: true }
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [clazzTitle], {
				origin: { r: 10 + startRow, c: 1 }
			})

			ws['!merges'].push({
				s: { r: 10 + startRow, c: 1 },
				e: { r: 10 + startRow, c: 3 }
			})

			const clazz = [
				{
					v: 'Khóa',
					s: {
						font: { bold: true }
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [clazz], {
				origin: { r: 10 + startRow, c: 4 }
			})

			ws['!merges'].push({
				s: { r: 10 + startRow, c: 4 },
				e: { r: 10 + startRow, c: 8 }
			})

			//

			const border = {
				top: { style: 'thin', color: { rgb: '000000' } }, // Đường viền trên (thin = mảnh)
				bottom: { style: 'thin', color: { rgb: '000000' } }, // Đường viền dưới
				left: { style: 'thin', color: { rgb: '000000' } }, // Đường viền trái
				right: { style: 'thin', color: { rgb: '000000' } } // Đường viền phải
			}

			const headerRow1 = [
				{
					v: 'STT',
					s: {
						font: { bold: true },
						alignment: {
							horizontal: 'center',
							vertical: 'center'
						},
						border
					}
				},
				{
					v: 'Tên môn học',
					s: {
						font: { bold: true },
						alignment: {
							horizontal: 'center',
							vertical: 'center'
						},
						border
					}
				}
			]

			ws['!merges'].push({
				s: { r: 12 + startRow, c: 1 },
				e: { r: 12 + startRow, c: 6 }
			})

			XLSX.utils.sheet_add_aoa(ws, [headerRow1], {
				origin: { r: 12 + startRow, c: 0 }
			})

			const headerRow2 = [
				{
					v: 'Số tín chỉ',
					s: {
						font: { bold: true },
						alignment: {
							horizontal: 'center',
							vertical: 'center'
						},
						border
					}
				},
				{
					v: 'Điểm',
					s: {
						font: { bold: true },
						alignment: {
							horizontal: 'center',
							vertical: 'center'
						},
						border
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [headerRow2], {
				origin: { r: 12 + startRow, c: 7 }
			})

			student.scores.forEach((item, index) => {
				const scoreRow = [
					{
						v: index + 1,
						s: {
							alignment: {
								horizontal: 'center',
								vertical: 'center'
							},
							border
						}
					},
					{
						v: item.name,
						s: {
							border
						}
					}
				]

				XLSX.utils.sheet_add_aoa(ws, [scoreRow], {
					origin: { r: 12 + startRow + index + 1, c: 0 }
				})

				ws['!merges'].push({
					s: { r: 12 + startRow + index + 1, c: 1 },
					e: { r: 12 + startRow + index + 1, c: 6 }
				})

				const scoreRow2 = [
					{
						v: item.credit,
						s: {
							alignment: {
								horizontal: 'center',
								vertical: 'center'
							},
							border
						}
					},
					{
						v: item.score,
						s: {
							font: { bold: true },
							alignment: {
								horizontal: 'center',
								vertical: 'center'
							},
							border
						}
					}
				]

				XLSX.utils.sheet_add_aoa(ws, [scoreRow2], {
					origin: { r: 12 + startRow + index + 1, c: 7 }
				})
			})

			// Áp dụng đường viền cho toàn bộ vùng merge
			for (
				let r = 12 + startRow;
				r <= 12 + startRow + student.scores.length;
				r++
			) {
				for (let c = 1; c <= 9; c++) {
					const cellAddress = XLSX.utils.encode_cell({ r: r, c: c })
					if (!ws[cellAddress]) {
						ws[cellAddress] = { v: '' } // Khởi tạo ô nếu chưa tồn tại
					}
					if (!ws[cellAddress].s) {
						ws[cellAddress].s = {} // Khởi tạo style nếu chưa tồn tại
					}
					if (!ws[cellAddress].s.border) {
						ws[cellAddress].s.border = {} // Khởi tạo border nếu chưa tồn tại
					}
					// Thiết lập border cho ô
					ws[cellAddress].s.border = border
				}
			}

			//result1

			const resultTitle1 = [
				{
					v: 'Điểm trung bình của học phần'
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [resultTitle1], {
				origin: { r: 14 + startRow + student.scores.length, c: 1 }
			})

			ws['!merges'].push({
				s: { r: 14 + startRow + student.scores.length, c: 1 },
				e: { r: 14 + startRow + student.scores.length, c: 3 }
			})

			const result1 = [
				{
					v: 'Fake'
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [result1], {
				origin: { r: 14 + startRow + student.scores.length, c: 6 }
			})

			//result2

			const resultTitle2 = [
				{
					v: 'Điểm trung bình thi cuối khóa'
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [resultTitle2], {
				origin: { r: 15 + startRow + student.scores.length, c: 1 }
			})

			ws['!merges'].push({
				s: { r: 15 + startRow + student.scores.length, c: 1 },
				e: { r: 15 + startRow + student.scores.length, c: 3 }
			})

			const result2 = [
				{
					v: 'Fake'
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [result2], {
				origin: { r: 15 + startRow + student.scores.length, c: 6 }
			})
			//result3

			const resultTitle3 = [
				{
					v: 'Điểm trung bình của toàn khóa'
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [resultTitle3], {
				origin: { r: 16 + startRow + student.scores.length, c: 1 }
			})

			ws['!merges'].push({
				s: { r: 16 + startRow + student.scores.length, c: 1 },
				e: { r: 16 + startRow + student.scores.length, c: 3 }
			})

			const result3 = [
				{
					v: 'Fake'
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [result3], {
				origin: { r: 16 + startRow + student.scores.length, c: 6 }
			})

			//result4

			const resultTitle4 = [
				{
					v: 'Xếp loại tốt nghiệp'
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [resultTitle4], {
				origin: { r: 17 + startRow + student.scores.length, c: 1 }
			})

			ws['!merges'].push({
				s: { r: 17 + startRow + student.scores.length, c: 1 },
				e: { r: 17 + startRow + student.scores.length, c: 3 }
			})

			const result4 = [
				{
					v: 'Fake'
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [result4], {
				origin: { r: 17 + startRow + student.scores.length, c: 6 }
			})

			const signAddress = [
				{
					v: 'Bắc Giang, ngày    tháng    năm',
					s: {
						font: { italic: true },
            alignment: {
              horizontal: 'center',
              vertical: 'center'
            }
					},

				}
			]

			XLSX.utils.sheet_add_aoa(ws, [signAddress], {
				origin: { r: 20 + startRow + student.scores.length, c: 6 }
			})

			ws['!merges'].push({
				s: { r: 20 + startRow + student.scores.length, c: 6 },
				e: { r: 20 + startRow + student.scores.length, c: 8 }
			})

			const sign = [
				{
					v: 'Hiệu trưởng',
					s: {
						font: { bold: true },
						alignment: {
							horizontal: 'center',
							vertical: 'center'
						}
					}
				}
			]

			XLSX.utils.sheet_add_aoa(ws, [sign], {
				origin: { r: 21 + startRow + student.scores.length, c: 6 }
			})

			ws['!merges'].push({
				s: { r: 21 + startRow + student.scores.length, c: 6 },
				e: { r: 21 + startRow + student.scores.length, c: 8 }
			})

			startRow = startRow + 50
		})

		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

		const excelBuffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
		const blob = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		})
		const url = window.URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', fileName)
		document.body.appendChild(link)
		console.log(link)
		link.click()
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
      <Button className="mr-3" type="primary" icon={<FileExcelOutlined/>} onClick={() => handleExport('student_scores.xlsx', 'A4')}>Xuất
        excel</Button>
	<Button className="mr-3" type="primary" icon={<FileExcelOutlined/>} onClick={() => {
    if (checked.length === 0) {
      message.warning("Vui lòng chọn học sinh để in.");
      return;
    }
    exportExcelIndividual('student_scores.xlsx', checked.map((item) => data[0].students[item]))
  }}>Xuất
        excel cá nhân</Button>
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
        <th>Xếp loại</th>
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
          <td></td>
        </tr>

        <tr className="font-bold">
          <td></td>
          <td></td>
          <td></td>
          {data[0].students[0].scores.map((item) => {
            return (
              <td key={item.id} style={{textAlign: 'center'}}>
                {item.credit}
              </td>
            )
          })}
          {data[0].students[0].scores.reduce((acc, score) => {
            return acc + score.credit;
          }, 0)}
          <td></td>
          <td></td>
        </tr>
        {data[0].students.map((item, index) => {
          let total = 0;
          let totalCredit = 0;

          item.scores.forEach((score) => {
            total = total + score.score * score.credit
            totalCredit = totalCredit + score.credit
          });

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
                {(total / totalCredit).toFixed(1)}
              </td>
              <td>
                {isEdit ? (
                  <Input value={item.rank}
                         onChange={(e) => {
                           const newData = [...data]

                           newData[0].students[index].rank = e.target.value;
                           setData(newData);
                         }} />
                ) : <span>{item.rank}</span>}
              </td>
              <td>
                {isEdit ? (
                  <Input value={item.note}
                         onChange={(e) => {
                           const newData = [...data]

                           newData[0].students[index].note = e.target.value;
                           setData(newData);
                         }} />
                ) : <span>{item.note}</span>}
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
