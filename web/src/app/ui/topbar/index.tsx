import React from 'react';
import { Link } from 'react-router-dom';
import { TopbarJss } from './jss';

interface ITopbarProps {
    title: string;
    subtitle?: string
}

const Topbar: React.FC<ITopbarProps> = ({
    title, subtitle
}) => {
    return (<TopbarJss>
        <Link to='/'>Home</Link> / {title} {subtitle && <small>{subtitle}</small>}
    </TopbarJss>);
};

export default Topbar;
