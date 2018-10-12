import styled from "styled-components";

const Container = styled.div`
  width: ${ (props : any) => props.width || 'auto' }
  height: ${ (props : any) => props.height || 'auto' }
  margin-top: ${ (props : any) => props.marginTop || 0 };
  margin-right: ${ (props : any) => props.marginRight || 0 };
  margin-left: ${ (props : any) => props.marginLeft || 0 };
  margin-bottom: ${ (props : any) => props.marginBottom || 0 };
  min-width: ${ (props : any) => props.minWidth || 'auto' };
  max-width: ${ (props : any) => props.maxWidth || 'auto' };
`;

export default Container;