import React, { useEffect } from 'react'


const src = 'https://utteranc.es/client.js'
const branch = 'master'
// 여기는 댓글플러그인을 구현하기 위한 Script코드
{/* <script src="https://utteranc.es/client.js"
    repo="chihun-jang/runchi"
    issue-term="title"
    label="Comment"
    theme="photon-dark"
    crossorigin="anonymous"
    async>
</script> */}
const Utterences = ({ repo }) => {
    const rootElm = React.createRef()

    useEffect(() => {
        const utterances = document.createElement('script')
        const utterancesConfig = {
            src,
            repo,
            branch,
            theme: "github-light",
            label: 'Comment',
            async: true,
            'issue-term': 'title',
            crossorigin: 'anonymous',
        }

        Object.keys(utterancesConfig).forEach(configKey => {
            utterances.setAttribute(configKey, utterancesConfig[configKey])
        })
        rootElm.current.appendChild(utterances)
    }, [])

    return <div className="utterences" ref={rootElm} />
}

export default Utterences