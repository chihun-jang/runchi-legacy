import Typography from 'typography'
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
