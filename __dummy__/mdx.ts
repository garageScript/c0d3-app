export const dummyDocFileContent = Buffer.from(
  `---
title: fake doc
---

# markdown
<Spoiler name="what am i?"> mdx to jsx :)</Spoiler>
`,
  'utf-8'
)
// Generated with parseMdx utility (with file content from above)
export const dummyParsedDocMdx = {
  frontMatter: { title: 'fake doc' },
  source: {
    compiledSource:
      'var c=Object.defineProperty,u=Object.defineProperties;var l=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var i=(o,e,t)=>e in o?c(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,r=(o,e)=>{for(var t in e||(e={}))p.call(e,t)&&i(o,t,e[t]);if(a)for(var t of a(e))d.call(e,t)&&i(o,t,e[t]);return o},m=(o,e)=>u(o,l(e));var s=(o,e)=>{var t={};for(var n in o)p.call(o,n)&&e.indexOf(n)<0&&(t[n]=o[n]);if(o!=null&&a)for(var n of a(o))e.indexOf(n)<0&&d.call(o,n)&&(t[n]=o[n]);return t};const makeShortcode=o=>function(t){return console.warn("Component "+o+" was not imported, exported, or provided by MDXProvider as global scope"),mdx("div",r({},t))},Spoiler=makeShortcode("Spoiler"),layoutProps={},MDXLayout="wrapper";function MDXContent(t){var n=t,{components:o}=n,e=s(n,["components"]);return mdx(MDXLayout,m(r(r({},layoutProps),e),{components:o,mdxType:"MDXLayout"}),mdx("h1",r({},{id:"markdown"}),"markdown"),mdx(Spoiler,{name:"what am i?",mdxType:"Spoiler"}," mdx to jsx :)"))}MDXContent.isMDXComponent=!0;\n',
    scope: {}
  }
}

export const dummySubLessonFileContent = [
  Buffer.from(
    `---
title: first sub lesson
order: 1
---

# first
simple
`,
    'utf-8'
  ),
  Buffer.from(
    `---
title: second sub lesson
order: 2
---

# second
also simple
`,
    'utf-8'
  ),
  Buffer.from(
    `---
title: third sub lesson
order: 3
---

# third
more simple
`,
    'utf-8'
  )
]

// Generated with parseMdx utility (with file content from above)
export const dummyParsedSubLessonMdx = [
  {
    frontMatter: { title: 'first sub lesson', order: 1 },
    source: {
      compiledSource:
        'var D=Object.defineProperty,M=Object.defineProperties;var X=Object.getOwnPropertyDescriptors;var e=Object.getOwnPropertySymbols;var s=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;var i=(t,o,n)=>o in t?D(t,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[o]=n,r=(t,o)=>{for(var n in o||(o={}))s.call(o,n)&&i(t,n,o[n]);if(e)for(var n of e(o))u.call(o,n)&&i(t,n,o[n]);return t},a=(t,o)=>M(t,X(o));var y=(t,o)=>{var n={};for(var p in t)s.call(t,p)&&o.indexOf(p)<0&&(n[p]=t[p]);if(t!=null&&e)for(var p of e(t))o.indexOf(p)<0&&u.call(t,p)&&(n[p]=t[p]);return n};const layoutProps={},MDXLayout="wrapper";function MDXContent(n){var p=n,{components:t}=p,o=y(p,["components"]);return mdx(MDXLayout,a(r(r({},layoutProps),o),{components:t,mdxType:"MDXLayout"}),mdx("h1",r({},{id:"first"}),"first"),mdx("p",null,"simple"))}MDXContent.isMDXComponent=!0;\n',
      scope: {}
    }
  },
  {
    frontMatter: { title: 'second sub lesson', order: 2 },
    source: {
      compiledSource:
        'var D=Object.defineProperty,M=Object.defineProperties;var X=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var u=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;var c=(o,n,t)=>n in o?D(o,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[n]=t,s=(o,n)=>{for(var t in n||(n={}))u.call(n,t)&&c(o,t,n[t]);if(p)for(var t of p(n))a.call(n,t)&&c(o,t,n[t]);return o},r=(o,n)=>M(o,X(n));var y=(o,n)=>{var t={};for(var e in o)u.call(o,e)&&n.indexOf(e)<0&&(t[e]=o[e]);if(o!=null&&p)for(var e of p(o))n.indexOf(e)<0&&a.call(o,e)&&(t[e]=o[e]);return t};const layoutProps={},MDXLayout="wrapper";function MDXContent(t){var e=t,{components:o}=e,n=y(e,["components"]);return mdx(MDXLayout,r(s(s({},layoutProps),n),{components:o,mdxType:"MDXLayout"}),mdx("h1",s({},{id:"second"}),"second"),mdx("p",null,"also simple"))}MDXContent.isMDXComponent=!0;\n',
      scope: {}
    }
  },
  {
    frontMatter: { title: 'third sub lesson', order: 3 },
    source: {
      compiledSource:
        'var y=Object.defineProperty,D=Object.defineProperties;var M=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var u=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;var s=(t,o,n)=>o in t?y(t,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[o]=n,r=(t,o)=>{for(var n in o||(o={}))u.call(o,n)&&s(t,n,o[n]);if(p)for(var n of p(o))i.call(o,n)&&s(t,n,o[n]);return t},a=(t,o)=>D(t,M(o));var m=(t,o)=>{var n={};for(var e in t)u.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&p)for(var e of p(t))o.indexOf(e)<0&&i.call(t,e)&&(n[e]=t[e]);return n};const layoutProps={},MDXLayout="wrapper";function MDXContent(n){var e=n,{components:t}=e,o=m(e,["components"]);return mdx(MDXLayout,a(r(r({},layoutProps),o),{components:t,mdxType:"MDXLayout"}),mdx("h1",r({},{id:"third"}),"third"),mdx("p",null,"more simple"))}MDXContent.isMDXComponent=!0;\n',
      scope: {}
    }
  }
]
