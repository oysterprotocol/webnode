import { PureComponent } from "react";

export interface Colors {}
export interface MediaQueries {}
export interface StyleConstants {
	colors: Colors;
	mediaQueries: MediaQueries;
}
export type StyleMap = any;
export interface StyleCallback {
	(localStyle: StyleMap, globalStyle: StyleConstants): StyleMap;
}
export type Style = StyleCallback | StyleMap;
export interface StyledComponentProps {
	style?: Style;
}
export interface InternalStyle {
	(styleConstants: StyleConstants): StyleMap;
}
export default class StyledComponent<P, S> extends PureComponent<P & StyledComponentProps, S> {
	getStyle(localStyle: InternalStyle): StyleMap {
		const { style } = this.props as Readonly<StyledComponentProps>;
		return { ...localStyle, ...style as StyleMap };
	}
}
