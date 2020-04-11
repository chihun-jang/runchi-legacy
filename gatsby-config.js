module.exports = {
    siteMetadata: {
        title: `벽에 그린 나의 키`,
        description: `블로그 설명이 들어가는 부분`,
        author: `runchi`,
        siteUrl:'https://runchi.com'
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
                name: `src`,
                path: `${__dirname}/src/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/posts`,
            },
        },

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
                            maxWidth: 400,
                            maxHeight: 400,
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            inlineCodeMarker: "%",
                            showLineNumbers: false,
                        },
                    },
                ],
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
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
