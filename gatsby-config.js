module.exports = {
    siteMetadata: {
        title: `Runchi-Blog`,
        description: `개발과 생각을 좋아하는 Runchi 블로그`,
        author: `runchi`,
        siteUrl: 'https://runchi.dev',
        image: 'src/images/runchi_icon.jpg',
        meta: [],
        // keyword : ['키워드입력'],
        // comment:{
        //     utterances:'chihun-jang/runchi',
        // },
        // config:{
        //     countOfInitialPost: 10,
        // },
        // share:{
        //     facebookAppId:'',
        // },
        // ga:'',
    },
    plugins: [
        // 파일은 인식해서 사용할수 있게 하기 위함.
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },

        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/src/posts`,
            },
        },

        // 아래는 markdown inline image를 위한 plugin
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        // 마크다운 내부에 쓰는 이미지는 lazy load를 사용할수없다.
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 1200,

                            // 사용방법은 ![alt text](image-name.jpg)
                        },
                    },
                    // 아래는 수식을 작성할때 쓸수있는 Latex와 같은 문법들을 붙일수있는 plugin
                    // {
                    //     resolve: `gatsby-remark-katex`,
                    //     options: {
                    //         strict: `ignore`,
                    //     },
                    // },

                    // iframe responsive
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },

                    // 코드 스타일 지정
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            inlineCodeMarker: '%',
                            showLineNumbers: false,
                        },
                    },

                    // 아래는 " " 와 같은 애들이 인쇄(보여질때) 불확실하게 보여지는 부분을 확실하게 규정
                    {
                        resolve: 'gatsby-remark-smartypants',
                    },
                    // 이거는 마크다운 제목에 id를 자동추가하고 svg아이콘이 포함된 a요소를 클릭하면 자동 링킹
                    'gatsby-remark-autolink-headers',
                ],
            },
        },

        // GA
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: 'UA-164055351-1',
                head: true,
            },
        },

        // 매니페스트를 설정하는 부분
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `runchi-blog`,
                short_name: `runchi`,
                start_url: `/`,
                background_color: `#F5F6F7`,
                theme_color: `#F5F6F7`,
                display: `fullscreen`, // https://web.dev/add-manifest/#display 여기를 참고해보자
                // 아래는 파비콘 아이콘(굳이 사이즈를 안맞춰도 된다)
                icon: `src/images/runchi_icon.jpg`, // This path is relative to the root of the site.
            },
        },

        //오프라인동작(구글 라이브러리 workbox를 사용하고 서비스웤러르 통해서 파일캐싱후에 동작)
        `gatsby-plugin-offline`,

        // 아래는 타이포 그래피 관련 플러그인 그런데 마땅한 타이포그래피가 없어서 일단은 내비두겠다.
        //
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        // 이건 다이나믹 head
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-lodash`,

        // 파일 인식 플러그인
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,

        // 사이트맵
        `gatsby-plugin-sitemap`,

        // `gatsby-plugin-sass`,

        // 아래는 스타일링된 컴포넌트 자체를 만들수있는데 기존의 ClassName으로 style하는거랑 다르게
        // 아예 스타일링이 내장된 컴포넌트를 만드는게 차이점이다.
        //'gatsby-plugin-styled-components'

        // 아래는 유튭이나 stackoverflow 와 같은 곳에서 페이지 로딩시 상단 progressbar 를 표현하는건데
        // 일반적으로 gatsby 에서는 작동할일이없다.. 대신 componentDidMount같은 외부데이터를 사용할때는 필요할수도
        // https://github.com/rstacruz/nprogress/
        // {
        //     resolve: `gatsby-plugin-nprogress`,
        //     options: {
        //         color: `darkorange`,
        //         showSpinner: true,
        //     },
        // },

        // 아래요소는 우리가 지정한 특정위치에 page를 만들어 줄수 있는 플러그인.
        // gatsby-plugin-page-creator
    ],
};
