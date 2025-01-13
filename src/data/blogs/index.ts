import arrowFunctions from './arrow-functions.tsx';
// import v8Engine from './v8-engine.tsx';
// import arrayMethods from './array-methods.tsx';
// import jsModules from './js-modules.tsx';
import functionalProgramming from './functional-programming.tsx';

export const blogs = [
  arrowFunctions,
//   v8Engine,
//   arrayMethods,
//   jsModules,
  functionalProgramming
];

export type Blog = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string;
  image: string;
  content: JSX.Element;
}; 