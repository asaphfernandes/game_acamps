import styled from "@emotion/styled";
import { IButtonUiProps } from "./model";

export const ButtonJss = styled('button')({
    width: 150,
    borderRadius: 5

}, (props: IButtonUiProps) => {
    if (props.variant === 'secondary') {
        return {
            background: '#FFFFFF',
            color: '#546E7A',
            borderColor: '#546E7A',
            borderWidth: 1,
            borderStyle: 'solid',
            
            ':disabled': {
                background: '#999999'
            }
        };
    } else if (props.variant === 'delete') {
        return {
            background: '#FF0000',
            color: '#FFFFFF',
            ':disabled': {
                background: 'red'
            }
        };
    } else {
        return {
            background: '#546E7A',
            color: '#FFFFFF',
            ':disabled': {
                background: '#91a6af'
            }
        };
    }
});