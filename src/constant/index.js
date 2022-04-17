export const COLORS = {
    primaryColor: '#F2EFEB', // rgba(242, 239, 235, 1)
    secondaryColor: '#DBCFC5',
    textColor: '#0D0D0D',
};

const sizes = {
    mobile: '320px',
    tablet_vertical: '686px', //갤탭 s6 보급형 기준으로 660px까지 떨어지기때문에 테스트후 설정
    tablet_horizontal: '1024px',
    laptop: '1380px',
};

export const DEVICE = {
    mobile: `(min-width: ${sizes.mobile})`,
    tablet_vertical: `(min-width: ${sizes.tablet_vertical})`,
    tablet_horizontal: `(min-width: ${sizes.tablet_horizontal})`,
    laptop: `(min-width: ${sizes.laptop})`,
};
