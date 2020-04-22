import Typography from 'typography'

// 주어진 타이포그래피를 사용하는게 아니라 google fonts 를 추가하고 내가 커스텀 해서 사용하기 위함
const typography = new Typography({
    baseFontSize: "18px",
    baseLineHeight: 1.5,
    googleFonts: [

        {
            name: "Noto Sans KR",
            styles: ["400", "800","1200"],
        },
        {
            name: "Roboto",
            styles: ["400", "800", "1200"],
        },
    ],



})

export const { scale, rhythm, options } = typography
export default typography
