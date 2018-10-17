import styled from "styled-components";

const Container = styled.div`
  width: ${ (props : any) => props.width || 'auto' };
  height: ${ (props : any) => props.height || 'auto' };
  margin-top: ${ (props : any) => props.marginTop || 0 };
  margin-left: ${ (props : any) => props.marginLeft || 0 };
  margin-right: ${ (props : any) => props.marginRight || 0 };
  margin-bottom: ${ (props : any) => props.marginBottom || 0 };
  padding-top: ${ (props : any) => props.paddingTop || 0 };
  padding-left: ${ (props : any) => props.paddingLeft || 0 };
  padding-right: ${ (props : any) => props.paddingRight || 0 };
  padding-bottom: ${ (props : any) => props.paddingBottom || 0 };
  min-width: ${ (props : any) => props.minWidth || 'auto' };
  max-width: ${ (props : any) => props.maxWidth || 'auto' };
  list-style-type: ${ (props : any) => props.listStyleType || 'auto' };
`;

export default Container;
