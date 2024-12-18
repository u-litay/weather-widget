declare module '*.svg' {
  import { SVGProps } from 'react';
  const ReactComponent: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  export default ReactComponent;
}