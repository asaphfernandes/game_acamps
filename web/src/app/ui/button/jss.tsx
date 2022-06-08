import styled from "@emotion/styled";
import { IButtonUiProps } from "./model";

export const ButtonJss = styled('button')({
    width: 150,
    borderRadius: 5,
    
}, (props: IButtonUiProps) => {
    if (props.variant === 'secondary') {
        return {
            background: '#FFFFFF',
            color: '#546E7A',
            borderColor: '#546E7A'
        };
    } else if (props.variant === 'delete') {
        return {
            background: 'red',
            color: '#FFFFFF'
        };
    } else {
        return {
            background: '#546E7A',
            color: '#FFFFFF'
        };
    }
});