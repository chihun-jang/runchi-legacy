module.exports = {
    siteMetadata: {
        title: `벽에 그린 나의 키`,
        description: `특별할 것 없는 일상이 있는 곳입니다.`,
        author: `runchi`,
        siteUrl:'https://runchi.com',
        // icon:'', 내 파비콘의 위치를 작성해주자
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
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 1200,
                            maxHeight: 1200,
                        },
                    },
                    // 아래는 수식을 작성할때 쓸수있는 Latex와 같은 문법들을 붙일수있는 plugin
                    // {
                    //     resolve: `gatsby-remark-katex`,
                    //     options: {
                    //         strict: `ignore`,
                    //     },
                    // },

                    // 아래는 무슨 플러그인인지 찾아봐야겠다.
                    // {
                    //     resolve: `gatsby-remark-images-medium-zoom`,
                    //     options: {
                    //         margin: 36,
                    //         scrollOffset: 0,
                    //     },
                    // },

                    // {
                    //     resolve: `gatsby-remark-responsive-iframe`,
                    //     options: {
                    //         wrapperStyle: `margin-bottom: 1.0725rem`,
                    //     },
                    // },
                   
                   

                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            inlineCodeMarker: "%",
                            showLineNumbers: false,
                        },
                    },
                    // `gatsby-remark-copy-linked-files`,
                    // `gatsby-remark-smartypants`,
                    // `gatsby-remark-autolink-headers`,
                    // `gatsby-remark-emoji`,
                ],
            },
        },

         // GA
        // {
        //     resolve: `gatsby-plugin-google-analytics`,
        //     options: {
        //         trackingId: metaConfig.ga,
        //     },
        // },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        // 이건 다이나믹 head
        `gatsby-plugin-react-helmet`,

        // 파일 인식 플러그인
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,

        //오프라인동작
        `gatsby-plugin-offline`,

        // 사이트맵
        `gatsby-plugin-sitemap`,

        // `gatsby-plugin-sass`,
        // `gatsby-plugin-lodash`,
        // `gatsby-plugin-feed`,


        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
