---
title: 'React 이중 조건부랜더링'
date: '2020-09-05'
category: ['react']
draft: True
---

React 의 이중 조건부 랜더링
https://stackoverflow.com/questions/37312122/how-to-do-a-nested-if-else-statement-in-reactjs-jsx
참고사이트

{ this.state.loadingPage
? <span className="sr-only">Loading... Registered Devices</span>
: [
(this.state.someBoolean
? <div key='0'>some title</div>
: null
),

<div key='1'>body</div>
]
}44

<div className="some-container">
{
   (() => {
       if (conditionOne)
          return <span>One</span>
       if (conditionTwo)
          return <span>Two</span>
       else (conditionOne)
          return <span>Three</span>
   })()
}
</div>

this.state.route === 'projects'
?

  <div> <Navigation onRouteChange={this.onRouteChange}/> Projects</div>
  :
  this.state.route === 'about'
  ?
  <div> <Navigation onRouteChange={this.onRouteChange}/> About</div>
  :
  this.state.route === 'contact'
  ?
  <div> <Navigation onRouteChange={this.onRouteChange}/> Contact</div>
  :
  <p> default </p>

이거는 []관련해서 에러가 발생할수 있다.
