import React from 'react';
import { ButtonJss } from './jss';
import { IButtonUiProps } from './model';

const ButtonUi: React.FC<IButtonUiProps> = (props) => {
    return (<ButtonJss {...props} />);
};

export default ButtonUi;
